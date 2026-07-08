import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Trees, Users, Award, BookOpen, Compass, ShieldCheck, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useCMS } from "../../hooks/useCMS";

const About = () => {
  const { data: cmsData } = useCMS('about');
  // Motion variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeUpItem = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden font-sans">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title / Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest">
            Our Legacy
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-text font-heading tracking-tight">
            {cmsData?.page_title ? (
        <span dangerouslySetInnerHTML={{ __html: String(cmsData?.page_title).replace('RMCP ACADEMY', '<span class="text-brand-blue">RMCP ACADEMY</span>') }} />
      ) : (
        <>ABOUT <span className="text-brand-blue">RMCP</span> <span className="text-brand-blue">ACADEMY</span></>
      )}
          </h2>
          <div className="flex justify-center items-center gap-3 mt-4">
            <div className="w-12 h-1 bg-brand-orange rounded-full"></div>
            <p className="text-brand-text/75 font-extrabold uppercase tracking-widest text-xs">{cmsData?.legacy_badge || "Established 2012"}</p>
            <div className="w-12 h-1 bg-brand-orange rounded-full"></div>
          </div>
          <p className="text-brand-text/80 max-w-2xl mx-auto text-base sm:text-lg">
            {cmsData?.page_subtitle || "A premier educational academy dedicated to academic rigor, creative innovation, and comprehensive holistic student development."}
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-4 bg-brand-surface rounded-3xl border border-brand-blue/15 shadow-xl shadow-brand-blue/5 overflow-hidden sticky top-24"
          >
            <div className="bg-brand-text py-6 px-8 border-b border-white/5">
              <h3 className="text-white text-lg font-bold font-heading tracking-wider uppercase">RMCP At A Glance</h3>
              <p className="text-xs text-slate-300 mt-1">Core statistics & features</p>
            </div>
            
            <div className="p-8">
              <ul className="space-y-7">
                
                <li className="flex items-start gap-4">
                  <div className="bg-brand-blue/10 p-3 rounded-xl text-brand-blue flex-shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-text text-sm sm:text-base font-heading">Affiliated Board</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {cmsData?.stats_affiliated_board || "CBSE curriculum integrated with modern learning approaches"}
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="bg-brand-blue/10 p-3 rounded-xl text-brand-blue flex-shrink-0">
                    <Trees className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-text text-sm sm:text-base font-heading">Sprawling Campus</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {cmsData?.stats_campus || "10-acre lush green campus designed for health and safety"}
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="bg-brand-blue/10 p-3 rounded-xl text-brand-blue flex-shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-text text-sm sm:text-base font-heading">Expert Faculty</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {cmsData?.stats_faculty || "75+ Highly qualified educators dedicated to student growth"}
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="bg-brand-blue/10 p-3 rounded-xl text-brand-blue flex-shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-text text-sm sm:text-base font-heading">Proven Results</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {cmsData?.stats_alumni || "1000+ Successful alumni placed in top institutions globally"}
                    </p>
                  </div>
                </li>

              </ul>
              
              {/* Mandatory Public Disclosure Button */}
              <div className="mt-10 pt-8 border-t border-brand-blue/10">
                <Link
                  to="/cbse/ex"
                  className="w-full flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold tracking-widest uppercase px-6 py-4 text-xs sm:text-sm transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 text-center leading-tight"
                >
                  <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                  <span>Mandatory<br/>Public Disclosure</span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Middle/Right Column - Main Text */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-8 space-y-6"
          >
            <div className="bg-white rounded-3xl border border-brand-blue/10 shadow-xl shadow-brand-blue/5 p-8 sm:p-10 space-y-8">
              
              <div className="space-y-4 text-brand-text/80 text-base sm:text-lg leading-relaxed">
                <p>
                  <span className="font-black text-brand-blue font-heading">
                    Rajendra Mohan Chandrika Prasad Academy (RMCP Academy)
                  </span>{" "}
                  in Bilsanda was established with a singular, profound vision: to provide a world-class education that balances academic excellence with character development.
                </p>
                <p>
                  Our academy offers a comprehensive educational journey from pre-primary to senior secondary levels, fostering a highly collaborative environment where students can discover, test, and develop their unique talents and abilities.
                </p>
              </div>

              {/* Inset Core Focus Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                
                <div className="p-6 rounded-2xl bg-brand-surface border border-brand-blue/10 hover:border-brand-blue/30 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4">
                    <BookOpen className="w-5.5 h-5.5" />
                  </div>
                  <h4 className="font-extrabold text-brand-text text-base font-heading mb-2">Stimulating Environment</h4>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Equipped classrooms, advanced science and computer laboratories, and a well-stocked library support continuous growth.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-brand-surface border border-brand-blue/10 hover:border-brand-orange/30 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-4">
                    <Heart className="w-5.5 h-5.5" />
                  </div>
                  <h4 className="font-extrabold text-brand-text text-base font-heading mb-2">Co-Curricular Focus</h4>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Comprehensive programs in music, fine arts, dance, and martial arts (Taekwondo) ensure all-round growth.
                  </p>
                </div>

              </div>

              <div className="border-l-4 border-brand-orange pl-6 py-4 bg-brand-orange/5 rounded-r-2xl my-6">
                <p className="text-slate-700 italic text-base leading-relaxed">
                  "Our educational philosophy integrates modern teaching approaches with traditional values, preparing students who excel academically while maintaining strong ethical foundations."
                </p>
              </div>

              <p className="text-brand-text/80 text-base sm:text-lg leading-relaxed">
                At RMCP Academy, we believe education should inspire curiosity, foster critical thinking, and instill a lifelong love for learning. Our teaching methodology encourages students to question, explore, and innovate. We take pride in our alumni who have built successful careers, carrying forward the values and knowledge imparted here.
              </p>

            </div>
          </motion.div>

        </div>

        {/* Bottom Interactive Navigation Cards */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
        >
          
          <motion.div variants={fadeUpItem}>
            <Link
              to="/infrastructure/learning-centre"
              className="group bg-white p-7 h-full rounded-2xl border border-brand-blue/10 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 text-center flex flex-col items-center"
            >
              <div className="w-14 h-14 bg-brand-blue/10 rounded-2xl flex items-center justify-center mb-5 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                <Compass className="w-6.5 h-6.5" />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-brand-text font-heading mb-2">Academic Excellence</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Conceptual understanding and logical reasoning-based learning processes.
              </p>
            </Link>
          </motion.div>

          <motion.div variants={fadeUpItem}>
            <Link
              to="/infrastructure/auditorium"
              className="group bg-white p-7 h-full rounded-2xl border border-brand-blue/10 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 text-center flex flex-col items-center"
            >
              <div className="w-14 h-14 bg-brand-orange/10 rounded-2xl flex items-center justify-center mb-5 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                <Award className="w-6.5 h-6.5" />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-brand-text font-heading mb-2">Value Education</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Character development integrating cultural heritage, morals, and civic duties.
              </p>
            </Link>
          </motion.div>

          <motion.div variants={fadeUpItem}>
            <Link
              to="/academics/technology"
              className="group bg-white p-7 h-full rounded-2xl border border-brand-blue/10 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 text-center flex flex-col items-center"
            >
              <div className="w-14 h-14 bg-brand-blue/10 rounded-2xl flex items-center justify-center mb-5 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                <ShieldCheck className="w-6.5 h-6.5" />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-brand-text font-heading mb-2">Modern Facilities</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Secure campus, school transportation, smart panels, and modern infrastructure.
              </p>
            </Link>
          </motion.div>

          <motion.div variants={fadeUpItem}>
            <Link
              to="/academics/holistic-development"
              className="group bg-white p-7 h-full rounded-2xl border border-brand-blue/10 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 text-center flex flex-col items-center"
            >
              <div className="w-14 h-14 bg-brand-orange/10 rounded-2xl flex items-center justify-center mb-5 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                <Users className="w-6.5 h-6.5" />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-brand-text font-heading mb-2">Holistic Growth</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                All-round growth through active sports leagues, Taekwondo training, and arts.
              </p>
            </Link>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};

export default About;
