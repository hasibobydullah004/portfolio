'use client';

import { useState, useEffect, useRef } from 'react';

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
      // Gentle cubic-bezier ease out
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

const statsData = [
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

export default function StatsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
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

  return (
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
          {statsData.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={item.code}
                className={`arch-col ${isActive ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
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

          {/* Bottom Right Corner Up Arrow Button */}
          <a href="#numbers" className="stats-scroll-btn" aria-label="Top of numbers">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
