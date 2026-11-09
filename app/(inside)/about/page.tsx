import type { Metadata } from "next";
import studio from "../../content/studio.json";
import { type Asset, Media, TabNav, Team, TextGrid } from "../shared";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <div className="inside-stack">
      <h1 className="inside-about-intro" data-reveal>
        {studio.aboutIntro}
      </h1>
      <TabNav active="About" studio />
      <Media item={studio.aboutVideo as Asset} />
      <p className="inside-about-description" data-reveal>
        {studio.aboutDescription}
      </p>
      <Team people={studio.team} />
      <section>
        <h2 className="inside-title" data-reveal>
          OUR GUIDING PRINCIPLES
        </h2>
        <TextGrid items={studio.principles} />
      </section>
    </div>
  );
}
