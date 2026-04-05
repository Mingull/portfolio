import { Badge } from "@mingull/ui/c/badge";
import React, { ReactNode } from "react";

interface CodeBlockProps {
	children: ReactNode;
	className?: string;
	filename?: string;
	"data-filename"?: string;
}

export function CodeBlock({ children, className, filename, "data-filename": dataFilename }: CodeBlockProps) {
	const displayFilename = filename || dataFilename;
	return (
		<div className="bg-muted mb-6 overflow-hidden rounded-lg border">
			{displayFilename && (
				<div className="bg-muted/50 flex items-center gap-2 border-b px-4 py-2">
					<Badge variant="secondary" className="font-mono text-xs">
						{displayFilename}
					</Badge>
				</div>
			)}
			<pre className={`overflow-x-auto p-4 text-sm leading-6 ${className || ""}`}>{children}</pre>
		</div>
	);
}
