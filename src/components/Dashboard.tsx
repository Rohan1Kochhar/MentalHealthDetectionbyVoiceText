import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Heart, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAnalysis } from '../context/AnalysisContext';

const Dashboard: React.FC = () => {
  const { analyses } = useAnalysis();

  // Mock trend data
  const trendData = [
    { date: '2024-01-01', anxiety: 30, mood: 70, stress: 40 },
    { date: '2024-01-02', anxiety: 25, mood: 75, stress: 35 },
    { date: '2024-01-03', anxiety: 35, mood: 65, stress: 45 },
    { date: '2024-01-04', anxiety: 20, mood: 80, stress: 30 },
    { date: '2024-01-05', anxiety: 28, mood: 72, stress: 38 },
    { date: '2024-01-06', anxiety: 22, mood: 78, stress: 32 },
    { date: '2024-01-07', anxiety: 18, mood: 85, stress: 25 },
  ];

  const weeklyStats = [
    { day: 'Mon', voice: 65, text: 70 },
    { day: 'Tue', voice: 72, text: 68 },
    { day: 'Wed', voice: 58, text: 75 },
    { day: 'Thu', voice: 80, text: 77 },
    { day: 'Fri', voice: 68, text: 72 },
    { day: 'Sat', voice: 85, text: 80 },
    { day: 'Sun', voice: 78, text: 82 },
  ];

  const currentRiskLevel = 35;
  const overallMood = 72;

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <div className="flex items-center gap-4">
            <div className="bg-primary-100 p-3 rounded-xl">
              <Brain className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-800">{analyses.length}</p>
              <p className="text-sm text-neutral-600">Total Analyses</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <div className="flex items-center gap-4">
            <div className="bg-secondary-100 p-3 rounded-xl">
              <Heart className="w-6 h-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-800">{overallMood}%</p>
              <p className="text-sm text-neutral-600">Overall Mood</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <div className="flex items-center gap-4">
            <div className="bg-accent-100 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-accent-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-800">+5%</p>
              <p className="text-sm text-neutral-600">Week Improvement</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${
              currentRiskLevel > 60 ? 'bg-red-100' : 
              currentRiskLevel > 40 ? 'bg-yellow-100' : 'bg-green-100'
            }`}>
              <AlertTriangle className={`w-6 h-6 ${
                currentRiskLevel > 60 ? 'text-red-600' : 
                currentRiskLevel > 40 ? 'text-yellow-600' : 'text-green-600'
              }`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-800">{currentRiskLevel}%</p>
              <p className="text-sm text-neutral-600">Risk Level</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Mood Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <h3 className="text-xl font-semibold text-neutral-800 mb-6">7-Day Mood Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                stroke="#6b7280"
              />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="#22c55e" 
                strokeWidth={3}
                dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                name="Mood"
              />
              <Line 
                type="monotone" 
                dataKey="anxiety" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                name="Anxiety"
              />
              <Line 
                type="monotone" 
                dataKey="stress" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                name="Stress"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Voice vs Text Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <h3 className="text-xl font-semibold text-neutral-800 mb-6">Voice vs Text Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="voice" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Voice Score" />
              <Bar dataKey="text" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Text Score" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Analyses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
      >
        <h3 className="text-xl font-semibold text-neutral-800 mb-6">Recent Analyses</h3>
        {analyses.length === 0 ? (
          <div className="text-center py-8">
            <Brain className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-600">No analyses yet. Try the Voice or Text Analysis tabs to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {analyses.slice(-5).reverse().map((analysis, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-white/50 rounded-xl">
                <div className={`p-2 rounded-lg ${
                  analysis.type === 'voice' ? 'bg-primary-100 text-primary-600' : 'bg-secondary-100 text-secondary-600'
                }`}>
                  {analysis.type === 'voice' ? '🎙' : '📝'}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-neutral-800 capitalize">{analysis.type} Analysis</p>
                  <p className="text-sm text-neutral-600">
                    {new Date(analysis.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-neutral-800">
                    {analysis.riskScore.toFixed(0)}%
                  </p>
                  <p className="text-xs text-neutral-600">Risk Score</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-200"
      >
        <h3 className="text-xl font-semibold text-neutral-800 mb-4">Personalized Recommendations</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/70 p-4 rounded-xl">
            <h4 className="font-medium text-neutral-800 mb-2">🧘 Mindfulness</h4>
            <p className="text-sm text-neutral-600">Try 5-minute breathing exercises daily</p>
          </div>
          <div className="bg-white/70 p-4 rounded-xl">
            <h4 className="font-medium text-neutral-800 mb-2">📝 Journaling</h4>
            <p className="text-sm text-neutral-600">Express your thoughts in writing</p>
          </div>
          <div className="bg-white/70 p-4 rounded-xl">
            <h4 className="font-medium text-neutral-800 mb-2">🏃 Activity</h4>
            <p className="text-sm text-neutral-600">Light exercise can boost mood</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;