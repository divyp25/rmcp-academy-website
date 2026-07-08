import React from "react";
import {
  Trophy,
  Users,
  Medal,
  Calendar,
  Activity,
  Target,
  Award,
  Shield,
  CheckCircle,
} from "lucide-react";

import sport1Img from "../../assets/img/sport_1.jpg";
import sport2Img from "../../assets/img/sport_2.jpg";
import sport3Img from "../../assets/img/sport_3.jpg";
import sport4Img from "../../assets/img/sport_4.jpg";
import AnimatedImage from "../ui/AnimatedImage";
import { useCMS } from "../../hooks/useCMS";

const SportsFacility = () => {
  const { data: cmsData } = useCMS('sports');
  return (
    <div className="bg-brand-bg py-24 font-sans relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest">
            Athletics & Fitness
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-brand-text font-heading tracking-tight uppercase">
            {cmsData?.facility_title ? (
        <span dangerouslySetInnerHTML={{ __html: String(cmsData?.facility_title).replace('Athletics', '<span class="text-brand-blue">Athletics</span>') }} />
      ) : (
        <>Sports & <span className="text-brand-blue">Athletics</span></>
      )}
          </h2>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto my-4 rounded-full"></div>
          <p className="text-slate-655 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed italic">
            "A healthy mind resides in a healthy body"
          </p>
        </div>

        {/* Primary Content Container */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-brand-blue/10 mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-brand-blue/10 rounded-xl text-brand-blue">
              <Activity size={28} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-brand-text font-heading uppercase tracking-wide">
              Comprehensive Sports Program
            </h2>
          </div>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
            {cmsData?.facility_description || "Amity places utmost stress on sports and physical training. Sports help inculcate discipline, self confidence, team spirit and self esteem. The sports curriculum at Amity lays emphasis on physical fitness, stretching physical abilities to an optimum level."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="border border-brand-blue/10 rounded-2xl p-6 bg-brand-surface hover:border-brand-blue/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-brand-blue/10">
                <div className="p-2 bg-white rounded-lg text-brand-blue shadow-sm border border-brand-blue/5">
                  <Target size={22} />
                </div>
                <h3 className="font-extrabold text-brand-text font-heading text-base uppercase tracking-wide">Facilities</h3>
              </div>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 text-xs sm:text-sm">Sprawling playground with modern infrastructure</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 text-xs sm:text-sm">Special areas earmarked for different games</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 text-xs sm:text-sm">Outdoor courts for basketball, and badminton</span>
                </li>
              </ul>
            </div>

            <div className="border border-brand-blue/10 rounded-2xl p-6 bg-brand-surface hover:border-brand-orange/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-brand-blue/10">
                <div className="p-2 bg-white rounded-lg text-brand-orange shadow-sm border border-brand-blue/5">
                  <Shield size={22} />
                </div>
                <h3 className="font-extrabold text-brand-text font-heading text-base uppercase tracking-wide">Sports Offerings</h3>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm mb-3">
                Facilities for various sports including:
              </p>
              <div className="grid grid-cols-2 gap-2 text-slate-600 font-semibold text-xs sm:text-sm">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-blue" />
                  <span>Cricket</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-blue" />
                  <span>Basketball</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-blue" />
                  <span>Football</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-blue" />
                  <span>Chess</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-blue" />
                  <span>Taekwondo</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-blue" />
                  <span>Kabaddi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-blue" />
                  <span>Badminton</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-blue" />
                  <span>Volleyball</span>
                </div>
              </div>
            </div>

            <div className="border border-brand-blue/10 rounded-2xl p-6 bg-brand-surface hover:border-brand-blue/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-brand-blue/10">
                <div className="p-2 bg-white rounded-lg text-brand-blue shadow-sm border border-brand-blue/5">
                  <Users size={22} />
                </div>
                <h3 className="font-extrabold text-brand-text font-heading text-base uppercase tracking-wide">Expert Coaching</h3>
              </div>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 text-xs sm:text-sm">Professional coaches with extensive experience</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 text-xs sm:text-sm">Regular fitness assessments and improvement plans</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 text-xs sm:text-sm">Focus on technique, strategy, and sportsmanship</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Competitive Excellence Section */}
        <section className="bg-brand-surface p-8 sm:p-10 rounded-3xl shadow-xl border border-brand-blue/15 mb-10">
          <h2 className="text-2xl font-black text-brand-text font-heading uppercase tracking-wide mb-6 flex items-center gap-3">
            <Trophy className="text-brand-orange animate-pulse" size={28} />
            Competitive Excellence
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-lg font-bold text-brand-text mb-3 font-heading uppercase tracking-wide">
                  Sports Achievement Program
                </h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  Our students regularly participate in competitions at the
                  district, state, national, and international levels, bringing
                  laurels to the school and developing their competitive spirit.
                </p>
              </div>
              <ul className="space-y-3.5">
                <li className="flex items-center gap-3">
                  <Medal className="text-brand-blue flex-shrink-0" size={20} />
                  <span className="text-slate-655 text-sm sm:text-base font-semibold">
                    Students participate in national and international tournaments
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Medal className="text-brand-blue flex-shrink-0" size={20} />
                  <span className="text-slate-655 text-sm sm:text-base font-semibold">Regular inter-house and inter-school competitions</span>
                </li>
                <li className="flex items-center gap-3">
                  <Medal className="text-brand-blue flex-shrink-0" size={20} />
                  <span className="text-slate-655 text-sm sm:text-base font-semibold">Sports scholarships for exceptional athletes</span>
                </li>
                <li className="flex items-center gap-3">
                  <Medal className="text-brand-blue flex-shrink-0" size={20} />
                  <span className="text-slate-655 text-sm sm:text-base font-semibold">Special training camps during vacations</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-5 flex">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-blue/10 w-full">
                <h3 className="text-lg font-bold text-brand-blue mb-4 flex items-center gap-2 font-heading uppercase tracking-wide">
                  <Calendar className="text-brand-orange" size={20} />
                  Annual Sports Events
                </h3>
                <ul className="space-y-3.5">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-brand-surface border border-brand-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-brand-orange font-bold text-xs">
                      1
                    </div>
                    <div>
                      <p className="font-extrabold text-brand-text text-sm">Junior Sports Day</p>
                      <p className="text-xs text-slate-500">Celebrated annually for students in grades 1-5</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-brand-surface border border-brand-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-brand-blue font-bold text-xs">
                      2
                    </div>
                    <div>
                      <p className="font-extrabold text-brand-text text-sm">Senior Sports Day</p>
                      <p className="text-xs text-slate-500">Celebrated annually for students in grades 6-12</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-brand-surface border border-brand-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-brand-orange font-bold text-xs">
                      3
                    </div>
                    <div>
                      <p className="font-extrabold text-brand-text text-sm">Inter-School Sports Tournament</p>
                      <p className="text-xs text-slate-500">Annual competition hosting schools from the region</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-brand-surface border border-brand-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-brand-blue font-bold text-xs">
                      4
                    </div>
                    <div>
                      <p className="font-extrabold text-brand-text text-sm">Sports Achievement Ceremony</p>
                      <p className="text-xs text-slate-500">Recognition of outstanding athletes and teams</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section with Gallery */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-brand-blue/10 mb-10">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="p-3 bg-brand-orange/10 rounded-xl text-brand-orange">
              <Award size={24} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-brand-text font-heading uppercase tracking-wide">
              Benefits of Our Sports Program
            </h2>
          </div>
          <p className="text-slate-600 text-base leading-relaxed mb-8">
            Our comprehensive sports program goes beyond physical fitness to
            develop character, resilience, and important life skills. Students
            learn teamwork, leadership, and discipline through regular
            participation in sports activities.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="relative p-1.5 bg-brand-surface border border-brand-blue/10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
              <AnimatedImage
                src={sport1Img}
                alt="Cricket match on school grounds"
                className="rounded-xl w-full h-48 sm:h-56"
              />
            </div>
            <div className="relative p-1.5 bg-brand-surface border border-brand-blue/10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
              <AnimatedImage
                src={sport2Img}
                alt="Basketball court during practice"
                className="rounded-xl w-full h-48 sm:h-56"
              />
            </div>
            <div className="relative p-1.5 bg-brand-surface border border-brand-blue/10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
              <AnimatedImage
                src={sport3Img}
                alt="pool with coaching session"
                className="rounded-xl w-full h-48 sm:h-56"
              />
            </div>
            <div className="relative p-1.5 bg-brand-surface border border-brand-blue/10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
              <AnimatedImage
                src={sport4Img}
                alt="Annual sports day celebration"
                className="rounded-xl w-full h-48 sm:h-56"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SportsFacility;
