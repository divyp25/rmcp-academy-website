import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFestival } from '../../context/FestivalContext';
import { X } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const FestivalPopup = () => {
  const { activeFestival, showPopup, closePopup } = useFestival();
  const { width, height } = useWindowSize();

  if (!activeFestival) return null;

  return (
    <AnimatePresence>
      {showPopup && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
          {/* Confetti Effect */}
          <div className="fixed inset-0 pointer-events-none z-[111]">
             <Confetti
                width={width}
                height={height}
                recycle={false}
                numberOfPieces={500}
                gravity={0.15}
             />
          </div>

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-text/60 backdrop-blur-sm pointer-events-auto"
            onClick={closePopup}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-12 max-w-lg w-full text-center pointer-events-auto border-[6px] border-brand-blue/20 overflow-hidden"
          >
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-brand-orange/10 rounded-br-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-blue/10 rounded-tl-full blur-2xl" />

            <div className="relative z-10">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2, bounce: 0.6 }}
                className="text-7xl sm:text-8xl mb-6"
              >
                {activeFestival.icon}
              </motion.div>
              
              <h2 className="text-3xl sm:text-4xl font-black text-brand-text font-heading uppercase tracking-tight mb-4">
                {activeFestival.name}
              </h2>
              
              <p className="text-slate-600 text-lg mb-8 font-medium">
                {activeFestival.message}
              </p>

              <button
                onClick={closePopup}
                className="w-full py-4 rounded-xl font-bold tracking-widest uppercase text-white bg-brand-blue hover:bg-brand-blue-dark shadow-lg hover:shadow-brand-blue/50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                Continue to site
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FestivalPopup;
