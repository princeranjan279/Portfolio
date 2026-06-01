import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code2, Sun, Moon, ChevronRight, Home, User, Briefcase, FolderOpen, Camera, Mail, Terminal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const navLinks = [
  { path: '/',         label: 'Home',     icon: Home },
  { path: '/about',    label: 'About',    icon: User },
  { path: '/services', label: 'Services', icon: Briefcase },
  { path: '/projects', label: 'Projects', icon: FolderOpen },
  { path: '/gallery',  label: 'Gallery',  icon: Camera },
  { path: '/contact',  label: 'Contact',  icon: Mail },
  { path: '/compiler', label: 'Compiler', icon: Terminal },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Prevent body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="navbar-inner container-lg">

          {/* Brand */}
          <Link to="/" className="navbar-brand" aria-label="Prince Ranjan – Home">
            <div className="brand-icon">
              <Code2 size={20} />
            </div>
            <div className="brand-text">
              <span className="brand-name">Prince</span>
              <span className="brand-dot">.</span>
              <span className="brand-role">dev</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="navbar-links hide-mobile" role="menubar">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                role="menuitem"
                className={`nav-link ${location.pathname === path ? 'active' : ''}`}
              >
                {label}
                {location.pathname === path && <span className="nav-active-dot" />}
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="navbar-actions hide-mobile">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a href="mailto:princeranjan270@gmail.com" className="btn btn-primary btn-sm">
              Hire Me <ChevronRight size={14} />
            </a>
          </div>

          {/* Mobile controls */}
          <div className="mobile-controls show-mobile">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="navbar-toggle"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="drawer-header">
          <Link to="/" className="navbar-brand">
            <div className="brand-icon"><Code2 size={18} /></div>
            <span className="brand-name">Prince Ranjan</span>
          </Link>
          <button className="drawer-close" onClick={() => setOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <nav className="drawer-nav">
          {navLinks.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`drawer-link ${location.pathname === path ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <Icon size={18} />
              {label}
              {location.pathname === path && <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: 'var(--color-primary)', display: 'block' }} />}
            </Link>
          ))}
        </nav>
        <div className="drawer-footer">
          <a
            href="mailto:princeranjan270@gmail.com"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Hire Me <ChevronRight size={16} />
          </a>
        </div>
      </div>
      {open && <div className="drawer-overlay" onClick={() => setOpen(false)} aria-hidden="true" />}
    </>
  );
};

export default Navbar;
