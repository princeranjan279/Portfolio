import React, { useState } from 'react';
import { 
  MessageSquare, Star, Quote, CheckCircle2, 
  ExternalLink, ArrowLeft, X, Users 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { initialTestimonials } from '../data/testimonials';
import './Testimonials.css';

/* ── Review Lightbox Component (Duplicate of Home for consistency) ──────────────── */
const ReviewLightbox: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  onSubmit: (review: any) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit({
        name,
        role,
        text,
        rating,
        date: 'Just now',
        image: image || '/profile.jpg' 
      });
      setIsSubmitting(false);
      onClose();
      setName(''); setRole(''); setText(''); setRating(5); setImage(null);
    }, 1000);
  };

  return (
    <div className="lightbox-wrapper">
      <div className="lightbox-backdrop" onClick={onClose} />
      <div className="review-modal-card animate-fadeInUp">
        <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>
        <div className="review-modal-header">
          <div className="icon-box icon-box-lg"><MessageSquare size={24} /></div>
          <h3 className="heading-2">Write a <span className="text-gradient">Review</span></h3>
          <p className="section-desc">Your feedback helps me improve and grow.</p>
        </div>
        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-row">
            <div className="form-group">
              <label className="input-label">Full Name</label>
              <input type="text" className="input-field" placeholder="John Doe" required value={name} onChange={e => setName(e.target.value)} autoComplete="name" />
            </div>
            <div className="form-group">
              <label className="input-label">Role / Company</label>
              <input type="text" className="input-field" placeholder="CEO at TechCorp" required value={role} onChange={e => setRole(e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className="input-label">Rating</label>
            <div className="rating-selector">
              {[1,2,3,4,5].map(s => (
                <button key={s} type="button" onClick={() => setRating(s)} className={`star-btn ${s <= rating ? 'active' : ''}`}>
                  <Star size={24} fill={s <= rating ? '#FBBC05' : 'transparent'} color="#FBBC05" />
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="input-label">Profile Photo (Optional)</label>
            <div className="image-upload-wrapper">
              <input type="file" id="reviewer-image" accept="image/*" className="image-input-hidden" onChange={handleImageChange} />
              <label htmlFor="reviewer-image" className="image-upload-label">
                {image ? (
                  <div className="image-preview-container">
                    <img src={image} alt="Preview" className="image-preview-thumb" />
                    <span className="image-change-text">Change Photo</span>
                  </div>
                ) : (
                  <div className="image-upload-placeholder">
                    <div className="icon-box icon-box-sm"><Users size={16} /></div>
                    <span>Click to upload your photo</span>
                  </div>
                )}
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="input-label">Your Experience</label>
            <textarea className="input-field" rows={4} placeholder="Tell us about your experience..." required value={text} onChange={e => setText(e.target.value)}></textarea>
          </div>
          <button type="submit" className="btn btn-primary btn-lg w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const handleReviewSubmit = (review: any) => {
    setTestimonials([review, ...testimonials]);
  };

  return (
    <main className="testimonials-page">
      <div className="glow-orb orb-1" />
      <div className="glow-orb orb-2" />
      
      <div className="page-header">
        <div className="container">
          <Link to="/" className="back-link"><ArrowLeft size={16} /> Back to Home</Link>
          <div className="badge badge-primary" style={{ marginBottom: 20 }}>Wall of Love</div>
          <h1 className="display-1">What Clients <span className="text-gradient">Say</span></h1>
          <p className="page-desc">Real feedback from real clients. My commitment to quality is reflected in every project.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="trust-badge-row">
            <div className="google-rating">
              <div className="google-logo">
                <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              </div>
              <div className="google-stats">
                <strong>4.9/5</strong>
                <span>Average Rating</span>
              </div>
              <div className="google-stars">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#FBBC05" color="#FBBC05" />)}
              </div>
              <span className="google-count">(50+ Reviews)</span>
            </div>
            <div className="trust-divider" />
            <div className="verified-badge">
              <CheckCircle2 size={16} color="#10b981" />
              <span>100% Verified Reviews</span>
            </div>
          </div>

          <div className="testimonials-grid-archive">
            {testimonials.map(({ name, role, text, rating, image, date }, idx) => (
              <div key={`${name}-${idx}`} className="testi-card-premium">
                <div className="testi-quote-icon"><Quote size={24} /></div>
                <div className="testi-content">
                  <div className="testi-stars">
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star key={i} size={16} fill="#FBBC05" color="#FBBC05" />
                    ))}
                  </div>
                  <p className="testi-text">"{text}"</p>
                </div>
                <div className="testi-footer">
                  <div className="testi-user">
                    <div className="testi-avatar">
                      <img src={image} alt={name} />
                      <div className="testi-avatar-ring" />
                    </div>
                    <div className="testi-info">
                      <h4 className="testi-name">{name}</h4>
                      <p className="testi-role">{role}</p>
                    </div>
                  </div>
                  <div className="testi-meta">
                    <span className="testi-date">{date}</span>
                    <div className="testi-g-icon">
                      <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="testi-actions">
            <a href="https://www.google.com/search?q=Prince+Ranjan+Patna+Reviews" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              View All Google Reviews <ExternalLink size={16} />
            </a>
            <button onClick={() => setIsReviewModalOpen(true)} className="btn btn-primary">
              Write a Review
            </button>
          </div>
        </div>
      </section>

      <ReviewLightbox 
        isOpen={isReviewModalOpen} 
        onClose={() => setIsReviewModalOpen(false)} 
        onSubmit={handleReviewSubmit}
      />
    </main>
  );
};

export default Testimonials;
