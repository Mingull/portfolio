import { env } from "@/lib/env";
import { projectContract, projectListContract } from "@mingull/contracts/projects";
import { ProjectRepository } from "./repository";
import { decodeCursor, encodeCursor } from "../utils";

export const createProjectService = (projectRepo: ProjectRepository) => ({
	getProjects: async ({ locale, cursor, limit = 10, order = "desc" }: { locale: string; cursor?: string; limit?: number; order?: "asc" | "desc" }) => {
		const cursorKey = decodeCursor(cursor);
		const { posts, nextCursorKey } = await projectRepo.findMany({ locale, cursor: cursorKey, limit, order });
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

		return projectListContract.parseAsync({
			projects: parsedPosts,
			nextCursor,
		});
	},
	getProjectBySlug: async ({ locale, slug }: { locale: string; slug: string }) => {
		const row = await projectRepo.findBySlug(locale, slug);
		if (!row) return null;

		const translation = row.translations[0];
		if (!translation) return null;

		return projectContract.parseAsync({
			content: {
				...row,
				tags: row.tags.map((tag) => tag.tag),
				image: row.image ? `${env.BASE_API_URL}${row.image}` : null,
			},
			translation,
		});
	},
});
export type ProjectService = ReturnType<typeof createProjectService>;
