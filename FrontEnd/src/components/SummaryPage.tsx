import React, { useState } from 'react';
import { BookOpen, Clock, FileText, Star } from 'lucide-react';

export const SummaryPage: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState(0);

  const mockDocuments = [
    {
      title: "Machine Learning Fundamentals",
      summary: `Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed. Key concepts include supervised learning, unsupervised learning, and reinforcement learning.

Key topics covered:
• Supervised Learning: Uses labeled data to train algorithms
• Unsupervised Learning: Finds patterns in data without labels  
• Neural Networks: Inspired by biological neural networks
• Deep Learning: Uses multi-layer neural networks
• Feature Engineering: Selecting and transforming variables

Applications include image recognition, natural language processing, recommendation systems, and predictive analytics. The field requires understanding of statistics, linear algebra, and programming.`,
      readTime: "5 min read",
      keyPoints: ["Supervised vs Unsupervised Learning", "Neural Networks", "Deep Learning", "Feature Engineering"],
      pages: 45
    },
    {
      title: "Data Structures & Algorithms",
      summary: `Data structures are ways of organizing and storing data to enable efficient access and modification. Algorithms are step-by-step procedures for solving problems or performing tasks.

Essential data structures:
• Arrays: Sequential collection of elements
• Linked Lists: Dynamic data structure with nodes
• Stacks: Last-In-First-Out (LIFO) structure
• Queues: First-In-First-Out (FIFO) structure
• Trees: Hierarchical data structure
• Graphs: Network of connected nodes

Common algorithms include sorting (bubble, merge, quick), searching (binary search, linear search), and graph traversal (BFS, DFS). Time and space complexity analysis is crucial for optimization.`,
      readTime: "8 min read",
      keyPoints: ["Arrays & Linked Lists", "Stacks & Queues", "Trees & Graphs", "Algorithm Complexity"],
      pages: 67
    }
  ];

  const currentDoc = mockDocuments[selectedDocument];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Document Summaries
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            AI-generated summaries of your study materials
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Document List */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Your Documents</h2>
            {mockDocuments.map((doc, index) => (
              <button
                key={index}
                onClick={() => setSelectedDocument(index)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                  selectedDocument === index
                    ? 'bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-sm line-clamp-2">{doc.title}</h3>
                    <p className="text-xs opacity-70 mt-1">{doc.pages} pages</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Summary Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8">
              {/* Header */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {currentDoc.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{currentDoc.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>{currentDoc.pages} pages</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Summary</span>
                  </div>
                </div>
              </div>

              {/* Key Points */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Key Points
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {currentDoc.keyPoints.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full"></div>
                      <span className="text-gray-900 dark:text-white font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Text */}
              <div className="prose max-w-none">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Summary
                </h2>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4 whitespace-pre-line">
                  {currentDoc.summary}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  Generate Quiz
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  Create Flashcards
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  Export PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};