'use client';

import { useState, useEffect } from 'react';

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

export default function CraftsSection() {
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

  return (
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
  );
}
