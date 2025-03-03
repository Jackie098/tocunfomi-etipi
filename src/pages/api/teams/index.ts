// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ResponseModel } from "@/models/response-model";
import { Team } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../_config/db";
import { verifyLoggedUser } from "../_common/verifyLoggedUser";
import {
  createResponseError,
  createResponseSuccess,
} from "../_mapper/create-response";

// export type Response =
//   | Team[]
//   | {
//       name: string;
//     };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseModel>
) {
  verifyLoggedUser(req, res);
  // const session = await getServerSession(req, res, authOptions);

  // if (!session) {
  //   return res.status(401).json(
  //     createResponseError({
  //       statusCode: 401,
  //       message: "Usuário deve estar logado para acessar o conteúdo.",
  //     })
  //   );
  // }

  if (req.method === "GET") {
    const teams = await prisma.team.findMany();

    res.status(200).json(
      createResponseSuccess<Team[]>({
        statusCode: 200,
        data: teams,
        totalElements: teams.length,
      })
    );
    return;
  }

  return void res
    .status(405)
    .send(
      createResponseError({ statusCode: 405, message: "Método não permitido." })
    );
}
