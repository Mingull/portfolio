"use server";

import { env } from "@/lib/env";
import { postSchema } from "@/schemas/posts";
import { phraseOf, statusOf, type ApiResult } from "@mingull/http";
import { Locale } from "next-intl";
import { z } from "zod";

type Post = z.infer<typeof postSchema>;

export const getPostBySlug = async (locale: Locale, slug: string): Promise<Post | null> => {
	const result = await fetch(`${env.API_URL}/portfolio/content/posts/${slug}?locale=${locale}`).then((res) => res.json() as Promise<ApiResult<Post>>);

	if (result?.status !== statusOf("Ok") || result?.statusCode !== phraseOf("Ok")) {
		console.log("Error fetching posts:", result?.message);
		return null;
	}
	const parsed = postSchema.safeParse(result?.data);

	if (!parsed.success) {
		console.error("Invalid post metadata received:", parsed.error);
		return null;
	}

	return parsed.data;
};
