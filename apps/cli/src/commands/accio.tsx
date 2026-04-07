import { defineCommand } from "@mingull/cli-core/commander";
import { treeifyError, z } from "zod";
import { Box, render, Text } from "ink";
import { selectBranches } from "@/Branch";

const accio = defineCommand({
	name: "accio",
	description: "Summon resources",
	args: {
		target: z.enum(["branches", "services"]),
	},
	options: {
		stale: z.boolean().optional(),
	},
	onValidationError: (error) => {
		const { errors } = treeifyError(error);
		render(
			<Box borderStyle="round" borderColor="red" alignItems="center">
				{errors.map((err, index) => (
					<Text key={index} color="red">
						{err}
					</Text>
				))}
			</Box>,
		);
	},
	run: async ({ args, options }) => {
		if (args.target === "branches") {
			const branches = [args.target];
			const selected = await selectBranches(branches);
		}

		if (options.stale) {
			console.log("Filtering stale branches...");
		}
	},
});

export default accio;
