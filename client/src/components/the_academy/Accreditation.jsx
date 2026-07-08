import React from "react";
import cbse_bord from "../../assets/img/cbse_bord.png";
import { Award, ShieldCheck, Compass, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useCMS } from "../../hooks/useCMS";

const Accreditation = () => {
  const { data: cmsData } = useCMS('accreditation');
  const accreditation = {
    name: "CBSE Affiliation",
    logo: cbse_bord,
    issuedBy: "Central Board of Secondary Education",
    description:
      "Full recognition as a Senior Secondary School meeting all CBSE quality standards and curriculum requirements.",
    category: "Educational Board",
  };

  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden font-sans">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest">
            Affiliation
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-text font-heading tracking-tight uppercase">
            {cmsData?.accreditation_title ? (
              <span dangerouslySetInnerHTML={{ __html: cmsData.accreditation_title.replace('Accreditations', 'Accreditations <span class="text-brand-blue">') + (cmsData.accreditation_title.includes('Accreditations') ? '</span>' : '') }} />
            ) : (
              <>Accreditations <span className="text-brand-blue">& Certifications</span></>
            )}
          </h2>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto my-4 rounded-full"></div>
          <p className="text-slate-600 max-w-3xl mx-auto text-base sm:text-lg">
            {cmsData?.accreditation_description || "RMCP Academy holds prestigious accreditations that validate our commitment to educational excellence, quality assurance, and continuous improvement."}
          </p>
        </div>

        {/* Quality Standards Banner */}
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 mb-16">
          <div className="mb-6 md:mb-0 md:w-2/3">
            <div className="bg-white h-full rounded-3xl shadow-xl border border-brand-blue/10 overflow-hidden flex flex-col sm:flex-row">
              {/* Logo Section */}
              <div className="bg-brand-surface p-8 flex items-center justify-center sm:w-1/3 border-r border-brand-blue/5">
                <img
                  src={accreditation.logo}
                  alt={`${accreditation.name} logo`}
                  className="w-36 h-36 object-contain rounded-full shadow-md bg-white p-2"
                />
              </div>

              {/* Content Section */}
              <div className="p-8 sm:w-2/3 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-bold text-brand-text font-heading uppercase">
                      {accreditation.name}
                    </h4>
                    <span className="bg-brand-orange/10 text-brand-orange text-xs font-bold py-1 px-3 rounded-full uppercase tracking-wider">
                      {accreditation.category}
                    </span>
                  </div>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    {accreditation.description}
                  </p>
                </div>

                <div className="border-t border-brand-blue/10 pt-4">
                  <div className="grid grid-cols-1 gap-1 text-sm">
                    <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Issued By</p>
                    <p className="font-extrabold text-brand-text text-sm sm:text-base font-heading">
                      {accreditation.issuedBy}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 flex">
            <div className="bg-brand-surface p-8 rounded-3xl border border-brand-blue/15 shadow-md flex flex-col justify-between w-full">
              <div>
                <h4 className="font-extrabold text-brand-blue-dark text-lg font-heading mb-4 uppercase tracking-wider">Key Benefits</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm font-semibold">
                      Standardized quality education
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm font-semibold">
                      Recognition by higher education institutions
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm font-semibold">
                      Regular quality audits and improvements
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm font-semibold">
                      Internationally recognized standards
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Accreditation Process */}
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 border-t-4 border-brand-blue border border-brand-blue/10">
          <h3 className="text-2xl font-black text-brand-text mb-10 text-center font-heading uppercase tracking-wide">
            Our Accreditation Journey
          </h3>

          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="mr-5 flex flex-col items-center">
                    <div className="bg-brand-orange text-white rounded-full w-9 h-9 flex items-center justify-center font-extrabold shadow-md">
                      1
                    </div>
                    <div className="w-0.5 h-12 bg-brand-blue/15 my-2"></div>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-text mb-1.5 font-heading text-base sm:text-lg">
                      Application & Self-Assessment
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Rigorous internal evaluation against quality parameters and submission of comprehensive documentation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-5 flex flex-col items-center">
                    <div className="bg-brand-orange text-white rounded-full w-9 h-9 flex items-center justify-center font-extrabold shadow-md">
                      2
                    </div>
                    <div className="w-0.5 h-12 bg-brand-blue/15 my-2"></div>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-text mb-1.5 font-heading text-base sm:text-lg">
                      External Verification
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      On-site inspections by accreditation authorities evaluating facilities, teaching methods, and adherence to standards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-5 flex flex-col items-center">
                    <div className="bg-brand-orange text-white rounded-full w-9 h-9 flex items-center justify-center font-extrabold shadow-md">
                      3
                    </div>
                    <div className="w-0.5 h-12 bg-brand-blue/15 my-2"></div>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-text mb-1.5 font-heading text-base sm:text-lg">
                      Quality Improvement Plan
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Implementation of recommended enhancements to further strengthen educational delivery and infrastructure.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-5">
                    <div className="bg-brand-orange text-white rounded-full w-9 h-9 flex items-center justify-center font-extrabold shadow-md">
                      4
                    </div>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-text mb-1.5 font-heading text-base sm:text-lg">
                      Certification & Renewal
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Receipt of formal accreditation and commitment to ongoing quality assurance through periodic reviews.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3 bg-brand-surface p-8 rounded-2xl border border-brand-blue/10">
              <h4 className="font-extrabold text-brand-blue-dark mb-6 font-heading uppercase tracking-wider">
                Our Quality Framework
              </h4>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-brand-blue/5">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 relative">
                      <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-brand-blue opacity-75"></span>
                      <div className="relative w-3 h-3 bg-brand-blue rounded-full"></div>
                    </div>
                    <h5 className="font-bold text-brand-text text-sm sm:text-base font-heading">
                      Academic Excellence
                    </h5>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-brand-blue/5">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 relative">
                      <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-brand-blue opacity-75"></span>
                      <div className="relative w-3 h-3 bg-brand-blue rounded-full"></div>
                    </div>
                    <h5 className="font-bold text-brand-text text-sm sm:text-base font-heading">
                      Infrastructure & Resources
                    </h5>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-brand-blue/5">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 relative">
                      <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-brand-blue opacity-75"></span>
                      <div className="relative w-3 h-3 bg-brand-blue rounded-full"></div>
                    </div>
                    <h5 className="font-bold text-brand-text text-sm sm:text-base font-heading">
                      Teaching Quality
                    </h5>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-brand-blue/5">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 relative">
                      <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-brand-blue opacity-75"></span>
                      <div className="relative w-3 h-3 bg-brand-blue rounded-full"></div>
                    </div>
                    <h5 className="font-bold text-brand-text text-sm sm:text-base font-heading">
                      Student Outcomes
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accreditation;
