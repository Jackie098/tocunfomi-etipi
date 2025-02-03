import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session, status } = useSession();

  // if (status === "authenticated") {
  //   return <p>Fulano tu tá onlini {session.user?.name}</p>;
  // }

  //<a href="/api/auth/signin">Clica aqui pa tu ve</a>;

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 max-w-[800px]">
        <h1 className="text-5xl">Tu tá com fome? Entre bem aí.</h1>
        <Button
          className={"max-w-72 self-center bg-primary text-primary-foreground"}
          onClick={() =>
            signIn("discord", { redirect: true, callbackUrl: "/home" })
          }
        >
          Login com Discord
        </Button>
      </div>
    </div>
  );
}
