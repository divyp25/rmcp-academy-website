import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLightbox } from '../../context/LightboxContext';
import { ZoomIn } from 'lucide-react';

const AnimatedImage = ({ src, alt, className = "", imgClassName = "" }) => {
  const { openLightbox } = useLightbox();
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Subtle 3D parallax scroll effect
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div 
      ref={ref}
      className={`relative overflow-hidden group cursor-pointer ${className}`}
      onClick={() => openLightbox(src, alt)}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.2 }} // Scaled up so parallax movement doesn't reveal background
        className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.25] ${imgClassName}`}
      />
      {/* Interactive Hover Overlay */}
      <div className="absolute inset-0 bg-brand-text/0 group-hover:bg-brand-text/30 transition-colors duration-500 flex items-center justify-center">
        <div className="scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 bg-white/20 backdrop-blur-md p-4 rounded-full text-white shadow-2xl border border-white/30">
          <ZoomIn className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
};

export default AnimatedImage;
