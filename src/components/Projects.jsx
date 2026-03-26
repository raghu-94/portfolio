import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: 'Multi-Environment AWS Platform',
    subtitle: 'Infrastructure as Code',
    category: 'Infrastructure',
    emoji: '🏗️',
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(0,212,255,0.05))',
    tags: ['Terraform', 'AWS VPC', 'EKS', 'RDS Aurora', 'S3', 'DynamoDB', 'tfsec', 'Checkov'],
    summary: 'Designed a fully immutable, DRY Terraform codebase provisioning a complete AWS platform across dev, staging, and production from a single source of truth.',
    highlights: [
      '70% reduction in infrastructure provisioning time',
      'Zero drift incidents via S3 + DynamoDB remote state with workspace-per-environment isolation',
      'VPC Endpoints eliminated NAT Gateway costs for internal AWS traffic',
      'Checkov gates: 0 HIGH-severity findings before any terraform apply',
      'Scheduled drift-detection CI job alerts on ClickOps divergence',
    ],
    metric: { label: 'Provisioning Time Reduced', value: '70%', sub: 'via reusable Terraform modules' },
    github: null,
    live: null,
  },
  {
    id: 2,
    title: 'Full-Stack Observability Platform',
    subtitle: 'Monitoring & Observability',
    category: 'Observability',
    emoji: '📊',
    color: '#00d4ff',
    gradient: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,255,136,0.05))',
    tags: ['Prometheus', 'Grafana', 'Loki', 'Promtail', 'Jaeger', 'OpenTelemetry', 'AlertManager', 'Helm', 'Kubernetes'],
    summary: 'Deployed the complete kube-prometheus-stack and Loki+Promtail via Helm on Kubernetes, replacing manual kubectl log-grep workflows with a unified observability platform.',
    highlights: [
      'MTTD reduced from 22 minutes → 87 seconds (15× improvement)',
      'Custom Prometheus metrics: histogram, counter, gauge on Node.js cart-service',
      'OpenTelemetry auto-instrumentation: zero code changes, distributed traces to Jaeger',
      'Structured JSON logging in Loki, unified Grafana RED dashboard (Rate, Errors, Duration)',
      '3 SLO-based PrometheusRule CRDs: CartHighErrorRate, CartHighLatency, CartPodCrashLoop',
      'Validated via chaos engineering — pod scale-to-zero injection with documented MTTD proof',
    ],
    metric: { label: 'MTTD Improvement', value: '15×', sub: '22 min → 87 sec via SLO alerting' },
    github: null,
    live: null,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
};

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="project-card glass-card"
      variants={cardVariants}
      style={{ '--project-color': project.color, '--project-gradient': project.gradient }}
      id={`project-card-${project.id}`}
    >
      {/* Top accent bar */}
      <div className="project-accent-bar" />

      {/* Header */}
      <div className="project-header">
        <div className="project-emoji-wrap">
          <span className="project-emoji">{project.emoji}</span>
        </div>
        <div className="project-header-text">
          <span className="project-category">{project.category}</span>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-subtitle">{project.subtitle}</p>
        </div>
      </div>

      {/* Metric spotlight */}
      <div className="project-metric">
        <span className="metric-value">{project.metric.value}</span>
        <div className="metric-details">
          <span className="metric-label">{project.metric.label}</span>
          <span className="metric-sub">{project.metric.sub}</span>
        </div>
      </div>

      {/* Summary */}
      <p className="project-summary">{project.summary}</p>

      {/* Tags */}
      <div className="project-tags">
        {project.tags.map(tag => (
          <span key={tag} className="project-tag">{tag}</span>
        ))}
      </div>

      {/* Expandable highlights */}
      <button
        className="expand-btn"
        onClick={() => setExpanded(v => !v)}
        id={`project-expand-${project.id}`}
      >
        <span>{expanded ? 'Hide Details' : 'View Details'}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)', transition: '0.3s ease' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="project-highlights"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <h4 className="highlights-title">Key Achievements</h4>
            <ul className="highlights-list">
              {project.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  className="highlight-item"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <span className="highlight-bullet">▸</span>
                  {h}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer links */}
      <div className="project-footer">
        <span className="project-status">
          <span className="status-dot" />
          Production Ready
        </span>
        <div className="project-links">
          {project.github ? (
            <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer" id={`project-github-${project.id}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
              GitHub
            </a>
          ) : (
            <span className="project-link-disabled">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Private
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Portfolio</span>
          <h2 className="section-title">Featured <span>Projects</span></h2>
          <p className="section-subtitle">
            Real-world infrastructure projects with measurable impact — from IaC platforms to observability pipelines.
          </p>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* Coming soon card */}
        <motion.div
          className="more-projects"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="more-card glass-card">
            <span className="more-icon">🚧</span>
            <div>
              <h4>More Projects Coming Soon</h4>
              <p>Currently working on new infrastructure and automation projects. Stay tuned!</p>
            </div>
            <a
              href="https://linkedin.com/in/raghavendra-rao-38b4823b4"
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
              id="projects-linkedin-btn"
            >
              Follow on LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
