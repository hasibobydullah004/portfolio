'use client';

import { useState } from 'react';

const statsData = [
  {
    code: 'A1',
    category: 'PROJECTS',
    value: '240',
    symbol: '+',
    label: 'Websites shipped',
    barWidth: '80%',
    theme: {
      accent: '#6e8677',
      bgHover: '#edf4f0',
      borderHover: '#a3c2af',
      textHover: '#0f1812',
      subHover: '#334a3b',
      barColor: '#597764',
    },
  },
  {
    code: 'B1',
    category: 'TIME',
    value: '12',
    symbol: 'y',
    label: 'Years in practice',
    barWidth: '48%',
    theme: {
      accent: '#7e5267',
      bgHover: '#f7edf2',
      borderHover: '#cf9db4',
      textHover: '#1c1016',
      subHover: '#523041',
      barColor: '#7a4b62',
    },
  },
  {
    code: 'C1',
    category: 'REACH',
    value: '38',
    symbol: '',
    label: 'Countries served',
    barWidth: '62%',
    theme: {
      accent: '#b5843a',
      bgHover: '#fbf3e6',
      borderHover: '#e6be83',
      textHover: '#1c140a',
      subHover: '#573d19',
      barColor: '#b5843a',
    },
  },
  {
    code: 'D1',
    category: 'LOYALTY',
    value: '98',
    symbol: '%',
    label: 'Clients who return',
    barWidth: '98%',
    theme: {
      accent: '#ab5b4d',
      bgHover: '#faece9',
      borderHover: '#e49f93',
      textHover: '#1c0f0d',
      subHover: '#572b24',
      barColor: '#ab5b4d',
    },
  },
];

export default function StatsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="sec nm alignfull" id="numbers" aria-labelledby="nm-title-2">
      <div className="container">
        <div className="nm__head">
          <h2 className="section-title" id="nm-title-2">
            Twelve years, <span className="italic">in numbers.</span>
          </h2>
        </div>

        {/* Architectural Container with Ruler Header & Interactive Colorful Columns */}
        <div className="arch-stats-wrapper">
          {/* Top Architectural Ruler / Ticker Header */}
          <div className="arch-ruler-bar" aria-hidden="true">
            {statsData.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div 
                  key={item.code} 
                  className="ruler-segment"
                  style={{
                    color: isActive ? item.theme.accent : 'var(--text-muted)',
                    borderBottom: isActive ? `2px solid ${item.theme.accent}` : 'none',
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span 
                      style={{ 
                        display: 'inline-block', 
                        width: '6px', 
                        height: '6px', 
                        borderRadius: '50%', 
                        backgroundColor: item.theme.accent,
                        boxShadow: isActive ? `0 0 8px ${item.theme.accent}` : 'none',
                      }} 
                    />
                    <span>{item.code}</span>
                  </div>
                  <span>{item.category}</span>
                  <div className="ruler-ticks">
                    <span className="ruler-tick major" />
                    <span className="ruler-tick" />
                    <span className="ruler-tick" />
                    <span className="ruler-tick" />
                    <span className="ruler-tick major" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4 Interactive Columns with Colorful Inversion Hover Effect */}
          <div className="arch-columns-grid">
            {statsData.map((item, index) => {
              const isActive = activeIndex === index;
              const { theme } = item;

              return (
                <div
                  key={item.code}
                  className={`arch-col ${isActive ? 'is-active' : ''}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  tabIndex={0}
                  onFocus={() => setActiveIndex(index)}
                  style={{
                    '--col-accent': theme.accent,
                    '--col-bg-hover': theme.bgHover,
                    '--col-border-hover': theme.borderHover,
                    '--col-text-hover': theme.textHover,
                    '--col-sub-hover': theme.subHover,
                    '--col-bar': theme.barColor,
                  }}
                >
                  {/* Subtle palette dot indicator */}
                  <div 
                    className="arch-col-color-indicator" 
                    style={{ backgroundColor: theme.accent, boxShadow: `0 0 10px ${theme.accent}` }}
                  />

                  {/* Value & Digits */}
                  <div>
                    <div className="arch-col-val">
                      {item.value}
                      <span className="symbol">{item.symbol}</span>
                    </div>

                    {/* Progress Bar Track */}
                    <div className="nm-track-bar" aria-hidden="true">
                      <div 
                        className="nm-track-fill" 
                        style={{ 
                          width: item.barWidth,
                          backgroundColor: isActive ? theme.barColor : theme.accent,
                        }} 
                      />
                    </div>
                  </div>

                  <div className="arch-col-desc">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Technical Bar */}
          <div className="arch-bottom-bar">
            <span className="arch-bottom-btn">
              <span>EXPLORE ARCHIVE</span>
              <span>[ + ]</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
