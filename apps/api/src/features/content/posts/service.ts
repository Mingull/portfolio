import { env } from "@/lib/env";
import { postContract, postListContract } from "@mingull/contracts/posts";
import { PostRepository } from "./repository";
import { decodeCursor, encodeCursor } from "../utils";

export const createPostService = (postRepo: PostRepository) => ({
	getPosts: async ({ locale, cursor, limit = 10, order = "desc" }: { locale: string; cursor?: string; limit?: number; order?: "asc" | "desc" }) => {
		const cursorKey = decodeCursor(cursor);
		const { posts, nextCursorKey } = await postRepo.findMany({ locale, cursor: cursorKey, limit, order });
		const parsedPosts = posts
			.map((row) => {
				const translation = row.translations[0];
				if (!translation) {
					return null;
				}

				return {
					content: {
						...row,
						tags: row.tags.map((tag) => tag.tag),
						image: row.image ? `${env.BASE_API_URL}${row.image}` : null,
					},
					translation,
				};
			})
			.filter((post) => post !== null);

		const nextCursor = nextCursorKey ? encodeCursor(nextCursorKey) : null;

		return postListContract.parseAsync({
			posts: parsedPosts,
			nextCursor,
		});
	},
	getPostBySlug: async ({ locale, slug }: { locale: string; slug: string }) => {
		const row = await postRepo.findBySlug(locale, slug);
		if (!row) return null;

		const translation = row.translations[0];
		if (!translation) return null;

		return postContract.parseAsync({
			content: {
				...row,
				tags: row.tags.map((tag) => tag.tag),
				image: row.image ? `${env.BASE_API_URL}${row.image}` : null,
			},
			translation,
		});
	},
});
export type PostService = ReturnType<typeof createPostService>;
