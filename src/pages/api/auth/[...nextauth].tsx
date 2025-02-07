import NextAuth, { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { prisma } from "../_config/db";
import { Prisma } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  events: {
    signIn: async ({ user }) => {
      console.log("🚀 ~ Events -> user:", user);

      const userAlreadyExists = await prisma.user.findUnique({
        where: {
          email: user.email!,
        },
      });

      if (userAlreadyExists) {
        return;
      }

      const newUser = await prisma.user.create({
        data: {
          email: user.email!,
          discord_id: user.id,
          discord_nickname: user.name!,
          avatar_url: user.image || "",
          team: { connect: Prisma.skip },
        },
      });

      console.log("🚀 ~ Events -> newUser:", newUser);
    },
  },
};

export default NextAuth(authOptions);
