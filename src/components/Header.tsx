import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Shield, Heart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-3 rounded-2xl shadow-lg">
              <Brain className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                MindSense AI
              </h1>
              <p className="text-sm text-neutral-600">Mental Health Monitoring & Support</p>
              <p className="text-xs text-neutral-500">Created by Rohan Kochhar</p>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="hidden sm:flex items-center gap-6 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary-500" />
                <span>Privacy Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-secondary-500" />
                <span>AI-Powered Care</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.div 
          className="mt-4 p-3 bg-accent-50 border border-accent-200 rounded-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-xs text-accent-800 text-center">
            <strong>Important:</strong> MindSense is not a substitute for professional medical advice. 
            If you're experiencing severe mental health symptoms, please consult a healthcare professional immediately.
          </p>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;