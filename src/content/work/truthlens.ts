export interface DecisionItem {
  id: string;
  title: string;
  choice: string;
  rejected: string;
  cost: string;
  win: string;
}

export interface ArchitectureNode {
  id: string;
  step: string;
  label: string;
  sublabel: string;
  description: string;
  tech: string;
}

export interface CaseStudyData {
  title: string;
  slug: string;
  tagline: string;
  thesis: string;
  status: 'shipped' | 'prototype';
  role: string;
  timeline: string;
  stack: string[];
  liveUrl: string;
  repoUrl: string;
  reportUrl: string;
  problem: {
    statement: string;
    context: string;
  };
  whyExistingFail: {
    title: string;
    points: { label: string; explanation: string }[];
  };
  constraints: string[];
  architecture: {
    summary: string;
    nodes: ArchitectureNode[];
  };
  decisions: DecisionItem[];
  proof: {
    liveUrl: string;
    repoUrl: string;
    reportPdf: string;
    screenshots: { src: string; caption: string; tag: string }[];
  };
  outcome: {
    realMetrics: { label: string; value: string; note: string }[];
    retrospective: string;
    roadmap: string[];
  };
}

export const truthLensCaseStudy: CaseStudyData = {
  title: "TruthLens AI",
  slug: "truthlens",
  tagline: "Multimodal Deepfake & Synthetic Media Forensics Instrument",
  thesis: "Detect digital media manipulation client-side with zero server infrastructure overhead.",
  status: "shipped",
  role: "Solo Architect & Full-Stack Developer",
  timeline: "Academic Capstone (2024 - 2026)",
  stack: [
    "React",
    "TypeScript",
    "Google Gemini API",
    "TailwindCSS",
    "FileReader API",
    "Recharts",
    "jsPDF"
  ],
  liveUrl: "https://fake-detector-tan.vercel.app/",
  repoUrl: "https://github.com/jayasuryajonnakuti-blip/TruthLens-AI",
  reportUrl: "/assets/documents/TruthLens-AI-Full-Project-Report.pdf",
  problem: {
    statement: "Modern generative diffusion models and facial reenactment tools produce synthetic reels and manipulated images indistinguishable from reality to the human eye, accelerating misinformation at scale. Existing commercial forensics solutions require expensive enterprise subscriptions or heavy cloud GPU infrastructure inaccessible to everyday users and student developers.",
    context: "Misinformation spreads within seconds on social networks. A forensic verification tool must provide instant feedback, operate without cloud latency or costly GPU instances, and deliver an explainable audit trail rather than an opaque black-box score."
  },
  whyExistingFail: {
    title: "Why Conventional Forensics Pipelines Fall Short",
    points: [
      {
        label: "Server Upload Bottlenecks",
        explanation: "Traditional pipelines require uploading multi-megabyte media to remote servers, incurring high latency, bandwidth costs, and severe privacy risks for personal photos."
      },
      {
        label: "Monolithic GPU Hosting Cost",
        explanation: "Hosting dedicated deep learning models (e.g. ResNet/XceptionNet) on cloud GPU instances incurs continuous recurring monthly fees ($50-$200+/mo), making free student access impossible."
      },
      {
        label: "Unexplainable Black-Box Scores",
        explanation: "Most detectors output only a single percentage without spatial or forensic reasoning, leaving the investigator unable to verify which specific regions (edges, eyes, lighting) showed anomalies."
      }
    ]
  },
  constraints: [
    "Zero Infrastructure Budget: Complete system must operate at $0/month recurring server costs.",
    "Client-Side Privacy First: Media staging and EXIF parsing must occur in the browser before any API interaction.",
    "10MB File Staging Ceiling: Client memory must be carefully budgeted to prevent browser tab crashes during ArrayBuffer handling.",
    "Instant Feedback: Time-to-first-telemetry must be under 500ms after file selection.",
    "Verifiable Evidence: Every analysis must generate an exportable forensic audit report (PDF) with timestamp and cryptographic hash."
  ],
  architecture: {
    summary: "A lean client-orchestrated forensic pipeline connecting browser FileReader staging directly to Gemini multimodal vision reasoning with instant local session persistence.",
    nodes: [
      {
        id: "step-1",
        step: "01",
        label: "Raw Media Ingestion",
        sublabel: "Drag & Drop / URL",
        tech: "HTML5 Drag & Drop",
        description: "Accepts digital images or media URLs. Validates MIME types, byte sizes (<10MB), and file headers before allocation."
      },
      {
        id: "step-2",
        step: "02",
        label: "Browser ArrayBuffer Staging",
        sublabel: "Zero Server Upload",
        tech: "FileReader API",
        description: "Parses media into memory locally. Extracts image dimensions and creates preview bitmaps without remote network transit."
      },
      {
        id: "step-3",
        step: "03",
        label: "Multimodal Vision Reasoning",
        sublabel: "Gemini 1.5 API",
        tech: "Google Gemini API",
        description: "Media is dispatched with structured forensic prompt schemas evaluating facial landmarks, unnatural frequency noise, and anatomical inconsistencies."
      },
      {
        id: "step-4",
        step: "04",
        label: "Forensic Classification & Telemetry",
        sublabel: "Anomaly Breakdown",
        tech: "Structured JSON Parsing",
        description: "Outputs multi-criteria assessment: facial symmetry, light consistency, compression artifacts, and confidence verdict."
      },
      {
        id: "step-5",
        step: "05",
        label: "Local Storage & Audit Export",
        sublabel: "Verified Proof",
        tech: "jsPDF + localStorage",
        description: "Saves analysis history locally in browser storage and generates an exportable, timestamped forensic PDF summary report."
      }
    ]
  },
  decisions: [
    {
      id: "dec-1",
      title: "Client-Side FileReader Staging vs Server Upload Proxy",
      choice: "Staging media entirely within browser memory using the HTML5 FileReader API.",
      rejected: "Building an Express/Node.js backend proxy to buffer and transcode incoming media files.",
      cost: "Imposes a strict 10MB file size ceiling and precludes server-side batch queue processing.",
      win: "Achieved $0/month hosting costs, eliminated data privacy vulnerabilities, and reduced file ingest latency to under 50 milliseconds."
    },
    {
      id: "dec-2",
      title: "Google Gemini Multimodal Vision API vs Custom Hosted PyTorch CNN",
      choice: "Leveraging Google Gemini multimodal vision models through structured prompting.",
      rejected: "Deploying and maintaining a self-hosted PyTorch/XceptionNet model on AWS EC2 GPU instances.",
      cost: "Dependent on external API endpoint availability and token rate limits.",
      win: "Eliminated $150+/month GPU VM hosting fees while benefiting from multimodal reasoning capable of cross-referencing visual artifacts with contextual news text."
    },
    {
      id: "dec-3",
      title: "Browser LocalStorage Session Vault vs Cloud Database",
      choice: "Storing session history and analysis logs in encrypted browser localStorage.",
      rejected: "Provisioning a cloud MongoDB/PostgreSQL instance to store user scans.",
      cost: "Scan history is scoped to the visitor's local browser and does not synchronize across devices.",
      win: "Absolute user privacy—zero user photos or forensic queries are retained on remote servers. Zero database maintenance overhead."
    }
  ],
  proof: {
    liveUrl: "https://fake-detector-tan.vercel.app/",
    repoUrl: "https://github.com/jayasuryajonnakuti-blip/TruthLens-AI",
    reportPdf: "/assets/documents/TruthLens-AI-Full-Project-Report.pdf",
    screenshots: [
      {
        src: "/assets/projects/TruthLens-main-ui.png",
        caption: "Interactive Forensic Staging Terminal & Media Dropzone",
        tag: "UI TERMINAL"
      },
      {
        src: "/assets/projects/TruthLens-analysis-dashboard.jpg",
        caption: "Multimodal Forensic Analysis & Verdict Classification Dashboard",
        tag: "FORENSIC TELEMETRY"
      },
      {
        src: "/assets/projects/TruthLens-forensic-report.png",
        caption: "Automated Timestamped Forensic Evidence Report & Confidence Scoring",
        tag: "AUDIT EXPORT"
      },
      {
        src: "/assets/projects/TruthLens-session-archive.png",
        caption: "Client-Side Encrypted Forensic History & Session Vault",
        tag: "LOCAL ARCHIVE"
      }
    ]
  },
  outcome: {
    realMetrics: [
      {
        label: "Hosting Infrastructure Cost",
        value: "$0 / month",
        note: "Completely serverless architecture deployed on Vercel"
      },
      {
        label: "Client Ingest Latency",
        value: "< 50 ms",
        note: "In-browser FileReader memory staging"
      },
      {
        label: "Undergraduate Capstone Report",
        value: "49 Pages",
        note: "Comprehensive documentation covering methodology, ethical considerations, and test cases"
      },
      {
        label: "Production Status",
        value: "Live & Deployed",
        note: "Accessible worldwide at fake-detector-tan.vercel.app"
      }
    ],
    retrospective: "While the Gemini multimodal API provides extraordinary cross-modal reasoning, relying solely on cloud API calls means analysis requires an active internet connection. A production v2 architecture should integrate a lightweight client-side WebAssembly / ONNX runtime to perform fast initial edge artifact screening before querying cloud vision models.",
    roadmap: [
      "Integrate client-side WebAssembly ONNX runtime for offline edge preprocessing.",
      "Add video frame-sampling buffer to analyze short video clips frame-by-frame without server transcoding.",
      "Implement Web Crypto API for SHA-256 media fingerprinting embedded in the PDF forensic report."
    ]
  }
};
