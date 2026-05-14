import React, { useState } from "react";
import { ExternalLink, Globe, FolderOpen, Filter } from "lucide-react";
import { GithubIcon } from "../components/SocialIcons";
import { allProjects, projectCategories } from "../data/projects";
import "./Projects.css";

const Projects: React.FC = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? allProjects : allProjects.filter((p) => p.category === filter);

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
            {projectCategories.map((cat) => (
              <button key={cat} className={`filter-btn ${filter === cat ? "active" : ""}`} onClick={() => setFilter(cat)}>
                {cat} ({cat === "All" ? allProjects.length : allProjects.filter((p) => p.category === cat).length})
              </button>
            ))}
          </div>

          {filter === "All" && (
            <div className="featured-project">
              <div className="featured-tag"><span>Featured Project</span></div>
              <div className="featured-grid">
                <div className="featured-emoji" style={{ background: `${allProjects[0].color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {allProjects[0].image ? (
                    <img 
                      src={allProjects[0].image} 
                      alt={allProjects[0].title} 
                      style={{ width: '240px', height: '140px', objectFit: 'contain', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.15))' }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.nextElementSibling) {
                          (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                        }
                      }}
                    />
                  ) : null}
                  <span style={{ fontSize: "5rem", display: allProjects[0].image ? 'none' : 'block' }}>{allProjects[0].emoji}</span>
                </div>
                <div className="featured-content">
                  <div className="flex gap-8" style={{ flexWrap: "wrap", marginBottom: 12 }}>
                    {allProjects[0].tags.map((t) => (<span key={t} className="badge badge-primary">{t}</span>))}
                  </div>
                  <h2 className="heading-1" style={{ marginBottom: 12 }}>{allProjects[0].title}</h2>
                  <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 24 }}>{allProjects[0].desc}</p>
                  <a href={allProjects[0].live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <Globe size={16} /> Live Preview
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="projects-grid">
            {filtered.filter((_, i) => !(filter === "All" && i === 0)).map((project) => (
              <div key={project.id} className="project-card card">
                <div className="project-thumbnail" style={{ background: `${project.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      style={{ width: '160px', height: '90px', objectFit: 'contain', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))', position: 'relative', zIndex: 1 }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.nextElementSibling) {
                          (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                        }
                      }}
                    />
                  ) : null}
                  <span className="project-emoji" style={{ display: project.image ? 'none' : 'flex', position: 'relative', zIndex: 1 }}>{project.emoji}</span>
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