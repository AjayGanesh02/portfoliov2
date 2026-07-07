import Link from "next/link";
import { SiteName } from "./name";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { label: "experience", href: "/#experience" },
  { label: "projects", href: "/#projects" },
  { label: "spotify", href: "/spotify" },
];

export function Header() {
  return (
    <header className="mb-12 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
      <SiteName />
      <nav className="flex items-baseline gap-4 font-mono text-sm text-neutral-500">
        {links.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            {l.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}
