"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

type Props = {
  userId: string;
  open: boolean;
};

export function DialogLunchToday({ userId, open }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(open);

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

  function handleClick(data: { userId: string; goLunch: boolean }) {
    setIsLoading(true);

    sendUserResponse({ userId, goLunch: data.goLunch });

    setIsOpen(false);
    setIsLoading(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tu vai cumê hoje?</DialogTitle>
          <DialogDescription>
            To perguntando se tu vai bater a boia lá no trailer da tia do Lucas.
            (Ou por ai...)
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center gap-5">
          <Button onClick={() => handleClick({ userId, goLunch: true })}>
            Sim sinhô!
          </Button>
          <Button onClick={() => handleClick({ userId, goLunch: false })}>
            Hj naum.
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
