import { getServerSession } from "next-auth";
import { prisma } from "./api/_config/db";
import { GetServerSideProps } from "next";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Home() {
  return <div>Você está sendo redirecionado...</div>;
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

  console.log("🚀 ~ constgetServerSideProps:GetServerSideProps= ~ user:", user);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/home",
      permanent: false,
    },
  };
};
