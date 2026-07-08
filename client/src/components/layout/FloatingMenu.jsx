import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, MapPin, PenTool, Heart, Palette } from 'lucide-react';
import { useFestival } from '../../context/FestivalContext';
import { FESTIVALS } from '../../utils/festivals';

const FloatingMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { setManualTheme } = useFestival();
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== "/") {
        setIsVisible(true);
        return;
      }
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 1.0; // Hero track wrapper height (100vh)
      if (scrollY >= heroHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    // Initial check in case page starts scrolled down
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const menuItems = [
    {
      id: 0,
      icon: <Info className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "About Us",
      action: () => navigate("/academy/about")
    },
    {
      id: 1,
      icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "Our Campus",
      action: () => navigate("/infrastructure/overview")
    },
    {
      id: 2,
      icon: <PenTool className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "Click here for Admission Enquiry",
      action: () => navigate("/admission-enquiry"),
      highlight: true
    },
    {
      id: 3,
      icon: <Heart className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "Student Life",
      action: () => navigate("/gallery")
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 1, x: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        x: isVisible ? 0 : 50,
        pointerEvents: isVisible ? "auto" : "none"
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed right-3 sm:right-6 bottom-20 sm:bottom-24 z-40 flex flex-col gap-3 sm:gap-4 items-end"
    >
      {/* Theme Switcher Dropdown */}
      <AnimatePresence>
        {showThemeMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-2 bg-white/90 backdrop-blur-md border border-brand-blue/20 rounded-xl shadow-2xl p-2 flex flex-col gap-1 w-48 origin-bottom-right"
          >
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2 pb-1 border-b border-slate-100 mb-1">Select Theme</div>
            <button onClick={() => { setManualTheme(''); setShowThemeMenu(false); }} className="text-left px-3 py-2 text-sm rounded-lg hover:bg-brand-surface transition-colors font-medium text-slate-700">
              Default Theme
            </button>
            {Object.entries(FESTIVALS).map(([date, festival]) => (
              <button 
                key={date}
                onClick={() => { setManualTheme(date); setShowThemeMenu(false); }}
                className="text-left px-3 py-2 text-sm rounded-lg hover:bg-brand-surface transition-colors flex items-center justify-between"
              >
                <span className="font-medium text-slate-700 truncate mr-2">{festival.name}</span>
                <span>{festival.icon}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Switcher Button */}
      <div 
        className="relative flex items-center justify-end mb-2"
        onMouseEnter={() => setHoveredIndex('theme')}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <AnimatePresence>
          {hoveredIndex === 'theme' && !showThemeMenu && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 5, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-16 px-4 py-2 bg-brand-text text-white text-xs font-bold tracking-widest uppercase rounded-xl whitespace-nowrap shadow-xl pointer-events-none"
            >
              Change Theme
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowThemeMenu(!showThemeMenu)}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full text-brand-text bg-white flex items-center justify-center shadow-lg border-2 border-brand-blue/20 transition-all duration-300 relative group overflow-hidden"
        >
          <Palette className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-brand-blue transition-colors" />
        </motion.button>
      </div>

      {menuItems.map((item, index) => (
        <div 
          key={item.id} 
          className="relative flex items-center justify-end"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Tooltip Label */}
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 5, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-16 px-4 py-2 bg-brand-text text-white text-xs font-bold tracking-widest uppercase rounded-xl whitespace-nowrap shadow-xl pointer-events-none"
              >
                {item.label}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Circular Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, type: 'spring' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={item.action}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full text-white flex items-center justify-center shadow-lg border-2 border-white/20 transition-all duration-300 relative group overflow-hidden ${
              item.highlight 
                ? 'bg-brand-orange hover:bg-brand-orange/90 shadow-brand-orange/40 hover:shadow-xl animate-[pulse_2s_ease-in-out_infinite]' 
                : 'bg-brand-blue hover:bg-brand-blue-dark shadow-brand-blue/50 hover:shadow-xl'
            }`}
            aria-label={item.label}
          >
            {/* Soft glow effect on hover */}
            <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-150 rounded-full transition-transform duration-500 ease-out" />
            <div className="relative z-10 group-hover:text-brand-orange transition-colors duration-300">
              {item.icon}
            </div>
          </motion.button>
        </div>
      ))}
    </motion.div>
  );
};

export default FloatingMenu;
