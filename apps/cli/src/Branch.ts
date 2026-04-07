import { confirm, multiselect } from "@mingull/cli-core/prompts";

type Branch = {
	name: string;
	isMerged?: boolean;
	isGone?: boolean;
};

export async function selectBranches(branches: Branch[]) {
	return multiselect<string>({
		message: "Select branches to delete",
		options: branches.map((b) => ({
			value: b.name,
			label: formatBranch(b),
		})),
	});
}
export async function confirmDeletion(count: number) {
	return confirm({ message: `Delete ${count} branches?` });
}
function formatBranch(branch: Branch) {
	let suffix = "";

	if (branch.isMerged) suffix += " ✓ merged";
	if (branch.isGone) suffix += " ⚠ gone";

	return `${branch.name}${suffix}`;
}
