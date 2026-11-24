const testimonials = [
  {
    quote: '"Creative Hub transformed our entire web presence into a museum-grade experience."',
    author: 'Elena Rostova — Vondur Art',
    tileClass: 'tile-teal',
  },
  {
    quote: '"Delivered on time, under budget, and beyond what we envisioned."',
    author: 'Julian Vance — Atelier Noir',
    tileClass: 'tile-mauve',
  },
  {
    quote: '"The 12-week roadmap was followed to the exact day. Unbelievable precision."',
    author: 'Claire Chen — Sora Audio',
    tileClass: 'tile-ochre',
  },
  {
    quote: '"Our conversion jumped 42% in the first two weeks following the rebrand."',
    author: 'Marcus Brody — Terracotta Co.',
    tileClass: 'tile-coral',
  },
  {
    quote: '"A rare team that understands both high-fashion aesthetics and technical scale."',
    author: 'Sophie Lindholm — Nordic Minimal',
    tileClass: 'tile-indigo',
  },
  {
    quote: '"Hands down the smoothest design agency collaboration we\'ve ever experienced."',
    author: 'David Miller — TEA Publishing',
    tileClass: 'tile-sage',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">In their words.</h2>
        </div>

        <div className="testimonials-layout">
          {/* Rating Summary Card */}
          <div className="rating-summary-card">
            <div className="rating-big">4.9</div>
            <div className="rating-stars" aria-label="5 stars rating">★★★★★</div>
            <div className="rating-sub">Based on 120+ client reviews across 12 countries</div>
          </div>

          {/* Testimonials 6-Card Grid */}
          <div className="testimonials-grid">
            {testimonials.map((t, idx) => (
              <div key={idx} className={`testimonial-tile ${t.tileClass}`}>
                <p className="testimonial-quote">{t.quote}</p>
                <span className="testimonial-author">{t.author}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

