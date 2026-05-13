import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import AIAgentWidget from './components/AIAgentWidget';
import './index.css';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Projects = lazy(() => import('./pages/Projects'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));

const LoadingFallback = () => (
  <div style={{
    height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'var(--bg-dark)', flexDirection: 'column', gap: '16px'
  }}>
    <div style={{
      width: 48, height: 48, borderRadius: '50%',
      border: '3px solid rgba(94,114,228,0.2)',
      borderTopColor: 'var(--color-primary)', 
      animation: 'spin 0.8s linear infinite'
    }} />
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Loading...</p>
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App: React.FC = () => (
  <ThemeProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={
            <div style={{
              height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 16, paddingTop: 'var(--navbar-height)'
            }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '6rem', fontWeight: 900, color: 'var(--color-primary)' }}>404</h1>
              <p style={{ color: 'var(--text-secondary)' }}>This page does not exist.</p>
              <a href="/" className="btn btn-primary">Go Home</a>
            </div>
          } />
        </Routes>
      </Suspense>
      <Footer />
      <WhatsAppWidget />
      <AIAgentWidget />
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
