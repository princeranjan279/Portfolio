import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, BookOpen, PlayCircle, ExternalLink,
  Zap, MessageSquare, ChevronLeft,
} from 'lucide-react';
import { skillsById, skillGroups } from '../data/skills';
import './SkillDetail.css';

const SkillDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const entry = id ? skillsById[id] : undefined;

  if (!entry) {
    return (
      <div className="sd-page">
        <div className="sd-not-found">
          <span style={{ fontSize: '4rem' }}>🔍</span>
          <h2 style={{ color: '#fff', margin: 0 }}>Skill not found</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            This skill doesn't exist or may have moved.
          </p>
          <button className="sd-back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={16} /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  const { name, icon: Icon, level, shortDesc, lessons, youtubeVideoId, groupColor, groupName, color } = entry;
  const accentColor = groupColor || color || '#6366f1';

  const ytEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1`;
  const ytWatchUrl = `https://www.youtube.com/watch?v=${youtubeVideoId}`;

  return (
    <main className="sd-page">
      {/* ── Hero ─────────────────────────────── */}
      <section className="sd-hero">
        <div className="sd-hero-bg">
          <div className="sd-hero-glow" style={{ background: accentColor }} />
          <div className="sd-hero-grid" />
        </div>
        <div className="container sd-hero-inner">
          <button className="sd-back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={16} /> Back
          </button>

          <div className="sd-hero-head">
            <div
              className="sd-hero-icon"
              style={{ background: `${accentColor}22`, border: `1.5px solid ${accentColor}55` }}
            >
              <Icon size={34} style={{ color: accentColor }} />
            </div>
            <div className="sd-hero-meta">
              <span className="sd-hero-level" style={{ background: `${accentColor}22`, color: accentColor }}>
                <Zap size={12} /> {level}
              </span>
              <h1 className="sd-hero-title">{name}</h1>
              <p className="sd-hero-group">{groupName}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ──────────────────────────── */}
      <section className="sd-content">
        <div className="container">
          <div className="sd-grid">
            {/* Left – Lessons */}
            <div>
              <div className="sd-card">
                <div className="sd-section-label">
                  <BookOpen size={14} style={{ color: accentColor }} />
                  Lesson Plan · {lessons.length} Modules
                </div>
                <div className="sd-lessons">
                  {lessons.map((lesson, i) => (
                    <div key={i} className="sd-lesson">
                      <div
                        className="sd-lesson-num"
                        style={{ background: `${accentColor}22`, color: accentColor }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div className="sd-lesson-body">
                        <h3 className="sd-lesson-title">{lesson.title}</h3>
                        <p className="sd-lesson-desc">{lesson.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right – Video + CTA */}
            <div className="sd-right">
              {/* Video embed */}
              <div className="sd-card">
                <div className="sd-section-label">
                  <PlayCircle size={14} style={{ color: '#ff0000' }} />
                  Recommended Tutorial
                </div>
                <div className="sd-video-wrap">
                  <iframe
                    src={ytEmbedUrl}
                    title={`${name} Tutorial`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="sd-video-label">
                  <PlayCircle size={13} style={{ color: '#ff0000' }} />
                  Embedded from YouTube — opens in this page
                </div>
              </div>

              {/* About */}
              <div className="sd-card">
                <div className="sd-section-label">
                  <MessageSquare size={14} style={{ color: accentColor }} />
                  Overview
                </div>
                <p className="sd-about-desc">{shortDesc}</p>
              </div>

              {/* CTAs */}
              <div className="sd-cta">
                <a
                  href={ytWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sd-cta-btn"
                  style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)` }}
                >
                  <PlayCircle size={18} /> Watch on YouTube <ExternalLink size={14} />
                </a>
                <Link to="/contact" className="sd-cta-btn sd-cta-btn-outline">
                  <MessageSquare size={16} /> Book a Free Mentorship Session
                </Link>
              </div>

              {/* Other skills */}
              <div className="sd-card">
                <div className="sd-section-label" style={{ marginBottom: 14 }}>
                  <Zap size={14} style={{ color: accentColor }} />
                  Explore Other Skills
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {skillGroups
                    .flatMap(g => g.skills)
                    .filter(s => s.id !== id)
                    .slice(0, 8)
                    .map(s => (
                      <Link
                        key={s.id}
                        to={`/skills/${s.id}`}
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          padding: '5px 12px',
                          borderRadius: '20px',
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'rgba(255,255,255,0.75)',
                          textDecoration: 'none',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => {
                          (e.target as HTMLElement).style.background = `${accentColor}22`;
                          (e.target as HTMLElement).style.color = accentColor;
                          (e.target as HTMLElement).style.borderColor = `${accentColor}55`;
                        }}
                        onMouseLeave={e => {
                          (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                          (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.75)';
                          (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                        }}
                      >
                        {s.name}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SkillDetail;
