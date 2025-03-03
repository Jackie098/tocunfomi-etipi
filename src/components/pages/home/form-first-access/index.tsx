"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { useEffect } from "react";
import { toast } from "sonner";
import { SelectTeamItems } from "./select-team-items";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Seu nome deve ter pelo menos 2 caracteres.",
  }),
  team: z.coerce.number().min(1, {
    message: "Time não pode ser nulo",
  }),
});

export function FormFirstAccess() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      team: -1,
    },
  });

  const { teams, isFetchingTeams, teamsError } = useFetchTeams({});

  const isLoading = isFetchingTeams;

  useEffect(() => {
    if (teamsError) {
      toast.error(teamsError.message);
    }
  }, [teamsError]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

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
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Card>
      <CardContent>
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
                        {/* {teams &&
                      teams.data!.map((team) => (
                        <SelectItem key={team.id} value={team.id.toString()}>
                          {team.description.toLowerCase()}
                        </SelectItem>
                      ))} */}
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
      </CardContent>
    </Card>
  );
}
