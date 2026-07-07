import Link from "next/link";
import { SiteName } from "./name";
import { ThemeToggle } from "./theme-toggle";
import { AvatarAlbum } from "./avatar-album";
import type { AlbumImage } from "../../lib/album";

const links = [
  { label: "experience", href: "/#experience" },
  { label: "projects", href: "/#projects" },
  { label: "spotify", href: "/spotify" },
];

export function Header({ photos }: { photos: AlbumImage[] }) {
  return (
    <header className="mb-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
      <div className="flex items-center gap-3">
        <AvatarAlbum photos={photos} />
        <SiteName />
      </div>
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
