import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Sparkles, Code2, Globe, Megaphone,
  TrendingUp, GraduationCap, Star, ChevronRight
} from 'lucide-react';
import { LinkedinIcon, GithubIcon, InstagramIcon, FacebookIcon } from '../components/SocialIcons';
import './Home.css';

const stats = [
  { number: '3+', label: 'Years Experience' },
  { number: '50+', label: 'Projects Delivered' },
  { number: '30+', label: 'Happy Clients' },
  { number: '100%', label: 'Satisfaction Rate' },
];

const skills = [
  'React.js', 'TypeScript', 'WordPress', 'HTML5 / CSS3', 'JavaScript',
  'Meta Ads', 'Social Media', 'UI/UX Design', 'SEO', 'Figma', 'Git', 'Career Advisory'
];

const services = [
  {
    icon: Globe, color: 'var(--color-primary)',
    title: 'Web Design & Development',
    desc: 'Custom websites and WordPress solutions built for performance, SEO, and conversions.',
    badge: 'Popular'
  },
  {
    icon: Megaphone, color: 'var(--color-success)',
    title: 'Social Media Management',
    desc: 'Strategic content creation, scheduling & community management across all platforms.',
    badge: ''
  },
  {
    icon: TrendingUp, color: 'var(--color-warning)',
    title: 'Meta Ads & Digital Marketing',
    desc: 'High-ROI Facebook & Instagram ad campaigns driven by data and creativity.',
    badge: ''
  },
  {
    icon: GraduationCap, color: 'var(--color-info)',
    title: 'Career Advisory',
    desc: 'Mentoring youngsters to navigate their career path in the digital world.',
    badge: 'New'
  },
];

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Startup Founder',
    text: 'Prince transformed our online presence completely. The website he built exceeded all our expectations!',
    rating: 5,
  },
  {
    name: 'Priya Singh',
    role: 'Business Owner',
    text: 'His Meta Ads expertise doubled our leads in just 2 months. Truly exceptional digital marketing skills.',
    rating: 5,
  },
  {
    name: 'Amit Kumar',
    role: 'College Student',
    text: 'The career advisory session with Prince gave me a clear roadmap. I got placed within 3 months!',
    rating: 5,
  },
];

const socials = [
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/prince-ranjan-5ba3a0172/', label: 'LinkedIn', color: '#0a66c2' },
  { icon: GithubIcon, href: 'https://github.com/princeranjan', label: 'GitHub', color: '#e5e7eb' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/', label: 'Instagram', color: '#e1306c' },
  { icon: FacebookIcon, href: 'https://www.facebook.com/', label: 'Facebook', color: '#1877f2' },
];

const Home: React.FC = () => {
  const [typed, setTyped] = useState('');
  const phrases = ['Frontend Developer', 'WordPress Expert', 'Digital Marketer', 'Career Adviser'];
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

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
      timeout = setTimeout(tick, deleting.current ? 60 : 100);
    };
    timeout = setTimeout(tick, 400);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="home-page">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-bg">
          <div className="glow-orb glow-orb-primary" style={{ width: 500, height: 500, top: -100, left: -100 }} />
          <div className="glow-orb glow-orb-info" style={{ width: 400, height: 400, bottom: -50, right: -50 }} />
          <div className="hero-grid-pattern" />
        </div>

        <div className="container hero-content">
          <div className="hero-left animate-fadeInUp">
            <div className="badge badge-primary" style={{ marginBottom: 24 }}>
              <Sparkles size={12} /> Available for Freelance
            </div>
            <h1 className="hero-title display-1">
              Hi, I'm <span className="text-gradient">Prince Ranjan</span>
            </h1>
            <div className="hero-typed">
              <span className="typed-text">{typed}</span>
              <span className="typed-cursor">|</span>
            </div>
            <p className="hero-desc">
              A passionate Frontend Developer & Digital Marketer from India. I craft stunning websites,
              manage social media, run high-ROI ad campaigns, and guide young professionals to achieve their career dreams.
            </p>
            <div className="hero-cta">
              <Link to="/projects" className="btn btn-primary btn-lg">
                View My Work <ArrowRight size={18} />
              </Link>
              <a href="mailto:princeranjan270@gmail.com" className="btn btn-outline btn-lg">
                Let's Talk <ChevronRight size={18} />
              </a>
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
                <div className="avatar-initials">PR</div>
                <div className="avatar-ring" />
                <div className="avatar-ring ring-2" />
              </div>
              <div className="hero-badge-card card-1">
                <Code2 size={16} className="text-gradient" />
                <span>50+ Projects</span>
              </div>
              <div className="hero-badge-card card-2">
                <Star size={16} style={{ color: 'var(--color-accent)' }} />
                <span>5.0 Rating</span>
              </div>
              <div className="hero-badge-card card-3">
                <Sparkles size={16} style={{ color: 'var(--color-success)' }} />
                <span>3+ Years</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="hero-stats-bar">
          <div className="container">
            <div className="stats-grid">
              {stats.map(({ number, label }) => (
                <div key={label} className="stat-item">
                  <span className="stat-number text-gradient">{number}</span>
                  <span className="stat-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section section-skills">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Tech Stack</div>
            <h2 className="heading-1 section-title">Skills & Technologies</h2>
            <p className="section-desc">A versatile toolkit spanning frontend, marketing, and design.</p>
          </div>
          <div className="skills-cloud">
            {skills.map((skill, i) => (
              <span key={skill} className="skill-tag animate-fadeInUp" style={{ animationDelay: `${i * 0.05}s` }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section section-services-preview">
        <div className="container">
          <div className="section-header">
            <div className="section-label">What I Do</div>
            <h2 className="heading-1 section-title">Services I Offer</h2>
            <p className="section-desc">End-to-end digital solutions for businesses and individuals.</p>
          </div>
          <div className="grid grid-2" style={{ gap: 24 }}>
            {services.map(({ icon: Icon, color, title, desc, badge }) => (
              <div key={title} className="service-card card">
                <div className="card-body">
                  <div className="service-top">
                    <div className="icon-box icon-box-lg" style={{ background: `${color}18`, color }}>
                      <Icon size={26} />
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
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/services" className="btn btn-outline btn-lg">
              All Services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-testimonials">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Client Love</div>
            <h2 className="heading-1 section-title">What Clients Say</h2>
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

      {/* CTA */}
      <section className="section-cta">
        <div className="cta-glow" />
        <div className="container cta-inner">
          <h2 className="display-2" style={{ marginBottom: 16 }}>
            Ready to Build Something <span className="text-gradient">Extraordinary?</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: 36 }}>
            Let's collaborate and turn your vision into a powerful digital reality.
          </p>
          <div className="flex-center gap-16">
            <Link to="/contact" className="btn btn-primary btn-lg">
              Start a Project <ArrowRight size={18} />
            </Link>
            <a href="tel:+917004136051" className="btn btn-outline btn-lg">
              Call Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
