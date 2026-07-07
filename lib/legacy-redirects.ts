/**
 * Old /projects/[pid] URLs were keyed by the MongoDB `name` field
 * (e.g. "/projects/Word Hunt Solver"). Map them to the new slugs so
 * inbound links keep working.
 */
export const legacyProjectRedirects: Record<string, string> = {
  "Word Hunt Solver": "word-hunt-solver",
  "TaskTango": "tasktango",
  "ER Bot": "er-bot",
  "Portfolio v1": "portfolio-v1",
  "CaringWire - Software Engineering Intern": "caringwire",
  "Riot Games - UMich MDP Team Student Security Engineer": "riot-games",
  "Deepgram - Software Engineering Intern": "deepgram",
  "C++ Thread Library": "c-thread-library",
  "Assembler, Linker, and Simulator": "assembler-linker-and-simulator",
  "Forum Post Classifier": "forum-post-classifier",
  "Content Aware Image Resizer": "content-aware-image-resizer",
  "Insta485": "insta485",
  "Virtual Memory Manager": "virtual-memory-manager",
  "Network File System": "network-file-system",
};
