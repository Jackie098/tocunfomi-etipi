import { Team } from "@prisma/client";
import { SelectItem } from "@/components/ui/select";
import { parseTeamDescriptionToPortuguese } from "@/lib/utils";
import { useMemo } from "react";

export function SelectTeamItems({ data }: { data: Team[] | undefined | null }) {
  const teams = useMemo(() => {
    return parseTeamDescriptionToPortuguese(data || []);
  }, [data]);

  if (!teams || teams.length === 0) {
    return <SelectItem value="-1">Nenhum time encontrado</SelectItem>;
  } else {
    return teams.map((team) => (
      <SelectItem key={team.id} value={team.id.toString()}>
        {team.description.toLowerCase()}
      </SelectItem>
    ));
  }
}
