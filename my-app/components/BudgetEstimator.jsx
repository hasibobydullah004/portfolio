'use client';

import { useState } from 'react';

export default function BudgetEstimator() {
  const [budget, setBudget] = useState(18);

  let timeline = '8 - 12 Weeks';
  let deliverables = 'Full Studio Site & Design System';
  let team = 'Art Director, UI/UX, Full-stack Dev';
  let support = '60 Days + Handover Workshops';
  let activeTier = 'Studio Core';

  if (budget <= 10) {
    timeline = '4 - 6 Weeks';
    deliverables = 'Landing Page + Brand Starter';
    team = '1 Lead Designer, 1 Frontend Dev';
    support = '30 Days Post-Launch Support';
    activeTier = 'Starter';
  } else if (budget <= 20) {
    timeline = '8 - 12 Weeks';
    deliverables = 'Full Studio Site & Design System';
    team = 'Art Director, UI/UX, Full-stack Dev';
    support = '60 Days + Handover Workshops';
    activeTier = 'Growth';
  } else if (budget <= 30) {
    timeline = '12 - 16 Weeks';
    deliverables = 'Bespoke Web Platform + 3D / Motion';
    team = 'Dedicated Creative Pod & Tech Lead';
    support = '90 Days SLA Guarantee';
    activeTier = 'Studio Core';
  } else {
    timeline = '16+ Weeks';
    deliverables = 'Enterprise Multi-Brand Platform';
    team = 'Full Cross-Functional Agency Squad';
    support = '6 Months VIP Priority SLA';
    activeTier = 'Enterprise';
  }

  return (
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
                TIER: {activeTier.toUpperCase()}
              </span>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Interactive scope & investment calculator
              </p>
            </div>
            <div className="budget-display">${budget}k</div>
          </div>

          {/* Interactive Range Slider */}
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
              value={budget}
              step="1"
              onChange={(e) => setBudget(Number(e.target.value))}
              aria-label="Project Budget Slider"
            />
          </div>

          {/* Dynamic Breakdown Grid */}
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
  );
}
