import { Button } from "@/components/ui/button";
import { GetServerSideProps } from "next";
import { getServerSession, Session } from "next-auth";
import { signOut } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]";
import { prisma } from "../api/_config/db";
import { User } from "@/models/User";

type Props = {
  session: Session;
  user: User;
};

export default function Home({ session, user }: Props) {
  console.log(
    "🚀 ~ LoginPage ~ session, status:",
    session,
    session.user?.email
  );

  if (!user!.team_id) {
    return <div>Você não tem uma equipe</div>;
  }

  return (
    <>
      <div>Home</div>;
      <Button onClick={() => signOut({ callbackUrl: "/login" })}>
        Deslogar
      </Button>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log(
    "🚀 ~ constgetServerSideProps:GetServerSideProps= ~ session:",
    session
  );

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user!.email!,
    },
  });

  return {
    props: {
      session,
      user: {
        ...user,
        created_at: JSON.stringify(user?.created_at),
        updated_at: JSON.stringify(user?.updated_at),
      },
    },
  };
};
