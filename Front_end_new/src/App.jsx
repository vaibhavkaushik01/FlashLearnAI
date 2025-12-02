import React, { useState } from 'react';

import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { Header } from './components/Header.jsx';
import { HomePage } from './components/HomePage.jsx';
import { UploadPage } from './components/UploadPage.jsx';
import { SummaryPage } from './components/SummaryPage.jsx';
import { QuizPage } from './components/QuizPage.jsx';
import { FlashcardsPage } from './components/FlashcardsPage.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [fileData, setFileData] = useState({});

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} />;

      case 'upload':
        return <UploadPage setData={setFileData} />;

      case 'summary':
        return (
          <SummaryPage textsummary={fileData?.summaryText || {}} />
        );

      case 'quiz':
        return <QuizPage quiz={fileData?.quiz || {}} />;

      case 'flashcards':
        return (
          <FlashcardsPage flashCards={fileData?.flashCards || []} />
        );

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