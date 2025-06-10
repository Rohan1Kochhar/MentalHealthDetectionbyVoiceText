import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Heart, Clock, Play, Pause } from 'lucide-react';

const PanicMode: React.FC = () => {
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  const emergencyContacts = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 crisis support"
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "Free 24/7 crisis counseling"
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "Mental health and substance abuse"
    }
  ];

  const selfCareActivities = [
    { icon: '🧘', title: 'Breathing Exercise', description: 'Try the 4-7-8 breathing technique' },
    { icon: '🎵', title: 'Calming Music', description: 'Listen to soothing sounds' },
    { icon: '🚶', title: 'Take a Walk', description: 'Step outside for fresh air' },
    { icon: '🫖', title: 'Warm Drink', description: 'Make yourself tea or warm water' },
    { icon: '💭', title: 'Grounding Exercise', description: '5-4-3-2-1 sensory technique' },
    { icon: '📱', title: 'Call Someone', description: 'Reach out to a trusted friend' },
  ];

  const startBreathingExercise = () => {
    setIsBreathingActive(true);
    // Simple breathing cycle: 4 seconds in, 4 seconds hold, 6 seconds out
    const cycle = () => {
      setBreathingPhase('inhale');
      setTimeout(() => setBreathingPhase('hold'), 4000);
      setTimeout(() => setBreathingPhase('exhale'), 8000);
      setTimeout(() => {
        if (isBreathingActive) cycle();
      }, 14000);
    };
    cycle();
  };

  const stopBreathingExercise = () => {
    setIsBreathingActive(false);
    setBreathingPhase('inhale');
  };

  return (
    <div className="space-y-8">
      {/* Emergency Alert */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 text-center"
      >
        <div className="text-6xl mb-4">🆘</div>
        <h2 className="text-2xl font-bold text-red-800 mb-2">Crisis Support</h2>
        <p className="text-red-700 mb-6">
          If you're having thoughts of self-harm or suicide, please reach out for help immediately.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="tel:988"
            className="bg-red-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center gap-2"
          >
            <Phone className="w-5 h-5" />
            Call 988 Now
          </a>
          <a
            href="sms:741741?body=HOME"
            className="bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Text 741741
          </a>
        </div>
      </motion.div>

      {/* Breathing Exercise */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
      >
        <h3 className="text-2xl font-semibold text-neutral-800 mb-6 flex items-center gap-3">
          <Heart className="w-8 h-8 text-primary-500" />
          Breathing Exercise
        </h3>

        <div className="text-center">
          <div className="relative mb-8">
            <motion.div
              className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-primary-200 to-secondary-200 flex items-center justify-center"
              animate={isBreathingActive ? {
                scale: breathingPhase === 'inhale' ? 1.2 : breathingPhase === 'hold' ? 1.2 : 1
              } : {}}
              transition={{ duration: breathingPhase === 'inhale' ? 4 : breathingPhase === 'exhale' ? 6 : 0.5 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-neutral-800 mb-2">
                  {isBreathingActive ? (
                    breathingPhase === 'inhale' ? 'Breathe In' :
                    breathingPhase === 'hold' ? 'Hold' : 'Breathe Out'
                  ) : 'Ready'}
                </div>
                {isBreathingActive && (
                  <div className="text-sm text-neutral-600">
                    {breathingPhase === 'inhale' ? '4 seconds' :
                     breathingPhase === 'hold' ? '4 seconds' : '6 seconds'}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          <button
            onClick={isBreathingActive ? stopBreathingExercise : startBreathingExercise}
            className={`px-8 py-4 rounded-xl font-semibold transition-colors flex items-center gap-2 mx-auto ${
              isBreathingActive 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-primary-500 text-white hover:bg-primary-600'
            }`}
          >
            {isBreathingActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isBreathingActive ? 'Stop Exercise' : 'Start Breathing Exercise'}
          </button>

          <p className="text-sm text-neutral-600 mt-4">
            Follow the circle: breathe in for 4 seconds, hold for 4 seconds, breathe out for 6 seconds
          </p>
        </div>
      </motion.div>

      {/* Emergency Contacts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
      >
        <h3 className="text-2xl font-semibold text-neutral-800 mb-6 flex items-center gap-3">
          <Phone className="w-8 h-8 text-secondary-500" />
          Emergency Contacts
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {emergencyContacts.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white/50 p-6 rounded-2xl border border-white/30 text-center"
            >
              <h4 className="font-semibold text-neutral-800 mb-2">{contact.name}</h4>
              <p className="text-lg font-bold text-primary-600 mb-2">{contact.number}</p>
              <p className="text-sm text-neutral-600 mb-4">{contact.description}</p>
              <a
                href={contact.number.includes('Text') ? `sms:741741?body=HOME` : `tel:${contact.number.replace(/\D/g, '')}`}
                className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-600 transition-colors inline-block"
              >
                Contact Now
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Self-Care */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
      >
        <h3 className="text-2xl font-semibold text-neutral-800 mb-6 flex items-center gap-3">
          <Clock className="w-8 h-8 text-accent-500" />
          Quick Self-Care Activities
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selfCareActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-gradient-to-br from-white/70 to-white/40 p-6 rounded-2xl border border-white/30 text-center hover:shadow-lg transition-all cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-4xl mb-3">{activity.icon}</div>
              <h4 className="font-semibold text-neutral-800 mb-2">{activity.title}</h4>
              <p className="text-sm text-neutral-600">{activity.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Grounding Exercise */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-secondary-50 to-primary-50 rounded-3xl p-8 border border-secondary-200"
      >
        <h3 className="text-2xl font-semibold text-neutral-800 mb-6">5-4-3-2-1 Grounding Technique</h3>
        <div className="space-y-4">
          <div className="bg-white/50 p-4 rounded-xl">
            <strong className="text-primary-600">5</strong> things you can <strong>see</strong> around you
          </div>
          <div className="bg-white/50 p-4 rounded-xl">
            <strong className="text-secondary-600">4</strong> things you can <strong>touch</strong> or feel
          </div>
          <div className="bg-white/50 p-4 rounded-xl">
            <strong className="text-accent-600">3</strong> things you can <strong>hear</strong> right now
          </div>
          <div className="bg-white/50 p-4 rounded-xl">
            <strong className="text-primary-600">2</strong> things you can <strong>smell</strong>
          </div>
          <div className="bg-white/50 p-4 rounded-xl">
            <strong className="text-secondary-600">1</strong> thing you can <strong>taste</strong>
          </div>
        </div>
        <p className="text-sm text-neutral-600 mt-6 text-center italic">
          This technique helps bring your awareness to the present moment and can reduce anxiety.
        </p>
      </motion.div>

      {/* Affirmations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-accent-50 to-secondary-50 rounded-3xl p-8 border border-accent-200 text-center"
      >
        <h3 className="text-2xl font-semibold text-neutral-800 mb-6">Positive Affirmations</h3>
        <div className="space-y-4 max-w-2xl mx-auto">
          <p className="text-lg text-neutral-700 italic">"This feeling is temporary and will pass."</p>
          <p className="text-lg text-neutral-700 italic">"I am stronger than my anxiety."</p>
          <p className="text-lg text-neutral-700 italic">"I deserve help and support."</p>
          <p className="text-lg text-neutral-700 italic">"I am not alone in this."</p>
        </div>
      </motion.div>
    </div>
  );
};

export default PanicMode;