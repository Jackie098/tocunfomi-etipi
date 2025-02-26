import { FormFirstAccess } from "@/components/pages/home/form-first-access";
import { Button } from "@/components/ui/button";
import { User } from "@/models/User";
import { GetServerSideProps } from "next";
import { getServerSession, Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { prisma } from "../api/_config/db";
import { authOptions } from "../api/auth/[...nextauth]";
import { LunchTimeWithUser } from "@/models/LunchTime";

type Props = {
  session: Session;
  user: User;
};

export default function Home({ session, user }: Props) {
  const [allLunchMarkedToday, setAllLunchMarkedToday] = useState<
    LunchTimeWithUser[]
  >([]);

  const hasUserTeam = Boolean(user?.team_id);
  );

  useEffect(() => {
    console.log("🚀 ~ Home ~ user:", user);
    fetch("/api/lunch-time/today")
      .then((res) => {
        console.log("🚀 ~ Home ~ res:", res);
        return res.json();
      })
      .then((data) => {
        console.log("🚀 ~ Home ~ data:", data);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setAllLunchMarkedToday(data || []);
      });
  }, []);

  // FIXME: Return to page error
  if (!session.user?.email || !user) {
    return;
  }

  console.log("🚀 ~ LoginPage ~ session, status:", session, session.user.email);

  if (!hasUserTeam) {
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

  if (!currentUserHasMarkedToday) {
    return <DialogLunchToday userId={user.id} />;
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

  if (!session || !session.user?.email) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  // FIXME: Return to page error
  if (!user) {
    return {
      notFound: true,
    };
  }

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
