"use server";

import { env } from "@/lib/env";
import { skillSchema } from "@/schemas/skills";

import { phraseOf, statusOf, type ApiResult } from "@mingull/http";
import { Locale } from "next-intl";
import { z } from "zod";

type Skill = z.infer<typeof skillSchema>;

export const getSkills = async (locale: Locale): Promise<Skill[]> => {
	const result = await fetch(`${env.API_URL}/portfolio/skills?locale=${locale}`).then((res) => res.json() as Promise<ApiResult<Skill[]>>);
	
	if (result?.status !== statusOf("Ok") || result?.statusCode !== phraseOf("Ok")) {
		console.log("Error fetching skills:", result?.message);
		return [];
	}
	const parsed = skillSchema.array().safeParse(result?.data);

	if (!parsed.success) {
		console.error("Invalid skill metadata received:", parsed.error);
		return [];
	}

	return parsed.data;
};
