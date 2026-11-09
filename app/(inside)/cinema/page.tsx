import type { Metadata } from "next";
import studio from "../../content/studio.json";
import { OvalArrow, TabNav, Team, TextGrid } from "../shared";

export const metadata: Metadata = { title: "Cinema" };

export default function Cinema() {
  return (
    <div className="inside-stack">
      <section>
        <h1 className="inside-title" data-reveal>
          CINEMA SERVICES
        </h1>
        <TextGrid items={studio.cinemaServices} columns={2} />
      </section>
      <section className="inside-cinema-team">
        <h2 className="inside-title" data-reveal>
          CINEMA TEAM
        </h2>
        <Team people={studio.cinemaTeam} />
      </section>
      <section className="inside-films" aria-label="Cinema projects">
        {studio.cinemaMovies.map((film) => (
          <article key={film.image || film.title} data-reveal>
            {film.href ? (
              <a
                href={film.href}
                target="_blank"
                rel="noreferrer"
                aria-label={film.title}
              >
                <img src={film.image} alt="" loading="lazy" />
              </a>
            ) : (
              <img src={film.image} alt="" loading="lazy" />
            )}
            <h3>{film.title}</h3>
            {film.description && <p>{film.description}</p>}
            {film.href && (
              <a
                className="inside-cta"
                href={film.href}
                target="_blank"
                rel="noreferrer"
              >
                Discover the project <OvalArrow />
              </a>
            )}
          </article>
        ))}
      </section>
      <TabNav active="Cinema" />
    </div>
  );
}
