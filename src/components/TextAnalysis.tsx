import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, RotateCcw } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import EmotionChart from './EmotionChart';

const TextAnalysis: React.FC = () => {
  const [text, setText] = useState('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [liveAnalysis, setLiveAnalysis] = useState<any>(null);
  const { addAnalysis } = useAnalysis();

  const mockAnalyzeText = async (inputText: string, isLive = false) => {
    if (!inputText.trim()) return null;

    if (!isLive) setIsAnalyzing(true);
    
    // Simulate API call delay for full analysis
    if (!isLive) await new Promise(resolve => setTimeout(resolve, 1500));
    
    const words = inputText.toLowerCase();
    const mockResult = {
      emotions: {
        happy: words.includes('happy') || words.includes('joy') ? Math.random() * 0.4 + 0.4 : Math.random() * 0.2,
        sad: words.includes('sad') || words.includes('depressed') ? Math.random() * 0.4 + 0.4 : Math.random() * 0.3,
        angry: words.includes('angry') || words.includes('mad') ? Math.random() * 0.4 + 0.4 : Math.random() * 0.15,
        anxious: words.includes('anxious') || words.includes('worry') ? Math.random() * 0.4 + 0.4 : Math.random() * 0.3,
        neutral: Math.random() * 0.3 + 0.2,
        hopeful: words.includes('hope') || words.includes('better') ? Math.random() * 0.4 + 0.3 : Math.random() * 0.2,
      },
      sentiment: {
        positive: Math.random() * 0.4 + (words.includes('good') || words.includes('great') ? 0.3 : 0.1),
        negative: Math.random() * 0.4 + (words.includes('bad') || words.includes('terrible') ? 0.3 : 0.2),
        neutral: Math.random() * 0.3 + 0.2,
      },
      riskScore: Math.random() * 50 + (words.includes('depressed') || words.includes('hopeless') ? 30 : 10),
      keyPhrases: ['emotional expression', 'mood indicators', 'sentiment patterns'],
      wordCount: inputText.split(/\s+/).length,
      timestamp: new Date().toISOString(),
    };
    
    if (isLive) {
      setLiveAnalysis(mockResult);
    } else {
      setAnalysisResult(mockResult);
      addAnalysis('text', mockResult);
      setIsAnalyzing(false);
    }
    
    return mockResult;
  };

  // Live analysis as user types
  useEffect(() => {
    const timer = setTimeout(() => {
      if (text.length > 10) {
        mockAnalyzeText(text, true);
      } else {
        setLiveAnalysis(null);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [text]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      mockAnalyzeText(text);
    }
  };

  const sampleTexts = [
    "I've been feeling really anxious about work lately, and it's hard to sleep at night.",
    "Today was a good day! I felt productive and accomplished several tasks.",
    "I feel overwhelmed and don't know how to cope with everything going on.",
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
      >
        <h2 className="text-2xl font-bold text-neutral-800 mb-6 flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-primary-500" />
          Text Emotion Analysis
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Share your thoughts or feelings
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type how you're feeling today, what's on your mind, or any concerns you have..."
                  className="w-full h-32 p-4 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-all"
                  maxLength={1000}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-neutral-500">
                    {text.length}/1000 characters
                  </span>
                  {liveAnalysis && (
                    <span className="text-xs text-primary-600 animate-pulse">
                      Live analysis active
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={!text.trim() || isAnalyzing}
                className="w-full bg-primary-500 text-white py-3 px-6 rounded-xl hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Analyze Text
                  </>
                )}
              </button>
            </form>

            {/* Sample Texts */}
            <div>
              <h3 className="text-sm font-medium text-neutral-700 mb-3">Try these examples:</h3>
              <div className="space-y-2">
                {sampleTexts.map((sample, index) => (
                  <button
                    key={index}
                    onClick={() => setText(sample)}
                    className="w-full text-left p-3 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors text-sm"
                  >
                    "{sample}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Analysis Results */}
          <div>
            {/* Live Analysis Preview */}
            {liveAnalysis && !analysisResult && (
              <div className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-2xl">
                <h3 className="text-sm font-semibold text-primary-800 mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                  Live Analysis Preview
                </h3>
                <div className="text-xs text-primary-700">
                  Primary emotion: {Object.entries(liveAnalysis.emotions)
                    .sort(([,a], [,b]) => (b as number) - (a as number))[0][0]}
                </div>
              </div>
            )}

            {isAnalyzing && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
                <p className="mt-4 text-neutral-600">Analyzing emotional content...</p>
              </div>
            )}

            {analysisResult && !isAnalyzing && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold text-neutral-800 mb-4">Emotion Profile</h3>
                  <EmotionChart data={analysisResult.emotions} type="text" />
                </div>

                <div className="bg-white/50 p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold text-neutral-800 mb-4">Sentiment Analysis</h3>
                  <div className="space-y-3">
                    {Object.entries(analysisResult.sentiment).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-4">
                        <span className="w-20 text-sm capitalize text-neutral-600">{key}:</span>
                        <div className="flex-1 bg-neutral-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-1000 ${
                              key === 'positive' ? 'bg-green-500' :
                              key === 'negative' ? 'bg-red-500' : 'bg-neutral-400'
                            }`}
                            style={{ width: `${(value as number) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {((value as number) * 100).toFixed(0)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/50 p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold text-neutral-800 mb-4">Text Metrics</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary-600">
                        {analysisResult.wordCount}
                      </p>
                      <p className="text-sm text-neutral-600">Words</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-secondary-600">
                        {analysisResult.keyPhrases.length}
                      </p>
                      <p className="text-sm text-neutral-600">Key Phrases</p>
                    </div>
                  </div>
                </div>

                <div className={`p-6 rounded-2xl ${
                  analysisResult.riskScore > 60 
                    ? 'bg-red-50 border border-red-200' 
                    : analysisResult.riskScore > 40 
                    ? 'bg-yellow-50 border border-yellow-200'
                    : 'bg-green-50 border border-green-200'
                }`}>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-2">Risk Assessment</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-neutral-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-1000 ${
                          analysisResult.riskScore > 60 ? 'bg-red-500' :
                          analysisResult.riskScore > 40 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${analysisResult.riskScore}%` }}
                      />
                    </div>
                    <span className="text-lg font-bold">
                      {analysisResult.riskScore.toFixed(0)}%
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 mt-2">
                    {analysisResult.riskScore > 60 
                      ? 'Your text suggests you might benefit from professional support'
                      : analysisResult.riskScore > 40
                      ? 'Consider self-care practices and monitoring your mood'
                      : 'Your emotional expression appears balanced'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TextAnalysis;