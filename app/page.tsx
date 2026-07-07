import { getContent } from "../lib/content";
import { ItemRow, Section } from "../components/site/item-row";

export const revalidate = 3600;

export default async function Home() {
  const { experiences, projects, education } = await getContent();
  const edu = education[0];

  return (
    <>
      <section className="space-y-4">
        <p>
          Hi, I&apos;m Ajay — a software engineer at{" "}
          <span className="font-medium">Meta</span>, where I work on data and
          evaluation infrastructure for training generative AI models.
          Previously I built ads privacy infrastructure there, and before that
          I studied computer science at the University of Michigan (BS
          &rsquo;24).
        </p>
        <p className="text-neutral-600 dark:text-neutral-400">
          This site collects things I&apos;ve built and places I&apos;ve
          worked. It pulls live from my GitHub and my resume, so it&apos;s
          usually up to date.
        </p>
      </section>

      <Section id="experience" title="experience">
        <ul className="space-y-4">
          {experiences.map((e) => (
            <ItemRow key={`${e.source}:${e.sourceKey}`} item={e} />
          ))}
        </ul>
        {edu && (
          <p className="mt-4 text-sm text-neutral-500">
            {edu.title} — {edu.subtitle?.replace(/,.*$/, "")}, {edu.dateRange}
          </p>
        )}
      </Section>

      <Section id="projects" title="projects">
        <ul className="space-y-4">
          {projects.map((p) => (
            <ItemRow key={`${p.source}:${p.sourceKey}`} item={p} />
          ))}
        </ul>
      </Section>
    </>
  );
}
