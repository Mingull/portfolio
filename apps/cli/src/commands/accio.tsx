import { defineCommand } from "@mingull/cli-core/commander";
import { log, intro, outro } from "@mingull/cli-core/prompts";
import { treeifyError, z } from "zod";
import { Box, render, Text } from "ink";
import { Branch, confirmDeletion, selectBranchesForDeletion } from "@/Branch";

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
			const branches: Branch[] = [{ name: "branch-1" }, { name: "branch-2", isMerged: true }, { name: "branch-3", isGone: true }];
			intro("Branch Deletion Wizard");
			const selected = await selectBranchesForDeletion(branches);
			log.info(`Selected branches for deletion: ${selected.join(", ")}`);

			const confirmed = await confirmDeletion(selected.length);
			if (!confirmed) {
				outro("Branch deletion cancelled");
				return;
			}
			log.success(`Deleted branches: ${selected.join(", ")}`);
			outro("Branch deletion complete");
		}

		if (options.stale) {
			console.log("Filtering stale branches...");
		}
	},
});

export default accio;
