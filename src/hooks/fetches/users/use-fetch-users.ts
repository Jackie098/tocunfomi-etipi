import { ResponseModel } from "@/models/response-model";
import { User } from "@prisma/client";
import { UndefinedInitialDataOptions } from "@tanstack/react-query";

export type ConfigFetchQueryOptions = UndefinedInitialDataOptions<
  ResponseModel<User>
>;

// type Props = {
//   callback,
//   config
// }

export function useFetchUsers() {
  return {};
}
