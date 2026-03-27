import { DBLike } from "@mingull/database/client";

export const createSkillRepository = (db: DBLike) => ({
	findMany: async ({ locale }: { locale: string }) => {
		const rows = await db.query.skills.findMany({
			where: {
				translations: {
					locale: { eq: locale },
				},
			},
			with: {
				translations: true,
			},
		});
        
		return rows;
	},
});
export type SkillRepository = ReturnType<typeof createSkillRepository>;
