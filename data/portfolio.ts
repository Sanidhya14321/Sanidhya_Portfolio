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
      "Production-grade applications deployed on AWS, Vercel, and containerized environments"
    ]
  },

  experience: [
    {
      title: "Founder & Technical Lead",
      company: "Geek Room",
      period: "2023 - Present",
      description: "Founded and led technical community focusing on modern development practices. Architected and delivered workshops on full-stack development, ML/AI, and DevOps.",
      impact: "15,000+ community registrations across technical events",
      tech: ["Next.js", "React", "Node.js", "MongoDB", "AWS"]
    },
    {
      title: "GDG Lead",
      company: "Google Developer Groups",
      period: "2024 - Present",
      description: "Leading developer community initiatives, organizing technical workshops and hackathons focused on Google technologies and modern development practices.",
      impact: "Established active developer community with regular technical sessions",
      tech: ["Flutter", "Firebase", "Google Cloud", "TensorFlow"]
    }
  ],

  education: {
    degree: "Bachelor of Technology in Computer Science",
    institution: "Maharaja Surajmal Institute of Technology (MSIT)",
    period: "2023 - 2027",
    achievements: [
      "Focus on Software Engineering, AI/ML, and Systems Design",
      "Active participant in technical clubs and hackathons"
    ]
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
      { name: "RTK Query", level: 80 }
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
      { name: "NextAuth", level: 80 }
    ],
    "Data Management & Storage": [
      { name: "MongoDB", level: 90 },
      { name: "Mongoose ODM", level: 90 },
      { name: "Firebase", level: 85 },
      { name: "PostgreSQL", level: 85 },
      { name: "MySQL", level: 85 },
      { name: "Redis", level: 80 },
      { name: "Supabase", level: 80 }
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
      { name: "OpenAI API", level: 85 }
    ],
    "DevOps & Developer Productivity": [
      { name: "Git", level: 95 },
      { name: "GitHub", level: 95 },
      { name: "Docker", level: 85 },
      { name: "GitHub Actions", level: 85 },
      { name: "AWS", level: 80 },
      { name: "Vercel", level: 90 },
      { name: "Heroku", level: 80 },
      { name: "Postman", level: 90 }
    ],
    "Systems & Low-Level Languages": [
      { name: "C", level: 85 },
      { name: "C++", level: 85 },
      { name: "Java", level: 85 },
      { name: "Operating Systems", level: 80 },
      { name: "Networking", level: 80 }
    ]
  },

  featuredProjects: [
    {
      id: "debate-app",
      title: "Debate App",
      description: "Real-time debate platform with advanced moderation and scoring system. Features include live audience participation, AI-powered argument analysis, and comprehensive analytics dashboard.",
      tech: ["Next.js", "Socket.IO", "MongoDB", "Redis", "TensorFlow"],
      status: "In Development",
      image: "/projects/debate-app.png",
      github: "",
      demo: "",
      highlights: [
        "Real-time communication with Socket.IO",
        "AI-powered argument quality analysis",
        "Scalable architecture supporting 1000+ concurrent users"
      ]
    },
    {
      id: "career-compass",
      title: "CareerCompass",
      description: "AI-driven career guidance platform utilizing machine learning to provide personalized career path recommendations based on skills, interests, and market trends.",
      tech: ["React", "FastAPI", "PyTorch", "PostgreSQL", "Docker"],
      status: "Live",
      image: "/projects/career-compass.png",
      github: "",
      demo: "",
      highlights: [
        "ML-powered career path prediction",
        "Integration with real-time job market data",
        "Interactive skill assessment modules"
      ]
    },
    {
      id: "spark",
      title: "SPARK",
      description: "Event management and community engagement platform designed for technical communities. Handles registrations, speaker management, and post-event analytics.",
      tech: ["Next.js", "Node.js", "MongoDB", "AWS S3", "Vercel"],
      status: "Live",
      image: "/projects/spark.png",
      github: "",
      demo: "",
      highlights: [
        "Managed 15,000+ event registrations",
        "Automated email campaigns and notifications",
        "Real-time analytics dashboard"
      ]
    }
  ],

  otherProjects: [
    {
      title: "Resume Builder",
      description: "Dynamic resume generation tool with multiple templates and real-time preview. Export to PDF with customizable styling.",
      tech: ["React", "TypeScript", "Tailwind CSS"],
      github: "",
      demo: ""
    },
    {
      title: "Algorithm Visualizer",
      description: "Interactive tool for visualizing sorting and pathfinding algorithms including Dijkstra's algorithm implementation.",
      tech: ["JavaScript", "D3.js", "React"],
      github: "",
      demo: ""
    }
  ],

  achievements: [
    "Founded Geek Room - Technical community with 15,000+ registrations",
    "Led multiple successful hackathons and technical workshops",
    "Contributed to open-source projects in ML and web development",
    "Built production applications serving thousands of users"
  ],

  social: {
    github: "https://github.com/Sanidhya14321",
    linkedin: "https://linkedin.com/in/sanidhyavats",
    twitter: "https://twitter.com/sanidhyavats",
    email: "sanidhya14321@gmail.com"
  }
};
