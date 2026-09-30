import type { Metadata } from "next";
import Link from "next/link";
import styles from "./resume.module.css";

export const metadata: Metadata = {
  title: "Resume — Sanidhya Vats",
  description: "Sanidhya Vats's AI/ML resume: engineering experience, projects, technical skills, and community leadership.",
};

const pdf = "/resume/Sanidhya_Vats_Resume-AIML.pdf";
const experience = [
  { title: "Growth & Operations Engineer", company: "Geek Room", date: "Aug. 2026 — Present", location: "Delhi, India", points: [
    "Managed the expansion of the community network, coordinating between multiple regional groups to help them grow their member bases.",
    "Built and maintained event websites and registration flows that converted outreach into signups.",
  ] },
  { title: "AI Engineer", company: "Square Educations", date: "Jan. 2026 — Mar. 2026", location: "NCR, India", points: [
    "Built an LLM recommendation engine using NLP classifiers on aptitude/reasoning data to generate tailored career trajectories.",
    "Established CI/CD deployment and automated Pytest pipelines, boosting code coverage from 65% to 85% and cutting deployment time by 20%.",
  ] },
];
const projects = [
  { title: "Harvest", subtitle: "Autonomous Coding Agent Harness", tech: "TypeScript · Rust · Bun · N-API · Git", href: "https://github.com/Sanidhya14321/Harvest-Agent", points: [
    "Engineered deterministic execution grounding with pre-read mutation shields, intercepting agent completion turns to enforce test execution against modified files and validate physical Git HEAD progression.",
    "Built a context compaction engine paired with an in-memory BM25 symbol index, compressing conversational trajectories while retaining active diffs, verification records, and AST symbols without external embeddings.",
    "Implemented Shannon entropy-gated intent routing to resolve prompt ambiguity via interactive user disambiguation, combined with a native Rust N-API engine for streaming fuzzy patch application.",
  ] },
  { title: "Oasis", subtitle: "IaC Mutation Testing Framework", tech: "Python · Terraform · OpenTofu · Docker · GitHub Actions", href: "https://github.com/DegenerateUSER/Oasis", points: [
    "Designed and engineered an open-source mutation testing framework evaluating the semantic quality of Terraform and OpenTofu test assertions by injecting synthetic faults (mutants).",
    "Developed an AST parsing engine for IaC configurations along with 12 specialized mutation operators to simulate infrastructure drifts and state anomalies.",
    "Implemented a zero-drift Git state restoration mechanism ensuring clean workspace recovery post-run, and packaged the tool with self-updating native CLI wrappers.",
  ] },
  { title: "Real-Time Data Pipeline", subtitle: "LLM-powered streaming & semantic retrieval", tech: "Python · Kafka · FastAPI · Docker", href: "https://github.com/Sanidhya14321/data-pipeline", points: [
    "Engineered an LLM-powered streaming data pipeline using Apache Kafka and Python to ingest real-time data from 3+ external sources, increasing processing throughput by 40% via automated Groq API LLM summarization.",
    "Enabled RAG-based semantic search by integrating Qdrant (Vector DB) with a resilient web-scraping fallback, containerizing the entire ML inference system with Docker and Kubernetes.",
  ] },
];
const skills = [
  ["Languages", "Python, TypeScript, JavaScript, C, C++"],
  ["AI & Machine Learning", "PyTorch, Scikit-Learn, Transformers, Hugging Face, LangChain, LangGraph, LLMs, RAG, Prompt Engineering, Vector Databases, Ensemble Learning"],
  ["Backend & Data", "FastAPI, Node.js, Express.js, Flask, Apache Kafka, PostgreSQL, MongoDB, MySQL, Redis, Qdrant, Prisma ORM, Firebase"],
  ["Frontend", "Next.js, React.js, Tailwind CSS, Redux.js, RTK Query, Framer Motion"],
  ["MLOps & Tools", "Docker, Kubernetes, Git, GitHub, Vite, Postman, CI/CD"],
];

function Points({ items }: { items: string[] }) {
  return <ul className={styles.points}>{items.map(item => <li key={item}>{item}</li>)}</ul>;
}

export default function ResumePage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.topline}>
          <Link href="/about" className="label">← About Sanidhya</Link>
          <span className="label">Curriculum vitae / AI & ML</span>
        </div>
        <h1 className="display">Resume<span className={styles.star} aria-hidden="true">✦</span></h1>
        <div className={styles.intro}>
          <div><h2 className="display">Sanidhya Vats</h2><p>AI engineering, developer tools & community leadership.</p></div>
          <div className={styles.actions}>
            <a href={pdf} download className={styles.primary}>Download PDF ↓</a>
            <a href={pdf} target="_blank" rel="noopener noreferrer" className={styles.button}>Open PDF ↗</a>
          </div>
        </div>
        <address className={styles.contacts}>
          <span>Delhi, India</span><a href="tel:+919667742077">9667742077</a>
          <a href="mailto:sanidhya14321@email.com">sanidhya14321@email.com</a>
          <a href="https://www.linkedin.com/in/sanidhya-vats-9344522b7/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </address>
      </header>
      <nav className={styles.index} aria-label="Resume sections">
        {["Experience", "Projects", "Leadership", "Achievements", "Skills"].map((name, i) => <a key={name} href={`#${name.toLowerCase()}`}><span>0{i + 1}</span> {name}</a>)}
      </nav>
      <section id="experience" className={styles.section} aria-labelledby="experience-heading">
        <div className={styles.sectionTitle}><span className="label">(01 / Career)</span><h2 id="experience-heading" className="display">Experience</h2></div>
        <div>{experience.map(job => <article key={job.title} className={styles.entry}>
          <div className={styles.entryHeader}><h3 className="display">{job.title}</h3><span className="label">{job.date}</span></div>
          <p className={styles.meta}>{job.company} / {job.location}</p><Points items={job.points} />
        </article>)}</div>
      </section>
      <section id="projects" className={styles.section} aria-labelledby="projects-heading">
        <div className={styles.sectionTitle}><span className="label">(02 / Selected builds)</span><h2 id="projects-heading" className="display">Projects</h2></div>
        <div>{projects.map(project => <article key={project.title} className={styles.entry}>
          <div className={styles.entryHeader}><h3 className="display">{project.title}</h3><a className={styles.repo} href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub`}>GitHub ↗</a></div>
          <p className={styles.subtitle}>{project.subtitle}</p><p className={styles.meta}>{project.tech}</p><Points items={project.points} />
        </article>)}</div>
      </section>
      <section id="leadership" className={styles.section} aria-labelledby="leadership-heading">
        <div className={styles.sectionTitle}><span className="label">(03 / Responsibility)</span><h2 id="leadership-heading" className="display">Leadership</h2></div>
        <article className={styles.entry}><div className={styles.entryHeader}><h3 className="display">Leadership Roles</h3><span className="label">Aug. 2023 — Present</span></div>
          <p className={styles.meta}>Google Developer Groups · Geek Room · ISTE MSIT</p>
          <Points items={["Mentored 50+ students in AI and full-stack development, moderated 5+ hackathons, and scaled technical talent pools by interviewing and onboarding 250+ new members across all societies.", "Delivered user-friendly websites for community events and organized an Ideathon featuring a Microsoft guest speaker with 100+ participants."]} />
        </article>
      </section>
      <section id="achievements" className={styles.section} aria-labelledby="achievements-heading">
        <div className={styles.sectionTitle}><span className="label">(04 / Community impact)</span><h2 id="achievements-heading" className="display">Achievements</h2></div>
        <div><article className={styles.entry}><h3 className="display">Mentored Events</h3><p>HackAvensis 2026, Innovortex 3.0 2025, Innerve Hackathon 2026, SIH 2026 Internal Round.</p></article>
          <article className={styles.entry}><h3 className="display">Organized Events</h3><p>AI Oriented BatterySmart Hackathon 2026, Hack GeekRoom 2026, CodeKshetra 2.0, Trackshift Hackathon 2026, Build-UP Ideathon 2026, Code-Cubicle Hackathon Series, Kaggle-Days Meetup 2025.</p></article></div>
      </section>
      <section id="skills" className={styles.section} aria-labelledby="skills-heading">
        <div className={styles.sectionTitle}><span className="label">(05 / Toolkit)</span><h2 id="skills-heading" className="display">Technical Skills</h2></div>
        <dl>{skills.map(([name, tools]) => <div key={name} className={styles.entry}><dt className="display">{name}</dt><dd>{tools}</dd></div>)}</dl>
      </section>
      <section className={styles.closing} aria-label="Explore further">
        <span className="label">From credentials to craft</span><h2 className="display">Explore the work.</h2>
        <Link href="/works" className={styles.primary}>View projects ↗</Link>
      </section>
    </div>
  );
}
