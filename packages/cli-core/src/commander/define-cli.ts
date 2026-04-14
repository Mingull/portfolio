import { Command } from "commander";
import { ZodError, type z } from "zod";
import type { AnyCliCommand, CliCommand, CliDefinition } from "./types";

/**
 * Converts a camelCase option key to a kebab-case flag.
 * @param key The camelCase option key (e.g., "myOption").
 * @returns The corresponding kebab-case flag (e.g., "my-option").
 */
const optionKeyToFlag = (key: string) => key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

/**
 * Checks if a Zod schema is optional by testing if it can successfully parse `undefined`.
 * @param schema The Zod schema to check.
 * @returns `true` if the schema is optional, otherwise `false`.
 */
const isOptionalSchema = (schema: z.ZodTypeAny) => schema.safeParse(undefined).success;

const handleValidationError = (command: CliCommand, error: z.ZodError) => {
	if (command.onValidationError) {
		command.onValidationError(error);
	} else {
		console.error(error.message);
	}

	process.exitCode = 1;
};

/** Parses positional arguments based on the command's argument definitions and validates them using Zod schemas.
 * @param command The CLI command containing argument definitions.
 * @param values The array of raw positional argument values to parse.
 * @returns An object mapping argument names to their parsed and validated values.
 * @throws An error if any argument fails validation, with a message indicating which argument is invalid and why.
 */
const parsePositionalArgs = (command: CliCommand, values: unknown[]) => {
	if (!command.args) {
		return { ok: true as const, value: {} };
	}

	const argsKeys = Object.keys(command.args);
	const argsAsRecord = argsKeys.reduce<Record<string, unknown>>((acc, key, index) => {
		acc[key] = values[index];
		return acc;
	}, {});

	for (const key of argsKeys) {
		const schema = command.args[key] as z.ZodTypeAny;
		const result = schema.safeParse(argsAsRecord[key]);

		if (!result.success) {
			return { ok: false as const, error: result.error };
		}

		argsAsRecord[key] = result.data;
	}

	return { ok: true as const, value: argsAsRecord };
};

/**
 * Parses command options based on the command's option definitions and validates them using Zod schemas.
 * @param command The CLI command containing option definitions.
 * @param options The object of raw option values to parse, typically obtained from Commander.
 * @returns An object mapping option names to their parsed and validated values.
 * @throws An error if any option fails validation, with a message indicating which option is invalid and why.
 */
const parseOptions = (command: CliCommand, options: Record<string, unknown>) => {
	if (!command.options) {
		return { ok: true as const, value: {} };
	}

	const optionEntries = Object.entries(command.options) as [string, z.ZodTypeAny][];
	const parsedOptions: Record<string, unknown> = {};

	for (const [key, schema] of optionEntries) {
		const result = schema.safeParse(options[key]);

		if (!result.success) {
			return { ok: false as const, error: result.error };
		}

		parsedOptions[key] = result.data;
	}

	return { ok: true as const, value: parsedOptions };
};

/**
 * Builds a Commander program based on the provided CLI definition, including commands, arguments, and options.
 * @param definition The CLI definition containing the program name, description, version, aliases, and commands.
 * @returns A configured Commander program ready to be parsed and executed.
 * @throws An error if any command's arguments or options fail validation during execution, with messages indicating the specific issues.
 */
const buildProgram = <TCommands extends readonly AnyCliCommand[]>(definition: CliDefinition<TCommands>) => {
	const program = new Command(definition.name);

	if (definition.description) {
		program.description(definition.description);
	}

	for (const alias of definition.aliases ?? []) {
		program.alias(alias);
	}

	if (definition.version) {
		if (typeof definition.version === "string") {
			program.version(definition.version);
		} else {
			program.version(definition.version.value, definition.version.flag, definition.version.description);
		}
	}

	if (definition.help) {
		program.helpOption(definition.help.flag, definition.help.description);
	}

	program.showHelpAfterError();

	for (const command of definition.commands) {
		const cmd = program.command(command.name);

		if (command.description) {
			cmd.description(command.description);
		}

		for (const [key, schema] of Object.entries(command.args ?? {}) as [string, z.ZodTypeAny][]) {
			const argToken = isOptionalSchema(schema) ? `[${key}]` : `<${key}>`;
			cmd.argument(argToken);
		}

		for (const [key, schema] of Object.entries(command.options ?? {}) as [string, z.ZodTypeAny][]) {
			const flagName = optionKeyToFlag(key);
			const isBoolean = schema.safeParse(true).success && schema.safeParse(false).success;

			if (isBoolean) {
				cmd.option(`--${flagName}`);
				continue;
			}

			cmd.option(`--${flagName} <${key}>`);
		}

		cmd.action(async (...values) => {
			try {
				const commanderCommand = values.pop() as Command;
				const rawOptions = commanderCommand.opts<Record<string, unknown>>();
				const argsResult = parsePositionalArgs(command, values);
				if (!argsResult.ok) {
					handleValidationError(command, argsResult.error);
					return;
				}

				const optionsResult = parseOptions(command, rawOptions);
				if (!optionsResult.ok) {
					handleValidationError(command, optionsResult.error);
					return;
				}

				await command.run({
					args: argsResult.value,
					options: optionsResult.value,
				});
			} catch (error) {
				if (error instanceof ZodError) {
					handleValidationError(command, error);
					return;
				}

				throw error;
			}
		});
	}

	return program;
};

/**
 * Defines a CLI program based on the provided CLI definition, including commands, arguments, and options, and returns an object containing the Commander program and a run function to execute it.
 * @param definition The CLI definition containing the program name, description, version, aliases, and commands.
 * @returns An object containing the Commander program and a run function.
 */
export function defineCli<TCommands extends readonly AnyCliCommand[]>(definition: CliDefinition<TCommands>) {
	const program = buildProgram(definition);

	return {
		program,
		/**
		 * Runs the CLI program by parsing the provided arguments or the default process arguments, executing the corresponding command logic based on the CLI definition.
		 * @param argv An optional array of strings representing the command-line arguments to be parsed and executed by the CLI. If not provided, it defaults to `process.argv`.
		 * @returns A Promise that resolves to the Commander program instance after parsing and executing the CLI commands.
		 * @throws An error if any issues occur during command execution, which will be caught and handled by the CLI framework to provide feedback to the user.
		 */
		async run(argv: string[] = definition.argv ?? process.argv) {
			return await program.parseAsync(argv);
		},
	};
}

/**
 * Defines and runs a CLI program based on the provided CLI definition, including commands, arguments, and options.
 * @param definition The CLI definition containing the program name, description, version, aliases, and commands.
 * @returns A configured Commander program ready to be parsed and executed.
 */
export function runCli<TCommands extends readonly AnyCliCommand[]>(definition: CliDefinition<TCommands>) {
	return defineCli(definition).run();
}
