import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ScrollFloat = ({
  text = "",
  className = "",
  stagger = 0.02,
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const words = text.split(" ");

  return (
    <span ref={containerRef} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, wordIdx) => {
        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
            {word.split("").map((char, charIdx) => {
              // Calculate a sequential index for staggering
              const prevWordsLength = words.slice(0, wordIdx).reduce((acc, w) => acc + w.length, 0);
              const index = prevWordsLength + charIdx;
              const start = index * stagger;
              const end = start + 0.3;

              // We want the character to float up (y: 30 to 0) and fade in (opacity: 0 to 1)
              // as the element scrolls from the bottom of the viewport towards the middle.
              const y = useTransform(
                scrollYProgress,
                [0, 0.15 + start, 0.35 + end, 1],
                [30, 30, 0, 0]
              );
              const opacity = useTransform(
                scrollYProgress,
                [0, 0.15 + start, 0.35 + end, 1],
                [0, 0, 1, 1]
              );

              return (
                <motion.span
                  key={charIdx}
                  style={{ y, opacity, display: "inline-block" }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
};

export default ScrollFloat;
