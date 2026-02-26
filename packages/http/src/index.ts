import { failureResponse, successResponse } from "./core/response";
import { phraseOf, statusOf } from "./core/utils";
import { type ApiResult } from "./core/types";

export const ok = successResponse("Ok");
export const created = successResponse("Created");
export const badRequest = failureResponse("BadRequest");
export const unauthorized = failureResponse("Unauthorized");
export const forbidden = failureResponse("Forbidden");
export const notFound = failureResponse("NotFound");
export const conflict = failureResponse("Conflict");
export const gone = failureResponse("Gone");
export const internalServerError = failureResponse("InternalServerError");
export const notImplemented = failureResponse("NotImplemented");
export { phraseOf, statusOf };
export type { ApiResult };
