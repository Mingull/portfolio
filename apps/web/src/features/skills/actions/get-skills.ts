"use server";

import { env } from "@/lib/env";
import { skillListContract } from "@mingull/contracts/skills";

import { phraseOf, statusOf, type ApiResult } from "@mingull/http";
import { Locale } from "next-intl";
import type { SkillListResponse } from "../types";

export const getSkills = async (locale: Locale): Promise<SkillListResponse> => {
	const result = await fetch(`${env.API_URL}/skills?locale=${locale}`).then((res) => res.json() as Promise<ApiResult<SkillListResponse>>);

	if (result?.status !== statusOf("Ok") || result?.statusCode !== phraseOf("Ok")) {
		return { skills: [] };
	}

	if (!result?.data) {
		console.error("Skills response did not include data");
		return { skills: [] };
	}
	const normalizedData = {
		...result.data,
		skills: result.data.skills.map((skill) => {
			const experienceYears = skill.skill.experienceYears;
			return {
				...skill,
				skill: {
					...skill.skill,
					// because zod expects experienceYears to be a string to be able to validate it we need to make sure its a string
					experienceYears: typeof experienceYears === "number" ? experienceYears.toString() : experienceYears,
				},
			};
		}),
	};
	const parsed = await skillListContract.safeParseAsync(normalizedData);

	if (!parsed.success) {
		console.error("Invalid skill metadata received:", parsed.error);
		return { skills: [] };
	}

	return parsed.data;
};
