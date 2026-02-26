import { getPostBySlug } from "@/lib/posts";
import { createErrorResponse, createSuccessResponse, getHttpCode, getStatus } from "@mingull/api";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, ctx: RouteContext<"/v1/content/posts/[slug]">) => {
	// withRateLimit<{ params: { slug: string }; searchParams: { locale?: string } }>(async (req, ctx) => {
	const locale = req.nextUrl.searchParams.get("locale");
	if (!locale) {
		return NextResponse.json(
			createErrorResponse({
				code: "BadRequest",
				message: "Locale query parameter is required",
				details: {},
			}),
		);
	}
	const { slug } = await ctx.params;

	const { data, error } = await attempt(() => getPostBySlug({ locale, slug }));

	if (error) {
		return NextResponse.json(
			createErrorResponse({
				code: "InternalServerError",
				message: "Failed to fetch posts",
				details: { error },
			}),
			{
				status: getHttpCode("InternalServerError"),
				statusText: getStatus("InternalServerError"),
			},
		);
	}

	return NextResponse.json(
		createSuccessResponse({
			code: "Ok",
			message: "Posts fetched successfully",
			data: {
				...data,
				metadata: {
					...data?.metadata,
					image: data?.metadata?.image ? `${process.env.BASE_API}${data.metadata.image}` : null,
				},
			},
		}),
		{
			status: getHttpCode("Ok"),
			statusText: getStatus("Ok"),
		},
	);
};
//);
