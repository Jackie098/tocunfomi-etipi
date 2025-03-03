import { GenericResponseBody } from "@/models/generic-response-body";
import { endOfDay, startOfDay } from "date-fns";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { prisma } from "../_config/db";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenericResponseBody>
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ data: "You must be logged in." });
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
            team: true,
          },
        },
      },
      where: {
        createdAt: {
          gte: startOfDay(startDay),
          lte: endOfDay(endDay),
        },
      },
    });

    return res.status(200).json({ data: allMarkedLunches });
  }

  if (req.method === "POST") {
    // TODO: Create mark lunch to today
  }

  return res.status(405);
}
