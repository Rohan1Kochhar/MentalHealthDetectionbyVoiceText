import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Analysis {
  type: 'voice' | 'text';
  emotions: Record<string, number>;
  riskScore: number;
  timestamp: string;
}

interface AnalysisContextType {
  analyses: Analysis[];
  addAnalysis: (type: 'voice' | 'text', data: any) => void;
  clearAnalyses: () => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const AnalysisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);

  const addAnalysis = (type: 'voice' | 'text', data: any) => {
    const analysis: Analysis = {
      type,
      emotions: data.emotions,
      riskScore: data.riskScore,
      timestamp: data.timestamp,
    };
    setAnalyses(prev => [...prev, analysis]);
  };

  const clearAnalyses = () => {
    setAnalyses([]);
  };

  return (
    <AnalysisContext.Provider value={{ analyses, addAnalysis, clearAnalyses }}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};