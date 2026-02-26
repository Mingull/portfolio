import { httpCodePhrases, httpCodes } from "./http-codes";
import { ErrorCodeKey, KnownErrorType, Namespaced, PhraseOf, StatusOf, SuccessCodeKey } from "./types";

export const statusOf = <S extends SuccessCodeKey | ErrorCodeKey>(statusCode: S): StatusOf<S> => {
	if (statusCode in httpCodes.success) {
		return httpCodes.success[statusCode as SuccessCodeKey] as StatusOf<S>;
	} else if (statusCode in httpCodes.error) {
		return httpCodes.error[statusCode as ErrorCodeKey] as StatusOf<S>;
	}
	throw new Error(`Invalid status code key: ${statusCode}`);
};
export const phraseOf = <S extends SuccessCodeKey | ErrorCodeKey>(statusCode: S): PhraseOf<S> => {
	if (statusCode in httpCodePhrases.success) {
		return httpCodePhrases.success[statusCode as SuccessCodeKey] as PhraseOf<S>;
	} else if (statusCode in httpCodePhrases.error) {
		return httpCodePhrases.error[statusCode as ErrorCodeKey] as PhraseOf<S>;
	}
	throw new Error(`Invalid status code key: ${statusCode}`);
};

/**
 * A generic prefix for all RFC 7807-inspired error types used in the API.
 *
 * This helps to ensure that all error types are namespaced and easily identifiable.
 *
 * The actual error type should be appended to this prefix, e.g., "urn:mingull:validation-error".
 */
export const PREFIX = "urn:mingull:" as const;

/**
 * A utility function to ensure that error types are properly namespaced with the defined PREFIX.
 *
 * It checks if the provided error type is already prefixed, and if not, it adds the PREFIX to it.
 * It also validates that the error type is not an empty string, as that would be invalid.
 * @param type - The error type to be namespaced, which must be one of the KnownErrorType values.
 * @returns A namespaced error type that conforms to the API's error type structure.
 */
export const errorType = <E extends KnownErrorType>(type: E): Namespaced<E> => {
	if (type === "") {
		throw new Error("Error type cannot be an empty string");
	}
	if (!type.startsWith(PREFIX)) {
		return `${PREFIX}${type}` as Namespaced<E>;
	}
	if (type === PREFIX) throw new Error("Error type cannot be prefix only");
	return type as Namespaced<E>;
};
