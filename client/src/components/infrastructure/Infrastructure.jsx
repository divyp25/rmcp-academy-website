import React from "react";
import {
  Camera,
  Megaphone,
  ShieldAlert,
  Zap,
  Building,
  PenTool,
  FlaskConical,
  ShieldCheck,
  AlertCircle,
  Volleyball,
  Footprints,
  Flame,
  BatteryPlus,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useCMS } from "../../hooks/useCMS";

const Infrastructure = () => {
  const { data: cmsData } = useCMS('campus');
  const facilities = [
    {
      title: "Classrooms",
      description:
        "Modern, well-equipped classrooms designed for optimal learning experiences",
      icon: <Building size={24} className="text-brand-blue" />,
    },
    {
      title: "Activity Rooms",
      description:
        "Dedicated spaces for therapeutic and developmental activities",
      icon: <PenTool size={24} className="text-brand-orange" />,
    },
    {
      title: "State-of-the-Art Labs",
      description:
        "Advanced laboratories equipped with the latest educational technology",
      icon: <FlaskConical size={24} className="text-brand-blue" />,
    },
  ];

  const securityFeatures = [
    {
      title: "CCTV Surveillance",
      description: "24/7 monitoring throughout the campus",
      icon: <Camera size={22} className="text-brand-orange" />,
    },
    {
      title: "PA System",
      description:
        "Campus-wide announcement system for emergencies and communications",
      icon: <Megaphone size={22} className="text-brand-orange" />,
    },
    {
      title: "Corridor Cameras",
      description:
        "Strategic placement of cameras in all corridors for enhanced security",
      icon: <ShieldCheck size={22} className="text-brand-orange" />,
    },
    {
      title: "Fire-fighting & Alarm Systems",
      description: "Comprehensive fire safety protocols and equipment",
      icon: <Flame size={22} className="text-brand-orange" />,
    },
    {
      title: "Power Backup",
      description: "Uninterrupted power supply for all critical systems",
      icon: <Zap size={22} className="text-brand-orange" />,
    },
  ];

  const sportsFacilities = [
    {
      name: "Cricket",
      icon: <Volleyball size={16} className="text-brand-blue" />,
    },
    {
      name: "Basketball",
      icon: <Volleyball size={16} className="text-brand-blue" />,
    },
    {
      name: "Football",
      icon: <Volleyball size={16} className="text-brand-blue" />,
    },
    {
      name: "Kho-Kho",
      icon: <Footprints size={16} className="text-brand-blue" />,
    },
    { name: "Kabaddi", icon: <Volleyball size={16} className="text-brand-blue" /> },
    {
      name: "Taekwondo",
      icon: <ShieldAlert size={16} className="text-brand-blue" />,
    },
    {
      name: "Cycling",
      icon: <BatteryPlus size={16} className="text-brand-blue" />,
    },
  ];

  return (
    <div className="bg-brand-bg py-24 font-sans relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest">
            Campus Tour
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-brand-text font-heading tracking-tight uppercase">
            {cmsData?.facility_title ? (
        <span dangerouslySetInnerHTML={{ __html: String(cmsData?.facility_title).replace('Overview', '<span class="text-brand-blue">Overview</span>') }} />
      ) : (
        <>Campus <span className="text-brand-blue">Overview</span></>
      )}
          </h2>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto my-4 rounded-full"></div>
          <p className="text-slate-655 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            {cmsData?.facility_description || "Explore our world-class facilities designed for excellence"}
          </p>
        </div>

        {/* Main Facilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {facilities.map((facility, index) => (
            <div key={index} className="bg-brand-surface p-6 rounded-2xl border border-brand-blue/10 shadow-md hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-brand-blue/5 group-hover:scale-105 transition-transform">
                  {facility.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-text font-heading uppercase tracking-wide">
                  {facility.title}
                </h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">{facility.description}</p>
            </div>
          ))}
        </div>

        {/* Security Features */}
        <div className="mb-12 bg-white border border-brand-blue/10 rounded-3xl p-8 sm:p-10 shadow-xl">
          <div className="flex items-center gap-3.5 mb-8">
            <div className="p-3 bg-brand-orange/10 rounded-xl text-brand-orange">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-brand-text font-heading uppercase tracking-wide">
              Safety & Security Features
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-brand-surface border border-brand-blue/10 p-5 rounded-2xl hover:border-brand-blue/30 transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm border border-brand-blue/5">
                    {feature.icon}
                  </div>
                  <h4 className="font-extrabold text-brand-text font-heading text-sm sm:text-base">
                    {feature.title}
                  </h4>
                </div>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sports Facilities */}
        <div className="bg-brand-surface rounded-3xl p-8 sm:p-10 shadow-xl border border-brand-blue/15">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="p-3 bg-brand-orange/10 rounded-xl text-brand-orange">
              <Volleyball size={24} />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-brand-text font-heading uppercase tracking-wide">
              Sports Facilities
            </h3>
          </div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            We believe physical activity is essential for holistic development. Our campus offers facilities for various sports activities:
          </p>

          <div className="flex flex-wrap gap-3.5 mb-8">
            {sportsFacilities.map((sport, index) => (
              <div
                key={index}
                className="bg-white px-5 py-2.5 rounded-full flex items-center shadow-md border border-brand-blue/5 hover:border-brand-blue/30 transition-all duration-300 cursor-default"
              >
                {sport.icon}
                <span className="ml-2.5 font-bold text-slate-700 text-sm">{sport.name}</span>
              </div>
            ))}
          </div>

          <div className="p-6 bg-white rounded-2xl border-l-4 border-brand-blue shadow-sm">
            <p className="text-slate-655 text-sm sm:text-base leading-relaxed">
              <span className="font-extrabold text-brand-blue">Our Philosophy:</span> We integrate physical education into our curriculum to enhance motor skills, coordination, and social development while promoting teamwork and confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infrastructure;
