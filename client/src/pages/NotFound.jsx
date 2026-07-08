import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-bg text-center px-4 relative overflow-hidden font-sans">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md mx-auto space-y-6 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-brand-blue/10 flex flex-col items-center">
        <div className="p-4 bg-brand-orange/10 rounded-full text-brand-orange">
          <AlertCircle size={48} />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-brand-text font-heading tracking-tight uppercase">404 - Page Not Found</h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">Oops! The page you are looking for does not exist or has been moved.</p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-brand-orange text-white font-extrabold text-xs uppercase tracking-wider hover:bg-brand-orange-dark shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
