import React, { useEffect, useState } from "react";
import {
  Calendar,
  Briefcase,
  Target,
  User,
  X,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";
import axios from "axios";
import { API } from "../../assets/constant";
import { schoolInfo } from "../../assets/constant";
import { motion, AnimatePresence } from "framer-motion";

const AcademyVacancy = () => {
  const [vacancies, setVacancies] = useState(null);
  const [selectedVacancy, setSelectedVacancy] = useState(null);

  const ContactInfoSection = () => (
    <div className="bg-brand-blue/5 p-6 sm:p-8 rounded-2xl border border-brand-blue/10 mt-8 space-y-6">
      <h3 className="text-lg sm:text-xl font-black text-brand-text font-heading uppercase tracking-wide">
        Contact for Inquiries
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phone Numbers */}
        <div className="flex items-start gap-3">
          <div className="p-2 bg-brand-orange/10 rounded-xl text-brand-orange mt-0.5">
            <Phone size={18} />
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1">Contact Numbers</p>
            <a
              href={`tel:${schoolInfo.phone}`}
              className="text-brand-text hover:text-brand-blue font-bold block transition-colors"
            >
              {schoolInfo.phone}
            </a>
            {schoolInfo.phone1 && (
              <a
                href={`tel:${schoolInfo.phone1}`}
                className="text-brand-text hover:text-brand-blue font-bold block transition-colors mt-0.5"
              >
                {schoolInfo.phone1}
              </a>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-3">
          <div className="p-2 bg-brand-blue/10 rounded-xl text-brand-blue mt-0.5">
            <Mail size={18} />
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1">Email Address</p>
            <a
              href={`mailto:${schoolInfo.email}`}
              className="text-brand-text hover:text-brand-blue font-bold block transition-colors"
            >
              {schoolInfo.email}
            </a>
          </div>
        </div>
      </div>

      {/* Inquiry Button */}
      <div className="pt-2">
        <a
          href={`mailto:${schoolInfo.email}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-orange text-white px-8 py-3.5 rounded-xl font-extrabold text-sm uppercase tracking-wider hover:bg-brand-orange-dark shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/40 hover:-translate-y-0.5 transition-all duration-300"
        >
          <Mail size={18} /> Send your Resume/CV
        </a>
      </div>
    </div>
  );

  const fetchVacancies = async () => {
    try {
      const res = await axios.get(`${API}/api/jobs`);
      if (res.status !== 200) return alert("❌ Failed to fetch vacancies");
      setVacancies(res.data);
    } catch (error) {
      console.error("Error fetching vacancies:", error);
    }
  };

  const fetchVacancy = async (id) => {
    try {
      const res = await axios.get(`${API}/api/jobs/${id}`);
      if (res.status !== 200) return alert("❌ Failed to fetch vacancy");
      setSelectedVacancy(res.data);
    } catch (error) {
      console.error("Error fetching vacancy:", error);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  return (
    <div className="bg-brand-bg py-24 font-sans relative overflow-hidden min-h-screen">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest">
            Careers
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-brand-text font-heading tracking-tight uppercase">
            Current Job <span className="text-brand-blue">Openings</span>
          </h2>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto my-4 rounded-full"></div>
          <p className="text-slate-655 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed italic">
            "Explore our career opportunities and apply for positions that match your skills and interests."
          </p>
        </div>

        {/* Vacancies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vacancies &&
            vacancies.map((vacancy) => (
              <div
                key={vacancy._id}
                className="bg-white border border-brand-blue/10 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 relative flex flex-col justify-between group hover:-translate-y-1"
              >
                {/* Date Posted - Top Right */}
                <div className="flex items-center text-slate-400 gap-1.5 text-xs font-bold uppercase tracking-wider mb-4">
                  <Calendar size={14} className="text-brand-blue" />
                  <span>
                    {new Date(vacancy.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Job Details */}
                <div className="space-y-4 flex-grow flex flex-col justify-between pb-8">
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-black text-brand-text font-heading uppercase tracking-wide group-hover:text-brand-blue transition-colors">
                      {vacancy.jobTitle}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                      {vacancy.jobDescription}
                    </p>
                  </div>

                  {/* Read More Button */}
                  <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => fetchVacancy(vacancy._id)}
                      className="inline-flex items-center gap-1 text-brand-blue hover:text-brand-blue-dark font-extrabold text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Read More <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Vacancy Details Modal */}
        <AnimatePresence>
          {selectedVacancy && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
              onClick={() => setSelectedVacancy(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-6 sm:p-10 relative space-y-8"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedVacancy(null)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-slate-950/50 hover:bg-slate-950 text-white transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>

                {/* Detailed Job Information */}
                <div className="space-y-6">
                  <div className="space-y-3 pb-6 border-b border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-brand-orange font-bold uppercase tracking-wider">
                      <Briefcase size={14} />
                      <span>{selectedVacancy.employmentType}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-brand-text font-heading uppercase tracking-tight">
                      {selectedVacancy.jobTitle}
                    </h2>
                    <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                      {selectedVacancy.jobDescription}
                    </p>
                  </div>

                  {/* Job Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Key Responsibilities */}
                    <div className="space-y-4">
                      <h3 className="text-base sm:text-lg font-black text-brand-text font-heading uppercase tracking-wide flex items-center gap-2">
                        <Target className="text-brand-orange" size={20} /> Key Responsibilities
                      </h3>
                      <ul className="list-disc pl-5 space-y-2 text-slate-655 text-sm sm:text-base">
                        {selectedVacancy.keyResponsibilities.map((resp, index) => (
                          <li key={index} className="leading-relaxed">{resp}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Qualifications */}
                    <div className="space-y-4">
                      <h3 className="text-base sm:text-lg font-black text-brand-text font-heading uppercase tracking-wide flex items-center gap-2">
                        <User className="text-brand-blue" size={20} /> Qualifications & Requirements
                      </h3>
                      <ul className="list-disc pl-5 space-y-2 text-slate-655 text-sm sm:text-base">
                        {selectedVacancy.qualificationsAndRequirements.map(
                          (qual, index) => (
                            <li key={index} className="leading-relaxed">{qual}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Posted Date */}
                  <div className="flex justify-end items-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-wider pt-6 border-t border-slate-100">
                    <Calendar size={14} className="text-brand-blue" />
                    <span>
                      Posted on:{" "}
                      {new Date(selectedVacancy.updatedAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Contact Information */}
                  <ContactInfoSection />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AcademyVacancy;
