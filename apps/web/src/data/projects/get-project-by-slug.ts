"use server";

import { env } from "@/lib/env";
import { projectSchema } from "@/schemas/projects";
import { phraseOf, statusOf, type ApiResult } from "@mingull/http";
import { Locale } from "next-intl";
import { z } from "zod";

type Project = z.infer<typeof projectSchema>;

export const getProjectBySlug = async (locale: Locale, slug: string): Promise<Project | null> => {
	const result = await fetch(`${env.API_URL}/portfolio/content/projects/${slug}?locale=${locale}`).then((res) => res.json() as Promise<ApiResult<Project>>);
	if (result?.status !== statusOf("Ok") || result?.statusCode !== phraseOf("Ok")) {
		console.log("Error fetching projects:", result?.message);
		return null;
	}
	const parsed = projectSchema.safeParse(result?.data);

	if (!parsed.success) {
		console.error("Invalid project metadata received:", parsed.error);
		return null;
	}

	return parsed.data;
};
