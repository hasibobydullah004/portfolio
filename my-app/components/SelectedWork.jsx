'use client';

import { useState } from 'react';

const allProjects = [
  {
    id: 'p1',
    coord: 'A1',
    year: '2026',
    name: 'Northwind Atelier',
    category: 'E-COMMERCE',
    tag: 'ecom',
    metric: '+48% Rev',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    colorName: 'Terracotta',
    theme: {
      accent: '#ab5b4d',
      bgHover: '#f9ece9',
      borderHover: '#e8aba0',
      textHover: '#14181f',
      subHover: '#5c3e38',
      badgeBg: '#ab5b4d',
      badgeText: '#ffffff',
    },
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
    colorName: 'Indigo Slate',
    theme: {
      accent: '#3d4e75',
      bgHover: '#ebf0f9',
      borderHover: '#a3b5de',
      textHover: '#111722',
      subHover: '#384357',
      badgeBg: '#3d4e75',
      badgeText: '#ffffff',
    },
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
    colorName: 'Warm Ochre',
    theme: {
      accent: '#b5843a',
      bgHover: '#fbf3e6',
      borderHover: '#e8c992',
      textHover: '#181510',
      subHover: '#5c4826',
      badgeBg: '#b5843a',
      badgeText: '#ffffff',
    },
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
    colorName: 'Sage Green',
    theme: {
      accent: '#597764',
      bgHover: '#edf4ef',
      borderHover: '#abc2b2',
      textHover: '#101712',
      subHover: '#37473c',
      badgeBg: '#597764',
      badgeText: '#ffffff',
    },
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
    colorName: 'Dusty Plum',
    theme: {
      accent: '#8c5873',
      bgHover: '#f7edf2',
      borderHover: '#dbabc2',
      textHover: '#1c1117',
      subHover: '#573847',
      badgeBg: '#8c5873',
      badgeText: '#ffffff',
    },
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
    colorName: 'Caramel',
    theme: {
      accent: '#a87232',
      bgHover: '#f9f1e7',
      borderHover: '#e3be8f',
      textHover: '#1a140b',
      subHover: '#574020',
      badgeBg: '#a87232',
      badgeText: '#ffffff',
    },
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
    colorName: 'Teal Glow',
    theme: {
      accent: '#3b6875',
      bgHover: '#e8f3f5',
      borderHover: '#98c6d1',
      textHover: '#0e1619',
      subHover: '#2a444d',
      badgeBg: '#3b6875',
      badgeText: '#ffffff',
    },
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
    colorName: 'Rust Coral',
    theme: {
      accent: '#a64e3f',
      bgHover: '#faebe8',
      borderHover: '#e6a498',
      textHover: '#1c110f',
      subHover: '#592c23',
      badgeBg: '#a64e3f',
      badgeText: '#ffffff',
    },
  },
];

const filterTabs = [
  { label: 'ALL 08', value: 'all' },
  { label: 'WEB 03', value: 'web' },
  { label: 'E-COMMERCE 03', value: 'ecom' },
  { label: 'BRAND 02', value: 'brand' },
];

export default function SelectedWork() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredId, setHoveredId] = useState('p5'); // Default active on Kova Skincare like reference image

  const filteredProjects = activeFilter === 'all'
    ? allProjects
    : allProjects.filter((p) => p.tag === activeFilter);

  return (
    <section className="section" id="work">
      <div className="container">
        {/* Section Header with Category Filters */}
        <div className="selected-work-header">
          <h2 className="section-title">
            Selected <span className="italic">work.</span>
          </h2>

          <div className="work-filter-tabs" role="tablist">
            {filterTabs.map((tab) => {
              const isTabActive = activeFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  role="tab"
                  aria-selected={isTabActive}
                  className={`work-filter-btn ${isTabActive ? 'active' : ''}`}
                  onClick={() => setActiveFilter(tab.value)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Architectural 2x4 Grid with Colorful Hover Inversion Effect */}
        <div className="work-arch-grid">
          {filteredProjects.map((proj) => {
            const isHovered = hoveredId === proj.id;
            const { theme } = proj;

            return (
              <div
                key={proj.id}
                className={`work-arch-card ${isHovered ? 'is-active' : ''}`}
                onMouseEnter={() => setHoveredId(proj.id)}
                onFocus={() => setHoveredId(proj.id)}
                tabIndex={0}
                style={{
                  '--card-accent': theme.accent,
                  '--card-bg-hover': theme.bgHover,
                  '--card-border-hover': theme.borderHover,
                  '--card-text-hover': theme.textHover,
                  '--card-sub-hover': theme.subHover,
                  '--card-badge-bg': theme.badgeBg,
                  '--card-badge-text': theme.badgeText,
                }}
              >
                {/* Top Architectural Coordinate & Year Ticker */}
                <div className="card-top-ticker">
                  <div className="card-coord-group">
                    <span 
                      className="card-color-dot" 
                      style={{ backgroundColor: theme.accent }}
                    />
                    <span className="card-coord">{proj.coord}</span>
                  </div>
                  <span className="card-year">{proj.year}</span>
                </div>

                {/* Project Image Frame */}
                <div className="work-img-frame">
                  <img
                    src={proj.image}
                    alt={proj.name}
                    loading="lazy"
                    className="work-img"
                  />
                  {/* Subtle Color Wash Overlay that activates on hover */}
                  <div 
                    className="work-color-overlay" 
                    style={{ backgroundColor: theme.accent }}
                  />
                </div>

                {/* Bottom Metadata Bar */}
                <div className="card-meta-bar">
                  <div className="card-meta-left">
                    <h3 className="card-project-title">{proj.name}</h3>
                    <span className="card-project-cat">{proj.category}</span>
                  </div>

                  {/* Highlight Metric Pill (Appears like in reference image on hover) */}
                  <div className="card-meta-right">
                    <span className="card-metric-pill">
                      {proj.metric}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Back-to-Top / Navigation Bar */}
        <div className="work-grid-footer">
          <a href="#work" className="work-scroll-top-btn" aria-label="Back to top of selected work">
            ↑
          </a>
        </div>
      </div>
    </section>
  );
}
