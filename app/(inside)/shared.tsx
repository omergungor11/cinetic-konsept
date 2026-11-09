import Link from "next/link";
import { Film } from "./motion";

export const advertising = "/projects/?category_name=advertising";
export const experience = "/projects/?category_name=experience-design";

export function OvalArrow({ reverse = false }: { reverse?: boolean }) {
  return (
    <svg
      className={reverse ? "inside-arrow reverse" : "inside-arrow"}
      viewBox="0 0 38 18"
      width="38"
      height="18"
      fill="none"
      aria-hidden="true"
    >
      <ellipse cx="19" cy="9" rx="18.5" ry="8.5" stroke="currentColor" />
      <path d="M13 9h12m0 0-3-3m3 3-3 3" stroke="currentColor" />
    </svg>
  );
}

export function TabNav({
  active,
  studio = false,
}: {
  active: string;
  studio?: boolean;
}) {
  const links = studio
    ? [
        ["About", "/about/"],
        ["Services", "/services/"],
      ]
    : [
        ["Advertising", advertising],
        ["Cinema", "/cinema/"],
        ["Experience Design", experience],
      ];
  return (
    <nav
      className="inside-tabs"
      aria-label={studio ? "Studio" : "Project categories"}
    >
      {links.map(([name, href]) => (
        <Link
          key={name}
          href={href}
          aria-current={name === active ? "page" : undefined}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}

export type Asset =
  | { kind: "image"; src: string }
  | {
      kind: "video";
      src: string;
      poster?: string;
      loop?: boolean;
      auto?: boolean;
      controls?: boolean;
    };

export function Media({ item }: { item: Asset }) {
  if (item.kind === "video") return <Film {...item} />;
  return (
    <img className="inside-media-image" src={item.src} alt="" loading="lazy" />
  );
}

type Person = {
  name: string[];
  role: string;
  image: string;
  href: string;
  icon: string;
};

export function Team({ people }: { people: Person[] }) {
  return (
    <div className="inside-team">
      {people.map(({ name, role, image, href, icon }) => (
        <article key={name.join(" ")} data-reveal>
          <img className="inside-portrait" src={image} alt="" loading="lazy" />
          <h3>{name.join("\n")}</h3>
          <div className="inside-person-meta">
            <span>{role}</span>
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={name.join(" ") + " profile"}
              >
                <img src={icon} alt="" width="30" height="30" loading="lazy" />
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export function TextGrid({
  items,
  columns = 3,
}: {
  items: { title: string; lines: string[] }[];
  columns?: number;
}) {
  return (
    <div
      className={
        columns === 2
          ? "inside-text-grid inside-text-grid-two"
          : "inside-text-grid"
      }
    >
      {items.map((item) => (
        <article key={item.title} data-reveal>
          <h3>{item.title}</h3>
          <div>
            {item.lines.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export type ProjectCardData = {
  title: string;
  description: string;
  href: string;
  image: string;
  video?: string;
};

export function ProjectCard({ project }: { project: ProjectCardData }) {
  const external = project.href.startsWith("http");
  return (
    <article className="inside-project-card" data-reveal>
      <Link
        href={project.href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
      >
        {project.image && <img src={project.image} alt="" loading="lazy" />}
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <span className="inside-cta">
          Discover the project <OvalArrow />
        </span>
      </Link>
    </article>
  );
}
