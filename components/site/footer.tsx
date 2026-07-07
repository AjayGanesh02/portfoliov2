const links = [
  { label: "github", href: "https://github.com/AjayGanesh02" },
  { label: "linkedin", href: "https://www.linkedin.com/in/ajay-ganesh/" },
  { label: "resume", href: "https://github.com/AjayGanesh02/AGResume/raw/main/main.pdf" },
  { label: "email", href: "mailto:ajganesh2002@gmail.com" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 pt-6 dark:border-neutral-800">
      <nav className="flex gap-4 font-mono text-sm text-neutral-500">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            {l.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
