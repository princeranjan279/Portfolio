import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';
import {
  Code2, Mail, Phone, MapPin,
  ArrowRight, Heart, ExternalLink,
  ChevronRight, Sparkles, AlertCircle, CheckCircle2
} from 'lucide-react';
import { LinkedinIcon, GithubIcon, InstagramIcon, FacebookIcon } from './SocialIcons';
import { EMAILJS_CONFIG, EMAILJS_NEWSLETTER_TEMPLATE } from '../config/emailjs';
import './Footer.css';


const socials = [
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/prince-ranjan-5ba3a0172/', label: 'LinkedIn', color: '#0a66c2' },
  { icon: GithubIcon,   href: 'https://github.com/princeranjan',                        label: 'GitHub',   color: '#a5b4fc' },
  { icon: InstagramIcon,href: 'https://www.instagram.com/',                             label: 'Instagram',color: '#e1306c' },
  { icon: FacebookIcon, href: 'https://www.facebook.com/',                              label: 'Facebook', color: '#1877f2' },
];

const navLinks = [
  { to: '/',         label: 'Home' },
  { to: '/about',    label: 'About Me' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/gallery',  label: 'Gallery' },
  { to: '/contact',  label: 'Contact' },
];

const services = [
  'Website Design & Development',
  'WordPress Development',
  'Social Media Management',
  'Meta Ads & Digital Marketing',
  'Career Advisory',
  'UI/UX Design',
];

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [nlStatus, setNlStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [nlError, setNlError] = useState('');

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim());

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setNlError('Please enter your email.'); return; }
    if (!isValidEmail(email)) { setNlError('Please enter a valid email address.'); return; }
    setNlError('');
    setNlStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_NEWSLETTER_TEMPLATE,
        { subscriber_email: email.trim(), to_email: EMAILJS_CONFIG.TO_EMAIL },
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      setNlStatus('sent');
      setEmail('');
    } catch (_err) {
      setNlStatus('error');
      setNlError('Could not subscribe. Please try again later.');
    }
  };

  return (
    <footer className="footer">
      {/* Top CTA Strip */}
      <div className="footer-cta-strip">
        <div className="container footer-cta-inner">
          <div className="footer-cta-left">
            <div className="footer-cta-icon"><Sparkles size={22} /></div>
            <div>
              <h3 className="footer-cta-title">Ready to start your next project?</h3>
              <p className="footer-cta-sub">Let's build something extraordinary together.</p>
            </div>
          </div>
          <a href="mailto:princeranjan270@gmail.com" className="btn btn-primary footer-cta-btn">
            Get In Touch <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="footer-body">
        <div className="footer-noise" />
        <div className="container footer-grid">

          {/* Brand Column */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon"><Code2 size={22} /></div>
              <div>
                <span className="footer-logo-name">Prince</span>
                <span className="footer-logo-dot">.</span>
                <span className="footer-logo-sub">dev</span>
              </div>
            </Link>
            <p className="footer-tagline">
              Frontend Developer & Digital Marketer crafting premium web experiences that engage, convert, and deliver measurable results.
            </p>
            <div className="footer-socials">
              {socials.map(({ icon: Icon, href, label, color }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="footer-social-btn" aria-label={label}
                  style={{ '--social-color': color } as React.CSSProperties}>
                  <Icon size={17} />
                </a>
              ))}
            </div>
            <div className="footer-contact-mini">
              <a href="mailto:princeranjan270@gmail.com" className="footer-contact-mini-item">
                <Mail size={14} /> princeranjan270@gmail.com
              </a>
              <a href="tel:+917004136051" className="footer-contact-mini-item">
                <Phone size={14} /> +91 7004136051
              </a>
              <span className="footer-contact-mini-item">
                <MapPin size={14} /> India — Remote Worldwide
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Quick Links</h4>
            <ul className="footer-nav-list">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="footer-nav-link">
                    <ChevronRight size={13} /> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Services</h4>
            <ul className="footer-nav-list">
              {services.map(s => (
                <li key={s}>
                  <Link to="/services" className="footer-nav-link">
                    <ChevronRight size={13} /> {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Stay Updated</h4>
            <p className="footer-newsletter-desc">
              Get tips on web development, digital marketing & career growth — straight to your inbox.
            </p>
            {nlStatus === 'sent' ? (
              <div className="footer-subscribed">
                <CheckCircle2 size={16} /> You're subscribed! Thanks 🎉
              </div>
            ) : (
              <form className="footer-newsletter-form" onSubmit={handleSubscribe} noValidate>
                <input
                  type="email" placeholder="your@email.com"
                  className={`footer-newsletter-input ${nlError ? 'nl-error' : ''}`}
                  value={email}
                  onChange={e => { setEmail(e.target.value); if (nlError) setNlError(''); setNlStatus('idle'); }}
                  aria-label="Email for newsletter"
                  disabled={nlStatus === 'sending'}
                />
                <button type="submit" className="footer-newsletter-btn" aria-label="Subscribe" disabled={nlStatus === 'sending'}>
                  {nlStatus === 'sending' ? <span className="nl-spinner" /> : <ArrowRight size={16} />}
                </button>
              </form>
            )}
            {nlError && (
              <p className="nl-error-msg"><AlertCircle size={12} /> {nlError}</p>
            )}

            <div className="footer-badges">
              <span className="footer-badge">⚡ Available for Work</span>
              <span className="footer-badge">🌍 Remote Friendly</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copy">
            © {year} <strong>Prince Ranjan</strong>. Crafted with <Heart size={13} className="footer-heart" /> All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="mailto:princeranjan270@gmail.com" className="footer-bottom-link">
              <ExternalLink size={12} /> Hire Me
            </a>
            <span className="footer-bottom-sep">·</span>
            <span className="footer-bottom-link">Frontend Dev · WordPress · Meta Ads</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
