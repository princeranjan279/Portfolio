import React, { useState } from 'react';
import {
  Mail, Phone, MapPin, Send,
  Clock, MessageSquare, CheckCircle2, Loader2
} from 'lucide-react';
import { LinkedinIcon, GithubIcon, InstagramIcon, FacebookIcon } from '../components/SocialIcons';
import './Contact.css';

const socials = [
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/prince-ranjan-5ba3a0172/', label: 'LinkedIn', color: '#0a66c2', handle: '/prince-ranjan' },
  { icon: GithubIcon, href: 'https://github.com/princeranjan', label: 'GitHub', color: '#e5e7eb', handle: '@princeranjan' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/', label: 'Instagram', color: '#e1306c', handle: '@princeranjan' },
  { icon: FacebookIcon, href: 'https://www.facebook.com/', label: 'Facebook', color: '#1877f2', handle: '/princeranjan' },
];

const faqs = [
  { q: 'What is your typical project timeline?', a: 'Most websites take 7-21 days depending on complexity. I always provide a detailed timeline upfront.' },
  { q: 'Do you offer post-launch support?', a: 'Yes! I offer 30 days of free support after project delivery and ongoing maintenance packages.' },
  { q: 'How do I get started?', a: "Simply send me an email or fill the contact form. We'll schedule a free 30-minute discovery call." },
];

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 2000);
  };

  return (
    <main className="contact-page">
      <div className="page-header">
        <div className="glow-orb glow-orb-primary" style={{ width: 450, height: 300, top: -80, left: '20%' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="badge badge-primary" style={{ marginBottom: 20 }}>
            <MessageSquare size={12} /> Let's Talk
          </div>
          <h1 className="display-1" style={{ marginBottom: 16 }}>
            Start a <span className="text-gradient">Conversation</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 560 }}>
            Have a project in mind? Need advice? Just want to say hi? My inbox is always open.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container contact-grid">
          {/* Left: Info */}
          <div className="contact-info animate-fadeInUp">
            <div className="contact-cards">
              <a href="mailto:princeranjan270@gmail.com" className="contact-info-card">
                <div className="icon-box icon-box-lg"><Mail size={22} /></div>
                <div>
                  <p className="contact-card-label">Email</p>
                  <p className="contact-card-value">princeranjan270@gmail.com</p>
                  <p className="contact-card-note">Response within 24 hours</p>
                </div>
              </a>

              <a href="tel:+917004136051" className="contact-info-card">
                <div className="icon-box icon-box-lg icon-box-success"><Phone size={22} /></div>
                <div>
                  <p className="contact-card-label">Phone / WhatsApp</p>
                  <p className="contact-card-value">+91 7004136051</p>
                  <p className="contact-card-note">Mon-Sat, 9 AM - 8 PM IST</p>
                </div>
              </a>

              <div className="contact-info-card">
                <div className="icon-box icon-box-lg icon-box-warning"><Clock size={22} /></div>
                <div>
                  <p className="contact-card-label">Availability</p>
                  <p className="contact-card-value">Open to Freelance Work</p>
                  <p className="contact-card-note">Full-time & part-time projects</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="icon-box icon-box-lg icon-box-info"><MapPin size={22} /></div>
                <div>
                  <p className="contact-card-label">Location</p>
                  <p className="contact-card-value">India</p>
                  <p className="contact-card-note">Available for remote work globally</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="contact-social-section">
              <h3 className="heading-2" style={{ marginBottom: 20 }}>Find Me On</h3>
              <div className="contact-socials">
                {socials.map(({ icon: Icon, href, label, color, handle }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="contact-social-card"
                    style={{ '--social-color': color } as React.CSSProperties}>
                    <Icon size={20} />
                    <div>
                      <p className="social-platform">{label}</p>
                      <p className="social-handle">{handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="contact-faq">
              <h3 className="heading-2" style={{ marginBottom: 20 }}>Quick FAQs</h3>
              {faqs.map(({ q, a }) => (
                <div key={q} className="faq-item">
                  <p className="faq-q">{q}</p>
                  <p className="faq-a">{a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-wrapper animate-fadeInUp delay-2">
            <div className="contact-form-card card">
              <div className="card-body" style={{ padding: 40 }}>
                {status === 'sent' ? (
                  <div className="form-success">
                    <div className="success-icon">
                      <CheckCircle2 size={48} color="var(--color-success)" />
                    </div>
                    <h3 className="heading-1">Message Sent!</h3>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 12 }}>
                      Thanks for reaching out! I'll get back to you within 24 hours.
                    </p>
                    <button className="btn btn-primary" style={{ marginTop: 24 }}
                      onClick={() => { setForm({ name: '', email: '', phone: '', service: '', message: '' }); setStatus('idle'); }}>
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="heading-1" style={{ marginBottom: 8 }}>Send a Message</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: '0.9rem' }}>
                      Fill the form below and I'll respond as soon as possible.
                    </p>
                    <form onSubmit={handleSubmit} className="contact-form">
                      <div className="form-row">
                        <div className="form-group">
                          <label className="input-label" htmlFor="name">Full Name *</label>
                          <input id="name" name="name" type="text" required
                            className="input-field" placeholder="Your full name"
                            value={form.name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                          <label className="input-label" htmlFor="email">Email Address *</label>
                          <input id="email" name="email" type="email" required
                            className="input-field" placeholder="your@email.com"
                            value={form.email} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="input-label" htmlFor="phone">Phone Number</label>
                          <input id="phone" name="phone" type="tel"
                            className="input-field" placeholder="+91 XXXXXXXXXX"
                            value={form.phone} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                          <label className="input-label" htmlFor="service">Service Needed</label>
                          <select id="service" name="service"
                            className="input-field" style={{ appearance: 'none' }}
                            value={form.service} onChange={handleChange}>
                            <option value="">Select a service...</option>
                            <option>Website Design & Development</option>
                            <option>WordPress Development</option>
                            <option>Social Media Management</option>
                            <option>Meta Ads Campaign</option>
                            <option>Career Advisory</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="input-label" htmlFor="message">Your Message *</label>
                        <textarea id="message" name="message" required rows={5}
                          className="input-field" placeholder="Tell me about your project, goals, and timeline..."
                          style={{ resize: 'vertical', minHeight: 120 }}
                          value={form.message} onChange={handleChange} />
                      </div>
                      <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={status === 'sending'}>
                        {status === 'sending' ? (
                          <><Loader2 size={18} className="spin-icon" /> Sending...</>
                        ) : (
                          <><Send size={18} /> Send Message</>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
