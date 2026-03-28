import type { DBLike } from "@mingull/database/client";

export const createTagRepository = (db: DBLike) => ({
	findByContentId: async (contentId: string) => {
		const rows = await db.query.contentTags.findMany({
			where: {
				content: {
					id: { eq: contentId },
				},
			},
			with: {
				tag: true,
			},
			columns: {
				contentId: false,
				tagId: false,
			},
		});

		return rows;
	},
});
export type TagRepository = ReturnType<typeof createTagRepository>;
