import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { contactData } from '../data';
import { GithubIcon, LinkedinIcon } from '../components';

interface ContactSectionProps {
  onCopyEmail: (email: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onCopyEmail }) => {
  return (
    <section id="contact">
      <div className="container">
        <div className="contact-card-wrapper spotlight-card">
          <div className="section-tag" style={{ marginInline: 'auto' }}>
            <MessageSquare size={14} />
            <span>08 / CINEMATIC FINALE</span>
          </div>

          <h2 className="section-title contact-title">
            LET'S BUILD
            <br />
            SOMETHING
            <br />
            <span className="text-gradient-red">SIGNIFICANT.</span>
          </h2>

          <p className="section-desc" style={{ maxWidth: '620px', marginInline: 'auto' }}>
            I am actively seeking software engineering roles, Java Full Stack developer positions, and AI/Data Science internships. Let's connect and build dependable systems together.
          </p>

          <div className="contact-channels-grid">
            {/* Email (Click to copy) */}
            <div
              className="contact-channel-item"
              onClick={() => onCopyEmail(contactData.email)}
              style={{ cursor: 'pointer' }}
              title="Click to copy email address"
            >
              <div className="contact-channel-icon">
                <Mail size={22} />
              </div>
              <div className="contact-channel-label">Email (Click to Copy)</div>
              <div className="contact-channel-val">{contactData.email}</div>
            </div>

            {/* Phone */}
            <a href={`tel:${contactData.phoneRaw}`} className="contact-channel-item">
              <div className="contact-channel-icon">
                <Phone size={22} />
              </div>
              <div className="contact-channel-label">Direct Phone</div>
              <div className="contact-channel-val">{contactData.phone}</div>
            </a>

            {/* Location */}
            <div className="contact-channel-item">
              <div className="contact-channel-icon">
                <MapPin size={22} />
              </div>
              <div className="contact-channel-label">Current Base</div>
              <div className="contact-channel-val">{contactData.location}</div>
            </div>
          </div>

          <div className="btn-group" style={{ justifyContent: 'center' }}>
            <a href={`mailto:${contactData.email}`} className="btn btn-primary">
              <Send size={17} />
              <span>Send Direct Message</span>
            </a>
            <a
              href={contactData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <LinkedinIcon size={18} />
              <span>Connect on LinkedIn</span>
            </a>
            <a
              href={contactData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <GithubIcon size={18} />
              <span>View GitHub Code</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
