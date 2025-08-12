import React from 'react'

const Features: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-center mb-12">Features</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border">
            <h3 className="text-xl font-semibold mb-4">AI Powered</h3>
            <p className="text-gray-600">Build apps with natural language using AI assistance.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border">
            <h3 className="text-xl font-semibold mb-4">Full Stack</h3>
            <p className="text-gray-600">Complete backend and frontend in one platform.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 border">
            <h3 className="text-xl font-semibold mb-4">Real-time</h3>
            <p className="text-gray-600">Collaborate with your team in real-time.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features
