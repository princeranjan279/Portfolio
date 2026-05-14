import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Code2, Globe, Megaphone,
  TrendingUp, GraduationCap, Star, ChevronRight,
  Search, Cpu, MapPin, Briefcase, Users,
  MessageSquare, ExternalLink, Zap,
  BarChart2, Clock, Gamepad2, Trophy, Target
} from 'lucide-react';
import { LinkedinIcon, GithubIcon, InstagramIcon, FacebookIcon } from '../components/SocialIcons';
import HomeGame from './HomeGame';
import SkillLightbox from '../components/SkillLightbox';
import { skillGroups, skillsById, type Skill } from '../data/skills';
import { allProjects } from '../data/projects';
import './Home.css';

/* ── Data ──────────────────────────────────── */
const stats = [
  { number: '3+',   label: 'Years Experience' },
  { number: '50+',  label: 'Projects Delivered' },
  { number: '30+',  label: 'Happy Clients' },
  { number: '100%', label: 'Satisfaction Rate' },
];




const flatSkills = skillGroups.flatMap(g => g.skills.map(s => ({ ...s, color: g.color })));
const marqueeRows = [
  flatSkills.slice(0, 8),
  flatSkills.slice(8, 16),
  [...flatSkills.slice(16, 22), flatSkills[0], flatSkills[1]]
];

const services = [
  {
    icon: Code2,
    color: 'var(--color-primary)',
    title: 'Software Development',
    desc: 'Custom React.js & WordPress websites built for speed, SEO, and conversions. Full lifecycle from wireframe to deployment.',
    badge: 'Core Skill',
  },
  {
    icon: Search,
    color: 'var(--color-info)',
    title: 'SEO & GEO Optimization',
    desc: 'AI-driven SEO strategy and Generative Engine Optimization (GEO) to rank on both traditional and AI search engines.',
    badge: 'Trending',
  },
  {
    icon: TrendingUp,
    color: 'var(--color-warning)',
    title: 'Meta Ads & Paid Marketing',
    desc: 'High-ROI Facebook & Instagram ad campaigns with precision audience targeting, A/B testing, and ROAS optimization.',
    badge: '',
  },
  {
    icon: Megaphone,
    color: 'var(--color-success)',
    title: 'Social Media Management',
    desc: 'End-to-end brand presence on LinkedIn, Instagram & Facebook — content calendars, community growth & engagement.',
    badge: '',
  },
  {
    icon: BarChart2,
    color: '#f59e0b',
    title: 'Trading & Market Analysis',
    desc: 'Data-driven analysis of the Indian stock market, focusing on equity trading, intraday strategies, technical analysis, and IPO evaluation.',
    badge: 'Markets',
  },
  {
    icon: GraduationCap,
    color: '#ec4899',
    title: 'Career Advisory & Mentorship',
    desc: 'Guiding fresh graduates and aspiring developers through career planning, skill-building, and breaking into the tech industry.',
    badge: 'Free Session',
  },
];

const highlights = [
  { icon: Briefcase, value: 'Prishal Technolabs Pvt. Ltd.', label: 'Currently at', color: '#6366f1' },
  { icon: MapPin,    value: 'Patna, Bihar, India',          label: 'Based in',     color: '#06b6d4' },
  { icon: GraduationCap, value: 'Biju Patnaik University of Technology, Odisha', label: 'Studied at', color: '#10b981' },
  { icon: Globe,     value: 'India . USA',        label: 'Clients from', color: '#f59e0b' },
];

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Startup Founder',
    text: 'Prince transformed our online presence completely. The website he built and the SEO strategy he executed exceeded all expectations!',
    rating: 5,
  },
  {
    name: 'Priya Singh',
    role: 'Business Owner',
    text: 'His Meta Ads expertise doubled our leads in just 2 months. Truly exceptional work — he really understands digital marketing.',
    rating: 5,
  },
  {
    name: 'Amit Kumar',
    role: 'Fresh Graduate',
    text: 'The career advisory session with Prince gave me a clear roadmap into tech. I landed my first job within 3 months of following his plan!',
    rating: 5,
  },
];

const process = [
  { step: '01', icon: MessageSquare, title: 'Discovery Call',      desc: 'We discuss your goals, requirements, timeline, and budget in a free 30-min call.',     color: '#6366f1' },
  { step: '02', icon: Target,        title: 'Strategy & Planning',  desc: 'I create a detailed project plan, wireframes, and a clear milestone roadmap.',          color: '#06b6d4' },
  { step: '03', icon: Code2,         title: 'Design & Develop',     desc: 'I build your project with clean code, premium design, and real-time progress updates.', color: '#10b981' },
  { step: '04', icon: Zap,           title: 'Launch & Support',     desc: '30 days of free post-launch support, bug fixes, and performance monitoring included.',  color: '#f59e0b' },
];

const featuredProjects = allProjects.filter(p => p.isFeatured).slice(0, 3);

const counters = [
  { end: 50, suffix: '+', label: 'Projects Delivered', icon: Briefcase,  color: '#6366f1' },
  { end: 30, suffix: '+', label: 'Happy Clients',      icon: Users,      color: '#06b6d4' },
  { end: 2,  suffix: '+', label: 'Years Experience',   icon: Clock,      color: '#10b981' },
  { end: 100,suffix: '%', label: 'Satisfaction Rate',  icon: Trophy,     color: '#f59e0b' },
  { end: 10, suffix: '+', label: 'Brands Managed',     icon: BarChart2,  color: '#8b5cf6' },
  { end: 200,suffix: '%', label: 'Avg Follower Growth',icon: TrendingUp, color: '#ec4899' },
];

const socials = [
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/prince-ranjan-5ba3a0172/', label: 'LinkedIn',  color: '#0a66c2' },
  { icon: GithubIcon,   href: 'https://github.com/princeranjan279',                   label: 'GitHub',    color: '#a5b4fc' },
  { icon: InstagramIcon,href: 'https://www.instagram.com/ranjan4142/',                            label: 'Instagram', color: '#e1306c' },
  { icon: FacebookIcon, href: 'https://www.facebook.com/prince.ranjan.5437/',                             label: 'Facebook',  color: '#1877f2' },
];

/* ── LiveCounter sub-component ──────────────── */
const LiveCounter: React.FC<{ end: number; suffix: string }> = ({ end, suffix }) => {
  const [val, setVal] = useState(0);
  const [run, setRun] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setRun(true); obs.disconnect(); } });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!run) return;
    const step = Math.ceil(1600 / end);
    let cur = 0;
    const t = setInterval(() => { cur++; setVal(cur); if (cur >= end) clearInterval(t); }, step);
    return () => clearInterval(t);
  }, [run, end]);
  return <span ref={ref}>{val}{suffix}</span>;
};

/* ── Component ─────────────────────────────── */
const Home: React.FC = () => {
  const [typed, setTyped] = useState('');
  const [activeLightbox, setActiveLightbox] = useState<{ skill: Skill; groupColor: string } | null>(null);

  const openLightbox = (skillId: string, groupColor: string) => {
    const skill = skillsById[skillId];
    if (skill) setActiveLightbox({ skill, groupColor });
  };
  const closeLightbox = () => setActiveLightbox(null);
  // Updated phrases matching LinkedIn/About data
  const phrases = [
    'Software Developer',
    'SEO & GEO Expert',
    'WordPress Specialist',
    'Meta Ads Strategist',
    'Career Adviser',
  ];
  const phraseIdx = useRef(0);
  const charIdx   = useRef(0);
  const deleting  = useRef(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      const current = phrases[phraseIdx.current];
      if (!deleting.current) {
        setTyped(current.slice(0, charIdx.current + 1));
        charIdx.current++;
        if (charIdx.current === current.length) {
          deleting.current = true;
          timeout = setTimeout(tick, 1800);
          return;
        }
      } else {
        setTyped(current.slice(0, charIdx.current - 1));
        charIdx.current--;
        if (charIdx.current === 0) {
          deleting.current = false;
          phraseIdx.current = (phraseIdx.current + 1) % phrases.length;
        }
      }
      timeout = setTimeout(tick, deleting.current ? 55 : 95);
    };
    timeout = setTimeout(tick, 400);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
    <main className="home-page">

      {/* ── Hero ───────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-bg">
          <div className="glow-orb glow-orb-primary" style={{ width: 500, height: 500, top: -100, left: -100 }} />
          <div className="glow-orb glow-orb-info"    style={{ width: 400, height: 400, bottom: -50, right: -50 }} />
          <div className="hero-grid-pattern" />
        </div>

        <div className="container hero-content">
          <div className="hero-left animate-fadeInUp">

            {/* Available badge */}
            <div className="hero-availability">
              <div className="hero-avail-dot" />
              <span>Available for Projects</span>
              <span className="hero-avail-sep">·</span>
              <span className="hero-company-chip">
                <Cpu size={11} /> Prishal Technolabs
              </span>
            </div>

            <h1 className="hero-title display-1">
              Hi, I'm <br/><span className="text-gradient">Prince Ranjan</span>
            </h1>
            <div className="hero-typed">
              <span className="typed-text">{typed}</span>
              <span className="typed-cursor">|</span>
            </div>
            <p className="hero-desc">
              A <strong>Software Developer</strong> & <strong>Digital Marketer</strong> based in <strong>Patna, Bihar</strong>.
              Currently at <strong>Prishal Technolabs Pvt. Ltd.</strong> — building AI-powered websites,
              driving SEO & GEO strategies, running Meta Ads campaigns, and mentoring the next generation of digital professionals.
            </p>

            <div className="hero-cta">
              <Link to="/projects" className="btn btn-primary btn-lg">
                View My Work <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn btn-outline btn-lg">
                Hire Me <ChevronRight size={18} />
              </Link>
            </div>

            <div className="hero-socials">
              {socials.map(({ icon: Icon, href, label, color }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="social-btn" aria-label={label}
                  style={{ '--social-color': color } as React.CSSProperties}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="hero-right animate-fadeInUp delay-3">
            <div className="hero-avatar-wrapper animate-float">
              <div className="hero-avatar">
                <img src="/profile.jpg" alt="Prince Ranjan" className="avatar-img" />
                <div className="avatar-ring" />
                <div className="avatar-ring ring-2" />
              </div>
              <div className="hero-badge-card card-1">
                <Code2 size={15} style={{ color: '#6366f1' }} />
                <span>50+ Projects</span>
              </div>
              <div className="hero-badge-card card-2">
                <Star size={15} fill="var(--color-accent)" color="var(--color-accent)" />
                <span>5.0 Rating</span>
              </div>
              <div className="hero-badge-card card-3">
                <Search size={15} style={{ color: '#06b6d4' }} />
                <span>AI SEO & GEO</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="hero-stats-bar">
          <div className="container">
            <div className="stats-grid">
              {stats.map(({ number, label }) => (
                <div key={label} className="stat-item">
                  <span className="stat-number">{number}</span>
                  <span className="stat-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Highlights ───────────────────── */}
      <section className="section section-highlights">
        <div className="container">
          <div className="highlights-grid">
            {highlights.map(({ icon: Icon, value, label, color }) => (
              <div key={label} className="highlight-card" style={{ '--h-color': color } as React.CSSProperties}>
                <div className="highlight-icon" style={{ background: `${color}18`, color }}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="highlight-label">{label}</p>
                  <p className="highlight-value">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills Marquee ───────────────────────── */}
      <section className="section section-skills">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Toolkit</div>
            <h2 className="heading-1 section-title">Skills &amp; Expertise</h2>
            <p className="section-desc">A versatile toolkit spanning software development, digital marketing, Indian market trading, and career consulting.</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600, background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', padding: '6px 16px', borderRadius: '100px', width: 'fit-content', margin: '16px auto 0' }}>
              <Zap size={14} /> Click any skill to explore full lessons & tutorials
            </div>
          </div>
        </div>

        <div className="skills-marquee-container">
          {marqueeRows.map((row, rowIndex) => (
            <div key={rowIndex} className={`marquee-row ${rowIndex % 2 === 0 ? 'marquee-left' : 'marquee-right'}`}>
              <div className="marquee-track">
                {[1, 2, 3, 4].map((dup) => (
                  <div key={dup} className="marquee-content" aria-hidden={dup > 1 ? "true" : "false"}>
                    {row.map((skill, i) => (
                      <button
                        key={i}
                        className="marquee-item marquee-item-btn"
                        style={{ '--item-color': skill.color } as React.CSSProperties}
                        onClick={() => openLightbox(skill.id, skill.color)}
                        title={`Learn about ${skill.name}`}
                        aria-label={`Open ${skill.name} details`}
                      >
                        <skill.icon size={18} className="marquee-item-icon" />
                        <span className="marquee-item-name">{skill.name}</span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ───────────────────────────── */}
      <section className="section section-services-preview">
        <div className="container">
          <div className="section-header">
            <div className="section-label">What I Do</div>
            <h2 className="heading-1 section-title">Services I Offer</h2>
            <p className="section-desc">End-to-end digital solutions — from code to campaigns, managed under one roof.</p>
          </div>
          <div className="services-grid-home">
            {services.map(({ icon: Icon, color, title, desc, badge }) => (
              <div key={title} className="service-card card" style={{ '--svc-color': color } as React.CSSProperties}>
                <div className="card-body">
                  <div className="service-top">
                    <div className="icon-box icon-box-lg" style={{ background: `${color}18`, color }}>
                      <Icon size={24} />
                    </div>
                    {badge && <span className="badge badge-primary">{badge}</span>}
                  </div>
                  <h3 className="heading-2" style={{ margin: '16px 0 10px' }}>{title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>{desc}</p>
                  <Link to="/services" className="service-more">
                    Learn more <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/services" className="btn btn-outline btn-lg">
              All Services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── How I Work ─────────────────────────── */}
      <section className="section section-process">
        <div className="container">
          <div className="section-header">
            <div className="section-label">My Workflow</div>
            <h2 className="heading-1 section-title">How I Work</h2>
            <p className="section-desc">A simple, transparent 4-step process from first contact to final delivery.</p>
          </div>
          <div className="process-grid">
            {process.map(({ step, icon: Icon, title, desc, color }, i) => (
              <div key={step} className="process-card" style={{ '--proc-color': color } as React.CSSProperties}>
                <div className="process-step-num" style={{ color }}>{step}</div>
                <div className="process-icon" style={{ background: `${color}15`, color }}><Icon size={22} /></div>
                <h3 className="process-title">{title}</h3>
                <p className="process-desc">{desc}</p>
                {i < process.length - 1 && <div className="process-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live Counters ───────────────────────── */}
      <section className="section section-counters">
        <div className="container">
          <div className="counters-grid">
            {counters.map(({ end, suffix, label, icon: Icon, color }) => (
              <div key={label} className="counter-card" style={{ '--cnt-color': color } as React.CSSProperties}>
                <div className="counter-icon" style={{ background: `${color}15`, color }}><Icon size={20} /></div>
                <div className="counter-val" style={{ color }}>
                  <LiveCounter end={end} suffix={suffix} />
                </div>
                <div className="counter-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ───────────────────── */}
      <section className="section section-projects-home">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Portfolio</div>
            <h2 className="heading-1 section-title">Featured Projects</h2>
            <p className="section-desc">A snapshot of my recent work — websites, campaigns & digital strategies.</p>
          </div>
          <div className="proj-grid">
            {featuredProjects.map(({ title, desc, tags, color, emoji, live, image }) => (
              <div key={title} className="proj-card" style={{ '--proj-color': color } as React.CSSProperties}>
                <div className="proj-emoji-wrap" style={{ background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {image ? (
                    <img 
                      src={image} 
                      alt={title} 
                      style={{ width: '160px', height: '90px', objectFit: 'contain', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))' }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.nextElementSibling) {
                          (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                        }
                      }}
                    />
                  ) : null}
                  <span style={{ display: image ? 'none' : 'flex' }}>{emoji}</span>
                </div>
                <div className="proj-body">
                  <h3 className="proj-title">{title}</h3>
                  <p className="proj-desc">{desc}</p>
                  <div className="proj-tags">
                    {tags.map(t => <span key={t} className="proj-tag">{t}</span>)}
                  </div>
                  <a href={live} target={live.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer" className="proj-link">
                    View Project <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/projects" className="btn btn-outline btn-lg">All Projects <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      {/* ── Mini Game ───────────────────────────── */}
      <section className="section section-game">
        <div className="container">
          <div className="section-header">
            <div className="section-label"><Gamepad2 size={13} /> Mini Game</div>
            <h2 className="heading-1 section-title">
              Tech Memory <span className="text-gradient">Match</span>
            </h2>
            <p className="section-desc">
              Match all 8 tech skill pairs in the fewest moves. Can you beat your own best score? 🏆
            </p>
          </div>
          <HomeGame />
        </div>
      </section>

      {/* ── Testimonials ───────────────────────── */}
      <section className="section section-testimonials">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Client Love</div>
            <h2 className="heading-1 section-title">What Clients Say</h2>
            <p className="section-desc">Real feedback from real clients across India and beyond.</p>
          </div>
          <div className="grid grid-3">
            {testimonials.map(({ name, role, text, rating }) => (
              <div key={name} className="testimonial-card card">
                <div className="card-body">
                  <div className="stars">
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star key={i} size={14} fill="var(--color-accent)" color="var(--color-accent)" />
                    ))}
                  </div>
                  <p className="testimonial-text">"{text}"</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">{name.charAt(0)}</div>
                    <div>
                      <p className="author-name">{name}</p>
                      <p className="author-role">{role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────── */}
      <section className="section-cta">
        <div className="cta-glow" />
        <div className="container cta-inner">
          <h2 className="display-2" style={{ marginBottom: 16 }}>
            Ready to Build Something <span className="text-gradient">Extraordinary?</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: 36, maxWidth: 560, margin: '0 auto 36px' }}>
            Whether it's a website, an SEO strategy, or a Meta Ads campaign — let's collaborate and turn your vision into measurable results.
          </p>
          <div className="flex-center gap-16" style={{ flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Start a Project <ArrowRight size={18} />
            </Link>
            <a href="tel:+917004136051" className="btn btn-outline btn-lg">
              Call Now · +91 7004136051
            </a>
          </div>
        </div>
      </section>

    </main>

      {/* Skill Lightbox */}
      <SkillLightbox
        skill={activeLightbox?.skill ?? null}
        groupColor={activeLightbox?.groupColor ?? '#6366f1'}
        onClose={closeLightbox}
      />
    </>
  );
};

export default Home;
