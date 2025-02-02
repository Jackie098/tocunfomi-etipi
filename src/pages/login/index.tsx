import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  console.log("🚀 ~ LoginPage ~ session, status:", session, status);

  // if (status === "authenticated") {
  //   return <p>Fulano tu tá onlini {session.user?.name}</p>;
  // }

  //<a href="/api/auth/signin">Clica aqui pa tu ve</a>;

  return (
    <div className="w-full h-full bg-primary flex justify-center items-center">
      <Button onClick={() => signIn("discord", { callbackUrl: "/home" })}>
        Login com Discord
      </Button>
    </div>
  );
}
