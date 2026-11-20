"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, CodeXml, BriefcaseBusiness, Mail, Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { profile, projects, skillCategories } from "@/data/portfolio";

const nav = [
  ["Home", "home"], ["About", "about"], ["Skills", "skills"], ["Projects", "projects"],
  ["Education", "education"], ["Certifications", "certifications"], ["Contact", "contact"],
];

export default function Portfolio() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("home");
  const reduce = useReducedMotion();

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    const next = saved ?? "dark";
    setTheme(next); document.documentElement.dataset.theme = next;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting && setActive(entry.target.id));
    }, { rootMargin: "-35% 0px -55%" });
    nav.forEach(([, id]) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next); document.documentElement.dataset.theme = next; localStorage.setItem("theme", next);
  };

  const reveal = reduce ? {} : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.65 } };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="navbar">
        <Link className="brand" href="#home" aria-label="Vivek Kumar home">VK<span>.</span></Link>
        <nav className={menu ? "nav-links open" : "nav-links"} aria-label="Main navigation">
          {nav.map(([label, id]) => <a key={id} className={active === id ? "active" : ""} href={`#${id}`} onClick={() => setMenu(false)}>{label}</a>)}
        </nav>
        <div className="nav-actions">
          <button className="icon-button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>{theme === "dark" ? <Sun size={18}/> : <Moon size={18}/>}</button>
          <button className="icon-button menu-button" onClick={() => setMenu(v => !v)} aria-expanded={menu} aria-label="Toggle navigation">{menu ? <X/> : <Menu/>}</button>
        </div>
      </header>

      <main id="main">
        <section id="home" className="hero section-shell">
          <motion.div className="hero-copy" initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="eyebrow"><span/> {profile.location}</p>
            <h1><span className="serif">Hello, I’m</span><br/>Vivek Kumar.</h1>
            <p className="role">Software Developer · AI/ML Enthusiast · Technology Innovator</p>
            <p className="hero-intro">“{profile.intro}”</p>
            <div className="hero-actions">
              <a className="button primary" href="#projects">Explore my projects <ArrowUpRight size={17}/></a>
              <span className="button ghost" aria-disabled="true">Resume pending <Download size={17}/></span>
              <a className="button text-button" href="#contact">Contact me</a>
            </div>
          </motion.div>
          <motion.div className="portrait-wrap" initial={reduce ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }}>
            <div className="portrait-frame">
              <Image src="/images/profile.jpg" alt="Vivek Kumar" fill priority sizes="(max-width: 768px) 88vw, 43vw" className="portrait"/>
            </div>
            <div className="portrait-index">01 / 04</div>
          </motion.div>
          <a className="scroll-cue" href="#about" aria-label="Scroll to about section"><ArrowDown size={18}/><span>Scroll</span></a>
        </section>

        <section id="about" className="section-shell content-section">
          <motion.div {...reveal} className="section-heading"><p>01 — About</p><h2>Curiosity, code,<br/><span className="serif">and continuous learning.</span></h2></motion.div>
          <motion.div {...reveal} className="about-grid">
            <div className="about-lead">I’m an aspiring software developer pursuing a B.Tech in Computer Science and Engineering with a specialization in AI & Machine Learning at Uttaranchal University.</div>
            <div className="about-copy"><p>I enjoy building technology-driven applications and exploring practical solutions across artificial intelligence, machine learning, robotics, data science and web development.</p><p>My development journey is rooted in curiosity: understanding a problem, learning the tools needed to approach it, and turning ideas into usable systems. I’m especially interested in how intelligent software can interact with the physical world through sensors, embedded systems and computer vision.</p><p>My goal is to develop useful, responsible applications that solve real-world problems while continuing to grow through hands-on project work.</p></div>
          </motion.div>
        </section>

        <section id="skills" className="section-shell content-section">
          <motion.div {...reveal} className="section-heading"><p>02 — Skills</p><h2>A practical toolkit for<br/><span className="serif">building intelligent systems.</span></h2></motion.div>
          <div className="skills-grid">
            {skillCategories.map((group, i) => <motion.article {...reveal} transition={{ duration: 0.55, delay: i * 0.04 }} className="skill-block" key={group.title}><div className="skill-number">0{i + 1}</div><h3>{group.title}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul><p className="skill-level">{group.level}</p></motion.article>)}
          </div>
        </section>

        <section id="projects" className="section-shell content-section">
          <motion.div {...reveal} className="section-heading project-heading"><p>03 — Selected work</p><h2>Projects shaped by<br/><span className="serif">ideas and exploration.</span></h2></motion.div>
          <div className="project-list">
            {projects.map((project, i) => <motion.article {...reveal} className="project-row" key={project.slug}><div className="project-meta"><span>{project.number}</span><p>{project.category}</p></div><div className="project-info"><h3>{project.fullTitle}</h3><p>{project.description}</p><Link className="project-link" href={`/projects/${project.slug}`}>View case study <ArrowUpRight size={17}/></Link></div><div className={`project-visual visual-${i + 1}`} aria-hidden="true"><span>{project.title}</span></div></motion.article>)}
          </div>
        </section>

        <section id="education" className="section-shell content-section">
          <motion.div {...reveal} className="section-heading"><p>04 — Education</p><h2>Learning with<br/><span className="serif">an engineering mindset.</span></h2></motion.div>
          <motion.div {...reveal} className="education-timeline"><div className="timeline-mark"><span/><small>2024 — 2028</small></div><div><p className="kicker">Currently pursuing</p><h3>Bachelor of Technology</h3><p className="degree">Computer Science and Engineering · AI & Machine Learning</p><p>Uttaranchal University, Dehradun</p></div></motion.div>
        </section>

        <section id="certifications" className="section-shell content-section">
          <motion.div {...reveal} className="section-heading"><p>05 — Certifications</p><h2>Validated learning.<br/><span className="serif">Applied with purpose.</span></h2></motion.div>
          <motion.article {...reveal} className="certificate-card"><div className="certificate-copy"><p className="kicker">Top Performer · 15 June 2026</p><h3>Programming in Python with AI</h3><p>Internshala Trainings · Uttaranchal University</p><p className="duration">6-week training program</p><ul className="topic-list"><li>Python fundamentals</li><li>AI-enhanced programming</li><li>Object-oriented programming</li><li>SQLite connectivity</li><li>PyQt GUI development</li><li>Next-generation coding tools</li></ul><a className="button primary certificate-action" href="/certificates/python-ai-certificate.pdf" target="_blank" rel="noreferrer">View certificate <ArrowUpRight size={17}/></a></div><div className="certificate-preview"><iframe src="/certificates/python-ai-certificate.pdf#view=FitH" title="Programming in Python with AI certificate"/></div></motion.article>
        </section>

        <section className="section-shell content-section experience">
          <motion.div {...reveal} className="section-heading"><p>06 — Experience</p><h2>Project experience<br/><span className="serif">& practical learning.</span></h2></motion.div>
          <p className="experience-copy">My practical experience comes from independently exploring and developing software and AI projects across web platforms, machine learning workflows and robotics systems. Internship and employment details can be added here as they become available.</p>
        </section>

        <section id="contact" className="section-shell content-section contact-section">
          <motion.div {...reveal} className="contact-heading"><p>07 — Let’s talk</p><h2>Have a project in mind?<br/><span className="serif">Let’s build something.</span></h2></motion.div>
          <div className="contact-layout"><div className="contact-links"><a href={`mailto:${profile.email}`}><Mail size={18}/><span>Email<small>{profile.email}</small></span></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><BriefcaseBusiness size={18}/><span>LinkedIn<small>View profile</small></span></a><a href={profile.github} target="_blank" rel="noreferrer"><CodeXml size={18}/><span>GitHub<small>View repositories</small></span></a></div><ContactForm/></div>
        </section>
      </main>

      <footer><Link className="brand" href="#home">VK<span>.</span></Link><p>© 2026 Vivek Kumar</p><a href="#home">Back to top <ArrowUpRight size={15}/></a></footer>
    </>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setStatus("loading"); setMessage("");
    const form = e.currentTarget; const data = new FormData(form);
    try { const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(data)) }); const result = await res.json(); if (!res.ok) throw new Error(result.error || "Unable to send message."); setStatus("success"); setMessage("Message received. Thank you for reaching out."); form.reset(); } catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "Unable to send message."); }
  }
  return <form className="contact-form" onSubmit={submit}><div className="form-row"><label>Name<input name="name" required minLength={2} maxLength={80} autoComplete="name"/></label><label>Email<input name="email" type="email" required maxLength={160} autoComplete="email"/></label></div><label>Subject<input name="subject" required minLength={3} maxLength={140}/></label><label>Message<textarea name="message" required minLength={10} maxLength={5000} rows={5}/></label><input name="website" className="honeypot" tabIndex={-1} autoComplete="off"/><button className="button primary" disabled={status === "loading"} type="submit">{status === "loading" ? "Sending…" : "Send message"}<ArrowUpRight size={17}/></button>{message && <p className={`form-status ${status}`} role="status">{message}</p>}</form>;
}
