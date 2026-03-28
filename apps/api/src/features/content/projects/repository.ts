import { CONTENT_TYPES } from "@mingull/database";
import type { DBLike } from "@mingull/database/client";
import { CursorKey } from "../utils";

export const createProjectRepository = (db: DBLike) => ({
	findMany: async ({ locale, cursor, limit = 10, order = "desc" }: { locale: string; cursor?: CursorKey; limit?: number; order?: "asc" | "desc" }) => {
		const rows = await db.query.content.findMany({
			where:
				cursor ?
					{
						typeKey: { eq: CONTENT_TYPES.PROJECT },
						publishedAt: { lt: cursor.publishedAt },
					}
				:	{
						typeKey: { eq: CONTENT_TYPES.PROJECT },
					},
			orderBy: { publishedAt: order, id: order },
			limit: limit + 1,
			with: {
				translations: {
					where: {
						locale: { eq: locale },
					},
					limit: 1,
				},
				type: true,
				status: true,
				tags: {
					with: {
						tag: true,
					},
					columns: {
						contentId: false,
						tagId: false,
					},
				},
			},
		});

		const hasMore = rows.length > limit;
		const posts = hasMore ? rows.slice(0, limit) : rows;
		const lastPost = posts[posts.length - 1];

		const nextCursorKey =
			hasMore && lastPost?.publishedAt ?
				{
					publishedAt: lastPost.publishedAt,
					id: lastPost.id,
				}
			:	null;

		return {
			posts,
			nextCursorKey,
		};
	},
	findBySlug: async (locale: string, slug: string) => {
		const post = await db.query.content.findFirst({
			columns: {
				id: true,
				readingTime: true,
				featured: true,
				image: true,
				publishedAt: true,
			},
			where: {
				translations: {
					locale: { eq: locale },
					slug: { eq: slug },
				},
				typeKey: { eq: CONTENT_TYPES.PROJECT },
			},
			with: {
				translations: { limit: 1 },
				type: true,
				status: true,
				tags: {
					with: { tag: true },
				},
			},
		});

		if (!post) {
			return null;
		}

		return post;
	},
});

export type ProjectRepository = ReturnType<typeof createProjectRepository>;
