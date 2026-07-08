import React from "react";
import { ShieldCheck, IdCard, Camera, AlarmCheck } from "lucide-react";

import security1Img from "../../assets/img/security_1.webp";
import security2Img from "../../assets/img/security_2.jpeg";
import security3Img from "../../assets/img/security_3.jpg";

const securityImages = [
  security1Img, security2Img, security3Img
];
import { useCMS } from "../../hooks/useCMS";

export default function Security() {
  const { data: cmsData } = useCMS('security');
  return (
    <div className="bg-brand-bg py-24 font-sans relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest">
            Campus Protection
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-brand-text font-heading tracking-tight uppercase">
            {cmsData?.facility_title ? (
        <span dangerouslySetInnerHTML={{ __html: String(cmsData?.facility_title).replace('Safety', '<span class="text-brand-blue">Safety</span>') }} />
      ) : (
        <>Security & <span className="text-brand-blue">Safety</span></>
      )}
          </h2>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto my-4 rounded-full"></div>
          <p className="text-slate-655 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed italic">
            {cmsData?.facility_description || '"Ensuring a safe and secure environment for students, staff, and visitors."'}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="flex items-center gap-3.5 bg-white p-5 rounded-2xl border border-brand-blue/10 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="p-2.5 bg-brand-orange/10 rounded-xl text-brand-orange">
              <ShieldCheck size={28} />
            </div>
            <span className="text-sm sm:text-base font-bold font-heading uppercase tracking-wide text-brand-text">Security Guards Deployed</span>
          </div>
          <div className="flex items-center gap-3.5 bg-white p-5 rounded-2xl border border-brand-blue/10 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="p-2.5 bg-brand-blue/10 rounded-xl text-brand-blue">
              <IdCard size={28} />
            </div>
            <span className="text-sm sm:text-base font-bold font-heading uppercase tracking-wide text-brand-text">ID Cards for All</span>
          </div>
          <div className="flex items-center gap-3.5 bg-white p-5 rounded-2xl border border-brand-blue/10 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="p-2.5 bg-brand-orange/10 rounded-xl text-brand-orange">
              <Camera size={28} />
            </div>
            <span className="text-sm sm:text-base font-bold font-heading uppercase tracking-wide text-brand-text">CCTV Surveillance</span>
          </div>
          <div className="flex items-center gap-3.5 bg-white p-5 rounded-2xl border border-brand-blue/10 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="p-2.5 bg-brand-blue/10 rounded-xl text-brand-blue">
              <AlarmCheck size={28} />
            </div>
            <span className="text-sm sm:text-base font-bold font-heading uppercase tracking-wide text-brand-text">Fire Safety Systems</span>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {securityImages.map((image, index) => (
            <div key={index} className="relative p-1.5 bg-white border border-brand-blue/10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <img
                src={image}
                alt={`Security View ${index + 1}`}
                className="rounded-xl object-cover w-full h-56"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}