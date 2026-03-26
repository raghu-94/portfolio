import React from 'react';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">
            <span className="brand-bracket">&lt;</span>
            <span className="brand-name">GRR</span>
            <span className="brand-bracket"> /&gt;</span>
          </span>
          <p className="footer-tagline">Turning infrastructure complexity into elegant automation.</p>
        </div>

        <div className="footer-links">
          {['hero','about','skills','projects','contact'].map(id => (
            <a
              key={id}
              href={`#${id}`}
              className="footer-link"
              id={`footer-nav-${id}`}
              onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>

        <p className="footer-copy">
          © {year} G. Raghavendra Rao · Built with React & Framer Motion
        </p>
      </div>
    </footer>
  );
}
