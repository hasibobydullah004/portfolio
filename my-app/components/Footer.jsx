'use client';

import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="ft site-footer" id="contact">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand Column */}
          <div>
            <h2 className="footer-brand-title">
              Design that works<br />
              <em className="italic" style={{ color: 'var(--accent-gold)' }}>in the dark.</em>
            </h2>
            <form onSubmit={handleSubmit} className="newsletter-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input"
                placeholder={submitted ? "We'll be in touch!" : "Your email address"}
                required
              />
              <button type="submit" className="btn-chat">
                {submitted ? 'Sent ✓' : "Let's chat"}
              </button>
            </form>
          </div>

          {/* Links: Design */}
          <div>
            <div className="footer-col-title">Design</div>
            <ul className="footer-links">
              <li><a href="#work">Artisan</a></li>
              <li><a href="#services">Decisions</a></li>
              <li><a href="#timeline">News</a></li>
              <li><a href="#numbers">Archive</a></li>
            </ul>
          </div>

          {/* Links: About */}
          <div>
            <div className="footer-col-title">About</div>
            <ul className="footer-links">
              <li><a href="#guarantees">Company</a></li>
              <li><a href="#timeline">Manifesto</a></li>
              <li><a href="#services">Careers</a></li>
              <li><a href="#pricing">Press Kit</a></li>
            </ul>
          </div>

          {/* Links: Connect */}
          <div>
            <div className="footer-col-title">Connect</div>
            <ul className="footer-links">
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter / X</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="mailto:hello@graphite.studio">hello@graphite.studio</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <span>© 2026 Graphite Studio. All rights reserved.</span>
          <a href="#" className="footer-url">www.graphite.studio</a>
          <a href="#contact" className="btn-contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
