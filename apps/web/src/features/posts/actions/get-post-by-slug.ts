"use server";

import { PostResponse } from "@/features/posts/types";
import { env } from "@/lib/env";
import { postContract } from "@mingull/contracts/posts";
import { phraseOf, statusOf, type ApiResult } from "@mingull/http";
import { Locale } from "next-intl";

export const getPostBySlug = async (locale: Locale, slug: string): Promise<PostResponse | null> => {
	const result = await fetch(`${env.API_URL}/portfolio/content/posts/${slug}?locale=${locale}`).then((res) => res.json() as Promise<ApiResult<PostResponse>>);

	if (result?.status !== statusOf("Ok") || result?.statusCode !== phraseOf("Ok")) {
		console.log("Error fetching posts:", result?.message);
		return null;
	}
	const parsed = postContract.safeParse(result?.data);

	if (!parsed.success) {
		console.error("Invalid post metadata received:", parsed.error);
		return null;
	}

	return parsed.data;
};
