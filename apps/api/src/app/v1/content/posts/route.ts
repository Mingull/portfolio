import { di } from "@/lib/inject";
import { postListContract } from "@mingull/contracts/posts";
import { attempt } from "@mingull/error";
import { badRequest, internalServerError, noContent, ok } from "@mingull/http";
import { json } from "@mingull/http/next";
import { NextRequest } from "next/server";
import { z, ZodError } from "zod";

export const GET = async (req: NextRequest) => {
	const locale = req.nextUrl.searchParams.get("locale");
	const limit = req.nextUrl.searchParams.get("limit");
	const cursor = req.nextUrl.searchParams.get("cursor") ?? undefined;

	const fieldErrors: Record<string, string> = {};
	const messages: string[] = [];

	if (!locale) {
		fieldErrors.locale = "This field is required";
		messages.push("Locale query parameter is required");
	}
	if (limit && isNaN(parseInt(limit))) {
		fieldErrors.limit = "Limit query parameter must be a valid number";
		messages.push("Limit query parameter must be a valid number");
	}
	if (Object.keys(fieldErrors).length > 0)
		return json(
			badRequest({
				message: messages.join("; "),
				title: "Bad Request",
				type: "BadRequest",
				fields: fieldErrors,
			}),
		);

	const { data, error } = await attempt<z.infer<typeof postListContract>, ZodError>(
		di.postService.getPosts({ locale: locale!, cursor, limit: limit ? parseInt(limit) : undefined }),
	);

	if (error instanceof ZodError) {
		return json(badRequest({ message: "Invalid post data", title: "Validation Error", type: "validation", fields: { error: z.treeifyError(error) } }));
	}

	if (error) {
		return json(
			internalServerError({
				message: "Failed to fetch posts",
				title: "Internal Server Error",
				type: "InternalServerError",
				fields: { error: (error as unknown as Error).message },
			}),
		);
	}

	if (!data) {
		return json(
			noContent({
				message: "No posts found",
			}),
		);
	}

	return json(ok({ message: "Posts fetched successfully", data }));
};
