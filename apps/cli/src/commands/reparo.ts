import { defineCommand } from "@mingull/cli-core/commander";
import { z } from "zod";

const reparo = defineCommand({
	name: "reparo",
	description: "Fix issues",
	args: {
		target: z.enum(["branches", "services"]),
	},
	options: {
		force: z.boolean().optional(),
	},
	run: async ({ args, options }) => {
		if (args.target === "branches") {
			console.log("Fixing branches...");
		}

		if (options.force) {
			console.log("Forcing fixes...");
		}
	},
});

export default reparo;
