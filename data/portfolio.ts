export type PortfolioProject = {
  id?: string;
  title: string;
  description: string;
  field?: string;
  image: string;
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
    images: [
      "/data-pipeline/1.png",
      "/data-pipeline/2.png",
      "/data-pipeline/3.png",
      "/data-pipeline/4.png"
    ],
    github: "https://github.com/Sanidhya14321/RAG-Project",
    demo: "https://data-pipeline-one.vercel.app/",
    highlights: [
      "Real-time ingestion from RSS, SEC EDGAR, News APIs, and other web sources into a Kafka-based streaming pipeline",
      "LLM-powered normalization pipeline for quality gating, classification, entity extraction, and summarization",
      "Semantic search via Qdrant with resilient Groq + web-scraping fallback when vector search is unavailable"
    ],
  },
];

export const allProjects: PortfolioProject[] = [
  {
    id: "cs-assessment",
    title: "CS-ASSESSMENT",
    field: "Web Development",
    description: "An online assessment platform for computer science students",
    image: "/project7.png",
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
    id: "hairrevive",
    title: "HairRevive",
    field: "ML Core",
    description: "Hair regrowth solutions powered by science",
    image: "/Project3.jpg",
    images: ["/Project3.jpg"],
    tech: ["React", "Node.js", "Express", "MongoDB"],
    detailedDescription: "HairRevive provides scientifically backed hair regrowth solutions...",
    features: ["AI analysis", "Treatment plans", "Product recommendations"],
    github: "https://github.com/Sanidhya14321/HairRevive",
    demo: "",
    status: "",
    highlights: [
      "Integrated AI-powered analysis tools to generate personalized, science-backed treatment plans",
      "Built a full-stack MERN application featuring a smart product recommendation engine",
      "Designed robust backend architecture to securely manage user analysis and treatment data",
    ],
  },
  {
    id: "devdeck",
    title: "DevDeck",
    field: "Web Development",
    description: "Track coding activity with an interactive dashboard",
    image: "/Project4.jpg",
    images: ["/Project4.jpg"],
    tech: ["React", "Node.js", "Express", "MongoDB"],
    detailedDescription: "DevDeck tracks and analyzes your coding productivity...",
    features: ["GitHub integration", "Analytics", "Custom widgets"],
    github: "https://github.com/Sanidhya14321/devdeck",
    demo: "",
    status: "",
    highlights: [
      "Integrated GitHub APIs to track and visualize real-time developer coding activity",
      "Developed an interactive, data-driven dashboard equipped with highly customizable widgets",
      "Engineered scalable analytics infrastructure to process and display long-term productivity metrics",
    ],
  },
  {
    id: "spark",
    title: "SPARK",
    field: "Web Development",
    description: "Event management and community engagement platform designed for technical communities. Handles registrations, speaker management, and post-event analytics.",
    image: "/project8.png",
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

export const portfolioData = {
  name: "Sanidhya Vats",
  title: "Full Stack Developer & ML Engineer",
  email: "sanidhya14321@gmail.com",
  github: "https://github.com/Sanidhya14321",
  linkedin: "https://www.linkedin.com/in/sanidhya-vats-9344522b7/",

  about: {
    narrative: `A Computer Science student at Maharaja Surajmal Institute of Technology with a strong foundation in full-stack development and machine learning engineering. My journey spans from architecting scalable web applications with modern frameworks to implementing sophisticated AI solutions. As the Deputy Head of Geek Room and Head of Development for GDG-MSIT, I've driven technical communities forward, organizing major hackathons like Codeक्षेत्र 2.0 and Code Cubicle 5.0 that have reached over 15,000 participants and fostered innovation across the developer ecosystem.`,
    highlights: [
      "Full-stack architecture with modern JavaScript/TypeScript ecosystem",
      "Machine learning systems using TensorFlow, PyTorch, and LLM integrations",
      "Developer community leadership with measurable impact",
      "Production-grade applications deployed on AWS, Vercel, and containerized environments",
    ],
  },

  experience: [
    {
      title: "Head of Development",
      company: "Geek Room",
      period: "2023 - Present",
      description:
        "Leading a technical community focusing on modern development practices. Architecting and delivering workshops on full-stack development, ML/AI, and DevOps.",
      impact: "Helped drive 15,000+ community registrations across major technical events and hackathons",
      tech: ["Next.js", "React", "Node.js", "MongoDB", "AWS"],
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

  achievements: [
    "Head of Development @ GDG-MSIT and Deputy Head @ Geek Room",
    "Organized major hackathons including Codeक्षेत्र 2.0 (15,000+ registrations), Code Cubicle 5.0, and HackAvensis 2024",
    "Developed a production-grade Invoice Manager application during internship at Suntora Industries",
    "Built production applications serving thousands of users",
  ],

  social: {
    github: "https://github.com/Sanidhya14321",
    linkedin: "https://www.linkedin.com/in/sanidhya-vats-9344522b7/",
    twitter: "",
    email: "sanidhya14321@gmail.com",
  },
};