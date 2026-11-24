'use client';

import { useState } from 'react';

const crafts = [
  {
    id: 'sv-1',
    num: '01',
    title: 'Web design',
    tags: '01 — UX · UI · ART DIRECTION',
    desc: 'Interfaces with a point of view — structure first, then the details nobody else notices.',
    list: ['Research & UX', 'Art direction', 'UI design system', 'Prototypes'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    theme: {
      accent: '#6e8677',
      bgGlow: 'rgba(110, 134, 119, 0.28)',
      borderColor: 'rgba(132, 160, 143, 0.5)',
      tagBg: '#597764',
    },
  },
  {
    id: 'sv-2',
    num: '02',
    title: 'Development',
    tags: '02 — NEXT.JS · REACT · FRONTEND',
    desc: 'Bespoke frontend architectures, headless CMS integrations, and lightning-fast animations.',
    list: ['Next.js 15 App Router', 'React 19 Components', 'Tailwind & Motion', 'API Integrations'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
    theme: {
      accent: '#426e7b',
      bgGlow: 'rgba(66, 110, 123, 0.28)',
      borderColor: 'rgba(89, 142, 158, 0.5)',
      tagBg: '#3b6875',
    },
  },
  {
    id: 'sv-3',
    num: '03',
    title: 'E-commerce',
    tags: '03 — SHOPIFY · CHECKOUT · CRO',
    desc: 'Custom digital storefronts built to convert browsers into long-term patrons with zero friction.',
    list: ['Shopify Plus Themes', 'Custom Cart Flow', 'Merchandising Systems', 'Speed Optimization'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80',
    theme: {
      accent: '#b5843a',
      bgGlow: 'rgba(181, 132, 58, 0.28)',
      borderColor: 'rgba(214, 159, 75, 0.5)',
      tagBg: '#9e6b2c',
    },
  },
  {
    id: 'sv-4',
    num: '04',
    title: 'Branding',
    tags: '04 — IDENTITY · LOGO · PACKAGING',
    desc: 'Distinctive typography, tactile print guidelines, and cohesive visual language for ambitious founders.',
    list: ['Brand Identity & Logo', 'Typography Selection', 'Design Guidelines', 'Physical Packaging'],
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1000&q=80',
    theme: {
      accent: '#7e5267',
      bgGlow: 'rgba(126, 82, 103, 0.28)',
      borderColor: 'rgba(158, 106, 131, 0.5)',
      tagBg: '#7a4b62',
    },
  },
  {
    id: 'sv-5',
    num: '05',
    title: 'Motion',
    tags: '05 — 3D · KINETIC TYPE · INTERACTION',
    desc: 'Subtle choreography and cinematic visual momentum that elevate screens into memorable encounters.',
    list: ['3D Asset Modeling', 'Micro-Interactions', 'Kinetic Typography', 'Video Showreels'],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
    theme: {
      accent: '#ab5b4d',
      bgGlow: 'rgba(171, 91, 77, 0.28)',
      borderColor: 'rgba(204, 115, 99, 0.5)',
      tagBg: '#9e5346',
    },
  },
  {
    id: 'sv-6',
    num: '06',
    title: 'Support',
    tags: '06 — RETAINER · ITERATION · CARE',
    desc: 'Post-launch technical guardianship, monthly feature drops, and continuous performance tuning.',
    list: ['Monthly Dev Retainer', 'Conversion Audits', 'Core Web Vitals', 'Priority Support'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
    theme: {
      accent: '#2c395c',
      bgGlow: 'rgba(44, 57, 92, 0.35)',
      borderColor: 'rgba(72, 92, 145, 0.5)',
      tagBg: '#34466b',
    },
  },
];

export default function CraftsSection() {
  const [activeId, setActiveId] = useState('sv-4'); // Branding active by default

  return (
    <section className="sec sv alignfull" id="services" aria-labelledby="sv-3-title">
      <div className="container">
        <div className="sv__head">
          <h2 className="section-title" id="sv-3-title">
            Six crafts. <span className="italic">One studio.</span>
          </h2>
          <div className="craft-counter-lbl">
            <span>
              <span className="craft-counter-active">
                {crafts.find((c) => c.id === activeId)?.num || '01'}
              </span>{' '}
              / 06 · <span style={{ color: 'var(--accent-gold)' }}>AUTOPLAY</span>
            </span>
          </div>
        </div>

        {/* 6 Accordion Panels */}
        <div className="crafts-container">
          {crafts.map((craft) => {
            const isActive = activeId === craft.id;
            const { theme } = craft;

            return (
              <div
                key={craft.id}
                className={`craft-pane ${isActive ? 'active' : ''}`}
                style={{
                  backgroundImage: `url(${craft.image})`,
                  backgroundColor: theme.accent,
                  border: isActive ? `1.5px solid ${theme.borderColor}` : '1px solid var(--border-subtle)',
                  boxShadow: isActive ? `0 12px 35px ${theme.bgGlow}` : 'none',
                }}
                onClick={() => setActiveId(craft.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setActiveId(craft.id);
                }}
              >
                {/* Collapsed Vertical Title */}
                <span 
                  className="craft-vertical-label"
                  style={{
                    color: isActive ? '#fff' : 'var(--text-secondary)',
                  }}
                >
                  <span style={{ color: theme.accent, marginRight: '0.4rem', fontWeight: 600 }}>{craft.num}</span>
                  {craft.title}
                </span>

                {/* Expanded Content with Colorful Accents */}
                <div className="craft-content">
                  <span 
                    className="craft-category"
                    style={{ color: theme.accent, borderBottom: `1px solid ${theme.accent}` }}
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
                          borderColor: theme.borderColor,
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
                        borderColor: theme.borderColor,
                        backgroundColor: theme.tagBg,
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
  );
}
