import type { Metadata } from "next";
import studio from "../../content/studio.json";
import { TabNav, TextGrid } from "../shared";

export const metadata: Metadata = { title: "Services" };

export default function Services() {
  return (
    <div className="inside-stack">
      <h1 className="inside-title" data-reveal>
        ADVERTISING &amp; EXPERIENCE DESIGN SERVICES
      </h1>
      <TextGrid items={studio.advertisingServices} />
      <TabNav active="Services" studio />
      <section>
        <h2 className="inside-title" data-reveal>
          OUR CLIENTS
        </h2>
        <ul className="inside-clients">
          {studio.clients.map((client) => (
            <li key={client} data-reveal>
              {client}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="inside-title" data-reveal>
          CINEMA SERVICES
        </h2>
        <TextGrid items={studio.cinemaServices} columns={2} />
      </section>
    </div>
  );
}
