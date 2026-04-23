import { defineCommand, defineOptions } from "@mingull/cli-core/commander";
import { z } from "zod";

const reparo = defineCommand({
	name: "reparo",
	description: "Fix issues",
	args: {
		target: z.enum(["branches", "services"]),
	},
	options: defineOptions({
		force: z.boolean().optional(),
		name: {
			flags: "-n, --name",
			type: z.string().optional(),
		},
	}),
	run: async ({ args, options }) => {
		if (args.target === "branches") {
			console.log("Fixing branches...");
		}
		
		if (args.target === "services") {
			console.log("Fixing services...");
		}

		if (options.force) {
			console.log("Forcing fixes...");
		}

		if (options.name) {
			console.log(`Fixing with name: ${options.name}`);
		}
	},
});

export default reparo;
