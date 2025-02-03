import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  console.log("🚀 ~ LoginPage ~ session, status:", session, status);

  return (
    <>
      <div>Home</div>;
      <Button onClick={() => signOut({ callbackUrl: "/login" })}>
        Deslogar
      </Button>
    </>
  );
}
