import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, LayoutDashboard, Image as ImageIcon, ChevronRight, Menu, X, Users, MessageSquare, ShieldAlert, GraduationCap, Briefcase, Trophy, MessageCircle } from 'lucide-react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API } from '../assets/constant';

export default function AdminLayout() {
  const [pages, setPages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile responsiveness
  const location = useLocation();

  // Categories for dynamic CMS pages
  const categories = {
    "Academy": ["about", "mission", "founder", "principal", "chairperson", "accreditation"],
    "Academics": ["primary", "middle", "senior", "holistic", "technology", "guidance"],
    "Infrastructure": ["auditorium", "sports", "library", "campus", "transportation", "health", "security", "learning_center"]
  };

  const getCategory = (pageId) => {
    for (let cat in categories) {
      if (categories[cat].includes(pageId)) return cat;
    }
    return "Main Pages";
  };

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await axios.get(`${API}/api/cms/pages`);
        setPages(res.data);
      } catch (err) {
        console.error("Failed to fetch pages", err);
      }
    };
    fetchPages();
  }, []);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const navLinkClass = ({ isActive }) =>
    `w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
      isActive
        ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/30 transform scale-[1.02]'
        : 'text-slate-500 hover:text-brand-blue hover:bg-brand-blue/5'
    }`;

  const cmsNavLinkClass = ({ isActive }) =>
    `w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
      isActive
        ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20 shadow-sm'
        : 'text-slate-500 hover:text-brand-text hover:bg-slate-50 border border-transparent'
    }`;

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 font-sans">
      
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm mb-6 border border-slate-200">
        <h2 className="text-lg font-black text-brand-text tracking-wider uppercase">RMCP Admin</h2>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-brand-blue/10 text-brand-blue rounded-lg">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row gap-8 relative items-start">
        
        {/* Unified Sidebar */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={`${isSidebarOpen ? 'flex' : 'hidden'} lg:flex w-full lg:w-80 bg-white rounded-3xl border border-slate-200 shadow-xl p-6 flex-col h-[calc(100vh-64px)] sticky top-8 z-30`}
        >
          <div className="hidden lg:block mb-6 pb-6 border-b border-slate-100">
            <h2 className="text-2xl font-black text-brand-text tracking-wider uppercase mb-1">RMCP Admin</h2>
            <p className="text-xs text-brand-orange font-bold tracking-widest uppercase">Content Management</p>
          </div>

          <nav className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar pb-10">
            {/* Core Admin Modules */}
            <div className="space-y-2">
              <NavLink end to="/admin" className={navLinkClass}>
                <LayoutDashboard size={18} /> Overview
              </NavLink>
              <NavLink to="/admin/gallery/panel" className={navLinkClass}>
                <ImageIcon size={18} /> Media & Gallery
              </NavLink>
              <NavLink to="/admin/top-students/panel" className={navLinkClass}>
                <Trophy size={18} /> Top Students
              </NavLink>
              <NavLink to="/admin/admissions/panel" className={navLinkClass}>
                <GraduationCap size={18} /> Admissions
              </NavLink>
              <NavLink to="/admin/tc-requests/panel" className={navLinkClass}>
                <ShieldAlert size={18} /> TC Requests
              </NavLink>
              <NavLink to="/admin/enquiry/panel" className={navLinkClass}>
                <MessageSquare size={18} /> Enquiries
              </NavLink>
              <NavLink to="/admin/chatbot/feedback" className={navLinkClass}>
                <MessageCircle size={18} /> Chatbot Reviews
              </NavLink>
              <NavLink to="/admin/vacancies/panel" className={navLinkClass}>
                <Briefcase size={18} /> Vacancies
              </NavLink>
              <NavLink to="/admin/cbse-disclosure/panel" className={navLinkClass}>
                <FileText size={18} /> CBSE Disclosures
              </NavLink>
            </div>

            {/* Dynamic CMS Pages */}
            <div className="pt-4 border-t border-slate-100">
              {["Main Pages", "Academy", "Academics", "Infrastructure"].map(cat => {
                const catPages = pages.filter(p => getCategory(p.page_id) === cat);
                if (catPages.length === 0) return null;

                return (
                  <div key={cat} className="pt-4">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-4">{cat}</h3>
                    <div className="space-y-1">
                      {catPages.map(page => (
                        <NavLink
                          key={page.page_id}
                          to={`/admin/cms/${page.page_id}`}
                          className={cmsNavLinkClass}
                        >
                          <div className="flex items-center gap-3">
                            <FileText size={16} className={location.pathname === `/admin/cms/${page.page_id}` ? 'text-brand-orange' : 'text-slate-400'} />
                            {page.page_name}
                          </div>
                          {location.pathname === `/admin/cms/${page.page_id}` && <ChevronRight size={14} className="text-brand-blue" />}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </nav>
        </motion.div>

        {/* Main Content Area via Outlet */}
        <div className="flex-1 w-full min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
