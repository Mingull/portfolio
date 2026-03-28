import { di } from "@/lib/inject";
import { skillListContract } from "@mingull/contracts/skills";
import { attempt } from "@mingull/error";
import { badRequest, internalServerError, ok } from "@mingull/http";
import { json } from "@mingull/http/next";
import { NextRequest } from "next/server";
import { z } from "zod";

export const GET = async (req: NextRequest) => {
	const locale = req.nextUrl.searchParams.get("locale");
	if (!locale) {
		return json(
			badRequest({
				message: "Locale query parameter is required",
				title: "Bad Request",
				type: "BadRequest",
				fields: {
					locale: "This field is required",
				},
			}),
		);
	}

	const { data, error } = await attempt<z.infer<typeof skillListContract>, Error>(di.skillService.getSkills({ locale }));

	if (error) {
		return json(
			internalServerError({
				message: "Failed to fetch skills",
				title: "Internal Server Error",
				type: "InternalServerError",
				fields: { error: error.message },
			}),
		);
	}

	return json(ok({ message: "Skills fetched successfully", data }));
};
