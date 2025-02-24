import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { prisma } from "./_config/db";
import { authOptions } from "./auth/[...nextauth]";
import { Response } from "./teams";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ name: "You must be logged in." });
    return;
  }

  if (req.method === "PATCH") {
    if (!session?.user?.email) {
      res.status(500).json({ name: "User e-mail does not exists" });
      return;
    }

    await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        name: req.body.name,
        team: {
          connect: {
            id: req.body.team.toString(),
          },
        },
      },
    });

    res.status(200).json({ name: "Added team in user successfully" });
  }

  return res.status(405);
}
