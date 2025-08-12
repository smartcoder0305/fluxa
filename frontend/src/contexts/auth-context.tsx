const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // For now, just return children - auth logic will be added later
  return <>{children}</>
}

export { AuthProvider } 