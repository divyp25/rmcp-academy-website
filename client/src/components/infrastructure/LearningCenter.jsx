import React from "react";
import {
  BookOpen,
  Users,
  Clock,
  Calculator,
  BookMarked,
  BrainCircuit,
  School,
  PenTool,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { useCMS } from "../../hooks/useCMS";

const LearningCenter = () => {
  const { data: cmsData } = useCMS('learning_center');
  return (
    <div className="bg-brand-bg py-24 font-sans relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest">
            Support Center
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-brand-text font-heading tracking-tight uppercase">
            {cmsData?.facility_title ? (
        <span dangerouslySetInnerHTML={{ __html: String(cmsData?.facility_title).replace('Center Centre', '<span class="text-brand-blue">Center Centre</span>') }} />
      ) : (
        <>Specialized Learning <span className="text-brand-blue">Centre</span></>
      )}
          </h2>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto my-4 rounded-full"></div>
          <p className="text-slate-655 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            {cmsData?.facility_description || "Supporting students with mild to moderate learning difficulties"}
          </p>
        </div>

        {/* Main Info Card */}
        <div className="bg-brand-surface rounded-3xl p-8 sm:p-10 shadow-xl border border-brand-blue/15 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-brand-blue/5 text-brand-blue">
              <School size={28} />
            </div>
            <h2 className="text-2xl font-black text-brand-text font-heading uppercase tracking-wide">
              About Our Centre
            </h2>
          </div>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
            Our specialized learning center provides dedicated support for
            students with learning difficulties from classes I to XII. We operate
            during regular school hours, providing a seamless educational experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-brand-blue/10">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-brand-blue/5 text-brand-blue flex-shrink-0">
                <Users size={24} />
              </div>
              <div>
                <h3 className="font-extrabold text-brand-text font-heading text-base mb-1">
                  Collaborative Approach
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Special educators, teachers, counsellors, parents & peers working together
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-brand-blue/5 text-brand-blue flex-shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-extrabold text-brand-text font-heading text-base mb-1">
                  School Hour Integration
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Operates within regular school timings for minimal disruption
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Areas Section */}
        <div className="bg-white border border-brand-blue/10 rounded-3xl p-8 sm:p-10 shadow-xl">
          <div className="flex items-center gap-3.5 mb-8">
            <div className="p-3 bg-brand-orange/10 rounded-xl text-brand-orange">
              <BookMarked size={24} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-brand-text font-heading uppercase tracking-wide">
              Individual Remedial Support Areas
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-brand-surface p-6 rounded-2xl border border-brand-blue/10 shadow-sm hover:border-brand-blue/30 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white rounded-lg shadow-sm border border-brand-blue/5 text-brand-blue">
                  <BookOpen size={18} />
                </div>
                <h3 className="font-extrabold text-brand-text font-heading text-sm sm:text-base">
                  Reading & Comprehension
                </h3>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Personalized strategies to improve reading fluency and understanding
              </p>
            </div>

            <div className="bg-brand-surface p-6 rounded-2xl border border-brand-blue/10 shadow-sm hover:border-brand-orange/30 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white rounded-lg shadow-sm border border-brand-blue/5 text-brand-orange">
                  <PenTool size={18} />
                </div>
                <h3 className="font-extrabold text-brand-text font-heading text-sm sm:text-base">
                  Spelling & Writing
                </h3>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Techniques to enhance written expression and spelling accuracy
              </p>
            </div>

            <div className="bg-brand-surface p-6 rounded-2xl border border-brand-blue/10 shadow-sm hover:border-brand-blue/30 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white rounded-lg shadow-sm border border-brand-blue/5 text-brand-blue">
                  <Calculator size={18} />
                </div>
                <h3 className="font-extrabold text-brand-text font-heading text-sm sm:text-base">
                  Mathematics
                </h3>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Practical approaches to build mathematical concept understanding
              </p>
            </div>

            <div className="bg-brand-surface p-6 rounded-2xl border border-brand-blue/10 shadow-sm hover:border-brand-orange/30 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white rounded-lg shadow-sm border border-brand-blue/5 text-brand-orange">
                  <BrainCircuit size={18} />
                </div>
                <h3 className="font-extrabold text-brand-text font-heading text-sm sm:text-base">
                  Thinking Skills
                </h3>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Activities to develop critical and creative thinking abilities
              </p>
            </div>

            <div className="bg-brand-surface p-6 rounded-2xl border border-brand-blue/10 shadow-sm hover:border-brand-blue/30 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white rounded-lg shadow-sm border border-brand-blue/5 text-brand-blue">
                  <Calendar size={18} />
                </div>
                <h3 className="font-extrabold text-brand-text font-heading text-sm sm:text-base">
                  Study Skills
                </h3>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Organization, planning and effective learning techniques
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningCenter;
