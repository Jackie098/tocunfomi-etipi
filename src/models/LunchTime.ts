import {
  LunchTime as PrismaLunchTime,
  User as PrismaUser,
  Team,
} from "@prisma/client";

export type LunchTimeWithUser = PrismaLunchTime & {
  user: PrismaUser & {
    team?: Team;
  };
};
