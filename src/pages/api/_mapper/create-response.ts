import { ResponseModel } from "@/models/response-model";

export function createResponse<T>({
  status,
  statusCode,
  message,
  messages,
  data,
  totalElements,
  totalPages,
  stackTrace,
}: ResponseModel<T>): ResponseModel<T> {
  return {
    status,
    statusCode,
    message,
    messages,
    data,
    totalElements,
    totalPages,
    stackTrace,
  };
}

type CreateResponseErrorProps = {
  statusCode: number;
  message: string;
  messages?: string[];
  stackTrace?: string[];
};

export function createResponseError({
  statusCode,
  message,
  messages = [],
  stackTrace = [],
}: CreateResponseErrorProps) {
  return createResponse({
    status: "ERROR",
    statusCode,
    message,
    messages,
    data: null,
    totalElements: 0,
    totalPages: 0,
    stackTrace,
  });
}

export function createResponseSuccess<T>({
  statusCode,
  message,
  data,
  totalElements,
}: {
  statusCode: number;
  data: T;
  totalElements: number;
  message?: string;
}) {
  const totalPages = Math.ceil(totalElements / 5);

  return createResponse({
    status: "OK",
    statusCode,
    message: message ?? "",
    messages: null,
    data,
    totalElements,
    totalPages,
    stackTrace: null,
  });
}
