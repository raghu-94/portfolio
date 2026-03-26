import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'sent' | 'error'

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // mailto fallback — opens email client pre-filled
    const body = encodeURIComponent(`Hi Raghavendra,\n\n${form.message}\n\nFrom: ${form.name}`);
    const subject = encodeURIComponent(form.subject || 'Portfolio Contact');
    window.open(`mailto:g.raghavendrarao@hotmail.com?subject=${subject}&body=${body}`);
    setStatus('sent');
    setTimeout(() => setStatus(null), 4000);
  };

  const contactLinks = [
    {
      id: 'contact-email',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      ),
      label: 'Email',
      value: 'g.raghavendrarao@hotmail.com',
      href: 'mailto:g.raghavendrarao@hotmail.com',
      color: '#00d4ff',
    },
    {
      id: 'contact-phone',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 14a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 3h3a2 2 0 0 1 2 1.72c.13.97.35 1.93.68 2.86a2 2 0 0 1-.45 2.11L7.09 10.9a16 16 0 0 0 6.01 6.01l1.21-1.21a2 2 0 0 1 2.11-.45c.93.33 1.89.55 2.86.68A2 2 0 0 1 21 18z"/></svg>
      ),
      label: 'Phone',
      value: '+91 7013906299',
      href: 'tel:+917013906299',
      color: '#00ff88',
    },
    {
      id: 'contact-linkedin',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
      ),
      label: 'LinkedIn',
      value: 'raghavendra-rao-38b4823b4',
      href: 'https://linkedin.com/in/raghavendra-rao-38b4823b4',
      color: '#0077b5',
    },
  ];

  return (
    <section className="contact" id="contact">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Contact</span>
          <h2 className="section-title">Let's <span>Work Together</span></h2>
          <p className="section-subtitle">
            Have a cloud infrastructure project in mind? Looking for a DevOps engineer? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Left */}
          <motion.div
            className="contact-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="contact-intro">
              <h3 className="contact-intro-title">Open to Opportunities</h3>
              <p className="contact-intro-text">
                I'm currently open to <strong>full-time positions</strong>, <strong>contract work</strong>, and <strong>freelance projects</strong> in DevOps, Cloud Engineering, and Platform Engineering.
              </p>
              <p className="contact-intro-text">
                Whether it's designing cloud infrastructure from scratch, improving observability, or setting up CI/CD pipelines — let's build something great together.
              </p>
            </div>

            <div className="contact-links-list">
              {contactLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  className="contact-link-card"
                  id={link.id}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{ '--link-color': link.color }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ x: 4 }}
                >
                  <div className="contact-link-icon">{link.icon}</div>
                  <div className="contact-link-details">
                    <span className="contact-link-label">{link.label}</span>
                    <span className="contact-link-value">{link.value}</span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="contact-arrow"><polyline points="9 18 15 12 9 6"/></svg>
                </motion.a>
              ))}
            </div>

            {/* Availability badge */}
            <div className="availability-badge">
              <span className="avail-dot" />
              <div>
                <span className="avail-title">Available for work</span>
                <span className="avail-sub">Typically responds within 24 hours</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <form className="contact-form glass-card" onSubmit={handleSubmit} id="contact-form">
              <h3 className="form-title">Send a Message</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-name">Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email-input">Your Email</label>
                  <input
                    id="contact-email-input"
                    type="email"
                    name="email"
                    placeholder="john@company.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="DevOps Engineer Opportunity"
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary form-submit"
                id="contact-submit-btn"
                disabled={status === 'sending'}
              >
                {status === 'sent' ? (
                  <>✓ Message Sent!</>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    Send Message
                  </>
                )}
              </button>

              {status === 'sent' && (
                <motion.p
                  className="form-success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✅ Opening your mail client... Thank you for reaching out!
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
