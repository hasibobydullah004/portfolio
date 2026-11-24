export default function Hero() {
  return (
    <header className="hd hd--studio">
      {/* Top Navigation Bar from Theme */}
      <div className="container">
        <nav className="site-nav-bar">
          <div className="nav-logo">
            <a href="#">Graphite<span style={{ color: 'var(--accent-gold)' }}>.</span></a>
          </div>

          <div className="nav-links-center">
            <a href="#services" className="nav-link">Crafts</a>
            <a href="#work" className="nav-link">Selected Work</a>
            <a href="#timeline" className="nav-link">Process</a>
            <a href="#guarantees" className="nav-link">Promises</a>
            <a href="#pricing" className="nav-link">Estimator</a>
            <a href="#testimonials" className="nav-link">Words</a>
          </div>

          <div className="nav-actions">
            <span className="nav-meta-badge">( NYC · EST. 2012 )</span>
            <a href="#contact" className="nav-contact-btn">
              Contact
            </a>
          </div>
        </nav>
      </div>

      {/* Flat-lay desk objects with warm studio tones */}
      <div className="desk-canvas" aria-hidden="true">
        <div className="item-green-book" />
        <div className="item-open-book" />
        <div className="item-coffee" />
        <div className="item-pencil" />
        <div className="item-glasses">
          <div className="glass-rim" />
          <div className="glass-bridge" />
          <div className="glass-rim" />
        </div>
        <div className="item-journal" />
        <div className="item-tablet">
          <div className="tablet-screen" />
        </div>
        <div className="item-small-pad" />
        <div className="item-pen-gold" />
        <div className="item-mouse" />
      </div>

      {/* Hero Typography Matching Theme & Creative Hub */}
      <div className="hero-content">
        <div className="mono hd-meta-tags">
          <span>( WEB STUDIO )</span>
          <span>·</span>
          <span>NEW YORK</span>
          <span>·</span>
          <span>EST. 2012</span>
        </div>

        <h1 className="hero-title">
          Graphite<span style={{ color: 'var(--accent-gold)' }}>.</span>
        </h1>
        
        <p className="hero-tagline">
          Calm websites, <span className="italic">sharply made in color.</span>
        </p>

        <div style={{ marginTop: '1.25rem' }}>
          <a href="#work" className="hero-cta-btn">
            View selected work →
          </a>
        </div>
      </div>

      {/* Center Laptop Mockup with warm amber display */}
      <div className="hero-laptop" aria-hidden="true">
        <div className="laptop-screen-frame">
          <div className="laptop-display" />
        </div>
        <div className="laptop-base">
          <div className="laptop-notch" />
        </div>
      </div>
    </header>
  );
}
