import type { ArgsShape, CliCommand, OptionsShape } from "./types";

export function defineCommand<const TArgs extends ArgsShape | undefined, const TOptions extends OptionsShape | undefined>(config: CliCommand<TArgs, TOptions>) {
	return config;
}
