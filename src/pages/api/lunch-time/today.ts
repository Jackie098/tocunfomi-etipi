import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { prisma } from "../_config/db";
import { authOptions } from "../auth/[...nextauth]";
import { endOfDay, startOfDay } from "date-fns";

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
    const today = new Date();
    const startDay = startOfDay(today);
    const endDay = endOfDay(today);

    const allMarkedLunches = await prisma.lunchTime.findMany({
      include: {
        user: {
          include: {
            team: {
              omit: {
                updated_at: true,
                created_at: true,
              },
            },
          },
          omit: {
            is_email_validated: true,
            discord_id: true,
          },
        },
      },
      where: {
        created_at: {
          gte: startOfDay(startDay),
          lte: endOfDay(endDay),
        },
      },
      omit: {
        user_id: true,
      },
    });

    res.status(200).json(allMarkedLunches);
    return;
  }

  if (req.method === "POST") {
    // TODO: Create mark lunch to today
  }

  return res.status(405);
}
