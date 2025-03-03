export type ResponseModel<T = unknown | null> = {
  status: "OK" | "ERROR" | string;
  statusCode: number;
  message: string;
  messages: string[] | null;

  data: T | null;

  totalElements: number;
  totalPages: number;

  stackTrace: string[] | null;
};
