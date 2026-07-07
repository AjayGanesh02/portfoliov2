/**
 * Minimal LaTeX parser for the sb2nov-style resume template used in
 * AjayGanesh02/AGResume. Not a general LaTeX parser — it tokenizes the small
 * set of macros the template defines:
 *
 *   \resumeSubheading{Company}{Location}{Title}{Dates}
 *   \resumeProjectHeading{Name}{Date}
 *   \resumeItem{bullet}
 *   \section{Name}
 *   skills: \textbf{Label}{: values}
 */

export type ResumeEntry = {
  heading: string; // company / school / project name
  subheading?: string; // role / degree
  location?: string;
  dates: string;
  bullets: string[];
};

export type ParsedResume = {
  education: ResumeEntry[];
  experience: ResumeEntry[];
  projects: ResumeEntry[];
  skills: { label: string; values: string }[];
  warnings: string[];
};

/** Remove LaTeX comments (unescaped % to end of line). */
export function stripComments(src: string): string {
  return src
    .split("\n")
    .map((line) => {
      let out = "";
      for (let i = 0; i < line.length; i++) {
        if (line[i] === "%" && line[i - 1] !== "\\") break;
        out += line[i];
      }
      return out;
    })
    .join("\n");
}

/** Read one balanced {...} group starting at src[pos] === '{'. */
export function readGroup(
  src: string,
  pos: number
): { content: string; end: number } | null {
  if (src[pos] !== "{") return null;
  let depth = 0;
  for (let i = pos; i < src.length; i++) {
    if (src[i] === "\\") {
      i++; // skip escaped char
      continue;
    }
    if (src[i] === "{") depth++;
    else if (src[i] === "}") {
      depth--;
      if (depth === 0) return { content: src.slice(pos + 1, i), end: i + 1 };
    }
  }
  return null; // unbalanced
}

type MacroHit = { index: number; args: string[]; end: number };

/** Find all occurrences of \name{arg1}...{argN}. */
export function findMacros(
  src: string,
  name: string,
  argCount: number
): MacroHit[] {
  const hits: MacroHit[] = [];
  const needle = "\\" + name;
  let from = 0;
  while (true) {
    const idx = src.indexOf(needle, from);
    if (idx === -1) break;
    // reject longer macro names sharing the prefix (e.g. resumeSubheadingContinue)
    const nextChar = src[idx + needle.length];
    if (nextChar && /[a-zA-Z]/.test(nextChar)) {
      from = idx + needle.length;
      continue;
    }
    let pos = idx + needle.length;
    const args: string[] = [];
    for (let a = 0; a < argCount; a++) {
      while (pos < src.length && /\s/.test(src[pos])) pos++;
      const group = readGroup(src, pos);
      if (!group) break;
      args.push(group.content);
      pos = group.end;
    }
    if (args.length === argCount) hits.push({ index: idx, args, end: pos });
    from = idx + needle.length;
  }
  return hits;
}

/** Convert a LaTeX fragment to plain text. */
export function latexToText(input: string): string {
  let s = input;
  // unwrap simple formatting macros, repeatedly for nesting
  for (let i = 0; i < 5; i++) {
    const before = s;
    s = s.replace(/\\(?:textbf|textit|underline|emph|small|scshape)\{([^{}]*)\}/g, "$1");
    // \href{url}{text} -> text
    s = s.replace(/\\href\{[^{}]*\}\{([^{}]*)\}/g, "$1");
    if (s === before) break;
  }
  s = s.replace(/\\raisebox\{[^{}]*\}/g, "");
  s = s.replace(/\\fa[A-Za-z]+/g, "");
  s = s.replace(/\\vspace\{[^{}]*\}/g, "");
  s = s.replace(/\\\\/g, " ");
  s = s.replace(/\\([$%&#_{}])/g, "$1");
  s = s.replace(/\\ /g, " ");
  s = s.replace(/~/g, " ");
  s = s.replace(/[{}]/g, "");
  s = s.replace(/\s+/g, " ").trim();
  return s;
}

/** Normalize a date range for display: "May 2023 - Aug. 2023" -> "May 2023 – Aug 2023". */
export function cleanDates(input: string): string {
  return latexToText(input).replace(/\s+-+\s+/g, " – ").replace(/\.\s/g, " ").replace(/\.$/, "");
}

function sectionSlices(src: string): { name: string; body: string }[] {
  const sections = findMacros(src, "section", 1);
  return sections.map((s, i) => ({
    name: latexToText(s.args[0]),
    body: src.slice(s.end, i + 1 < sections.length ? sections[i + 1].index : src.length),
  }));
}

function parseEntries(
  body: string,
  warnings: string[],
  sectionName: string
): ResumeEntry[] {
  const headings = [
    ...findMacros(body, "resumeSubheading", 4).map((h) => ({ ...h, type: "sub" as const })),
    ...findMacros(body, "resumeProjectHeading", 2).map((h) => ({ ...h, type: "proj" as const })),
  ].sort((a, b) => a.index - b.index);

  const items = findMacros(body, "resumeItem", 1);
  const entries: ResumeEntry[] = [];

  for (let i = 0; i < headings.length; i++) {
    const h = headings[i];
    const sliceEnd = i + 1 < headings.length ? headings[i + 1].index : body.length;
    try {
      const bullets = items
        .filter((it) => it.index > h.index && it.index < sliceEnd)
        .map((it) => latexToText(it.args[0]));
      if (h.type === "sub") {
        entries.push({
          heading: latexToText(h.args[0]),
          location: latexToText(h.args[1]),
          subheading: latexToText(h.args[2]),
          dates: cleanDates(h.args[3]),
          bullets,
        });
      } else {
        entries.push({
          heading: latexToText(h.args[0]),
          dates: cleanDates(h.args[1]),
          bullets,
        });
      }
    } catch (e) {
      warnings.push(`Skipped malformed entry in section "${sectionName}": ${e}`);
    }
  }
  return entries;
}

export function parseResume(tex: string): ParsedResume {
  const warnings: string[] = [];
  const src = stripComments(tex);
  const result: ParsedResume = {
    education: [],
    experience: [],
    projects: [],
    skills: [],
    warnings,
  };

  for (const section of sectionSlices(src)) {
    const name = section.name.toLowerCase();
    if (name.includes("education")) {
      result.education = parseEntries(section.body, warnings, section.name);
    } else if (name.includes("experience")) {
      result.experience = parseEntries(section.body, warnings, section.name);
    } else if (name.includes("project")) {
      result.projects = parseEntries(section.body, warnings, section.name);
    } else if (name.includes("skill")) {
      // \textbf{Label}{: values}
      for (const m of findMacros(section.body, "textbf", 1)) {
        const after = readGroup(section.body, m.end);
        if (after) {
          result.skills.push({
            label: latexToText(m.args[0]),
            values: latexToText(after.content).replace(/^:\s*/, ""),
          });
        }
      }
    }
  }

  if (!result.experience.length) {
    warnings.push("No experience entries parsed — resume format may have changed.");
  }
  return result;
}
