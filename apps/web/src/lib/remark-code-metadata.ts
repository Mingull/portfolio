interface TreeNode {
	type?: string;
	meta?: string;
	data?: {
		hProperties?: Record<string, unknown>;
	};
	children?: TreeNode[];
}

/**
 * Remark plugin to extract filename from code block metadata
 * Usage: ```typescript filename="src/example.ts"
 *        or ```typescript src/example.ts
 */
export const remarkCodeMetadata = () => {
	return (tree: TreeNode) => {
		const walk = (node: TreeNode) => {
			if (node.type === "code" && node.meta) {
				let filename: string | null = null;

				// Format 1: filename="src/example.ts"
				const quotedMatch = node.meta.match(/filename=["']([^"']+)["']/);
				if (quotedMatch?.[1]) {
					filename = quotedMatch[1];
				} else {
					// Format 2: src/example.ts (anything that looks like a file)
					const fileMatch = node.meta.match(/^(\S+\.[a-zA-Z0-9]+)/);
					if (fileMatch?.[1]) {
						filename = fileMatch[1];
					}
				}

				if (filename) {
					if (!node.data) {
						node.data = {};
					}
					if (!node.data.hProperties) {
						node.data.hProperties = {};
					}
					node.data.hProperties["data-filename"] = filename;
				}
			}

			node.children?.forEach(walk);
		};

		walk(tree);
	};
};
