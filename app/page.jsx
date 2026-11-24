'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import TimelineSection from '@/components/TimelineSection';

function AnimatedStatNumber({ value, shouldAnimate, duration = 1800 }) {
  const numericTarget = parseInt(value, 10);
  const [currentVal, setCurrentVal] = useState(0);

  useEffect(() => {
    if (!shouldAnimate || isNaN(numericTarget)) {
      setCurrentVal(numericTarget || value);
      return;
    }

    let start = null;
    let animId;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCurrentVal(Math.round(ease * numericTarget));

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [numericTarget, value, shouldAnimate, duration]);

  return <>{currentVal}</>;
}

// ============================================================================
// DATA DEFINITIONS & COLOR PALETTES
// ============================================================================

// 1. Twelve Years, in Numbers
const numbersData = [
  {
    letter: 'A',
    code: 'A1',
    category: 'PROJECTS',
    value: '240',
    symbol: '+',
    symbolType: 'plus',
    label: 'Websites shipped',
    bar: '75%',
  },
  {
    letter: 'B',
    code: 'B1',
    category: 'TIME',
    value: '12',
    symbol: 'y',
    symbolType: 'italic-y',
    label: 'Years in practice',
    bar: '48%',
  },
  {
    letter: 'C',
    code: 'C1',
    category: 'REACH',
    value: '38',
    symbol: '',
    symbolType: 'none',
    label: 'Countries served',
    bar: '62%',
  },
  {
    letter: 'D',
    code: 'D1',
    category: 'LOYALTY',
    value: '98',
    symbol: '%',
    symbolType: 'percent',
    label: 'Clients who return',
    bar: '98%',
  },
];

// 2. Six Crafts, One Studio (Exact 1:1 Spec from Reference)
const craftsData = [
  {
    id: 'sv-1',
    num: '01',
    title: 'Web design',
    tag: '01 — UX · UI · ART DIRECTION',
    desc: 'Interfaces with a point of view — structure first, then the details nobody else notices.',
    features: ['Research & UX', 'Art direction', 'UI design system', 'Prototypes'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'sv-2',
    num: '02',
    title: 'Development',
    tag: '02 — FRONT-END · CMS · APIS',
    desc: 'Hand-written, fast, accessible code. WordPress, headless or fully custom.',
    features: ['Front-end build', 'CMS setup', 'Integrations', 'Performance'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'sv-3',
    num: '03',
    title: 'E-commerce',
    tag: '03 — SHOPIFY · WOOCOMMERCE',
    desc: 'Stores that feel like a brand, not a template — and convert like one.',
    features: ['Store design', 'Checkout UX', 'Payments', 'Product data'],
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'sv-4',
    num: '04',
    title: 'Branding',
    tag: '04 — IDENTITY · TYPE · VOICE',
    desc: 'Logos, type systems and tone that hold up from favicon to billboard.',
    features: ['Logo & mark', 'Type system', 'Brand voice', 'Guidelines'],
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'sv-5',
    num: '05',
    title: 'Motion',
    tag: '05 — INTERACTION · 3D · VIDEO',
    desc: 'Movement with purpose: transitions, micro-interactions and product films.',
    features: ['Micro-interactions', 'Page transitions', '3D scenes', 'Product film'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'sv-6',
    num: '06',
    title: 'Support',
    tag: '06 — HOSTING · SEO · GROWTH',
    desc: 'We stay after launch — updates, performance and steady improvement.',
    features: ['Hosting', 'Updates', 'SEO', 'Monthly reports'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  },
];

// 3. Selected Work Projects
const workProjects = [
  {
    id: 'p1',
    coord: 'A1',
    year: '2026',
    name: 'Northwind Atelier',
    category: 'E-COMMERCE',
    tag: 'ecom',
    metric: '',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p2',
    coord: 'B1',
    year: '2026',
    name: 'Halden Coffee',
    category: 'BRAND + WEB',
    tag: 'brand',
    metric: '×3',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p3',
    coord: 'C1',
    year: '2025',
    name: 'Oslo Type Foundry',
    category: 'WEB',
    tag: 'web',
    metric: '0.7s',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p4',
    coord: 'D1',
    year: '2025',
    name: 'Mira Architects',
    category: 'WEB',
    tag: 'web',
    metric: '+64%',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p5',
    coord: 'A2',
    year: '2025',
    name: 'Kova Skincare',
    category: 'E-COMMERCE',
    tag: 'ecom',
    metric: '4.8%',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p6',
    coord: 'B2',
    year: '2024',
    name: 'Field Notes Radio',
    category: 'BRAND + WEB',
    tag: 'brand',
    metric: '120k',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p7',
    coord: 'C2',
    year: '2024',
    name: 'Lumen Studio',
    category: 'WEB',
    tag: 'web',
    metric: '98',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p8',
    coord: 'D2',
    year: '2024',
    name: 'Atlas Bikes',
    category: 'E-COMMERCE',
    tag: 'ecom',
    metric: '',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
  },
];

// 4. Testimonials
const reviewsData = [
  {
    quote: '"Creative Hub transformed our entire web presence into a museum-grade experience."',
    author: 'Elena Rostova — Vondur Art',
    cls: 'tile-teal',
  },
  {
    quote: '"Delivered on time, under budget, and beyond what we envisioned."',
    author: 'Julian Vance — Atelier Noir',
    cls: 'tile-mauve',
  },
  {
    quote: '"The 12-week roadmap was followed to the exact day. Unbelievable precision."',
    author: 'Claire Chen — Sora Audio',
    cls: 'tile-ochre',
  },
  {
    quote: '"Our conversion jumped 42% in the first two weeks following the rebrand."',
    author: 'Marcus Brody — Terracotta Co.',
    cls: 'tile-coral',
  },
  {
    quote: '"A rare team that understands both high-fashion aesthetics and technical scale."',
    author: 'Sophie Lindholm — Nordic Minimal',
    cls: 'tile-indigo',
  },
  {
    quote: '"Hands down the smoothest design agency collaboration we\'ve ever experienced."',
    author: 'David Miller — TEA Publishing',
    cls: 'tile-sage',
  },
];

// 5. Months
const monthsData = [
  { name: 'November', badge: '1 Slot Left' },
  { name: 'December', badge: 'Booking Open' },
  { name: 'January', badge: 'Booking Open' },
  { name: 'February', badge: '3 Slots Open' },
  { name: 'March', badge: 'Booking Open' },
  { name: 'April', badge: 'Inquire' },
];

export default function HomePage() {
  // Client States
  const [activeNumber, setActiveNumber] = useState(0);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const statsSectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsAnimated(true);
        }
      },
      { threshold: 0.15 }
    );

    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const [activeCraft, setActiveCraft] = useState('sv-1');
  const [isCraftHovered, setIsCraftHovered] = useState(false);

  // Auto-advance crafts when not hovering
  useEffect(() => {
    if (isCraftHovered) return;
    const interval = setInterval(() => {
      setActiveCraft((curr) => {
        const idx = craftsData.findIndex((c) => c.id === curr);
        const next = (idx + 1) % craftsData.length;
        return craftsData[next].id;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isCraftHovered]);
  const [activeWorkFilter, setActiveWorkFilter] = useState('all');
  const [hoveredWorkId, setHoveredWorkId] = useState(null);
  const gridContainerRef = useRef(null);
  const [crosshairPos, setCrosshairPos] = useState({ x: -1000, y: -1000, visible: false });
  const [coordDisplay, setCoordDisplay] = useState({ xStr: '0000', yStr: '0000' });

  const handleWorkMouseMove = useCallback((e) => {
    if (!gridContainerRef.current) return;
    const rect = gridContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      setCrosshairPos({ x, y, visible: true });
      const xPixel = Math.round(e.clientX).toString().padStart(4, '0');
      const yPixel = Math.round(e.clientY).toString().padStart(4, '0');
      setCoordDisplay({ xStr: xPixel, yStr: yPixel });
    }
  }, []);

  const handleWorkMouseLeave = useCallback(() => {
    setCrosshairPos((prev) => ({ ...prev, visible: false }));
    setHoveredWorkId(null);
  }, []);

  const [budgetVal, setBudgetVal] = useState(18);
  const [selectedMonth, setSelectedMonth] = useState('November');
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  // Filtered Projects
  const filteredWork = activeWorkFilter === 'all'
    ? workProjects
    : workProjects.filter((p) => p.tag === activeWorkFilter);

  // Budget calculations
  let timeline = '8 - 12 Weeks';
  let deliverables = 'Full Studio Site & Design System';
  let team = 'Art Director, UI/UX, Full-stack Dev';
  let support = '60 Days + Handover Workshops';
  let tierName = 'Studio Core';

  if (budgetVal <= 10) {
    timeline = '4 - 6 Weeks';
    deliverables = 'Landing Page + Brand Starter';
    team = '1 Lead Designer, 1 Frontend Dev';
    support = '30 Days Post-Launch Support';
    tierName = 'Starter';
  } else if (budgetVal <= 20) {
    timeline = '8 - 12 Weeks';
    deliverables = 'Full Studio Site & Design System';
    team = 'Art Director, UI/UX, Full-stack Dev';
    support = '60 Days + Handover Workshops';
    tierName = 'Growth';
  } else if (budgetVal <= 30) {
    timeline = '12 - 16 Weeks';
    deliverables = 'Bespoke Web Platform + 3D / Motion';
    team = 'Dedicated Creative Pod & Tech Lead';
    support = '90 Days SLA Guarantee';
    tierName = 'Studio Core';
  } else {
    timeline = '16+ Weeks';
    deliverables = 'Enterprise Multi-Brand Platform';
    team = 'Full Cross-Functional Agency Squad';
    support = '6 Months VIP Priority SLA';
    tierName = 'Enterprise';
  }

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 4000);
      setEmail('');
    }
  };

  return (
    <div className="home-wrapper">
      {/* ===================================================================
          1. HEADER & HERO WITH STUDIO DESK FLAT-LAY
          =================================================================== */}
      <header className="hd hd--studio">
        <div className="container">
          <nav className="site-nav-bar">
            <div className="nav-logo">
              <a href="#">Graphite<span style={{ color: 'var(--accent-gold)' }}>.</span></a>
            </div>

            <div className="nav-links-center">
              <a href="#services" className="nav-link">Crafts</a>
              <a href="#work" className="nav-link">Selected Work</a>
              <a href="#timeline" className="nav-link">Process</a>
              <a href="#guarantees" className="nav-link">Promises</a>
              <a href="#pricing" className="nav-link">Estimator</a>
              <a href="#testimonials" className="nav-link">Words</a>
            </div>

            <div className="nav-actions">
              <span className="nav-meta-badge">( NYC · EST. 2012 )</span>
              <a href="#contact" className="nav-contact-btn">
                Contact
              </a>
            </div>
          </nav>
        </div>

        {/* Ambient Flat-Lay Studio Desk Canvas */}
        <div className="desk-canvas" aria-hidden="true">
          <div className="item-green-book" />
          <div className="item-open-book" />
          <div className="item-coffee" />
          <div className="item-pencil" />
          <div className="item-glasses">
            <div className="glass-rim" />
            <div className="glass-bridge" />
            <div className="glass-rim" />
          </div>
          <div className="item-journal" />
          <div className="item-tablet">
            <div className="tablet-screen" />
          </div>
          <div className="item-small-pad" />
          <div className="item-pen-gold" />
          <div className="item-mouse" />
        </div>

        {/* Hero Title & Tagline */}
        <div className="hero-content">
          <div className="mono hd-meta-tags">
            <span>( WEB STUDIO )</span>
            <span>·</span>
            <span>NEW YORK</span>
            <span>·</span>
            <span>EST. 2012</span>
          </div>

          <h1 className="hero-title">
            Graphite<span style={{ color: 'var(--accent-gold)' }}>.</span>
          </h1>

          <p className="hero-tagline">
            Calm websites, <span className="italic">sharply made in color.</span>
          </p>

          <div style={{ marginTop: '1.25rem' }}>
            <a href="#work" className="hero-cta-btn">
              View selected work →
            </a>
          </div>
        </div>

        {/* Stylized Laptop Display Mockup */}
        <div className="hero-laptop" aria-hidden="true">
          <div className="laptop-screen-frame">
            <div className="laptop-display" />
          </div>
          <div className="laptop-base">
            <div className="laptop-notch" />
          </div>
        </div>
      </header>

      <main>
        {/* =================================================================
            2. SECTION: TWELVE YEARS, IN NUMBERS (COLORFUL HOVER INVERSION)
            ================================================================= */}
        <section className="sec nm alignfull" id="numbers" aria-labelledby="nm-title-2" ref={statsSectionRef}>
          <div className="container">
            <div className="nm__head">
              <h2 className="nm-exact-title" id="nm-title-2">
                Twelve years, <span className="italic">in numbers.</span>
              </h2>
            </div>

            {/* Architectural Ruler Bar with Coordinate Letters and Precise Ticks */}
            <div className="arch-ruler-track" aria-hidden="true">
              <div className="arch-ruler-labels">
                <span className="ruler-axis-letter">A</span>
                <span className="ruler-axis-letter">B</span>
                <span className="ruler-axis-letter">C</span>
                <span className="ruler-axis-letter">D</span>
              </div>
              <div className="arch-ruler-line">
                <div className="arch-ruler-ticks" />
              </div>
            </div>

            {/* 4 Architectural Columns Box with Exact Spec Match & Soft Hover */}
            <div className="arch-stats-box">
              {numbersData.map((item, index) => {
                const isActive = activeNumber === index;
                return (
                  <div
                    key={item.code}
                    className={`arch-col ${isActive ? 'is-active' : ''}`}
                    onMouseEnter={() => setActiveNumber(index)}
                    onFocus={() => setActiveNumber(index)}
                    tabIndex={0}
                  >
                    {/* Top Row: Coordinates & Category */}
                    <div className="arch-col-top">
                      <span className="arch-col-coord">{item.code}</span>
                      <span className="arch-col-cat">{item.category}</span>
                    </div>

                    {/* Middle: Giant Stat & Underline Progress Track */}
                    <div className="arch-col-middle">
                      <div className="arch-col-val">
                        <span className="val-digits">
                          <AnimatedStatNumber value={item.value} shouldAnimate={statsAnimated} />
                        </span>
                        {item.symbol && (
                          <span className={`val-sym val-sym--${item.symbolType}`}>
                            {item.symbol}
                          </span>
                        )}
                      </div>

                      <div className="nm-track-bar" aria-hidden="true">
                        <div
                          className="nm-track-fill"
                          style={{ width: statsAnimated ? item.bar : '0%' }}
                        />
                      </div>
                    </div>

                    {/* Bottom: Descriptor Label */}
                    <div className="arch-col-bottom">
                      <span className="arch-col-desc">{item.label}</span>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>
        </section>

        {/* =================================================================
            3. SECTION: SIX CRAFTS, ONE STUDIO (1:1 ULTRA-SMOOTH & EXPANSIVE)
            ================================================================= */}
        <section className="sec sv alignfull" id="services" aria-labelledby="sv-3-title">
          <div className="container">
            <div className="sv__head">
              <h2 className="nm-exact-title" id="sv-3-title">
                Six crafts. <span className="italic">One studio.</span>
              </h2>
              <div className="craft-counter-lbl">
                <span>
                  <span className="craft-counter-active">
                    {craftsData.find((c) => c.id === activeCraft)?.num || '01'}
                  </span>{' '}
                  / 06 · <span style={{ color: 'var(--text-muted)' }}>{isCraftHovered ? 'PAUSED' : 'AUTOPLAY'}</span>
                </span>
              </div>
            </div>

            {/* Accordion Stage Box (Continuous Smooth Animation & 100% Fit) */}
            <div 
              className="crafts-stage-box"
              onMouseEnter={() => setIsCraftHovered(true)}
              onMouseLeave={() => setIsCraftHovered(false)}
            >
              {craftsData.map((craft) => {
                const isActive = activeCraft === craft.id;

                return (
                  <div
                    key={craft.id}
                    className={`craft-stage-pane ${isActive ? 'is-active' : 'is-collapsed'}`}
                    onMouseEnter={() => setActiveCraft(craft.id)}
                    onClick={() => setActiveCraft(craft.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setActiveCraft(craft.id);
                    }}
                  >
                    {/* Collapsed View (Smooth fade-out when active) */}
                    <div className="craft-collapsed-view">
                      <span className="strip-number">{craft.num}</span>
                      <span className="strip-title-vertical">{craft.title}</span>
                      <div className="strip-plus-btn">+</div>
                    </div>

                    {/* Expanded View (Smooth glide & fade-in when active) */}
                    <div className="craft-expanded-view">
                      {/* Left Side: Information Pane */}
                      <div className="craft-info-pane">
                        <div className="craft-info-top">
                          <span className="craft-tag-eyebrow">{craft.tag}</span>
                          <span className="craft-watermark-num">{craft.num}</span>

                          <div className="craft-hero-text">
                            <h3 className="craft-hero-title">{craft.title}</h3>
                            <p className="craft-hero-desc">{craft.desc}</p>
                          </div>
                        </div>

                        {/* 2-Column Features Table with Divider Lines */}
                        <div className="craft-features-table">
                          <div className="craft-features-row">
                            <span className="craft-feat-item">— {craft.features[0]}</span>
                            <span className="craft-feat-item">— {craft.features[1]}</span>
                          </div>
                          <div className="craft-features-divider" />
                          <div className="craft-features-row">
                            <span className="craft-feat-item">— {craft.features[2]}</span>
                            <span className="craft-feat-item">— {craft.features[3]}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Editorial Photography Pane with Crisp White Button */}
                      <div 
                        className="craft-image-pane"
                        style={{ backgroundImage: `url(${craft.image})` }}
                      >
                        <div className="craft-image-overlay" />
                        <a href="#contact" className="craft-explore-action-btn">
                          Explore {craft.title} →
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =================================================================
            4. SECTION: SELECTED WORK (ARCHITECTURAL & COLORFUL HOVER)
            ================================================================= */}
        <section className="sec wk alignfull" id="work" aria-labelledby="wk-title-4">
          <div className="container">
            <div className="selected-work-header">
              <h2 className="section-title" id="wk-title-4">
                Selected <span className="italic">work.</span>
              </h2>

              <div className="work-filter-tabs" role="tablist">
                {[
                  { label: 'ALL 08', val: 'all' },
                  { label: 'WEB 03', val: 'web' },
                  { label: 'E-COMMERCE 03', val: 'ecom' },
                  { label: 'BRAND 02', val: 'brand' },
                ].map((tab) => {
                  const isTabActive = activeWorkFilter === tab.val;
                  return (
                    <button
                      key={tab.val}
                      type="button"
                      role="tab"
                      aria-selected={isTabActive}
                      className={`work-filter-btn ${isTabActive ? 'active' : ''}`}
                      onClick={() => setActiveWorkFilter(tab.val)}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Blueprint Framing Container with Top & Left Coordinate Rulers */}
            <div className="work-blueprint-wrapper">
              {/* Top Axis Coordinate Letters (A, B, C, D) */}
              <div className="work-axis-top" aria-hidden="true">
                <div className="work-axis-spacer" />
                <div className="work-axis-cols">
                  <span className="work-axis-col">A</span>
                  <span className="work-axis-col">B</span>
                  <span className="work-axis-col">C</span>
                  <span className="work-axis-col">D</span>
                </div>
              </div>

              <div className="work-grid-main-row">
                {/* Left Axis Row Coordinates (1, 2) */}
                <div className="work-axis-left" aria-hidden="true">
                  <span className="work-axis-row work-axis-row-1">1</span>
                  <span className="work-axis-row work-axis-row-2">2</span>
                </div>

                {/* Interactive Grid with X-Y Crosshair Lines & Floating Coordinate Badge */}
                <div
                  className="work-arch-grid-container"
                  ref={gridContainerRef}
                  onMouseMove={handleWorkMouseMove}
                  onMouseLeave={handleWorkMouseLeave}
                >
                  {/* Dynamic Crosshair Overlay */}
                  {crosshairPos.visible && (
                    <div className="work-crosshair-overlay" aria-hidden="true">
                      {/* Full-width Horizontal Guideline */}
                      <div
                        className="crosshair-line-h"
                        style={{ top: `${crosshairPos.y}px` }}
                      />
                      {/* Full-height Vertical Guideline */}
                      <div
                        className="crosshair-line-v"
                        style={{ left: `${crosshairPos.x}px` }}
                      />
                      {/* Floating Architectural Coordinate Badge */}
                      <div
                        className="crosshair-coord-badge"
                        style={{
                          left: `${Math.min(crosshairPos.x + 14, 1320)}px`,
                          top: `${Math.min(crosshairPos.y + 12, 600)}px`,
                        }}
                      >
                        X {coordDisplay.xStr} · Y {coordDisplay.yStr}
                      </div>
                    </div>
                  )}

                  {/* The 2x4 Project Cards Grid: Cards stay in place, filtered ones dim */}
                  <div className="work-arch-grid">
                    {workProjects.map((proj) => {
                      const isHovered = hoveredWorkId === proj.id;
                      const isFilteredOut = activeWorkFilter !== 'all' && proj.tag !== activeWorkFilter;
                      return (
                        <div
                          key={proj.id}
                          className={`work-arch-card ${isHovered ? 'is-active' : ''} ${isFilteredOut ? 'is-filtered-out' : ''}`}
                          onMouseEnter={() => setHoveredIdSafe(setHoveredWorkId, proj.id)}
                          onFocus={() => setHoveredIdSafe(setHoveredWorkId, proj.id)}
                          tabIndex={0}
                        >
                          <div className="card-top-ticker">
                            <span className="card-coord">{proj.coord}</span>
                            <span className="card-year">{proj.year}</span>
                          </div>

                          <div className="work-img-frame">
                            <img src={proj.image} alt={proj.name} loading="lazy" className="work-img" />
                          </div>

                          <div className="card-meta-bar">
                            <div className="card-meta-left">
                              <h3 className="card-project-title">{proj.name}</h3>
                              <span className="card-project-cat">{proj.category}</span>
                            </div>
                            <div className="card-meta-right">
                              <span className="card-metric-pill">{proj.metric}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="work-grid-footer">
              <a href="#work" className="work-scroll-top-btn" aria-label="Back to top">
                ↑
              </a>
            </div>
          </div>
        </section>

        {/* =================================================================
            5. SECTION: TWELVE WEEKS, NO SURPRISES (INTERACTIVE TIMELINE)
            ================================================================= */}
        <TimelineSection />

        {/* =================================================================
            6. SECTION: PROMISES, IN WRITING (GUARANTEES)
            ================================================================= */}
        <section className="sec gr alignfull" id="guarantees" aria-labelledby="gr-title-6">
          <div className="container">
            <div className="sh">
              <h2 className="section-title" id="gr-title-6">
                Promises, <span className="italic">in writing.</span>
              </h2>
            </div>

            <div className="promises-grid">
              <div className="promise-card card-featured">
                <span className="promise-badge">Guaranteed Scope</span>
                <h3 className="promise-title">Fixed price & transparent contract</h3>
                <p className="promise-body">
                  Every deliverable, milestone, and revision cycle is clearly itemized in our shared agreement. Zero unexpected invoices or scope creeps.
                </p>
                <div className="card-circle-motif" aria-hidden="true" />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="promise-card card-ochre-tint">
                  <div className="promise-stat-num" style={{ color: 'var(--color-ochre)' }}>62</div>
                  <div className="promise-stat-sub">Strict Quality Audits</div>
                  <p className="promise-body">
                    Accessibility, responsive testing, color contrast, and performance benchmarks checked before every release.
                  </p>
                </div>
                <div className="promise-card card-coral-tint">
                  <div className="promise-stat-num" style={{ color: 'var(--color-coral)' }}>24h</div>
                  <div className="promise-stat-sub">Async Response Window</div>
                  <p className="promise-body">
                    Direct communication via private Slack with your lead designer and engineering lead.
                  </p>
                </div>
              </div>

              <div className="promise-card card-indigo">
                <span className="promise-badge">100% Ownership</span>
                <h3 className="promise-title">Complete intellectual property handover</h3>
                <p className="promise-body">
                  All Figma source files, design tokens, Git repositories, 3D assets, and custom fonts belong entirely to you from day one of launch.
                </p>
                <div className="card-circle-motif" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            7. SECTION: YOUR BUDGET, OUR BEST (DYNAMIC ESTIMATOR)
            ================================================================= */}
        <section className="sec bd alignfull" id="pricing" aria-labelledby="bd-7-title">
          <div className="container">
            <div className="sh">
              <h2 className="section-title" id="bd-7-title">
                Your budget, <span className="italic">our best.</span>
              </h2>
            </div>

            <div className="budget-wrapper">
              <div className="budget-top-row">
                <div>
                  <span className="budget-tier-tag" style={{ color: 'var(--accent-gold)' }}>
                    TIER: {tierName.toUpperCase()}
                  </span>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                    Interactive scope & investment calculator
                  </p>
                </div>
                <div className="budget-display">${budgetVal}k</div>
              </div>

              <div className="budget-slider-container">
                <div className="slider-labels">
                  <span>Starter ($5k)</span>
                  <span>Growth ($15k)</span>
                  <span>Studio Core ($25k)</span>
                  <span>Enterprise ($40k+)</span>
                </div>
                <input
                  type="range"
                  className="custom-slider"
                  min="5"
                  max="45"
                  value={budgetVal}
                  step="1"
                  onChange={(e) => setBudgetVal(Number(e.target.value))}
                  aria-label="Project Budget Slider"
                />
              </div>

              <div className="budget-breakdown-grid">
                <div className="breakdown-item" style={{ borderLeft: '3px solid var(--color-sage)' }}>
                  <div className="breakdown-label">Delivery Timeline</div>
                  <div className="breakdown-value">{timeline}</div>
                </div>
                <div className="breakdown-item" style={{ borderLeft: '3px solid var(--color-ochre)' }}>
                  <div className="breakdown-label">Deliverables Scope</div>
                  <div className="breakdown-value">{deliverables}</div>
                </div>
                <div className="breakdown-item" style={{ borderLeft: '3px solid var(--color-coral)' }}>
                  <div className="breakdown-label">Dedicated Team</div>
                  <div className="breakdown-value">{team}</div>
                </div>
                <div className="breakdown-item" style={{ borderLeft: '3px solid var(--color-mauve)' }}>
                  <div className="breakdown-label">Post-Launch Care</div>
                  <div className="breakdown-value">{support}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            8. SECTION: IN THEIR WORDS (TESTIMONIALS)
            ================================================================= */}
        <section className="sec cw alignfull" id="testimonials" aria-labelledby="cw-title-8">
          <div className="container">
            <div className="sh">
              <h2 className="section-title cw__title" id="cw-title-8">
                In their <span className="italic">words.</span>
              </h2>
            </div>

            <div className="testimonials-layout">
              <div className="rating-summary-card">
                <div className="rating-big">4.9</div>
                <div className="rating-stars" aria-label="5 stars rating">★★★★★</div>
                <div className="rating-sub">Based on 120+ client reviews across 12 countries</div>
              </div>

              <div className="testimonials-grid">
                {reviewsData.map((t, idx) => (
                  <div key={idx} className={`testimonial-tile ${t.cls}`}>
                    <p className="testimonial-quote">{t.quote}</p>
                    <span className="testimonial-author">{t.author}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            9. SECTION: NEXT START: NOVEMBER (AVAILABILITY)
            ================================================================= */}
        <section className="sec av alignfull" id="availability" aria-labelledby="av-title-10">
          <div className="container">
            <div className="sh">
              <h2 className="section-title" id="av-title-10">
                Next start: <span className="italic">{selectedMonth}.</span>
              </h2>
            </div>

            <div className="months-selector">
              {monthsData.map((m) => {
                const isActive = selectedMonth === m.name;
                return (
                  <button
                    key={m.name}
                    type="button"
                    className={`month-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setSelectedMonth(m.name)}
                  >
                    <span>{m.name}</span>
                    <span className="slot-badge">{m.badge}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* ===================================================================
          10. FOOTER: DESIGN THAT WORKS IN THE DARK
          =================================================================== */}
      <footer className="ft site-footer" id="contact">
        <div className="container">
          <div className="footer-top-grid">
            <div>
              <h2 className="footer-brand-title">
                Design that works<br />
                <em className="italic" style={{ color: 'var(--accent-gold)' }}>in the dark.</em>
              </h2>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  placeholder={emailSent ? "We'll be in touch!" : "Your email address"}
                  required
                />
                <button type="submit" className="btn-chat">
                  {emailSent ? 'Sent ✓' : "Let's chat"}
                </button>
              </form>
            </div>

            <div>
              <div className="footer-col-title">Design</div>
              <ul className="footer-links">
                <li><a href="#work">Artisan</a></li>
                <li><a href="#services">Decisions</a></li>
                <li><a href="#timeline">News</a></li>
                <li><a href="#numbers">Archive</a></li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">About</div>
              <ul className="footer-links">
                <li><a href="#guarantees">Company</a></li>
                <li><a href="#timeline">Manifesto</a></li>
                <li><a href="#services">Careers</a></li>
                <li><a href="#pricing">Press Kit</a></li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Connect</div>
              <ul className="footer-links">
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter / X</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="mailto:hello@graphite.studio">hello@graphite.studio</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <span>© 2026 Graphite Studio. All rights reserved.</span>
            <a href="#" className="footer-url">www.graphite.studio</a>
            <a href="#contact" className="btn-contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function setHoveredIdSafe(setter, id) {
  setter(id);
}
