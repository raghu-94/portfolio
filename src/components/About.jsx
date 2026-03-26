import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const stats = [
  { value: '1.5+', label: 'Years Experience', icon: '🧑‍💻' },
  { value: '15×', label: 'MTTD Improvement', icon: '⚡' },
  { value: '70%', label: 'Provisioning Time Reduced', icon: '🚀' },
  { value: '0', label: 'HIGH Security Findings', icon: '🛡️' },
];

const highlights = [
  { icon: '☁️', title: 'Cloud-Native Infrastructure', desc: 'Designing and operating scalable AWS platforms with VPC, EKS, RDS Aurora, and S3 from infrastructure as code.' },
  { icon: '📊', title: 'Full-Stack Observability', desc: 'Unified metrics, logs, and traces using Prometheus, Grafana, Loki, and Jaeger — Reduced MTTD from 22 min to 87 sec.' },
  { icon: '🔐', title: 'Security-First Approach', desc: 'Policy-as-code with Checkov & tfsec, zero HIGH findings, Trivy container scanning, and AWS Secrets Manager.' },
  { icon: '🔄', title: 'GitOps & CI/CD', desc: 'Automated delivery pipelines with GitHub Actions, ArgoCD, and Docker — zero-downtime deployments at scale.' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">About Me</span>
          <h2 className="section-title">The Engineer Behind<br /><span>the Infrastructure</span></h2>
          <p className="section-subtitle">
            I turn complex infrastructure challenges into elegant, automated solutions.
          </p>
        </motion.div>

        <div className="about-grid">
          {/* Left: Bio */}
          <motion.div
            className="about-bio"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="bio-terminal">
              <div className="bio-terminal-header">
                <span className="bio-file">~/about/raghavendra.md</span>
              </div>
              <div className="bio-content">
                <p className="bio-text">
                  Results-driven <span className="text-cyan">DevOps & Cloud Engineer</span> with <span className="text-cyan">1.5+ years</span> of hands-on experience designing and operating cloud-native infrastructure on AWS.
                </p>
                <br />
                <p className="bio-text">
                  Proven ability to provision multi-environment platforms using <span className="text-purple">Terraform</span>, deploy full-stack observability systems (<span className="text-purple">Prometheus, Grafana, Loki, Jaeger</span>), and implement SLO-based alerting that reduced Mean Time to Detect from <span className="text-green">22 minutes to under 90 seconds</span>.
                </p>
                <br />
                <p className="bio-text">
                  Comfortable working across the full DevOps lifecycle — from <span className="text-cyan">Infrastructure as Code</span> and CI/CD pipelines to <span className="text-cyan">container orchestration</span> on Kubernetes and production monitoring.
                </p>
              </div>
            </div>

            <div className="contact-card">
              <h4>📬 Get in Touch</h4>
              <div className="contact-items">
                <a href="tel:+917013906299" className="contact-item" id="about-phone-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 14a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 3h3a2 2 0 0 1 2 1.72c.13.97.35 1.93.68 2.86a2 2 0 0 1-.45 2.11L7.09 10.9a16 16 0 0 0 6.01 6.01l1.21-1.21a2 2 0 0 1 2.11-.45c.93.33 1.89.55 2.86.68A2 2 0 0 1 21 18z"/></svg>
                  +91 7013906299
                </a>
                <a href="mailto:g.raghavendrarao@hotmail.com" className="contact-item" id="about-email-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  g.raghavendrarao@hotmail.com
                </a>
                <a href="https://linkedin.com/in/raghavendra-rao-38b4823b4" className="contact-item" id="about-linkedin-link" target="_blank" rel="noopener noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                  linkedin.com/in/raghavendra-rao
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Stats + Highlights */}
          <div className="about-right">
            {/* Stats */}
            <motion.div
              className="stats-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {stats.map((stat) => (
                <motion.div key={stat.label} className="stat-card" variants={itemVariants}>
                  <span className="stat-icon">{stat.icon}</span>
                  <span className="stat-card-value">{stat.value}</span>
                  <span className="stat-card-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Highlights */}
            <motion.div
              className="highlights-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {highlights.map((h) => (
                <motion.div key={h.title} className="highlight-card glass-card" variants={itemVariants}>
                  <span className="highlight-icon">{h.icon}</span>
                  <h4 className="highlight-title">{h.title}</h4>
                  <p className="highlight-desc">{h.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
