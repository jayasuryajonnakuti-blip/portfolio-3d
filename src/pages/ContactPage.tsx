import React from 'react';
import { contactData } from '../data';
import { Mail, Phone, MapPin, Send, MessageSquare, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';

interface ContactPageProps {
  onCopyEmail: (email: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onCopyEmail }) => {
  return (
    <div className="contact-page-container">
      <div className="container" style={{ paddingTop: '130px', paddingBottom: '100px', maxWidth: '840px' }}>
        <div className="contact-card-wrapper spotlight-card">
          <div className="section-tag" style={{ marginInline: 'auto' }}>
            <MessageSquare size={14} />
            <span>08 / ZERO-FRICTION CONTACT</span>
          </div>

          <h1 className="section-title" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}>
            LET'S BUILD
            <br />
            <span className="text-signal">SOMETHING REAL.</span>
          </h1>

          <p className="section-desc" style={{ maxWidth: '600px', marginInline: 'auto' }}>
            I am actively seeking software engineering roles, Java Full Stack developer positions, and AI/Data Science opportunities. Open to discussions on technical architecture, projects, or full-time placement.
          </p>

          <div className="contact-channels-grid">
            {/* Email (Click to copy) */}
            <div
              className="contact-channel-item"
              onClick={() => onCopyEmail(contactData.email)}
              style={{ cursor: 'pointer' }}
              title="Click to copy email address"
              role="button"
              tabIndex={0}
            >
              <div className="contact-channel-icon">
                <Mail size={22} />
              </div>
              <div className="contact-channel-label">EMAIL (CLICK TO COPY)</div>
              <div className="contact-channel-val">{contactData.email}</div>
            </div>

            {/* Direct Phone */}
            <a href={`tel:${contactData.phoneRaw}`} className="contact-channel-item">
              <div className="contact-channel-icon">
                <Phone size={22} />
              </div>
              <div className="contact-channel-label">DIRECT PHONE</div>
              <div className="contact-channel-val">{contactData.phone}</div>
            </a>

            {/* Location Base */}
            <div className="contact-channel-item">
              <div className="contact-channel-icon">
                <MapPin size={22} />
              </div>
              <div className="contact-channel-label">CURRENT BASE</div>
              <div className="contact-channel-val">{contactData.location}</div>
            </div>
          </div>

          <div className="btn-group" style={{ justifyContent: 'center', gap: '14px' }}>
            <a href={`mailto:${contactData.email}`} className="btn btn-signal">
              <Send size={16} />
              <span>Send Direct Email</span>
            </a>
            <a
              href={contactData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-panel"
            >
              <LinkedinIcon size={16} />
              <span>Connect on LinkedIn</span>
              <ExternalLink size={12} />
            </a>
            <a
              href={contactData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-panel"
            >
              <GithubIcon size={16} />
              <span>Inspect GitHub Repos</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
