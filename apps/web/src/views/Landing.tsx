import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <>
      <style>{`
        /* Subtle background and smooth rendering */
        body {
          background-color: #F8F7F5;
          color: #07203F;
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Ambient radial glow echoing Ref 1 with Ref 2 locked Navy/Cream palette */
        .hero-canvas-glow {
          background: radial-gradient(
            ellipse 90% 70% at 75% 35%,
            rgba(245, 243, 225, 0.18) 0%,
            rgba(15, 47, 87, 0.95) 45%,
            #07203F 85%
          );
        }

        /* Fine architectural sweeping curves replicating NixtNode line vectors */
        .bezier-arc-1 {
          position: absolute;
          top: -20%;
          right: 15%;
          width: 800px;
          height: 800px;
          border: 1px solid rgba(245, 243, 225, 0.12);
          border-radius: 50%;
          pointer-events: none;
          transform: rotate(-15deg);
        }

        .bezier-arc-2 {
          position: absolute;
          top: 15%;
          right: -10%;
          width: 1050px;
          height: 1050px;
          border: 1px solid rgba(245, 243, 225, 0.08);
          border-radius: 46%;
          pointer-events: none;
        }

        .bezier-arc-3 {
          position: absolute;
          bottom: -15%;
          left: 10%;
          width: 700px;
          height: 700px;
          border: 1px solid rgba(245, 243, 225, 0.07);
          border-radius: 50%;
          pointer-events: none;
        }

        /* Atomic orbit icon for headline */
        .orbit-ring {
          animation: spin 14s linear infinite;
        }
        @keyframes spin {
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <div className="selection:bg-brand-secondary selection:text-brand-primary min-h-screen">
        {/* BEGIN: Outer Meta Header */}
        <aside className="max-w-7xl mx-auto px-6 pt-5 pb-3 hidden md:flex items-center justify-between text-xs tracking-wider uppercase text-brand-tertiary font-medium">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block animate-pulse"></span>
              <span className="text-brand-primary font-semibold tracking-normal lowercase">placeintel.edu</span>
            </span>
            <span className="text-brand-tertiary">|</span>
            <span className="text-brand-tertiary">|</span>
          </div>
          <div className="flex items-center space-x-5">
            <a className="hover:text-brand-primary transition-colors" href="#tpo-contact"><br/></a>
          </div>
        </aside>
        {/* END: Outer Meta Header */}

        {/* BEGIN: Primary Hero Frame Container */}
        <main className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 pb-16">
          <section className="relative overflow-hidden hero-canvas-glow rounded-[32px] sm:rounded-[44px] border border-brand-primary/20 text-brand-secondary shadow-[0_30px_90px_-20px_rgba(7,32,63,0.35)] pt-7 sm:pt-9 pb-12 sm:pb-16 px-6 sm:px-12 lg:px-16">
            {/* Atmospheric Arc Overlays matching Reference 1 */}
            <div className="bezier-arc-1"></div>
            <div className="bezier-arc-2"></div>
            <div className="bezier-arc-3"></div>
            {/* BEGIN: Hero Navigation */}
            <nav className="relative z-20 flex items-center justify-between border-b border-brand-secondary/10 pb-6 mb-12 lg:mb-16">
              {/* Logo / Brand Identifier */}
              <a className="flex items-center space-x-2 group" href="#">
                <div className="w-8 h-8 rounded-lg bg-brand-secondary flex items-center justify-center text-brand-primary font-bold text-sm">PI</div>
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-brand-secondary transition-colors">PlaceIntel</span>
              </a>
              
              {/* Right Side Nav Button */}
              <div className="flex items-center space-x-4">
                <Link className="text-[11px] font-semibold tracking-[0.12em] uppercase px-5 py-2.5 rounded-full border border-brand-secondary/25 text-brand-secondary hover:bg-brand-secondary hover:text-brand-primary transition-all duration-300 z-50 relative" to="/login">
                  ENTER WORKSPACE
                </Link>
              </div>
            </nav>
            {/* END: Hero Navigation */}
            
            {/* BEGIN: Hero Core Grid (Headline + Editorial Narrative) */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-2 sm:pt-4">
              {/* Left: Bold Monumental Display Typography */}
              <div className="lg:col-span-7 xl:col-span-8">
                <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-brand-secondary/60 mb-4 sm:mb-6">
                  <span className="text-brand-secondary font-bold">{"}"}</span>
                  <span className="">NEXT-GEN CAMPUS RECRUITMENT DECISION ENGINE</span>
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold tracking-tight text-white leading-[1.04]">
                  <span className="block text-brand-secondary/90 font-mono font-medium text-3xl sm:text-5xl lg:text-6xl mb-1">{"}"}&nbsp;PlaceIntel</span>
                  <span className="block">Is Your Premier</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-secondary to-brand-secondary/80">Placement</span>
                  <span className="block">Provider</span>
                </h1>
              </div>
              
              {/* Right: Editorial Narrative + Pill CTA (Ref 1 rhythm) */}
              <div className="lg:col-span-5 xl:col-span-4 lg:pt-8 flex flex-col justify-between h-full space-y-8">
                <div className="space-y-4">
                  <p className="text-sm sm:text-base font-normal leading-relaxed max-w-md text-brand-secondary">
                    <span className="font-mono text-brand-secondary font-semibold">{"}"}&nbsp;</span>
                    Renowned for engineering the decision backbone of tier-1 institutional recruitment with verified TPO circulars, deterministic eligibility clearance &amp; predictive AI cohort analysis.
                  </p>
                </div>
                <div>
                  <a className="inline-flex items-center justify-center px-9 py-4 rounded-full bg-[#041326]/90 hover:bg-brand-secondary hover:text-brand-primary text-brand-secondary border border-brand-secondary/30 text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300 shadow-xl group z-50 relative" href="#services">
                    <span className="">GET IN TOUCH</span>
                    <svg className="w-4 h-4 ml-2.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            {/* END: Hero Core Grid */}
            
            {/* BEGIN: Hero Interactive Metric Cards (Matching Bottom of Ref 1) */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5 mt-16 sm:mt-24 pt-6">
              {/* Metric Card 1: Assets / Scale under Intelligence */}
              <div className="md:col-span-5 bg-[#041326]/95 border border-white/10 rounded-[24px] sm:rounded-[28px] p-7 sm:p-9 shadow-2xl relative overflow-hidden group hover:border-brand-secondary/30 transition-all">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-brand-tertiary mb-3">
                  <span className="">METRIC // INFRASTRUCTURE</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-5xl sm:text-6xl font-bold tracking-tight text-white font-sans">1</span>
                  <span className="text-3xl sm:text-4xl font-light text-brand-secondary font-mono">k+</span>
                </div>
                <p className="text-xs sm:text-sm text-brand-secondary/70 mt-2 font-medium">Verified student qualification audits &amp; continuous eligibility evaluations</p>
                {/* Circuit Hairline Node connector echoing Ref 1 */}
                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-brand-tertiary">
                  <span className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-brand-secondary/60 rounded-full"></span>
                    <span className="">100% Policy Grounded</span>
                  </span>
                  <span className="text-brand-secondary/50">LATEST DRIVE SYNC</span>
                </div>
              </div>
              
              {/* Metric Card 2: Cohort Match Rate + Verified Candidate Avatar Cluster */}
              <div className="md:col-span-4 bg-[#041326]/95 border border-white/10 rounded-[24px] sm:rounded-[28px] p-7 sm:p-9 shadow-2xl relative overflow-hidden group hover:border-brand-secondary/30 transition-all">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-brand-tertiary mb-3">
                  <span className="">PERFORMANCE // COHORT</span>
                  <span className="w-2 h-2 rounded-full bg-brand-secondary/80"></span>
                </div>
                <div className="flex items-baseline space-x-1">
                  <span className="text-5xl sm:text-6xl font-bold tracking-tight text-brand-secondary font-sans">34</span>
                  <span className="text-2xl text-brand-secondary/60 font-mono">LPA</span>
                </div>
                <p className="text-xs sm:text-sm text-brand-secondary/70 mt-2 font-medium">Average verified CTC tier for core intelligence cohorts</p>
                {/* Avatar Strip */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center -space-x-2.5 overflow-hidden">
                    <img alt="Verified Student Candidate" className="inline-block h-10 w-10 rounded-full ring-2 ring-[#041326] object-cover shadow-sm" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" />
                    <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-brand-primary ring-2 ring-brand-surface text-brand-secondary text-xs font-bold font-mono">
                      C#
                    </div>
                    <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-brand-secondary text-brand-primary ring-2 ring-brand-surface text-xs font-bold font-mono">
                      AI
                    </div>
                    <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#102a4e] text-white ring-2 ring-brand-surface text-xs font-bold font-mono">
                      99%
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-brand-tertiary tracking-wider">OFFER CLEARED</span>
                </div>
              </div>
            </div>
            {/* END: Hero Interactive Metric Cards */}
          </section>
        </main>
        {/* END: Primary Hero Frame Container */}

        {/* BEGIN: Strategic Recruiter Marquee / Trust Bar */}
        <section className="max-w-7xl mx-auto px-6 py-6 border-y border-[#07203F]/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-xs uppercase font-mono tracking-widest text-brand-tertiary whitespace-nowrap">
              Integrated Across Placement Units:
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-8 sm:gap-12 opacity-80 text-brand-primary font-mono text-sm tracking-wider font-semibold">
              <span className="hover:text-brand-tertiary transition-colors">DE SHAW &amp; CO</span>
              <span className="hover:text-brand-tertiary transition-colors">MICROSOFT IDC</span>
              <span className="hover:text-brand-tertiary transition-colors">CRED LABS</span>
              <span className="hover:text-brand-tertiary transition-colors">GOLDMAN SACHS</span>
              <span className="hover:text-brand-tertiary transition-colors">CREST DATA SYSTEMS</span>
              <span className="hover:text-brand-tertiary transition-colors">SPRINKLR</span>
            </div>
          </div>
        </section>
        {/* END: Strategic Recruiter Marquee */}

        {/* BEGIN: Live Drives Grid Section (Services / Drives Architecture) */}
        <section className="max-w-7xl mx-auto px-6 py-20" id="drives">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-brand-tertiary mb-2">
                LIVE DIRECTORY // PHASE 1
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-primary">
                Verified Active Recruitment Drives
              </h2>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium bg-brand-primary text-brand-secondary">
                24 OPEN OPPORTUNITIES
              </span>
              <span className="text-xs text-brand-tertiary font-medium">Updated 14 mins ago via TPO feeds</span>
            </div>
          </div>
          {/* Drive Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Drive Card 1 */}
            <article className="bg-white rounded-[24px] p-7 border border-[#07203F]/10 hover:border-brand-primary/40 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase px-2.5 py-1 rounded-md bg-brand-secondary/60 text-brand-primary font-semibold">Tier-1 Marquee</span>
                  <span className="text-xs font-mono text-emerald-600 font-medium">● Closes in 48h</span>
                </div>
                <h3 className="text-xl font-bold text-brand-primary">Systems Architect Intern &amp; FTE</h3>
                <p className="text-sm font-medium text-brand-tertiary mt-1">Crest Data Systems • Enterprise Cloud</p>
                <div className="mt-6 pt-5 border-t border-gray-100 space-y-2 text-xs">
                  <div className="flex justify-between py-1">
                    <span className="text-brand-tertiary">Disaggregated CTC</span>
                    <span className="font-mono font-bold text-brand-primary">₹32.5 LPA (₹24L Base)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-brand-tertiary">CGPA Cutoff</span>
                    <span className="font-mono font-medium text-brand-primary">≥ 8.00 (No Backlogs)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-brand-tertiary">PlaceIntel Match Fit</span>
                    <span className="font-mono font-bold text-emerald-600">97.4% High Affinity</span>
                  </div>
                </div>
              </div>
              <div className="mt-7 pt-4">
                <Link className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl bg-brand-primary text-brand-secondary text-xs font-semibold tracking-wider uppercase hover:bg-brand-primary/90 transition-colors" to="/login">
                  Check Deterministic Clearance
                </Link>
              </div>
            </article>

            {/* Drive Card 2 */}
            <article className="bg-white rounded-[24px] p-7 border border-[#07203F]/10 hover:border-brand-primary/40 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase px-2.5 py-1 rounded-md bg-brand-secondary/60 text-brand-primary font-semibold">Super Dream</span>
                  <span className="text-xs font-mono text-emerald-600 font-medium">● Round 1 Next Mon</span>
                </div>
                <h3 className="text-xl font-bold text-brand-primary">Quantitative Strategist</h3>
                <p className="text-sm font-medium text-brand-tertiary mt-1">AlphaGrip Trading • Bangalore / Mumbai</p>
                <div className="mt-6 pt-5 border-t border-gray-100 space-y-2 text-xs">
                  <div className="flex justify-between py-1">
                    <span className="text-brand-tertiary">Disaggregated CTC</span>
                    <span className="font-mono font-bold text-brand-primary">₹48.0 LPA (₹36L Base)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-brand-tertiary">Eligible Branches</span>
                    <span className="font-mono font-medium text-brand-primary">CSE, ECE, Mathematics</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-brand-tertiary">PlaceIntel Match Fit</span>
                    <span className="font-mono font-bold text-emerald-600">94.1% High Affinity</span>
                  </div>
                </div>
              </div>
              <div className="mt-7 pt-4">
                <Link className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl bg-brand-primary text-brand-secondary text-xs font-semibold tracking-wider uppercase hover:bg-brand-primary/90 transition-colors" to="/login">
                  Check Deterministic Clearance
                </Link>
              </div>
            </article>

            {/* Drive Card 3 */}
            <article className="bg-white rounded-[24px] p-7 border border-[#07203F]/10 hover:border-brand-primary/40 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase px-2.5 py-1 rounded-md bg-brand-secondary/60 text-brand-primary font-semibold">Global Core</span>
                  <span className="text-xs font-mono text-amber-600 font-medium">● PPT Tomorrow 6 PM</span>
                </div>
                <h3 className="text-xl font-bold text-brand-primary">Research &amp; Kernel Engineer</h3>
                <p className="text-sm font-medium text-brand-tertiary mt-1">Apex Networks • Systems Lab</p>
                <div className="mt-6 pt-5 border-t border-gray-100 space-y-2 text-xs">
                  <div className="flex justify-between py-1">
                    <span className="text-brand-tertiary">Disaggregated CTC</span>
                    <span className="font-mono font-bold text-brand-primary">₹28.0 LPA + RSUs</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-brand-tertiary">CGPA Cutoff</span>
                    <span className="font-mono font-medium text-brand-primary">≥ 7.50 All Depts</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-brand-tertiary">PlaceIntel Match Fit</span>
                    <span className="font-mono font-bold text-emerald-600">91.8% High Affinity</span>
                  </div>
                </div>
              </div>
              <div className="mt-7 pt-4">
                <Link className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl bg-brand-primary text-brand-secondary text-xs font-semibold tracking-wider uppercase hover:bg-brand-primary/90 transition-colors" to="/login">
                  Check Deterministic Clearance
                </Link>
              </div>
            </article>
          </div>
        </section>
        {/* END: Live Drives Grid Section */}

        {/* BEGIN: Three Pillars / Intelligence Engine */}
        <section className="bg-brand-secondary/35 py-24 border-y border-[#07203F]/10" id="services">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-tertiary">
                CORE PLATFORM CAPABILITIES
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-primary mt-2">
                Engineered to eliminate ambiguity from placement governance.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pillar 1 */}
              <div className="bg-white/80 backdrop-blur-sm rounded-[24px] p-8 border border-[#07203F]/10">
                <div className="w-12 h-12 rounded-xl bg-brand-primary text-brand-secondary flex items-center justify-center font-mono font-bold text-lg mb-6">
                  01
                </div>
                <h3 className="text-xl font-bold text-brand-primary mb-3">Deterministic Eligibility Verification</h3>
                <p className="text-sm text-brand-tertiary leading-relaxed">
                  Eliminates inaccurate registrations by executing multi-tier checks across CGPA thresholds, past backlog policies, branch clearance, and dual-offer quota limits before applications are locked.
                </p>
              </div>
              {/* Pillar 2 */}
              <div className="bg-white/80 backdrop-blur-sm rounded-[24px] p-8 border border-[#07203F]/10">
                <div className="w-12 h-12 rounded-xl bg-brand-primary text-brand-secondary flex items-center justify-center font-mono font-bold text-lg mb-6">
                  02
                </div>
                <h3 className="text-xl font-bold text-brand-primary mb-3">TPO Circular Grounding</h3>
                <p className="text-sm text-brand-tertiary leading-relaxed">
                  AI responses and fit algorithms are strictly grounded in your institute's authoritative placement handbook and real-time addendums, avoiding halluncinated advice or outdated stipulations.
                </p>
              </div>
              {/* Pillar 3 */}
              <div className="bg-white/80 backdrop-blur-sm rounded-[24px] p-8 border border-[#07203F]/10">
                <div className="w-12 h-12 rounded-xl bg-brand-primary text-brand-secondary flex items-center justify-center font-mono font-bold text-lg mb-6">
                  03
                </div>
                <h3 className="text-xl font-bold text-brand-primary mb-3">Cadre CTC Disaggregation</h3>
                <p className="text-sm text-brand-tertiary leading-relaxed">
                  Transparently unbundles gross package figures into guaranteed fixed base pay, multi-year vesting equity, joining incentives, and variable retention bonuses for true offer valuation.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* END: Three Pillars / Intelligence Engine */}

        {/* BEGIN: AI Co-Pilot Console Interactive Section */}
        <section className="max-w-7xl mx-auto px-6 py-24" id="copilot">
          <div className="bg-brand-primary rounded-[32px] p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl">
            {/* Background Ambient Glow inside Card */}
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-brand-secondary/80">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="">NATURAL LANGUAGE QUERY INTERFACE</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  Ask any question regarding your campus placement rules.
                </h2>
                <p className="text-sm text-brand-secondary/75 leading-relaxed">
                  Trained exclusively on official institute placement guidelines, JNF parameters, and historical cohort cutoffs. Instant, verifiable, non-hallucinatory clarity.
                </p>
                {/* Query Suggestion Pills */}
                <div className="pt-4 flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer transition-colors text-brand-secondary">
                    "Am I eligible for Dream tier if holding an IT offer?"
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer transition-colors text-brand-secondary">
                    "What is the base pay for Crest Data Systems?"
                  </span>
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="bg-[#041326] border border-white/15 rounded-2xl p-6 shadow-inner space-y-4 relative z-10">
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono text-brand-secondary/60">
                    <span className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block"></span>
                    </span>
                    <span className="">COPILOT // AUDIT-MODE</span>
                  </div>
                  {/* Terminal Conversation */}
                  <div className="space-y-3 font-mono text-xs">
                    <div className="text-brand-secondary/90 bg-white/5 p-3 rounded-lg border border-white/5">
                      <span className="text-brand-tertiary">query &gt;</span> Does my 8.14 CGPA with 1 past cleared backlog permit applying for Goldman Sachs Operations?
                    </div>
                    <div className="p-3.5 rounded-lg bg-[#0a1e38] border border-emerald-500/20 text-brand-secondary/90 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-emerald-400">
                        <span className="">✓ DETERMINISTIC CHECK: ELIGIBLE</span>
                        <span className="text-white/40">Circular #2026-B4</span>
                      </div>
                      <p className="text-[12px] leading-relaxed font-sans text-brand-secondary/90">
                        Yes. Under <strong>Circular 2026-B4</strong> (Clause 4.2), Goldman Sachs allows cleared historical arrears provided no active backlogs exist at the time of shortlisting and cumulative CGPA exceeds 8.00.
                      </p>
                    </div>
                  </div>
                  {/* Query Input Bar */}
                  <div className="pt-2">
                    <div className="relative flex items-center">
                      <input className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder-brand-secondary/40 focus:outline-none focus:border-brand-secondary font-mono" placeholder="Enter placement guideline query..." type="text" />
                      <button className="absolute right-2 px-3 py-1.5 rounded-lg bg-brand-secondary text-brand-primary text-xs font-mono font-bold hover:bg-white transition-colors">
                        ASK
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* END: AI Co-Pilot Console Interactive Section */}

        {/* BEGIN: Candidate Profile Featurette with Verified Image */}
        <section className="max-w-7xl mx-auto px-6 py-12 mb-16">
          <div className="bg-white rounded-[32px] border border-[#07203F]/10 p-8 sm:p-12 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Student Editorial Portrait Image */}
            <div className="md:col-span-5 relative">
              <div className="relative overflow-hidden rounded-2xl shadow-lg border border-[#07203F]/10 aspect-[4/3]">
                <img alt="Contemporary engineering student focused on laptop" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" />
                <div className="absolute bottom-3 left-3 bg-brand-primary/90 text-brand-secondary px-3 py-1 rounded-md text-[11px] font-mono tracking-wider backdrop-blur-md">
                  VERIFIED COHORT CANDIDATE
                </div>
              </div>
            </div>
            {/* Descriptive Information */}
            <div className="md:col-span-7 space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-brand-tertiary">
                STUDENT WORKSPACE EXPERIENCE
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-primary">
                Calm clarity instead of last-minute placement panic.
              </h3>
              <p className="text-sm text-brand-tertiary leading-relaxed">
                PlaceIntel provides candidates with an individual clearance dashboard. Track your specific eligible tier, monitor upcoming PPT schedules without missed Telegram circulars, and receive automated warnings if duplicate company submissions violate campus placement rules.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <div className="text-2xl font-bold text-brand-primary font-mono">0</div>
                  <div className="text-xs text-brand-tertiary">Missed Deadlines</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-brand-primary font-mono">100%</div>
                  <div className="text-xs text-brand-tertiary">Policy Compliance</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-brand-primary font-mono">4.2x</div>
                  <div className="text-xs text-brand-tertiary">Faster Clearances</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* END: Candidate Profile Featurette */}

        {/* BEGIN: Site Footer */}
        <footer className="border-t border-[#07203F]/10 bg-[#F8F7F5] pt-16 pb-12" id="tpo-contact">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#07203F]/10">
              {/* Brand column */}
              <div className="md:col-span-5 space-y-4">
                <a className="flex items-center space-x-2" href="#">
                  <span className="font-mono text-brand-primary text-xl font-bold">{"}"}&nbsp;PlaceIntel</span>
                </a>
                <p className="text-sm text-brand-tertiary max-w-sm leading-relaxed">
                  The authoritative placement intelligence platform for leading engineering institutes, universities, and prospective recruitment partners.
                </p>
                <div className="text-xs font-mono text-brand-tertiary">
                  STRICTLY GROUNDED IN ACCREDITED TPO CIRCULARS
                </div>
              </div>
              {/* Links Columns */}
              <div className="md:col-span-2 space-y-3">
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-primary">Navigation</div>
                <ul className="text-xs space-y-2.5 text-brand-tertiary">
                  <li className=""><a className="hover:text-brand-primary transition-colors" href="#services">Services ⁷</a></li>
                  <li className=""><a className="hover:text-brand-primary transition-colors" href="#drives">Drives ²⁴</a></li>
                  <li className=""><a className="hover:text-brand-primary transition-colors" href="#copilot">AI Co-pilot ³⁵</a></li>
                  <li className=""><a className="hover:text-brand-primary transition-colors" href="#policy">Policy Archive</a></li>
                </ul>
              </div>
              <div className="md:col-span-2 space-y-3">
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-primary">Governance</div>
                <ul className="text-xs space-y-2.5 text-brand-tertiary">
                  <li className=""><a className="hover:text-brand-primary transition-colors" href="#">TPO Bylaws</a></li>
                  <li className=""><a className="hover:text-brand-primary transition-colors" href="#">Dual Offer Cap</a></li>
                  <li className=""><a className="hover:text-brand-primary transition-colors" href="#">Dream Tier Rules</a></li>
                  <li className=""><a className="hover:text-brand-primary transition-colors" href="#">Audit Integrity</a></li>
                </ul>
              </div>
              <div className="md:col-span-3 space-y-3">
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-primary">Institutional Access</div>
                <p className="text-xs text-brand-tertiary">
                  Connect institutional credentials or contact the training &amp; placement cell administrator.
                </p>
                <div className="pt-1">
                  <a className="inline-block text-xs font-mono text-brand-primary font-semibold underline underline-offset-4 hover:opacity-80" href="mailto:admin@placeintel.edu">
                    admin@placeintel.edu
                  </a>
                </div>
              </div>
            </div>
            {/* Copyright & Bottom Meta */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-tertiary font-mono">
              <div className="">
                © 2026 PlaceIntel Platform. Engineered for tier-1 campus placements.
              </div>
              <div className="flex items-center space-x-6 mt-4 sm:mt-0">
                <a className="hover:text-brand-primary transition-colors" href="#">Privacy Policy</a>
                <a className="hover:text-brand-primary transition-colors" href="#">Institutional Terms</a>
                <a className="hover:text-brand-primary transition-colors" href="#">Security Audit</a>
              </div>
            </div>
          </div>
        </footer>
        {/* END: Site Footer */}
      </div>
    </>
  );
}
