// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: string;
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const resp = await axios.post("https://blinken.org/api/0/publish", {
    author: "ajganesh",
    code: "() => {\n  // My self-contained program goes here.    \n  let x = 0;\n  let d = 5;\n  let n = 10;\n\n  // Update lights one frame\n  return (lights) => {\n    {;window.runnerWindow.protect.protect({ line: 14, reset: true }); for (let i = 0; i < lights.length; i++) {;\nif (window.runnerWindow.protect.protect({ line: 14 })) break;\n\n      if (i > x - n && i < x + n) {\n        lights[i].rgb(0, 0, 1);\n      } else if (i % 10 === 0) {\n        lights[i].rgb(1,1,1)\n      } else {\n        lights[i].rgb(0, 0, 0);\n      }\n    }}\n    x += d;\n    if (x == lights.length+n || x == -n) {\n      d *= -1;\n    }\n    return 50; // ms until called again\n  };\n}",
    title: "Someone visited my site!",
    url: "https://null.jsbin.com/runner",
  });
  res.status(200).json({ status: resp.data });
}
