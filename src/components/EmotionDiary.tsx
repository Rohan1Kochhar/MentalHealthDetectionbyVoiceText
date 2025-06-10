import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, BookOpen, Plus, TrendingUp, Heart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EmotionDiary: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [newEntry, setNewEntry] = useState('');
  const [mood, setMood] = useState(5);

  // Mock diary entries
  const diaryEntries = [
    {
      date: '2024-01-07',
      mood: 7,
      entry: 'Had a great day at work. Feeling accomplished and energized.',
      emotions: { happy: 0.8, calm: 0.6, confident: 0.7 }
    },
    {
      date: '2024-01-06',
      mood: 4,
      entry: 'Feeling a bit anxious about the presentation tomorrow.',
      emotions: { anxious: 0.6, worried: 0.5, neutral: 0.3 }
    },
    {
      date: '2024-01-05',
      mood: 8,
      entry: 'Spent time with family today. Feeling grateful and content.',
      emotions: { happy: 0.9, grateful: 0.8, content: 0.7 }
    },
  ];

  // Mock mood trend data
  const moodTrend = [
    { date: '2024-01-01', mood: 6 },
    { date: '2024-01-02', mood: 7 },
    { date: '2024-01-03', mood: 5 },
    { date: '2024-01-04', mood: 8 },
    { date: '2024-01-05', mood: 8 },
    { date: '2024-01-06', mood: 4 },
    { date: '2024-01-07', mood: 7 },
  ];

  const handleSaveEntry = () => {
    if (newEntry.trim()) {
      // In a real app, this would save to backend/storage
      console.log('Saving entry:', { date: selectedDate, entry: newEntry, mood });
      setNewEntry('');
    }
  };

  const moodEmojis = ['😢', '😟', '😐', '🙂', '😊', '😄', '🤗', '😍', '🥰', '🌟'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-neutral-800 mb-2 flex items-center justify-center gap-3">
          <BookOpen className="w-8 h-8 text-primary-500" />
          Emotion Diary
        </h2>
        <p className="text-neutral-600">Track your emotional journey and discover patterns</p>
      </motion.div>

      {/* New Entry */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
      >
        <h3 className="text-xl font-semibold text-neutral-800 mb-6 flex items-center gap-2">
          <Plus className="w-6 h-6 text-primary-500" />
          New Entry
        </h3>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Overall Mood (1-10)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={mood}
                  onChange={(e) => setMood(parseInt(e.target.value))}
                  className="flex-1"
                />
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{moodEmojis[mood - 1]}</span>
                  <span className="text-lg font-semibold text-neutral-800">{mood}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              How are you feeling today?
            </label>
            <textarea
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="Describe your thoughts, feelings, experiences, or anything that's on your mind..."
              className="w-full h-32 p-4 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-neutral-500">{newEntry.length}/500 characters</span>
              <button
                onClick={handleSaveEntry}
                disabled={!newEntry.trim()}
                className="bg-primary-500 text-white px-6 py-2 rounded-xl hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Entry
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mood Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
      >
        <h3 className="text-xl font-semibold text-neutral-800 mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-secondary-500" />
          7-Day Mood Trend
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={moodTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              stroke="#6b7280"
            />
            <YAxis 
              domain={[1, 10]}
              tickFormatter={(value) => `${value} ${moodEmojis[value - 1]}`}
              stroke="#6b7280"
            />
            <Tooltip 
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
              formatter={(value: number) => [`${value} ${moodEmojis[value - 1]}`, 'Mood']}
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
              dot={{ fill: '#22c55e', strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Recent Entries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
      >
        <h3 className="text-xl font-semibold text-neutral-800 mb-6 flex items-center gap-2">
          <Heart className="w-6 h-6 text-accent-500" />
          Recent Entries
        </h3>

        <div className="space-y-6">
          {diaryEntries.map((entry, index) => (
            <motion.div
              key={entry.date}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white/50 p-6 rounded-2xl border border-white/30"
            >
              <div className="flex items-start gap-4">
                <div className="text-center">
                  <div className="text-3xl">{moodEmojis[entry.mood - 1]}</div>
                  <div className="text-sm text-neutral-600 mt-1">
                    {new Date(entry.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-semibold text-neutral-800">Mood: {entry.mood}/10</span>
                  </div>
                  <p className="text-neutral-700 leading-relaxed">{entry.entry}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {Object.entries(entry.emotions).map(([emotion, intensity]) => (
                      <span
                        key={emotion}
                        className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full"
                      >
                        {emotion} ({Math.round((intensity as number) * 100)}%)
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-secondary-50 to-primary-50 rounded-3xl p-8 border border-secondary-200"
      >
        <h3 className="text-xl font-semibold text-neutral-800 mb-4">Weekly Insights</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary-600">6.7</div>
            <div className="text-sm text-neutral-600">Average Mood</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">3</div>
            <div className="text-sm text-neutral-600">Days Improved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-600">😊</div>
            <div className="text-sm text-neutral-600">Most Common</div>
          </div>
        </div>
        <div className="mt-6 p-4 bg-white/50 rounded-xl">
          <p className="text-sm text-neutral-700">
            <strong>Pattern Notice:</strong> Your mood tends to be higher on weekends and when you spend time with family. 
            Consider scheduling more social activities during weekdays.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default EmotionDiary;