import {
	CONTENT_TYPES,
	insertContentSchema,
	insertContentTranslationSchema,
	selectContentSchema,
	selectContentTranslationSchema,
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
	content: selectContentSchema.pick({
		id: true,
		image: true,
		repoUrl: true,
		liveUrl: true,
		year: true,
		featured: true,
		publishedAt: true,
	}),
	translation: selectContentTranslationSchema.pick({
		slug: true,
		locale: true,
		title: true,
		summary: true,
	}),
});

export const projectListContract = z.object({
	projects: projectContract.array(),
	nextCursor: z.string().nullable(),
});
