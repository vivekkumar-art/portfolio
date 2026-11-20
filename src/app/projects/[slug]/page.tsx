import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/portfolio";

export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const project = projects.find(item => item.slug === slug); return project ? { title: `${project.fullTitle} | Vivek Kumar`, description: project.description } : {}; }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();
  return <main className="case-study"><Link className="back-link" href="/#projects"><ArrowLeft size={17}/> Back to projects</Link><header><p className="eyebrow">Case study · {project.number}</p><h1>{project.fullTitle}</h1><p className="case-category">{project.category}</p></header><section className="case-grid"><div><p className="kicker">Overview</p><p className="case-description">{project.description}</p></div><aside><p className="kicker">Project status</p><p>Completed project</p>{project.github && <a className="button primary" href={project.github} target="_blank" rel="noreferrer">View on GitHub <ArrowUpRight size={17}/></a>}</aside></section><section><p className="kicker">Explored areas</p><div className="case-areas">{project.areas.map(area => <span key={area}>{area}</span>)}</div></section>{project.components && <section><p className="kicker">Components explored</p><div className="case-areas">{project.components.map(item => <span key={item}>{item}</span>)}</div></section>}<p className="case-note">This case study describes the confirmed scope of the project and does not imply unverified implementation or performance claims.</p></main>;
}
