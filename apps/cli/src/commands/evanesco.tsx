import { confirmDeletion, selectBranchesForDeletion } from "@/branch";
import { defineCommand } from "@mingull/cli-core/commander";
import { intro, log, outro, withSpinner } from "@mingull/cli-core/prompts";
import { Box, render, Text } from "ink";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import pc from "picocolors";
import { treeifyError, z } from "zod";

const execFileAsync = promisify(execFile);

type BranchInfo = {
	name: string;
	isCurrent: boolean;
	isMerged: boolean;
	isGone: boolean;
	upstreamTrack: string;
};

function parseLines(stdout: string): string[] {
	return stdout
		.split("\n")
		.map((line) => line.trim())
		.filter(Boolean);
}

async function getLocalBranches(): Promise<BranchInfo[]> {
	const [branchesResult, mergedResult] = await Promise.all([
		execFileAsync("git", ["branch", "--format=%(HEAD)|%(refname:short)|%(upstream:track)"]),
		execFileAsync("git", ["for-each-ref", "--merged=HEAD", "--format=%(refname:short)", "refs/heads"]),
	]);

	const mergedBranches = new Set(parseLines(mergedResult.stdout));

	return parseLines(branchesResult.stdout).map((line) => {
		const [head = "", name = "", track = ""] = line.split("|", 3);
		const upstreamTrack = track.trim();

		return {
			name,
			isCurrent: head === "*",
			isMerged: mergedBranches.has(name),
			isGone: upstreamTrack.includes("gone"),
			upstreamTrack,
		};
	});
}

function formatStatus(branch: BranchInfo): string {
	const tags: string[] = [];

	if (branch.isMerged) tags.push(pc.green("merged"));
	if (branch.isGone) tags.push(pc.yellow("gone"));
	if (branch.upstreamTrack && !branch.isGone) {
		tags.push(pc.dim(branch.upstreamTrack.replace(/^\[|\]$/g, "")));
	}

	return tags.length > 0 ? tags.join(" ") : pc.dim("-");
}

const evanesco = defineCommand({
	name: "evanesco",
	description: "Vanish resources",
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
	run: async () => {
		intro("Branch Vanishing Wizard");

		const branches = await withSpinner(getLocalBranches, {
			message: "Summoning branches from the git repository...",
			done: "Branches summoned!",
			failed: "Could not summon branches. Make sure you're inside a git repository.",
		});

		if (branches.length === 0) {
			log.warn("No local branches found");
			return;
		}
		const selected = await selectBranchesForDeletion(branches);
		log.info(`Selected branches to vanish: ${selected.join(", ")}`);

		const confirmed = await confirmDeletion(selected.length);
		if (!confirmed) {
			outro("Vanishing cancelled");
			return;
		}

		log.success(`Vanished branches: ${selected.join(", ")}`);
		outro("Branch vanishing complete");
	},
});

export default evanesco;
