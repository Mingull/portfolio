import type { TypeError } from "../lib/utils";
import type { AutoComplete, Prettify } from "@mingull/lib/types";
import { httpCodePhrases, httpCodes } from "./http-codes";
import { PREFIX } from "./utils";

export type JsonApi = string | number | boolean | Date | null | JsonApi[] | { [key: string]: JsonApi };

export type SuccessCodeKey = keyof typeof httpCodes.success;
export type SuccessStatus = (typeof httpCodes.success)[SuccessCodeKey];
export type SuccessPhrase = (typeof httpCodePhrases.success)[SuccessCodeKey];

export type ErrorCodeKey = keyof typeof httpCodes.error;
export type ErrorStatus = (typeof httpCodes.error)[ErrorCodeKey];
export type ErrorPhrase = (typeof httpCodePhrases.error)[ErrorCodeKey];

export type HttpCodeKey = keyof typeof httpCodes;

export type StatusOf<S extends SuccessCodeKey | ErrorCodeKey> =
	S extends SuccessCodeKey ? (typeof httpCodes.success)[S]
	: S extends ErrorCodeKey ? (typeof httpCodes.error)[S]
	: never;
export type PhraseOf<S extends SuccessCodeKey | ErrorCodeKey> =
	S extends SuccessCodeKey ? (typeof httpCodePhrases.success)[S]
	: S extends ErrorCodeKey ? (typeof httpCodePhrases.error)[S]
	: never;

export type ApiSuccess<T extends JsonApi = JsonApi> = {
	message: string;
	data?: T;
};

/**
 * A union type of all known error types in the API, each prefixed with the standard Prefix.
 *
 * This type is used to ensure that all error responses conform to a consistent structure and can be easily categorized.
 *
 * It includes common error types like `"validation"`, `"not-found"`, `"unauthorized"`, `"forbidden"`, `"conflict"`, `"not-implemented"`, and `"internal-server-error"`.
 */
export type KnownErrorType = AutoComplete<"validation" | "not-found" | "unauthorized" | "forbidden" | "conflict" | "not-implemented" | "internal-server-error">;

/**
 * RFC 7807-inspired error object
 * Used to define the error payload in ApiResponse for error status codes
 * @see {ApiResponse} // make sure to link to the correct line
 */
export type ApiError<T extends JsonApi, E extends KnownErrorType> = {
	message: string;
	type: E; // must be one of the known types
	title: string; // human-readable title
	fields?: T;
};

/**
 * A generic API response type that can represent both success and error responses.
 */
export type ApiResponse<S extends SuccessCodeKey | ErrorCodeKey, J extends JsonApi = JsonApi, E extends KnownErrorType = KnownErrorType> = Readonly<
	Prettify<
		{
			message: string;
			status: StatusOf<S>;
			statusCode: PhraseOf<S>;
		} & (S extends SuccessCodeKey ? { data?: J; type?: never; title?: never; fields?: never }
		: S extends ErrorCodeKey ? { data?: never; type: Namespaced<E>; title: string; fields?: J }
		: never)
	>
>;
export type Namespaced<E extends string> =
	E extends "" ? TypeError<"Cannot be an empty string">
	: E extends `${typeof PREFIX}${string}` ? E
	: `${typeof PREFIX}${E}`;

/**
 * A loose type representing the result of an API call, which can be either a success or an error response.
 * This type is intentionally flexible to allow for various shapes of API responses while still providing some structure.
 * It includes a message, status code, and optionally data for success responses or error details for error responses.
 */
export type ApiResult<J extends JsonApi = JsonApi> = {
	message: string;
	status: (typeof httpCodes.success)[SuccessCodeKey] | (typeof httpCodes.error)[ErrorCodeKey];
	statusCode: (typeof httpCodePhrases.success)[SuccessCodeKey] | (typeof httpCodePhrases.error)[ErrorCodeKey];
	data?: J;
	type: Namespaced<KnownErrorType>;
	title: string;
	fields?: J;
};
