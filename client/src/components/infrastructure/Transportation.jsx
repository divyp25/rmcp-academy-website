import React from "react";
import { Bus, MapPin, Clock } from "lucide-react";
import trans1Img from "../../assets/img/trans_1.jpg";
import trans2Img from "../../assets/img/trans_2.jpeg";
import trans3Img from "../../assets/img/trans_3.jpg";
import { useCMS } from "../../hooks/useCMS";

const transportationData = [
  {
    id: 1,
    image: trans1Img,
    title: "Safe & Secure Buses",
    description: "Modern, GPS-enabled buses ensuring safe and timely travel for students."
  },
  {
    id: 2,
    image: trans2Img,
    title: "Wide Route Coverage",
    description: "Covers major city areas with multiple pickup and drop locations."
  },
  {
    id: 3,
    image: trans3Img,
    title: "Real-Time Tracking",
    description: "Live tracking for parents to monitor bus location and arrival times."
  }
];

export default function Transportation() {
  const { data: cmsData } = useCMS('transportation');
  return (
    <div className="bg-brand-bg py-24 font-sans relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest">
            Transit Service
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-brand-text font-heading tracking-tight uppercase">
            {cmsData?.facility_title ? (
        <span dangerouslySetInnerHTML={{ __html: String(cmsData?.facility_title).replace('Facility', '<span class="text-brand-blue">Facility</span>') }} />
      ) : (
        <>Transportation <span className="text-brand-blue">Facility</span></>
      )}
          </h2>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto my-4 rounded-full"></div>
          <p className="text-slate-655 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed italic">
            {cmsData?.facility_description || '"Ensuring Safe and Reliable Journeys for Our Students."'}
          </p>
        </div>

        {/* Bus Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {transportationData.map((item) => (
            <div key={item.id} className="bg-white shadow-xl rounded-3xl overflow-hidden border border-brand-blue/10 flex flex-col justify-between group hover:border-brand-blue/30 transition-all duration-300">
              <div className="p-1.5 bg-brand-surface border-b border-brand-blue/5">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-56 object-cover rounded-2xl" 
                />
              </div>
              <div className="p-6 sm:p-8 space-y-3 flex-grow flex flex-col justify-center">
                <h3 className="text-lg sm:text-xl font-black text-brand-text font-heading uppercase tracking-wide">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Features Row */}
        <div className="flex flex-col sm:flex-row justify-center gap-8 text-brand-text">
          <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl border border-brand-blue/10 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="p-2 bg-brand-orange/10 rounded-xl text-brand-orange">
              <Bus size={28} />
            </div>
            <span className="text-base sm:text-lg font-bold font-heading uppercase tracking-wide">Modern Buses</span>
          </div>
          <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl border border-brand-blue/10 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="p-2 bg-brand-blue/10 rounded-xl text-brand-blue">
              <MapPin size={28} />
            </div>
            <span className="text-base sm:text-lg font-bold font-heading uppercase tracking-wide">Wide Coverage</span>
          </div>
          <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl border border-brand-blue/10 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="p-2 bg-brand-orange/10 rounded-xl text-brand-orange">
              <Clock size={28} />
            </div>
            <span className="text-base sm:text-lg font-bold font-heading uppercase tracking-wide">On-Time Arrivals</span>
          </div>
        </div>
      </div>
    </div>
  );
}
