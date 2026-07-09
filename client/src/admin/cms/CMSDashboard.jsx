import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Save, RefreshCw, ImagePlus, ImageIcon, GraduationCap } from 'lucide-react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../../assets/constant';

export default function CMSDashboard() {
  const { pageId } = useParams();
  const navigate = useNavigate();
  
  const [pages, setPages] = useState([]);
  const [pageData, setPageData] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch all pages for overview stats
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await axios.get(`${API}/api/cms/pages`);
        setPages(res.data);
      } catch (err) {
        console.error("Failed to fetch pages", err);
      }
    };
    if (!pageId) {
      fetchPages();
    }
  }, [pageId]);

  // Fetch specific page data
  useEffect(() => {
    if (!pageId) return;
    
    const fetchPageData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API}/api/cms/pages/${pageId}`);
        setPageData(res.data);
        setFormData(res.data.data || {});
      } catch (err) {
        console.error("Failed to fetch page data", err);
      }
      setLoading(false);
    };
    fetchPageData();
  }, [pageId]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`${API}/api/cms/pages/${pageId}`, { data: formData });
      alert("Page saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save.");
    }
    setSaving(false);
  };

  const formatKey = (key) => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (!pageId) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
        <div className="mb-8">
          <span className="text-xs font-bold tracking-widest text-brand-orange uppercase">Dashboard</span>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-text mt-1 font-heading">Overview</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 flex flex-col items-center text-center hover:border-brand-blue/30 transition-colors shadow-sm">
            <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mb-4">
              <FileText className="text-brand-blue w-8 h-8" />
            </div>
            <h3 className="text-5xl font-black text-brand-text mb-2">{pages.length || 31}</h3>
            <p className="text-slate-500 text-sm font-bold tracking-wide uppercase">Dynamic Pages</p>
          </div>
          <div 
            onClick={() => navigate("/admin/gallery/panel")}
            className="bg-slate-50 p-8 rounded-2xl border border-slate-200 flex flex-col items-center text-center hover:border-brand-orange/30 transition-colors shadow-sm cursor-pointer"
          >
            <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mb-4">
              <ImageIcon className="text-brand-orange w-8 h-8" />
            </div>
            <h3 className="text-5xl font-black text-brand-text mb-2">Active</h3>
            <p className="text-slate-500 text-sm font-bold tracking-wide uppercase">Gallery System</p>
          </div>
          <div 
            onClick={() => navigate("/admin/top-students/panel")}
            className="bg-slate-50 p-8 rounded-2xl border border-slate-200 flex flex-col items-center text-center hover:border-brand-yellow/50 transition-colors shadow-sm cursor-pointer"
          >
            <div className="w-16 h-16 bg-brand-yellow/10 rounded-full flex items-center justify-center mb-4">
              <GraduationCap className="text-brand-yellow w-8 h-8" />
            </div>
            <h3 className="text-5xl font-black text-brand-text mb-2">Manage</h3>
            <p className="text-slate-500 text-sm font-bold tracking-wide uppercase">Toppers / Rank List</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-lg gap-4 relative z-20"
      >
        <div>
          <span className="text-xs font-bold tracking-widest text-brand-orange uppercase">Content Editor</span>
          <h1 className="text-2xl font-black flex items-center gap-3 text-brand-text mt-1">
            <FileText className="text-brand-blue" />
            {pageData?.page_name || 'Loading...'}
          </h1>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button onClick={() => setPageData(null)} className="p-3 text-slate-500 hover:text-brand-blue hover:bg-brand-blue/10 bg-slate-50 rounded-xl transition-colors cursor-pointer border border-slate-200">
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
          <button 
            onClick={handleSave}
            disabled={saving || loading}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white px-8 py-3 rounded-xl font-bold text-sm tracking-widest uppercase transition-all shadow-lg shadow-brand-blue/30 cursor-pointer disabled:opacity-50"
          >
            <Save size={18} /> {saving ? 'Saving...' : 'Publish'}
          </button>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-32 bg-white rounded-3xl border border-slate-200 shadow-xl">
          <div className="flex flex-col items-center gap-4">
            <RefreshCw className="animate-spin text-brand-blue w-10 h-10" />
            <span className="text-slate-500 font-bold uppercase tracking-widest text-sm">Loading Content...</span>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl"
        >
          <form className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Object.keys(formData)
              .filter((key) => key !== 'show_admissions_popup')
              .map((key) => {
              const val = formData[key];
              const isBoolean = typeof val === 'boolean' || key.startsWith("show_") || key.startsWith("enable_");
              const isLongText = !isBoolean && (key.includes("description") || key.includes("content") || key.includes("subtitle") || key.includes("message"));
              const isImage = !isBoolean && (key.includes("image") || key.includes("url") || key.includes("icon"));
              
              if (isBoolean) {
                const isChecked = typeof val === 'string' ? val === 'true' : !!val;
                return (
                  <div 
                    key={key} 
                    onClick={() => setFormData({ ...formData, [key]: !isChecked })}
                    className="flex items-center justify-between p-5 bg-slate-50 border border-slate-200 rounded-xl hover:border-brand-blue/30 transition-all duration-300 shadow-inner cursor-pointer select-none"
                  >
                    <div>
                      <label className="text-xs font-bold text-slate-500 tracking-widest uppercase block cursor-pointer">
                        {formatKey(key)}
                      </label>
                      <span className="text-[10px] text-slate-400 font-bold uppercase mt-1.5 block">Toggle Visibility</span>
                    </div>
                    <button
                      type="button"
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isChecked ? 'bg-brand-blue' : 'bg-slate-300'}`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isChecked ? 'translate-x-5' : 'translate-x-0'}`}
                      />
                    </button>
                  </div>
                );
              }

              return (
                <div key={key} className={isLongText ? "lg:col-span-2" : ""}>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-2.5 tracking-widest uppercase">
                    {isImage ? <ImagePlus size={14} className="text-brand-blue"/> : null}
                    {formatKey(key)}
                  </label>
                  {isLongText ? (
                    <textarea
                      value={val}
                      onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                      rows={5}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-800 font-medium focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 focus:bg-white transition-all resize-y shadow-inner"
                      placeholder={`Enter ${formatKey(key)}...`}
                    />
                  ) : (
                    <div className="relative">
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                        className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-800 font-medium focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 focus:bg-white transition-all shadow-inner ${isImage ? 'pl-11' : ''}`}
                        placeholder={isImage ? 'Paste Image URL (e.g. https://...)' : `Enter ${formatKey(key)}...`}
                      />
                      {isImage && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue/50">
                          <ImageIcon size={18} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </form>
        </motion.div>
      )}
    </div>
  );
}
