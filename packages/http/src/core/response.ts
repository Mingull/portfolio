import { ApiError, ApiSuccess, KnownErrorType, type ApiResponse, type ErrorCodeKey, type JsonApi, type SuccessCodeKey } from "./types";
import { errorType, phraseOf, statusOf } from "./utils";

/**
 * Creates a success response factory.
 */
export const successResponse =
	<S extends SuccessCodeKey>(statusCode: S) =>
	/**
	 * Builds a success ApiResponse with a message and optional data.
	 */
	<T extends JsonApi>(payload: ApiSuccess<T>): ApiResponse<S, T> =>
		({
			message: payload.message,
			status: statusOf(statusCode),
			statusCode: phraseOf(statusCode),
			...(payload.data === undefined ? {} : { data: payload.data }),
		}) as ApiResponse<S, T>;

/**
 * Creates a failure response factory.
 */
export const failureResponse =
	<S extends ErrorCodeKey>(statusCode: S) =>
	/**
	 * Builds a failure ApiResponse with a message and optional errors.
	 */
	<T extends JsonApi, const E extends KnownErrorType = KnownErrorType>(payload: ApiError<T, E>): ApiResponse<S, T, E> =>
		({
			status: statusOf(statusCode),
			statusCode: phraseOf(statusCode),
			message: payload.message,
			type: errorType(payload.type),
			title: payload.title,
			...(payload.fields === undefined ? {} : { fields: payload.fields }),
		}) as ApiResponse<S, T, E>;
