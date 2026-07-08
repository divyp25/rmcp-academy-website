import React, { useState } from "react";
import {
  BookOpen,
  Calendar,
  ChevronDown,
  Download,
  Eye,
  FileText,
  Search,
} from "lucide-react";

import mag_cover1 from "../../assets/img/mag_cover1.jpg";
import mag_cover2 from "../../assets/img/mag_cover2.jpg";
import mag_cover3 from "../../assets/img/mag_cover3.jpg";
import mag_cover4 from "../../assets/img/mag_cover4.jpg";
import mag_cover5 from "../../assets/img/mag_cover5.jpg";
import mag_cover6 from "../../assets/img/mag_cover6.jpg";

const Magazines = () => {
  const currentMagazines = [
    {
      id: 1,
      title: "Spring Edition",
      coverImage: mag_cover1,
      pdfUrl: "/magazines/magazine (1).pdf",
      month: "March",
      description: "Focus on literacy skills development",
    },
    {
      id: 2,
      title: "Winter Special",
      coverImage: mag_cover2,
      pdfUrl: "/magazines/magazine (2).pdf",
      month: "January",
      description: "New year learning strategies",
    },
    {
      id: 3,
      title: "Fall Edition",
      coverImage: mag_cover3,
      pdfUrl: "/magazines/magazine (3).pdf",
      month: "October",
      description: "STEM activities for diverse learners",
    },
    {
      id: 4,
      title: "Summer Edition",
      coverImage: mag_cover4,
      pdfUrl: "/magazines/magazine (4).pdf",
      month: "July",
      description: "Outdoor learning approaches",
    },
    {
      id: 5,
      title: "Summer Edition",
      coverImage: mag_cover5,
      pdfUrl: "/magazines/magazine (5).pdf",
      month: "July",
      description: "Outdoor learning approaches",
    },
    {
      id: 6,
      title: "Summer Edition",
      coverImage: mag_cover6,
      pdfUrl: "/magazines/magazine (6).pdf",
      month: "July",
      description: "Outdoor learning approaches",
    },
  ];

  const openMagazinePdf = (magazine) => {
    console.log(`Opening PDF for: ${magazine.title}`);
    window.open(magazine.pdfUrl, "_blank");
  };

  return (
    <div className="bg-brand-bg py-24 font-sans relative overflow-hidden min-h-screen">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest">
            Publications
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-brand-text font-heading tracking-tight uppercase">
            E-<span className="text-brand-blue">Magazine</span>
          </h2>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto my-4 rounded-full"></div>
          <p className="text-slate-655 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed italic">
            "Explore our quarterly publications"
          </p>
        </div>

        {/* Magazine Grid */}
        {currentMagazines.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {currentMagazines.map((magazine) => (
              <div
                key={magazine.id}
                className="bg-white border border-brand-blue/10 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div className="relative p-1.5 bg-brand-surface border-b border-brand-blue/5 overflow-hidden">
                  {/* Magazine Cover */}
                  <img
                    src={magazine.coverImage}
                    alt={`${magazine.title} cover`}
                    className="w-full h-72 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-103"
                  />

                  {/* Overlay for hover effects */}
                  <div className="absolute inset-1.5 rounded-2xl bg-brand-text/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3">
                    <button
                      onClick={() => openMagazinePdf(magazine)}
                      className="bg-white text-brand-blue hover:bg-brand-blue/10 font-extrabold text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                    >
                      <Eye size={16} />
                      View
                    </button>

                    <button
                      onClick={() => openMagazinePdf(magazine)}
                      className="bg-brand-orange text-white hover:bg-brand-orange-dark font-extrabold text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                    >
                      <Download size={16} />
                      Download
                    </button>
                  </div>

                  {/* Month indicator */}
                  <div className="absolute top-4 right-4 bg-brand-orange text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {magazine.month}
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-3 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-brand-blue font-bold text-xs uppercase tracking-wider">
                      <BookOpen size={16} />
                      <span>{magazine.title}</span>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">{magazine.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-105 flex items-center gap-1.5 text-brand-blue text-xs font-bold uppercase tracking-wider">
                    <FileText size={14} />
                    <span>PDF Magazine</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-brand-blue/5 border border-brand-blue/10 p-12 rounded-3xl text-center mb-16">
            <FileText className="text-brand-blue mx-auto mb-4" size={48} />
            <h3 className="text-xl font-bold text-brand-text font-heading uppercase tracking-wide mb-2">
              No Magazines Available
            </h3>
            <p className="text-slate-500 max-w-md mx-auto text-sm">
              There are no magazines available for the selected year.
            </p>
          </div>
        )}

        {/* Archive Information */}
        <div className="bg-white border border-brand-blue/10 rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-brand-orange/10 rounded-2xl text-brand-orange">
              <Calendar size={28} />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-brand-text font-heading uppercase tracking-wide">
              Magazine Archive
            </h3>
          </div>

          <p className="text-slate-655 text-base sm:text-lg leading-relaxed">
            Our magazine archive contains{" "}
            {currentMagazines.length} issues dating back from
            2012. Each issue highlights student achievements, teaching
            methodologies, and insights into specialized learning approaches.
          </p>

          <div className="bg-brand-surface p-6 rounded-2xl border-l-4 border-brand-blue border-y border-r border-brand-blue/5">
            <p className="text-brand-text text-sm sm:text-base leading-relaxed">
              <span className="font-bold text-brand-blue">Need Earlier Editions?</span> For
              magazine editions prior to 2012 or for special print copies, please
              contact our administration office.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Magazines;
