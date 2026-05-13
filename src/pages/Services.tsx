import React, { useState } from 'react';
import {
  Globe, Megaphone, TrendingUp, GraduationCap, CheckCircle2,
  ArrowRight, Zap, Shield, Clock, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Services.css';

const services = [
  {
    id: 'web',
    icon: Globe,
    color: 'var(--color-primary)',
    bg: 'rgba(94,114,228,0.1)',
    title: 'Website Design & Development',
    subtitle: 'WordPress & Custom Web Solutions',
    desc: "From elegant landing pages to feature-rich business websites, I build digital experiences that look stunning and perform brilliantly. Whether you need a WordPress site or a fully custom React application, I've got you covered.",
    features: [
      'Custom WordPress Theme Development',
      'React.js / Next.js Web Applications',
      'Responsive & Mobile-First Design',
      'Speed & SEO Optimization',
      'E-Commerce (WooCommerce)',
      'Landing Page Design',
      'Website Maintenance & Support',
      'UI/UX Wireframing & Prototyping',
    ],
    packages: [
      { name: 'Starter', price: '₹8,000', desc: 'Landing page or basic WordPress site' },
      { name: 'Business', price: '₹20,000', desc: 'Full website with CMS & integrations' },
      { name: 'Enterprise', price: 'Custom', desc: 'React app or large-scale platform' },
    ]
  },
  {
    id: 'social',
    icon: Megaphone,
    color: 'var(--color-success)',
    bg: 'rgba(45,206,137,0.1)',
    title: 'Social Media Management',
    subtitle: 'Grow Your Brand Online',
    desc: "Your social media is your brand's voice. I create compelling content strategies, manage your profiles, engage your audience, and grow your following organically across all major platforms.",
    features: [
      'Content Calendar & Strategy',
      'Creative Post Design',
      'Instagram, Facebook, LinkedIn',
      'Community Engagement',
      'Hashtag Research & SEO',
      'Competitor Analysis',
      'Monthly Performance Reports',
      'Story & Reel Creation',
    ],
    packages: [
      { name: 'Basic', price: '₹5,000/mo', desc: '10 posts/month, 1 platform' },
      { name: 'Growth', price: '₹10,000/mo', desc: '20 posts/month, 3 platforms' },
      { name: 'Premium', price: '₹18,000/mo', desc: 'Unlimited, all platforms + Ads' },
    ]
  },
  {
    id: 'ads',
    icon: TrendingUp,
    color: 'var(--color-warning)',
    bg: 'rgba(251,99,64,0.1)',
    title: 'Meta Ads & Digital Marketing',
    subtitle: 'High-ROI Facebook & Instagram Campaigns',
    desc: "Stop wasting money on ads that don't convert. I design and manage data-driven Meta ad campaigns that target the right audience, generate quality leads, and maximize your return on investment.",
    features: [
      'Facebook & Instagram Ad Campaigns',
      'Audience Research & Targeting',
      'Ad Creative Design',
      'A/B Testing & Optimization',
      'Retargeting Campaigns',
      'Conversion Tracking Setup',
      'Lead Generation Funnels',
      'Detailed Monthly Reports',
    ],
    packages: [
      { name: 'Launch', price: '₹6,000/mo', desc: 'Setup + management (ad budget ₹5k–15k)' },
      { name: 'Scale', price: '₹12,000/mo', desc: 'Full funnel (ad budget ₹15k–50k)' },
      { name: 'Growth', price: 'Custom', desc: 'Aggressive scaling (₹50k+ ad budget)' },
    ]
  },
  {
    id: 'career',
    icon: GraduationCap,
    color: 'var(--color-info)',
    bg: 'rgba(17,205,239,0.1)',
    title: 'Career Advisory for Youngsters',
    subtitle: 'Guiding the Next Generation',
    desc: 'Confused about your career in tech or digital marketing? I offer one-on-one guidance sessions to help students and fresh graduates build a clear roadmap, develop the right skills, and land their dream roles.',
    features: [
      '1-on-1 Career Consultation',
      'Resume & LinkedIn Review',
      'Frontend Dev Roadmap',
      'Digital Marketing Career Guide',
      'Freelancing Kickstart Guide',
      'Portfolio Building Help',
      'Interview Preparation',
      'Ongoing Mentorship',
    ],
    packages: [
      { name: 'Session', price: '₹999', desc: '60-min consultation call' },
      { name: 'Monthly', price: '₹3,500/mo', desc: '4 sessions + resources' },
      { name: 'Bootcamp', price: '₹8,000', desc: '8-week intensive program' },
    ]
  },
];

const whyMe = [
  { icon: Zap, title: 'Fast Delivery', desc: 'Projects delivered on time, every time. No excuses.', color: 'var(--color-accent)' },
  { icon: Shield, title: 'Quality Guaranteed', desc: 'Meticulous attention to detail and clean, scalable code.', color: 'var(--color-success)' },
  { icon: Star, title: 'Client-First', desc: 'Your satisfaction is my KPI. I go above and beyond.', color: 'var(--color-primary)' },
  { icon: Clock, title: 'Ongoing Support', desc: "I'm here after delivery too — your success is my mission.", color: 'var(--color-info)' },
];

const Services: React.FC = () => {
  const [active, setActive] = useState(services[0].id);

  return (
    <main className="services-page">
      <div className="page-header">
        <div className="glow-orb glow-orb-primary" style={{ width: 500, height: 300, top: -100, right: -100 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="badge badge-primary" style={{ marginBottom: 20 }}>
            <Zap size={12} /> Services
          </div>
          <h1 className="display-1" style={{ marginBottom: 16 }}>
            Solutions That Drive <span className="text-gradient">Real Results</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 580 }}>
            From pixels to performance — end-to-end digital services designed to elevate your brand.
          </p>
        </div>
      </div>

      {/* Why Me */}
      <section className="section-sm">
        <div className="container">
          <div className="grid grid-4" style={{ gap: 20 }}>
            {whyMe.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="why-card card">
                <div className="card-body" style={{ padding: 24 }}>
                  <div className="icon-box" style={{ background: `${color}18`, color, marginBottom: 16 }}>
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8 }}>{title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="section">
        <div className="container">
          <div className="services-tabs">
            {services.map(({ id, icon: Icon, title, color }) => (
              <button
                key={id}
                className={`services-tab ${active === id ? 'active' : ''}`}
                onClick={() => setActive(id)}
                style={{ '--tab-color': color } as React.CSSProperties}
              >
                <Icon size={18} />
                <span>{title.split(' ')[0]} {title.split(' ')[1]}</span>
              </button>
            ))}
          </div>

          {services.filter(s => s.id === active).map(({ icon: Icon, color, bg, title, subtitle, desc, features, packages }) => (
            <div key={active} className="service-detail animate-fadeIn">
              <div className="service-detail-grid">
                <div className="service-detail-info">
                  <div className="service-detail-icon" style={{ background: bg, color }}>
                    <Icon size={36} />
                  </div>
                  <div className="badge" style={{ background: bg, color, border: `1px solid ${color}40`, marginBottom: 16, marginTop: 20 }}>
                    {subtitle}
                  </div>
                  <h2 className="display-2" style={{ marginBottom: 16 }}>{title}</h2>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 28 }}>{desc}</p>
                  <div className="service-features-grid">
                    {features.map(f => (
                      <div key={f} className="service-feature-item">
                        <CheckCircle2 size={16} color={color} />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/contact" className="btn btn-primary" style={{ marginTop: 28 }}>
                    Get a Quote <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="service-packages">
                  <h3 className="heading-2" style={{ marginBottom: 24 }}>Pricing Packages</h3>
                  {packages.map(({ name, price, desc: pdesc }) => (
                    <div key={name} className="package-card card" style={{ marginBottom: 16 }}>
                      <div className="card-body" style={{ padding: '20px 24px' }}>
                        <div className="flex-between" style={{ marginBottom: 8 }}>
                          <h4 style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{name}</h4>
                          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color }}>{price}</span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{pdesc}</p>
                      </div>
                    </div>
                  ))}
                  <a href="mailto:princeranjan270@gmail.com" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
                    Discuss Custom Requirements
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-cta" style={{ padding: '80px 0', textAlign: 'center', borderTop: '1px solid var(--border-color)', background: 'radial-gradient(ellipse at center, rgba(94,114,228,0.08), transparent 70%)' }}>
        <div className="container">
          <h2 className="display-2" style={{ marginBottom: 16 }}>
            Not Sure Which Service? <span className="text-gradient">Let's Chat!</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: '1.05rem' }}>
            I offer free 30-minute consultations. Let's discuss your needs and find the perfect solution.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Book Free Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Services;
