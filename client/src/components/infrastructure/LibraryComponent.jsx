import React from "react";
import {
  BookOpen,
  Search,
  BookMarked,
  GraduationCap,
  Clock,
  Users,
  Bookmark,
  PencilRuler,
  Computer,
  HeadphonesIcon,
  BookText,
  CalendarDays,
  ListChecks,
  CheckCircle,
} from "lucide-react";
import { useCMS } from "../../hooks/useCMS";

const LibraryComponent = () => {
  const { data: cmsData } = useCMS('library');
  const libraryFeatures = [
    {
      title: "Extensive Collection",
      description:
        "Diverse range of books, resources, and learning materials for different learning needs",
      icon: <BookText size={22} className="text-brand-blue" />,
    },
    {
      title: "Adaptive Materials",
      description:
        "Specialized resources for students with various learning difficulties",
      icon: <PencilRuler size={22} className="text-brand-blue" />,
    },
    {
      title: "Digital Resources",
      description: "E-books, audiobooks, and interactive learning software",
      icon: <Computer size={22} className="text-brand-blue" />,
    },
    {
      title: "Audio Learning Station",
      description:
        "Dedicated stations for listening to educational audio content",
      icon: <HeadphonesIcon size={22} className="text-brand-blue" />,
    },
  ];

  const libraryServices = [
    {
      title: "Guided Reading Sessions",
      description: "Personalized reading assistance with trained staff",
      icon: <BookOpen size={20} className="text-brand-orange" />,
    },
    {
      title: "Research Support",
      description: "Help with finding and using appropriate research materials",
      icon: <Search size={20} className="text-brand-orange" />,
    },
    {
      title: "Study Groups",
      description: "Facilitated group learning in a supportive environment",
      icon: <Users size={20} className="text-brand-orange" />,
    },
    {
      title: "Borrowing Privileges",
      description:
        "Take home books and resources with extended borrowing periods",
      icon: <Bookmark size={20} className="text-brand-orange" />,
    },
  ];

  return (
    <div className="bg-brand-bg py-24 font-sans relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest">
            Learning Resources
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-brand-text font-heading tracking-tight uppercase">
            {cmsData?.facility_title ? (
        <span dangerouslySetInnerHTML={{ __html: String(cmsData?.facility_title).replace('Library', '<span class="text-brand-blue">Library</span>') }} />
      ) : (
        <>Learning Center <span className="text-brand-blue">Library</span></>
      )}
          </h2>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto my-4 rounded-full"></div>
          <p className="text-slate-655 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            {cmsData?.facility_description || "A supportive space designed for diverse learning styles and needs"}
          </p>
        </div>

        {/* Library Overview */}
        <div className="bg-brand-surface rounded-3xl p-8 sm:p-10 shadow-xl border border-brand-blue/15 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-brand-blue/5 text-brand-blue">
              <BookMarked size={28} />
            </div>
            <h3 className="text-2xl font-black text-brand-text font-heading uppercase tracking-wide">
              Library Overview
            </h3>
          </div>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
            Our specialized library serves as a central resource hub for students
            with diverse learning needs. The environment is designed to be
            calming, accessible, and conducive to learning with adjustable
            lighting, comfortable seating, and quiet zones.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-brand-blue/10">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-brand-blue/5 text-brand-blue flex-shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-extrabold text-brand-text font-heading text-base mb-1">Flexible Hours</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Open throughout school hours with extended access during exam periods
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-brand-blue/5 text-brand-blue flex-shrink-0">
                <GraduationCap size={24} />
              </div>
              <div>
                <h4 className="font-extrabold text-brand-text font-heading text-base mb-1">Trained Staff</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Librarians specialized in supporting diverse learning needs
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Library Features */}
        <div className="mb-12 bg-white border border-brand-blue/10 rounded-3xl p-8 sm:p-10 shadow-xl">
          <div className="flex items-center gap-3.5 mb-8">
            <div className="p-3 bg-brand-blue/10 rounded-xl text-brand-blue">
              <ListChecks size={24} />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-brand-text font-heading uppercase tracking-wide">
              Library Features
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {libraryFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-brand-surface p-6 rounded-2xl border border-brand-blue/10 hover:border-brand-blue/30 transition-colors duration-300"
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

        {/* Library Services */}
        <div className="bg-brand-surface rounded-3xl p-8 sm:p-10 shadow-xl border border-brand-blue/15 mb-12">
          <div className="flex items-center gap-3.5 mb-8">
            <div className="p-3 bg-brand-orange/10 rounded-xl text-brand-orange">
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-brand-text font-heading uppercase tracking-wide">
              Library Services
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {libraryServices.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md border border-brand-blue/5 flex items-start gap-4 hover:border-brand-orange/30 transition-all duration-300"
              >
                <div className="p-2 bg-brand-orange/10 rounded-xl text-brand-orange flex-shrink-0">
                  {service.icon}
                </div>
                <div>
                  <h4 className="font-extrabold text-brand-text font-heading text-sm sm:text-base mb-1">{service.title}</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Library Schedule */}
        <div className="bg-white border border-brand-blue/10 rounded-3xl p-8 sm:p-10 shadow-xl">
          <div className="flex items-center gap-3.5 mb-8">
            <div className="p-3 bg-brand-blue/10 rounded-xl text-brand-blue">
              <CalendarDays size={24} />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-brand-text font-heading uppercase tracking-wide">
              Library Schedule
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-brand-surface p-6 rounded-2xl border border-brand-blue/10">
              <h4 className="font-extrabold text-brand-blue font-heading uppercase tracking-wider text-sm sm:text-base mb-4 pb-2 border-b border-brand-blue/10">Regular Hours</h4>
              <ul className="space-y-3.5">
                <li className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-slate-655 font-semibold">Monday - Friday:</span>
                  <span className="text-slate-600 font-bold bg-white px-3 py-1 rounded-lg border border-brand-blue/5">8:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-slate-655 font-semibold">Saturday:</span>
                  <span className="text-slate-600 font-bold bg-white px-3 py-1 rounded-lg border border-brand-blue/5">9:00 AM - 1:00 PM</span>
                </li>
                <li className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-slate-655 font-semibold">Sunday:</span>
                  <span className="text-brand-orange font-bold bg-white px-3 py-1 rounded-lg border border-brand-blue/5">Closed</span>
                </li>
              </ul>
            </div>

            <div className="bg-brand-surface p-6 rounded-2xl border border-brand-blue/10">
              <h4 className="font-extrabold text-brand-orange font-heading uppercase tracking-wider text-sm sm:text-base mb-4 pb-2 border-b border-brand-blue/10">Special Services</h4>
              <ul className="space-y-3.5">
                <li className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-slate-655 font-semibold">Reading Groups:</span>
                  <span className="text-slate-600 font-bold bg-white px-3 py-1 rounded-lg border border-brand-blue/5">Tue & Thu, 2:00 PM</span>
                </li>
                <li className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-slate-655 font-semibold">Research Help:</span>
                  <span className="text-slate-600 font-bold bg-white px-3 py-1 rounded-lg border border-brand-blue/5">Mon-Fri, 10:00 AM - 2:00 PM</span>
                </li>
                <li className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-slate-655 font-semibold">Digital Resources Help:</span>
                  <span className="text-slate-600 font-bold bg-white px-3 py-1 rounded-lg border border-brand-blue/5">Wed, 1:00 PM - 3:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryComponent;
