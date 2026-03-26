import { di } from "@/lib/inject";
import { postListContract } from "@mingull/contracts/posts";
import { attempt } from "@mingull/error";
import { badRequest, internalServerError, ok } from "@mingull/http";
import { json } from "@mingull/http/next";
import { NextRequest } from "next/server";
import { z } from "zod";

export const GET = async (req: NextRequest) => {
	const locale = req.nextUrl.searchParams.get("locale");
	const limit = req.nextUrl.searchParams.get("limit");
	const cursor = req.nextUrl.searchParams.get("cursor") ?? undefined;
	if (!locale || (limit && isNaN(parseInt(limit)))) {
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
	const { data, error } = await attempt<z.infer<typeof postListContract>, Error>(di.postService.getPosts({ locale, cursor, limit: limit ? parseInt(limit) : undefined }));

	if (error) {
		return json(
			internalServerError({
				message: "Failed to fetch posts",
				title: "Internal Server Error",
				type: "InternalServerError",
				fields: { error: error.message },
			}),
		);
	}

	return json(ok({ message: "Posts fetched successfully", data }));
};
