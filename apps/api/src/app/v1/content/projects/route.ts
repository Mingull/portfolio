// import { env } from "@/lib/env";
// import { attempt } from "@mingull/error";
// import { badRequest, internalServerError, ok } from "@mingull/http";
// import { json } from "@mingull/http/next";
// import { NextRequest } from "next/server";

// export const GET = async (req: NextRequest) => {
// 	const locale = req.nextUrl.searchParams.get("locale");
// 	const limit = req.nextUrl.searchParams.get("limit");
// 	if (!locale || (limit && isNaN(parseInt(limit)))) {
// 		return json(
// 			badRequest({
// 				message: "Locale query parameter is required",
// 				title: "Bad Request",
// 				type: "BadRequest",
// 				fields: {
// 					locale: "This field is required",
// 				},
// 			}),
// 		);
// 	}
// 	const { data, error } = await attempt<ProjectMetadata[], Error>(getProjects({ locale, limit: limit ? parseInt(limit) : undefined }));

// 	if (error) {
// 		return json(
// 			internalServerError({
// 				message: "Failed to fetch projects",
// 				title: "Internal Server Error",
// 				type: "InternalServerError",
// 				fields: {
// 					error: error.message,
// 				},
// 			}),
// 		);
// 	}

// 	return json(
// 		ok({
// 			message: "Projects fetched successfully",
// 			data: data?.map((project) => ({
// 				...project,
// 				image: project.image ? `${env.BASE_API_URL}${project.image}` : null,
// 			})),
// 		}),
// 	);
// };
