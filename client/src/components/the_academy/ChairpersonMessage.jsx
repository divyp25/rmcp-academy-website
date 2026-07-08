import React from "react";
import chairpersonImag from "../../assets/img/founders/chairperson.jpg";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useCMS } from "../../hooks/useCMS";

const ChairpersonMessage = () => {
  const { data: cmsData } = useCMS('chairperson');
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
                <span className="text-xs font-bold tracking-widest text-brand-orange uppercase block">Leadership Voice</span>
                <h2 className="text-3xl font-black text-brand-text font-heading uppercase">
                  <>CHAIRPERSONS <span className="text-brand-blue">MESSAGE</span></>
                </h2>
                <div className="w-16 h-1.5 bg-brand-orange rounded-full mt-3"></div>
              </div>

              {/* Inspiration Quote */}
              <div className="relative p-6 rounded-2xl bg-brand-surface border-l-4 border-brand-blue mb-8">
                <Quote className="absolute right-4 top-4 text-brand-blue/10 w-12 h-12" />
                <p className="text-brand-text/90 italic text-base sm:text-lg leading-relaxed font-semibold relative z-10">
                  "Education is not the learning of facts, but the training of the mind to think."
                </p>
              </div>

              {/* Message Body */}
              <div className="space-y-5 text-slate-600 text-base sm:text-lg leading-relaxed">
                {cmsData?.chairperson_message ? (
                  <p className="whitespace-pre-wrap">{cmsData.chairperson_message}</p>
                ) : (
                  <>
                    <p className="font-extrabold text-brand-text font-heading">Dear Parents and Students,</p>
                    <p>
                      It is an honor to welcome you to{" "}
                      <span className="font-extrabold text-brand-blue">
                        Rajendra Mohan Chandrika Prasad Academy
                      </span>
                      . Our academy is built on the firm foundations of academic excellence, personal integrity, and a deep commitment to shaping future leaders.
                    </p>
                    <p>
                      We believe that education is more than just academic achievement—it is the key to unlocking a child's true potential. At RMCP Academy, we nurture curiosity, resilience, and character, ensuring that our students grow into confident individuals who contribute status and meaning to society.
                    </p>
                    <p>
                      As we continue our journey of empowering young minds, I extend my heartfelt gratitude to our dedicated educators, supportive parents, and, most importantly, our students, whose aspirations inspire us every day.
                    </p>
                    <p>
                      Let us work together to create an environment where knowledge flourishes, values are upheld, and dreams take flight.
                    </p>
                  </>
                )}
              </div>

              {/* Signature Section */}
              <div className="mt-10 pt-6 border-t border-brand-blue/10 flex flex-col items-end text-right">
                <p className="font-semibold text-brand-blue text-sm uppercase tracking-widest">With Warm Regards,</p>
                <p className="text-brand-text text-lg font-black font-heading mt-1">
                  {cmsData?.chairperson_name || "Mr. Vijender Mohan Saxena"}
                </p>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">{cmsData?.chairperson_title || "Chairperson, RMCP Academy"}</p>
              </div>

            </div>
          </motion.div>

          {/* Chairperson Image Column (Right) */}
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
                    src={cmsData?.chairperson_image_url || chairpersonImag}
                    alt="Chairperson Mr. Vijender Mohan Saxena"
                    className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="text-center bg-brand-text p-6 rounded-2xl shadow-2xl -mt-10 w-5/6 relative z-20 border border-white/5">
                <h3 className="text-lg font-black text-white font-heading tracking-wide">
                  {cmsData?.chairperson_name || "Mr. Vijender Mohan Saxena"}
                </h3>
                <p className="text-brand-orange font-bold text-xs uppercase tracking-widest mt-1.5">{cmsData?.chairperson_title?.split(',')[0] || "Chairperson"}</p>
                <div className="w-12 h-0.5 bg-brand-blue mx-auto my-3 rounded"></div>
                <p className="text-slate-300 text-xs leading-relaxed font-medium">
                  Visionary Educator, Philanthropist & Community Leader
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ChairpersonMessage;
