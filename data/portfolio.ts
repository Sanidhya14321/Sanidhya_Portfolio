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
    field: "Web Development",
    description:
      "Real-time debate platform with advanced moderation and scoring system. Features include live audience participation, AI-powered argument analysis, and comprehensive analytics dashboard.",
    tech: ["Next.js", "Socket.IO", "MongoDB", "Redis", "TensorFlow"],
    status: "In Development",
    image: "/project10.png",
    images: ["/project10.png"],
    github: "",
    demo: "",
    highlights: [
      "Real-time communication with Socket.IO",
      "AI-powered argument quality analysis",
      "Scalable architecture supporting 1000+ concurrent users",
    ],
  },
  {
    id: "career-compass",
    title: "CareerCompass",
    field: "Agentic AI",
    description:
      "AI-driven career guidance platform utilizing machine learning to provide personalized career path recommendations based on skills, interests, and market trends.",
    tech: ["React", "FastAPI", "PyTorch", "PostgreSQL", "Docker"],
    status: "Live",
    image: "/project9.png",
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
    images: ["/QuestionFLow/main.png","/QuestionFLow/1.png", "/QuestionFLow/2.png", "/QuestionFLow/3.png"],
    github: "",
    demo: "",
    highlights: [
      "Real-time assessment of user queries with LLMs",
      "Integration with knowledge graph technologies",
      "AI based assessment of query quality and relevance",
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
    highlights: [],
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
    highlights: [],
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
    highlights: [],
  },
  {
    id: "spark",
    title: "SPARK",
    field: "Web Development",
    description: "Event management and community engagement platform designed for technical communities. Handles registrations, speaker management, and post-event analytics.",
    image: "/project8.png",
    images: ["/project8.png"],
    tech: ["Next.js", "Node.js", "MongoDB", "AWS S3", "Vercel","JWT", "Tailwind", "Redux.js", "RTK-Query"],
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
  email: "sanidhya@example.com", // Update with actual email
  github: "https://github.com/sanidhyavats",
  linkedin: "https://linkedin.com/in/sanidhyavats",

  about: {
    narrative: `A Computer Science student at Maharaja Surajmal Institute of Technology with a strong foundation in full-stack development and machine learning engineering. My journey spans from architecting scalable web applications with modern frameworks to implementing sophisticated AI solutions. As the Founder of Geek Room and GDG Lead, I've driven technical communities forward, orchestrating events that have reached over 15,000 participants and fostered innovation across the developer ecosystem.`,
    highlights: [
      "Full-stack architecture with modern JavaScript/TypeScript ecosystem",
      "Machine learning systems using TensorFlow, PyTorch, and LLM integrations",
      "Developer community leadership with measurable impact",
      "Production-grade applications deployed on AWS, Vercel, and containerized environments",
    ],
  },

  experience: [
    {
      title: "Founder & Technical Lead",
      company: "Geek Room",
      period: "2023 - Present",
      description:
        "Founded and led technical community focusing on modern development practices. Architected and delivered workshops on full-stack development, ML/AI, and DevOps.",
      impact: "15,000+ community registrations across technical events",
      tech: ["Next.js", "React", "Node.js", "MongoDB", "AWS"],
    },
    {
      title: "GDG Lead",
      company: "Google Developer Groups",
      period: "2024 - Present",
      description:
        "Leading developer community initiatives, organizing technical workshops and hackathons focused on Google technologies and modern development practices.",
      impact: "Established active developer community with regular technical sessions",
      tech: ["Flutter", "Firebase", "Google Cloud", "TensorFlow"],
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
    "Head of Development @Geek Room - Technical community with 15,000+ registrations",
    "Led multiple successful hackathons and technical workshops",
    "Contributed to open-source projects in ML and web development",
    "Built production applications serving thousands of users",
  ],

  social: {
    github: "https://github.com/Sanidhya14321",
    linkedin: "https://linkedin.com/in/sanidhyavats",
    twitter: "https://twitter.com/sanidhyavats",
    email: "sanidhya14321@gmail.com",
  },
};
