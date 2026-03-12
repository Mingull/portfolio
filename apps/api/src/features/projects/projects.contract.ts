import { CONTENT_TYPES, insertContentSchema, selectContentSchema, updateContentSchema } from "@mingull/database";
import { z } from "zod";

export const createProjectContract = insertContentSchema
	.omit({
		id: true,
		createdAt: true,
		updatedAt: true,
		readingTime: true,
	})
	.extend({
		typeKey: z.literal(CONTENT_TYPES.PROJECT),
	});

export const updateProjectContract = updateContentSchema
	.omit({
		createdAt: true,
		readingTime: true,
	})
	.extend({
		typeKey: z.literal(CONTENT_TYPES.PROJECT).optional(),
	});

export const projectResponseContract = selectContentSchema.extend({
	typeKey: z.literal(CONTENT_TYPES.PROJECT),
});

export const publicProjectContract = projectResponseContract.omit({
	statusId: true,
	createdAt: true,
	updatedAt: true,
});

export const projectListItemContract = selectContentSchema
	.pick({
		id: true,
		slug: true,
		locale: true,
		title: true,
		summary: true,
		image: true,
		repoUrl: true,
		liveUrl: true,
		year: true,
		featured: true,
	})
	.extend({
		typeKey: z.literal(CONTENT_TYPES.PROJECT),
	});

export const projectListContract = z.object({
	projects: projectListItemContract.array(),
	nextCursor: z.string().nullable(),
});
