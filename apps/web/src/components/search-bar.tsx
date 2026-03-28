"use client";
import { Button } from "@mingull/ui/c/button";
import { Input } from "@mingull/ui/c/input";
import { XIcon } from "lucide-react";

export function SearchBar({ query, placeholder, onQueryChange }: { query: string; placeholder?: string; onQueryChange: (query: string) => void }) {
	const isFiltered = query.length > 0;

	return (
		<div className="mb-12 flex items-center gap-3">
			<Input type="text" placeholder={placeholder || "Search..."} className="h-9 w-full sm:w-1/2" value={query} onChange={(e) => onQueryChange(e.target.value)} />
			{isFiltered && (
				<Button size="sm" variant="secondary" onClick={() => onQueryChange("")} className="h-8 px-2 lg:px-3">
					Reset
					<XIcon className="ml-2 size-4" />
				</Button>
			)}
		</div>
	);
}
