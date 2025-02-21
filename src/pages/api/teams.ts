// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { prisma } from "./_config/db";
import { Team } from "@/models/Team";

type Response =
  | Team[]
  | {
      name: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ name: "You must be logged in." });
    return;
  }

  if (req.method === "GET") {
    const teams = await prisma.team.findMany();

    res.status(200).json(teams as Team[]);
  }

  return res.status(405);
}
