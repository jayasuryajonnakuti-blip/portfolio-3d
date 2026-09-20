import {
  Profile,
  SkillCategory,
  Project,
  CertificateOrg,
  ExperienceItem,
  EducationItem,
  LanguageItem,
  DocumentItem,
  ContactInfo,
} from './types';

export const profileData: Profile = {
  name: "Jaya Surya Jonnakuti",
  firstName: "Jaya Surya",
  lastName: "Jonnakuti",
  role: "Java Full Stack Developer",
  specialization: "AI & Data Science",
  bio: "B.Tech student in Artificial Intelligence & Data Science with hands-on internship experience in Java Full Stack development, scalable software architecture, and creator of TruthLens AI.",
  status: "Available for Full Stack & AI Opportunities",
  avatarUrl: "assets/jaya-surya.jpg",
  badge: "JAVA • AI & DATA SCIENCE",
  cgpa: "7.62",
  certificationsCount: "7+",
  internshipsCount: "2",
  githubUrl: "https://github.com/jayasuryajonnakuti-blip",
  linkedinUrl: "https://www.linkedin.com/in/jaya-surya-reddy-jonnakuti-b7266536a",
  resumeUrl: "assets/Surya_Reddy_Resume.pdf",
};

export const educationData: EducationItem[] = [
  {
    id: "btech",
    degree: "B.Tech — Artificial Intelligence & Data Science",
    institution: "Dhanalakshmi Srinivasan University · School of Engineering, Tiruchirappalli",
    period: "2023 – Expected June 2027",
    score: "Current Cumulative GPA: 7.62 / 10",
  },
  {
    id: "inter",
    degree: "Intermediate (MPC — Maths, Physics, Chemistry)",
    institution: "Narayana Junior College · Nellore, Andhra Pradesh",
    period: "Completed March 2023",
    score: "Score: 907 / 1000 (90.7%)",
  },
  {
    id: "ssc",
    degree: "Secondary School Certificate (SSC)",
    institution: "Viswa Bharathi High School · Naidupeta, Andhra Pradesh",
    period: "Completed June 2021",
    score: "Score: 597 / 600 (99.5%)",
  },
];

export const languagesData: LanguageItem[] = [
  { language: "Telugu", proficiency: "Native / C1" },
  { language: "English", proficiency: "Professional / C1" },
  { language: "Tamil", proficiency: "Intermediate / B1" },
  { language: "Hindi", proficiency: "Intermediate / B1" },
];

export const skillCategoriesData: SkillCategory[] = [
  {
    id: "programming",
    title: "Programming",
    subtitle: "Core languages & OOP",
    icon: "code",
    skills: ["☕ Core Java", "🧱 OOP Concepts", "🐍 Python", "🌐 JavaScript (ES6+)", "📘 TypeScript"],
  },
  {
    id: "web",
    title: "Web Technologies",
    subtitle: "Frontend & UI systems",
    icon: "globe",
    skills: ["📄 HTML5", "🎨 CSS3 & Flexbox", "⚛️ React", "🌊 TailwindCSS", "📊 Recharts", "📑 jsPDF Export"],
  },
  {
    id: "database",
    title: "Database & Storage",
    subtitle: "Relational & Document DBs",
    icon: "database",
    skills: ["🗄️ SQL", "🐬 MySQL", "🍃 MongoDB", "💾 localStorage API", "📂 FileReader API"],
  },
  {
    id: "ai-ds",
    title: "AI & Data Science",
    subtitle: "Generative AI & Analysis",
    icon: "cpu",
    skills: ["🤖 Google Gemini API", "👁️ Multimodal AI", "🧠 Machine Learning Basics", "📈 Power BI Analytics", "🛡️ Agentic AI Foundations"],
  },
  {
    id: "tools",
    title: "Engineering Practices & Tools",
    subtitle: "Developer workflow and algorithmic problem solving",
    icon: "wrench",
    skills: [
      "🐙 Git & Version Control",
      "🌐 GitHub",
      "🌑 Eclipse IDE",
      "💻 VS Code",
      "🧩 Data Structures & Algorithms",
      "🐞 Debugging & Code Analysis",
      "🤝 Team Collaboration",
    ],
    fullWidth: true,
  },
];

export const experienceData: ExperienceItem[] = [
  {
    id: "averixis",
    role: "Java Full Stack Developer Intern",
    company: "Averixis Solutions Pvt. Ltd. · Bengaluru, Karnataka, India",
    period: "May 2026 – July 2026",
    description:
      "Completed intensive hands-on training and development in full-stack Java engineering, building real-world application modules with backend-to-frontend integration.",
    bullets: [
      "Engineered scalable Java web applications utilizing Core Java, SQL databases, HTML5, CSS3, and Git.",
      "Applied Object-Oriented Programming (OOP) design principles, modular package structuring, and clean code practices.",
      "Conducted systematic code debugging and unit testing, improving execution stability and resolving runtime issues.",
      "Collaborated closely with team peers and mentors, successfully completing and deploying all assigned milestones on schedule.",
      "Awarded official Certificate of Completion and Letter of Recommendation (LOR) for exemplary performance.",
    ],
    skills: ["Core Java", "SQL", "HTML5 / CSS3", "OOP", "Git", "Debugging"],
    certificates: [
      {
        imageSrc: "assets/certificates/Averixis-Internship.jpg",
        pdfSrc: "assets/certificates/Averixis-Java-Full-Stack-Internship.pdf",
        label: "🔍 View Internship Cert",
        title: "Averixis Solutions — Java Full Stack Internship Certificate",
      },
      {
        imageSrc: "assets/certificates/Averixis-LOR.jpg",
        pdfSrc: "assets/certificates/Averixis-Letter-of-Recommendation.pdf",
        label: "📄 View Recommendation (LOR)",
        title: "Averixis Solutions — Letter of Recommendation",
      },
    ],
  },
  {
    id: "codsoft",
    role: "Java Programming Virtual Intern",
    company: "CodSoft · Remote",
    period: "April 2026 – May 2026",
    description:
      "Engaged in algorithmic programming, object-oriented systems design, and Java application architecture across structured development tasks.",
    bullets: [
      "Developed modular Java applications focusing on encapsulation, inheritance, polymorphism, and collections framework.",
      "Implemented algorithms and problem-solving routines with thorough test coverage and boundary case verification.",
      "Maintained structured code repositories with Git version control and documentation.",
    ],
    skills: ["Java Collections", "Algorithm Design", "Object-Oriented Design", "Git Workflow"],
    certificates: [
      {
        imageSrc: "assets/certificates/CodSoft-Java.jpg",
        pdfSrc: "assets/certificates/CodSoft-Java-Programming.pdf",
        label: "🔍 View CodSoft Cert",
        title: "CodSoft — Java Programming Virtual Internship Certificate",
      },
    ],
  },
];

export const projectsData: Project[] = [
  {
    id: "truthlens-ai",
    title: "TruthLens AI — Fake Reels & News Detector",
    tag: "FEATURED MAJOR PROJECT • MULTIMODAL AI",
    featured: true,
    description:
      "An AI-powered web verification platform engineered to detect synthesized, deepfaked, and misleading digital media. TruthLens AI combines Google Gemini API multimodal vision & language models with client-side media staging (FileReader API) to deliver comprehensive authenticity verdicts, fine-grained confidence scores, forensic indicators, and downloadable PDF reports.",
    features: [
      "Multimodal analysis (Images, Reels, Text)",
      "Real-time confidence scoring engine",
      "Automated forensic PDF report export",
      "Local history via browser localStorage",
    ],
    technologies: ["React", "TypeScript", "TailwindCSS", "Gemini API", "FileReader API", "Recharts", "jsPDF"],
    liveUrl: "https://fake-detector-tan.vercel.app/",
    reportUrl: "assets/documents/TruthLens-AI-Full-Project-Report.pdf",
    githubUrl: "https://github.com/jayasuryajonnakuti-blip/portfolio",
    screenshots: [
      {
        thumbnail: "assets/projects/TruthLens-main-ui.png",
        title: "TruthLens AI — Main Fake Detector Interface",
        badge: "🔍 View Fake Detector UI",
        featured: true,
      },
      {
        thumbnail: "assets/projects/TruthLens-forensic-report.png",
        title: "TruthLens AI — Forensic Analysis Report",
        badge: "🔍 View Forensic Report",
      },
      {
        thumbnail: "assets/projects/TruthLens-session-archive.png",
        title: "TruthLens AI — Session Archive & History",
        badge: "🔍 View Session Archive",
      },
    ],
  },
  {
    id: "student-collab",
    title: "Student Collaboration Platform",
    tag: "ACADEMIC PROJECT",
    featured: false,
    description:
      "A web-based platform developed to enable university students to share academic resources, manage study modules, and collaborate efficiently. Engineered with user authentication, secure database schema design, and responsive interfaces.",
    technologies: ["Java", "SQL", "HTML / CSS", "Git"],
    githubUrl: "https://github.com/jayasuryajonnakuti-blip",
  },
];

export const certificateOrgsData: CertificateOrg[] = [
  {
    id: "oracle",
    name: "Oracle",
    shortCode: "ORA",
    issuerSubtitle: "Oracle University",
    credentialsCount: "1 Credential",
    items: [
      {
        id: "oracle-agentic-ai",
        title: "Agentic AI Certified Foundations Associate",
        date: "13 Aug 2026",
        expiry: "Valid until 13 Aug 2028",
        imageSrc: "assets/certificates/Oracle-Agentic-AI.jpg",
        pdfSrc: "assets/certificates/Oracle-Agentic-AI-Certified-Foundations-Associate.pdf",
      },
    ],
  },
  {
    id: "scaler",
    name: "Scaler Topics",
    shortCode: "SCL",
    issuerSubtitle: "Scaler Academy",
    credentialsCount: "3 Credentials",
    items: [
      {
        id: "scaler-dsa-interviews",
        title: "DSA Problem Solving for Interviews using Java",
        date: "18 Aug 2026",
        subtitle: "Data Structures & Algorithmic Practice",
        imageSrc: "assets/certificates/Scaler-DSA-Problem-Solving.jpg",
        pdfSrc: "assets/certificates/Scaler-DSA-Problem-Solving-Interviews-Java.pdf",
      },
      {
        id: "scaler-java-dsa",
        title: "Java DSA Course",
        date: "18 Aug 2026",
        subtitle: "Core Data Structures in Java",
        imageSrc: "assets/certificates/Scaler-Java-DSA.jpg",
        pdfSrc: "assets/certificates/Scaler-Java-DSA-Course.pdf",
      },
      {
        id: "scaler-java-fundamentals",
        title: "Java Course (Fundamentals)",
        date: "16 Aug 2026",
        subtitle: "Java Programming & Syntax Fundamentals",
        imageSrc: "assets/certificates/Scaler-Java-Fundamentals.jpg",
        pdfSrc: "assets/certificates/Scaler-Java-Course-Fundamentals.pdf",
      },
    ],
  },
  {
    id: "averixis",
    name: "Averixis Solutions",
    shortCode: "AVX",
    issuerSubtitle: "Bengaluru, Karnataka",
    credentialsCount: "3 Credentials",
    items: [
      {
        id: "averixis-internship",
        title: "Java Full Stack Development Internship",
        date: "14 Jul 2026",
        subtitle: "Industry Internship Completion",
        imageSrc: "assets/certificates/Averixis-Internship.jpg",
        pdfSrc: "assets/certificates/Averixis-Java-Full-Stack-Internship.pdf",
      },
      {
        id: "averixis-training",
        title: "Java Full Stack Training",
        date: "01 May – 14 Jul 2026",
        subtitle: "Hands-on Technical Training",
        imageSrc: "assets/certificates/Averixis-Training.jpg",
        pdfSrc: "assets/certificates/Averixis-Java-Full-Stack-Training.pdf",
      },
      {
        id: "averixis-lor",
        title: "Letter of Recommendation (LOR)",
        date: "14 Jul 2026",
        subtitle: "Executive Recommendation",
        imageSrc: "assets/certificates/Averixis-LOR.jpg",
        pdfSrc: "assets/certificates/Averixis-Letter-of-Recommendation.pdf",
      },
    ],
  },
  {
    id: "tcs",
    name: "TCS iON",
    shortCode: "TCS",
    issuerSubtitle: "Tata Consultancy Services",
    credentialsCount: "2 Credentials",
    items: [
      {
        id: "tcs-career-edge",
        title: "Career Edge – Young Professional",
        date: "31 Mar 2026",
        subtitle: "Professional Readiness & Workplace Skills",
        imageSrc: "assets/certificates/TCS-iON-Career-Edge.jpg",
        pdfSrc: "assets/certificates/TCS-iON-Career-Edge-Young-Professional.pdf",
      },
      {
        id: "tcs-soft-skills",
        title: "Introduction to Soft Skills",
        date: "07 Aug 2026",
        subtitle: "Communication & Collaborative Skills",
        imageSrc: "assets/certificates/TCS-iON-Soft-Skills.jpg",
        pdfSrc: "assets/certificates/TCS-iON-Introduction-to-Soft-Skills.pdf",
      },
    ],
  },
  {
    id: "codsoft",
    name: "CodSoft",
    shortCode: "CDS",
    issuerSubtitle: "Virtual Internship Platform",
    credentialsCount: "1 Credential",
    items: [
      {
        id: "codsoft-java",
        title: "Java Programming Virtual Internship",
        date: "05 Apr – 05 May 2026",
        subtitle: "Java Programming & OOP",
        imageSrc: "assets/certificates/CodSoft-Java.jpg",
        pdfSrc: "assets/certificates/CodSoft-Java-Programming.pdf",
      },
    ],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    shortCode: "MDB",
    issuerSubtitle: "MongoDB University",
    credentialsCount: "1 Credential",
    items: [
      {
        id: "mongodb-basics",
        title: "MongoDB Basics for Students",
        date: "25 Jul 2025",
        subtitle: "NoSQL & Document Data Modeling",
        imageSrc: "assets/certificates/MongoDB-Basics.jpg",
        pdfSrc: "assets/certificates/MongoDB-Basics-for-Students.pdf",
      },
    ],
  },
  {
    id: "powerbi",
    name: "Power BI",
    shortCode: "PBI",
    issuerSubtitle: "OfficeMaster Workshop",
    credentialsCount: "1 Credential",
    items: [
      {
        id: "powerbi-workshop",
        title: "Power BI Analytics Workshop",
        date: "18 May 2025",
        subtitle: "Data Visualization & Dashboards",
        imageSrc: "assets/certificates/PowerBI-Workshop.jpg",
        pdfSrc: "assets/certificates/PowerBI-Workshop.pdf",
      },
    ],
  },
];

export const documentsData: DocumentItem[] = [
  {
    id: "truthlens-report",
    badge: "📑 49-PAGE PROJECT REPORT",
    title: "TruthLens AI — Full Project Report",
    description:
      "Comprehensive academic project report covering problem definition, literature survey, system design, UML diagrams, Gemini API integration, testing matrix, and UI architecture.",
    pdfUrl: "assets/documents/TruthLens-AI-Full-Project-Report.pdf",
    buttonLabel: "Open 49-Page PDF",
    isPrimary: true,
  },
  {
    id: "resume-doc",
    badge: "📄 OFFICIAL RESUME",
    title: "Jaya Surya Jonnakuti — Full Stack Resume",
    description:
      "Complete curriculum vitae detailing academic scores, internship contributions, technical toolkit, project details, and verified certifications.",
    pdfUrl: "assets/Surya_Reddy_Resume.pdf",
    buttonLabel: "Download Resume PDF",
  },
];

export const contactData: ContactInfo = {
  email: "jayasuryajonnakuti@gmail.com",
  phone: "+91 6300446427",
  phoneRaw: "6300446427",
  location: "Tirupati, Andhra Pradesh, India",
  githubUrl: "https://github.com/jayasuryajonnakuti-blip",
  linkedinUrl: "https://www.linkedin.com/in/jaya-surya-reddy-jonnakuti-b7266536a",
};
