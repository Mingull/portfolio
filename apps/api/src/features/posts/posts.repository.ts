import { CONTENT_TYPES, DBLike } from "@mingull/database";
import { postListContract } from "@mingull/contracts/posts";

export const createPostRepository = (db: DBLike) => ({
	async findMany(locale: string, cursor?: string, limit: number = 10) {
		const rows = await db.query.content.findMany({
			with: {
				translations: {
					where: {
						locale: { eq: locale },
					},
				},
			},
			where: {
				typeKey: { eq: CONTENT_TYPES.POST },
				publishedAt: cursor ? { lt: new Date(cursor) } : undefined,
			},
			orderBy: {
				publishedAt: "desc",
			},
			limit: limit + 1,
		});

		console.log({ rows, cursor, limit });

		let nextCursor: string | null = null;

		if (rows.length > limit) {
			const next = rows.pop();
			nextCursor = next?.publishedAt?.toISOString() ?? null;
		}

		return postListContract.parse({
			posts: rows,
			nextCursor,
		});
	},
});

export type PostRepository = ReturnType<typeof createPostRepository>;
