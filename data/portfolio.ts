export type PortfolioProject = {
  id?: string;
  title: string;
  description: string;
  field?: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  images?: string[];
  tech: string[];
  status?: string;
  github: string;
  demo: string;
  highlights?: string[];
  detailedDescription?: string;
  features?: string[];
};

export const featuredProjects: PortfolioProject[] = [
  {
    id: "debate-app",
    title: "Debate App",
    field: "Agentic AI",
    description:
      "Real-time debate platform with advanced moderation and scoring system. Features include live audience participation, AI-powered argument analysis, and comprehensive analytics dashboard.",
    tech: ["Next.js", "Socket.IO", "MongoDB", "Redis", "TensorFlow"],
    status: "Deployed",
    image: "/Debate-App/main.png",
    imageWidth: 1915,
    imageHeight: 950,
    images: ["/Debate-App/main.png"],
    github: "https://github.com/Sanidhya14321/Debate-App-1",
    demo: "https://debate-app-1.vercel.app/",
    highlights: [
      "Real-time communication with Socket.IO",
      "AI-powered argument quality analysis",
      "Scalable architecture supporting 1000+ concurrent users",
    ],
  },
  {
    id: "career-compass",
    title: "CareerCompass",
    field: "Full Stack & ML",
    description:
      "AI-driven career guidance platform utilizing machine learning to provide personalized career path recommendations based on skills, interests, and market trends.",
    tech: ["React", "FastAPI", "PyTorch", "PostgreSQL", "Docker"],
    status: "Live",
    image: "/CareerCompass/1.png",
    imageWidth: 1904,
    imageHeight: 960,
    images: ["/project9.png"],
    github: "https://github.com/Sanidhya14321/CareerCompass",
    demo: "https://careercompass-xi.vercel.app/",
    highlights: [
      "ML-powered career path prediction",
      "Integration with real-time job market data",
      "Interactive skill assessment modules",
    ],
  },
  {
    id: "QuestionFlow",
    title: "QuestionFlow",
    field: "Agentic AI",
    description:
      "An AI-powered Q&A platform that provides real-time answers to user queries using a combination of LLMs and knowledge graph technologies.",
    tech: ["Next.js", "LangChain", "LangGraph", "Groq API", "Prisma ORM", "PostgreSQL"],
    status: "In Development",
    image: "/QuestionFLow/main.png",
    imageWidth: 1904,
    imageHeight: 951,
    images: ["/QuestionFLow/main.png", "/QuestionFLow/1.png", "/QuestionFLow/2.png", "/QuestionFLow/3.png"],
    github: "https://github.com/Sanidhya14321/Assessment-3.0",
    demo: "https://assessment-3-0.vercel.app/",
    highlights: [
      "Real-time assessment of user queries with LLMs",
      "Integration with knowledge graph technologies",
      "AI based assessment of query quality and relevance",
    ],
  },
  {
    id: "DataPipeline",
    title: "Real-Time Web Data Ingestion Pipeline",
    field: "Agentic AI",
    description:
      "A high-performance financial data pipeline that ingests content from multiple sources, enriches and classifies it with LLM workflows, indexes it for semantic retrieval, and serves real-time search with graceful fallback when vector infrastructure is unavailable.",
    tech: [
      "Python",
      "FastAPI",
      "Apache Kafka",
      "PostgreSQL",
      "Qdrant",
      "Redis",
      "Groq API",
      "Docker",
      "Kubernetes",
      "React",
      "Vite"
    ],
    status: "In Development",
    image: "/data-pipeline/1.png",
    imageWidth: 1901,
    imageHeight: 963,
    images: [
      "/data-pipeline/1.png",
      "/data-pipeline/2.png",
      "/data-pipeline/3.png",
      "/data-pipeline/4.png"
    ],
    github: "https://github.com/Sanidhya14321/data-pipeline",
    demo: "https://data-pipeline-one.vercel.app/",
    highlights: [
      "Real-time ingestion from RSS, SEC EDGAR, News APIs, and other web sources into a Kafka-based streaming pipeline",
      "LLM-powered normalization pipeline for quality gating, classification, entity extraction, and summarization",
      "Semantic search via Qdrant with resilient Groq + web-scraping fallback when vector search is unavailable",
      "Ingested data from 3+ external sources and increased processing throughput by 40% with automated Groq API summarization"
    ],
  },
];

export const allProjects: PortfolioProject[] = [
  {
    id: "harvest",
    title: "Harvest",
    field: "Agentic AI",
    description: "An autonomous coding agent harness with deterministic verification, context compaction, and native fuzzy patch application.",
    image: "/projects/harvest.svg",
    tech: [
      "TypeScript",
      "Rust",
      "Bun",
      "N-API",
      "Git"
    ],
    github: "",
    demo: "",
    detailedDescription: "Harvest grounds coding-agent execution in verified file mutations and Git progression. A BM25 symbol index retains relevant code context during compaction, while entropy-gated routing asks for clarification when intent is ambiguous.",
    highlights: [
      "Pre-read mutation shields enforce test execution against modified files and validate physical Git HEAD progression.",
      "Context compaction preserves active diffs, verification records, and AST symbols using an in-memory BM25 index without external embeddings.",
      "Shannon entropy-gated intent routing and a native Rust N-API engine support interactive clarification and streaming fuzzy patch application."
    ]
  },
  {
    id: "oasis",
    title: "Oasis",
    field: "Systems",
    description: "An open-source mutation testing framework that evaluates the semantic quality of Terraform and OpenTofu test assertions.",
    image: "/projects/oasis.svg",
    tech: [
      "Python",
      "Terraform",
      "OpenTofu",
      "Docker",
      "GitHub Actions"
    ],
    github: "https://github.com/DegenerateUSER/Oasis",
    demo: "",
    detailedDescription: "Oasis injects synthetic faults into infrastructure configurations to test whether assertions detect meaningful changes. Its AST parsing engine and specialized mutation operators simulate infrastructure drift and state anomalies, with Git restoration after each run.",
    highlights: [
      "AST parsing with 12 specialized mutation operators for Terraform and OpenTofu configurations.",
      "Semantic faults reveal weaknesses in infrastructure test assertions.",
      "Zero-drift Git state restoration and self-updating native CLI wrappers."
    ]
  },
  {
    id: "cs-assessment",
    title: "CS-ASSESSMENT",
    field: "Web Development",
    description: "An online assessment platform for computer science students",
    image: "/project7.png",
    imageWidth: 1889,
    imageHeight: 947,
    images: ["/project7.png"],
    tech: ["Next", "Nextauth", "MongoDB", "Tailwind CSS", "Typescript", "Bcrypt.js", "Framer Motion"],
    detailedDescription: "CS-ASSESSMENT is an online assessment platform designed for computer science students...",
    features: ["User authentication", "Quiz creation and management", "Progress tracking", "Feedback system", "Leaderboard"],
    github: "https://github.com/Sanidhya14321/assessment-2",
    demo: "",
    status: "",
    highlights: [
      "Engineered a scalable assessment platform with secure user authentication via NextAuth and Bcrypt.js",
      "Developed comprehensive quiz management alongside a competitive, real-time leaderboard",
      "Designed a highly interactive and responsive UI utilizing Tailwind CSS and Framer Motion",
    ],
  },
  {
    id: "spark",
    title: "SPARK",
    field: "Web Development",
    description: "Event management and community engagement platform designed for technical communities. Handles registrations, speaker management, and post-event analytics.",
    image: "/project8.png",
    imageWidth: 1889,
    imageHeight: 949,
    images: ["/project8.png"],
    tech: ["Next.js", "Node.js", "MongoDB", "AWS S3", "Vercel", "JWT", "Tailwind", "Redux.js", "RTK-Query"],
    detailedDescription: "",
    features: [],
    github: "https://github.com/Sanidhya14321/SPARK",
    demo: "",
    status: "Under Maintenance",
    highlights: [
      "Managed 15,000+ event registrations",
      "Automated email campaigns and notifications",
      "Real-time analytics dashboard",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   3. EVENTS & TALKS (Community Archives / Keynotes / Hackathons)
   ───────────────────────────────────────────────────────────────────────────
   Used by: 
   - components/sections/EventsSection.tsx
   - components/ui/connoisseur-stack-interactor.tsx
   
   Properties:
   - num: "01", "02", ... (Index label shown in the list & archive card)
   - name: Event name (Uppercase title)
   - clipId: Architectural GSAP SVG mask pattern. Available geometric presets:
       • "clip-bento"    (Bento architectural matrix)
       • "clip-quadrant" (Quadrant matrix with accent pillars)
       • "clip-matrix"   (3x3 high-visibility grid)
       • "clip-portal"   (Architectural triptych with panoramic hero)
       • "clip-prisms"   (Modernist 4-column slices)
   - image: Image path from public directory (e.g. "/my_pics/...")
   - role: Role badge (e.g. "ORGANIZER & HOST", "HEAD OF TECH & JURY", etc.)
   - date: Year / Timeline (e.g. "2024", "2023")
   - location: Venue or City (e.g. "NEW DELHI", "MSIT CAMPUS")
   - description: Editorial archive summary of the event
   ═══════════════════════════════════════════════════════════════════════════ */
export type PortfolioEvent = {
  num: string;
  name: string;
  clipId: "clip-bento" | "clip-quadrant" | "clip-matrix" | "clip-portal" | "clip-prisms" | string;
  image: string;
  role: string;
  date: string;
  location: string;
  description: string;
};

export const eventsData: PortfolioEvent[] = [
  {
    num: "01",
    name: "BUILD-UP IDEATHON",
    clipId: "clip-bento",
    image: "/my_pics/Build-Up_Ideathon.jpeg",
    role: "ORGANIZER & HOST",
    date: "2026",
    location: "MSIT, DELHI",
    description: "Organized an Ideathon featuring a Microsoft guest speaker with 100+ participants."
  },
  {
    num: "02",
    name: "GEEK ROOM 3.0",
    clipId: "clip-quadrant",
    image: "/my_pics/GR-Meetup-3.0.jpeg",
    role: "ORGANIZER",
    date: "2026",
    location: "NAGARRO, NOIDA",
    description: "Large-scale developer community summit bringing together 800+ builders for deep dives into modern AI and systems architecture."
  },
  {
    num: "03",
    name: "KAGGLE DAYS",
    clipId: "clip-matrix",
    image: "/my_pics/Kaggle-days_Meetup.jpeg",
    role: "ORGANIZER",
    date: "2025",
    location: "GTBIT, DELHI",
    description: "Hands-on machine learning masterclass covering competitive Kaggle pipelines, feature engineering, and model evaluation."
  },
  {
    num: "04",
    name: "HACKSMART 2026",
    clipId: "clip-portal",
    image: "/my_pics/hacksmart.jpeg",
    role: "ORGANIZER & MENTOR",
    date: "2026",
    location: "BATTERY SMART OFFICE, GURUGRAM",
    description: "36-hour hackathon sprint driving technical evaluation, architecture mentorship, and live judging for 100+ submitted projects."
  },
  {
    num: "05",
    name: "GEEK ROOM 2.0",
    clipId: "clip-prisms",
    image: "/my_pics/GR-Meetup-2.0.jpeg",
    role: "ORGANIZER",
    date: "2025",
    location: "MICROSOFT OFFICE, GURUGRAM",
    description: "Community summit fostering open-source collaboration, full-stack workshops, and tech networking across university campuses."
  }
];

/* ═══════════════════════════════════════════════════════════════════════════
   4. CORE PROFILE & BIO
   ───────────────────────────────────────────────────────────────────────────
   Used across Hero, About, Experience, Navigation, and Footer sections.
   ═══════════════════════════════════════════════════════════════════════════ */
export const portfolioData = {
  name: "Sanidhya Vats",
  title: "Full Stack Developer & ML Engineer",
  email: "sanidhya14321@gmail.com",
  github: "https://github.com/Sanidhya14321",
  linkedin: "https://www.linkedin.com/in/sanidhya-vats-9344522b7/",

  about: {
    narrative: `A Computer Science student at Maharaja Surajmal Institute of Technology with a strong foundation in full-stack development and machine learning engineering. My journey spans from architecting scalable web applications with modern frameworks to implementing sophisticated AI solutions. My work includes an LLM career recommendation engine at Square Educations, an autonomous coding agent harness, and infrastructure mutation testing. Through Geek Room, Google Developer Groups, and ISTE MSIT, I've mentored 50+ students, moderated 5+ hackathons, and helped onboard 250+ members.`,
    highlights: [
      "Full-stack architecture with modern JavaScript/TypeScript ecosystem",
      "Machine learning systems using TensorFlow, PyTorch, and LLM integrations",
      "Developer community leadership with measurable impact",
      "Production-grade applications deployed on AWS, Vercel, and containerized environments",
    ],
  },

  experience: [
    {
      title: "Growth & Operations Engineer",
      company: "Geek Room",
      period: "Aug. 2026 - Present",
      description: "Managed community network expansion across regional groups and built event websites and registration flows that converted outreach into signups.",
      impact: "Coordinated regional community growth and maintained event registration infrastructure",
      tech: ["Web Development", "Community Operations", "Registration Flows"],
    },
    {
      title: "AI Engineer",
      company: "Square Educations",
      period: "Jan. 2026 - Mar. 2026",
      description: "Built an LLM recommendation engine using NLP classifiers on aptitude and reasoning data to generate tailored career trajectories.",
      impact: "Raised Pytest coverage from 65% to 85% and reduced deployment time by 20% through automated CI/CD",
      tech: ["LLMs", "NLP", "Python", "Pytest", "CI/CD"],
    },
    {
      title: "Head of Development",
      company: "GDG-MSIT",
      period: "2024 - Present",
      description:
        "Leading developer community initiatives, organizing technical workshops and large-scale hackathons focused on Google technologies and modern development practices.",
      impact: "Established an active developer community with regular technical sessions and major events",
      tech: ["Flutter", "Firebase", "Google Cloud", "TensorFlow"],
    },
    {
      title: "Full Stack Developer Intern",
      company: "Suntora Industries",
      period: "Recent",
      description:
        "Developed and deployed a production-ready Invoice Manager application. Managed the complete software development lifecycle, integrating robust features for authentication, client and expense management, invoicing, and analytics.",
      impact: "Shipped a comprehensive internal tool that streamlined invoicing and expense tracking processes",
      tech: ["Next.js", "Node.js", "MongoDB", "Redux Toolkit", "NextAuth", "JWT", "Bcryptjs"],
    },
    {
      title: "Hackathon Organizer",
      company: "Hack GeekRoom, Code Cubicle 5.0 & HackAvensis 2024",
      period: "2024 - 2026",
      description:
        "Orchestrated multiple large-scale technical hackathons, managing technical infrastructure, participant experience, and cross-team coordination.",
      impact: "Successfully hosted thousands of developers, facilitating networking, mentorship, and project building",
      tech: ["Event Management", "Technical Operations", "Community Building"],
    },
  ],

  education: {
    degree: "Bachelor of Technology in Computer Science",
    institution: "Maharaja Surajmal Institute of Technology (MSIT)",
    period: "2023 - 2027",
    achievements: [
      "Focus on Software Engineering, AI/ML, and Systems Design",
      "Active participant in technical clubs and hackathons",
    ],
  },

  skills: {
    "Frontend & UI Engineering": [
      { name: "TypeScript", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "Vite", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 85 },
      { name: "Three.js", level: 75 },
      { name: "Redux.js", level: 85 },
      { name: "RTK Query", level: 80 },
    ],
    "Backend & Systems Architecture": [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 90 },
      { name: "FastAPI", level: 85 },
      { name: "Flask", level: 85 },
      { name: "Socket.IO", level: 80 },
      { name: "RESTful APIs", level: 95 },
      { name: "JWT", level: 90 },
      { name: "Bcrypt.js", level: 85 },
      { name: "NextAuth", level: 80 },
    ],
    "Data Management & Storage": [
      { name: "MongoDB", level: 90 },
      { name: "Mongoose ODM", level: 90 },
      { name: "Firebase", level: 85 },
      { name: "PostgreSQL", level: 85 },
      { name: "MySQL", level: 85 },
      { name: "Redis", level: 80 },
      { name: "Supabase", level: 80 },
      { name: "Apache Kafka" },
      { name: "Qdrant" },
      { name: "Prisma ORM" },
    ],
    "Machine Learning & AI Engineering": [
      { name: "NumPy", level: 90 },
      { name: "Pandas", level: 90 },
      { name: "Scikit-learn", level: 85 },
      { name: "TensorFlow", level: 85 },
      { name: "PyTorch", level: 85 },
      { name: "Hugging Face", level: 80 },
      { name: "LangChain", level: 80 },
      { name: "LangGraph", level: 75 },
      { name: "Google Gemini API", level: 85 },
      { name: "OpenAI API", level: 85 },
      { name: "Transformers" },
      { name: "LLMs" },
      { name: "RAG" },
      { name: "Prompt Engineering" },
      { name: "Vector Databases" },
      { name: "Ensemble Learning" },
    ],
    "DevOps & Developer Productivity": [
      { name: "Git", level: 95 },
      { name: "GitHub", level: 95 },
      { name: "Docker", level: 85 },
      { name: "GitHub Actions", level: 85 },
      { name: "AWS", level: 80 },
      { name: "Vercel", level: 90 },
      { name: "Heroku", level: 80 },
      { name: "Postman", level: 90 },
      { name: "Kubernetes" },
      { name: "CI/CD" },
    ],
    "Systems & Low-Level Languages": [
      { name: "C", level: 85 },
      { name: "C++", level: 85 },
      { name: "Java", level: 85 },
      { name: "Operating Systems", level: 80 },
      { name: "Networking", level: 80 },
    ],
  },

  featuredProjects,
  allprojects: allProjects,
  allProjects,
  events: eventsData,

  achievements: [
    "Mentored 50+ students in AI and full-stack development, moderated 5+ hackathons, and interviewed and onboarded 250+ society members",
    "Mentored HackAvensis 2026, Innovortex 3.0 2025, Innerve Hackathon 2026, and SIH 2026 Internal Round",
    "Organized AI Oriented BatterySmart Hackathon 2026, Hack GeekRoom 2026, CodeKshetra 2.0, and Trackshift Hackathon 2026",
    "Organized Build-UP Ideathon 2026 with a Microsoft guest speaker and 100+ participants, the Code-Cubicle Hackathon Series, and Kaggle-Days Meetup 2025",
  ],

  social: {
    github: "https://github.com/Sanidhya14321",
    linkedin: "https://www.linkedin.com/in/sanidhya-vats-9344522b7/",
    twitter: "",
    email: "sanidhya14321@gmail.com",
  },
};