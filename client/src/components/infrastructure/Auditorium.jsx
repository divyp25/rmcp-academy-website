import React from "react";
import {
  Music,
  Speaker,
  Mic,
  VideoIcon,
  Lightbulb,
  Users,
  Theater,
  CheckCircle,
} from "lucide-react";
import aud1Img from "../../assets/img/aud_1.jpg";
import aud2Img from "../../assets/img/aud_2.jpg";
import aud3Img from "../../assets/img/aud_3.jpg";
import aud4Img from "../../assets/img/aud_4.jpg";
import AnimatedImage from "../ui/AnimatedImage";
import { useCMS } from "../../hooks/useCMS";

const Auditorium = () => {
  const { data: cmsData } = useCMS('auditorium');
  return (
    <div className="bg-brand-bg py-24 font-sans relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest">
            Campus Infrastructure
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-brand-text font-heading tracking-tight uppercase">
            {cmsData?.facility_title ? (
        <span dangerouslySetInnerHTML={{ __html: String(cmsData?.facility_title).replace('Auditorium', '<span class="text-brand-blue">Auditorium</span>') }} />
      ) : (
        <>State-of-the-Art <span className="text-brand-blue">Auditorium</span></>
      )}
          </h2>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto my-4 rounded-full"></div>
          <p className="text-slate-655 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            {cmsData?.facility_description || "A perfect venue for performances, events, and assemblies"}
          </p>
        </div>

        {/* World-Class Facilities */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-brand-blue/10 mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-brand-blue/10 rounded-xl text-brand-blue">
              <Theater size={28} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-brand-text font-heading uppercase tracking-wide">
              World-Class Facilities
            </h2>
          </div>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
            Our auditorium is designed to provide the perfect environment for
            performances, presentations, and gatherings. With state-of-the-art
            technology and thoughtful design, it offers an exceptional experience
            for both performers and audience members.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-brand-blue/10 rounded-2xl p-6 bg-brand-surface hover:border-brand-blue/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-brand-blue/10">
                <div className="p-2 bg-white rounded-lg text-brand-blue shadow-sm border border-brand-blue/5">
                  <Users size={22} />
                </div>
                <h3 className="font-extrabold text-brand-text font-heading text-base uppercase tracking-wide">Spacious Design</h3>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4">
                Our spacious auditorium can comfortably accommodate large gatherings while maintaining excellent sightlines.
              </p>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 text-xs font-semibold">Capacity for {cmsData?.capacity || "800+"} audience members</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 text-xs font-semibold">Comfortable, ergonomic seating</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 text-xs font-semibold">Wheelchair accessible facilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 text-xs font-semibold">Expansive stage with professional wings</span>
                </li>
              </ul>
            </div>

            <div className="border border-brand-blue/10 rounded-2xl p-6 bg-brand-surface hover:border-brand-orange/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-brand-blue/10">
                <div className="p-2 bg-white rounded-lg text-brand-orange shadow-sm border border-brand-blue/5">
                  <Speaker size={22} />
                </div>
                <h3 className="font-extrabold text-brand-text font-heading text-base uppercase tracking-wide">Acoustics</h3>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4">
                Our auditorium features comprehensive soundproofing to create an optimal acoustic environment.
              </p>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 text-xs font-semibold">Professional acoustic panels and baffles</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 text-xs font-semibold">Double-layer sound isolation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 text-xs font-semibold">Noise reduction coefficient of 0.95+</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 text-xs font-semibold">Sound-dampening floor materials</span>
                </li>
              </ul>
            </div>

            <div className="border border-brand-blue/10 rounded-2xl p-6 bg-brand-surface hover:border-brand-blue/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-brand-blue/10">
                <div className="p-2 bg-white rounded-lg text-brand-blue shadow-sm border border-brand-blue/5">
                  <Lightbulb size={22} />
                </div>
                <h3 className="font-extrabold text-brand-text font-heading text-base uppercase tracking-wide">High-Tech Systems</h3>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4">
                Our auditorium is equipped with cutting-edge acoustic and lighting systems that can be customized.
              </p>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 text-xs font-semibold">Digital sound mixing console</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 text-xs font-semibold">Programmable LED lighting system</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 text-xs font-semibold">High-definition projection system</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 text-xs font-semibold">Wireless microphone infrastructure</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="bg-brand-surface p-8 sm:p-10 rounded-3xl shadow-xl border border-brand-blue/15 mb-10">
          <h2 className="text-2xl font-black text-brand-text font-heading uppercase tracking-wide mb-6">
            Technical Specifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-blue/10">
              <h3 className="text-lg font-bold text-brand-blue mb-4 flex items-center gap-2 font-heading uppercase tracking-wide">
                <Music className="text-brand-orange" size={20} />
                Acoustic Features
              </h3>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0" />
                  <p className="text-slate-655 text-sm sm:text-base">
                    Dolby Atmos surround sound system with 32 strategically placed speakers
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0" />
                  <p className="text-slate-655 text-sm sm:text-base">
                    Acoustic reverberation time adjustable between 1.0-2.2 seconds for different performances
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0" />
                  <p className="text-slate-655 text-sm sm:text-base">
                    Professional-grade subwoofers with frequency response down to 20Hz
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0" />
                  <p className="text-slate-655 text-sm sm:text-base">Digital signal processing for real-time audio enhancement</p>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-blue/10">
              <h3 className="text-lg font-bold text-brand-blue mb-4 flex items-center gap-2 font-heading uppercase tracking-wide">
                <VideoIcon className="text-brand-orange" size={20} />
                Lighting System
              </h3>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0" />
                  <p className="text-slate-655 text-sm sm:text-base">DMX-controlled LED lighting grid with over 100 fixtures</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0" />
                  <p className="text-slate-655 text-sm sm:text-base">Programmable scene settings with custom color profiles</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0" />
                  <p className="text-slate-655 text-sm sm:text-base">Moving head spotlights with automatic tracking capability</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0" />
                  <p className="text-slate-655 text-sm sm:text-base">
                    Environmentally friendly LED technology with minimal heat output
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Glimpses / Gallery */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-brand-blue/10 mb-10">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="p-3 bg-brand-orange/10 rounded-xl text-brand-orange">
              <Mic size={24} />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-brand-text font-heading uppercase tracking-wide">
              Experience Our Auditorium
            </h2>
          </div>
          <p className="text-slate-600 text-base leading-relaxed mb-8">
            Our auditorium hosts a variety of events throughout the academic year,
            from dramatic performances and musical concerts to guest lectures and
            graduation ceremonies. The versatile space adapts to any occasion while providing exceptional comfort.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="relative p-1.5 bg-brand-surface border border-brand-blue/10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
              <AnimatedImage
                src={aud1Img}
                alt="Auditorium interior with stage lighting"
                className="rounded-xl w-full h-48 sm:h-56"
              />
            </div>
            <div className="relative p-1.5 bg-brand-surface border border-brand-blue/10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
              <AnimatedImage
                src={aud2Img}
                alt="Performance on stage with lighting effects"
                className="rounded-xl w-full h-48 sm:h-56"
              />
            </div>
            <div className="relative p-1.5 bg-brand-surface border border-brand-blue/10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
              <AnimatedImage
                src={aud3Img}
                alt="Auditorium seating with center aisle"
                className="rounded-xl w-full h-48 sm:h-56"
              />
            </div>
            <div className="relative p-1.5 bg-brand-surface border border-brand-blue/10 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
              <AnimatedImage
                src={aud4Img}
                alt="Technical booth with sound and lighting controls"
                className="rounded-xl w-full h-48 sm:h-56"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Auditorium;
