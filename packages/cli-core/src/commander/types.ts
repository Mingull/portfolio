import { z } from "zod";

export type Infer<T> =
	T extends z.ZodType ? z.infer<T>
	: T extends Record<string, z.ZodType> ? { [K in keyof T]: z.infer<T[K]> }
	: never;

type EmptyObject = Record<string, never>;

export type InferOrEmpty<T> = [T] extends [undefined] ? EmptyObject : Infer<T>;

export type ArgsShape = Record<string, z.ZodType>;
export type OptionsShape = Record<string, z.ZodType>;

export type CliContext<TArgs extends ArgsShape | undefined, TOptions extends OptionsShape | undefined> = {
	args: InferOrEmpty<TArgs>;
	options: InferOrEmpty<TOptions>;
};

/**
 * Represents a CLI command with its configuration and execution logic.
 */
export type CliCommand<TArgs extends ArgsShape | undefined = ArgsShape | undefined, TOptions extends OptionsShape | undefined = OptionsShape | undefined> = {
	/**
	 * The name of the command, used to invoke it from the CLI.
	 */
	name: string;
	/**
	 * An optional description of the command, displayed in help messages.
	 */
	description?: string;
	/**
	 * An optional array of argument definitions for the command.
	 */
	args?: TArgs;
	/**
	 * An optional array of option definitions for the command.
	 */
	options?: TOptions;
	/**
	 * An optional callback function that is invoked when validation of arguments or options fails, allowing for custom error handling logic.
	 * @param error The ZodError object containing details about the validation failure, including which arguments or options were invalid and why.
	 * @returns void. This function can be used to log errors, display custom messages to the user, or perform any other necessary error handling when validation fails.
	 */
	onValidationError?: (error: z.ZodError) => void;
	/**
	 * The function that contains the logic to execute when the command is invoked. It receives a context object containing the parsed and validated arguments and options.
	 * @param args The parsed and validated positional arguments for the command, based on the command's argument definitions.
	 * @param options The parsed and validated options for the command, based on the command's option definitions.
	 * @returns A Promise that resolves when the command's execution is complete, or void if the command is synchronous.
	 * @throws An error if any issues occur during command execution, which will be caught and handled by the CLI framework to provide feedback to the user.
	 */
	run(ctx: CliContext<TArgs, TOptions>): Promise<void> | void;
};

export type AnyCliCommand = CliCommand<ArgsShape | undefined, OptionsShape | undefined>;

export type CliDefinition<TCommands extends readonly AnyCliCommand[]> = {
	name: string;
	description?: string;
	version?: string;
	aliases?: string[];
	commands: TCommands;
	argv?: string[];
};
