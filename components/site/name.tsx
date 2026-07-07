"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/** Site title. Clicking it five times fires the blinken.org easter egg. */
export function SiteName() {
  const [clicks, setClicks] = useState(0);
  useEffect(() => {
    if (clicks === 5) {
      fetch("/api/lights");
    }
  }, [clicks]);
  return (
    <Link
      href="/"
      onClick={() => setClicks((c) => c + 1)}
      className="font-medium tracking-tight"
    >
      Ajay Ganesh
    </Link>
  );
}
