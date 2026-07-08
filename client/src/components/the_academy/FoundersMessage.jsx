import React from "react";
import founderImag from "../../assets/img/founders/founder.jpg";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useCMS } from "../../hooks/useCMS";

const FounderMessage = () => {
  const { data: cmsData } = useCMS('founder');
  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden font-sans">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          
          {/* Message Text Column (Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full lg:w-3/5"
          >
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-brand-blue/10 shadow-2xl relative">
              
              <div className="space-y-3 mb-8">
                <span className="text-xs font-bold tracking-widest text-brand-orange uppercase block">Academy Origin</span>
                <h2 className="text-3xl font-black text-brand-text font-heading uppercase">
                  <>Founders <span className="text-brand-blue">Message</span></>
                </h2>
                <div className="w-16 h-1.5 bg-brand-orange rounded-full mt-3"></div>
              </div>

              {/* Inspiration Quote */}
              <div className="relative p-6 rounded-2xl bg-brand-surface border-l-4 border-brand-blue mb-8">
                <Quote className="absolute right-4 top-4 text-brand-blue/10 w-12 h-12" />
                <p className="text-brand-text/90 italic text-base sm:text-lg leading-relaxed font-semibold relative z-10">
                  "Education is the most powerful weapon which you can use to change the world."
                </p>
              </div>

              {/* Message Body */}
              <div className="space-y-5 text-slate-655 text-base sm:text-lg leading-relaxed">
                {cmsData?.founder_message ? (
                  <p className="whitespace-pre-wrap">{cmsData.founder_message}</p>
                ) : (
                  <>
                    <p className="font-extrabold text-brand-text font-heading">Dear Parents and Students,</p>
                    <p>
                      It is with great pleasure that I welcome you to{" "}
                      <span className="font-extrabold text-brand-blue">
                        Rajendra Mohan Chandrika Prasad Academy
                      </span>
                      . Our institution stands as a beacon of educational excellence, where we believe in nurturing not just academic brilliance but the holistic development of each child.
                    </p>
                    <p>
                      At RMCP Academy, we understand that education goes beyond textbooks and classrooms. We are committed to providing an environment where students discover their unique talents, develop critical thinking skills, and cultivate values that will guide them throughout their lives.
                    </p>
                    <p>
                      Our dedicated faculty works tirelessly to ensure that every student receives personalized attention and guidance. We have invested in state-of-the-art facilities and innovative teaching methodologies to prepare our students for the challenges of the 21st century while remaining rooted in our rich cultural heritage.
                    </p>
                    <p>
                      As we journey together in this educational endeavor, I invite parents to be active participants in their child's growth. Together, we can create an ecosystem where young minds flourish and emerge as responsible global citizens who lead with integrity and compassion.
                    </p>
                  </>
                )}
              </div>

              {/* Signature Section */}
              <div className="mt-10 pt-6 border-t border-brand-blue/10 flex flex-col items-end text-right">
                <p className="font-semibold text-brand-blue text-sm uppercase tracking-widest">With Warm Regards,</p>
                <p className="text-brand-text text-lg font-black font-heading mt-1">
                  {cmsData?.founder_name || "LATE SMT. CHANDRIKA PRASAD"}
                </p>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">{cmsData?.founder_title || "Founder, RMCP Academy"}</p>
              </div>

            </div>
          </motion.div>

          {/* Founder Image Column (Right) */}
          <motion.div 
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full lg:w-2/5"
          >
            <div className="flex flex-col items-center">
              <div className="relative p-3 bg-white border border-brand-blue/10 rounded-3xl shadow-2xl max-w-sm w-full group">
                <div className="absolute -inset-0.5 bg-gradient-to-tr from-brand-blue to-brand-orange rounded-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
                
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-brand-surface">
                  <img
                    src={cmsData?.founder_image_url || founderImag}
                    alt="Founder Mr. Narendra Mohan Saxena"
                    className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="text-center bg-brand-text p-6 rounded-2xl shadow-2xl -mt-10 w-5/6 relative z-20 border border-white/5">
                <h3 className="text-lg font-black text-white font-heading tracking-wide">
                  {cmsData?.founder_name || "Mr. Narendra Mohan Saxena"}
                </h3>
                <p className="text-brand-orange font-bold text-xs uppercase tracking-widest mt-1.5">{cmsData?.founder_title || "Founder"}</p>
                <div className="w-12 h-0.5 bg-brand-blue mx-auto my-3 rounded"></div>
                <p className="text-slate-300 text-xs leading-relaxed font-medium">
                  Visionary Educator & Community Leader
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FounderMessage;
