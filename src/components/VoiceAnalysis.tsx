import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, Upload, Play, Pause, RotateCcw } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import EmotionChart from './EmotionChart';

const VoiceAnalysis: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addAnalysis } = useAnalysis();

  const mockAnalyzeAudio = async () => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResult = {
      emotions: {
        happy: Math.random() * 0.3 + 0.1,
        sad: Math.random() * 0.4 + 0.2,
        angry: Math.random() * 0.2 + 0.05,
        anxious: Math.random() * 0.5 + 0.3,
        neutral: Math.random() * 0.3 + 0.1,
        calm: Math.random() * 0.4 + 0.1,
      },
      riskScore: Math.random() * 40 + 20,
      features: {
        pitch: Math.random() * 200 + 100,
        energy: Math.random() * 0.8 + 0.1,
        speaking_rate: Math.random() * 150 + 120,
      },
      timestamp: new Date().toISOString(),
    };
    
    setAnalysisResult(mockResult);
    addAnalysis('voice', mockResult);
    setIsAnalyzing(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type.includes('audio') || file.name.endsWith('.wav'))) {
      setAudioFile(file);
    } else {
      alert('Please select a valid audio file (.wav, .mp3, etc.)');
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording
      setTimeout(() => {
        setIsRecording(false);
        mockAnalyzeAudio();
      }, 3000);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
      >
        <h2 className="text-2xl font-bold text-neutral-800 mb-6 flex items-center gap-3">
          <Mic className="w-8 h-8 text-primary-500" />
          Voice Emotion Analysis
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Recording Section */}
          <div className="space-y-6">
            <div className="text-center">
              <motion.button
                onClick={toggleRecording}
                className={`w-32 h-32 rounded-full flex items-center justify-center text-white text-2xl shadow-2xl transition-all duration-300 ${
                  isRecording 
                    ? 'bg-red-500 animate-pulse-slow' 
                    : 'bg-primary-500 hover:bg-primary-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isRecording ? <Pause className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
              </motion.button>
              <p className="mt-4 text-neutral-600">
                {isRecording ? 'Recording... Speak naturally' : 'Click to start recording'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-full h-px bg-neutral-200 relative">
                <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-neutral-500 text-sm">
                  or
                </span>
              </div>
            </div>

            <div className="text-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="audio/*,.wav"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 bg-secondary-500 text-white px-6 py-3 rounded-xl hover:bg-secondary-600 transition-colors mx-auto"
              >
                <Upload className="w-5 h-5" />
                Upload Audio File
              </button>
              {audioFile && (
                <p className="mt-2 text-sm text-neutral-600">
                  Selected: {audioFile.name}
                </p>
              )}
            </div>

            {(audioFile || isRecording) && (
              <div className="text-center">
                <button
                  onClick={mockAnalyzeAudio}
                  disabled={isAnalyzing || isRecording}
                  className="bg-accent-500 text-white px-8 py-3 rounded-xl hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Voice'}
                </button>
              </div>
            )}
          </div>

          {/* Analysis Results */}
          <div>
            {isAnalyzing && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
                <p className="mt-4 text-neutral-600">Analyzing voice patterns...</p>
              </div>
            )}

            {analysisResult && !isAnalyzing && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold text-neutral-800 mb-4">Emotion Profile</h3>
                  <EmotionChart data={analysisResult.emotions} type="voice" />
                </div>

                <div className="bg-white/50 p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold text-neutral-800 mb-4">Voice Features</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary-600">
                        {analysisResult.features.pitch.toFixed(0)}Hz
                      </p>
                      <p className="text-sm text-neutral-600">Pitch</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-secondary-600">
                        {(analysisResult.features.energy * 100).toFixed(0)}%
                      </p>
                      <p className="text-sm text-neutral-600">Energy</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-accent-600">
                        {analysisResult.features.speaking_rate.toFixed(0)}
                      </p>
                      <p className="text-sm text-neutral-600">WPM</p>
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
                      ? 'Consider speaking with a mental health professional'
                      : analysisResult.riskScore > 40
                      ? 'Monitor your emotional well-being'
                      : 'Your voice patterns appear stable'
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

export default VoiceAnalysis;