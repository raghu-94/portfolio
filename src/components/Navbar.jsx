import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <a className="nav-brand" href="#hero" onClick={() => handleNav('#hero')}>
          <span className="brand-bracket">&lt;</span>
          <span className="brand-name">GRR</span>
          <span className="brand-bracket"> /&gt;</span>
        </a>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`nav-link${active === link.href.slice(1) ? ' active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="mailto:g.raghavendrarao@hotmail.com"
          className="nav-cta"
          id="nav-hire-btn"
        >
          Hire Me
        </a>

        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          id="hamburger-btn"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
