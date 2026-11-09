import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Archive from "../../archive";

export const metadata: Metadata = { title: "Projects" };

export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ number: string }>;
  searchParams: Promise<{ category_name?: string }>;
}) {
  const [route, query] = await Promise.all([params, searchParams]);
  if (route.number !== "1" && route.number !== "2") notFound();
  return (
    <Archive
      page={Number(route.number)}
      experience={query.category_name === "experience-design"}
    />
  );
}
