import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ name: "You must be logged in." });
    return;
  }

  if (req.method === "GET") {
    //  TODO : Get all lunch time
  }

  if (req.method === "POST") {
    // TODO: Create mark lunch to today
  }

  return res.status(405);
}
