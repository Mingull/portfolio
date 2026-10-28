import { defineCommand, defineOptions } from "@mingull/cli-core/commander";
import { intro, log, withSpinner, note } from "@mingull/cli-core/prompts";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import pc from "picocolors";
import { z } from "zod";
import { Box, render, Text } from "ink";

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

async function fetchRemoteBranches() {
	await execFileAsync("git", ["fetch", "--prune"]);
}

const accio = defineCommand({
	name: "accio",
	description: "Summon local branches",
	options: defineOptions({
		fetch: {
			flags: ["-r", "--remote"],
			description: "Fetch remote branches before listing local branches",
			type: z.boolean().optional(),
			defaultValue: false,
		},
	}),
	onValidationError: (error) => {
		render(
			<Box flexDirection="column" padding={1} borderStyle="round" borderColor="red">
				{z.treeifyError(error).errors.map((err, index) => (
					<Text key={index} color="red">
						#{index + 1}: {err}
					</Text>
				))}
			</Box>
		);
	},
	run: async ({ options }) => {
		intro("Branch Summoning Ritual");

		if (options.fetch) {
			try {
				await withSpinner(fetchRemoteBranches, {
					message: "Summoning updates from remotes...",
					done: "Remote updates summoned!",
					failed: "Could not summon remote updates. Falling back to local branch data.",
				});
			} catch {
				log.warn("Using local branch data because remote fetch failed");
			}
		}

		const branches = await withSpinner(getLocalBranches, {
			message: "Summoning branches from the git repository...",
			done: "Branches summoned!",
			failed: "Could not summon branches. Make sure you're inside a git repository.",
		});

		if (branches.length === 0) {
			log.warn("No local branches found");
			return;
		}

		const widestBranchName = Math.max(...branches.map((branch) => branch.name.length), "branch".length);
		const rows = branches.map((branch) => {
			const marker = branch.isCurrent ? pc.cyan("*") : " ";
			const paddedName = branch.name.padEnd(widestBranchName);
			const name = branch.isCurrent ? pc.cyan(paddedName) : paddedName;

			return `${marker} ${name} ${formatStatus(branch)}`;
		});

		note(`${rows.join("\n")}`, "Local Branches", { format: (line) => line });
	},
});

export default accio;
