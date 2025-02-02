import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <>
      <div>Home</div>;
      <Button onClick={() => signOut({ callbackUrl: "/login" })}>
        Deslogar
      </Button>
    </>
  );
}
