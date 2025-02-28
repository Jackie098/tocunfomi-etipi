export type ResponseModel<T = unknown> = {
  status: "OK" | "ERROR" | string;
  statusCode: number;
  message: string;
  messages: string[] | null;

  data: T | T[] | null;

  totalElements: number;
  totalPages: number;

  stackTrace: string[];
};
