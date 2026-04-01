import { di } from "@/lib/inject";
import { projectContract } from "@mingull/contracts/projects";
import { attempt } from "@mingull/error";
import { badRequest, internalServerError, notFound, ok } from "@mingull/http";
import { json } from "@mingull/http/next";
import { NextRequest } from "next/server";
import { z, ZodError } from "zod";

export const GET = async (req: NextRequest, ctx: RouteContext<"/v1/content/projects/[slug]">) => {
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
	const { slug } = await ctx.params;

	const { data, error } = await attempt<z.infer<typeof projectContract> | null, ZodError>(di.projectService.getProjectBySlug({ locale, slug }));

	if (error instanceof ZodError) {
		return json(badRequest({ message: "Invalid project data", title: "Validation Error", type: "validation", fields: { error: z.treeifyError(error) } }));
	}

	if (error) {
		return json(
			internalServerError({
				message: "Failed to fetch project",
				title: "Internal Server Error",
				type: "InternalServerError",
				fields: { error: (error as unknown as Error).message },
			}),
		);
	}

	if (!data) {
		return json(notFound({ message: "Project not found", title: "Not Found", type: "NotFound", fields: { slug: "No project found with the given slug" } }));
	}

	return json(ok({ message: "Project fetched successfully", data }));
};
