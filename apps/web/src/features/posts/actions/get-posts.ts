"use server";

import { PostsResponse } from "@/features/posts/types";
import { env } from "@/lib/env";
import { postListContract } from "@mingull/contracts/posts";
import { phraseOf, statusOf, type ApiResult } from "@mingull/http";
import { Locale } from "next-intl";

export const getPosts = async (locale: Locale, limit?: number): Promise<PostsResponse> => {
	const result = await fetch(`${env.API_URL}/content/posts?limit=${limit ?? 10}&locale=${locale}`).then((res) => res.json() as Promise<ApiResult<PostsResponse>>);

	if (result?.status !== statusOf("Ok") || result?.statusCode !== phraseOf("Ok")) {
		console.log("Error fetching posts:", result?.message);
		return {
			posts: [],
			nextCursor: null,
		};
	}

	if (!result?.data) {
		console.error("Posts response did not include data");
		return {
			posts: [],
			nextCursor: null,
		};
	}

	const normalizedData = {
		...result.data,
		posts: result.data.posts.map((post) => {
			const publishedAt = post.content.publishedAt;

			return {
				...post,
				content: {
					...post.content,
					publishedAt:
						typeof publishedAt === "string" || typeof publishedAt === "number"
							? new Date(publishedAt)
							: publishedAt,
				},
			};
		}),
	};

	const parsed = await postListContract.safeParseAsync(normalizedData);
	if (!parsed.success) {
		console.error("Invalid posts received:", parsed.error);
		return {
			posts: [],
			nextCursor: null,
		};
	}

	return parsed.data;
};
