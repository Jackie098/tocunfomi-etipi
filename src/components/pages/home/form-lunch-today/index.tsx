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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Team } from "@/models/Team";
import { useEffect, useState } from "react";
import { parseTeamDescriptionToPortuguese } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Seu nome deve ter pelo menos 2 caracteres.",
  }),
  team: z.coerce.number().min(1, {
    message: "Time não pode ser nulo",
  }),
});

export function FormFirstAccess() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTeams();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      team: -1,
    },
  });

  async function getTeams() {
    setIsLoading(true);
    fetch("/api/teams")
      .then((res) => res.json())
      .then((data) => {
        setTeams(parseTeamDescriptionToPortuguese(data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem aria-required>
              <FormLabel>Nome do usuário</FormLabel>
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
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id.toString()}>
                        {team.description.toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
