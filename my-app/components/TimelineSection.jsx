export default function TimelineSection() {
  const weeks = Array.from({ length: 12 }, (_, i) => `W${i + 1}`);

  return (
    <section className="section" id="timeline">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Twelve weeks, <span className="italic">no surprise.</span>
          </h2>
        </div>

        <div className="timeline-card">
          {/* Week Headers W1 - W12 */}
          <div className="timeline-header" aria-hidden="true">
            {weeks.map((w) => (
              <span key={w} className="week-num">
                {w}
              </span>
            ))}
          </div>

          {/* Timeline Tracks */}
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

          {/* Milestones */}
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
  );
}

