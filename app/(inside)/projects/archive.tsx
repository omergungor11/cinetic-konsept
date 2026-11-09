import Link from "next/link";
import data from "../../content/archive.json";
import { advertising, OvalArrow, ProjectCard, TabNav } from "../shared";
import Featured from "./featured";

export default function Archive({
  page,
  experience,
}: {
  page: number;
  experience: boolean;
}) {
  const projects = experience
    ? data.groups.experience
    : page === 1
      ? data.groups.advertising
      : data.groups.advertisingSecond;
  const featured = data.selections[experience ? 2 : 0];
  const second = "/projects/page/2/?category_name=advertising";

  return (
    <>
      <Featured
        key={experience ? "experience" : "advertising"}
        projects={featured}
      />
      <TabNav active={experience ? "Experience Design" : "Advertising"} />
      <section
        className="inside-archive"
        aria-label={
          experience ? "Experience design projects" : "Advertising projects"
        }
      >
        <div className="inside-project-list">
          {projects.map((project) => (
            <ProjectCard key={project.href} project={project} />
          ))}
        </div>
        {!experience && (
          <nav className="inside-pagination" aria-label="Project pages">
            {page === 2 && (
              <Link href={advertising} aria-label="Previous page">
                <OvalArrow reverse />
              </Link>
            )}
            <Link
              href={advertising}
              aria-current={page === 1 ? "page" : undefined}
            >
              1
            </Link>
            <Link href={second} aria-current={page === 2 ? "page" : undefined}>
              2
            </Link>
            {page === 1 && (
              <Link href={second} aria-label="Next page">
                <OvalArrow />
              </Link>
            )}
          </nav>
        )}
      </section>
    </>
  );
}
