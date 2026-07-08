import React, { useState, useEffect, useRef } from 'react';
import { useFestival } from '../../context/FestivalContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Moon, Sun, Minus, BookOpen, Star, Smile } from 'lucide-react';
import axios from 'axios';
import { API } from '../../assets/constant';

// Animation Tuning Constants
const IDLE_BOUNCE_DURATION = 2.5; // seconds for idle breathing bob
const BLINK_INTERVAL_MIN = 3000; // minimum ms between blinks
const BLINK_INTERVAL_MAX = 6000; // maximum ms between blinks
const WAVE_INTERVAL = 4500; // ms between greeting waves

const CATEGORY_DATA = {
  Children: {
    greeting: "Hi there! Here's what I can help you with 🎒",
    options: [
      { label: "What is today's homework?", response: "Please check the Homework section on the school app/portal, or ask your class teacher — homework is updated daily by 4 PM." },
      { label: "When is my next exam?", response: "Exam schedules are posted on the Notice Board and school website under 'Academics > Exam Timetable'." },
      { label: "How do I check my attendance?", response: "Attendance is visible through your Student Login on the school portal, updated daily by the class teacher." },
      { label: "What are the school timings?", response: "School timings are 8:00 AM to 2:00 PM, Monday to Saturday (half-day on Saturdays)." }
    ]
  },
  Parents: {
    greeting: "Welcome! Here's how I can assist you 👨‍👩‍👧",
    options: [
      { label: "How do I pay school fees?", response: "Fees can be paid online via the Parent Portal (Fee Payment section) or offline at the school accounts office." },
      { label: "How can I check my child's progress?", response: "Login to the Parent Dashboard to view report cards, attendance, and teacher remarks." },
      { label: "How do I apply for a leave for my child?", response: "Submit a leave request through the Parent Portal under 'Leave Application', or send a written note via the school diary." },
      { label: "How do I contact my child's class teacher?", response: "You can message the class teacher directly through the Parent Portal, or call the school office." }
    ]
  },
  Authors: {
    greeting: "Welcome, thank you for your interest in contributing 📖",
    options: [
      { label: "How can I contribute content to the school library?", response: "Contact the school library department to submit books, articles, or educational content." },
      { label: "What content do you accept?", response: "We accept age-appropriate story books, educational material, and reference content for Nursery to Class 12." },
      { label: "Do I retain copyright?", response: "Yes, contributors retain full copyright; the school only requests permission to use the content for learning purposes." },
      { label: "Who do I contact for submissions?", response: "Reach out to our academic coordinator via the 'Contact Us' page." }
    ]
  },
  Publishers: {
    greeting: "Hello! Here's information for publishers and vendors 🏢",
    options: [
      { label: "How do I supply textbooks to the school?", response: "Contact the school's procurement office with your catalogue; textbook orders are finalized before the new academic session." },
      { label: "How do I become an approved vendor?", response: "Submit your company details and product catalogue to the Administration Office for review." },
      { label: "What are your order timelines?", response: "Bulk orders are typically placed in March-April; share quotations at least 2 months in advance." },
      { label: "Who do I contact for partnerships?", response: "Use the 'Contact Us' page and select 'Vendor/Publisher Enquiry' as the subject." }
    ]
  }
};

const ChatbotMascot = () => {
  const { activeFestival } = useFestival();
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [suggestions, setSuggestions] = useState("");
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const messagesEndRef = useRef(null);

  // Avatar Animation States
  const [isWaving, setIsWaving] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [mascotReaction, setMascotReaction] = useState("idle"); // idle, speak-bounce, nod

  const handleFeedbackSubmit = async () => {
    setSubmittingFeedback(true);
    try {
      await axios.post(`${API}/api/cms/chatbot/feedback`, {
        rating,
        suggestions,
        chatHistory: messages
      });
    } catch (err) {
      console.error("Failed to submit feedback:", err);
    }
    setSubmittingFeedback(false);
    setShowReview(false);
    setRating(0);
    setSuggestions("");
    setIsOpen(false);
  };

  const handleFeedbackSkip = () => {
    setShowReview(false);
    setRating(0);
    setSuggestions("");
    setIsOpen(false);
  };

  const getMascotImage = () => {
    if (!activeFestival) return '/mascots/mascot_default.png';
    const name = activeFestival.name.toLowerCase();
    if (name.includes('new year')) return '/mascots/mascot_newyear.png';
    if (name.includes('republic')) return '/mascots/mascot_republic.png';
    if (name.includes('holi')) return '/mascots/mascot_holi.png';
    if (name.includes('independence')) return '/mascots/mascot_independence.png';
    if (name.includes('raksha')) return '/mascots/mascot_raksha.png';
    if (name.includes('teacher')) return '/mascots/mascot_teachers.png';
    if (name.includes('ganesh')) return '/mascots/mascot_ganesh.png';
    if (name.includes('gandhi')) return '/mascots/mascot_gandhi.png';
    if (name.includes('dussehra')) return '/mascots/mascot_dussehra.png';
    if (name.includes('diwali')) return '/mascots/mascot_diwali.png';
    if (name.includes('children')) return '/mascots/mascot_childrens.png';
    if (name.includes('christmas')) return '/mascots/mascot_christmas.png';
    return '/mascots/mascot_default.png';
  };

  const resetToCategories = () => {
    setSelectedCategory(null);
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'bot',
      type: 'category-menu',
      content: "PLEASE SELECT A CATEGORY:",
      timestamp
    }]);
    triggerMascotReaction("speak-bounce");
  };

  // Initialize
  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([
      {
        id: 1,
        sender: 'bot',
        type: 'text',
        content: "Hi there! 👋 I'm Shrushit, your school assistant for Rajendra Mohan Chandrika Prasad Academy, Bilsanda.",
        timestamp
      },
      {
        id: 2,
        sender: 'bot',
        type: 'category-menu',
        content: "PLEASE SELECT A CATEGORY:",
        timestamp
      }
    ]);
  }, [activeFestival]);

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Manage Periodic Wave & Blink timers cleanly
  useEffect(() => {
    // Both states run these periodically
    const waveInterval = setInterval(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 1500);
    }, WAVE_INTERVAL);

    let blinkTimeout;
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
      const nextDelay = Math.random() * (BLINK_INTERVAL_MAX - BLINK_INTERVAL_MIN) + BLINK_INTERVAL_MIN;
      blinkTimeout = setTimeout(triggerBlink, nextDelay);
    };
    blinkTimeout = setTimeout(triggerBlink, BLINK_INTERVAL_MIN);

    return () => {
      clearInterval(waveInterval);
      clearTimeout(blinkTimeout);
    };
  }, []);

  const triggerMascotReaction = (type) => {
    setMascotReaction(type);
    setTimeout(() => setMascotReaction("idle"), 800);
  };

  const handleCategorySelect = (category) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'user',
      type: 'text',
      content: category,
      timestamp
    }]);

    setSelectedCategory(category);
    setIsTyping(true);
    triggerMascotReaction("nod");

    setTimeout(() => {
      setIsTyping(false);
      const data = CATEGORY_DATA[category];

      if (data) {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'bot',
          type: 'quick-replies',
          content: data.greeting,
          quickReplies: data.options,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        triggerMascotReaction("speak-bounce");
      }
    }, 800);
  };

  const handleOptionSelect = (option) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'user',
      type: 'text',
      content: option.label,
      timestamp
    }]);

    setIsTyping(true);
    triggerMascotReaction("nod");

    setTimeout(() => {
      setIsTyping(false);
      
      setMessages(prev => [...prev, 
        {
          id: Date.now() + 1,
          sender: 'bot',
          type: 'text',
          content: option.response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          id: Date.now() + 2,
          sender: 'bot',
          type: 'quick-replies',
          content: "Is there anything else I can help you with?",
          quickReplies: [
            { label: "🔙 Back to categories", isBackAction: true }
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      triggerMascotReaction("speak-bounce");
    }, 800);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'user',
      type: 'text',
      content: userText,
      timestamp
    }]);

    setInputValue("");
    setIsTyping(true);
    triggerMascotReaction("nod");

    setTimeout(() => {
      setIsTyping(false);
      const textLower = userText.toLowerCase();
      let botResponse = "Thanks! Is there anything else I can help you with from the menu above?";

      if (textLower.includes("admission") || textLower.includes("apply") || textLower.includes("enquiry")) {
        botResponse = "Admissions are currently open at RMCP Academy! You can fill out the enquiry form directly from the homepage by clicking the top banner or using the menu.";
      } else if (textLower.includes("address") || textLower.includes("locate") || textLower.includes("where")) {
        botResponse = "RMCP Academy is located near Gola Road, Vill Ghanshyampur, Bilsanda, Uttar Pradesh 262202. You can find maps and contacts in the footer!";
      } else if (textLower.includes("fee") || textLower.includes("fees")) {
        botResponse = "Our fee structure is available publicly on the Mandatory Disclosure section. Go to Mandatory Disclosure in the navigation menu!";
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        type: 'text',
        content: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      triggerMascotReaction("speak-bounce");
    }, 800);
  };

  // Determine motion variants for mascot character based on state
  const getMascotVariants = () => {
    if (isTyping) {
      return {
        animate: {
          rotate: [-3, 3, -3],
          y: [0, -2, 0],
          transition: {
            repeat: Infinity,
            duration: 0.8,
            ease: "easeInOut"
          }
        }
      };
    }

    if (mascotReaction === "speak-bounce") {
      return {
        animate: {
          scale: [1, 1.15, 1],
          y: [0, -12, 0],
          transition: {
            duration: 0.4,
            ease: "easeOut"
          }
        }
      };
    }

    if (mascotReaction === "nod") {
      return {
        animate: {
          rotate: [0, -8, 0],
          y: [0, 4, 0],
          transition: {
            duration: 0.3,
            ease: "easeInOut"
          }
        }
      };
    }

    if (isWaving) {
      return {
        animate: {
          rotate: [0, 12, -4, 12, 0],
          transition: {
            duration: 1.2
          }
        }
      };
    }

    // Default Idle breathing bob
    return {
      animate: {
        y: [0, -5, 0],
        transition: {
          repeat: Infinity,
          duration: IDLE_BOUNCE_DURATION,
          ease: "easeInOut"
        }
      }
    };
  };

  return (
    <div className={`fixed bottom-6 left-6 z-[100] font-sans flex flex-col items-start ${isDarkMode ? 'dark' : ''}`}>
      {/* Chat Window Panel & Standing Mascot Container */}
      <AnimatePresence>
        {isOpen && (
          <div className="flex items-end gap-4 relative">
            
            {/* Standing Animated Mascot Character cutout */}
            <motion.div
              initial={{ y: 120, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 120, opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="hidden md:flex flex-col items-center select-none w-28 shrink-0 relative pointer-events-none"
            >
              <motion.div
                className="w-24 h-48 relative overflow-visible"
                variants={getMascotVariants()}
                animate="animate"
              >
                <img
                  src={getMascotImage()}
                  alt="Shrushit Interactive Avatar"
                  className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]"
                />
                
                {/* Blinking eyes simulation overlay */}
                {isBlinking && (
                  <div className="absolute top-[28%] left-[38%] w-1.5 h-0.5 bg-[#1e293b] rounded-full"></div>
                )}
                {isBlinking && (
                  <div className="absolute top-[28%] right-[38%] w-1.5 h-0.5 bg-[#1e293b] rounded-full"></div>
                )}
              </motion.div>
            </motion.div>

            {/* Main Chat Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`w-[calc(100vw-2rem)] sm:w-[420px] h-[80vh] sm:h-[620px] rounded-3xl shadow-2xl border flex flex-col overflow-hidden transition-all duration-300 ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-100 text-slate-700'
              }`}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#ffe4e6] to-[#fdf2f8] border-b border-rose-100 p-4 py-4.5 flex justify-between items-center shadow-md select-none w-full">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={getMascotImage()} alt="Shrushit" className="w-10 h-10 rounded-full bg-white object-cover border-2 border-rose-200 shadow-md shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-base leading-tight text-rose-950">Shrushit Bot</h3>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <button type="button" onClick={() => setIsDarkMode(!isDarkMode)} className="hover:scale-110 p-2 rounded-full hover:bg-rose-100/50 transition-all duration-300 cursor-pointer text-rose-950" title="Toggle theme">
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                  <button type="button" onClick={() => setShowReview(true)} className="hover:scale-110 p-2 rounded-full hover:bg-rose-100/50 transition-all duration-300 cursor-pointer text-rose-950" title="Minimize">
                    <Minus size={20} />
                  </button>
                </div>
              </div>

              {/* Chat Body OR Review Screen */}
              {showReview ? (
                <div className={`flex-grow flex flex-col items-center justify-center p-6 text-center w-full ${
                  isDarkMode ? 'bg-slate-950' : 'bg-slate-50'
                }`}>
                  <div className="w-16 h-16 bg-gradient-to-r from-rose-100 to-amber-50 rounded-full flex items-center justify-center border border-rose-200/50 mb-4 shadow-sm shrink-0">
                    <Smile className="w-9 h-9 text-rose-600" />
                  </div>

                  <h3 className="font-heading font-black text-xl text-rose-950 dark:text-rose-100 mb-1 leading-tight">
                    How was your experience?
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-6">
                    Your feedback helps us improve Shrushit for everyone.
                  </p>

                  <div className="flex gap-2.5 mb-6">
                    {[1, 2, 3, 4, 5].map((starVal) => {
                      const isSelected = rating >= starVal;
                      return (
                        <button
                          key={starVal}
                          type="button"
                          onClick={() => setRating(starVal)}
                          className="hover:scale-115 transition-transform cursor-pointer"
                        >
                          <Star 
                            size={32} 
                            className={`transition-colors duration-200 ${
                              isSelected 
                                ? 'fill-amber-400 text-amber-400' 
                                : 'text-slate-300 dark:text-slate-650'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  <div className="w-full mb-6 relative">
                    <textarea
                      value={suggestions}
                      onChange={(e) => setSuggestions(e.target.value.slice(0, 300))}
                      placeholder="Any Suggestions For Improvement? (Optional)"
                      rows={3}
                      className={`w-full p-4.5 rounded-2xl border text-xs font-semibold focus:outline-none resize-none transition-all ${
                        isDarkMode 
                          ? 'bg-slate-900 border-slate-800 text-white focus:border-rose-500/50' 
                          : 'bg-white border-slate-200 text-slate-700 focus:border-rose-400/50'
                      }`}
                    />
                    <span className="absolute bottom-2.5 right-3 text-[10px] text-slate-400 font-bold">
                      {suggestions.length}/300
                    </span>
                  </div>

                  <div className="flex w-full gap-3 mt-auto">
                    <button
                      type="button"
                      onClick={handleFeedbackSkip}
                      className={`flex-1 py-3 px-4 rounded-2xl font-bold text-xs tracking-wider uppercase border transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                        isDarkMode 
                          ? 'border-slate-800 hover:bg-slate-900 text-slate-450' 
                          : 'border-slate-200 hover:bg-slate-100 text-slate-500'
                      }`}
                    >
                      Skip
                    </button>
                    <button
                      type="button"
                      onClick={handleFeedbackSubmit}
                      disabled={rating === 0 || submittingFeedback}
                      className="flex-1 py-3 px-4 rounded-2xl font-bold text-xs tracking-wider uppercase bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white shadow-md shadow-rose-400/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {submittingFeedback ? "Submitting..." : "Submit Feedback"}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className={`flex-1 overflow-y-auto p-4 flex flex-col gap-4 no-scrollbar w-full ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex gap-2.5 items-start ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-[fadeInUp_0.3s_ease-out]`}>
                        {msg.sender === 'bot' && (
                          <div className="w-7 h-7 flex items-center justify-center bg-white border border-slate-100 rounded-full p-1.5 shadow-sm shrink-0">
                            <BookOpen className="w-full h-full text-rose-600" />
                          </div>
                        )}
                        <div className="flex flex-col gap-1 w-full max-w-[78%] relative">
                          
                          {/* Speech bubble pop-in tail connector for bot messages */}
                          {msg.sender === 'bot' && msg.type === 'text' && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 300, damping: 15 }}
                              className="absolute left-[-6px] bottom-4 w-3 h-3 bg-white dark:bg-slate-800 rotate-45 border-l border-b border-slate-100 dark:border-slate-700 z-0 hidden md:block"
                            ></motion.div>
                          )}

                          {msg.type === 'text' && (
                            <div className={`p-3.5 px-4 rounded-2xl text-xs sm:text-sm font-semibold leading-relaxed relative z-10 ${
                              msg.sender === 'user' ? 'bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-br-none shadow-md' : isDarkMode ? 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none shadow-sm' : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none shadow-sm'
                            }`}>
                              {msg.content}
                            </div>
                          )}
                          {msg.type === 'category-menu' && (
                            <div className={`p-4 rounded-2xl border flex flex-col gap-3 shadow-md ${isDarkMode ? 'bg-slate-850 border-slate-700' : 'bg-white border-slate-100'}`}>
                              <span className="text-xs font-black uppercase tracking-wider text-rose-400 block mb-1">{msg.content}</span>
                              <div className="grid grid-cols-2 gap-2">
                                {["Children", "Parents", "Authors", "Publishers"].map((cat) => (
                                  <button key={cat} type="button" onClick={() => handleCategorySelect(cat)} className="bg-gradient-to-r from-rose-100 to-amber-50 hover:from-rose-200 hover:to-amber-100 border border-rose-200/50 hover:border-rose-300 text-rose-950 font-bold py-2.5 px-2 rounded-full text-xs transition-all duration-300 shadow-sm hover:-translate-y-0.5 hover:shadow-md cursor-pointer flex items-center justify-center">
                                    {cat}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          {msg.type === 'quick-replies' && (
                            <div className="flex flex-col gap-2 w-full">
                              <div className={`p-3 px-4 rounded-2xl text-xs sm:text-sm font-semibold leading-relaxed rounded-bl-none shadow-sm border ${isDarkMode ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-white text-slate-700 border-slate-100'}`}>
                                {msg.content}
                              </div>
                              <div className="flex flex-col gap-1.5 mt-1">
                                {msg.quickReplies?.map((opt, oIdx) => (
                                  <button key={oIdx} type="button" onClick={() => opt.isBackAction ? resetToCategories() : handleOptionSelect(opt)} className="w-full text-left bg-gradient-to-r from-rose-50 to-rose-100/50 hover:from-rose-200 hover:to-rose-300 border border-rose-200/40 hover:border-transparent text-rose-950 font-bold py-2.5 px-4 rounded-full text-xs transition-all duration-300 shadow-sm hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5">
                                    {opt.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          <span className="text-[9px] text-slate-400 font-bold px-1 uppercase tracking-wider block">{msg.timestamp}</span>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-2.5 items-start justify-start animate-pulse">
                        <div className="w-7 h-7 flex items-center justify-center bg-white border border-slate-100 rounded-full p-1.5 shadow-sm shrink-0">
                          <BookOpen className="w-full h-full text-rose-600" />
                        </div>
                        <div className={`p-3.5 px-5 rounded-2xl rounded-bl-none border flex items-center gap-1 shadow-sm ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
                          <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce"></span>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  <form onSubmit={handleSendMessage} className={`p-3 border-t flex items-center gap-2 w-full ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      disabled={!selectedCategory}
                      placeholder={!selectedCategory ? "Select a category first" : "Type a message..."}
                      className={`flex-grow px-4 py-2.5 rounded-full text-xs font-semibold focus:outline-none border transition-all ${
                        isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-rose-500/50' : 'bg-slate-50 border-slate-200 text-slate-700 focus:border-rose-400/50'
                      }`}
                    />
                    <button type="submit" className="w-9 h-9 rounded-full bg-gradient-to-r from-rose-400 to-rose-500 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md shrink-0 cursor-pointer">
                      <Send size={14} className="ml-0.5" />
                    </button>
                  </form>
                </>
              )}
              <div className={`py-2 text-[9px] font-bold text-center uppercase tracking-widest w-full ${isDarkMode ? 'bg-slate-900 text-rose-500' : 'bg-white text-rose-400'}`}>
                Rajendra Mohan Chandrika Prasad Academy, Bilsanda
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Mascot Launcher Button on the Left (when Chat is closed) */}
      {!isOpen && (
        <div className="relative flex items-center justify-center">
          {/* Radial Gradient Glow Circle behind mascot */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.6, 0.3, 0.6]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-rose-200/40 to-pink-100/40 blur-xl pointer-events-none z-0"
          ></motion.div>

          {/* Launcher container - fully transparent */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            onClick={() => setIsOpen(true)}
            className="relative w-24 h-24 flex items-center justify-center cursor-pointer overflow-visible z-10 select-none"
          >
            {/* Mascot Image cutout - clean shadow */}
            <motion.div
              className="w-[125%] h-[125%] absolute -bottom-1"
              animate={isWaving ? {
                rotate: [0, 12, -4, 12, 0],
                y: [0, -5, 0]
              } : {
                y: [0, -5, 0]
              }}
              transition={isWaving ? {
                duration: 1.2
              } : {
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut"
              }}
            >
              <img
                src={getMascotImage()}
                alt="Shrushit Launcher"
                className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)]"
              />
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ChatbotMascot;
