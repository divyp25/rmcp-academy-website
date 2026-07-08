import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Calendar as CalendarIcon, Info, Grid } from 'lucide-react';

const gazettedHolidays = [
  { date: 'Jan 26', day: 'Mon', holiday: 'Republic Day' },
  { date: 'Mar 04', day: 'Wed', holiday: 'Holi' },
  { date: 'Mar 21', day: 'Sat', holiday: 'Id-ul-Fitr*' },
  { date: 'Mar 26', day: 'Thu', holiday: 'Ram Navami' },
  { date: 'Mar 31', day: 'Tue', holiday: 'Mahavir Jayanti' },
  { date: 'Apr 03', day: 'Fri', holiday: 'Good Friday' },
  { date: 'May 01', day: 'Fri', holiday: 'Buddha Purnima' },
  { date: 'May 27', day: 'Wed', holiday: 'Id-ul-Zuha (Bakrid)' },
  { date: 'Jun 26', day: 'Fri', holiday: 'Muharram' },
  { date: 'Aug 15', day: 'Sat', holiday: 'Independence Day' },
  { date: 'Aug 26', day: 'Wed', holiday: 'Milad-un-Nabi (Id-e-Milad)' },
  { date: 'Sep 04', day: 'Fri', holiday: 'Janmashtami (Vaishnva)' },
  { date: 'Oct 02', day: 'Fri', holiday: "Mahatma Gandhi's Birthday" },
  { date: 'Oct 20', day: 'Tue', holiday: 'Dussehra' },
  { date: 'Nov 08', day: 'Sun', holiday: 'Diwali (Deepavali)' },
  { date: 'Nov 24', day: 'Tue', holiday: "Guru Nanak's Birthday" },
  { date: 'Dec 25', day: 'Fri', holiday: 'Christmas Day' },
];

const restrictedHolidays = [
  { date: 'Jan 01', day: 'Thu', holiday: "New Year's Day" },
  { date: 'Jan 03', day: 'Sat', holiday: "Hazarat Ali's Birthday" },
  { date: 'Jan 14', day: 'Wed', holiday: 'Makara Sankranti' },
  { date: 'Jan 14', day: 'Wed', holiday: 'Magha Bihu/ Pongal' },
  { date: 'Jan 23', day: 'Fri', holiday: 'Sri Panchami/ Basant Panchami' },
  { date: 'Feb 01', day: 'Sun', holiday: "Guru Ravi Das's Birthday" },
  { date: 'Feb 12', day: 'Thu', holiday: 'Birthday of Dayanand Saraswati' },
  { date: 'Feb 15', day: 'Sun', holiday: 'Maha Shivratri' },
  { date: 'Feb 19', day: 'Thu', holiday: 'Shivaji Jayanti' },
  { date: 'Mar 03', day: 'Tue', holiday: 'Holika Dahan' },
  { date: 'Mar 03', day: 'Tue', holiday: 'Dolyatra' },
  { date: 'Mar 19', day: 'Thu', holiday: 'Sukladi/ Padava/ Ugadi/ Cheti Chand' },
  { date: 'Mar 20', day: 'Fri', holiday: 'Jamat-ul-Vida' },
  { date: 'Apr 05', day: 'Sun', holiday: 'Easter Sunday' },
  { date: 'Apr 14', day: 'Tue', holiday: 'Vaisakhi/ Vishu/ Meshadi (TN)' },
  { date: 'Apr 15', day: 'Wed', holiday: 'Vaisakhadi(Bengal)/ Bahag Bihu(AS)' },
  { date: 'May 09', day: 'Sat', holiday: 'Birthday Guru Rabindranath Tagore' },
  { date: 'Jul 16', day: 'Thu', holiday: 'Rath Yatra' },
  { date: 'Aug 15', day: 'Sat', holiday: "Parsi New Year's Day/ Nauroz" },
  { date: 'Aug 26', day: 'Wed', holiday: 'Onam or Thiru Onam Day' },
  { date: 'Aug 28', day: 'Fri', holiday: 'Raksha Bandhan' },
  { date: 'Sep 14', day: 'Mon', holiday: 'Ganesh Chaturthi/ Vinayaka Chaturthi' },
  { date: 'Oct 18', day: 'Sun', holiday: 'Dussehra (Saptami)' },
  { date: 'Oct 19', day: 'Mon', holiday: 'Dussehra (Mahashtami)' },
  { date: 'Oct 20', day: 'Tue', holiday: 'Dussehra (Mahanavami)' },
  { date: 'Oct 26', day: 'Mon', holiday: "Maharishi Valmiki's Birthday" },
  { date: 'Oct 29', day: 'Thu', holiday: 'Karaka Chaturthi (Karwa Chouth)' },
  { date: 'Nov 08', day: 'Sun', holiday: 'Naraka Chaturdasi' },
  { date: 'Nov 09', day: 'Mon', holiday: 'Govardhan Puja' },
  { date: 'Nov 11', day: 'Wed', holiday: 'Bhai Duj' },
  { date: 'Nov 15', day: 'Sun', holiday: 'Pratihar or Surya Shashthi (Chhat Puja)' },
  { date: 'Nov 24', day: 'Tue', holiday: "Guru Teg Bahadur's Martyrdom Day" },
  { date: 'Dec 23', day: 'Wed', holiday: "Hazarat Ali's Birthday" },
  { date: 'Dec 24', day: 'Thu', holiday: 'Christmas Eve' },
];

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

const CalendarMonth = ({ year, monthIndex }) => {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDay = new Date(year, monthIndex, 1).getDay(); // 0 is Sunday
  
  // adjust for M T W T F S S
  const startDay = firstDay === 0 ? 6 : firstDay - 1; 
  
  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  
  return (
    <div className="border border-brand-blue/10 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-gradient-to-r from-brand-yellow/30 to-brand-yellow/10 text-center py-3 font-bold border-b border-brand-yellow/30 text-brand-text">
        {months[monthIndex]}
      </div>
      <div className="grid grid-cols-7 bg-brand-blue-light/10 text-[10px] sm:text-xs font-bold text-slate-500 text-center py-1.5 border-b border-slate-100 uppercase">
        {daysOfWeek.map((d, i) => <div key={i}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 p-2 gap-1 text-xs sm:text-sm text-center">
        {days.map((d, i) => {
          if (!d) return <div key={i} className="p-1"></div>;
          
          const mStr = months[monthIndex].substring(0, 3);
          const dStr = d < 10 ? `0${d}` : d.toString();
          const dateStr = `${mStr} ${dStr}`;
          
          const gazettedHoliday = gazettedHolidays.find(h => h.date === dateStr);
          const restrictedHoliday = restrictedHolidays.find(h => h.date === dateStr);
          
          let bgClass = "hover:bg-slate-100 rounded-md cursor-pointer transition-colors text-slate-700";
          let title = "";
          
          if (gazettedHoliday) {
            bgClass = "bg-brand-yellow text-brand-text font-bold rounded-md shadow-sm cursor-pointer border border-brand-yellow hover:opacity-90";
            title = gazettedHoliday.holiday + " (Gazetted)";
          } else if (restrictedHoliday) {
            bgClass = "bg-brand-yellow/40 text-brand-text font-semibold rounded-md cursor-pointer border border-brand-yellow/50 hover:bg-brand-yellow/60";
            title = restrictedHoliday.holiday + " (Restricted)";
          }
          
          return (
            <div key={i} className={`p-1.5 flex items-center justify-center aspect-square ${bgClass}`} title={title}>
              {d}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const SchoolCalendar = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      {/* Hero Section */}
      <div className="bg-brand-blue py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-blue-light rounded-full mix-blend-overlay filter blur-3xl opacity-50 transform translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-6 backdrop-blur-md border border-white/20">
              <CalendarDays className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-heading tracking-tight">
              Academic Calendar <span className="text-brand-blue-light">2026</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto font-medium">
              Plan your academic year with our comprehensive schedule of holidays.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 border border-slate-100">
          {/* Content */}
          <div className="w-full">
            <h3 className="text-xl font-bold text-slate-800 mb-6 font-heading border-b pb-4">
              Holidays List
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b-2 border-slate-200">
                    <th className="py-4 px-6 font-bold text-slate-700 uppercase tracking-wider text-sm">Date</th>
                    <th className="py-4 px-6 font-bold text-slate-700 uppercase tracking-wider text-sm">Day</th>
                    <th className="py-4 px-6 font-bold text-slate-700 uppercase tracking-wider text-sm">Holiday</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {gazettedHolidays.map((holiday, index) => (
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      key={index}
                      className="hover:bg-blue-50/50 transition-colors group"
                    >
                      <td className="py-4 px-6 text-slate-700 font-semibold group-hover:text-brand-blue transition-colors whitespace-nowrap">
                        {holiday.date}
                      </td>
                      <td className="py-4 px-6 text-slate-500 font-medium">
                        <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm">
                          {holiday.day}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-800 font-medium group-hover:text-brand-blue transition-colors">
                        {holiday.holiday}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolCalendar;
