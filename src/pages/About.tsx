import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Download, GraduationCap, Briefcase, Award, Code2,
  ArrowRight, CheckCircle2
} from 'lucide-react';
import { LinkedinIcon, GithubIcon, InstagramIcon, FacebookIcon } from '../components/SocialIcons';
import './About.css';

const skills = [
  { name: 'React.js / Frontend', pct: 90 },
  { name: 'WordPress Development', pct: 88 },
  { name: 'HTML5 / CSS3', pct: 95 },
  { name: 'JavaScript / TypeScript', pct: 85 },
  { name: 'Meta Ads & Marketing', pct: 82 },
  { name: 'UI/UX & Figma', pct: 78 },
  { name: 'Social Media Strategy', pct: 85 },
  { name: 'SEO Optimization', pct: 80 },
];

const journey = [
  {
    year: '2024 - Present',
    role: 'Senior Frontend Developer & Digital Marketing Consultant',
    org: 'Freelance',
    desc: 'Working with startups and businesses to deliver custom websites, WordPress solutions, Meta Ads campaigns, and comprehensive digital strategies.',
    type: 'work'
  },
  {
    year: '2022 - 2024',
    role: 'Frontend Developer & WordPress Specialist',
    org: 'Digital Agency',
    desc: 'Led frontend development for 30+ client projects. Specialized in responsive design, performance optimization, and WordPress theme customization.',
    type: 'work'
  },
  {
    year: '2021 - 2022',
    role: 'Social Media Manager & Content Strategist',
    org: 'Marketing Firm',
    desc: 'Managed social media profiles for 10+ brands, grew combined following by 200%, and ran high-ROI paid campaigns.',
    type: 'work'
  },
  {
    year: '2019 - 2022',
    role: 'Bachelor of Computer Applications (BCA)',
    org: 'University',
    desc: 'Gained a strong foundation in computer science, web technologies, programming, and digital communications.',
    type: 'education'
  },
];

const values = [
  'Clean, maintainable code', 'On-time delivery', 'Pixel-perfect design',
  'Data-driven decisions', 'Client-first approach', 'Continuous learning',
];

const socials = [
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/prince-ranjan-5ba3a0172/', label: 'LinkedIn', color: '#0a66c2' },
  { icon: GithubIcon, href: 'https://github.com/princeranjan', label: 'GitHub', color: '#e5e7eb' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/', label: 'Instagram', color: '#e1306c' },
  { icon: FacebookIcon, href: 'https://www.facebook.com/', label: 'Facebook', color: '#1877f2' },
];

const SkillBar: React.FC<{ name: string; pct: number; delay: number }> = ({ name, pct, delay }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setWidth(pct), delay * 100);
        obs.disconnect();
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct, delay]);

  return (
    <div ref={ref} className="skill-bar-item">
      <div className="skill-bar-header">
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-pct">{pct}%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
};

const About: React.FC = () => (
  <main className="about-page">
    <div className="page-header">
      <div className="glow-orb glow-orb-primary" style={{ width: 400, height: 400, top: -150, left: -100 }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="badge badge-primary" style={{ marginBottom: 20 }}>
          <Code2 size={12} /> About Me
        </div>
        <h1 className="display-1" style={{ marginBottom: 16 }}>
          The Story Behind <span className="text-gradient">the Code</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 600 }}>
          A journey of passion, persistence, and pixels from curious student to full-stack digital professional.
        </p>
      </div>
    </div>

    {/* Intro */}
    <section className="section">
      <div className="container about-intro-grid">
        <div className="about-visual animate-fadeInUp">
          <div className="about-avatar-card">
            <div className="about-avatar">
              <div className="avatar-initials" style={{ fontSize: '4rem' }}>PR</div>
            </div>
            <div className="about-avatar-badges">
              <div className="about-badge">
                <Code2 size={14} /> Frontend Dev
              </div>
              <div className="about-badge">
                <Briefcase size={14} /> 3+ Years
              </div>
              <div className="about-badge">
                <Award size={14} /> 50+ Projects
              </div>
            </div>
          </div>
          <div className="about-socials">
            {socials.map(({ icon: Icon, href, label, color }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="social-btn" aria-label={label}
                style={{ '--social-color': color } as React.CSSProperties}>
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="about-text animate-fadeInUp delay-2">
          <div className="badge badge-info" style={{ marginBottom: 16 }}>
            <Award size={12} /> My Story
          </div>
          <h2 className="heading-1" style={{ marginBottom: 20 }}>Who Am I?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.8 }}>
            Hi! I'm <strong style={{ color: 'var(--text-white)' }}>Prince Ranjan</strong>, a passionate Frontend Developer and Digital Marketing professional based in India. My journey began with a deep curiosity for how websites work that curiosity has since evolved into a full-time career building digital experiences that matter.
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.8 }}>
            Over the past <strong style={{ color: 'var(--color-primary)' }}>3+ years</strong>, I've had the privilege of working with startups, small businesses, and entrepreneurs, helping them establish and grow their online presence. I specialize in custom web development, WordPress, social media management, Meta Ads, and career mentoring.
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 28, lineHeight: 1.8 }}>
            Beyond code, I'm a believer in <strong style={{ color: 'var(--color-info)' }}>continuous learning</strong> and love mentoring young professionals who are finding their footing in the digital world. My goal is not just to deliver projects but to deliver <em>impact</em>.
          </p>

          <div className="values-grid">
            {values.map(v => (
              <div key={v} className="value-item">
                <CheckCircle2 size={16} color="var(--color-success)" />
                <span>{v}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-16" style={{ marginTop: 32 }}>
            <Link to="/contact" className="btn btn-primary">
              Work With Me <ArrowRight size={16} />
            </Link>
            <a href="mailto:princeranjan270@gmail.com" className="btn btn-outline">
              <Download size={16} /> Download CV
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* Skills */}
    <section className="section" style={{ background: 'rgba(22,24,31,0.4)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-label">Expertise</div>
          <h2 className="heading-1 section-title">Skills & Proficiency</h2>
          <p className="section-desc">A well-rounded mix of technical and marketing capabilities.</p>
        </div>
        <div className="skills-bars-grid">
          {skills.map(({ name, pct }, i) => (
            <SkillBar key={name} name={name} pct={pct} delay={i} />
          ))}
        </div>
      </div>
    </section>

    {/* Journey / Timeline */}
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-label">My Path</div>
          <h2 className="heading-1 section-title">Experience & Education</h2>
          <p className="section-desc">Every step of the journey has shaped who I am today.</p>
        </div>
        <div className="timeline" style={{ maxWidth: 720, margin: '0 auto' }}>
          {journey.map(({ year, role, org, desc, type }) => (
            <div key={role} className="timeline-item">
              <div className="timeline-dot" style={{
                background: type === 'education' ? 'var(--color-success)' : 'var(--color-primary)'
              }} />
              <div className="timeline-content">
                <div className="timeline-header">
                  <div>
                    <span className="badge" style={{
                      background: type === 'education' ? 'rgba(45,206,137,0.12)' : 'rgba(94,114,228,0.12)',
                      color: type === 'education' ? 'var(--color-success)' : 'var(--color-primary)',
                      border: `1px solid ${type === 'education' ? 'rgba(45,206,137,0.3)' : 'rgba(94,114,228,0.3)'}`,
                      marginBottom: 8
                    }}>
                      {type === 'education' ? <GraduationCap size={12} /> : <Briefcase size={12} />}
                      {type}
                    </span>
                    <h3 className="heading-2" style={{ marginBottom: 4 }}>{role}</h3>
                    <p style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem' }}>{org}</p>
                  </div>
                  <div className="timeline-year">{year}</div>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginTop: 12 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default About;
