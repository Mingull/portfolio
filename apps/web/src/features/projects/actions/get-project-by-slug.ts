"use server";

import { env } from "@/lib/env";
import { projectContract } from "@mingull/contracts/projects";
import { phraseOf, statusOf, type ApiResult } from "@mingull/http";
import { Locale } from "next-intl";
import { ProjectResponse } from "../types";

export const getProjectBySlug = async (locale: Locale, slug: string): Promise<ProjectResponse | null> => {
	const result = await fetch(`${env.API_URL}/content/projects/${slug}?locale=${locale}`).then((res) => res.json() as Promise<ApiResult<ProjectResponse>>);

	if (result?.status !== statusOf("Ok") || result?.statusCode !== phraseOf("Ok")) {
		console.log("Error fetching projects:", result?.message);
		return null;
	}

	if (!result?.data) {
		console.error("Project response did not include data");
		return null;
	}

	const normalizedData = {
		...result.data,
		publishedAt: typeof result.data.publishedAt === "string" || typeof result.data.publishedAt === "number" ? new Date(result.data.publishedAt) : result.data.publishedAt,
	};

	const parsed = await projectContract.safeParseAsync(normalizedData);

	if (!parsed.success) {
		console.error("Invalid project metadata received:", parsed.error);
		return null;
	}

	return parsed.data;
};
