"use client";

import { SearchBar } from "@/components/search-bar";
import { useQueryState } from "nuqs";
import { useMemo, useState } from "react";
import { ProjectsResponse } from "../types";
import { ProjectItem } from "./project-item";

export function Projects({ projects }: { projects: ProjectsResponse["projects"] }) {
	const [query, setQuery] = useQueryState("q", { defaultValue: "" });
	const [now] = useState(() => Date.now());

	const isEmpty = projects.length === 0;

	const filteredProjects = useMemo(() => {
		if (isEmpty) return [];
		return (projects ?? [])
			.filter((project) => project.title?.toLowerCase().includes(query.toLowerCase()))
			.filter((project) => project.publishedAt && new Date(project.publishedAt).getTime() <= now);
	}, [projects, query, isEmpty, now]);

	const isFilteredEmpty = filteredProjects.length === 0;

	return (
		<div className="container max-w-3xl xl:max-w-5xl">
			<h1 className="title mb-12">Projects</h1>
			<SearchBar query={query} onQueryChange={setQuery} placeholder="Search projects..." />
			{!projects || isFilteredEmpty ?
				<ul className="flex flex-col gap-8">
					<li className="border-border flex flex-col justify-between gap-x-4 gap-y-1 rounded border p-4 sm:flex-row">
						<p className="text-muted-foreground">No projects found.</p>
					</li>
				</ul>
			:	<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					{filteredProjects.map((project) => (
						<ProjectItem key={project.slug} project={project} />
					))}
				</div>
			}
		</div>
	);
}
