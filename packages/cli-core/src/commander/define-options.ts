import { Option } from "./types";
import { z } from "zod";

/**
 * Define CLI options with automatic type inference for defaultValue based on each option's Zod schema.
 * @example
 * const options = defineOptions({
 *   verbose: {
 *     flags: ["-v", "--verbose"],
 *     type: z.boolean(),
 *     defaultValue: true, // ✓ inferred as boolean
 *   },
 *   port: {
 *     flags: "--port",
 *     type: z.number(),
 *     defaultValue: 3000, // ✓ inferred as number
 *   },
 * });
 */
export function defineOptions<const T extends Record<string, Option | z.ZodType>>(options: {
	[K in keyof T]: T[K] extends { type: infer TType extends z.ZodType } ? Omit<T[K], "defaultValue"> & { defaultValue?: z.infer<TType> } : T[K];
}): {
	[K in keyof T]: Option<T[K] extends { type: infer TType extends z.ZodType } ? TType : z.ZodType>;
} {
	return options as unknown as { [K in keyof T]: Option<T[K] extends { type: infer TType extends z.ZodType } ? TType : z.ZodType> };
}
