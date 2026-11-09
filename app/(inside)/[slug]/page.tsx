import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import content from "../../content/details.json";
import {
  type Asset,
  Media,
  OvalArrow,
  ProjectCard,
  type ProjectCardData,
} from "../shared";

type Section =
  | { kind: "media"; media: Asset }
  | { kind: "grid"; items: Asset[] }
  | { kind: "credits"; items: { role: string; name: string }[] }
  | { kind: "related"; items: ProjectCardData[] }
  | { kind: "text"; lines: string[] };

type Project = { title: string } & (
  | { empty: true }
  | {
      empty?: false;
      description: string;
      image: string;
      back: string;
      backLabel: string;
      summary: string;
      info: { label: string; text: string; more: boolean }[];
      sections: Section[];
    }
);

const projects = content as Record<string, Project>;
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: Object.hasOwn(projects, slug)
      ? projects[slug].title
      : "Page not found",
  };
}

function ProjectSection({ section }: { section: Section }) {
  switch (section.kind) {
    case "media":
      return <Media item={section.media} />;
    case "grid":
      return (
        <div className="inside-media-grid">
          {section.items.map((asset, index) => (
            <Media key={index} item={asset} />
          ))}
        </div>
      );
    case "credits":
      return (
        <section className="inside-credits" id="credits" data-reveal>
          <h2>CREDITS</h2>
          <dl>
            {section.items.map(({ role, name }, index) => (
              <div key={index}>
                <dt>{role}</dt>
                <dd>{name}</dd>
              </div>
            ))}
          </dl>
        </section>
      );
    case "related":
      if (section.items.length === 0) return null;
      return (
        <section className="inside-related">
          <h2 className="inside-title" data-reveal>
            RELATED PROJECTS
          </h2>
          <div className="inside-project-list">
            {section.items.map((item) => (
              <ProjectCard project={item} key={item.href} />
            ))}
          </div>
        </section>
      );
    case "text":
      return (
        <div className="inside-detail-note" data-reveal>
          {section.lines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      );
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  if (!Object.hasOwn(projects, slug)) notFound();
  const project = projects[slug];
  if (project.empty) return <div className="inside-empty" />;

  return (
    <>
      <section className="inside-detail-hero">
        <img src={project.image} alt="" fetchPriority="high" />
        <div className="inside-detail-copy">
          <Link className="inside-cta" href={project.back}>
            <OvalArrow reverse /> {project.backLabel}
          </Link>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </div>
        <a
          className="inside-detail-down"
          href="#project-information"
          aria-label="Scroll to project details"
        >
          <OvalArrow />
        </a>
      </section>
      <div className="inside-stack">
        <section
          className="inside-detail-info"
          id="project-information"
          aria-label="Project information"
        >
          {project.info.map(({ label, text, more }) => (
            <div key={label} data-reveal>
              <h2>{label}</h2>
              <p>{text}</p>
              {more && <a href="#credits">+ more</a>}
            </div>
          ))}
          <p className="inside-detail-summary" data-reveal>
            {project.summary}
          </p>
        </section>
        {project.sections.map((section, index) => (
          <ProjectSection section={section} key={index} />
        ))}
      </div>
    </>
  );
}
