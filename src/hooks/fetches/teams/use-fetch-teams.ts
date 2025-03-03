import { ResponseModel } from "@/models/response-model";
import { getTeams } from "@/services/teams";
import { Team } from "@prisma/client";
import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

export type ConfigFetchQueryOptions = UndefinedInitialDataOptions<
  ResponseModel<Team[]>,
  Error,
  ResponseModel<Team[]>,
  string[]
>;

type Props = {
  callback?: (data: ResponseModel<Team[]>) => void;
  config?: ConfigFetchQueryOptions | Record<string, unknown>;
};

export function useFetchTeams({ callback, config }: Props) {
  const { data, isFetching, error } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => await getTeams(),
    select: (data) => {
      if (callback) callback(data);
      return data;
    },
    ...config,
  });

  return { teams: data, isFetchingTeams: isFetching, teamsError: error };
}
