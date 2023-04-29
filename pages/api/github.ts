import type { NextApiRequest, NextApiResponse } from "next";
import octokit from "../../lib/octokit";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const repos = await octokit.paginate("GET /user/repos");
  const filtered = repos.filter((elt) => elt.topics?.includes("portfolio"));
  res.status(200).json({ data: filtered });
}
