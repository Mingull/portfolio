"use server";

import { env } from "@/lib/env";
import { phraseOf, statusOf, type ApiResult } from "@mingull/http";
import { Locale } from "next-intl";
import { z } from "zod";
import { ProjectsResponse } from "../types";
import { projectListContract } from "@mingull/contracts/projects";

export const getProjects = async (locale: Locale, limit?: number): Promise<ProjectsResponse> => {
	const result = await fetch(`${env.API_URL}/content/projects?limit=${limit ?? 10}&locale=${locale}`).then((res) => res.json() as Promise<ApiResult<ProjectsResponse>>);

	if (result?.status !== statusOf("Ok") || result?.statusCode !== phraseOf("Ok")) {
		console.log("Error fetching projects:", result?.message);
		return { projects: [], nextCursor: null };
	}

	if (!result?.data) {
		console.error("Projects response did not include data");
		return {
			projects: [],
			nextCursor: null,
		};
	}

	const normalizedData = {
		...result.data,
		projects: result.data.projects.map((project) => {
			const publishedAt = project.publishedAt;

			return {
				...project,
				publishedAt: typeof publishedAt === "string" || typeof publishedAt === "number" ? new Date(publishedAt) : publishedAt,
			};
		}),
	};

	const parsed = await projectListContract.safeParseAsync(normalizedData);
	if (!parsed.success) {
		console.error("Invalid project metadata received:", parsed.error);
		return { projects: [], nextCursor: null };
	}

	return parsed.data;
};
