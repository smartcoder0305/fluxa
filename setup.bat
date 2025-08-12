@echo off
echo 🚀 Setting up Fluxa - General Vibe Coding Application
echo ==================================================

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker first.
    pause
    exit /b 1
)

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not installed. Please install Docker Compose first.
    pause
    exit /b 1
)

echo ✅ Docker and Docker Compose are available

REM Create environment files
echo 📝 Creating environment files...

if not exist "backend\.env" (
    copy "backend\env.example" "backend\.env"
    echo ✅ Created backend\.env (please update with your actual values)
) else (
    echo ℹ️  backend\.env already exists
)

if not exist "frontend\.env" (
    copy "frontend\env.example" "frontend\.env"
    echo ✅ Created frontend\.env (please update with your actual values)
) else (
    echo ℹ️  frontend\.env already exists
)

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
npm install
cd ..

echo.
echo 🎉 Setup complete!
echo.
echo Next steps:
echo 1. Update the environment files with your actual values:
echo    - backend\.env (especially Stripe keys and database URL)
echo    - frontend\.env (API URL and Stripe publishable key)
echo.
echo 2. Start the application:
echo    docker-compose up -d
echo.
echo 3. Access the application:
echo    - Frontend: http://localhost:5173
echo    - Backend API: http://localhost:8000
echo    - API Docs: http://localhost:8000/docs
echo.
echo 4. Create your first superuser account:
echo    - Email: admin@fluxa.com
echo    - Password: admin123
echo.
echo Happy coding! 🎯
pause 