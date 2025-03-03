import { TeamType } from "@/models/team";
import { Team } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseTeamDescriptionToPortuguese(teams: Team[]) {
  return teams.map((team) => {
    const upperCased = team.description.toUpperCase() as keyof typeof TeamType;
    const teamTraduction = TeamType[upperCased];

    return {
      ...team,
      description: teamTraduction,
    };
  });
}
