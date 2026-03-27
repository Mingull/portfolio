"use client";
import { SearchBar } from "@/components/search-bar";
import { useQueryState } from "nuqs";
import { useMemo, useState } from "react";
import { PostsResponse } from "../types";
import { PostItem } from "./post";

export function Posts({ posts }: { posts: PostsResponse["posts"] }) {
	const [query, setQuery] = useQueryState("q", { defaultValue: "" });
	const [now] = useState(() => Date.now());

	const isEmpty = posts.length === 0;

	const filteredPosts = useMemo(() => {
		if (isEmpty) return [];
		return (posts ?? [])
			.filter((post) => post.title?.toLowerCase().includes(query.toLowerCase()))
			.filter((post) => post.publishedAt && new Date(post.publishedAt).getTime() <= now);
	}, [posts, query, isEmpty, now]);

	return (
		<div className="container max-w-3xl xl:max-w-5xl">
			<h1 className="title mb-12">Posts</h1>
			<SearchBar query={query} onQueryChange={setQuery} placeholder="Search posts..." />

			{!posts || isEmpty ?
				<ul className="flex flex-col gap-8">
					<li className="border-border flex flex-col justify-between gap-x-4 gap-y-1 rounded border p-4 sm:flex-row">
						<p className="text-muted-foreground">No posts found.</p>
					</li>
				</ul>
			:	<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					{filteredPosts.map((post) => (
						<PostItem key={post.slug} post={post} />
					))}
				</div>
			}
		</div>
	);
}
