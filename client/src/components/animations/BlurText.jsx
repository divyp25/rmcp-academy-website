import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const BlurText = ({
  text = "",
  delay = 40,
  className = "",
  animateBy = "letters", // "words" or "letters"
  direction = "top", // "top" or "bottom"
  threshold = 0.1,
  rootMargin = "0px",
  animationDuration = 0.6,
  style = {},
}) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const offset = direction === "top" ? -20 : 20;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: offset,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 120,
        duration: animationDuration,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap ${className}`}
      style={style}
    >
      {elements.map((el, i) => (
        <motion.span
          key={i}
          variants={childVariants}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {el === " " ? "\u00A0" : el}
          {animateBy === "words" && i < elements.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default BlurText;
