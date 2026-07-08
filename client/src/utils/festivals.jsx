import React from 'react';

export const FESTIVALS = {
  "01-01": {
    name: "New Year's Day",
    message: "Happy New Year! Wishing you a year of success and growth at RMCP Academy.",
    colors: {
      "--app-brand-blue": "#D4AF37", // Gold
      "--app-brand-blue-dark": "#B5952F",
      "--app-brand-blue-light": "#F9F6EB",
      "--app-brand-orange": "#C0C0C0", // Silver
      "--app-brand-text": "#332600", // Dark Gold/Brown
      "--app-brand-text-muted": "#66521A",
    },
    icon: "🎉"
  },
  "01-26": {
    name: "Republic Day",
    message: "Happy Republic Day! Proud to be an Indian.",
    colors: {
      "--app-brand-blue": "#1E3A8A", // Formal Slate Indigo
      "--app-brand-blue-dark": "#172554",
      "--app-brand-blue-light": "#DBEAFE",
      "--app-brand-orange": "#D97706", // Muted Saffron
      "--app-brand-text": "#0F172A", // Deep Slate (Softer than Blue)
      "--app-brand-text-muted": "#334155",
    },
    icon: "🇮🇳 ☸️"
  },
  "03-04": {
    name: "Holi",
    message: "Happy Holi! May your life be filled with vibrant colors.",
    colors: {
      "--app-brand-blue": "#E91E63", // Vibrant Pink
      "--app-brand-blue-dark": "#C2185B",
      "--app-brand-blue-light": "#FCE4EC",
      "--app-brand-orange": "#9C27B0", // Purple
      "--app-brand-text": "#330017", // Very dark pink
      "--app-brand-text-muted": "#661A3D",
    },
    icon: "🎨"
  },
  "08-15": {
    name: "Independence Day",
    message: "Happy Independence Day! Saluting our great nation.",
    colors: {
      "--app-brand-blue": "#EA580C", // Vibrant Saffron
      "--app-brand-blue-dark": "#C2410C",
      "--app-brand-blue-light": "#FFEDD5",
      "--app-brand-orange": "#16A34A", // Leafy Green
      "--app-brand-text": "#7C2D12", // Rich Warm Brown (No Blue)
      "--app-brand-text-muted": "#9A3412",
    },
    icon: "🇮🇳 🪁"
  },
  "10-02": {
    name: "Mahatma Gandhi Jayanti",
    message: "Remembering the Father of the Nation. Happy Gandhi Jayanti.",
    colors: {
      "--app-brand-blue": "#8D6E63", // Khadi/Earthy Brown
      "--app-brand-blue-dark": "#5D4037",
      "--app-brand-blue-light": "#EFEBE9",
      "--app-brand-orange": "#4CAF50", // Peaceful Green
      "--app-brand-text": "#3E2723", // Dark Brown
      "--app-brand-text-muted": "#795548",
    },
    icon: "🕊️"
  },
  "10-20": {
    name: "Dussehra",
    message: "Happy Dussehra! May truth and goodness always triumph.",
    colors: {
      "--app-brand-blue": "#FF5722", // Deep Orange
      "--app-brand-blue-dark": "#E64A19",
      "--app-brand-blue-light": "#FBE9E7",
      "--app-brand-orange": "#FFC107", // Gold
      "--app-brand-text": "#331100", // Very dark orange/brown
      "--app-brand-text-muted": "#662B1A",
    },
    icon: "🏹"
  },
  "11-08": {
    name: "Diwali (Deepavali)",
    message: "Happy Diwali! May the festival of lights bring you joy and prosperity.",
    colors: {
      "--app-brand-blue": "#FFB300", // Bright Gold
      "--app-brand-blue-dark": "#FF8F00",
      "--app-brand-blue-light": "#FFF8E1",
      "--app-brand-orange": "#D32F2F", // Festive Red
      "--app-brand-text": "#331A00", // Very dark gold/orange
      "--app-brand-text-muted": "#663D1A",
    },
    icon: "🪔"
  },
  "12-25": {
    name: "Christmas Day",
    message: "Merry Christmas! Wishing you joy and peace.",
    colors: {
      "--app-brand-blue": "#D32F2F", // Christmas Red
      "--app-brand-blue-dark": "#B71C1C",
      "--app-brand-blue-light": "#FFEBEE",
      "--app-brand-orange": "#388E3C", // Christmas Green
      "--app-brand-text": "#2B0000", // Very dark red
      "--app-brand-text-muted": "#521A1A",
    },
    icon: "🎄"
  },
  "08-19": {
    name: "Raksha Bandhan",
    message: "Happy Raksha Bandhan! Celebrating the bond of love and protection.",
    colors: {
      "--app-brand-blue": "#E91E63", // Deep Pink
      "--app-brand-blue-dark": "#C2185B",
      "--app-brand-blue-light": "#FCE4EC",
      "--app-brand-orange": "#FFD700", // Gold thread
      "--app-brand-text": "#4A148C", // Deep Purple
      "--app-brand-text-muted": "#7B1FA2",
    },
    icon: "🎀"
  },
  "09-05": {
    name: "Teachers' Day",
    message: "Happy Teachers' Day! Thank you to all the mentors who guide our path.",
    colors: {
      "--app-brand-blue": "#3F51B5", // Academic Indigo
      "--app-brand-blue-dark": "#303F9F",
      "--app-brand-blue-light": "#E8EAF6",
      "--app-brand-orange": "#FFC107", // Wisdom Amber
      "--app-brand-text": "#1A237E", // Dark Navy
      "--app-brand-text-muted": "#3949AB",
    },
    icon: "📚"
  },
  "09-07": {
    name: "Ganesh Chaturthi",
    message: "Happy Ganesh Chaturthi! May Lord Ganesha remove all obstacles.",
    colors: {
      "--app-brand-blue": "#B7410E", // Terracotta
      "--app-brand-blue-dark": "#8B300A",
      "--app-brand-blue-light": "#FDECE6",
      "--app-brand-orange": "#DAA520", // Goldenrod
      "--app-brand-text": "#5C2005", // Deep Rust
      "--app-brand-text-muted": "#8A3816",
    },
    icon: <img src="/ganesh-icon.png" className="w-5 h-5 inline-block align-middle object-contain" alt="Ganesha" />
  },
  "11-14": {
    name: "Children's Day",
    message: "Happy Children's Day! Nurturing the bright minds of tomorrow.",
    colors: {
      "--app-brand-blue": "#00BCD4", // Bright Aqua
      "--app-brand-blue-dark": "#0097A7",
      "--app-brand-blue-light": "#E0F7FA",
      "--app-brand-orange": "#FF4081", // Playful Pink
      "--app-brand-text": "#006064", // Deep Cyan
      "--app-brand-text-muted": "#00838F",
    },
    icon: "🎈"
  }
};
