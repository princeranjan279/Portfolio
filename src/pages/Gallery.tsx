import React, { useState } from "react";
import { Camera, Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import "./Gallery.css";

const memories = [
  { id: 1, icon: "laptop", title: "Coding Session", category: "Work", desc: "Late night building magic with React and TypeScript", color: "#5e72e4", wide: true },
  { id: 2, icon: "palette", title: "Design Workshop", category: "Design", desc: "UI/UX workshop with fellow designers", color: "#11cdef", wide: false },
  { id: 3, icon: "rocket", title: "Product Launch", category: "Work", desc: "Successfully launched client e-commerce platform", color: "#2dce89", wide: false },
  { id: 4, icon: "graduation", title: "Tech Talk", category: "Community", desc: "Conducted a frontend dev talk at a college event", color: "#f7c948", wide: false },
  { id: 5, icon: "handshake", title: "Client Meeting", category: "Work", desc: "Strategy session with business clients", color: "#fb6340", wide: false },
  { id: 6, icon: "globe", title: "Website Launch", category: "Work", desc: "Grand launch of a corporate WordPress website", color: "#5e72e4", wide: true },
  { id: 7, icon: "mobile", title: "Mobile Design", category: "Design", desc: "Exploring mobile-first design patterns", color: "#e1306c", wide: false },
  { id: 8, icon: "trophy", title: "Award Moment", category: "Achievement", desc: "Recognized as best freelance developer", color: "#f7c948", wide: false },
  { id: 9, icon: "chart", title: "Analytics Review", category: "Work", desc: "Monthly ad performance review session", color: "#11cdef", wide: false },
  { id: 10, icon: "target", title: "Campaign Win", category: "Marketing", desc: "Meta Ads campaign with 5x ROAS achieved!", color: "#2dce89", wide: false },
  { id: 11, icon: "coffee", title: "Creative Brainstorm", category: "Work", desc: "Coffee-fuelled ideas session with team", color: "#fb6340", wide: false },
  { id: 12, icon: "star", title: "Mentorship Session", category: "Community", desc: "Guiding youngsters through career paths", color: "#5e72e4", wide: true },
];

const iconMap: Record<string, string> = { laptop: "💻", palette: "🎨", rocket: "🚀", graduation: "🎓", handshake: "🤝", globe: "🌐", mobile: "📱", trophy: "🏆", chart: "📊", target: "🎯", coffee: "☕", star: "⭐" };

const categories = ["All", "Work", "Design", "Community", "Marketing", "Achievement"];

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filtered = filter === "All" ? memories : memories.filter((m) => m.category === filter);
  const currentIdx = lightbox !== null ? filtered.findIndex((m) => m.id === lightbox) : -1;
  const navigate = (dir: number) => { const newIdx = currentIdx + dir; if (newIdx >= 0 && newIdx < filtered.length) setLightbox(filtered[newIdx].id); };

  return (
    <main className="gallery-page">
      <div className="page-header">
        <div className="glow-orb glow-orb-accent" style={{ width: 400, height: 300, top: -80, left: "30%" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="badge badge-warning" style={{ marginBottom: 20 }}><Camera size={12} /> Gallery</div>
          <h1 className="display-1" style={{ marginBottom: 16 }}>Moments & <span className="text-gradient-gold">Memories</span></h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: 560 }}>A visual journey through projects, events, collaborations, and milestones.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="gallery-filter">
            {categories.map((cat) => (<button key={cat} className={`filter-btn ${filter === cat ? "active" : ""}`} onClick={() => setFilter(cat)}>{cat}</button>))}
          </div>

          <div className="gallery-grid">
            {filtered.map((item) => (
              <div key={item.id} className={`gallery-item ${item.wide ? "wide" : ""}`} onClick={() => setLightbox(item.id)}>
                <div className="gallery-visual" style={{ background: `${item.color}15` }}>
                  <span className="gallery-emoji">{iconMap[item.icon]}</span>
                  <div className="gallery-overlay"><div className="gallery-overlay-content"><Play size={24} fill="white" color="white" /><span style={{ color: "white", fontWeight: 600, fontSize: "0.9rem" }}>View</span></div></div>
                </div>
                <div className="gallery-info">
                  <div className="flex-between"><span className="gallery-title">{item.title}</span><span className="badge" style={{ background: `${item.color}18`, color: item.color, border: `1px solid ${item.color}30`, fontSize: "0.7rem" }}>{item.category}</span></div>
                  <p className="gallery-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && currentIdx !== -1 && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}><X size={20} /></button>
            <button className="lightbox-nav nav-prev" onClick={() => navigate(-1)} disabled={currentIdx === 0}><ChevronLeft size={24} /></button>
            <div className="lightbox-content">
              <div className="lightbox-visual" style={{ background: `${filtered[currentIdx].color}15` }}>
                <span style={{ fontSize: "8rem" }}>{iconMap[filtered[currentIdx].icon]}</span>
              </div>
              <div className="lightbox-info">
                <span className="badge badge-primary" style={{ marginBottom: 12 }}>{filtered[currentIdx].category}</span>
                <h2 className="heading-1">{filtered[currentIdx].title}</h2>
                <p style={{ color: "var(--text-secondary)", marginTop: 8, lineHeight: 1.7 }}>{filtered[currentIdx].desc}</p>
                <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginTop: 16 }}>{currentIdx + 1} / {filtered.length}</p>
              </div>
            </div>
            <button className="lightbox-nav nav-next" onClick={() => navigate(1)} disabled={currentIdx === filtered.length - 1}><ChevronRight size={24} /></button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Gallery;