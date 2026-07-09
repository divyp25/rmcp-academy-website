import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon, EnvelopeIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline";
import rmcp_logo from "../../assets/img/rmcp_logo.png";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { BookOpen, Cpu, ShieldCheck, Award, ChevronLeft, ChevronRight, Play, Pause, Info, MapPin, PenTool, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCMS } from "../../hooks/useCMS";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ScrollReveal from "../ui/ScrollReveal";
import BlurText from "../animations/BlurText";
import ScrollFloat from "../animations/ScrollFloat";
import TopStudents from "./TopStudents";

import sportImg from "../../assets/img/sport_4.jpg";
import audImg from "../../assets/img/aud_4.jpg";
import techImg from "../../assets/img/tech_3.jpg";
import bgVideo from "../../assets/bg-video.mp4";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value, 10);
    if (isNaN(end) || end <= 0) return;

    let totalDuration = 1500;
    let stepTime = Math.max(Math.floor(totalDuration / end), 25);
    
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <>{count}</>;
};

const Hero = ({ setShowEnq }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const { data: cmsData } = useCMS('home');
  const [years, setYears] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const navigate = useNavigate();
  const [enquiryPulse, setEnquiryPulse] = useState(false);
  const [activePanel, setActivePanel] = useState(0);

  const containerRef = useRef(null);
  const videoCardRef = useRef(null);
  const textContainerRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const videoCard = videoCardRef.current;
    const container = containerRef.current;
    const text = textContainerRef.current;
    const indicator = scrollIndicatorRef.current;

    if (!videoCard || !container) return;

    // Create responsive GSAP ScrollTrigger timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=100%",
        scrub: 1.2, // Smooth scrub physics
        pin: true,
        invalidateOnRefresh: true,
      }
    });

    // Animate video card to fullscreen using absolute viewport calculations
    tl.to(videoCard, {
      x: () => {
        const isMobile = window.innerWidth < 1024;
        if (isMobile) return 0;
        // The card is w-[55vw], anchored at right: 0. Its center is at 72.5vw.
        // We translate it to the center (50vw), which is a shift of -22.5vw.
        return -0.225 * window.innerWidth;
      },
      y: () => {
        const isMobile = window.innerWidth < 1024;
        if (isMobile) {
          const rect = videoCard.getBoundingClientRect();
          return - (window.innerHeight - rect.height);
        }
        // Center the card vertically to cover the entire viewport (including the navbar)
        const cardWidth = window.innerWidth * 0.55;
        const cardHeight = cardWidth * 9 / 16;
        const cardCenterY = 110 + cardHeight / 2;
        const viewportCenterY = window.innerHeight / 2;
        return viewportCenterY - cardCenterY;
      },
      scale: () => {
        const isMobile = window.innerWidth < 1024;
        if (isMobile) {
          return window.innerHeight / videoCard.offsetHeight;
        }
        const cardWidth = window.innerWidth * 0.55;
        const cardHeight = cardWidth * 9 / 16;
        const scaleX = 1.818;
        const scaleY = window.innerHeight / cardHeight;
        return Math.max(scaleX, scaleY);
      },
      borderRadius: "0px",
      boxShadow: "none",
      ease: "power2.inOut",
    }, 0);

    // Fade out and translate text
    if (text) {
      tl.to(text, {
        opacity: 0,
        y: -40,
        ease: "power2.inOut",
      }, 0);
    }

    // Fade out scroll indicator
    if (indicator) {
      tl.to(indicator, {
        opacity: 0,
        y: 20,
        ease: "power2.inOut",
      }, 0);
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const sentence1 = "THIS IS";
  const sentence2 = "Your Day";

  const banner = {
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const banner2 = {
    animate: {
      transition: {
        delayChildren: 0.8,
        staggerChildren: 0.12,
      },
    },
  };

  const letterAni = {
    initial: { y: 30, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };
  
  const panels = [
    { id: 0, title: "Sports Complex", desc: "State-of-the-art facilities promoting physical excellence and teamwork.", img: sportImg, path: "/infrastructure/sports" },
    { id: 1, title: "Grand Auditorium", desc: "Spacious venue for events, seminars, and cultural activities.", img: audImg, path: "/infrastructure/auditorium" },
    { id: 2, title: "Learning Centers", desc: "Advanced science labs and technology-equipped smart classrooms.", img: techImg, path: "/infrastructure/learning-centre" }
  ];

  useEffect(() => {
    const startYear = 2012;
    const currentYear = new Date().getFullYear();
    setYears(currentYear - startYear);
  }, []);

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setEnquiryPulse((prev) => !prev);
    }, 1200);
    return () => clearInterval(pulseInterval);
  }, []);

  // Motion variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeUpItem = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const listContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const listItem = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <>
      {/* Scroll track wrapper */}
      <div ref={containerRef} className="relative w-full h-screen bg-brand-text">
        {/* Viewport container */}
        <div className="relative w-full h-screen overflow-hidden flex flex-col lg:flex-row bg-brand-text">
        
        {/* Admission Notification Banner */}
        {(cmsData?.show_admission_notification === true || cmsData?.show_admission_notification === "true") && (
          <div className="absolute top-[100px] sm:top-[112px] left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-4xl pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              onClick={() => setShowEnq(true)}
              className="flex items-center justify-between gap-3 px-4 py-3 sm:py-3.5 sm:px-6 bg-brand-blue/90 hover:bg-brand-blue border border-white/20 backdrop-blur-xl rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.25)] cursor-pointer transition-all duration-300 group hover:scale-[1.01]"
            >
              <div className="flex items-center gap-3">
                {/* Blinking dot */}
                <div className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-brand-orange opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-orange"></span>
                </div>
                <div className="text-white font-sans text-xs sm:text-sm font-semibold tracking-wide flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span className="bg-brand-orange text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 animate-pulse">
                    Admissions Open
                  </span>
                  <span className="opacity-95 text-[11px] sm:text-xs">
                    Admission is open for the upcoming academic session! Click here to submit your enquiry form.
                  </span>
                </div>
              </div>
              <button className="flex items-center gap-1 bg-white text-brand-text text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2.5 sm:px-3.5 py-1.5 rounded-xl group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300 shrink-0 shadow-sm">
                Enquire
                <ArrowRightIcon className="w-3 h-3" />
              </button>
            </motion.div>
          </div>
        )}

        {/* Navy Panel Background & Overlay */}
        <div className="absolute inset-0 w-full h-full bg-brand-text z-0">
          <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay">
            <img src={techImg} alt="Campus Background" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Text Layer */}
        <div className="absolute left-0 top-0 w-full h-[55%] lg:h-full z-30 pointer-events-none flex items-center justify-center lg:justify-start lg:pl-24 pt-24 lg:pt-20">
          <div ref={textContainerRef} className="max-w-7xl mt-8 lg:mt-0">
            
            <div className="space-y-0 relative z-20 flex flex-col">
              <BlurText
                text={sentence1}
                delay={120}
                animationDuration={1.0}
                animateBy="letters"
                direction="top"
                className="text-white font-sans font-black uppercase tracking-[0.25em] text-lg sm:text-2xl lg:text-3xl mb-6"
              />
              <BlurText
                text={sentence2}
                delay={180}
                animationDuration={1.2}
                animateBy="letters"
                direction="top"
                className="font-serif italic text-brand-blue-light text-[6rem] sm:text-[9rem] lg:text-[12.5rem] leading-[0.8] whitespace-nowrap"
                style={{ textShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
              />
            </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
                className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:gap-8 relative z-30 pointer-events-auto"
              >
                <button
                  onClick={() => navigate("/academy/about")}
                  className="inline-flex items-center gap-3 bg-[#b81d24] hover:bg-[#99161b] text-white text-xs font-sans font-semibold tracking-wider pl-6 pr-2 py-2 rounded-full transition-all duration-300 hover:scale-[1.03] shadow-lg cursor-pointer pointer-events-auto group"
                >
                  Explore RMCP Academy
                  <div className="w-8 h-8 rounded-full bg-black/15 flex items-center justify-center text-white group-hover:bg-black/25 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </button>

                <div className="flex items-center gap-6">
                  {[
                    { label: "VISIT", icon: <MapPin className="w-4 h-4" />, path: "/infrastructure/overview", active: true },
                    { label: "INQUIRE", icon: <Info className="w-4 h-4" />, path: "/admission-enquiry" }
                  ].map((btn, i) => (
                    <button key={i} onClick={() => navigate(btn.path)} className="flex flex-col items-center gap-2 group cursor-pointer pointer-events-auto">
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                        btn.active 
                          ? 'bg-[#a7e0ed] text-brand-text border border-transparent' 
                          : 'border border-white/20 text-white hover:border-white hover:bg-white/10'
                      }`}>
                        {btn.icon}
                      </div>
                      <span className="text-[9px] text-white/70 font-sans font-bold uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                        {btn.label}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>

          </div>
        </div>

        {/* Unified Video Panel */}
        <div 
          ref={videoCardRef}
          className="absolute z-25 overflow-hidden pointer-events-auto shadow-[-20px_0_50px_rgba(0,0,0,0.3)] border-t lg:border-t-0 lg:border-l border-white/5 w-full h-[45vh] bottom-0 left-0 rounded-t-[28px] lg:w-[55vw] lg:h-[calc(100vh-140px)] lg:top-[110px] lg:bottom-auto lg:right-0 lg:left-auto lg:rounded-[28px]"
          style={{
            willChange: "transform, borderRadius",
          }}
        >
          <video
            ref={videoRef}
            src={bgVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover origin-center"
            style={{
              willChange: "transform",
            }}
          />
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 lg:left-24 lg:translate-x-0 z-40 flex flex-col items-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity pointer-events-auto"
          onClick={() => {
            const nextSection = document.getElementById("welcome-section");
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Scroll Down</span>
          <div className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="w-1 h-1.5 rounded-full bg-brand-orange"
            />
          </div>
        </div>

      </div>
    </div>

      {/* Interactive Feature Bar */}
      <div className="w-full bg-brand-surface py-12 border-b border-brand-blue/10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8"
        >

          <motion.div 
            variants={fadeUpItem} 
            onClick={() => navigate("/infrastructure/overview")}
            className="flex items-center gap-5 p-6 rounded-2xl bg-white border border-brand-blue/10 hover:border-brand-blue/30 hover:shadow-xl hover:shadow-brand-blue/5 transition-all duration-300 group cursor-pointer"
          >
            <div className="p-4 rounded-xl bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-extrabold text-brand-text text-lg tracking-wide font-heading">Modern Infrastructure</h3>
              <p className="text-sm text-slate-500 mt-1">Smart labs, spacious auditorium & tech-equipped classrooms</p>
            </div>
          </motion.div>

          <motion.div 
            variants={fadeUpItem} 
            onClick={() => navigate("/academics/holistic-development")}
            className="flex items-center gap-5 p-6 rounded-2xl bg-white border border-brand-blue/10 hover:border-brand-orange/30 hover:shadow-xl hover:shadow-brand-orange/5 transition-all duration-300 group cursor-pointer"
          >
            <div className="p-4 rounded-xl bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-extrabold text-brand-text text-lg tracking-wide font-heading">Holistic Development</h3>
              <p className="text-sm text-slate-500 mt-1">Academics balanced with extensive sports & creative arts</p>
            </div>
          </motion.div>

          <motion.div 
            variants={fadeUpItem} 
            onClick={() => navigate("/academics/technology")}
            className="flex items-center gap-5 p-6 rounded-2xl bg-white border border-brand-blue/10 hover:border-brand-yellow/50 hover:shadow-xl hover:shadow-brand-yellow/5 transition-all duration-300 group cursor-pointer"
          >
            <div className="p-4 rounded-xl bg-brand-yellow/10 text-brand-orange group-hover:bg-brand-yellow group-hover:text-brand-text transition-all duration-300">
              <Cpu className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-extrabold text-brand-text text-lg tracking-wide font-heading">Technology Integrated</h3>
              <p className="text-sm text-slate-500 mt-1">Advanced programming, multimedia rooms & digital learning</p>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Welcome Section */}
      <section id="welcome-section" className="w-full py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none floating-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none floating-blob-slow" />

        <div className="max-w-[1600px] mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* School Emblem Showcase Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-4 flex justify-center lg:justify-end lg:pr-4"
            >
              <div className="relative p-10 rounded-3xl bg-brand-surface border border-brand-blue/10 shadow-2xl max-w-md w-full group overflow-hidden premium-card-hover">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-blue via-brand-yellow to-brand-orange" />
                <div className="relative flex flex-col items-center text-center space-y-6">
                  <div className="w-52 h-52 p-4 bg-white rounded-2xl border border-brand-blue/10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <img src={rmcp_logo} alt="RMCP Academy Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-black text-brand-text text-2xl font-heading tracking-wide">RMCP Academy</h3>
                    <p className="text-sm text-brand-blue font-bold tracking-widest mt-1.5 uppercase">Bilsanda, Uttar Pradesh</p>
                  </div>
                  <div className="w-full border-t border-brand-blue/10 pt-6 flex justify-around text-center">
                    <div>
                      <span className="block text-3xl font-black text-brand-blue"><AnimatedCounter value={years} />+</span>
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Years Exp</span>
                    </div>
                    <div className="border-l border-brand-blue/10" />
                    <div>
                      <span className="block text-3xl font-black text-brand-orange">CBSE</span>
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Curriculum</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Welcome text content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-8 space-y-8"
            >
              <div className="space-y-3">
                <span className="text-xs font-bold tracking-widest text-brand-orange uppercase block">Establishment</span>
                <h2 className="text-3xl sm:text-5xl font-black text-brand-text leading-tight font-heading flex flex-wrap gap-x-2">
                  <ScrollFloat text="Welcome to" className="text-brand-text" />
                  <ScrollFloat text="Our Academy" className="text-brand-blue" />
                </h2>
                <div className="w-24 h-1.5 bg-brand-orange rounded-full mt-4" />
              </div>

              <div className="space-y-5 text-slate-600 text-base leading-relaxed">
                <p>
                  Rajendra Mohan Chandrika Prasad Academy (RMCP Academy) in Bilsanda was established with a clear vision: to provide a world-class education that balances academic excellence with profound character development.
                </p>
                <p>
                  Our academy offers a comprehensive educational journey from pre-primary to senior secondary levels, fostering a highly collaborative environment where students can discover, nurture, and test their unique talents and abilities.
                </p>
              </div>

              {/* Highlights List */}
              <motion.div
                variants={listContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3"
              >
                <motion.div variants={listItem} className="flex items-start gap-4 p-4 rounded-xl bg-brand-surface border border-brand-blue/10 shadow-sm hover:border-brand-blue/30 transition-all duration-300">
                  <div className="w-6.5 h-6.5 rounded-full bg-brand-blue text-white flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">✓</div>
                  <div>
                    <h4 className="font-extrabold text-brand-text text-sm sm:text-base font-heading">Taekwondo & Martial Arts</h4>
                    <p className="text-xs text-slate-500 mt-1">Physical training & self-defence excellence</p>
                  </div>
                </motion.div>
                <motion.div variants={listItem} className="flex items-start gap-4 p-4 rounded-xl bg-brand-surface border border-brand-blue/10 shadow-sm hover:border-brand-blue/30 transition-all duration-300">
                  <div className="w-6.5 h-6.5 rounded-full bg-brand-blue text-white flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">✓</div>
                  <div>
                    <h4 className="font-extrabold text-brand-text text-sm sm:text-base font-heading">Smart Learning Labs</h4>
                    <p className="text-xs text-slate-500 mt-1">Physics, chemistry, computer & audio-visual labs</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

          </div>

          {/* Secondary Details & Philosophy Callout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20 pt-16 border-t border-slate-100"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-brand-text font-heading">Our Learning Philosophy</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                At RMCP Academy, we believe education should inspire curiosity, foster critical thinking, and instill a lifelong love for learning. Our teaching methodology encourages students to ask questions, explore ideas, and innovate.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We take immense pride in our alumni who have gone on to build careers in prestigious institutions across diverse fields, carrying forward the values and knowledge acquired at RMCP Academy.
              </p>
            </div>

            <div className="flex items-center">
              <div className="relative p-8 rounded-2xl bg-brand-surface border-l-4 border-brand-blue shadow-md w-full">
                <span className="absolute right-8 top-4 text-7xl text-brand-blue/10 font-serif leading-none select-none">“</span>
                <div className="space-y-4">
                  <div className="text-brand-blue text-lg sm:text-xl font-bold leading-relaxed font-heading">
                    विद्या ददाति विनयं विनयाद् याति पात्रताम् ।<br />
                    पात्रत्वाद् धनमाप्नोति धनात् धर्मं ततः सुखम् ॥
                  </div>
                  <div className="border-t border-brand-blue/10 pt-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">English Meaning</span>
                    <p className="text-slate-600 text-sm leading-relaxed font-medium">
                      Knowledge gives humility; humility leads to worthiness; worthiness brings prosperity; prosperity enables righteous living, and righteousness leads to true happiness.
                    </p>
                  </div>
                </div>
                <div className="mt-5 font-bold text-xs sm:text-sm uppercase tracking-widest text-brand-orange">
                  — The Academic Senate, RMCP
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Top Students Section */}
      <TopStudents />

      {/* Campus Highlights Interactive Accordion */}
      <section className="w-full py-24 bg-brand-text relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />
        <div className="max-w-[1600px] mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[10px] font-bold tracking-[0.2em] text-brand-orange uppercase block mb-3">Campus Highlights</span>
              <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight font-heading flex flex-wrap justify-center gap-x-2">
                <ScrollFloat text="Interactive" className="text-white" />
                <ScrollFloat text="Showcase" className="text-brand-blue font-serif italic font-medium" />
              </h2>
              <p className="text-slate-400 mt-4 max-w-2xl mx-auto">Hover or tap on the panels to explore our world-class infrastructure.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="flex flex-col lg:flex-row h-[600px] lg:h-[500px] gap-4">
            {panels.map((panel) => (
              <motion.div
                key={panel.id}
                onMouseEnter={() => setActivePanel(panel.id)}
                onClick={() => {
                  if (activePanel === panel.id) {
                    navigate(panel.path);
                  } else {
                    setActivePanel(panel.id);
                  }
                }}
                onTouchStart={() => setActivePanel(panel.id)}
                layout
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`relative rounded-3xl overflow-hidden cursor-pointer flex-shrink-0 lg:flex-shrink group border border-white/10 shadow-2xl ${activePanel === panel.id ? 'lg:flex-[3] h-[250px] sm:h-[300px] lg:h-full' : 'lg:flex-1 h-[120px] sm:h-[100px] lg:h-full'}`}
              >
                <img
                  src={panel.img}
                  alt={panel.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out"
                  style={{ transform: activePanel === panel.id ? "scale(1.05)" : "scale(1)" }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-brand-text/95 via-brand-text/30 to-transparent transition-opacity duration-500 ${activePanel === panel.id ? 'opacity-100' : 'opacity-70'}`} />
                
                <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 flex flex-col justify-end">
                  <motion.div layout="position">
                    <h3 className={`font-heading font-extrabold text-white text-lg lg:text-3xl tracking-wide mb-2 transition-all duration-500 flex items-center gap-3 ${activePanel === panel.id ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-50'}`}>
                      {panel.title}
                    </h3>
                    <AnimatePresence>
                      {activePanel === panel.id && (
                        <motion.p
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-sm block"
                        >
                          {panel.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Hero;

