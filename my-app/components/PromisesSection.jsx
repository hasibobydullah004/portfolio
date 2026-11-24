export default function PromisesSection() {
  return (
    <section className="sec gr alignfull" id="guarantees" aria-labelledby="gr-title-6">
      <div className="container">
        <div className="sh">
          <h2 className="section-title" id="gr-title-6">
            Promises, <span className="italic">in writing.</span>
          </h2>
        </div>

        <div className="promises-grid">
          {/* Featured Mauve Card with Circular Graphic Motif */}
          <div className="promise-card card-featured">
            <span className="promise-badge">Guaranteed Scope</span>
            <h3 className="promise-title">Fixed price & transparent contract</h3>
            <p className="promise-body">
              Every deliverable, milestone, and revision cycle is clearly itemized in our shared agreement. Zero unexpected invoices or scope creeps.
            </p>
            <div className="card-circle-motif" aria-hidden="true" />
          </div>

          {/* Middle Stats Cards */}
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

          {/* Right Indigo Card */}
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
  );
}
