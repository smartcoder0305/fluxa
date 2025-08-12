from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
import stripe

from app.core.config import settings
from app.core.database import get_db, SessionLocal
from app.models.user import User
from app.api.v1.endpoints.auth import get_current_active_user

# Configure Stripe
stripe.api_key = settings.STRIPE_SECRET_KEY

router = APIRouter()


@router.get("/pricing")
def get_pricing_plans():
    """
    Get available pricing plans.
    """
    plans = [
        {
            "id": "free",
            "name": "Free",
            "price": 0,
            "features": [
                "3 projects",
                "Basic editor",
                "Community support"
            ]
        },
        {
            "id": "basic",
            "name": "Basic",
            "price": 9,
            "features": [
                "10 projects",
                "Advanced editor",
                "Priority support",
                "Custom themes"
            ]
        },
        {
            "id": "pro",
            "name": "Pro",
            "price": 29,
            "features": [
                "Unlimited projects",
                "Premium editor",
                "24/7 support",
                "Custom themes",
                "Team collaboration",
                "Advanced analytics"
            ]
        },
        {
            "id": "enterprise",
            "name": "Enterprise",
            "price": 99,
            "features": [
                "Everything in Pro",
                "Custom integrations",
                "Dedicated support",
                "SLA guarantees",
                "On-premise options"
            ]
        }
    ]
    return {"plans": plans}


@router.post("/create-checkout-session")
def create_checkout_session(
    *,
    plan_id: str,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Create Stripe checkout session for subscription.
    """
    if plan_id == "free":
        raise HTTPException(status_code=400, detail="Cannot subscribe to free plan")
    
    # Get plan details
    plan_prices = {
        "basic": "price_basic_monthly",
        "pro": "price_pro_monthly", 
        "enterprise": "price_enterprise_monthly"
    }
    
    if plan_id not in plan_prices:
        raise HTTPException(status_code=400, detail="Invalid plan")
    
    try:
        # Create or get Stripe customer
        if not current_user.stripe_customer_id:
            customer = stripe.Customer.create(
                email=current_user.email,
                metadata={"user_id": current_user.id}
            )
            current_user.stripe_customer_id = customer.id
            db.commit()
        
        # Create checkout session
        checkout_session = stripe.checkout.Session.create(
            customer=current_user.stripe_customer_id,
            payment_method_types=["card"],
            line_items=[
                {
                    "price": plan_prices[plan_id],
                    "quantity": 1,
                }
            ],
            mode="subscription",
            success_url="http://localhost:5173/dashboard?success=true",
            cancel_url="http://localhost:5173/pricing?canceled=true",
            metadata={
                "user_id": current_user.id,
                "plan_id": plan_id
            }
        )
        
        return {"checkout_url": checkout_session.url}
        
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/webhook")
async def stripe_webhook(request: Request):
    """
    Handle Stripe webhooks for subscription events.
    """
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError as e:
        raise HTTPException(status_code=400, detail="Invalid signature")
    
    # Handle the event
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        handle_checkout_completed(session)
    elif event["type"] == "customer.subscription.updated":
        subscription = event["data"]["object"]
        handle_subscription_updated(subscription)
    elif event["type"] == "customer.subscription.deleted":
        subscription = event["data"]["object"]
        handle_subscription_deleted(subscription)
    
    return {"status": "success"}


def handle_checkout_completed(session):
    """
    Handle successful checkout completion.
    """
    db = SessionLocal()
    try:
        user_id = session["metadata"]["user_id"]
        plan_id = session["metadata"]["plan_id"]
        
        user = db.query(User).filter(User.id == user_id).first()
        if user:
            user.subscription_tier = plan_id
            user.subscription_status = "active"
            user.stripe_subscription_id = session["subscription"]
            db.commit()
    finally:
        db.close()


def handle_subscription_updated(subscription):
    """
    Handle subscription updates.
    """
    db = SessionLocal()
    try:
        user = db.query(User).filter(
            User.stripe_subscription_id == subscription["id"]
        ).first()
        if user:
            user.subscription_status = subscription["status"]
            db.commit()
    finally:
        db.close()


def handle_subscription_deleted(subscription):
    """
    Handle subscription cancellation.
    """
    db = SessionLocal()
    try:
        user = db.query(User).filter(
            User.stripe_subscription_id == subscription["id"]
        ).first()
        if user:
            user.subscription_tier = "free"
            user.subscription_status = "canceled"
            user.stripe_subscription_id = None
            db.commit()
    finally:
        db.close()


@router.post("/cancel-subscription")
def cancel_subscription(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Cancel current subscription.
    """
    if not current_user.stripe_subscription_id:
        raise HTTPException(status_code=400, detail="No active subscription")
    
    try:
        subscription = stripe.Subscription.retrieve(
            current_user.stripe_subscription_id
        )
        subscription.cancel_at_period_end = True
        subscription.save()
        
        current_user.subscription_status = "canceled"
        db.commit()
        
        return {"message": "Subscription will be canceled at the end of the billing period"}
        
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/subscription-status")
def get_subscription_status(
    current_user: User = Depends(get_current_active_user)
):
    """
    Get current subscription status.
    """
    return {
        "tier": current_user.subscription_tier,
        "status": current_user.subscription_status,
        "has_active_subscription": current_user.subscription_status == "active"
    } 