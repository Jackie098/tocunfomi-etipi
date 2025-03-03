import { DialogFormFirstAccess } from "@/components/pages/home/dialog-form-first-access";
import { Button } from "@/components/ui/button";
import { User } from "@/models/user";
import { GetServerSideProps } from "next";
import { getServerSession, Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { prisma } from "../api/_config/db";
import { authOptions } from "../api/auth/[...nextauth]";
import { LunchTimeWithUser } from "@/models/lunch-time";
import { DialogLunchToday } from "@/components/pages/home/dialog-lunch-today";

type Props = {
  session: Session;
  user: User;
};

export default function Home({ session, user }: Props) {
  const [allLunchMarkedToday, setAllLunchMarkedToday] = useState<
    LunchTimeWithUser[]
  >([]);

  const hasUserTeam = Boolean(user?.team_id);
  const currentUserHasMarkedToday = allLunchMarkedToday.some(
    (lunch) => lunch.user.email === session.user?.email
  );

  // CHECKPOINT: Display skeleton if user doesnt have a team yet, otherwise, show marked lunch for today below of the modal asking if usar will be lunching today
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
        setAllLunchMarkedToday(data.data || []);
      });
  }, []);

  // FIXME: Redirect to page error
  if (!session.user?.email || !user) {
    return;
  }

  console.log("🚀 ~ LoginPage ~ session, status:", session, session.user.email);

  return (
    <>
      <div>Home</div>;
      <Button onClick={() => signOut({ callbackUrl: "/login" })}>
        Deslogar
      </Button>
      <DialogFormFirstAccess open={!hasUserTeam} />
      <DialogLunchToday
        userId={user.id}
        open={!currentUserHasMarkedToday && hasUserTeam}
      />
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
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
    },
  };
};
