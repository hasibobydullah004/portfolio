'use client';

import { useState, useRef, useCallback } from 'react';

const allProjects = [
  {
    id: 'p1',
    colLetter: 'A',
    rowNum: '1',
    coord: 'A1',
    year: '2026',
    name: 'Northwind Atelier',
    category: 'E-COMMERCE',
    tag: 'ecom',
    metric: '+48%',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80', // dark fabric/coat over chair
  },
  {
    id: 'p2',
    colLetter: 'B',
    rowNum: '1',
    coord: 'B1',
    year: '2026',
    name: 'Halden Coffee',
    category: 'BRAND + WEB',
    tag: 'brand',
    metric: '120k Packs',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80', // coffee bag & cup on stone
  },
  {
    id: 'p3',
    colLetter: 'C',
    rowNum: '1',
    coord: 'C1',
    year: '2025',
    name: 'Oslo Type Foundry',
    category: 'WEB',
    tag: 'web',
    metric: 'Awwwards',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', // 3D architectural letters / typography
  },
  {
    id: 'p4',
    colLetter: 'D',
    rowNum: '1',
    coord: '01', // as shown in user's image media_1795519042478_556b4987.jpg: D1 active card shows 01 in top left!
    origCoord: 'D1',
    year: '2025',
    name: 'Mira Architects',
    category: 'WEB',
    tag: 'web',
    metric: '+64%', // exact metric from user's image
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', // brutalist architecture concrete & pool
  },
  {
    id: 'p5',
    colLetter: 'A',
    rowNum: '2',
    coord: 'A2',
    year: '2025',
    name: 'Kova Skincare',
    category: 'E-COMMERCE',
    tag: 'ecom',
    metric: '4.8% Conv',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80', // skincare bottle and jar
  },
  {
    id: 'p6',
    colLetter: 'B',
    rowNum: '2',
    coord: 'B2',
    year: '2024',
    name: 'Field Notes Radio',
    category: 'BRAND + WEB',
    tag: 'brand',
    metric: 'Grammy Nom',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80', // vinyl record & mic
  },
  {
    id: 'p7',
    colLetter: 'C',
    rowNum: '2',
    coord: 'C2',
    year: '2024',
    name: 'Lumen Studio',
    category: 'WEB',
    tag: 'web',
    metric: "Red Dot '24",
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80', // glowing orb lamp & dark curved screen
  },
  {
    id: 'p8',
    colLetter: 'D',
    rowNum: '2',
    coord: '02',
    origCoord: 'D2',
    year: '2024',
    name: 'Atlas Bikes',
    category: 'E-COMMERCE',
    tag: 'ecom',
    metric: '+84% Sales',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80', // black minimalist bike against wall
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
  const [hoveredId, setHoveredId] = useState('p4'); // Mira Architects active by default as in user's image

  // Crosshair state
  const gridContainerRef = useRef(null);
  const [crosshairPos, setCrosshairPos] = useState({ x: -1000, y: -1000, visible: false });
  const [coordDisplay, setCoordDisplay] = useState({ xStr: '2222', yStr: '0268' });

  const handleMouseMove = useCallback((e) => {
    if (!gridContainerRef.current) return;
    const rect = gridContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check bounds
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      setCrosshairPos({ x, y, visible: true });

      // Generate realistic architectural CAD/drafting coordinates
      // Map to 4-digit coordinate string (e.g., X 2222 · Y 0268)
      const mappedX = Math.round(1000 + (x / rect.width) * 1500).toString().padStart(4, '0');
      const mappedY = Math.round(100 + (y / rect.height) * 400).toString().padStart(4, '0');
      setCoordDisplay({ xStr: mappedX, yStr: mappedY });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCrosshairPos((prev) => ({ ...prev, visible: false }));
  }, []);

  const filteredProjects = activeFilter === 'all'
    ? allProjects
    : allProjects.filter((p) => p.tag === activeFilter);

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
                      left: `${Math.min(crosshairPos.x + 14, 1320)}px`,
                      top: `${Math.min(crosshairPos.y + 12, 600)}px`,
                    }}
                  >
                    X {coordDisplay.xStr} · Y {coordDisplay.yStr}
                  </div>
                </div>
              )}

              {/* The 2x4 Project Cards Grid */}
              <div className="work-arch-grid">
                {filteredProjects.map((proj) => {
                  const isHovered = hoveredId === proj.id;

                  return (
                    <div
                      key={proj.id}
                      className={`work-arch-card ${isHovered ? 'is-active' : ''}`}
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

                        {/* Bottom-right Metric Tag (Revealed like in reference) */}
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
