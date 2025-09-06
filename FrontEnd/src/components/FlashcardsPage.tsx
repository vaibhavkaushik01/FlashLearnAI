import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle, Check, X } from 'lucide-react';

export const FlashcardsPage: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Set<number>>(new Set());
  const [_studyMode, _setStudyMode] = useState<'study' | 'review'>('study');

  const flashcards = [
    {
      front: "What is Machine Learning?",
      back: "Machine Learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed. It uses algorithms to identify patterns in data and make predictions or decisions.",
      category: "Fundamentals"
    },
    {
      front: "Explain Supervised Learning",
      back: "Supervised learning is a type of machine learning where algorithms learn from labeled training data to make predictions on new, unseen data. Examples include classification (predicting categories) and regression (predicting continuous values).",
      category: "Learning Types"
    },
    {
      front: "What is a Neural Network?",
      back: "A neural network is a computing system inspired by biological neural networks. It consists of interconnected nodes (neurons) organized in layers that process information by passing signals and applying activation functions to produce outputs.",
      category: "Deep Learning"
    },
    {
      front: "Define Overfitting",
      back: "Overfitting occurs when a machine learning model learns the training data too well, including noise and outliers, making it perform poorly on new, unseen data. It's characterized by high training accuracy but low validation accuracy.",
      category: "Model Performance"
    },
    {
      front: "What is Feature Engineering?",
      back: "Feature engineering is the process of selecting, modifying, or creating features (input variables) from raw data to improve machine learning model performance. It involves domain knowledge to transform data into a format that algorithms can better understand.",
      category: "Data Processing"
    },
    {
      front: "Explain Cross-Validation",
      back: "Cross-validation is a technique for evaluating machine learning models by dividing the dataset into multiple subsets (folds), training on some folds and testing on others, then averaging the results to get a more reliable performance estimate.",
      category: "Model Evaluation"
    }
  ];

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const shuffleCards = () => {
    const randomCard = Math.floor(Math.random() * flashcards.length);
    setCurrentCard(randomCard);
    setIsFlipped(false);
  };

  const markAsMastered = () => {
    setMasteredCards(prev => new Set([...prev, currentCard]));
    nextCard();
  };

  const markAsNeedReview = () => {
    setMasteredCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(currentCard);
      return newSet;
    });
    nextCard();
  };

  const resetProgress = () => {
    setMasteredCards(new Set());
    setCurrentCard(0);
    setIsFlipped(false);
  };

  const currentCardData = flashcards[currentCard];
  const progress = (masteredCards.size / flashcards.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Flashcards Study Session
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Master your concepts with interactive flashcards
          </p>
        </div>

        {/* Progress Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Progress: {masteredCards.size} / {flashcards.length} cards mastered
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {Math.round(progress)}% complete
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={shuffleCards}
                className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors duration-200"
                title="Shuffle cards"
              >
                <Shuffle className="w-5 h-5" />
              </button>
              <button
                onClick={resetProgress}
                className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                title="Reset progress"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-600 to-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div className="relative mb-8">
          <div className="mx-auto max-w-2xl">
            <div className="relative h-80 sm:h-96">
              <div
                className={`absolute inset-0 w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
                onClick={flipCard}
              >
                {/* Front of card */}
                <div className="absolute inset-0 w-full h-full backface-hidden">
                  <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-2xl p-8 flex flex-col justify-center items-center text-center h-full">
                    <div className="mb-4">
                      <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                        {currentCardData.category}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 leading-tight">
                      {currentCardData.front}
                    </h3>
                    <p className="text-blue-100 text-sm">
                      Click to reveal answer
                    </p>
                  </div>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col justify-center items-center text-center h-full border-2 border-gray-100 dark:border-gray-700">
                    <div className="mb-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-sm font-medium rounded-full">
                        Answer
                      </span>
                    </div>
                    <div className="text-gray-900 dark:text-white text-lg leading-relaxed mb-6">
                      {currentCardData.back}
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Click to flip back
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card indicators */}
          <div className="flex justify-center mt-6 space-x-1">
            {flashcards.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentCard(index);
                  setIsFlipped(false);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentCard
                    ? 'bg-blue-600 w-8'
                    : masteredCards.has(index)
                    ? 'bg-green-500'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Navigation and Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex space-x-2">
            <button
              onClick={prevCard}
              className="flex-1 flex items-center justify-center space-x-2 p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>
            <button
              onClick={nextCard}
              className="flex-1 flex items-center justify-center space-x-2 p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={markAsNeedReview}
              className="flex-1 flex items-center justify-center space-x-2 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
              <span>Review</span>
            </button>
            <button
              onClick={markAsMastered}
              className="flex-1 flex items-center justify-center space-x-2 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors duration-200"
            >
              <Check className="w-5 h-5" />
              <span>Mastered</span>
            </button>
          </div>
        </div>

        {/* Study Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center shadow-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {currentCard + 1}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Current Card</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center shadow-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {masteredCards.size}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Mastered</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center shadow-lg">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {flashcards.length - masteredCards.size}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Remaining</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center shadow-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {Math.round(progress)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Complete</div>
          </div>
        </div>
      </div>
    </div>
  );
};