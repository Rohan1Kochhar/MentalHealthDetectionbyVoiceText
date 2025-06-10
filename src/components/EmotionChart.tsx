import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface EmotionChartProps {
  data: Record<string, number>;
  type: 'voice' | 'text';
}

const EmotionChart: React.FC<EmotionChartProps> = ({ data, type }) => {
  const chartData = Object.entries(data).map(([emotion, value]) => ({
    emotion: emotion.charAt(0).toUpperCase() + emotion.slice(1),
    value: (value * 100),
    originalEmotion: emotion,
  }));

  const getEmotionColor = (emotion: string) => {
    const colors: Record<string, string> = {
      happy: '#22c55e',
      sad: '#3b82f6',
      angry: '#ef4444',
      anxious: '#f59e0b',
      neutral: '#6b7280',
      calm: '#06b6d4',
      hopeful: '#8b5cf6',
    };
    return colors[emotion] || '#6b7280';
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="emotion" 
            stroke="#6b7280"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            formatter={(value: number) => [`${value.toFixed(1)}%`, 'Confidence']}
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
              border: 'none', 
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getEmotionColor(entry.originalEmotion)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-neutral-600">
          Primary emotion detected: <span className="font-semibold text-neutral-800">
            {chartData.sort((a, b) => b.value - a.value)[0]?.emotion || 'Unknown'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default EmotionChart;