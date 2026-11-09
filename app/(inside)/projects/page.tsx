import type { Metadata } from "next";
import Archive from "./archive";

export const metadata: Metadata = { title: "Projects" };

export default async function Projects({
  searchParams,
}: {
  searchParams: Promise<{ category_name?: string }>;
}) {
  const query = await searchParams;
  return (
    <Archive
      page={1}
      experience={query.category_name === "experience-design"}
    />
  );
}
