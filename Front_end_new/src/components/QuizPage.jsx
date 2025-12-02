import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Trophy, RefreshCw } from 'lucide-react';

export const QuizPage = ({quiz}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isActive, setIsActive] = useState(false);

  let mockQuiz = {
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

  if( quiz && quiz.questions && quiz.questions.length > 0){
    console.log("Quiz prop:", quiz);
    mockQuiz = quiz;
  }

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0 && !showResults) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setShowResults(true);
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, showResults]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex) => {
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

  const getScoreColor = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  /* ---------------- START PAGE ---------------- */
  if (!isActive && !showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="mb-8">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full inline-block mb-6">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-4">{mockQuiz.title}</h1>
              <p className="text-lg mb-6">
                Test your knowledge with {mockQuiz.totalQuestions} questions
              </p>
            </div>

            <button
              onClick={startQuiz}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold rounded-xl"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- RESULT PAGE ---------------- */
  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / mockQuiz.totalQuestions) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Quiz Results</h1>

          <div className={`text-6xl font-bold mb-4 ${getScoreColor(score, mockQuiz.totalQuestions)}`}>
            {percentage}%
          </div>

          <p className="mb-8">
            You scored {score} out of {mockQuiz.totalQuestions}
          </p>

          <button
            onClick={resetQuiz}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg inline-flex gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- QUIZ PAGE ---------------- */
  const question = mockQuiz.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">

        <div className="bg-white p-6 rounded-xl shadow mb-6 flex justify-between">
          <h1 className="font-bold">
            Question {currentQuestion + 1} of {mockQuiz.totalQuestions}
          </h1>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-red-500" />
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow mb-6">
          <h2 className="text-2xl font-bold mb-6">{question.question}</h2>

          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-4 mb-3 rounded-lg border ${
                selectedAnswers[currentQuestion] === index
                  ? 'border-blue-500 bg-blue-100'
                  : 'border-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          <button
            onClick={nextQuestion}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg"
          >
            {currentQuestion === mockQuiz.questions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
