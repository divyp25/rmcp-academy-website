import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * ScrollTypingText
 * Creates a highly performant typing/erasing effect linked to scroll position.
 * 
 * @param {string} text - The raw string text to type out.
 * @param {string} className - Optional container classes.
 * @param {string[]} highlightWords - Array of words that should receive special styling.
 * @param {string} highlightClass - The CSS class applied to highlighted words.
 */
export default function ScrollTypingText({ 
  text, 
  className = "", 
  highlightWords = [], 
  highlightClass = "text-brand-blue" 
}) {
  const containerRef = useRef(null);

  // Track the scroll progress of the element
  // "start 90%" -> Animation begins when the top of the element hits 90% of the viewport.
  // "center 40%" -> Animation completes when the center of the element hits 40% of the viewport.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "center 40%"]
  });

  if (!text) return null;

  // Split text into words, while keeping track of total characters to distribute scroll progress evenly
  const words = text.split(" ");
  const totalChars = text.replace(/\s/g, "").length;
  let charIndexCounter = 0;

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, wIndex) => {
        // Remove punctuation for highlight matching (optional, but robust)
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "");
        const isHighlighted = highlightWords.some(hw => hw.toLowerCase() === cleanWord.toLowerCase());
        const wordClass = isHighlighted ? highlightClass : "";

        return (
          <span key={wIndex} className={`inline-block whitespace-nowrap ${wordClass}`}>
            {word.split("").map((char, cIndex) => {
              // Calculate the start and end progress for this specific character
              const start = charIndexCounter / totalChars;
              const end = start + (1 / totalChars);
              charIndexCounter++;

              // Map scroll progress: before 'start', opacity is 0.05. After 'end', opacity is 1.
              // We use 0.05 instead of 0 to give a subtle "ghost" trace of the upcoming text.
              const opacity = useTransform(scrollYProgress, [start, end], [0.05, 1]);

              return (
                <motion.span key={cIndex} style={{ opacity }}>
                  {char}
                </motion.span>
              );
            })}
            {/* Add space after each word except the last */}
            {wIndex < words.length - 1 && <span>&nbsp;</span>}
          </span>
        );
      })}
    </span>
  );
}
