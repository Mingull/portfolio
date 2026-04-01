import {
	CONTENT_TYPES,
	insertContentSchema,
	insertContentTranslationSchema,
	selectContentSchema,
	selectContentStatusesSchema,
	selectContentTranslationSchema,
	selectTagsSchema,
	updateContentSchema,
	updateContentTranslationSchema,
} from "@mingull/database";
import { z } from "zod";

// ----------------
// Create Project Contract
// ----------------
export const createProjectContract = z.object({
	content: insertContentSchema
		.omit({
			id: true,
			readingTime: true, // projects don't use this
			createdAt: true,
			updatedAt: true,
		})
		.extend({
			typeKey: z.literal(CONTENT_TYPES.PROJECT),
		}),
	translation: insertContentTranslationSchema.omit({
		id: true,
		contentId: true,
	}),
});

// ----------------
// Update Project Contract
// ----------------
export const updateProjectContract = z.object({
	content: updateContentSchema
		.omit({
			createdAt: true,
			updatedAt: true,
		})
		.extend({
			typeKey: z.literal(CONTENT_TYPES.PROJECT).optional(),
		})
		.partial(),
	translation: updateContentTranslationSchema.partial(),
});

// ----------------
// Response Contract
// ----------------
export const projectResponseContract = z.object({
	content: selectContentSchema.extend({
		typeKey: z.literal(CONTENT_TYPES.PROJECT),
	}),
	translation: selectContentTranslationSchema,
});

// ----------------
// Public Response
// ----------------
export const publicProjectContract = projectResponseContract.extend({
	content: selectContentSchema.omit({
		statusKey: true,
		createdAt: true,
		updatedAt: true,
	}),
});

// ----------------
// Project List Item & List Contracts
// ----------------
export const projectContract = z.object({
	...selectContentSchema
		.omit({
			typeKey: true,
			statusKey: true,
		})
		.pick({
			id: true,
			image: true,
			repoUrl: true,
			liveUrl: true,
			year: true,
			featured: true,
			publishedAt: true,
			author: true,
		})
		.extend({
			type: z.object({
				key: z.string(),
				label: z.string(),
			}),
			tags: selectTagsSchema.omit({ id: true }).array(),
			status: selectContentStatusesSchema.pick({ key: true, label: true }),
		}).shape,
	...selectContentTranslationSchema.omit({ id: true, contentId: true }).shape,
});

export const projectListItemContract = projectContract.omit({
	liveUrl: true,
	repoUrl: true,
	seoDescription: true,
	seoTitle: true,
	body: true,
});

export const projectListContract = z.object({
	projects: projectListItemContract.array(),
	nextCursor: z.string().nullable(),
});
