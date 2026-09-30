import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./resume.module.css";

export const metadata: Metadata = pageMetadata("Resume — Sanidhya Vats", "View and download Sanidhya Vats's original AI/ML resume, including experience, projects, technical skills, and community leadership.", "/resume");

const pdf = "/resume/Sanidhya_Vats_Resume-AIML.pdf";

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
          <div><h2 className="display">Sanidhya Vats</h2><p>View my resume below, or take a copy with you.</p></div>
          <div className={styles.actions}>
            <a href="/resume/download" download="Sanidhya_Vats_Resume-AIML.pdf" className={styles.primary}>Download PDF ↓</a>
            <a href={pdf} target="_blank" rel="noopener noreferrer" className={styles.button}>Open PDF ↗</a>
          </div>
        </div>
      </header>
      <section className={styles.preview} aria-labelledby="preview-heading">
        <div className={styles.previewHeading}>
          <h2 id="preview-heading" className="label">(Original resume)</h2>
          <span className="label">01 page / PDF</span>
        </div>
        <a href={pdf} target="_blank" rel="noopener noreferrer" className={styles.document} aria-label="Open the original resume PDF for selectable text and full-size viewing">
          <Image src="/resume/preview.png" alt="Preview of Sanidhya Vats's original AI/ML resume. Open the PDF for selectable text, experience, projects, leadership, achievements, and technical skills." width={1700} height={2200} sizes="(max-width: 767px) 100vw, 1000px" priority />
        </a>
        <p className={styles.hint}>For full-size viewing and selectable text, <a href={pdf} target="_blank" rel="noopener noreferrer">open the original PDF ↗</a>.</p>
      </section>
    </div>
  );
}
