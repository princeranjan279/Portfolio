import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Download, GraduationCap, Briefcase, Award, Code2,
  ArrowRight, CheckCircle2, MapPin, Mail, Star,
  TrendingUp, Users, Globe, Sparkles, Layers,
  Search, Cpu, BarChart2, BookOpen
} from 'lucide-react';
import { LinkedinIcon, GithubIcon, InstagramIcon, FacebookIcon } from '../components/SocialIcons';
import './About.css';

/* ── Static Data ────────────────────────────── */
const stats = [
  { value: '3+',   label: 'Years Experience', icon: Star },
  { value: '50+',  label: 'Projects Delivered', icon: Briefcase },
  { value: '30+',  label: 'Happy Clients', icon: Users },
  { value: '100%', label: 'Satisfaction Rate', icon: Award },
];

const skills = [
  { name: 'React.js / Frontend Development',   pct: 90, color: '#6366f1' },
  { name: 'WordPress & CMS Development',        pct: 88, color: '#06b6d4' },
  { name: 'HTML5 / CSS3 / JavaScript',          pct: 95, color: '#6366f1' },
  { name: 'SEO & AI-Driven GEO Optimization',   pct: 85, color: '#06b6d4' },
  { name: 'Meta Ads & Paid Campaigns',          pct: 82, color: '#6366f1' },
  { name: 'Social Media Management',            pct: 87, color: '#06b6d4' },
  { name: 'Website Management & Optimization',  pct: 88, color: '#6366f1' },
  { name: 'UI/UX Design & Figma',               pct: 76, color: '#06b6d4' },
];

const techStack = [
  'React.js', 'TypeScript', 'JavaScript', 'HTML5 / CSS3',
  'WordPress', 'Elementor', 'Figma', 'Canva',
  'Meta Ads', 'Google Ads', 'SEO / GEO', 'AI SEO Tools',
  'Git / GitHub', 'Tailwind CSS', 'Node.js',
];

/* Research-based accurate professional journey */
const journey = [
  {
    year: '2024 – Present',
    role: 'Software Developer & SEO Expert',
    org: 'Prishal Technolabs Private Limited',
    location: 'Patna, Bihar, India',
    desc: 'Leading end-to-end software development and SEO at Prishal Technolabs — a fast-growing AI solutions & digital marketing company in Patna. Responsible for website development (React & WordPress), AI-driven SEO strategy, GEO (Generative Engine Optimization) improvements, and complete website management & optimization. Also serving as Digital Marketing Subject Matter Expert (SME) and actively mentoring junior developers on the team.',
    type: 'work',
    highlights: ['React & WordPress Dev', 'AI SEO & GEO', 'Website Management', 'Team Mentorship', 'SME – Digital Marketing']
  },
  {
    year: '2023 – 2024',
    role: 'Freelance Frontend Developer & Digital Marketing Consultant',
    org: 'Self-Employed',
    location: 'Remote · India & International',
    desc: 'Delivered custom websites, WordPress solutions, social media campaigns, and Meta Ads strategies for clients across India, the US, UK, and UAE. Specialized in responsive design, landing page conversion optimization, and social media brand building. Provided career advisory to fresh graduates entering the digital industry.',
    type: 'work',
    highlights: ['30+ Clients', 'Meta Ads Campaigns', 'Career Advisory', 'Remote Worldwide']
  },
  {
    year: '2022 – 2023',
    role: 'Social Media Manager & Content Strategist',
    org: 'Marketing Agency',
    location: 'India',
    desc: 'Managed social media presence for multiple brands on Instagram, Facebook, and LinkedIn. Grew combined follower count by 200%+, ran high-ROAS paid campaigns, and built data-driven content calendars. Collaborated with design and sales teams to align content with business goals.',
    type: 'work',
    highlights: ['10+ Brand Accounts', '200%+ Follower Growth', 'High-ROAS Campaigns', 'Content Strategy']
  },
  {
    year: '2019 – 2022',
    role: 'Engineering / Technology Degree',
    org: 'Bihar Engineering University',
    location: 'Patna, Bihar, India',
    desc: 'Graduated from Bihar Engineering University, Patna — building a strong technical foundation in computer science, software engineering, web technologies, and database management. Began freelancing and building real-world web projects during the final year, bridging academics with industry.',
    type: 'education',
    highlights: ['Bihar Engineering University', 'Computer Science', 'Web Technologies', 'Freelancing Started']
  },
];

const expertise = [
  {
    icon: Code2,
    title: 'Software Development',
    desc: 'Building responsive, performant web apps with React.js, WordPress, HTML/CSS/JS. Full development lifecycle from planning to deployment.',
    color: '#6366f1',
  },
  {
    icon: Search,
    title: 'SEO & GEO Optimization',
    desc: 'AI-driven SEO strategies, Generative Engine Optimization (GEO), technical audits, on-page/off-page SEO, and long-term organic growth.',
    color: '#06b6d4',
  },
  {
    icon: BarChart2,
    title: 'Meta Ads & Paid Marketing',
    desc: 'Running high-ROI Meta Ads campaigns (Facebook & Instagram), Google Ads, audience targeting, A/B testing, and ROAS optimization.',
    color: '#10b981',
  },
  {
    icon: Users,
    title: 'Social Media Management',
    desc: 'End-to-end brand presence management across LinkedIn, Instagram, and Facebook. Content calendars, community building, and growth strategy.',
    color: '#f59e0b',
  },
  {
    icon: Cpu,
    title: 'AI Integration & Tools',
    desc: 'Leveraging AI in development workflows — from AI-assisted coding and code reviews to GEO content strategies that rank on AI search engines.',
    color: '#8b5cf6',
  },
  {
    icon: BookOpen,
    title: 'Career Advisory & Mentorship',
    desc: 'Actively mentoring junior developers and fresh graduates. Helping young professionals navigate tech careers, skill-building, and job readiness.',
    color: '#ec4899',
  },
];

const values = [
  { text: 'Clean, maintainable code',   icon: Code2 },
  { text: 'On-time delivery always',    icon: CheckCircle2 },
  { text: 'Pixel-perfect design',       icon: Layers },
  { text: 'Data-driven decisions',      icon: TrendingUp },
  { text: 'Client-first approach',      icon: Users },
  { text: 'AI & continuous learning',   icon: Sparkles },
  { text: 'Remote-first, global work',  icon: Globe },
  { text: 'Transparent communication',  icon: Mail },
];

const socials = [
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/prince-ranjan-5ba3a0172/', label: 'LinkedIn',  color: '#0a66c2' },
  { icon: GithubIcon,   href: 'https://github.com/princeranjan279',                   label: 'GitHub',    color: '#a5b4fc' },
  { icon: InstagramIcon,href: 'https://www.instagram.com/',                            label: 'Instagram', color: '#e1306c' },
  { icon: FacebookIcon, href: 'https://www.facebook.com/',                             label: 'Facebook',  color: '#1877f2' },
];

/* ── Animated Skill Bar ─────────────────────── */
const SkillBar: React.FC<{ name: string; pct: number; delay: number; color: string }> = ({ name, pct, delay, color }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setWidth(pct), delay * 120);
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
        <span className="skill-bar-pct" style={{ color }}>{pct}%</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}, ${color === '#6366f1' ? '#06b6d4' : '#6366f1'})`,
          }}
        />
      </div>
    </div>
  );
};

/* ── Page Component ─────────────────────────── */
const About: React.FC = () => (
  <main className="about-page">

    {/* Page Header */}
    <div className="page-header">
      <div className="glow-orb glow-orb-primary" style={{ width: 500, height: 400, top: -150, left: -80 }} />
      <div className="glow-orb" style={{ width: 300, height: 300, top: -50, right: '10%', background: 'rgba(6,182,212,0.12)', filter: 'blur(80px)' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="badge badge-primary" style={{ marginBottom: 20 }}>
          <Code2 size={12} /> About Me
        </div>
        <h1 className="display-1" style={{ marginBottom: 16 }}>
          The Story Behind <span className="text-gradient">the Code</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 620 }}>
          From Bihar Engineering University to building AI-driven websites & SEO strategies — a developer, marketer, and mentor on a mission to create digital impact.
        </p>
      </div>
    </div>

    {/* Intro */}
    <section className="section">
      <div className="container about-intro-grid">

        {/* Left: Profile Card */}
        <div className="about-visual animate-fadeInUp">
          <div className="about-avatar-card">
            <div className="about-avatar-wrap">
              <div className="about-avatar">
                <div className="avatar-initials" style={{ fontSize: '3.5rem' }}>PR</div>
              </div>
              <div className="about-avail-dot" title="Available for work" />
            </div>

            <h3 className="about-name">Prince Ranjan</h3>
            <p className="about-title-tag">Software Developer · SEO Expert · Digital Marketing SME</p>

            <div className="about-location">
              <MapPin size={13} /> Patna, Bihar, India &nbsp;·&nbsp; <Globe size={13} /> Remote Worldwide
            </div>

            <div className="about-company-badge">
              <Cpu size={13} />
              <span>Prishal Technolabs Pvt. Ltd.</span>
            </div>

            <div className="about-mini-stats">
              {stats.map(({ value, label, icon: Icon }) => (
                <div key={label} className="about-mini-stat">
                  <div className="about-mini-stat-icon"><Icon size={14} /></div>
                  <p className="about-mini-stat-value">{value}</p>
                  <p className="about-mini-stat-label">{label}</p>
                </div>
              ))}
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

            <a href="mailto:princeranjan270@gmail.com" className="about-email-chip">
              <Mail size={13} /> princeranjan270@gmail.com
            </a>
          </div>
        </div>

        {/* Right: Bio */}
        <div className="about-text animate-fadeInUp delay-2">
          <div className="badge badge-info" style={{ marginBottom: 16 }}>
            <Award size={12} /> My Story
          </div>
          <h2 className="heading-1" style={{ marginBottom: 20 }}>Who Am I?</h2>

          <p style={{ color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.85 }}>
            Hi! I'm <strong style={{ color: 'var(--text-primary)' }}>Prince Ranjan</strong>, a
            <strong style={{ color: 'var(--color-primary)' }}> Software Developer</strong> and
            <strong style={{ color: 'var(--color-info)' }}> SEO Expert</strong> based in Patna, Bihar. Currently working at
            <strong style={{ color: 'var(--text-primary)' }}> Prishal Technolabs Pvt. Ltd.</strong> — one of Bihar's emerging AI & software companies — where I lead web development, AI-driven SEO strategy, and digital marketing as a Subject Matter Expert (SME).
          </p>

          <p style={{ color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.85 }}>
            I graduated from <strong style={{ color: 'var(--text-primary)' }}>Bihar Engineering University, Patna</strong> and have since built a career spanning
            <strong style={{ color: 'var(--color-primary)' }}> React.js & WordPress development</strong>,
            <strong style={{ color: 'var(--color-info)' }}> AI-driven SEO & GEO optimization</strong>,
            <strong style={{ color: 'var(--color-success)' }}> Meta Ads campaigns</strong>, and
            end-to-end <strong style={{ color: 'var(--text-primary)' }}>website management & optimization</strong>. I also actively mentor junior developers and guide fresh graduates toward successful tech careers.
          </p>

          <p style={{ color: 'var(--text-secondary)', marginBottom: 28, lineHeight: 1.85 }}>
            I'm passionate about the intersection of <em style={{ color: 'var(--color-primary)' }}>clean code</em> and <em style={{ color: 'var(--color-info)' }}>AI-powered marketing</em>. Whether it's building a fast, accessible website, running a high-ROAS ad campaign, or helping someone navigate their digital career — my goal is always to create <strong style={{ color: 'var(--text-primary)' }}>measurable impact</strong>, not just deliverables.
          </p>

          <div className="values-grid">
            {values.map(({ text, icon: Icon }) => (
              <div key={text} className="value-item">
                <Icon size={15} color="var(--color-success)" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-16" style={{ marginTop: 32, flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary">
              Work With Me <ArrowRight size={16} />
            </Link>
            <a href="https://www.linkedin.com/in/prince-ranjan-5ba3a0172/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <LinkedinIcon size={16} /> LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* Expertise Cards */}
    <section className="section about-expertise-section">
      <div className="container">
        <div className="section-header">
          <div className="section-label">What I Do</div>
          <h2 className="heading-1 section-title">Areas of Expertise</h2>
          <p className="section-desc">A rare combination of software development, AI-powered SEO, and digital marketing under one roof.</p>
        </div>
        <div className="expertise-grid">
          {expertise.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="expertise-card" style={{ '--expertise-color': color } as React.CSSProperties}>
              <div className="expertise-icon" style={{ background: `${color}18`, color }}>
                <Icon size={22} />
              </div>
              <h3 className="expertise-title">{title}</h3>
              <p className="expertise-desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Tech Stack */}
    <section className="section about-tech-section">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Tools & Technologies</div>
          <h2 className="heading-1 section-title">My Tech Stack</h2>
          <p className="section-desc">Technologies and platforms I work with daily to build, market, and grow.</p>
        </div>
        <div className="tech-pills">
          {techStack.map(tech => (
            <span key={tech} className="tech-pill">{tech}</span>
          ))}
        </div>
      </div>
    </section>

    {/* Skills */}
    <section className="section about-skills-section">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Proficiency</div>
          <h2 className="heading-1 section-title">Skills & Proficiency</h2>
          <p className="section-desc">Skill levels based on real-world project experience and client delivery.</p>
        </div>
        <div className="skills-bars-grid">
          {skills.map(({ name, pct, color }, i) => (
            <SkillBar key={name} name={name} pct={pct} delay={i} color={color} />
          ))}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-label">My Path</div>
          <h2 className="heading-1 section-title">Experience & Education</h2>
          <p className="section-desc">Every step of the journey has shaped who I am today.</p>
        </div>
        <div className="timeline" style={{ maxWidth: 800, margin: '0 auto' }}>
          {journey.map(({ year, role, org, location, desc, type, highlights }) => (
            <div key={role} className="timeline-item">
              <div className="timeline-dot" style={{
                background: type === 'education' ? 'var(--color-success)' : 'var(--color-primary)',
                boxShadow: `0 0 14px ${type === 'education' ? 'rgba(16,185,129,0.55)' : 'rgba(99,102,241,0.55)'}`
              }} />
              <div className="timeline-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                  <span className="badge" style={{
                    background: type === 'education' ? 'rgba(16,185,129,0.12)' : 'rgba(99,102,241,0.12)',
                    color: type === 'education' ? 'var(--color-success)' : 'var(--color-primary)',
                    border: `1px solid ${type === 'education' ? 'rgba(16,185,129,0.3)' : 'rgba(99,102,241,0.3)'}`,
                  }}>
                    {type === 'education' ? <GraduationCap size={12} /> : <Briefcase size={12} />}
                    {type === 'education' ? 'Education' : 'Work'}
                  </span>
                  <span className="timeline-year">{year}</span>
                </div>

                <h3 className="heading-2" style={{ marginBottom: 4 }}>{role}</h3>
                <p style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.92rem', marginBottom: 4 }}>{org}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 12 }}>
                  <MapPin size={11} /> {location}
                </p>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.78, marginBottom: 14 }}>{desc}</p>

                <div className="timeline-highlights">
                  {highlights.map(h => (
                    <span key={h} className="timeline-highlight-tag">{h}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Banner */}
    <section className="about-cta-section">
      <div className="container about-cta-inner">
        <div className="about-cta-glow" />
        <div className="about-cta-content">
          <h2 className="heading-1" style={{ marginBottom: 12 }}>
            Let's Build Something <span className="text-gradient">Great Together</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 520, lineHeight: 1.7 }}>
            Whether you need a website, AI-powered SEO, a digital strategy, or career guidance — I'm here to help you move forward.
          </p>
        </div>
        <div className="about-cta-actions">
          <Link to="/contact" className="btn btn-primary btn-lg">
            Start a Project <ArrowRight size={18} />
          </Link>
          <a href="https://www.linkedin.com/in/prince-ranjan-5ba3a0172/" target="_blank" rel="noopener noreferrer"
            className="btn btn-outline btn-lg">
            <LinkedinIcon size={18} /> View LinkedIn
          </a>
        </div>
      </div>
    </section>

  </main>
);

export default About;
