import { isPromise } from "./utils";
import { Result } from "./types";

/**
 * Attempts to execute a function or resolve a promise, returning a Result object.
 * @param fn - A function that returns a value or a promise, or a promise itself.
 * @return A Result object containing either the resolved data or an error.
 */
export function attempt<T, E = unknown>(fn: () => Promise<T>): Promise<Result<T, E>>;
/**
 * Attempts to execute a function or resolve a promise, returning a Result object.
 * @param fn - A function that returns a value or a promise, or a promise itself.
 * @return A Result object containing either the resolved data or an error.
 */
export function attempt<T, E = unknown>(fn: () => T): Result<T, E>;
/**
 * Attempts to execute a function or resolve a promise, returning a Result object.
 * @param promise - A promise to resolve.
 * @return A Result object containing either the resolved data or an error.
 */
export function attempt<T, E = unknown>(promise: Promise<T>): Promise<Result<T, E>>;
/**
 * Attempts to execute a function or resolve a promise, returning a Result object.
 * @param input - A function that returns a value or a promise, or a promise itself.
 * @returns A Result object containing either the resolved data or an error.
 */
export function attempt<T, E = unknown>(input: Promise<T> | (() => T) | (() => Promise<T>)): Result<T, E> | Promise<Result<T, E>> {
	if (typeof input === "function") {
		try {
			const result = input();
			if (isPromise<T>(result)) {
				return attempt(result);
			}
			return { data: result } as Result<T, E>;
		} catch (error) {
			return { error: error as E };
		}
	} else {
		return input.then(
			(data): Result<T, E> => ({ data }),
			(error): Result<T, E> => ({ error: error as E }),
		);
	}
}
