import * as clack from "@clack/prompts";

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
export async function select<T>(options: Parameters<typeof clack.select>[0]) {
	const result = await clack.select(options);
	return handleCancel(result) as T;
}

/**
 * Displays a multiselect prompt with the given options and returns the selected values, handling cancellation appropriately.
 * @param options The options for the multiselect prompt, including choices and other configurations.
 * @returns The values selected by the user.
 */
export async function multiselect<T>(options: Parameters<typeof clack.multiselect>[0]) {
	const result = await clack.multiselect(options);
	return handleCancel(result) as T[];
}

/**
 * Displays a confirm prompt with the given options and returns the user's confirmation, handling cancellation appropriately.
 * @param options The options for the confirm prompt, including message and other configurations.
 * @returns A boolean indicating whether the user confirmed or not.
 */
export async function confirm(options: Parameters<typeof clack.confirm>[0]) {
	const result = await clack.confirm(options);
	return handleCancel(result);
}

/**
 * Displays a text prompt with the given options and returns the user's input, handling cancellation appropriately.
 * @param options The options for the text prompt, including message and other configurations.
 * @returns The input provided by the user.
 */
export async function text(options: Parameters<typeof clack.text>[0]) {
	const result = await clack.text(options);
	return handleCancel(result);
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
