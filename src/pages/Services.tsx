import React, { useState } from 'react';
import {
  Globe, Megaphone, TrendingUp, GraduationCap, CheckCircle2,
  ArrowRight, Zap, Shield, Clock, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Services.css';

const services = [
  {
    id: 'software',
    icon: Globe,
    color: 'var(--color-primary)',
    bg: 'rgba(99,102,241,0.1)',
    title: 'Software Development',
    subtitle: 'React.js & WordPress Solutions',
    desc: "From elegant landing pages to feature-rich business websites, I build digital experiences that look stunning and perform brilliantly. Specializing in high-performance React.js and customizable WordPress platforms.",
    features: [
      'Custom React.js / Next.js Web Apps',
      'WordPress Theme Development',
      'Responsive & Mobile-First Design',
      'E-Commerce (WooCommerce)',
      'Landing Page Design',
      'UI/UX Wireframing & Prototyping',
    ],
    packages: [
      { name: 'Starter', price: '₹8,000', desc: 'Landing page or basic WordPress site' },
      { name: 'Business', price: '₹20,000', desc: 'Full website with CMS & integrations' },
      { name: 'Enterprise', price: 'Custom', desc: 'React app or large-scale platform' },
    ]
  },
  {
    id: 'seo',
    icon: Globe, // Fallback icon
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.1)',
    title: 'SEO & GEO Optimization',
    subtitle: 'AI-Driven Search Visibility',
    desc: "Rank higher on traditional search engines like Google and generative AI engines. I use advanced SEO and Generative Engine Optimization (GEO) strategies to drive targeted organic traffic to your business.",
    features: [
      'Comprehensive Technical SEO Audits',
      'On-Page & Off-Page Optimization',
      'GEO (Generative Engine Optimization)',
      'Keyword Research & Strategy',
      'Local SEO & Google My Business',
      'Content Optimization',
    ],
    packages: [
      { name: 'Audit', price: '₹3,000', desc: 'One-time technical & content SEO audit' },
      { name: 'Growth', price: '₹8,000/mo', desc: 'Ongoing on-page & off-page SEO' },
      { name: 'AI Ready', price: '₹15,000/mo', desc: 'Full SEO + GEO optimization strategy' },
    ]
  },
  {
    id: 'ads',
    icon: TrendingUp,
    color: 'var(--color-warning)',
    bg: 'rgba(245,158,11,0.1)',
    title: 'Meta Ads & Paid Marketing',
    subtitle: 'High-ROI Facebook & Instagram Campaigns',
    desc: "Stop wasting money on ads that don't convert. I design and manage data-driven Meta ad campaigns that target the right audience, generate quality leads, and maximize your return on investment.",
    features: [
      'Facebook & Instagram Ad Campaigns',
      'Audience Research & Targeting',
      'A/B Testing & Optimization',
      'Retargeting Campaigns',
      'Conversion Tracking & Pixel Setup',
      'Lead Generation Funnels',
    ],
    packages: [
      { name: 'Launch', price: '₹6,000/mo', desc: 'Setup + management (ad budget ₹5k–15k)' },
      { name: 'Scale', price: '₹12,000/mo', desc: 'Full funnel (ad budget ₹15k–50k)' },
      { name: 'Growth', price: 'Custom', desc: 'Aggressive scaling (₹50k+ ad budget)' },
    ]
  },
  {
    id: 'social',
    icon: Megaphone,
    color: 'var(--color-success)',
    bg: 'rgba(16,185,129,0.1)',
    title: 'Social Media Management',
    subtitle: 'Grow Your Brand Online',
    desc: "Your social media is your brand's voice. I create compelling content strategies, manage your profiles, engage your audience, and grow your following organically across all major platforms.",
    features: [
      'Content Calendar & Strategy',
      'Creative Post Design',
      'Instagram, Facebook, LinkedIn',
      'Community Engagement',
      'Hashtag Research',
      'Monthly Performance Reports',
    ],
    packages: [
      { name: 'Basic', price: '₹5,000/mo', desc: '10 posts/month, 1 platform' },
      { name: 'Growth', price: '₹10,000/mo', desc: '20 posts/month, 3 platforms' },
      { name: 'Premium', price: '₹18,000/mo', desc: 'Unlimited, all platforms + Reels' },
    ]
  },
  {
    id: 'web-mgmt',
    icon: Globe, // Fallback icon
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.1)',
    title: 'Website Management & AI',
    subtitle: 'Maintenance & AI Tool Integration',
    desc: "Keep your website secure, fast, and up-to-date. I handle ongoing website maintenance, performance optimization, and the integration of modern AI-powered tools and chatbots for your business.",
    features: [
      'Security Monitoring & Backups',
      'Speed & Core Web Vitals Optimization',
      'Plugin & Theme Updates',
      'AI Chatbot Integration',
      'Workflow Automation (Zapier/Make)',
      'Uptime Monitoring',
    ],
    packages: [
      { name: 'Care', price: '₹2,500/mo', desc: 'Basic updates, backups & security' },
      { name: 'Optimize', price: '₹5,000/mo', desc: 'Care + Speed & content updates' },
      { name: 'AI Build', price: 'Custom', desc: 'Custom AI chatbot & workflow setups' },
    ]
  },
  {
    id: 'career',
    icon: GraduationCap,
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.1)',
    title: 'Career Advisory & Mentorship',
    subtitle: 'Guiding the Next Generation',
    desc: 'Confused about your career in tech or digital marketing? I offer one-on-one guidance sessions to help students and fresh graduates build a clear roadmap, develop the right skills, and land their dream roles.',
    features: [
      '1-on-1 Career Consultation',
      'Resume & LinkedIn Review',
      'Frontend Dev Roadmap',
      'Digital Marketing Career Guide',
      'Portfolio Building Help',
      'Interview Preparation',
    ],
    packages: [
      { name: 'Session', price: 'Free', desc: 'First 30-min discovery call' },
      { name: 'Deep Dive', price: '₹999', desc: 'Detailed 60-min strategy session' },
      { name: 'Mentorship', price: '₹3,500/mo', desc: 'Ongoing support & resume reviews' },
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
