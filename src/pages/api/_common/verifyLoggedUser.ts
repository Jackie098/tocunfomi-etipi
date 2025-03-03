import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { createResponseError } from "../_mapper/create-response";

export async function verifyLoggedUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json(
      createResponseError({
        statusCode: 401,
        message: "Usuário deve estar logado para acessar o conteúdo.",
      })
    );
  }
}
