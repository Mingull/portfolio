import { PostRepository } from "./posts.repository";

export const createPostService = (repository: PostRepository) => ({
	async getPosts(locale: string, cursor?: string) {
		const { posts, nextCursor } = await repository.findMany(locale, cursor);

		return {
			posts,
			nextCursor,
		};
	},
});
export type PostService = ReturnType<typeof createPostService>;
