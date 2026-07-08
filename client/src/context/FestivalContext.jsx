import React, { createContext, useContext, useState, useEffect } from 'react';
import { FESTIVALS } from '../utils/festivals';

const FestivalContext = createContext();

export const useFestival = () => useContext(FestivalContext);

export const FestivalProvider = ({ children }) => {
  const [activeFestival, setActiveFestival] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [manualDate, setManualDate] = useState(null);

  useEffect(() => {
    // Get current date in MM-DD format
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    let dateString = `${month}-${day}`;

    if (manualDate !== null) {
      dateString = manualDate;
    } else {
      // dateString = "03-04"; // Holi
    }

    if (FESTIVALS[dateString]) {
      const festival = FESTIVALS[dateString];
      setActiveFestival(festival);
      
      // Override CSS Variables
      const root = document.documentElement;
      Object.entries(festival.colors).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });

      // Manage Theme Classes
      document.body.className = document.body.className.replace(/theme-[a-z-]+/g, '').trim();
      let themeClass = '';
      if (festival.name.includes("Diwali")) themeClass = 'theme-diwali';
      else if (festival.name.includes("Holi")) themeClass = 'theme-holi';
      else if (festival.name.includes("Christmas")) themeClass = 'theme-christmas';
      else if (festival.name.includes("Republic")) themeClass = 'theme-republic';
      else if (festival.name.includes("Independence")) themeClass = 'theme-independence';
      else if (festival.name.includes("New Year")) themeClass = 'theme-new-year';
      else if (festival.name.includes("Dussehra")) themeClass = 'theme-dussehra';
      else if (festival.name.includes("Gandhi")) themeClass = 'theme-gandhi';
      else if (festival.name.includes("Raksha")) themeClass = 'theme-raksha';
      else if (festival.name.includes("Children")) themeClass = 'theme-children';
      else if (festival.name.includes("Teacher")) themeClass = 'theme-teachers';
      else if (festival.name.includes("Ganesh")) themeClass = 'theme-ganesh';
      if (themeClass) document.body.classList.add(themeClass);

      // Show popup on every refresh (app mount)
      setShowPopup(true);
    } else {
      // Reset colors if no festival
      const root = document.documentElement;
      root.style.removeProperty('--app-brand-blue');
      root.style.removeProperty('--app-brand-blue-dark');
      root.style.removeProperty('--app-brand-blue-light');
      root.style.removeProperty('--app-brand-orange');
      root.style.removeProperty('--app-brand-text');
      root.style.removeProperty('--app-brand-text-muted');
      
      // Clear Theme Class
      document.body.className = document.body.className.replace(/theme-[a-z-]+/g, '').trim();
      setActiveFestival(null);
    }
  }, [manualDate]);

  const closePopup = () => setShowPopup(false);

  return (
    <FestivalContext.Provider value={{ activeFestival, showPopup, closePopup, setManualTheme: setManualDate }}>
      {children}
    </FestivalContext.Provider>
  );
};
