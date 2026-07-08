import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const LightboxContext = createContext();

export const useLightbox = () => useContext(LightboxContext);

export const LightboxProvider = ({ children }) => {
  const [lightboxImage, setLightboxImage] = useState(null);

  const openLightbox = (src, alt) => {
    setLightboxImage({ src, alt });
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <LightboxContext.Provider value={{ openLightbox, closeLightbox }}>
      {children}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-text/95 backdrop-blur-3xl p-4 sm:p-8 cursor-zoom-out"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors cursor-pointer"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl shadow-brand-blue/20"
              />
              {lightboxImage.alt && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/50 backdrop-blur-md rounded-full border border-white/10 shadow-xl">
                  <p className="text-white font-medium text-sm tracking-wide">{lightboxImage.alt}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
};
