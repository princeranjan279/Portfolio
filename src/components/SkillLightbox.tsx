import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, BookOpen, Zap } from 'lucide-react';
import type { Skill } from '../data/skills';
import './SkillLightbox.css';

interface Props {
  skill: Skill | null;
  groupColor: string;
  onClose: () => void;
}

const SkillLightbox: React.FC<Props> = ({ skill, groupColor, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!skill) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [skill, onClose]);

  if (!skill) return null;

  const Icon = skill.icon;
  const color = groupColor || skill.color || '#6366f1';

  const handleLearnMore = () => {
    onClose();
    navigate(`/skills/${skill.id}`);
  };

  return (
    <div className="sl-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="sl-modal" onClick={e => e.stopPropagation()}>
        {/* Glow */}
        <div className="sl-glow" style={{ background: color }} />

        {/* Close */}
        <button className="sl-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        {/* Header */}
        <div className="sl-header">
          <div className="sl-icon-wrap" style={{ background: `${color}22`, border: `1.5px solid ${color}55` }}>
            <Icon size={28} style={{ color }} />
          </div>
          <div>
            <span className="sl-level-badge" style={{ background: `${color}22`, color }}>
              <Zap size={11} /> {skill.level}
            </span>
            <h3 className="sl-skill-name">{skill.name}</h3>
          </div>
        </div>

        {/* Short description */}
        <p className="sl-desc">{skill.shortDesc}</p>

        {/* Quick preview of lessons */}
        <div className="sl-lessons-preview">
          <div className="sl-lessons-title">
            <BookOpen size={14} style={{ color }} /> What You'll Learn
          </div>
          <ul className="sl-lesson-list">
            {skill.lessons.slice(0, 3).map((l, i) => (
              <li key={i} className="sl-lesson-item">
                <span className="sl-lesson-dot" style={{ background: color }} />
                {l.title}
              </li>
            ))}
            {skill.lessons.length > 3 && (
              <li className="sl-lesson-more">+ {skill.lessons.length - 3} more lessons…</li>
            )}
          </ul>
        </div>

        {/* CTA */}
        <button
          className="sl-learn-btn"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}
          onClick={handleLearnMore}
        >
          Full Lesson Guide <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default SkillLightbox;
