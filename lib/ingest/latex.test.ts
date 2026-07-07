import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseResume, latexToText, readGroup, cleanDates } from "./latex";

const tex = readFileSync(join(__dirname, "__fixtures__", "resume-fixture.tex"), "utf8");

test("readGroup handles nested braces", () => {
  const g = readGroup("{a {b} c} rest", 0);
  assert.equal(g?.content, "a {b} c");
});

test("latexToText unwraps formatting and escapes", () => {
  assert.equal(latexToText("\\textbf{Course Highlights:} Algo"), "Course Highlights: Algo");
  assert.equal(latexToText("revenue exceeding \\$100k"), "revenue exceeding $100k");
  assert.equal(latexToText("7\\% by implementing"), "7% by implementing");
  assert.equal(
    latexToText("Distributed Key-Value Database{\\raisebox{-0.2\\height}\\ }"),
    "Distributed Key-Value Database"
  );
});

test("cleanDates normalizes ranges", () => {
  assert.equal(cleanDates("May 2023 - Aug. 2023"), "May 2023 – Aug 2023");
  assert.equal(cleanDates("June 2024 - Present"), "June 2024 – Present");
});

test("parses the real resume", () => {
  const r = parseResume(tex);
  assert.equal(r.warnings.length, 0);

  assert.equal(r.experience.length, 4);
  assert.deepEqual(
    r.experience.map((e) => e.heading),
    ["Meta", "Deepgram", "Riot Games", "CaringWire"]
  );
  const meta = r.experience[0];
  assert.equal(meta.subheading, "Software Engineer");
  assert.equal(meta.dates, "June 2024 – Present");
  assert.equal(meta.location, "Menlo Park, CA");
  assert.equal(meta.bullets.length, 2);
  assert.match(meta.bullets[0], /Applied AI Agent Data Optimization/);

  const deepgram = r.experience[1];
  assert.equal(deepgram.dates, "May 2023 – Aug 2023");
  assert.equal(deepgram.subheading, "Software Engineering Intern");
  assert.equal(deepgram.bullets.length, 3);

  assert.equal(r.projects.length, 2);
  assert.deepEqual(
    r.projects.map((p) => p.heading),
    ["Distributed Key-Value Database", "C++ Thread Library"]
  );
  assert.equal(r.projects[0].dates, "Oct 2023");

  assert.equal(r.education.length, 1);
  assert.equal(r.education[0].heading, "University of Michigan");
  assert.match(r.education[0].dates, /Graduated May 2024/);

  assert.equal(r.skills.length, 2);
  assert.equal(r.skills[0].label, "Languages");
  assert.match(r.skills[0].values, /^Python, C\+\+, Rust/);
});
