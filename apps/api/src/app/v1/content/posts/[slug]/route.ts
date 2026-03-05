import { env } from "@/lib/env";
import { getPostBySlug, Post } from "@/lib/posts";
import { attempt } from "@mingull/error";
import { badRequest, internalServerError, noContent, ok } from "@mingull/http";
import { json } from "@mingull/http/next";
import { NextRequest } from "next/server";

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

	const { data, error } = await attempt<Post | null, Error>(getPostBySlug({ locale, slug }));

	if (error) {
		return json(
			internalServerError({
				message: "Failed to fetch posts",
				title: "Internal Server Error",
				type: "InternalServerError",
				fields: {
					error: error.message,
				},
			}),
		);
	}

	if (!data) {
		return json(
			noContent({
				message: "Post not found",
			}),
		);
	}

	return json(
		ok({
			message: "Posts fetched successfully",
			data: {
				...data,
				metadata: {
					...data?.metadata,
					image: data?.metadata?.image ? `${env.BASE_API_URL}${data.metadata.image}` : null,
				},
			},
		}),
	);
};
