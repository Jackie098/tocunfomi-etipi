"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

type Props = {
  userId: string;
};

export function DialogLunchToday({ userId }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);

  function sendUserResponse(data: { userId: string; goLunch: boolean }) {
    console.log(data);

    if (data.goLunch) {
      fetch(`/api/user/${data.userId}/lunch-time/today/confirm`, {
        method: "PATCH",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetch(`/api/user/${data.userId}/lunch-time/today/refuse`, {
        method: "PATCH",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tu vai cumê hoje?</DialogTitle>
          <DialogDescription>
            To perguntando se tu vai bater a boia lá com a tia do Lucas. (Ou
            noutro restaurante no centro administrativo)
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center gap-5">
          <Button onClick={() => sendUserResponse({ userId, goLunch: true })}>
            Sim sinhô!
          </Button>
          <Button onClick={() => sendUserResponse({ userId, goLunch: false })}>
            Hj naum.
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
