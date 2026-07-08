import React from "react";
import missionImg from "../../assets/img/mission.jpg";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useCMS } from "../../hooks/useCMS";

const Mission = () => {
  const { data: cmsData } = useCMS('mission');
  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden font-sans">
      {/* Decorative Blur Background Element */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <div className="relative p-3 bg-white border border-brand-blue/10 rounded-3xl shadow-2xl group">
              <div className="absolute -inset-0.5 bg-gradient-to-tr from-brand-blue to-brand-orange rounded-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
              
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-brand-surface">
                <img
                  src={cmsData?.hero_image_url || missionImg}
                  alt="Students in learning environment"
                  className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Float Card Overlay */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-brand-blue/10 z-20 flex items-center gap-3.5 whitespace-nowrap">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/15 text-brand-orange flex items-center justify-center">
                  <Sparkles className="w-5.5 h-5.5 animate-pulse-slow" />
                </div>
                <div>
                  <h3 className="text-brand-text font-extrabold text-sm sm:text-base font-heading leading-none">
                    Nurturing Tomorrow's Leaders
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">Holistic Growth Model</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mission Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full lg:w-1/2 space-y-6 lg:pl-4"
          >
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-widest">
                Our Core Vision
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-brand-text font-heading leading-tight uppercase">
                {cmsData?.mission_title ? (
        <span dangerouslySetInnerHTML={{ __html: String(cmsData?.mission_title).replace('MISSION', '<span class="text-brand-orange">MISSION</span>') }} />
      ) : (
        <>OUR <span className="text-brand-orange">MISSION</span> STATEMENT</>
      )}
              </h2>
              <div className="w-20 h-1.5 bg-brand-blue rounded-full mt-4"></div>
            </div>

            <div className="space-y-5 text-slate-600 text-base sm:text-lg leading-relaxed">
              {cmsData?.mission_description ? (
                <p>{cmsData.mission_description}</p>
              ) : (
                <>
                  <p>
                    At{" "}
                    <span className="font-extrabold text-brand-blue font-heading">
                      Rajendra Mohan Chandrika Prasad Academy
                    </span>
                    , we are committed to providing a{" "}
                    <span className="font-semibold text-brand-text">holistic education</span> that
                    nurtures young minds with the{" "}
                    <span className="font-semibold text-brand-text">
                      knowledge, values, and essential life skills
                    </span>{" "}
                    vital for personal growth and global success.
                  </p>
    
                  <p>
                    Our mission is to cultivate{" "}
                    <span className="font-semibold text-brand-text">
                      compassionate, responsible, and intellectually curious
                      individuals
                    </span>{" "}
                    by seamlessly integrating{" "}
                    <span className="font-semibold text-brand-text">
                      modern technological education with time-tested traditional wisdom
                    </span>
                  </p>
    
                  <p>
                    We believe in fostering a{" "}
                    <span className="font-semibold text-brand-text">
                      scientific temper, ethical leadership, entrepreneurship, and
                      humanitarian values
                    </span>{" "}
                    within a safe, inclusive, and inspiring environment.
                  </p>
                </>
              )}
            </div>

            {/* Cultural value callout */}
            <div className="border-l-4 border-brand-blue pl-6 py-4 bg-brand-surface rounded-r-2xl my-8">
              <p className="text-slate-700 italic text-base leading-relaxed">
                "With a deep-rooted belief in{" "}
                <span className="font-semibold text-brand-blue font-heading">'Abhivandan Shilayasa'</span>,
                our education system is built on foundation blocks of{" "}
                <span className="font-semibold text-brand-text">
                  mutual respect, discipline, and cultural heritage
                </span>
                ."
              </p>
            </div>

            {/* Bottom tagline */}
            <div className="flex items-center gap-3 pt-3">
              <div className="p-2.5 rounded-xl bg-brand-orange/10 text-brand-orange">
                <Compass className="w-5.5 h-5.5" />
              </div>
              <p className="text-brand-blue font-extrabold text-sm sm:text-base uppercase tracking-widest font-heading">
                Inspiring Potential, Creating Futures
              </p>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
