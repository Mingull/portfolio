import { z } from "zod";

export type Infer<T> =
	T extends z.ZodType ? z.infer<T>
	: T extends Record<string, z.ZodType> ? { [K in keyof T]: z.infer<T[K]> }
	: T extends Record<string, Option | { type: z.ZodType }> ?
		{
			[K in keyof T]: T[K] extends Option<infer TSchema> ? z.infer<TSchema>
			: T[K] extends { type: infer TType extends z.ZodType } ? z.infer<TType>
			: never;
		}
	:	never;

export type InferOrEmpty<T> = [T] extends [undefined] ? Record<string, never> : Infer<NonNullable<T>>;

export type ArgsShape = Record<string, z.ZodType>;
export type OptionsShape = Record<string, Option | z.ZodType>;

export type Option<T extends z.ZodType = z.ZodType> = {
	flags: string | string[];
	type: T;
	description?: string;
	defaultValue?: z.infer<T>;
};

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

export type CliDefinition<TCommands extends readonly CliCommand<ArgsShape | undefined, OptionsShape | undefined>[]> = {
	/**
	 * The name of the CLI program, used to invoke it from the command line.
	 */
	name: string;
	/**
	 * An optional description of the CLI program, displayed in help messages.
	 */
	description?: string;
	/**
	 * An optional version string or an object containing version information for the CLI program.
	 *
	 * If a string is provided, it will be used as the version value.
	 *
	 * If an object is provided, it can include a version value, a flag to specify how the version is displayed in help messages, and an optional description for the version flag.
	 */
	version?:
		| {
				value: string;
				flags?: string | string[];
				description?: string;
		  }
		| string;
	/**
	 * An optional configuration for the help flag, which can be a string to specify the help flag or an object containing the flag and its description.
	 *
	 * If provided, this will enable a help option in the CLI that users can invoke to see usage information.
	 */
	help?: {
		flags?: string | string[];
		description?: string;
	};
	/**
	 * An optional array of aliases for the CLI program, allowing it to be invoked using alternative names from the command line.
	 */
	aliases?: string[];
	/**
	 * An array of command definitions that make up the CLI program, each containing its own name, description, arguments, options, and execution logic.
	 */
	commands: TCommands;
	/**
	 * An optional array of strings representing the command-line arguments to be parsed and executed by the CLI.
	 *
	 * If not provided, the CLI will default to using process.argv.
	 */
	argv?: string[];
};
