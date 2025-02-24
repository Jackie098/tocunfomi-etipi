import { Button } from "@/components/ui/button";
import { GetServerSideProps } from "next";
import { getServerSession, Session } from "next-auth";
import { signOut } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]";
import { prisma } from "../api/_config/db";
import { User } from "@/models/User";
import { FormFirstAccess } from "@/components/pages/home/form-first-access";
import { useEffect } from "react";

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

  useEffect(() => {
    console.log("🚀 ~ Home ~ user:", user);
  }, []);

  if (!user!.team_id) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col w-[400px]">
          <FormFirstAccess />
        </div>
        <Button onClick={() => signOut({ callbackUrl: "/login" })}>
          Deslogar
        </Button>
      </div>
    );
  }

  // TODO: Verificação para mostrar Dialog se o usuário não tiver marcado o almoço hoje
  // if()

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
