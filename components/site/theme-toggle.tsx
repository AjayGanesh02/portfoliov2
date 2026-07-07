"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <span className="inline-block w-8" aria-hidden />;
  }
  const dark = resolvedTheme === "dark";
  return (
    <button
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className="font-mono text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
    >
      {dark ? "☾" : "☀"}
    </button>
  );
}
