import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';

const ROLES = [
  'DevOps Engineer',
  'Cloud Architect',
  'Kubernetes Engineer',
  'Infrastructure as Code Specialist',
  'Observability Expert',
];

const TERMINAL_LINES = [
  { prompt: '~$', cmd: 'whoami', delay: 500 },
  { prompt: '', output: 'g.raghavendra_rao  |  DevOps & Cloud Engineer', delay: 800, isOutput: true, accent: true },
  { prompt: '~$', cmd: 'cat pipeline.yaml | grep deploy-time', delay: 1400 },
  { prompt: '', output: 'deploy_time: "3 hours → under 10 minutes ⚡"', delay: 1700, isOutput: true },
  { prompt: '~$', cmd: 'argocd app sync novapay --strategy=blue-green', delay: 2500 },
  { prompt: '', output: 'Switching traffic: blue → green (k6 verified, 0 errors)', delay: 2850, isOutput: true },
  { prompt: '', output: '✓ Zero-downtime deployment complete. Change failure: 40% → 5% 🚀', delay: 3400, isOutput: true, success: true },
  { prompt: '~$', cmd: 'terraform plan --drift-detect  # runs every 6h via GitHub Actions', delay: 4200 },
  { prompt: '', output: '✓ No drift detected. Infrastructure matches declared state.', delay: 4600, isOutput: true, success: true },
  { prompt: '~$', cmd: 'echo "Open to opportunities 👋"', delay: 5200 },
  { prompt: '', output: 'Open to opportunities 👋', delay: 5500, isOutput: true, accent: true },
];

function useTypewriter(text, speed = 35, start = true) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!start) { setDisplayed(''); setDone(false); return; }
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(interval); setDone(true); }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, start]);
  return [displayed, done];
}

function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? '0,212,255' : '124,58,237';
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 100; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      // draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,212,255,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="particle-canvas" />;
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [terminalLines, setTerminalLines] = useState([]);
  const [roleTyped, roleDone] = useTypewriter(ROLES[roleIndex], 60);
  const terminalRef = useRef(null);

  // Role cycle
  useEffect(() => {
    if (!roleDone) return;
    const t = setTimeout(() => setRoleIndex(i => (i + 1) % ROLES.length), 2200);
    return () => clearTimeout(t);
  }, [roleDone]);

  // Terminal animation
  useEffect(() => {
    const timers = TERMINAL_LINES.map((line, idx) =>
      setTimeout(() => {
        setTerminalLines(prev => [...prev, { ...line, id: idx }]);
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="hero" id="hero">
      <ParticleCanvas />

      {/* Grid overlay */}
      <div className="hero-grid" />

      <div className="hero-content container">
        {/* Left: Text */}
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="badge-dot" />
            Available for opportunities
          </motion.div>

          <motion.h1
            className="hero-greeting"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Hello, I'm
          </motion.h1>

          <motion.h2
            className="hero-name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
          >
            G. Raghavendra Rao
          </motion.h2>

          <motion.div
            className="hero-role-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <span className="role-prefix">$ </span>
            <span className="hero-role">{roleTyped}</span>
            <span className="cursor-blink">▋</span>
          </motion.div>

          <motion.p
            className="hero-bio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Results-driven <strong>DevOps & Cloud Engineer</strong> with <strong>1.5+ years</strong> architecting
            production-grade CI/CD pipelines, GitOps delivery, and multi-environment AWS platforms with
            zero-downtime <strong>Blue/Green deployments</strong> and policy-as-code security.
          </motion.p>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <div className="stat">
              <span className="stat-value">1.5+</span>
              <span className="stat-label">Years Exp.</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-value">18×</span>
              <span className="stat-label">Deploy Faster</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-value">5%</span>
              <span className="stat-label">Change Failure Rate</span>
            </div>
          </motion.div>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.25 }}
          >
            <a
              href="#projects"
              className="btn btn-primary"
              id="hero-view-work-btn"
              onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              View My Work
            </a>
            <a
              href="#contact"
              className="btn btn-secondary"
              id="hero-contact-btn"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Let's Talk
            </a>
          </motion.div>

          <motion.div
            className="hero-socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <a
              href="mailto:g.raghavendrarao@hotmail.com"
              className="social-link"
              id="hero-email-link"
              title="Email"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </a>
            <a
              href="https://linkedin.com/in/raghavendra-rao-38b4823b4"
              className="social-link"
              id="hero-linkedin-link"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Right: Terminal */}
        <motion.div
          className="hero-terminal-wrapper"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="terminal" id="hero-terminal">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <span className="terminal-title">raghavendra@devops-cloud ~ zsh</span>
            </div>
            <div className="terminal-body" ref={terminalRef}>
              <AnimatePresence>
                {terminalLines.map((line) => (
                  <motion.div
                    key={line.id}
                    className={`terminal-line${line.isOutput ? ' output' : ''}${line.accent ? ' accent' : ''}${line.success ? ' success' : ''}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {!line.isOutput && <span className="terminal-prompt">{line.prompt}</span>}
                    <span className={line.isOutput ? '' : 'terminal-cmd'}>{line.isOutput ? line.output : line.cmd}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {terminalLines.length < TERMINAL_LINES.length && (
                <div className="terminal-line">
                  <span className="terminal-prompt">~$</span>
                  <span className="terminal-cursor">▋</span>
                </div>
              )}
            </div>
          </div>

          {/* Floating badges */}
          <motion.div
            className="floating-badge badge-aws"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            ☁️ AWS
          </motion.div>
          <motion.div
            className="floating-badge badge-k8s"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            ⚙️ Kubernetes
          </motion.div>
          <motion.div
            className="floating-badge badge-terraform"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            🏗️ Terraform
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}
