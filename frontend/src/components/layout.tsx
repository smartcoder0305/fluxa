const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-gray-900">Fluxa</div>
            <div className="space-x-4">
              <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="/features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="/login" className="text-gray-600 hover:text-gray-900">Login</a>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}

export default Layout 