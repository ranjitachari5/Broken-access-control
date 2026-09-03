import React, { useState } from 'react';
import StellarNavbar from '../components/stellarcorp/StellarNavbar';
import StellarDashboardPreview from '../components/stellarcorp/StellarDashboardPreview';
import {
  GraduationCap,
  Users,
  CheckCircle2,
  Database,
  ShieldCheck,
  Layout,
  ArrowRight,
  Quote,
  Check,
  Sparkles,
  Play,
  X,
} from 'lucide-react';

const StellarCorpPage = () => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoSuccess, setDemoSuccess] = useState(false);

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setDemoSuccess(true);
    setTimeout(() => {
      setDemoSuccess(false);
      setDemoModalOpen(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Navigation */}
      <StellarNavbar onRequestDemo={() => setDemoModalOpen(true)} />

      {/* Hero Section */}
      <section className="relative bg-[#0B192C] text-white pt-16 pb-32 lg:pb-44 px-6 overflow-hidden">
        {/* Ambient Subtle Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & Value Proposition */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Next-Gen Enterprise Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.1]">
                Empowering Growth in <span className="text-emerald-400">EdTech</span> & Recruitment
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                The complete platform for data-driven educational solutions and verified talent acquisition.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => setDemoModalOpen(true)}
                  className="px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 transition-all flex items-center justify-center gap-2"
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#solutions"
                  className="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Explore Solutions</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-white/10 flex items-center gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" /> SOC2 Type II Certified
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" /> 99.99% Uptime SLA
                </span>
              </div>
            </div>

            {/* Right Column: Hero Mockup Dashboard Embedded */}
            <div className="lg:col-span-7 relative">
              <div className="relative -mb-20 lg:-mb-32 z-20 transition-transform duration-500 hover:scale-[1.01]">
                <StellarDashboardPreview />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing bridge for dashboard overhang */}
      <div className="h-20 lg:h-28 bg-[#F8FAFC]"></div>

      {/* Core Solutions Section */}
      <section id="solutions" className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-left mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#0B192C]">Core Solutions</h2>
          <p className="text-sm text-slate-500 mt-1">Unified systems built to scale candidate matching and certified curriculum delivery.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0B192C]">EdTech Platforms</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Enables corporate EdTech platforms with accredited credentials, adaptive tests, and live performance metrics.
            </p>
            <div className="pt-2">
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0B192C]">Talent Acquisition</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Accelerates candidate placement velocity with AI screening, verified background assertions, and automated interviews.
            </p>
            <div className="pt-2">
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0B192C]">Skill Assessment</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Automated skill benchmarking ensuring every candidate possesses validated hands-on capabilities before onboarding.
            </p>
            <div className="pt-2">
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Why StellarCorp Section */}
      <section className="bg-white py-16 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-left mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#0B192C]">Why StellarCorp</h2>
            <p className="text-sm text-slate-500 mt-1">Enterprise-grade architecture built for strict compliance and verifiable outcomes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
                <Database className="w-5 h-5 text-emerald-600" />
              </div>
              <h4 className="text-base font-bold text-[#0B192C]">Data Integrity</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Immutable record synchronization across audit nodes guarantees zero discrepancy in credential assertions.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <h4 className="text-base font-bold text-[#0B192C]">Enterprise Compliance</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Compliant with GDPR, FERPA, and ISO standards with granular role-based authorization and cryptographic verification.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
                <Layout className="w-5 h-5 text-emerald-600" />
              </div>
              <h4 className="text-base font-bold text-[#0B192C]">Modern UI & DX</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Intuitive interfaces with real-time websocket updates, exportable analytics, and frictionless calendar sync.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories & Social Proof Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#0B192C]">Success Stories</h2>
          <p className="text-sm text-slate-500">Trusted by fast-growing EdTech providers and enterprise recruitment teams worldwide.</p>
        </div>

        {/* Partner Logos Bar */}
        <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16 py-6 grayscale opacity-65 hover:grayscale-0 hover:opacity-100 transition-all">
          <span className="font-extrabold text-xl tracking-tight text-slate-700">Shopify</span>
          <span className="font-extrabold text-xl tracking-tight text-slate-700">Microsoft</span>
          <span className="font-extrabold text-xl tracking-tight text-slate-700">Coursera</span>
          <span className="font-extrabold text-xl tracking-tight text-slate-700">Udemy</span>
          <span className="font-extrabold text-xl tracking-tight text-slate-700">Workday</span>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <Quote className="w-8 h-8 text-emerald-500/30" />
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "StellarCorp cut our candidate time-to-hire from 48 days down to 24 days. The automated scheduling and verified assessments are unmatched."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                alt="Sarah Jenkins"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold text-[#0B192C]">Sarah Jenkins</p>
                <p className="text-[10px] text-slate-400">Head of Talent, EdTech Global</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <Quote className="w-8 h-8 text-emerald-500/30" />
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "The executive overview dashboard gives our leadership team instant clarity into course completions and hiring velocity in a single view."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
                alt="David Chen"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold text-[#0B192C]">David Chen</p>
                <p className="text-[10px] text-slate-400">Chief Learning Officer, TechSkills</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <Quote className="w-8 h-8 text-emerald-500/30" />
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "Switching to StellarCorp was seamless. Our candidates love the self-scheduling interface and our client satisfaction rose to 94%."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
                alt="Elena Rostova"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold text-[#0B192C]">Elena Rostova</p>
                <p className="text-[10px] text-slate-400">VP Recruitment, Apex Partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-[#0B192C] text-white py-16 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading">
            Ready to Transform Your EdTech & Recruitment Pipeline?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Schedule a personalized walkthrough with our corporate consulting specialists today.
          </p>
          <button
            onClick={() => setDemoModalOpen(true)}
            className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 transition-all inline-flex items-center gap-2"
          >
            <span>Request Executive Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-600 flex items-center justify-center text-white">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-white text-sm">StellarCorp Technologies, Inc.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white">Privacy Policy</a>
            <a href="#terms" className="hover:text-white">Terms of Service</a>
            <a href="#security" className="hover:text-white">Security Architecture</a>
            <a href="/login" className="text-emerald-400 hover:text-emerald-300">Staff Portal</a>
          </div>
        </div>
      </footer>

      {/* Interactive Request Demo Modal */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setDemoModalOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 absolute top-5 right-5"
            >
              <X className="w-5 h-5" />
            </button>

            {demoSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0B192C]">Demo Scheduled!</h3>
                <p className="text-xs text-slate-500">
                  Our corporate consulting specialist will contact you with your personalized walkthrough invitation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#0B192C] font-heading">Request Executive Demo</h3>
                  <p className="text-xs text-slate-500 mt-1">See how StellarCorp fits your organization's workflow.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Institution</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. EdTech Academy"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Focus Area</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 focus:bg-white">
                    <option>Talent Acquisition & Recruiting</option>
                    <option>EdTech Learning Platforms</option>
                    <option>Both EdTech & Recruitment</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/25 transition-all"
                >
                  Schedule Demo Session
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StellarCorpPage;
