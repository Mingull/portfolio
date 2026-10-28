import { defineCommand } from "@mingull/cli-core/commander";
import { z } from "zod";

const lumos = defineCommand({
	name: "lumos",
	description: "Illuminate the path ahead",
	args: {
		target: z.enum(["branches", "services"]),
	},
	options: {
		bright: {
			flags: "-b, --bright",
			type: z.boolean().optional(),
		},
	},
	run: async ({ args, options }) => {
		if (args.target === "branches") {
			console.log("Shining light on branches...");
		}

		if (args.target === "services") {
			console.log("Shining light on services...");
		}

		if (options.bright) {
			console.log("Increasing brightness...");
		}
	},
});

export default lumos;
