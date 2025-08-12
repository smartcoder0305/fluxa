const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // For now, just return children - authentication logic will be added later
  return <>{children}</>
}

export default ProtectedRoute 