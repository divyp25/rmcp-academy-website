import React from "react";
import {
  Brain,
  Heart,
  Dumbbell,
  Music,
  BookOpen,
  Users,
  Camera,
  CheckCircle,
} from "lucide-react";
import sport_holisticImg from "../../assets/img/sport_holistic.jpg";
import activity_holisticImg from "../../assets/img/activity_holistic.jpg";
import art_holisticImg from "../../assets/img/art_holistic.jpg";
import labclass_holisticImg from "../../assets/img/labclass_holistic.jpg";
import { useCMS } from "../../hooks/useCMS";

const HolisticDevelopment = () => {
  const { data: cmsData } = useCMS('holistic');
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
              <span dangerouslySetInnerHTML={{ __html: cmsData.page_title.replace('Development', '<span class="text-brand-blue">Development</span>').replace('Holistic', '<span class="text-brand-text">Holistic</span>') }} />
            ) : (
              <>Holistic <span className="text-brand-blue">Development</span></>
            )}
          </h2>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto my-4 rounded-full"></div>
          <p className="text-slate-655 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            {cmsData?.page_subtitle || "Nurturing minds, bodies, and spirits for complete student growth"}
          </p>
        </div>

        <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-brand-blue/10 mb-10 space-y-6">
          <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            {cmsData?.description ? (
              <p className="whitespace-pre-wrap">{cmsData.description}</p>
            ) : (
              <>
                <p>
                  RMCP believes in holistic development of its students and leaves no
                  stone unturned to nurture talent. An Integrated approach to education is
                  adopted at each level. A broad and comprehensive education should aim at
                  enabling each individual to discover, unearth and enrich his or her
                  creative potential.
                </p>
                <p>
                  The holistic curriculum encourages students to be active learners who
                  explore, understand and participate in the world around them. By
                  exposing students to a wide variety of disciplines we fine-tune both
                  cognitive and non-cognitive skills so as to prepare them for a
                  well-balanced life outside of Academy.
                </p>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="border border-brand-blue/10 rounded-2xl p-6 bg-brand-surface hover:border-brand-blue/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-white rounded-xl text-brand-blue shadow-sm border border-brand-blue/5">
                  <Brain size={24} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-brand-text font-heading uppercase tracking-wide">Intellectual Growth</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Stimulating critical thinking, creativity, and problem-solving skills through academic excellence and intellectual challenges.
              </p>
            </div>

            <div className="border border-brand-blue/10 rounded-2xl p-6 bg-brand-surface hover:border-brand-orange/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-white rounded-xl text-brand-orange shadow-sm border border-brand-blue/5">
                  <Heart size={24} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-brand-text font-heading uppercase tracking-wide">Emotional Balance</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Nurturing emotional intelligence, resilience, and self-awareness through mentorship and character education.
              </p>
            </div>

            <div className="border border-brand-blue/10 rounded-2xl p-6 bg-brand-surface hover:border-brand-blue/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-white rounded-xl text-brand-blue shadow-sm border border-brand-blue/5">
                  <Dumbbell size={24} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-brand-text font-heading uppercase tracking-wide">Physical Wellness</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Developing strength, coordination, and healthy habits through sports, fitness activities, and nutrition education.
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy section */}
        <section className="bg-brand-surface p-8 sm:p-10 rounded-3xl shadow-xl border border-brand-blue/15 mb-10">
          <h2 className="text-2xl font-black text-brand-text font-heading uppercase tracking-wide mb-6 flex items-center gap-3">
            <BookOpen className="text-brand-orange animate-pulse" size={28} />
            Our Educational Philosophy
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <p className="text-slate-600 text-base leading-relaxed">
                At RMCP, we believe that education goes beyond textbooks and
                classrooms. Our approach integrates academics with experiential
                learning, encouraging students to discover their unique talents
                and interests.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <CheckCircle className="w-5.5 h-5.5 text-brand-blue flex-shrink-0" />
                  <p className="text-brand-text font-semibold text-sm sm:text-base">
                    Collaborative Learning Environments
                  </p>
                </div>
                <div className="flex items-center gap-3.5">
                  <CheckCircle className="w-5.5 h-5.5 text-brand-blue flex-shrink-0" />
                  <p className="text-brand-text font-semibold text-sm sm:text-base">
                    Arts & Cultural Immersion
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 flex">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-blue/10 flex items-center">
                <blockquote className="italic text-slate-700 border-l-4 border-brand-orange pl-5 py-2">
                  “The highest education is that which does not merely give us information but makes our life in harmony with all existence.”
                  <footer className="text-brand-blue font-bold text-xs uppercase tracking-widest mt-2">— Rabindranath Tagore</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery/Glimpses Section */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-brand-blue/10 mb-10">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="p-3 bg-brand-orange/10 rounded-xl text-brand-orange">
              <Camera size={24} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-brand-text font-heading uppercase tracking-wide">
              Glimpses of Holistic Learning
            </h2>
          </div>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-8">
            Our students engage in a variety of activities that promote their overall development and prepare them for future success.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="relative p-1.5 bg-brand-surface border border-brand-blue/10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <img
                src={labclass_holisticImg}
                alt="Students in science lab"
                className="rounded-xl object-cover w-full h-48 sm:h-56"
              />
            </div>
            <div className="relative p-1.5 bg-brand-surface border border-brand-blue/10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <img
                src={art_holisticImg}
                alt="Art and creativity workshop"
                className="rounded-xl object-cover w-full h-48 sm:h-56"
              />
            </div>
            <div className="relative p-1.5 bg-brand-surface border border-brand-blue/10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <img
                src={sport_holisticImg}
                alt="Sports and physical activities"
                className="rounded-xl object-cover w-full h-48 sm:h-56"
              />
            </div>
            <div className="relative p-1.5 bg-brand-surface border border-brand-blue/10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <img
                src={activity_holisticImg}
                alt="Community service projects"
                className="rounded-xl object-cover w-full h-48 sm:h-56"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HolisticDevelopment;
