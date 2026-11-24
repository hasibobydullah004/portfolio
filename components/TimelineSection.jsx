'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

const TOTAL_WEEKS = 12;
const DAYS_PER_WEEK = 5;
const LOOP_DURATION_MS = 18000; // ~1.5s per week

const TEAM_ROLES = [
  'Strategist',
  'Art director',
  'Designers',
  'Developers',
  'QA',
  'Project lead',
];

const PHASES = [
  {
    id: '01',
    name: 'Discover',
    rangeLabel: 'W1–2',
    deliverable: 'STRATEGY BRIEF + SITEMAP',
    startWeek: 0, // 0-indexed (W01 start)
    endWeek: 2,   // W02 end
    roles: ['Strategist', 'Art director', 'Project lead'],
  },
  {
    id: '02',
    name: 'Design',
    rangeLabel: 'W3–6',
    deliverable: 'FULL UI DESIGN + PROTOTYPE',
    startWeek: 2, // W03 start
    endWeek: 6,   // W06 end
    roles: ['Art director', 'Designers', 'Project lead'],
  },
  {
    id: '03',
    name: 'Build',
    rangeLabel: 'W6–10',
    deliverable: 'STAGING SITE + CMS',
    startWeek: 5,  // W06 start
    endWeek: 10,   // W10 end
    roles: ['Designers', 'Developers', 'QA', 'Project lead'],
  },
  {
    id: '04',
    name: 'Launch',
    rangeLabel: 'W10–12',
    deliverable: 'LIVE SITE + HANDOVER',
    startWeek: 9,  // W10 start
    endWeek: 12,   // W12 end
    roles: ['Developers', 'QA', 'Project lead'],
  },
];

const pad2 = (n) => String(n).padStart(2, '0');

export default function TimelineSection() {
  // progress in [0, 1] across the 12-week span
  const [progress, setProgress] = useState(0.065);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const trackRef = useRef(null);
  const lastTimeRef = useRef(null);
  const rafRef = useRef(null);

  // Smooth continuous playback
  useEffect(() => {
    if (!isPlaying || isDragging) {
      lastTimeRef.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const tick = (now) => {
      if (lastTimeRef.current != null) {
        const delta = now - lastTimeRef.current;
        setProgress((prev) => (prev + delta / LOOP_DURATION_MS) % 1);
      }
      lastTimeRef.current = now;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, isDragging]);

  // Scrub handler
  const updateProgressFromClientX = useCallback((clientX) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clamped = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setProgress(clamped);
  }, []);

  const handlePointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updateProgressFromClientX(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    updateProgressFromClientX(e.clientX);
  };

  const handlePointerUp = (e) => {
    if (isDragging) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      setIsDragging(false);
    }
  };

  // Derived timeline state
  const currentWeekFloat = progress * TOTAL_WEEKS; // 0 .. 12
  const currentWeekIndex = Math.min(TOTAL_WEEKS - 1, Math.floor(currentWeekFloat)); // 0 .. 11
  const currentWeekNum = currentWeekIndex + 1; // 1 .. 12
  const currentDayNum = Math.min(
    DAYS_PER_WEEK,
    Math.floor((currentWeekFloat - currentWeekIndex) * DAYS_PER_WEEK) + 1
  );

  // Active phases at current playhead position
  const activePhases = PHASES.filter(
    (p) => currentWeekFloat >= p.startWeek && currentWeekFloat < p.endWeek
  );
  const resolvedActivePhases =
    activePhases.length > 0 ? activePhases : [PHASES[PHASES.length - 1]];

  const activePhaseTitle = resolvedActivePhases.map((p) => p.name).join(' + ');

  const activeRoleSet = new Set(resolvedActivePhases.flatMap((p) => p.roles));
  const activeRolesOrdered = TEAM_ROLES.filter((role) => activeRoleSet.has(role));

  return (
    <section className="sec pc alignfull" id="timeline" aria-labelledby="pc-title-5">
      <div className="tw-root">
        <style>{`
          .tw-root {
            --bg: #17191d;
            --surface: #1e2025;
            --fg: #f4f2ee;
            --fg-muted: #7a7772;
            --fg-dim: #4c4a46;
            --border: rgba(244, 242, 238, 0.14);
            --border-strong: rgba(244, 242, 238, 0.24);
            --sidebar-w: 205px;

            width: 100%;
            background: transparent;
            color: var(--fg);
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            user-select: none;
            -webkit-font-smoothing: antialiased;
          }

          .tw-container {
            width: 100%;
            max-width: 1440px;
            margin: 0 auto;
          }

          /* Header */
          .tw-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            gap: 32px;
            margin-bottom: 44px;
          }

          .tw-title {
            margin: 0;
            line-height: 0.94;
            letter-spacing: -0.035em;
            font-size: clamp(44px, 5.2vw, 72px);
            font-weight: 700;
            color: var(--fg);
          }

          .tw-title-serif {
            display: block;
            font-family: var(--font-serif), 'Instrument Serif', Georgia, serif;
            font-style: italic;
            font-weight: 400;
            letter-spacing: -0.01em;
            font-size: clamp(48px, 5.6vw, 78px);
            margin-top: 2px;
          }

          /* Status Card */
          .tw-status-card {
            width: 390px;
            max-width: 100%;
            border: 1px solid var(--border-strong);
            background: #14161a;
            padding: 18px 22px 20px;
            box-sizing: border-box;
          }

          .tw-status-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-family: var(--font-mono), monospace;
            font-size: 11px;
            letter-spacing: 0.08em;
            margin-bottom: 14px;
          }

          .tw-status-controls {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .tw-now-playing {
            color: var(--fg-muted);
          }

          .tw-play-btn {
            background: none;
            border: 1px solid rgba(255, 255, 255, 0.25);
            padding: 2px 6px;
            margin: 0;
            color: var(--fg);
            font-family: var(--font-mono), monospace;
            font-size: 10px;
            letter-spacing: 0.08em;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            transition: all 0.15s ease;
          }

          .tw-play-btn:hover {
            background: #ffffff;
            color: #12151b;
            border-color: #ffffff;
          }

          .tw-week-counter {
            color: var(--fg-muted);
          }

          .tw-status-phase {
            font-size: 24px;
            font-weight: 600;
            letter-spacing: -0.02em;
            color: var(--fg);
            margin: 0 0 8px 0;
            line-height: 1.15;
          }

          .tw-status-roles {
            font-size: 12px;
            font-family: var(--font-serif), serif;
            font-style: italic;
            color: var(--fg-muted);
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          /* Main Grid Wrapper */
          .tw-grid-shell {
            position: relative;
            border: 1px solid var(--border);
            background: #17191d;
          }

          /* 4 Corner Registration Squares */
          .tw-corner {
            position: absolute;
            width: 5px;
            height: 5px;
            background: var(--fg);
            z-index: 15;
            pointer-events: none;
          }
          .tw-corner.tl { top: -3px; left: -3px; }
          .tw-corner.tr { top: -3px; right: -3px; }
          .tw-corner.bl { bottom: -3px; left: -3px; }
          .tw-corner.br { bottom: -3px; right: -3px; }

          /* Grid Layout: Left sidebar + Right 12-week interactive area */
          .tw-main-body {
            display: grid;
            grid-template-columns: var(--sidebar-w) 1fr;
            position: relative;
          }

          /* Sidebar */
          .tw-sidebar {
            border-right: 1px solid var(--border);
            display: flex;
            flex-direction: column;
          }

          .tw-sidebar-head {
            height: 44px;
            padding: 0 20px;
            display: flex;
            align-items: center;
            gap: 6px;
            border-bottom: 1px solid var(--border);
            font-family: var(--font-mono), monospace;
            font-size: 10px;
            letter-spacing: 0.08em;
            color: var(--fg-muted);
            box-sizing: border-box;
          }

          .tw-sidebar-row {
            height: 76px;
            padding: 0 20px;
            display: flex;
            align-items: center;
            gap: 14px;
            border-bottom: 1px solid var(--border);
            box-sizing: border-box;
            transition: color 0.2s ease;
          }

          .tw-sidebar-row:last-child {
            border-bottom: none;
          }

          .tw-phase-num {
            font-family: var(--font-serif), Georgia, serif;
            font-style: italic;
            font-size: 22px;
            color: var(--fg-dim);
            transition: color 0.2s ease;
            width: 22px;
          }

          .tw-phase-name {
            font-size: 20px;
            font-weight: 500;
            letter-spacing: -0.02em;
            color: var(--fg-dim);
            transition: color 0.2s ease;
          }

          .tw-sidebar-row.active .tw-phase-num,
          .tw-sidebar-row.active .tw-phase-name {
            color: var(--fg);
          }

          /* Interactive 12-Week Track */
          .tw-track-area {
            position: relative;
            cursor: ew-resize;
            touch-action: none;
          }

          /* Week Columns Header */
          .tw-weeks-header {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            height: 44px;
            border-bottom: 1px solid var(--border);
            box-sizing: border-box;
          }

          .tw-week-cell {
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: var(--font-mono), monospace;
            font-size: 11px;
            letter-spacing: 0.06em;
            color: var(--fg-dim);
            border-right: 1px solid rgba(244, 242, 238, 0.07);
            transition: color 0.15s ease;
            box-sizing: border-box;
          }

          .tw-week-cell:last-child {
            border-right: none;
          }

          .tw-week-cell.active {
            color: var(--fg);
            font-weight: 600;
          }

          /* Rows Container */
          .tw-rows-area {
            position: relative;
          }

          /* Vertical Week Gridlines */
          .tw-gridlines {
            position: absolute;
            inset: 0;
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            pointer-events: none;
          }

          .tw-gridline {
            border-right: 1px solid rgba(244, 242, 238, 0.07);
            height: 100%;
          }

          .tw-gridline:last-child {
            border-right: none;
          }

          /* Individual Phase Row */
          .tw-phase-row {
            position: relative;
            height: 76px;
            border-bottom: 1px solid var(--border);
            box-sizing: border-box;
            display: flex;
            align-items: center;
          }

          .tw-phase-row:last-child {
            border-bottom: none;
          }

          /* Chamfered Bar Wrapper (creates crisp 1px polygonal border) */
          .tw-bar-outer {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            height: 42px;
            background: rgba(244, 242, 238, 0.72);
            clip-path: polygon(
              0 0,
              calc(100% - 10px) 0,
              100% 50%,
              calc(100% - 10px) 100%,
              0 100%
            );
            box-sizing: border-box;
          }

          .tw-bar-inner {
            position: absolute;
            inset: 1px;
            background: #17191d;
            clip-path: polygon(
              0 0,
              calc(100% - 9.5px) 0,
              100% 50%,
              calc(100% - 9.5px) 100%,
              0 100%
            );
            overflow: hidden;
          }

          .tw-bar-layer {
            position: absolute;
            inset: 0;
            padding: 0 18px 0 12px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            white-space: nowrap;
            pointer-events: none;
          }

          .tw-bar-layer--base {
            background: #17191d;
            color: var(--fg);
          }

          .tw-bar-layer--fill {
            background: var(--fg);
            color: #181715;
            will-change: clip-path;
          }

          .tw-bar-range {
            font-size: 12px;
            font-weight: 700;
            letter-spacing: -0.01em;
            line-height: 1.15;
          }

          .tw-bar-sub {
            font-family: var(--font-mono), monospace;
            font-size: 8.5px;
            letter-spacing: 0.06em;
            opacity: 0.85;
            margin-top: 2px;
          }

          /* Playhead Line & Floating Badge */
          .tw-playhead {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 1.5px;
            background: var(--fg);
            z-index: 20;
            pointer-events: none;
            transform: translateX(-50%);
            will-change: left;
            box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
          }

          .tw-playhead-badge {
            position: absolute;
            top: 14px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--fg);
            color: #181715;
            font-family: var(--font-mono), monospace;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 0.06em;
            padding: 3px 8px;
            white-space: nowrap;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45);
            pointer-events: auto;
            cursor: ew-resize;
          }

          /* Footer Row: Team on Duty */
          .tw-footer {
            display: grid;
            grid-template-columns: var(--sidebar-w) 1fr;
            border-top: 1px solid var(--border);
            min-height: 60px;
          }

          .tw-footer-label {
            border-right: 1px solid var(--border);
            padding: 0 20px;
            display: flex;
            align-items: center;
            font-family: var(--font-mono), monospace;
            font-size: 10px;
            letter-spacing: 0.08em;
            color: var(--fg-muted);
            box-sizing: border-box;
          }

          .tw-team-list {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            align-items: center;
            padding: 0 24px;
            gap: 12px;
          }

          .tw-role-item {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-size: 13px;
            color: var(--fg-dim);
            transition: color 0.2s ease;
            white-space: nowrap;
          }

          .tw-role-item.active {
            color: var(--fg);
            font-weight: 500;
          }

          .tw-role-dot {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            border: 1px solid rgba(244, 242, 238, 0.22);
            background: transparent;
            flex-shrink: 0;
            transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
          }

          .tw-role-item.active .tw-role-dot {
            background: var(--fg);
            border-color: var(--fg);
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
          }

          /* Responsive adjustments */
          @media (max-width: 1024px) {
            .tw-root {
              --sidebar-w: 150px;
            }
            .tw-header {
              flex-direction: column;
              align-items: flex-start;
            }
            .tw-status-card {
              width: 100%;
            }
            .tw-team-list {
              grid-template-columns: repeat(3, 1fr);
              padding: 14px 18px;
            }
          }
        `}</style>

        <div className="tw-container">
          {/* Top Header */}
          <header className="tw-header">
            <h2 className="tw-title" id="pc-title-5">
              Twelve weeks,
              <span className="tw-title-serif">no surprises.</span>
            </h2>

            <div className="tw-status-card">
              <div className="tw-status-top">
                <div className="tw-status-controls">
                  <span className="tw-now-playing">NOW PLAYING</span>
                  <button
                    type="button"
                    className="tw-play-btn"
                    onClick={() => setIsPlaying((prev) => !prev)}
                    aria-label={isPlaying ? 'Pause timeline' : 'Play timeline'}
                  >
                    {isPlaying ? (
                      <>
                        <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor">
                          <rect x="0" y="0.5" width="2.4" height="9" />
                          <rect x="5" y="0.5" width="2.4" height="9" />
                        </svg>
                        PAUSE
                      </>
                    ) : (
                      <>
                        <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor">
                          <polygon points="0.5,0.5 7.5,5 0.5,9.5" />
                        </svg>
                        PLAY
                      </>
                    )}
                  </button>
                </div>
                <span className="tw-week-counter">
                  W{pad2(currentWeekNum)} / W{TOTAL_WEEKS}
                </span>
              </div>

              <div className="tw-status-phase">{activePhaseTitle}</div>
              <p className="tw-status-roles">{activeRolesOrdered.join(' · ')}</p>
            </div>
          </header>

          {/* Main Timeline Grid */}
          <section className="tw-grid-shell">
            <span className="tw-corner tl" />
            <span className="tw-corner tr" />
            <span className="tw-corner bl" />
            <span className="tw-corner br" />

            <div className="tw-main-body">
              {/* Left Sidebar */}
              <div className="tw-sidebar">
                <div className="tw-sidebar-head">
                  <span>DRAG THE PLAYHEAD</span>
                  <span>↘</span>
                </div>

                {PHASES.map((phase) => {
                  const isActive = resolvedActivePhases.some((p) => p.id === phase.id);
                  return (
                    <div
                      key={phase.id}
                      className={`tw-sidebar-row ${isActive ? 'active' : ''}`}
                    >
                      <span className="tw-phase-num">{phase.id}</span>
                      <span className="tw-phase-name">{phase.name}</span>
                    </div>
                  );
                })}
              </div>

              {/* Right Interactive 12-Week Area */}
              <div
                ref={trackRef}
                className="tw-track-area"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              >
                {/* Playhead Line & Floating Badge */}
                <div
                  className="tw-playhead"
                  style={{ left: `${progress * 100}%` }}
                >
                  <div className="tw-playhead-badge">
                    NOW · W{pad2(currentWeekNum)} · DAY {currentDayNum}
                  </div>
                </div>

                {/* Week Numbers Header */}
                <div className="tw-weeks-header">
                  {Array.from({ length: TOTAL_WEEKS }, (_, idx) => (
                    <div
                      key={idx}
                      className={`tw-week-cell ${idx === currentWeekIndex ? 'active' : ''}`}
                    >
                      W{pad2(idx + 1)}
                    </div>
                  ))}
                </div>

                {/* Phase Rows + Bars */}
                <div className="tw-rows-area">
                  <div className="tw-gridlines">
                    {Array.from({ length: TOTAL_WEEKS }, (_, idx) => (
                      <div key={idx} className="tw-gridline" />
                    ))}
                  </div>

                  {PHASES.map((phase) => {
                    const leftPct = (phase.startWeek / TOTAL_WEEKS) * 100;
                    const widthPct = ((phase.endWeek - phase.startWeek) / TOTAL_WEEKS) * 100;

                    // Compute fill percentage of this specific bar relative to playhead
                    const barDuration = phase.endWeek - phase.startWeek;
                    const barFillRatio = Math.max(
                      0,
                      Math.min(1, (currentWeekFloat - phase.startWeek) / barDuration)
                    );
                    const clipRightPct = (1 - barFillRatio) * 100;

                    return (
                      <div key={phase.id} className="tw-phase-row">
                        <div
                          className="tw-bar-outer"
                          style={{
                            left: `${leftPct}%`,
                            width: `${widthPct}%`,
                          }}
                        >
                          <div className="tw-bar-inner">
                            {/* Unfilled dark layer (white text) */}
                            <div className="tw-bar-layer tw-bar-layer--base">
                              <span className="tw-bar-range">{phase.rangeLabel}</span>
                              <span className="tw-bar-sub">{phase.deliverable}</span>
                            </div>

                            {/* Filled white layer (dark text), clipped to exact playhead position */}
                            <div
                              className="tw-bar-layer tw-bar-layer--fill"
                              style={{
                                clipPath: `inset(0 ${clipRightPct}% 0 0)`,
                              }}
                            >
                              <span className="tw-bar-range">{phase.rangeLabel}</span>
                              <span className="tw-bar-sub">{phase.deliverable}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer: Team on Duty */}
            <footer className="tw-footer">
              <div className="tw-footer-label">TEAM ON DUTY</div>
              <div className="tw-team-list">
                {TEAM_ROLES.map((role) => {
                  const isActive = activeRoleSet.has(role);
                  return (
                    <div
                      key={role}
                      className={`tw-role-item ${isActive ? 'active' : ''}`}
                    >
                      <span className="tw-role-dot" />
                      <span>{role}</span>
                    </div>
                  );
                })}
              </div>
            </footer>
          </section>
        </div>
      </div>
    </section>
  );
}
