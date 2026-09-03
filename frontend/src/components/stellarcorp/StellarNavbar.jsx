import React, { useState } from 'react';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const StellarNavbar = ({ onRequestDemo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-10">
          <Link to="/stellarcorp" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              {/* Modern Leaf / Orbit SVG icon */}
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
                <path d="M12 6a6 6 0 0 0-6 6c0 3 3 6 6 6s6-3 6-6a6 6 0 0 0-6-6z" fill="currentColor" fillOpacity="0.25"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-[#0B192C] tracking-tight font-heading">
              Stellar<span className="text-emerald-600">Corp</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button className="flex items-center gap-1 hover:text-[#0B192C] transition-colors py-2">
              Platform <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>
            <button className="flex items-center gap-1 hover:text-[#0B192C] transition-colors py-2">
              Solutions <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>
            <button className="flex items-center gap-1 hover:text-[#0B192C] transition-colors py-2">
              Resources <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>
            <a href="#pricing" className="hover:text-[#0B192C] transition-colors py-2">
              Pricing
            </a>
            <a href="#about" className="hover:text-[#0B192C] transition-colors py-2">
              About Us
            </a>
          </div>
        </div>

        {/* Right Action CTAs */}
        <div className="hidden md:flex items-center gap-5">
          <Link
            to="/login"
            className="text-sm font-semibold text-slate-700 hover:text-[#0B192C] px-3 py-2 transition-colors"
          >
            Login
          </Link>
          <button
            onClick={onRequestDemo}
            className="px-5 py-2.5 rounded-xl bg-[#0B192C] hover:bg-[#1E3E62] text-white text-sm font-semibold shadow-md shadow-slate-900/10 hover:shadow-lg transition-all flex items-center gap-2"
          >
            <span>Request Demo</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-slate-900"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-6 py-4 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
            <a href="#platform" className="py-2 hover:text-emerald-600">Platform</a>
            <a href="#solutions" className="py-2 hover:text-emerald-600">Solutions</a>
            <a href="#resources" className="py-2 hover:text-emerald-600">Resources</a>
            <a href="#pricing" className="py-2 hover:text-emerald-600">Pricing</a>
            <a href="#about" className="py-2 hover:text-emerald-600">About Us</a>
          </div>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link to="/login" className="text-center py-2 text-sm font-semibold text-slate-700">
              Login
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestDemo();
              }}
              className="w-full py-2.5 rounded-xl bg-[#0B192C] text-white text-sm font-semibold text-center"
            >
              Request Demo
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default StellarNavbar;
