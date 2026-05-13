import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
  Mail, Phone, MapPin, Send,
  Clock, MessageSquare, CheckCircle2, Loader2,
  AlertCircle, User, AtSign, PhoneCall, Briefcase
} from 'lucide-react';
import { LinkedinIcon, GithubIcon, InstagramIcon, FacebookIcon } from '../components/SocialIcons';
import { EMAILJS_CONFIG } from '../config/emailjs';
import './Contact.css';

/* ── Types ─────────────────────────────────── */
interface FormFields {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}
interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

/* ── Data ──────────────────────────────────── */
const socials = [
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/prince-ranjan-5ba3a0172/', label: 'LinkedIn',  color: '#0a66c2', handle: '/prince-ranjan' },
  { icon: GithubIcon,   href: 'https://github.com/princeranjan279',                   label: 'GitHub',    color: '#a5b4fc', handle: '@princeranjan279' },
  { icon: InstagramIcon,href: 'https://www.instagram.com/',                            label: 'Instagram', color: '#e1306c', handle: '@princeranjan' },
  { icon: FacebookIcon, href: 'https://www.facebook.com/',                             label: 'Facebook',  color: '#1877f2', handle: '/princeranjan' },
];

const faqs = [
  { q: 'What is your typical project timeline?', a: 'Most websites take 7-21 days depending on complexity. I always provide a detailed timeline upfront.' },
  { q: 'Do you offer post-launch support?',       a: 'Yes! I offer 30 days of free support after delivery and ongoing maintenance packages.' },
  { q: 'How do I get started?',                   a: "Simply send me an email or fill the contact form. We'll schedule a free 30-minute discovery call." },
];

/* ── Validation ─────────────────────────────── */
const validate = (form: FormFields): FormErrors => {
  const errors: FormErrors = {};

  // Name: min 2 chars, only letters/spaces
  if (!form.name.trim()) {
    errors.name = 'Full name is required.';
  } else if (form.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (!/^[a-zA-Z\s'-]+$/.test(form.name.trim())) {
    errors.name = 'Name can only contain letters, spaces, hyphens or apostrophes.';
  }

  // Email: standard email format
  if (!form.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address (e.g. you@example.com).';
  }

  // Phone: optional but if entered must be valid (7-15 digits, optional + prefix)
  if (form.phone.trim()) {
    const cleaned = form.phone.replace(/[\s\-().]/g, '');
    if (!/^\+?\d{7,15}$/.test(cleaned)) {
      errors.phone = 'Enter a valid phone number (7-15 digits, e.g. +91 9876543210).';
    }
  }

  // Message: min 20 chars
  if (!form.message.trim()) {
    errors.message = 'Message is required.';
  } else if (form.message.trim().length < 20) {
    errors.message = `Message too short (${form.message.trim().length}/20 min characters).`;
  }

  return errors;
};

/* ── Component ─────────────────────────────── */
const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormFields>({ name: '', email: '', phone: '', service: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  /* Validate a single field on blur */
  const handleBlur = (field: keyof FormFields) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const fieldErrors = validate(form);
    setErrors(prev => ({ ...prev, [field]: fieldErrors[field as keyof FormErrors] }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error on type if field was touched
    if (touched[name as keyof FormFields]) {
      const updated = { ...form, [name]: value };
      const fieldErrors = validate(updated);
      setErrors(prev => ({ ...prev, [name]: fieldErrors[name as keyof FormErrors] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate all fields
    const allTouched = { name: true, email: true, phone: true, message: true };
    setTouched(allTouched);
    const allErrors = validate(form);
    setErrors(allErrors);
    if (Object.keys(allErrors).length > 0) return;

    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name:  form.name.trim(),
          from_email: form.email.trim(),
          phone:      form.phone.trim() || 'Not provided',
          service:    form.service || 'Not specified',
          message:    form.message.trim(),
          to_email:   EMAILJS_CONFIG.TO_EMAIL,
          reply_to:   form.email.trim(),
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      setStatus('sent');
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setErrorMsg('Failed to send message. Please email me directly at princeranjan270@gmail.com');
    }
  };

  const resetForm = () => {
    setForm({ name: '', email: '', phone: '', service: '', message: '' });
    setErrors({}); setTouched({}); setStatus('idle'); setErrorMsg('');
  };

  /* Field helper */
  const fieldState = (field: keyof FormErrors) =>
    touched[field] && errors[field] ? 'error' : touched[field] && !errors[field] ? 'success' : '';

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
                  <p className="contact-card-note">Full-time &amp; part-time projects</p>
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

                {/* SUCCESS */}
                {status === 'sent' ? (
                  <div className="form-success">
                    <div className="success-icon"><CheckCircle2 size={56} color="var(--color-success)" /></div>
                    <h3 className="heading-1" style={{ marginTop: 16 }}>Message Sent!</h3>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 12, maxWidth: 320, textAlign: 'center', lineHeight: 1.7 }}>
                      Thanks for reaching out, <strong>{form.name.split(' ')[0]}</strong>! I'll reply to <strong>{form.email}</strong> within 24 hours.
                    </p>
                    <button className="btn btn-primary" style={{ marginTop: 28 }} onClick={resetForm}>
                      Send Another Message
                    </button>
                  </div>

                ) : (
                  <>
                    <h2 className="heading-1" style={{ marginBottom: 8 }}>Send a Message</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: '0.9rem' }}>
                      Fill the form below and I'll respond as soon as possible.
                    </p>

                    {/* ERROR BANNER */}
                    {status === 'error' && (
                      <div className="form-error-banner">
                        <AlertCircle size={18} /> {errorMsg}
                      </div>
                    )}

                    <form ref={formRef} onSubmit={handleSubmit} className="contact-form" noValidate>

                      {/* Row 1: Name + Email */}
                      <div className="form-row">
                        <div className="form-group">
                          <label className="input-label" htmlFor="name">
                            <User size={13} /> Full Name <span className="required-star">*</span>
                          </label>
                          <input id="name" name="name" type="text"
                            className={`input-field ${fieldState('name')}`}
                            placeholder="e.g. Rakesh Kumar"
                            value={form.name}
                            onChange={handleChange}
                            onBlur={() => handleBlur('name')}
                            autoComplete="name"
                          />
                          {touched.name && errors.name && (
                            <span className="field-error"><AlertCircle size={12} /> {errors.name}</span>
                          )}
                          {touched.name && !errors.name && form.name && (
                            <span className="field-success"><CheckCircle2 size={12} /> Looks good!</span>
                          )}
                        </div>

                        <div className="form-group">
                          <label className="input-label" htmlFor="email">
                            <AtSign size={13} /> Email Address <span className="required-star">*</span>
                          </label>
                          <input id="email" name="email" type="email"
                            className={`input-field ${fieldState('email')}`}
                            placeholder="your@email.com"
                            value={form.email}
                            onChange={handleChange}
                            onBlur={() => handleBlur('email')}
                            autoComplete="email"
                          />
                          {touched.email && errors.email && (
                            <span className="field-error"><AlertCircle size={12} /> {errors.email}</span>
                          )}
                          {touched.email && !errors.email && form.email && (
                            <span className="field-success"><CheckCircle2 size={12} /> Valid email!</span>
                          )}
                        </div>
                      </div>

                      {/* Row 2: Phone + Service */}
                      <div className="form-row">
                        <div className="form-group">
                          <label className="input-label" htmlFor="phone">
                            <PhoneCall size={13} /> Phone Number <span className="optional-tag">(optional)</span>
                          </label>
                          <input id="phone" name="phone" type="tel"
                            className={`input-field ${fieldState('phone')}`}
                            placeholder="+91 XXXXXXXXXX"
                            value={form.phone}
                            onChange={handleChange}
                            onBlur={() => handleBlur('phone')}
                            autoComplete="tel"
                          />
                          {touched.phone && errors.phone && (
                            <span className="field-error"><AlertCircle size={12} /> {errors.phone}</span>
                          )}
                          {touched.phone && !errors.phone && form.phone && (
                            <span className="field-success"><CheckCircle2 size={12} /> Valid number!</span>
                          )}
                        </div>

                        <div className="form-group">
                          <label className="input-label" htmlFor="service">
                            <Briefcase size={13} /> Service Needed <span className="optional-tag">(optional)</span>
                          </label>
                          <select id="service" name="service"
                            className="input-field select-field"
                            value={form.service}
                            onChange={handleChange}>
                            <option value="">Select a service...</option>
                            <option>Website Design &amp; Development</option>
                            <option>WordPress Development</option>
                            <option>Social Media Management</option>
                            <option>Meta Ads Campaign</option>
                            <option>Career Advisory</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="form-group">
                        <label className="input-label" htmlFor="message">
                          <MessageSquare size={13} /> Your Message <span className="required-star">*</span>
                        </label>
                        <textarea id="message" name="message" rows={5}
                          className={`input-field ${fieldState('message')}`}
                          placeholder="Tell me about your project, goals, and timeline... (min 20 characters)"
                          style={{ resize: 'vertical', minHeight: 130 }}
                          value={form.message}
                          onChange={handleChange}
                          onBlur={() => handleBlur('message')}
                        />
                        <div className="field-meta">
                          {touched.message && errors.message ? (
                            <span className="field-error"><AlertCircle size={12} /> {errors.message}</span>
                          ) : touched.message && !errors.message && form.message ? (
                            <span className="field-success"><CheckCircle2 size={12} /> Great message!</span>
                          ) : <span />}
                          <span className="char-count">{form.message.length} chars</span>
                        </div>
                      </div>

                      <button type="submit" className="btn btn-primary btn-lg"
                        style={{ width: '100%' }}
                        disabled={status === 'sending'}>
                        {status === 'sending' ? (
                          <><Loader2 size={18} className="spin-icon" /> Sending...</>
                        ) : (
                          <><Send size={18} /> Send Message</>
                        )}
                      </button>

                      <p className="form-note">
                        Your message will be sent directly to <strong>princeranjan270@gmail.com</strong>
                      </p>
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
