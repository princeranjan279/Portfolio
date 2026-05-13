import React, { useState } from "react";
import { ExternalLink, Globe, FolderOpen, Filter } from "lucide-react";
import { GithubIcon } from "../components/SocialIcons";
import "./Projects.css";

const projects = [
  { id: 1, title: "Prishal Technolabs Website", category: "React", tags: ["React", "TypeScript", "Tailwind"], desc: "Complete corporate website and digital presence for Prishal Technolabs. Built with modern React architecture for extreme performance and SEO.", color: "#5e72e4", emoji: "🏢", live: "https://example.com", github: "" },
  { id: 2, title: "E-Commerce Fashion Store", category: "WordPress", tags: ["WordPress", "WooCommerce", "SEO"], desc: "A full-featured fashion e-commerce store with custom WooCommerce setup, product filters, wishlist, and payment gateway integration.", color: "#11cdef", emoji: "🛍️", live: "https://example.com", github: "" },
  { id: 3, title: "B2B Marketing Campaigns", category: "Marketing", tags: ["Meta Ads", "Google Ads", "Lead Gen"], desc: "High-ROI digital marketing campaigns resulting in 300% lead increase and lower customer acquisition costs.", color: "#fb6340", emoji: "🚀", live: "https://example.com", github: "" },
  { id: 4, title: "Real Estate Listing Portal", category: "React", tags: ["React", "Leaflet", "API"], desc: "Property listing app with map integration, advanced search filters, virtual tours, and agent profiles.", color: "#2dce89", emoji: "🏠", live: "https://example.com", github: "https://github.com/princeranjan" },
  { id: 5, title: "EdTech Course Platform", category: "WordPress", tags: ["WordPress", "LearnDash", "LMS"], desc: "Complete Learning Management System with course builder, quizzes, progress tracking, and certificate generation.", color: "#f7c948", emoji: "📚", live: "https://example.com", github: "" },
  { id: 6, title: "Social Media Dashboard", category: "React", tags: ["React", "Chart.js", "API"], desc: "Analytics dashboard for social media managers with real-time metrics, post scheduling, and performance reports.", color: "#e1306c", emoji: "📊", live: "https://example.com", github: "https://github.com/princeranjan" },
  { id: 7, title: "Fitness & Wellness App", category: "React", tags: ["React", "CSS Animations", "Firebase"], desc: "Modern fitness platform with workout plans, nutrition tracker, progress charts, and coach booking.", color: "#5e72e4", emoji: "💪", live: "https://example.com", github: "https://github.com/princeranjan" },
  { id: 8, title: "Local SEO Dominance", category: "Marketing", tags: ["SEO", "GMB", "Content"], desc: "Comprehensive local SEO strategy that ranked a client #1 for competitive keywords in their region.", color: "#11cdef", emoji: "🔍", live: "https://example.com", github: "" },
];

const categories = ["All", "React", "WordPress", "Marketing"];

const Projects: React.FC = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <main className="projects-page">
      <div className="page-header">
        <div className="glow-orb glow-orb-info" style={{ width: 400, height: 300, top: -80, right: -60 }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="badge badge-info" style={{ marginBottom: 20 }}>
            <FolderOpen size={12} /> Portfolio
          </div>
          <h1 className="display-1" style={{ marginBottom: 16 }}>
            Work That <span className="text-gradient">Speaks Volumes</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: 580 }}>
            A showcase of 50+ projects from sleek landing pages to full-scale web platforms.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="projects-filter">
            <Filter size={16} style={{ color: "var(--text-muted)" }} />
            {categories.map((cat) => (
              <button key={cat} className={`filter-btn ${filter === cat ? "active" : ""}`} onClick={() => setFilter(cat)}>
                {cat} ({cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length})
              </button>
            ))}
          </div>

          {filter === "All" && (
            <div className="featured-project">
              <div className="featured-tag"><span>Featured Project</span></div>
              <div className="featured-grid">
                <div className="featured-emoji" style={{ background: `${projects[0].color}18` }}>
                  <span style={{ fontSize: "5rem" }}>{projects[0].emoji}</span>
                </div>
                <div className="featured-content">
                  <div className="flex gap-8" style={{ flexWrap: "wrap", marginBottom: 12 }}>
                    {projects[0].tags.map((t) => (<span key={t} className="badge badge-primary">{t}</span>))}
                  </div>
                  <h2 className="heading-1" style={{ marginBottom: 12 }}>{projects[0].title}</h2>
                  <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 24 }}>{projects[0].desc}</p>
                  <a href={projects[0].live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <Globe size={16} /> Live Preview
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="projects-grid">
            {filtered.filter((_, i) => !(filter === "All" && i === 0)).map((project) => (
              <div key={project.id} className="project-card card">
                <div className="project-thumbnail" style={{ background: `${project.color}12` }}>
                  <span className="project-emoji">{project.emoji}</span>
                  <div className="project-overlay">
                    <div className="flex gap-12">
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                        <Globe size={14} /> Live
                      </a>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                          <GithubIcon size={14} /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="flex gap-8" style={{ flexWrap: "wrap", marginBottom: 10 }}>
                    {project.tags.map((t) => (<span key={t} className="skill-tag" style={{ fontSize: "0.72rem", padding: "3px 10px" }}>{t}</span>))}
                  </div>
                  <h3 className="heading-2" style={{ marginBottom: 8 }}>{project.title}</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.7 }}>{project.desc}</p>
                  <div className="project-links">
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link">
                      <ExternalLink size={14} /> View Project
                    </a>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                        <GithubIcon size={14} /> Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Projects;