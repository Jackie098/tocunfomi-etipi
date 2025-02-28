import { ResponseModel } from "@/models/response-model";
import { Team } from "@prisma/client";
import axios from "axios";

export async function getTeams(): Promise<ResponseModel<Team[]>> {
  const {} = await axios.get<ResponseModel<Team[]>>(`/api/teams`);
}
