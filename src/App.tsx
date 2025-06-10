import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import VoiceAnalysis from './components/VoiceAnalysis';
import TextAnalysis from './components/TextAnalysis';
import Dashboard from './components/Dashboard';
import EmotionDiary from './components/EmotionDiary';
import PanicMode from './components/PanicMode';
import { AnalysisProvider } from './context/AnalysisContext';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'voice', label: 'Voice Analysis', icon: '🎙' },
    { id: 'text', label: 'Text Analysis', icon: '📝' },
    { id: 'diary', label: 'Emotion Diary', icon: '📖' },
    { id: 'panic', label: 'Support', icon: '🆘' },
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'voice':
        return <VoiceAnalysis />;
      case 'text':
        return <TextAnalysis />;
      case 'diary':
        return <EmotionDiary />;
      case 'panic':
        return <PanicMode />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AnalysisProvider>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-neutral-50 to-secondary-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'text-neutral-600 hover:bg-white/50 hover:text-primary-600'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Component */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderActiveComponent()}
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-md border-t border-white/20 mt-16">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center">
              <p className="text-sm text-neutral-600">
                © 2025 MindSense AI - Created by <span className="font-semibold text-primary-600">Rohan Kochhar</span>
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Empowering mental health through AI-powered insights
              </p>
            </div>
          </div>
        </footer>
      </div>
    </AnalysisProvider>
  );
}

export default App;