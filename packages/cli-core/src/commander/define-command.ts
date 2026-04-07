import type { ArgsShape, CliCommand, OptionsShape } from "./types";

export function defineCommand<TArgs extends ArgsShape | undefined, TOptions extends OptionsShape | undefined>(config: CliCommand<TArgs, TOptions>) {
	return config;
}
