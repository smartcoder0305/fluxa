const ThemeProvider = ({ children, defaultTheme, storageKey }: { children: React.ReactNode, defaultTheme: string, storageKey: string }) => {
  // For now, just return children - theme logic will be added later
  return <>{children}</>
}

export { ThemeProvider } 