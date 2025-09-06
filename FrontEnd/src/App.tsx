import React, { useState } from 'react';

import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { UploadPage } from './components/UploadPage';
import { SummaryPage } from './components/SummaryPage';
import { QuizPage } from './components/QuizPage';
import { FlashcardsPage } from './components/FlashcardsPage';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} />;
      case 'upload':
        return <UploadPage />;
      case 'summary':
        return <SummaryPage />;
      case 'quiz':
        return <QuizPage />;
      case 'flashcards':
        return <FlashcardsPage />;
      default:
        return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <main>
          {renderContent()}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;