"use client";
import { PostsResponse } from "@/features/posts/types";
import { PostItem } from "./post";
import { SearchBar } from "@/components/search-bar";
import { useQueryState } from "nuqs";
import z from "zod";
import { postContract } from "@mingull/contracts/posts";

export function Posts({ posts }: { posts: z.infer<z.ZodArray<typeof postContract>> }) {
	const [query, setQuery] = useQueryState("q", { defaultValue: "" });

	const isEmpty = posts.length === 0;

	if (!posts || posts.length === 0) {
		return (
			<div className="text-muted-foreground mt-8 flex flex-col items-center justify-center text-center">
				<p>No posts found.</p>
			</div>
		);
	}

	return (
		<div className="container max-w-3xl xl:max-w-5xl">
			<h1 className="title mb-12">Posts</h1>
			<SearchBar query={query} onQueryChange={setQuery} placeholder="Search posts..." />

			{isEmpty ?
				<ul className="flex flex-col gap-8">
					<li className="border-border flex flex-col justify-between gap-x-4 gap-y-1 rounded border p-4 sm:flex-row">
						<p className="text-muted-foreground">No posts found.</p>
					</li>
				</ul>
			:	<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					{posts.map((post) => (
						<PostItem key={post.translation.slug} post={post} />
					))}
				</div>
			}
		</div>
	);
}
