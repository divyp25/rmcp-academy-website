import React from "react";
import { Utensils, Store, Clock } from "lucide-react";

import canteen1Img from "../../assets/img/canteen_1.jpeg";
import canteen2Img from "../../assets/img/canteen_2.jpeg";
import canteen3Img from "../../assets/img/canteen_3.jpeg";

const canteenImages = [
  canteen1Img, canteen2Img, canteen3Img
];

export default function Canteen() {
  return (
    <div className="bg-brand-bg py-24 font-sans relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest">
            Campus Dining
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-brand-text font-heading tracking-tight uppercase">
            <>Canteen <span className="text-brand-blue">Facility</span></>
          </h2>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto my-4 rounded-full"></div>
          <p className="text-slate-655 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed italic">
            "A neat, hygienic, and well-stocked canteen open during school hours."
          </p>
        </div>
        
        {/* Features Row */}
        <div className="flex flex-col sm:flex-row justify-center gap-8 text-brand-text mb-12">
          <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl border border-brand-blue/10 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="p-2 bg-brand-orange/10 rounded-xl text-brand-orange">
              <Utensils size={28} />
            </div>
            <span className="text-base sm:text-lg font-bold font-heading uppercase tracking-wide">Hygienic Food</span>
          </div>
          <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl border border-brand-blue/10 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="p-2 bg-brand-blue/10 rounded-xl text-brand-blue">
              <Store size={28} />
            </div>
            <span className="text-base sm:text-lg font-bold font-heading uppercase tracking-wide">Well Stocked</span>
          </div>
          <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl border border-brand-blue/10 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="p-2 bg-brand-orange/10 rounded-xl text-brand-orange">
              <Clock size={28} />
            </div>
            <span className="text-base sm:text-lg font-bold font-heading uppercase tracking-wide">Open School Hours</span>
          </div>
        </div>
        
        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {canteenImages.map((image, index) => (
            <div key={index} className="relative p-1.5 bg-white border border-brand-blue/10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <img 
                src={image} 
                alt={`Canteen View ${index + 1}`} 
                className="rounded-xl object-cover w-full h-56" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
