"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetchTeams } from "@/hooks/fetches/teams/use-fetch-teams";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SelectTeamItems } from "./select-team-items";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Seu nome deve ter pelo menos 2 caracteres.",
  }),
  team: z.coerce.number().min(1, {
    message: "Time não pode ser nulo",
  }),
});

type Props = {
  open: boolean;
};

export function DialogFormFirstAccess({ open }: Props) {
  const [isGenericLoading, setGenericIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(open);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      team: -1,
    },
  });

  const { teams, isFetchingTeams, teamsError } = useFetchTeams({});

  const isLoading = isFetchingTeams || isGenericLoading;

  useEffect(() => {
    if (teamsError) {
      toast.error(teamsError.message);
    }
  }, [teamsError]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setGenericIsLoading(true);

    fetch("/api/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setGenericIsLoading(false);
        setIsOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal={true}>
      <DialogContent>
        <DialogTitle>Qual é o teu time?</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem aria-required>
                  <FormLabel className="text-card-foreground">
                    Nome do usuário
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="team"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qual time você pertence?</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      defaultValue={field.value.toString()}
                      value={field.value.toString()}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecione o seu time" />
                      </SelectTrigger>
                      <SelectContent ref={field.ref}>
                        <SelectTeamItems data={teams?.data} />
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              Salvar Time
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
