import React from "react";
import {
  Monitor,
  Laptop,
  Headphones,
  LayoutGrid,
  Code,
  Globe,
  Server,
  Presentation,
  CheckCircle,
} from "lucide-react";

import tech1Img from "../../assets/img/tech_1.jpg";
import tech2Img from "../../assets/img/tech_2.jpg";
import tech3Img from "../../assets/img/tech_3.jpg";
import tech4Img from "../../assets/img/tech_4.jpeg";
import { useCMS } from "../../hooks/useCMS";

const TechnologyIntegration = () => {
  const { data: cmsData } = useCMS('technology');
  return (
    <div className="bg-brand-bg py-24 font-sans relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest">
            Academics
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-brand-text font-heading tracking-tight uppercase">
            {cmsData?.page_title ? (
              <span dangerouslySetInnerHTML={{ __html: cmsData.page_title.replace('Integration', '<span class="text-brand-blue">Integration</span>').replace('Technology', '<span class="text-brand-text">Technology</span>') }} />
            ) : (
              <>Technology <span className="text-brand-blue">Integration</span></>
            )}
          </h2>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto my-4 rounded-full"></div>
          <p className="text-slate-655 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            {cmsData?.page_subtitle || "Empowering education through innovative digital solutions"}
          </p>
        </div>

        {/* Primary Content Container */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-brand-blue/10 mb-10">
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
            {cmsData?.description || "At RMCP, we integrate cutting-edge technology across our curriculum to prepare students for the digital world. Our technology infrastructure supports immersive learning experiences, fosters digital literacy, and enables students to become confident creators and critical thinkers in a technology-driven global society."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="border border-brand-blue/10 rounded-2xl p-6 bg-brand-surface hover:border-brand-blue/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-white rounded-xl text-brand-blue shadow-sm border border-brand-blue/5">
                  <Headphones size={24} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-brand-text font-heading uppercase tracking-wide">Digital Language Lab</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                A sophisticated digital language lab enhancing language skills through interactive audio-visual tools, pronunciation practice, and immersive language learning experiences.
              </p>
            </div>

            <div className="border border-brand-blue/10 rounded-2xl p-6 bg-brand-surface hover:border-brand-orange/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-white rounded-xl text-brand-orange shadow-sm border border-brand-blue/5">
                  <Presentation size={24} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-brand-text font-heading uppercase tracking-wide">Smart Classrooms</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Smart boards in classrooms serve as versatile teaching tools, enabling interactive lessons, multimedia presentations, and real-time collaborative learning activities.
              </p>
            </div>

            <div className="border border-brand-blue/10 rounded-2xl p-6 bg-brand-surface hover:border-brand-blue/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-white rounded-xl text-brand-blue shadow-sm border border-brand-blue/5">
                  <LayoutGrid size={24} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-brand-text font-heading uppercase tracking-wide">Modern Computer Labs</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Updated computer labs designed for different age groups (Junior/Middle/Senior) with age-appropriate software, hardware, and learning resources tailored to each level's needs.
              </p>
            </div>
          </div>
        </section>

        {/* Technology Skills Development */}
        <section className="bg-brand-surface p-8 sm:p-10 rounded-3xl shadow-xl border border-brand-blue/15 mb-10">
          <h2 className="text-2xl font-black text-brand-text font-heading uppercase tracking-wide mb-6 flex items-center gap-3">
            <Code className="text-brand-orange animate-pulse" size={28} />
            Technology Skills Development
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <p className="text-slate-600 text-base leading-relaxed">
                Our technology curriculum develops essential digital skills
                through hands-on experience with industry-standard tools and
                platforms. Students learn everything from basic computer literacy
                to advanced programming and digital content creation.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <CheckCircle className="w-5.5 h-5.5 text-brand-blue flex-shrink-0 mt-0.5" />
                  <p className="text-brand-text font-semibold text-sm sm:text-base">
                    STEM integration through robotics, coding, and digital fabrication
                  </p>
                </div>
                <div className="flex items-start gap-3.5">
                  <CheckCircle className="w-5.5 h-5.5 text-brand-blue flex-shrink-0 mt-0.5" />
                  <p className="text-brand-text font-semibold text-sm sm:text-base">
                    Digital citizenship and online safety education
                  </p>
                </div>
                <div className="flex items-start gap-3.5">
                  <CheckCircle className="w-5.5 h-5.5 text-brand-blue flex-shrink-0 mt-0.5" />
                  <p className="text-brand-text font-semibold text-sm sm:text-base">
                    Media literacy and digital content creation
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-blue/10 w-full">
                <h3 className="text-base sm:text-lg font-bold text-brand-text font-heading uppercase tracking-wide mb-4">
                  Technology Progression Path
                </h3>
                <div className="space-y-3.5">
                  <div className="bg-brand-surface p-4 rounded-xl border border-brand-blue/10">
                    <p className="font-extrabold text-brand-blue text-sm uppercase tracking-wider mb-1">
                      Junior Level (Grades 1-5)
                    </p>
                    <p className="text-slate-500 text-xs sm:text-sm">
                      Basic computer skills, educational games, introduction to coding concepts
                    </p>
                  </div>
                  <div className="bg-brand-surface p-4 rounded-xl border border-brand-orange/10">
                    <p className="font-extrabold text-brand-orange text-sm uppercase tracking-wider mb-1">
                      Middle Level (Grades 6-8)
                    </p>
                    <p className="text-slate-500 text-xs sm:text-sm">
                      Office applications, intermediate programming, digital presentations
                    </p>
                  </div>
                  <div className="bg-brand-surface p-4 rounded-xl border border-brand-blue/10">
                    <p className="font-extrabold text-brand-blue text-sm uppercase tracking-wider mb-1">
                      Senior Level (Grades 9-12)
                    </p>
                    <p className="text-slate-500 text-xs sm:text-sm">
                      Advanced programming, multimedia production, data analysis, web development
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology in Action (Gallery) */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-brand-blue/10 mb-10">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="p-3 bg-brand-orange/10 rounded-xl text-brand-orange">
              <Monitor size={24} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-brand-text font-heading uppercase tracking-wide">
              Technology in Action
            </h2>
          </div>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-8">
            Our students actively engage with technology across disciplines, developing crucial skills for the digital age.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="relative p-1.5 bg-brand-surface border border-brand-blue/10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <img
                src={tech1Img}
                alt="Students in digital language lab"
                className="rounded-xl object-cover w-full h-48 sm:h-56"
              />
            </div>
            <div className="relative p-1.5 bg-brand-surface border border-brand-blue/10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <img
                src={tech2Img}
                alt="Interactive smart board lesson"
                className="rounded-xl object-cover w-full h-48 sm:h-56"
              />
            </div>
            <div className="relative p-1.5 bg-brand-surface border border-brand-blue/10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <img
                src={tech3Img}
                alt="Computer programming class"
                className="rounded-xl object-cover w-full h-48 sm:h-56"
              />
            </div>
            <div className="relative p-1.5 bg-brand-surface border border-brand-blue/10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <img
                src={tech4Img}
                alt="Robotics and technology projects"
                className="rounded-xl object-cover w-full h-48 sm:h-56"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TechnologyIntegration;
