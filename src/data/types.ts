export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  specialization: string;
  bio: string;
  status: string;
  avatarUrl: string;
  badge: string;
  cgpa: string;
  certificationsCount: string;
  internshipsCount: string;
  githubUrl: string;
  linkedinUrl: string;
  resumeUrl: string;
}

export interface SkillItem {
  name: string;
  url: string;
  isOfficial?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  skills: SkillItem[];
  fullWidth?: boolean;
}

export interface Project {
  id: string;
  title: string;
  tag: string;
  categoryBadge?: string;
  featured: boolean;
  description: string;
  features?: string[];
  technologies: string[];
  liveUrl?: string;
  reportUrl?: string;
  githubUrl?: string;
  screenshots?: {
    thumbnail: string;
    title: string;
    badge: string;
    featured?: boolean;
  }[];
}

export interface CertificateItem {
  id: string;
  title: string;
  date: string;
  expiry?: string;
  subtitle?: string;
  imageSrc: string;
  pdfSrc: string;
}

export interface CertificateOrg {
  id: string;
  name: string;
  shortCode: string;
  issuerSubtitle: string;
  credentialsCount: string;
  items: CertificateItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  bullets: string[];
  skills: string[];
  certificates?: {
    imageSrc: string;
    pdfSrc: string;
    label: string;
    title: string;
  }[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  score: string;
}

export interface LanguageItem {
  language: string;
  proficiency: string;
}

export interface DocumentItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  pdfUrl: string;
  buttonLabel: string;
  isPrimary?: boolean;
}

export interface ContactInfo {
  email: string;
  phone: string;
  phoneRaw: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
}
