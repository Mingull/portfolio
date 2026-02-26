"use server";

import { env } from "@/lib/env";
import { postMetadataSchema } from "@/schemas/posts";
import { phraseOf, statusOf, type ApiResult } from "@mingull/http";
import { Locale } from "next-intl";
import { z } from "zod";

export type PostMetadata = z.infer<typeof postMetadataSchema>;

export const getPosts = async (locale: Locale, limit?: number): Promise<PostMetadata[]> => {
	const result = await fetch(`${env.API_URL}/portfolio/content/posts?limit=${limit ?? 10}&locale=${locale}`).then((res) => res.json() as Promise<ApiResult<PostMetadata[]>>);

	if (result?.status !== statusOf("Ok") || result?.statusCode !== phraseOf("Ok")) {
		console.log("Error fetching posts:", result?.message);
		return [];
	}
	const parsed = postMetadataSchema.array().safeParse(result?.data);

	if (!parsed.success) {
		console.error("Invalid post metadata received:", parsed.error);
		return [];
	}

	return parsed.data;
};
