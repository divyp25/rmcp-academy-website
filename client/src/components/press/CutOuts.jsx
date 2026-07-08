import React, { useState } from "react";
import {
  Newspaper,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  Award,
  ExternalLink,
  ZoomIn,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import press1Img from "../../assets/img/press_1.jpg";
import press2Img from "../../assets/img/press_2.jpg";
import press3Img from "../../assets/img/press_3.jpg";
import press4Img from "../../assets/img/press_4.jpg";
import press5Img from "../../assets/img/press_5.jpg";
import press6Img from "../../assets/img/press_6.jpg";

const CutOuts = () => {
  // State for the lightbox/modal
  const [selectedImage, setSelectedImage] = useState(null);

  // Sample press coverage data
  const pressItems = [
    {
      id: 1,
      source: "Education Today",
      title: "Learning Center Recognized for Excellence in Special Education",
      date: "March 15, 2025",
      thumbnail: press1Img,
      alt: "Article about learning center's excellence award",
    },
    {
      id: 2,
      source: "The Daily Chronicle",
      title: "Innovative Methods Help Students Overcome Learning Challenges",
      date: "February 8, 2025",
      thumbnail: press2Img,
      alt: "Feature article on innovative teaching methods",
    },
    {
      id: 3,
      source: "Education Weekly",
      title: "Local Learning Center Sets New Standards for Inclusive Education",
      date: "January 22, 2025",
      thumbnail: press3Img,
      alt: "Article about inclusive education standards",
    },
    {
      id: 4,
      source: "City News",
      title: "Students with Learning Difficulties Thrive in Specialized Program",
      date: "December 10, 2024",
      thumbnail: press4Img,
      alt: "News feature about student success stories",
    },
    {
      id: 5,
      source: "Education Times",
      title: "Learning Center Celebrates 10 Years of Transforming Lives",
      date: "November 5, 2024",
      thumbnail: press5Img,
      alt: "Anniversary coverage article",
    },
    {
      id: 6,
      source: "School Spotlight Magazine",
      title: "Special Feature: A Day in the Life at the Learning Center",
      date: "October 18, 2024",
      thumbnail: press6Img,
      alt: "Magazine feature about daily activities",
    },
  ];

  return (
    <div className="bg-brand-bg py-24 font-sans relative overflow-hidden min-h-screen">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest">
            Media & News
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-brand-text font-heading tracking-tight uppercase">
            Press <span className="text-brand-blue">Coverage</span>
          </h2>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto my-4 rounded-full"></div>
          <p className="text-slate-655 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed italic">
            "Our learning center in the news and media"
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pressItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-brand-blue/10 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div
                className="relative cursor-pointer p-1.5 bg-brand-surface border-b border-brand-blue/5 overflow-hidden"
                onClick={() => setSelectedImage(item)}
              >
                <img
                  src={item.thumbnail}
                  alt={item.alt}
                  className="w-full h-56 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute inset-1.5 rounded-2xl bg-brand-text/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3 rounded-full bg-white/25 backdrop-blur-md text-white border border-white/20">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-brand-orange font-bold text-xs uppercase tracking-wider">
                    <Award size={16} />
                    <span>{item.source}</span>
                  </div>
                  <h4 className="font-bold text-brand-text text-base sm:text-lg font-heading leading-snug uppercase line-clamp-2">
                    {item.title}
                  </h4>
                </div>
                <div className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-wider pt-3 border-t border-slate-100">
                  <Calendar className="mr-1.5 text-brand-blue" size={14} />
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Lightbox/Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white max-w-3xl w-full rounded-3xl border border-white/20 overflow-hidden shadow-2xl relative p-5 sm:p-6 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-slate-950/50 hover:bg-slate-950 text-white transition-colors cursor-pointer"
                onClick={() => setSelectedImage(null)}
              >
                <X size={20} />
              </button>

              <div className="bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center p-2 min-h-[300px]">
                <img
                  src={selectedImage.thumbnail}
                  alt={selectedImage.alt}
                  className="max-h-[60vh] object-contain rounded-xl"
                />
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="font-black text-brand-text text-lg sm:text-xl font-heading uppercase leading-tight">
                  {selectedImage.title}
                </h4>
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-400">
                  <span className="text-brand-orange">{selectedImage.source}</span>
                  <span>{selectedImage.date}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CutOuts;
