import React, { useState } from 'react';
import { useFestival } from '../../context/FestivalContext';
import { motion, AnimatePresence } from 'framer-motion';

const getEmojisForFestival = (name) => {
  if (name.includes("Diwali")) return ['✨', '💥', '🎇', '🪔'];
  if (name.includes("Holi")) return ['💦', '🎨', '💥'];
  if (name.includes("Republic") || name.includes("Independence")) return ['🇮🇳', '🎉', '🎊'];
  if (name.includes("Christmas")) return ['❄️', '⭐', '🎄', '🔔'];
  if (name.includes("New Year")) return ['🎆', '🎇', '✨', '🎉'];
  if (name.includes("Dussehra")) return ['🏵️', '🏹', '✨'];
  if (name.includes("Gandhi")) return ['🕊️', '🌸', '🤍'];
  return ['✨', '🎉', '🎊']; // Default
};

const InteractiveFestivalCorner = ({ festival, emojis }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [bursts, setBursts] = useState([]);

  const handleInteraction = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    const id = Date.now();
    setBursts(prev => [...prev, { id, x, y }]);
    setTimeout(() => {
      setBursts(prev => prev.filter(b => b.id !== id));
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 pointer-events-none">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="bg-white/95 backdrop-blur-md text-sm font-semibold px-5 py-2.5 rounded-2xl shadow-xl border border-slate-100 text-slate-800 whitespace-nowrap pointer-events-auto"
            style={{ color: 'var(--app-brand-text)' }}
          >
            {festival.message}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleInteraction}
        whileHover={{ scale: 1.1, rotate: [0, -15, 15, -15, 0] }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-3xl cursor-pointer border-2 border-white pointer-events-auto relative z-10"
        style={{
          background: `linear-gradient(135deg, var(--app-brand-blue), var(--app-brand-blue-dark))`,
          boxShadow: `0 10px 25px -5px var(--app-brand-blue)`
        }}
      >
        {festival.icon}
      </motion.button>

      {/* Localized Bursts */}
      <AnimatePresence>
        {bursts.map(burst => (
          <React.Fragment key={burst.id}>
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const distance = 80 + Math.random() * 80;
              const xOffset = Math.cos(angle) * distance;
              const yOffset = Math.sin(angle) * distance;
              const emoji = emojis[Math.floor(Math.random() * emojis.length)];

              return (
                <motion.div
                  key={`${burst.id}-${i}`}
                  initial={{ x: burst.x, y: burst.y, scale: 0, opacity: 1 }}
                  animate={{ 
                    x: burst.x + xOffset, 
                    y: burst.y + yOffset, 
                    scale: [0, 1.5, 0.5], 
                    opacity: [1, 1, 0],
                    rotate: Math.random() * 360
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="fixed text-3xl pointer-events-none"
                  style={{ left: '-15px', top: '-15px', zIndex: 0 }} 
                >
                  {emoji}
                </motion.div>
              );
            })}
          </React.Fragment>
        ))}
      </AnimatePresence>
    </div>
  );
};

const FestivalDecorations = () => {
  const { activeFestival } = useFestival();

  if (!activeFestival) return null;

  const emojis = getEmojisForFestival(activeFestival.name);

  return <InteractiveFestivalCorner festival={activeFestival} emojis={emojis} />;
};

export default FestivalDecorations;
