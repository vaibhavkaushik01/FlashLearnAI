import React from 'react';
import { Upload, Brain, FileText, Zap } from 'lucide-react';

export const HomePage = ({ setActiveTab }) => {
  const features = [
    {
      icon: <Upload className="w-8 h-8" />,
      title: "Smart PDF Upload",
      description: "Upload your study materials and let AI analyze the content",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Intelligent Summaries",
      description: "Get concise, AI-generated summaries of your documents",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Interactive Quizzes",
      description: "Test your knowledge with auto-generated multiple choice questions",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Dynamic Flashcards",
      description: "Review key concepts with interactive flashcard decks",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Transform Your
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">Study Experience</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Upload your PDFs and harness the power of AI to create summaries, quizzes, and flashcards. 
              Make studying smarter, faster, and more effective.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setActiveTab('upload')}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <span className="flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Start Learning Now</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
            >
              View Demo
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful AI-Driven Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Everything you need to master your study materials
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
