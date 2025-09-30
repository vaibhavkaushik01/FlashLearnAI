import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Trophy, RefreshCw } from 'lucide-react';

export const QuizPage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isActive, setIsActive] = useState(false);

  const mockQuiz = {
    title: "Machine Learning Fundamentals Quiz",
    totalQuestions: 5,
    questions: [
      {
        question: "What is the primary difference between supervised and unsupervised learning?",
        options: [
          "Supervised learning uses labeled data, unsupervised doesn't",
          "Supervised learning is faster than unsupervised learning",
          "Unsupervised learning is more accurate than supervised learning",
          "There is no difference between the two approaches"
        ],
        correctAnswer: 0,
        explanation: "Supervised learning requires labeled training data to learn patterns, while unsupervised learning finds patterns in data without labels."
      },
      {
        question: "Which of the following is NOT a common activation function in neural networks?",
        options: [
          "ReLU (Rectified Linear Unit)",
          "Sigmoid",
          "Tanh",
          "Linear Regression"
        ],
        correctAnswer: 3,
        explanation: "Linear Regression is a machine learning algorithm, not an activation function. ReLU, Sigmoid, and Tanh are all common activation functions."
      },
      {
        question: "What is the purpose of feature engineering in machine learning?",
        options: [
          "To increase the size of the dataset",
          "To select and transform variables for better model performance",
          "To reduce computational costs only",
          "To visualize data patterns"
        ],
        correctAnswer: 1,
        explanation: "Feature engineering involves selecting, modifying, or creating features (variables) to improve model performance and accuracy."
      },
      {
        question: "Which technique is used to prevent overfitting in neural networks?",
        options: [
          "Increasing the learning rate",
          "Adding more hidden layers",
          "Dropout regularization",
          "Using smaller datasets"
        ],
        correctAnswer: 2,
        explanation: "Dropout is a regularization technique that randomly sets some neurons to zero during training to prevent overfitting."
      },
      {
        question: "What is deep learning primarily characterized by?",
        options: [
          "Using only linear algorithms",
          "Multi-layer neural networks with many hidden layers",
          "Working only with small datasets",
          "Requiring no computational power"
        ],
        correctAnswer: 1,
        explanation: "Deep learning uses neural networks with multiple hidden layers (typically 3 or more) to learn complex patterns in data."
      }
    ]
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0 && !showResults) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setShowResults(true);
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, showResults]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < mockQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      setIsActive(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const startQuiz = () => {
    setIsActive(true);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setTimeLeft(300);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setTimeLeft(300);
    setIsActive(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === mockQuiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (!isActive && !showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8 flex items-center justify-center transition-colors duration-300">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 sm:p-12">
            <div className="mb-8">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full inline-block mb-6">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {mockQuiz.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Test your knowledge with {mockQuiz.totalQuestions} questions
              </p>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {mockQuiz.totalQuestions}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Questions</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Time Limit</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  MCQ
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Format</div>
              </div>
            </div>
            
            <button
              onClick={startQuiz}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / mockQuiz.totalQuestions) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Quiz Results
            </h1>
            <div className={`text-6xl font-bold mb-4 ${getScoreColor(score, mockQuiz.totalQuestions)}`}>
              {percentage}%
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              You scored {score} out of {mockQuiz.totalQuestions} questions correctly
            </p>
          </div>  

          <div className="space-y-6">
            {mockQuiz.questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                        Question {index + 1}: {question.question}
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        {question.options.map((option, optionIndex) => {
                          let bgColor = 'bg-gray-50 dark:bg-gray-700';
                          let textColor = 'text-gray-900 dark:text-white';
                          
                          if (optionIndex === question.correctAnswer) {
                            bgColor = 'bg-green-100 dark:bg-green-900/30 border-green-500';
                            textColor = 'text-green-800 dark:text-green-200';
                          } else if (optionIndex === userAnswer && userAnswer !== question.correctAnswer) {
                            bgColor = 'bg-red-100 dark:bg-red-900/30 border-red-500';
                            textColor = 'text-red-800 dark:text-red-200';
                          }
                          
                          return (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded-lg border ${bgColor} ${textColor}`}
                            >
                              {option}
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center space-x-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Try Again</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = mockQuiz.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Question {currentQuestion + 1} of {mockQuiz.totalQuestions}
              </h1>
            </div>
            <div className="flex items-center space-x-2 text-lg font-semibold">
              <Clock className="w-5 h-5 text-red-500" />
              <span className={`${timeLeft <= 60 ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-700 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / mockQuiz.totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            {question.question}
          </h2>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            Previous
          </button>
          
          <div className="flex space-x-2">
            {mockQuiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentQuestion
                    ? 'bg-blue-600'
                    : selectedAnswers[index] !== undefined
                    ? 'bg-green-500'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextQuestion}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            {currentQuestion === mockQuiz.questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};