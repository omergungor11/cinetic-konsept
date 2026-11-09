import type { Metadata } from "next";
import studio from "../../content/studio.json";

export const metadata: Metadata = { title: "Terms and Conditions" };

export default function Terms() {
  return (
    <article className="inside-stack inside-terms">
      <h1 className="inside-title" data-reveal>
        TERMS OF USE AND PRIVACY POLICY
      </h1>
      <p>{studio.terms[0]}</p>
      {studio.terms.slice(1).map((group) => {
        const [heading, ...lines] = group.split("\n");
        const paragraphs = lines
          .join("\n")
          .replace(/(^|\n)(\d+\.\d+(?:\.\d+)?)\n/g, "$1$2 ")
          .split("\n");
        return (
          <section key={heading}>
            <h2>{heading}</h2>
            {paragraphs.map((line, index) => {
              const match = /^(\d+\.\d+(?:\.\d+)?) (.*)$/.exec(line);
              return (
                <p key={index}>
                  {match ? (
                    <>
                      <strong>{match[1]}</strong> {match[2]}
                    </>
                  ) : (
                    line
                  )}
                </p>
              );
            })}
          </section>
        );
      })}
    </article>
  );
}
