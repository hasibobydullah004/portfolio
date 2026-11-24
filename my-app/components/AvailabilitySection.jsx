'use client';

import { useState } from 'react';

const months = [
  { name: 'November', badge: '1 Slot Left' },
  { name: 'December', badge: 'Booking Open' },
  { name: 'January', badge: 'Booking Open' },
  { name: 'February', badge: '3 Slots Open' },
  { name: 'March', badge: 'Booking Open' },
  { name: 'April', badge: 'Inquire' },
];

export default function AvailabilitySection() {
  const [selectedMonth, setSelectedMonth] = useState('November');

  return (
    <section className="section" id="availability">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Next start: <span className="italic">{selectedMonth}</span>
          </h2>
        </div>

        <div className="months-selector">
          {months.map((m) => {
            const isActive = selectedMonth === m.name;
            return (
              <button
                key={m.name}
                type="button"
                className={`month-btn ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedMonth(m.name)}
              >
                <span>{m.name}</span>
                <span className="slot-badge">{m.badge}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

