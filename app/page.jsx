'use client';

import { useState, useEffect } from 'react';

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

// 2. Six Crafts, One Studio
const craftsData = [
  {
    id: 'sv-1',
    num: '01',
    title: 'Web design',
    tags: '01 — UX · UI · ART DIRECTION',
    desc: 'Interfaces with a point of view — structure first, then the details nobody else notices.',
    list: ['Research & UX', 'Art direction', 'UI design system', 'Prototypes'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    accent: '#6e8677',
    bgGlow: 'rgba(110, 134, 119, 0.28)',
    borderColor: 'rgba(132, 160, 143, 0.5)',
    tagBg: '#597764',
  },
  {
    id: 'sv-2',
    num: '02',
    title: 'Development',
    tags: '02 — NEXT.JS · REACT · FRONTEND',
    desc: 'Bespoke frontend architectures, headless CMS integrations, and lightning-fast animations.',
    list: ['Next.js 15 App Router', 'React 19 Components', 'Tailwind & Motion', 'API Integrations'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
    accent: '#426e7b',
    bgGlow: 'rgba(66, 110, 123, 0.28)',
    borderColor: 'rgba(89, 142, 158, 0.5)',
    tagBg: '#3b6875',
  },
  {
    id: 'sv-3',
    num: '03',
    title: 'E-commerce',
    tags: '03 — SHOPIFY · CHECKOUT · CRO',
    desc: 'Custom digital storefronts built to convert browsers into long-term patrons with zero friction.',
    list: ['Shopify Plus Themes', 'Custom Cart Flow', 'Merchandising Systems', 'Speed Optimization'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80',
    accent: '#b5843a',
    bgGlow: 'rgba(181, 132, 58, 0.28)',
    borderColor: 'rgba(214, 159, 75, 0.5)',
    tagBg: '#9e6b2c',
  },
  {
    id: 'sv-4',
    num: '04',
    title: 'Branding',
    tags: '04 — IDENTITY · LOGO · PACKAGING',
    desc: 'Distinctive typography, tactile print guidelines, and cohesive visual language for ambitious founders.',
    list: ['Brand Identity & Logo', 'Typography Selection', 'Design Guidelines', 'Physical Packaging'],
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1000&q=80',
    accent: '#7e5267',
    bgGlow: 'rgba(126, 82, 103, 0.28)',
    borderColor: 'rgba(158, 106, 131, 0.5)',
    tagBg: '#7a4b62',
  },
  {
    id: 'sv-5',
    num: '05',
    title: 'Motion',
    tags: '05 — 3D · KINETIC TYPE · INTERACTION',
    desc: 'Subtle choreography and cinematic visual momentum that elevate screens into memorable encounters.',
    list: ['3D Asset Modeling', 'Micro-Interactions', 'Kinetic Typography', 'Video Showreels'],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
    accent: '#ab5b4d',
    bgGlow: 'rgba(171, 91, 77, 0.28)',
    borderColor: 'rgba(204, 115, 99, 0.5)',
    tagBg: '#9e5346',
  },
  {
    id: 'sv-6',
    num: '06',
    title: 'Support',
    tags: '06 — RETAINER · ITERATION · CARE',
    desc: 'Post-launch technical guardianship, monthly feature drops, and continuous performance tuning.',
    list: ['Monthly Dev Retainer', 'Conversion Audits', 'Core Web Vitals', 'Priority Support'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
    accent: '#2c395c',
    bgGlow: 'rgba(44, 57, 92, 0.35)',
    borderColor: 'rgba(72, 92, 145, 0.5)',
    tagBg: '#34466b',
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
    metric: '+48% Rev',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    accent: '#ab5b4d',
    bgHover: '#f9ece9',
    borderHover: '#e8aba0',
    textHover: '#14181f',
    subHover: '#5c3e38',
  },
  {
    id: 'p2',
    coord: 'B1',
    year: '2026',
    name: 'Halden Coffee',
    category: 'BRAND + WEB',
    tag: 'brand',
    metric: '120k Packs',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    accent: '#3d4e75',
    bgHover: '#ebf0f9',
    borderHover: '#a3b5de',
    textHover: '#111722',
    subHover: '#384357',
  },
  {
    id: 'p3',
    coord: 'C1',
    year: '2025',
    name: 'Oslo Type Foundry',
    category: 'WEB',
    tag: 'web',
    metric: 'Awwwards',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    accent: '#b5843a',
    bgHover: '#fbf3e6',
    borderHover: '#e8c992',
    textHover: '#181510',
    subHover: '#5c4826',
  },
  {
    id: 'p4',
    coord: 'D1',
    year: '2025',
    name: 'Mira Architects',
    category: 'WEB',
    tag: 'web',
    metric: 'Monocle ID',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    accent: '#597764',
    bgHover: '#edf4ef',
    borderHover: '#abc2b2',
    textHover: '#101712',
    subHover: '#37473c',
  },
  {
    id: 'p5',
    coord: 'A2',
    year: '2025',
    name: 'Kova Skincare',
    category: 'E-COMMERCE',
    tag: 'ecom',
    metric: '4.8% Conv',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    accent: '#8c5873',
    bgHover: '#f7edf2',
    borderHover: '#dbabc2',
    textHover: '#1c1117',
    subHover: '#573847',
  },
  {
    id: 'p6',
    coord: 'B2',
    year: '2024',
    name: 'Field Notes Radio',
    category: 'BRAND + WEB',
    tag: 'brand',
    metric: 'Grammy Nom',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    accent: '#a87232',
    bgHover: '#f9f1e7',
    borderHover: '#e3be8f',
    textHover: '#1a140b',
    subHover: '#574020',
  },
  {
    id: 'p7',
    coord: 'C2',
    year: '2024',
    name: 'Lumen Studio',
    category: 'WEB',
    tag: 'web',
    metric: "Red Dot '24",
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    accent: '#3b6875',
    bgHover: '#e8f3f5',
    borderHover: '#98c6d1',
    textHover: '#0e1619',
    subHover: '#2a444d',
  },
  {
    id: 'p8',
    coord: 'D2',
    year: '2024',
    name: 'Atlas Bikes',
    category: 'E-COMMERCE',
    tag: 'ecom',
    metric: '+84% Sales',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
    accent: '#a64e3f',
    bgHover: '#faebe8',
    borderHover: '#e6a498',
    textHover: '#1c110f',
    subHover: '#592c23',
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
  const [hoveredWorkId, setHoveredWorkId] = useState('p5');
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
        <section className="sec nm alignfull" id="numbers" aria-labelledby="nm-title-2">
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

            {/* 4 Architectural Columns Box with Exact Spec Match */}
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
                        <span className="val-digits">{item.value}</span>
                        {item.symbol && (
                          <span className={`val-sym val-sym--${item.symbolType}`}>
                            {item.symbol}
                          </span>
                        )}
                      </div>

                      <div className="nm-track-bar" aria-hidden="true">
                        <div
                          className="nm-track-fill"
                          style={{ width: item.bar }}
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

              {/* Bottom Right Corner Up Arrow Button */}
              <a href="#numbers" className="stats-scroll-btn" aria-label="Top of numbers">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* =================================================================
            3. SECTION: SIX CRAFTS, ONE STUDIO (INTERACTIVE ACCORDION)
            ================================================================= */}
        <section className="sec sv alignfull" id="services" aria-labelledby="sv-3-title">
          <div className="container">
            <div className="sv__head">
              <h2 className="section-title" id="sv-3-title">
                Six crafts. <span className="italic">One studio.</span>
              </h2>
              <div className="craft-counter-lbl">
                <span>
                  <span className="craft-counter-active">
                    {craftsData.find((c) => c.id === activeCraft)?.num || '01'}
                  </span>{' '}
                  / 06 · <span style={{ color: 'var(--accent-gold)' }}>AUTOPLAY</span>
                </span>
              </div>
            </div>

            <div 
              className="crafts-container"
              onMouseEnter={() => setIsCraftHovered(true)}
              onMouseLeave={() => setIsCraftHovered(false)}
            >
              {craftsData.map((craft) => {
                const isActive = activeCraft === craft.id;
                return (
                  <div
                    key={craft.id}
                    className={`craft-pane ${isActive ? 'active' : ''}`}
                    style={{
                      backgroundImage: `url(${craft.image})`,
                      backgroundColor: craft.accent,
                      border: isActive ? `1.5px solid ${craft.borderColor}` : '1px solid var(--border-subtle)',
                      boxShadow: isActive ? `0 12px 35px ${craft.bgGlow}` : 'none',
                    }}
                    onMouseEnter={() => setActiveCraft(craft.id)}
                    onFocus={() => setActiveCraft(craft.id)}
                    onClick={() => setActiveCraft(craft.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setActiveCraft(craft.id);
                    }}
                  >
                    <span
                      className="craft-vertical-label"
                      style={{ color: isActive ? '#fff' : 'var(--text-secondary)' }}
                    >
                      <span style={{ color: craft.accent, marginRight: '0.4rem', fontWeight: 600 }}>
                        {craft.num}
                      </span>
                      {craft.title}
                    </span>

                    <div className="craft-content">
                      <span
                        className="craft-category"
                        style={{ color: craft.accent, borderBottom: `1px solid ${craft.accent}` }}
                      >
                        {craft.tags}
                      </span>
                      <h3 className="craft-title">{craft.title}</h3>
                      <p className="craft-desc">{craft.desc}</p>
                      <div className="craft-tags">
                        {craft.list.map((item) => (
                          <span
                            key={item}
                            className="craft-tag"
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.08)',
                              borderColor: craft.borderColor,
                              color: '#f5f2eb',
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <div style={{ marginTop: '1.25rem' }}>
                        <a
                          href="#contact"
                          className="craft-explore-btn"
                          style={{
                            color: '#fff',
                            borderColor: craft.borderColor,
                            backgroundColor: craft.tagBg,
                          }}
                        >
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

            <div className="work-arch-grid">
              {filteredWork.map((proj) => {
                const isHovered = hoveredWorkId === proj.id;
                return (
                  <div
                    key={proj.id}
                    className={`work-arch-card ${isHovered ? 'is-active' : ''}`}
                    onMouseEnter={() => setHoveredIdSafe(setHoveredWorkId, proj.id)}
                    onFocus={() => setHoveredIdSafe(setHoveredWorkId, proj.id)}
                    tabIndex={0}
                    style={{
                      '--card-accent': proj.accent,
                      '--card-bg-hover': proj.bgHover,
                      '--card-border-hover': proj.borderHover,
                      '--card-text-hover': proj.textHover,
                      '--card-sub-hover': proj.subHover,
                      '--card-badge-bg': proj.accent,
                      '--card-badge-text': '#ffffff',
                    }}
                  >
                    <div className="card-top-ticker">
                      <div className="card-coord-group">
                        <span className="card-color-dot" style={{ backgroundColor: proj.accent }} />
                        <span className="card-coord">{proj.coord}</span>
                      </div>
                      <span className="card-year">{proj.year}</span>
                    </div>

                    <div className="work-img-frame">
                      <img src={proj.image} alt={proj.name} loading="lazy" className="work-img" />
                      <div className="work-color-overlay" style={{ backgroundColor: proj.accent }} />
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

            <div className="work-grid-footer">
              <a href="#work" className="work-scroll-top-btn" aria-label="Back to top">
                ↑
              </a>
            </div>
          </div>
        </section>

        {/* =================================================================
            5. SECTION: TWELVE WEEKS, NO SURPRISES (PROCESS ROADMAP)
            ================================================================= */}
        <section className="sec pc alignfull" id="timeline" aria-labelledby="pc-title-5">
          <div className="container">
            <div className="sh">
              <h2 className="section-title" id="pc-title-5">
                Twelve weeks, <span className="italic">no surprises.</span>
              </h2>
            </div>

            <div className="timeline-card">
              <div className="timeline-header" aria-hidden="true">
                {Array.from({ length: 12 }, (_, i) => `W${i + 1}`).map((w) => (
                  <span key={w} className="week-num">{w}</span>
                ))}
              </div>

              <div className="timeline-tracks">
                <div className="timeline-row">
                  <div className="timeline-bar bar-sage" style={{ gridColumn: '1 / 4' }}>
                    Discovery & Strategy
                  </div>
                </div>
                <div className="timeline-row">
                  <div className="timeline-bar bar-ochre" style={{ gridColumn: '3 / 7' }}>
                    UX Architecture & Wireframes
                  </div>
                </div>
                <div className="timeline-row">
                  <div className="timeline-bar bar-coral" style={{ gridColumn: '6 / 10' }}>
                    Visual System & UI Design
                  </div>
                </div>
                <div className="timeline-row">
                  <div className="timeline-bar bar-mauve" style={{ gridColumn: '9 / 12' }}>
                    Engineering & QA Testing
                  </div>
                </div>
              </div>

              <div className="timeline-milestones">
                <div className="milestone-item">
                  <div className="milestone-dot" />
                  <span>Kickoff Alignment</span>
                </div>
                <div className="milestone-item">
                  <div className="milestone-dot" />
                  <span>Wireframe Approval</span>
                </div>
                <div className="milestone-item">
                  <div className="milestone-dot" />
                  <span>Visual Signoff</span>
                </div>
                <div className="milestone-item">
                  <div className="milestone-dot" />
                  <span>Code Complete</span>
                </div>
                <div className="milestone-item">
                  <div className="milestone-dot" />
                  <span>Launch & Handover</span>
                </div>
              </div>
            </div>
          </div>
        </section>

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
