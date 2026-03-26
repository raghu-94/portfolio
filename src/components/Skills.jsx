import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const skillCategories = [
  {
    id: 'cloud',
    label: 'Cloud Platform',
    icon: '☁️',
    color: '#ff9900',
    skills: [
      { name: 'AWS', level: 90, icon: '⚡' },
      { name: 'VPC', level: 88, icon: '🌐' },
      { name: 'EKS', level: 85, icon: '⚙️' },
      { name: 'RDS Aurora', level: 80, icon: '🗄️' },
      { name: 'S3', level: 92, icon: '📦' },
      { name: 'IAM', level: 85, icon: '🔐' },
      { name: 'Route 53', level: 78, icon: '🌍' },
      { name: 'CloudWatch', level: 82, icon: '📊' },
    ],
  },
  {
    id: 'iac',
    label: 'Infrastructure as Code',
    icon: '🏗️',
    color: '#7c3aed',
    skills: [
      { name: 'Terraform', level: 90, icon: '🔧' },
      { name: 'Terragrunt', level: 82, icon: '🔨' },
      { name: 'tfsec', level: 85, icon: '🛡️' },
      { name: 'Checkov', level: 88, icon: '✅' },
    ],
  },
  {
    id: 'containers',
    label: 'Containerisation',
    icon: '🐳',
    color: '#326ce5',
    skills: [
      { name: 'Docker', level: 90, icon: '🐳' },
      { name: 'Kubernetes', level: 85, icon: '⚙️' },
      { name: 'Helm', level: 82, icon: '⛵' },
      { name: 'ArgoCD', level: 80, icon: '🔄' },
      { name: 'kind', level: 78, icon: '🧪' },
    ],
  },
  {
    id: 'cicd',
    label: 'CI/CD',
    icon: '🔄',
    color: '#00d4ff',
    skills: [
      { name: 'GitHub Actions', level: 88, icon: '🐙' },
      { name: 'Git', level: 92, icon: '📝' },
      { name: 'Docker Hub', level: 85, icon: '📦' },
      { name: 'Amazon ECR', level: 82, icon: '🗂️' },
    ],
  },
  {
    id: 'observability',
    label: 'Observability',
    icon: '📊',
    color: '#00ff88',
    skills: [
      { name: 'Prometheus', level: 90, icon: '📈' },
      { name: 'Grafana', level: 88, icon: '📊' },
      { name: 'Loki', level: 85, icon: '📋' },
      { name: 'Jaeger', level: 80, icon: '🔍' },
      { name: 'OpenTelemetry', level: 78, icon: '🌡️' },
      { name: 'AlertManager', level: 85, icon: '🔔' },
    ],
  },
  {
    id: 'security',
    label: 'Security',
    icon: '🛡️',
    color: '#f472b6',
    skills: [
      { name: 'Trivy', level: 85, icon: '🔍' },
      { name: 'tfsec', level: 85, icon: '🛡️' },
      { name: 'Checkov', level: 88, icon: '✅' },
      { name: 'Secrets Manager', level: 82, icon: '🔑' },
    ],
  },
  {
    id: 'scripting',
    label: 'Scripting & Languages',
    icon: '💻',
    color: '#fbbf24',
    skills: [
      { name: 'Bash', level: 88, icon: '💻' },
      { name: 'YAML', level: 92, icon: '📄' },
      { name: 'Node.js', level: 75, icon: '🟢' },
      { name: 'JSON', level: 90, icon: '{}' },
    ],
  },
  {
    id: 'practices',
    label: 'Practices',
    icon: '♾️',
    color: '#34d399',
    skills: [
      { name: 'GitOps', level: 85, icon: '🔄' },
      { name: 'SLO/SLA Alerting', level: 88, icon: '🎯' },
      { name: 'Chaos Engineering', level: 80, icon: '💥' },
      { name: 'Zero-downtime', level: 85, icon: '⬆️' },
      { name: 'DRY IaC', level: 90, icon: '♾️' },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? skillCategories
    : skillCategories.filter(c => c.id === activeCategory);

  return (
    <section className="skills" id="skills">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Tech Stack</span>
          <h2 className="section-title">Tools & <span>Technologies</span></h2>
          <p className="section-subtitle">
            A deep, battle-tested toolkit spanning cloud, containers, observability, and security.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="skills-filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            className={`filter-btn${activeCategory === 'all' ? ' active' : ''}`}
            onClick={() => setActiveCategory('all')}
            id="skill-filter-all"
          >
            All
          </button>
          {skillCategories.map(cat => (
            <button
              key={cat.id}
              className={`filter-btn${activeCategory === cat.id ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
              id={`skill-filter-${cat.id}`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Skill cards */}
        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          key={activeCategory}
        >
          {filtered.map(category => (
            <motion.div
              key={category.id}
              className="skill-category-card glass-card"
              variants={cardVariants}
              style={{ '--cat-color': category.color }}
            >
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h3 className="category-name">{category.label}</h3>
                <span className="category-count">{category.skills.length} tools</span>
              </div>
              <div className="skill-tags">
                {category.skills.map(skill => (
                  <motion.div
                    key={skill.name}
                    className="skill-tag"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span className="skill-tag-icon">{skill.icon}</span>
                    <span>{skill.name}</span>
                    <div
                      className="skill-proficiency"
                      style={{ '--level': `${skill.level}%`, '--color': category.color }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
