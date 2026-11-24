'use client';

import { useState, useRef, useCallback } from 'react';

const allProjects = [
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

const filterTabs = [
  { label: 'ALL 08', value: 'all' },
  { label: 'WEB 03', value: 'web' },
  { label: 'E-COMMERCE 03', value: 'ecom' },
  { label: 'BRAND 02', value: 'brand' },
];

export default function SelectedWork() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredId, setHoveredId] = useState(null);

  // Crosshair state
  const gridContainerRef = useRef(null);
  const [crosshairPos, setCrosshairPos] = useState({ x: -1000, y: -1000, visible: false });
  const [coordDisplay, setCoordDisplay] = useState({ xStr: '0000', yStr: '0000' });

  const handleMouseMove = useCallback((e) => {
    if (!gridContainerRef.current) return;
    const rect = gridContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      setCrosshairPos({ x, y, visible: true });

      // Calculate actual client screen pixel coordinates as shown in recording
      const xPixel = Math.round(e.clientX).toString().padStart(4, '0');
      const yPixel = Math.round(e.clientY).toString().padStart(4, '0');
      setCoordDisplay({ xStr: xPixel, yStr: yPixel });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCrosshairPos((prev) => ({ ...prev, visible: false }));
    setHoveredId(null);
  }, []);

  return (
    <section className="sec wk alignfull" id="work" aria-labelledby="wk-title-main">
      <div className="container">
        {/* Section Header with Category Filters */}
        <div className="selected-work-header">
          <h2 className="section-title" id="wk-title-main">
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
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
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
                      left: `${Math.min(crosshairPos.x + 12, 1320)}px`,
                      top: `${Math.min(crosshairPos.y + 10, 600)}px`,
                    }}
                  >
                    X {coordDisplay.xStr} · Y {coordDisplay.yStr}
                  </div>
                </div>
              )}

              {/* The 2x4 Project Cards Grid: Cards stay in place, filtered ones dim */}
              <div className="work-arch-grid">
                {allProjects.map((proj) => {
                  const isHovered = hoveredId === proj.id;
                  const isFilteredOut = activeFilter !== 'all' && proj.tag !== activeFilter;

                  return (
                    <div
                      key={proj.id}
                      className={`work-arch-card ${isHovered ? 'is-active' : ''} ${isFilteredOut ? 'is-filtered-out' : ''}`}
                      onMouseEnter={() => setHoveredId(proj.id)}
                      onFocus={() => setHoveredId(proj.id)}
                      tabIndex={0}
                    >
                      {/* Top Coordinate & Year Ticker */}
                      <div className="card-top-ticker">
                        <span className="card-coord">{proj.coord}</span>
                        <span className="card-year">{proj.year}</span>
                      </div>

                      {/* Project Image Frame with Clean Border */}
                      <div className="work-img-frame">
                        <img
                          src={proj.image}
                          alt={proj.name}
                          loading="lazy"
                          className="work-img"
                        />
                      </div>

                      {/* Bottom Project Metadata Bar */}
                      <div className="card-meta-bar">
                        <div className="card-meta-left">
                          <h3 className="card-project-title">{proj.name}</h3>
                          <span className="card-project-cat">{proj.category}</span>
                        </div>

                        {/* Bottom-right Metric Tag */}
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
            </div>
          </div>
        </div>

        {/* Back-to-Top Navigation Button */}
        <div className="work-grid-footer">
          <a href="#work" className="work-scroll-top-btn" aria-label="Back to top of selected work">
            ↑
          </a>
        </div>
      </div>
    </section>
  );
}
