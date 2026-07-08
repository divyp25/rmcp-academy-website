import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { API } from "../../assets/constant";

const Medal = ({ rank }) => {
  const isGold = rank === 1;
  const isSilver = rank === 2;
  const isBronze = rank === 3;
  
  let gradId = `medalGrad-${rank}`;
  let gradStart = "#E0F2FE"; // Light blue
  let gradMiddle = "#38BDF8"; // Sky blue
  let gradEnd = "#0284C7"; // Ocean blue
  let strokeColor = "#0284C7";

  if (isSilver) {
    gradStart = "#F1F5F9";
    gradMiddle = "#CBD5E1";
    gradEnd = "#94A3B8";
    strokeColor = "#64748B";
  } else if (isBronze) {
    gradStart = "#FFF7ED";
    gradMiddle = "#FDBA74";
    gradEnd = "#C2410C";
    strokeColor = "#C2410C";
  }

  return (
    <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 drop-shadow-md z-20">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Ribbon tails in brand blue/navy */}
        <path d="M40 50 L28 85 L50 78 Z" fill="#0B1E36" />
        <path d="M60 50 L72 85 L50 78 Z" fill="#0B1E36" />
        <path d="M44 50 L34 85 L50 78 Z" fill="#0077FF" />
        <path d="M56 50 L66 85 L50 78 Z" fill="#0077FF" />
        
        {/* Medal Circle */}
        <circle cx="50" cy="40" r="22" fill={`url(#${gradId})`} stroke={strokeColor} strokeWidth="2.5" />
        <circle cx="50" cy="40" r="18" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3,3" opacity="0.85" />
        
        {/* Rank Text in Roman Numerals */}
        <text x="50" y="48" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="900" fontFamily="Georgia, serif">
          {rank === 1 ? "I" : rank === 2 ? "II" : rank === 3 ? "III" : rank}
        </text>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradStart} />
            <stop offset="50%" stopColor={gradMiddle} />
            <stop offset="100%" stopColor={gradEnd} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const Laurels = () => (
  <>
    {/* Left Laurel in theme blue */}
    <div className="absolute left-2.5 top-1/4 text-[#0077FF]/15 pointer-events-none w-5 h-28 hidden sm:block">
      <svg viewBox="0 0 24 80" fill="currentColor" className="w-full h-full">
        <path d="M12 5C8 10 5 18 5 28C5 38 8 46 12 50C8 53 4 60 4 68C4 75 12 80 12 80" stroke="currentColor" strokeWidth="2.5" fill="none" />
        {/* Laurel leaves left side */}
        <path d="M4 14 C1 16 0 20 2 22 C4 24 8 22 7 18 Z" />
        <path d="M3 30 C0 32 -1 36 1 38 C3 40 7 38 6 34 Z" />
        <path d="M3 46 C0 48 -1 52 1 54 C3 56 7 54 6 50 Z" />
        <path d="M2 62 C-1 64 -2 68 0 70 C2 72 6 70 5 66 Z" />
      </svg>
    </div>
    {/* Right Laurel in theme blue */}
    <div className="absolute right-2.5 top-1/4 text-[#0077FF]/15 pointer-events-none w-5 h-28 scale-x-[-1] hidden sm:block">
      <svg viewBox="0 0 24 80" fill="currentColor" className="w-full h-full">
        <path d="M12 5C8 10 5 18 5 28C5 38 8 46 12 50C8 53 4 60 4 68C4 75 12 80 12 80" stroke="currentColor" strokeWidth="2.5" fill="none" />
        {/* Laurel leaves right side */}
        <path d="M4 14 C1 16 0 20 2 22 C4 24 8 22 7 18 Z" />
        <path d="M3 30 C0 32 -1 36 1 38 C3 40 7 38 6 34 Z" />
        <path d="M3 46 C0 48 -1 52 1 54 C3 56 7 54 6 50 Z" />
        <path d="M2 62 C-1 64 -2 68 0 70 C2 72 6 70 5 66 Z" />
      </svg>
    </div>
  </>
);

export default function TopStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToppers = async () => {
      try {
        const res = await axios.get(`${API}/api/top-students`);
        setStudents(res.data);
      } catch (err) {
        console.error("Failed to fetch top students:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchToppers();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
      </div>
    );
  }

  if (students.length === 0) {
    return null;
  }

  // podium layout manager: rank 1 is absolute center
  const getPodiumOrderedStudents = (list) => {
    const top5 = list.slice(0, 5);
    const rest = list.slice(5);
    
    let orderedTop5 = top5;
    if (top5.length === 5) {
      const sorted = [...top5].sort((a, b) => a.rank - b.rank);
      orderedTop5 = [sorted[3], sorted[1], sorted[0], sorted[2], sorted[4]];
    } else {
      const sorted = [...top5].sort((a, b) => a.rank - b.rank);
      const left = [];
      const right = [];
      sorted.forEach((item, index) => {
        if (index === 0) return;
        if (index % 2 === 1) left.unshift(item);
        else right.push(item);
      });
      orderedTop5 = [...left, sorted[0], ...right];
    }
    
    return [...orderedTop5, ...rest];
  };

  const podiumStudents = getPodiumOrderedStudents(students);

  // Helper to extract clean rounded score e.g. "98%"
  const getProgressLabel = (percentile) => {
    const num = parseFloat(percentile.replace(/[^0-9.]/g, ""));
    return isNaN(num) ? "95%" : `${Math.round(num)}%`;
  };

  return (
    <section className="w-full py-24 px-6 bg-white relative overflow-hidden border-t border-brand-blue/20">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#0077FF] uppercase block mb-3">Wall of Fame</span>
          <motion.h2 
            initial={{ opacity: 0, y: -25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-5xl font-black text-[#0B1E36] font-heading leading-tight flex flex-wrap justify-center gap-x-2"
          >
            <span>Academic</span>
            <span className="text-[#0077FF]">Toppers</span>
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="w-20 h-1 bg-[#0077FF] rounded-full mt-4 mx-auto origin-center" 
          />
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-slate-600 mt-4 max-w-xl mx-auto text-sm sm:text-base font-sans font-medium"
          >
            Celebrating the exceptional brilliance and hard work of our top-performing students.
          </motion.p>
        </div>

        {/* Dynamic Multi-row Layout - 5 Columns maximum per row */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-6 max-w-7xl mx-auto">
          {podiumStudents.map((student, index) => {
            const cleanPercentile = student.percentile.replace("%", "");
            const hasClassPrefix = student.class.toLowerCase().startsWith("class");
            
            return (
              <motion.div
                key={student._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="w-full max-w-[300px] rounded-[28px] p-4 pt-8 pb-0.5 flex flex-col items-center text-center transition-all duration-300 relative group border-[2px] border-[#0077FF]/30 bg-white shadow-lg shadow-[#0077FF]/5 hover:shadow-xl hover:shadow-[#0077FF]/10 hover:border-[#0077FF]"
              >
                {/* Ribbon / Medal */}
                <Medal rank={student.rank} />

                {/* Laurel branches */}
                <Laurels />

                {/* Square Student Image Box with Rounded Corners */}
                <div className="relative w-full aspect-square rounded-[20px] overflow-hidden bg-slate-50 border border-brand-blue/15 mb-6 shadow-sm flex items-center justify-center">
                  {student.photo ? (
                    <img
                      src={student.photo.startsWith("http") ? student.photo : `${API}${student.photo}`}
                      alt={student.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-slate-400 font-serif font-black text-5xl">
                      {student.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Name & Class in the same line */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-2 w-full">
                  <h3 className="font-serif font-bold text-[#0B1E36] text-lg sm:text-xl tracking-wide group-hover:text-[#0077FF] transition-colors duration-200 line-clamp-1 leading-tight">
                    {student.name}
                  </h3>
                  <span className="inline-block text-[9px] font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#E6F4F1] text-[#0F5B4E] border border-[#D1EAE6] whitespace-nowrap">
                    {hasClassPrefix ? student.class : `Class ${student.class}`}
                  </span>
                </div>

                {/* Percentage / Score on the second line */}
                <div className="mt-1 flex items-baseline justify-center">
                  <span className="font-serif italic font-extrabold text-[#0077FF] text-4xl sm:text-5xl tracking-tight">
                    {cleanPercentile}
                  </span>
                  <span className="font-serif italic font-extrabold text-slate-500 text-xl ml-0.5">%</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
