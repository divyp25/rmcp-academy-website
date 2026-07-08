import React from "react";
import {
  Users,
  Brain,
  Compass,
  Star,
  Award,
  Heart,
  BookOpen,
  Target,
  HelpCircle,
  CheckCircle,
} from "lucide-react";

import guide1Img from "../../assets/img/guide_1.jpg";
import guide2Img from "../../assets/img/guide_2.jpg";
import guide3Img from "../../assets/img/guide_3.jpg";
import guide4Img from "../../assets/img/guide_4.jpg";
import { useCMS } from "../../hooks/useCMS";

const GuidanceAndCounseling = () => {
  const { data: cmsData } = useCMS('guidance');
  return (
    <div className="bg-brand-bg py-24 font-sans relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest">
            Support Wing
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-brand-text font-heading tracking-tight uppercase">
            {cmsData?.page_title ? (
              <span dangerouslySetInnerHTML={{ __html: cmsData.page_title.replace('& Counseling', '<span class="text-brand-blue">& Counseling</span>') }} />
            ) : (
              <>Guidance <span className="text-brand-blue">& Counseling</span></>
            )}
          </h2>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto my-4 rounded-full"></div>
          <p className="text-slate-655 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            {cmsData?.page_subtitle || "A personalized approach to better learning and development"}
          </p>
        </div>

        {/* Primary Content Container */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-brand-blue/10 mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-brand-blue/10 rounded-xl text-brand-blue">
              <Users size={28} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-brand-text font-heading uppercase tracking-wide">
              Personalized Approach to Better Learning
            </h2>
          </div>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
            {cmsData?.description || "Amity Career Counseling & Guidance Cell aims to offer guidance and support to students both on the academic as well as personal front. It follows a two tier approach that ensures a comprehensive support system for the child, which in turn ensures better learning."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-brand-blue/10 rounded-2xl p-6 bg-brand-surface hover:border-brand-blue/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-5 border-b border-brand-blue/10 pb-4">
                <div className="p-2 bg-white rounded-lg text-brand-blue shadow-sm border border-brand-blue/5">
                  <Heart size={24} />
                </div>
                <h3 className="text-lg font-bold text-brand-text font-heading uppercase tracking-wide">Day to Day Counselling</h3>
              </div>
              <ul className="space-y-5">
                <li className="flex items-start gap-3.5">
                  <div className="bg-brand-blue/15 text-brand-blue rounded-full p-1.5 flex-shrink-0 mt-0.5">
                    <HelpCircle size={16} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-text text-sm sm:text-base font-heading">Behavior Issues</h4>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">
                      Support for children facing challenges with conduct, social interactions, and emotional regulation.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <div className="bg-brand-blue/15 text-brand-blue rounded-full p-1.5 flex-shrink-0 mt-0.5">
                    <Brain size={16} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-text text-sm sm:text-base font-heading">Stress Management</h4>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">
                      Techniques and strategies to help students cope with academic pressure and personal challenges.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="border border-brand-blue/10 rounded-2xl p-6 bg-brand-surface hover:border-brand-orange/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-5 border-b border-brand-blue/10 pb-4">
                <div className="p-2 bg-white rounded-lg text-brand-orange shadow-sm border border-brand-blue/5">
                  <Compass size={24} />
                </div>
                <h3 className="text-lg font-bold text-brand-text font-heading uppercase tracking-wide">Career Counselling</h3>
              </div>
              <ul className="space-y-5">
                <li className="flex items-start gap-3.5">
                  <div className="bg-brand-orange/15 text-brand-orange rounded-full p-1.5 flex-shrink-0 mt-0.5">
                    <Star size={16} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-text text-sm sm:text-base font-heading">Paving the Path for a Luminous Future</h4>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">
                      Structured guidance to help students discover their strengths and align them with potential career paths.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <div className="bg-brand-orange/15 text-brand-orange rounded-full p-1.5 flex-shrink-0 mt-0.5">
                    <Target size={16} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-text text-sm sm:text-base font-heading">Career Assessment</h4>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">
                      Scientific testing to identify aptitudes, interests, and personality traits for informed career decisions.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Secondary Content Box */}
        <section className="bg-brand-surface p-8 sm:p-10 rounded-3xl shadow-xl border border-brand-blue/15 mb-10">
          <h2 className="text-2xl font-black text-brand-text font-heading uppercase tracking-wide mb-4">
            Comprehensive Support System
          </h2>
          <p className="text-slate-600 text-base leading-relaxed mb-8">
            School years for a child are often accompanied with numerous
            psychological and personal challenges. Peer pressure, inferiority
            complex, relationships with parents, stress…these are some of the
            challenges that confront a child during his growing years. It is here
            that our counselors step in. The counselor takes into account the
            situation, personality and needs of a child and helps him/her overcome
            the challenges through a series of meticulously planned counseling sessions.
          </p>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-blue/10">
            <h3 className="text-lg font-bold text-brand-blue mb-6 flex items-center gap-2.5 font-heading uppercase tracking-wide">
              <Award className="text-brand-orange" size={24} />
              Our Counseling Philosophy
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                <p className="text-slate-600 text-sm sm:text-base">Creating a safe, confidential environment for students to express themselves</p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                <p className="text-slate-600 text-sm sm:text-base">Adopting an empathetic, non-judgmental approach to student concerns</p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                <p className="text-slate-600 text-sm sm:text-base">Collaborating with parents and teachers to provide comprehensive support</p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                <p className="text-slate-600 text-sm sm:text-base">Equipping students with practical coping strategies and life skills</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Tertiary Content Box */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-brand-blue/10 mb-10">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="p-3 bg-brand-orange/10 rounded-xl text-brand-orange">
              <BookOpen size={24} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-brand-text font-heading uppercase tracking-wide">
              Career Development Activities
            </h2>
          </div>
          <p className="text-slate-600 text-base leading-relaxed mb-8">
            To help students with their academic requirements, career testing &
            counseling, career fairs, university campus visits, workshops for
            students, parents, teachers and many other activities are organized to
            encourage and motivate the students to pursue the career of their
            choice. Specialized career counseling workshops are organized to help
            students better understand their academic potential, attributes,
            personality, talent, interest, expectations, strengths and weaknesses,
            which in turn helps them choose the right career path.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="relative p-1.5 bg-brand-surface border border-brand-blue/10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <img
                src={guide1Img}
                alt="One-on-one counseling session"
                className="rounded-xl object-cover w-full h-48 sm:h-56"
              />
            </div>
            <div className="relative p-1.5 bg-brand-surface border border-brand-blue/10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <img
                src={guide2Img}
                alt="Career fair with universities"
                className="rounded-xl object-cover w-full h-48 sm:h-56"
              />
            </div>
            <div className="relative p-1.5 bg-brand-surface border border-brand-blue/10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <img
                src={guide3Img}
                alt="Group counseling workshop"
                className="rounded-xl object-cover w-full h-48 sm:h-56"
              />
            </div>
            <div className="relative p-1.5 bg-brand-surface border border-brand-blue/10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <img
                src={guide4Img}
                alt="Aptitude testing session"
                className="rounded-xl object-cover w-full h-48 sm:h-56"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GuidanceAndCounseling;
