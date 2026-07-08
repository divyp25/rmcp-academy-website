import React from "react";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { schoolInfo } from "../../assets/constant";
import { Link } from "react-router-dom";
import cbseLogo from "../../assets/img/cbse_bord.png";
import rmcp_logo from "../../assets/img/rmcp_logo.png";

const Footer = () => {
  return (
    <footer className="relative bg-brand-text text-slate-300 pt-20 pb-10 border-t border-white/5 overflow-hidden font-sans">
      {/* Decorative premium gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Column 1: School Identity */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3.5">
              <span className="text-xs font-bold tracking-widest text-brand-orange uppercase block">Academic Legacy</span>
              <div className="flex flex-col gap-3">
                <img src={rmcp_logo} alt="RMCP Academy Logo" className="w-16 h-16 object-contain" />
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight font-heading tracking-wide">
                  {schoolInfo.name}
                </h2>
              </div>
            </div>
            <p className="text-sm text-slate-300/80 leading-relaxed max-w-md">
              Fostering academic excellence, innovation, and character building since 2012. Equipping future leaders with modern capabilities and traditional values.
            </p>
            
            {/* CBSE Affiliation */}
            <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl w-fit">
              <div className="bg-white p-1 rounded-lg">
                <img src={cbseLogo} alt="CBSE Logo" className="w-10 h-10 object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold tracking-widest text-brand-orange uppercase">CBSE Affiliated</span>
                <span className="text-[10px] text-slate-400">Central Board of Secondary Education</span>
              </div>
            </div>
            
            {/* Contact Details Cards */}
            <div className="space-y-4 pt-2">
              <a
                href="https://maps.google.com/?q=RMCP+ACADEMY+Ghanshyampur+Bilsanda"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3.5 text-sm text-slate-300 hover:text-white transition-colors duration-200 cursor-pointer group"
              >
                <MapPinIcon className="h-5.5 w-5.5 text-brand-orange flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="capitalize">{schoolInfo.address}</span>
              </a>
              <div className="flex items-center gap-3.5 text-sm">
                <PhoneIcon className="h-5.5 w-5.5 text-brand-orange flex-shrink-0" />
                <a href={`tel:${schoolInfo.phone}`} className="text-slate-300 hover:text-white transition-colors duration-200">
                  {schoolInfo.phone}
                </a>
                {schoolInfo.phone2 && (
                  <>
                    <span className="text-slate-600">|</span>
                    <a href={`tel:${schoolInfo.phone2}`} className="text-slate-300 hover:text-white transition-colors duration-200">
                      {schoolInfo.phone2}
                    </a>
                  </>
                )}
              </div>
              <div className="flex items-center gap-3.5 text-sm">
                <EnvelopeIcon className="h-5.5 w-5.5 text-brand-orange flex-shrink-0" />
                <a href={`mailto:${schoolInfo.email}`} className="text-slate-300 hover:text-white transition-colors duration-200">
                  {schoolInfo.email}
                </a>
              </div>
            </div>

            {/* Social Media Link Icons */}
            {schoolInfo.socialMedia && schoolInfo.socialMedia.length > 0 && (
              <div className="space-y-3 pt-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block">Connect With Us</span>
                <div className="flex gap-3">
                  {schoolInfo.socialMedia.map((platform) => (
                    <a
                      key={platform.name}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-brand-blue/20 hover:border-brand-blue/50 hover:shadow-[0_0_15px_rgba(0,119,255,0.3)] hover:-translate-y-1 transition-all duration-300"
                      aria-label={platform.name}
                    >
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d={platform.icon} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 lg:pl-10 space-y-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-brand-blue uppercase">Explore</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-4 font-heading">Quick Links</h3>
            </div>
            <ul className="grid grid-cols-1 gap-3">
              <li>
                <Link to="/" className="text-sm text-slate-300 hover:text-brand-blue-light hover:translate-x-1.5 inline-block transition-all duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/academy/about" className="text-sm text-slate-300 hover:text-brand-blue-light hover:translate-x-1.5 inline-block transition-all duration-300">
                  The Academy
                </Link>
              </li>
              <li>
                <Link to="/academics/methodology/primary" className="text-sm text-slate-300 hover:text-brand-blue-light hover:translate-x-1.5 inline-block transition-all duration-300">
                  Academics Wing
                </Link>
              </li>
              <li>
                <Link to="/infrastructure/overview" className="text-sm text-slate-300 hover:text-brand-blue-light hover:translate-x-1.5 inline-block transition-all duration-300">
                  Infrastructure
                </Link>
              </li>
              <li>
                <Link to="/admissions/apply/primary" className="text-sm text-slate-300 hover:text-brand-blue-light hover:translate-x-1.5 inline-block transition-all duration-300">
                  Admissions Hub
                </Link>
              </li>
              <li>
                <Link to="/press/coverage" className="text-sm text-slate-300 hover:text-brand-blue-light hover:translate-x-1.5 inline-block transition-all duration-300">
                  Media & Press
                </Link>
              </li>
              <li>
                <Link to="/vacancies" className="text-sm text-slate-300 hover:text-brand-blue-light hover:translate-x-1.5 inline-block transition-all duration-300">
                  Careers / Vacancies
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm text-slate-300 hover:text-brand-blue-light hover:translate-x-1.5 inline-block transition-all duration-300">
                  Photo Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Google Maps Map */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-brand-orange uppercase">Location</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-4 font-heading">Find Us On Map</h3>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-1.5 shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3514.7927478368233!2d79.95428650944909!3d28.243969575778504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399f8645256860b9%3A0x256200925baa2dca!2sRMCP%20ACADEMY!5e0!3m2!1sen!2sin!4v1742659034585!5m2!1sen!2sin"
                className="w-full h-48 rounded-xl border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map location of RMCP Academy"
              ></iframe>
            </div>
          </div>

        </div>

        {/* Lower copyright bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-semibold">
          <p>
            © {new Date().getFullYear()} {schoolInfo.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
