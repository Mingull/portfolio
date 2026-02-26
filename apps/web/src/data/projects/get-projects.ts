"use server";

import { env } from "@/lib/env";
import { projectMetadataSchema } from "@/schemas/projects";
import { phraseOf, statusOf, type ApiResult } from "@mingull/http";
import { Locale } from "next-intl";
import { z } from "zod";

type ProjectMetadata = z.infer<typeof projectMetadataSchema>;

export const getProjects = async (locale: Locale, limit?: number): Promise<ProjectMetadata[]> => {
	const result = await fetch(`${env.API_URL}/portfolio/content/projects?limit=${limit ?? 10}&locale=${locale}`).then(
		(res) => res.json() as Promise<ApiResult<ProjectMetadata[]>>,
	);
	if (result?.status !== statusOf("Ok") || result?.statusCode !== phraseOf("Ok")) {
		console.log("Error fetching projects:", result?.message);
		return [];
	}
	const parsed = projectMetadataSchema.array().safeParse(result?.data);

	if (!parsed.success) {
		console.error("Invalid project metadata received:", parsed.error);
		return [];
	}

	return parsed.data;
};
