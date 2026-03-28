import { env } from "@/lib/env";
import { di } from "@/lib/inject";
import { postContract } from "@mingull/contracts/posts";
import { attempt } from "@mingull/error";
import { badRequest, internalServerError, ok, notFound } from "@mingull/http";
import { json } from "@mingull/http/next";
import { NextRequest } from "next/server";
import { z, ZodError } from "zod";

export const GET = async (req: NextRequest, ctx: RouteContext<"/v1/content/posts/[slug]">) => {
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

	const { data, error } = await attempt<z.infer<typeof postContract> | null, ZodError>(di.postService.getPostBySlug({ locale, slug }));

	if (error instanceof ZodError) {
		return json(badRequest({ message: "Invalid post data", title: "Validation Error", type: "validation", fields: { error: z.prettifyError(error) } }));
	}

	if (error) {
		return json(
			internalServerError({
				message: "Failed to fetch post",
				title: "Internal Server Error",
				type: "InternalServerError",
				fields: { error: (error as unknown as Error).message },
			}),
		);
	}

	if (!data) {
		return json(notFound({ message: "Post not found", title: "Not Found", type: "NotFound", fields: { slug: "No post found with the given slug" } }));
	}

	return json(
		ok({
			message: "Post fetched successfully",
			data,
		}),
	);
};
