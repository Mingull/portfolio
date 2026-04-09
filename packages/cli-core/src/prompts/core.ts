import * as clack from "@clack/prompts";

/**
 * Handles cancellation of a prompt by checking if the provided value is a cancellation symbol.
 * If it is, it displays a cancellation message and exits the process. Otherwise, it returns the value as is.
 * @param value The value to check for cancellation. If this value is a cancellation symbol, the function will handle it accordingly.
 * @returns The original value if it is not a cancellation symbol, or exits the process if it is a cancellation symbol.
 */
function handleCancel<T>(value: T): T {
	if (clack.isCancel(value)) {
		clack.cancel("Operation cancelled");
		process.exit(0);
	}

	return value;
}
/**
 * Displays a select prompt with the given options and returns the selected value, handling cancellation appropriately.
 * @param options The options for the select prompt, including choices and other configurations.
 * @returns The value selected by the user.
 */
export async function select<T>(options: Parameters<typeof clack.select<T>>[0]) {
	return handleCancel(await clack.select<T>(options)) as T;
}

/**
 * Displays a multiselect prompt with the given options and returns the selected values, handling cancellation appropriately.
 * @param options The options for the multiselect prompt, including choices and other configurations.
 * @returns The values selected by the user.
 */
export async function multiselect<T>(options: Parameters<typeof clack.multiselect<T>>[0]) {
	return handleCancel(await clack.multiselect<T>(options)) as T[];
}

/**
 * Displays a confirm prompt with the given options and returns the user's confirmation, handling cancellation appropriately.
 * @param options The options for the confirm prompt, including message and other configurations.
 * @returns A boolean indicating whether the user confirmed or not.
 */
export async function confirm(options: Parameters<typeof clack.confirm>[0]) {
	return handleCancel(await clack.confirm(options));
}

/**
 * Displays a text prompt with the given options and returns the user's input, handling cancellation appropriately.
 * @param options The options for the text prompt, including message and other configurations.
 * @returns The input provided by the user.
 */
export async function text(options: Parameters<typeof clack.text>[0]) {
	return handleCancel(await clack.text(options));
}
/**
 * Displays a spinner with the given message while executing the provided asynchronous function, and handles success or failure appropriately.
 * @param message The message to display alongside the spinner while the function is executing.
 * @param fn The asynchronous function to execute while the spinner is active. The spinner will start before the function is called and will stop after the function resolves or rejects.
 * @returns The result of the asynchronous function if it resolves successfully. If the function throws an error, the spinner will stop and the error will be re-thrown.
 */
export async function withSpinner<T>(message: string, fn: () => Promise<T>) {
	const s = clack.spinner();
	s.start(message);

	try {
		const result = await fn();
		s.stop("Done");
		return result;
	} catch (e) {
		s.stop("Failed");
		throw e;
	}
}
/**
 * Displays an introductory message or title for the CLI application, using Clack's intro function.
 */
export const intro = clack.intro;
/**
 * Displays a concluding message for the CLI application, using Clack's outro function.
 */
export const outro = clack.outro;
/**
 * Provides various logging functions (message, info, success, step, warn, warning, error) that utilize Clack's logging capabilities to display messages with different styles and symbols in the CLI application.
 */
export const log = clack.log;
