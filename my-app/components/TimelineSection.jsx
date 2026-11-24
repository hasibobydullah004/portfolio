'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// The 4 phases and their exact schedules, deliverables, and team on duty
const timelinePhases = [
  {
    id: 'p1',
    num: '01',
    title: 'Discover',
    weeksLabel: 'W1–2',
    weeksSubtitle: 'STRATEGY BRIEF + SITEMAP',
    startWeek: 1,
    endWeek: 2,
    teamRoles: ['Strategist', 'Art director', 'Project lead'],
  },
  {
    id: 'p2',
    num: '02',
    title: 'Design',
    weeksLabel: 'W3–6',
    weeksSubtitle: 'FULL UI DESIGN + PROTOTYPE',
    startWeek: 3,
    endWeek: 6,
    teamRoles: ['Art director', 'Designers', 'Project lead'],
  },
  {
    id: 'p3',
    num: '03',
    title: 'Build',
    weeksLabel: 'W6–10',
    weeksSubtitle: 'STAGING SITE + CMS',
    startWeek: 6,
    endWeek: 10,
    teamRoles: ['Designers', 'Developers', 'QA', 'Project lead'],
  },
  {
    id: 'p4',
    num: '04',
    title: 'Launch',
    weeksLabel: 'W10–12',
    weeksSubtitle: 'LIVE SITE + HANDOVER',
    startWeek: 10,
    endWeek: 12,
    teamRoles: ['Developers', 'QA', 'Project lead'],
  },
];

const allTeamRoles = [
  'Strategist',
  'Art director',
  'Designers',
  'Developers',
  'QA',
  'Project lead',
];

const totalWeeks = 12;

export default function TimelineSection() {
  // Current playhead week: 1 to 12 (starts in auto-play mode)
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentDay, setCurrentDay] = useState(2);
  const [isPlaying, setIsPlaying] = useState(true); // Auto-play enabled by default!
  const [isDragging, setIsDragging] = useState(false);
  const gridTrackRef = useRef(null);

  // Auto-play timer: advances smoothly across the 12 weeks
  useEffect(() => {
    if (!isPlaying || isDragging) return;
    const interval = setInterval(() => {
      setCurrentWeek((prevW) => {
        if (prevW >= 12) return 1;
        return prevW + 1;
      });
      setCurrentDay((prevD) => (prevD >= 5 ? 1 : prevD + 1));
    }, 1800);
    return () => clearInterval(interval);
  }, [isPlaying, isDragging]);

  // Determine current active phase based on week
  const activePhase = timelinePhases.find((p) => currentWeek >= p.startWeek && currentWeek <= p.endWeek) || timelinePhases[0];

  // Dragging / Clicking on the grid playhead
  const handleSeek = useCallback((clientX) => {
    if (!gridTrackRef.current) return;
    const rect = gridTrackRef.current.getBoundingClientRect();
    const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const fraction = offsetX / rect.width;
    const week = Math.min(12, Math.max(1, Math.ceil(fraction * 12)));
    setCurrentWeek(week);
    setCurrentDay(Math.floor(Math.random() * 5) + 1);
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleSeek(e.clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        handleSeek(e.clientX);
      }
    };
    const handleMouseUp = () => {
      if (isDragging) setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleSeek]);

  // Calculate playhead position percentage (1-12 mapped across the columns)
  // Column 1 is 0% to 8.333%, playhead line sits on week column
  const playheadPercent = ((currentWeek - 0.5) / 12) * 100;

  return (
    <section className="sec pc alignfull" id="timeline" aria-labelledby="pc-title-5">
      <div className="container">
        {/* Header: Title left, Status Card right */}
        <div className="timeline-header-wrap">
          <div className="sh">
            <h2 className="section-title" id="pc-title-5">
              Twelve weeks, <br />
              <span className="italic">no surprises.</span>
            </h2>
          </div>

          {/* Top-Right "NOW PLAYING" Status Card */}
          <div className="timeline-now-playing-card">
            <div className="tnp-top-row">
              <span className="tnp-status-pill">
                NOW PLAYING{' '}
                <button
                  type="button"
                  className="tnp-play-toggle"
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? 'Pause timeline' : 'Play timeline'}
                >
                  {isPlaying ? '❚❚ PAUSE' : '▶ PLAY'}
                </button>
              </span>
              <span className="tnp-week-counter">
                W{String(currentWeek).padStart(2, '0')} / W12
              </span>
            </div>

            <div className="tnp-main-title">{activePhase.title}</div>
            <div className="tnp-team-roles">
              {activePhase.teamRoles.join(' · ')}
            </div>
          </div>
        </div>

        {/* Blueprint Interactive Gantt Board */}
        <div className="timeline-board-wrapper">
          {/* Main Board Container */}
          <div className="timeline-board">
            {/* Corner Bracket / Registration Marks */}
            <div className="board-corner corner-tl" />
            <div className="board-corner corner-tr" />
            <div className="board-corner corner-bl" />
            <div className="board-corner corner-br" />

            {/* Header Columns: "DRAG THE PLAYHEAD →" on left + W01 - W12 */}
            <div className="timeline-board-header">
              <div className="tbh-left-label">DRAG THE PLAYHEAD →</div>
              <div className="tbh-weeks-grid">
                {Array.from({ length: 12 }, (_, i) => {
                  const wNum = i + 1;
                  const isCurW = wNum === currentWeek;
                  return (
                    <div
                      key={wNum}
                      className={`tbh-week-col ${isCurW ? 'is-active-week' : ''}`}
                      onClick={() => {
                        setCurrentWeek(wNum);
                        setCurrentDay(Math.floor(Math.random() * 5) + 1);
                      }}
                    >
                      W{String(wNum).padStart(2, '0')}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* The 4 Phase Rows with Interactive Playhead Line */}
            <div
              className="timeline-board-body"
              ref={gridTrackRef}
              onMouseDown={handleMouseDown}
            >
              {/* Vertical Drafting Grid Lines for each Week */}
              <div className="timeline-vertical-grid" aria-hidden="true">
                <div className="tvg-left-col" />
                <div className="tvg-weeks-cols">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} className="tvg-col-line" />
                  ))}
                </div>
              </div>

              {/* The Vertical White Playhead Guideline & Badge */}
              <div
                className="timeline-playhead-line"
                style={{
                  left: `calc(160px + (100% - 160px) * ${playheadPercent / 100})`,
                }}
              >
                {/* Floating "NOW · W09 · DAY 3" Badge */}
                <div className="timeline-playhead-badge">
                  <span className="thb-now">NOW</span>
                  <span className="thb-dot">·</span>
                  <span className="thb-week">W{String(currentWeek).padStart(2, '0')}</span>
                  <span className="thb-dot">·</span>
                  <span className="thb-day">DAY {currentDay}</span>
                </div>
              </div>

              {/* Phase Rows (01 Discover, 02 Design, 03 Build, 04 Launch) */}
              <div className="timeline-rows-container">
                {timelinePhases.map((phase) => {
                  const isPhaseActive = phase.id === activePhase.id;
                  // Grid positioning: startWeek to (endWeek + 1)
                  const colStart = phase.startWeek;
                  const colSpan = phase.endWeek - phase.startWeek + 1;

                  return (
                    <div
                      key={phase.id}
                      className={`timeline-phase-row ${isPhaseActive ? 'is-row-active' : ''}`}
                    >
                      {/* Left Phase Label */}
                      <div className="tpr-label">
                        <span className="tpr-num">{phase.num}</span>
                        <span className="tpr-title">{phase.title}</span>
                      </div>

                      {/* Right Gantt Track Area */}
                      <div className="tpr-track-area">
                        <div
                          className={`tpr-gantt-bar ${isPhaseActive ? 'is-bar-white' : 'is-bar-dark'}`}
                          style={{
                            gridColumn: `${colStart} / span ${colSpan}`,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentWeek(phase.startWeek);
                          }}
                        >
                          <div className="tpr-bar-content">
                            <span className="tpr-bar-weeks">{phase.weeksLabel}</span>
                            <span className="tpr-bar-sub">{phase.weeksSubtitle}</span>
                          </div>

                          {/* Diamond / Arrow Indicator on the right edge */}
                          {isPhaseActive ? (
                            <div className="tpr-arrow-head" />
                          ) : (
                            <div className="tpr-diamond-node" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom "TEAM ON DUTY" Row */}
              <div className="timeline-team-row">
                <div className="ttr-label">TEAM ON DUTY</div>
                <div className="ttr-members-area">
                  {allTeamRoles.map((role) => {
                    const isDuty = activePhase.teamRoles.includes(role);
                    return (
                      <div
                        key={role}
                        className={`ttr-member-badge ${isDuty ? 'is-on-duty' : 'is-off-duty'}`}
                      >
                        <div className="ttr-member-dot" />
                        <span className="ttr-member-name">{role}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
