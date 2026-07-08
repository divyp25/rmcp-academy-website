import React from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({ 
  children, 
  delay = 0, 
  duration = 0.8, 
  yOffset = 40, 
  xOffset = 0, 
  scale = 1, 
  ease = [0.25, 0.46, 0.45, 0.94] 
}) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: yOffset,
        x: xOffset,
        scale: scale 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        x: 0,
        scale: 1 
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: ease 
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
