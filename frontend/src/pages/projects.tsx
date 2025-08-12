const Projects = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">React App</h3>
            <p className="text-gray-600 mb-4">A modern React application</p>
            <div className="flex space-x-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">React</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">TypeScript</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects 