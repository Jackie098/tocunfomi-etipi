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
    return void res.status(401).json({ name: "You must be logged in." });
  }

  if (req.method === "GET") {
    const today = new Date();
    const startDay = startOfDay(today);
    const endDay = endOfDay(today);

    const allMarkedLunches = await prisma.user.findMany({
      include: {
        lunch_time: {
          where: {
            created_at: {
              gte: startOfDay(startDay),
              lte: endOfDay(endDay),
            },
          },
          omit: {
            user_id: true,
          },
        },
      },
      omit: {
        discord_id: true,
        is_email_validated: true,
        updated_at: true,
      },
    });

    console.log("🚀 ~ allMarkedLunches:", allMarkedLunches);

    return void res.status(200).json({ data: "ok" });
  }

  if (req.method === "POST") {
    // TODO: Create mark lunch to today
  }

  return void res.status(405).end();
}
