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
// Create Post Contract
// ----------------
export const createPostContract = z.object({
	content: insertContentSchema
		.omit({
			id: true,
			repoUrl: true,
			liveUrl: true,
			year: true,
			createdAt: true,
			updatedAt: true,
			readingTime: true,
		})
		.extend({
			typeKey: z.literal(CONTENT_TYPES.POST),
		}),
	translation: insertContentTranslationSchema.omit({
		id: true,
		contentId: true,
	}),
});

// ----------------
// Update Post Contract
// ----------------
export const updatePostContract = z.object({
	content: updateContentSchema
		.omit({
			createdAt: true,
			updatedAt: true,
		})
		.extend({
			typeKey: z.literal(CONTENT_TYPES.POST).optional(),
		})
		.partial(),
	translation: updateContentTranslationSchema.partial(),
});

// ----------------
// Response Contract
// ----------------
export const postResponseContract = z.object({
	content: selectContentSchema.extend({
		typeKey: z.literal(CONTENT_TYPES.POST),
	}),
	translation: selectContentTranslationSchema,
});

// ----------------
// Public Response (omit internal fields)
// ----------------
export const publicPostContract = postResponseContract.extend({
	content: selectContentSchema.omit({
		statusKey: true,
		createdAt: true,
		updatedAt: true,
	}),
});

// ----------------
// Post & List Contracts
// ----------------
export const postContract = z.object({
	content: selectContentSchema.pick({
		id: true,
		readingTime: true,
		featured: true,
		image: true,
		publishedAt: true,
	}),
	translation: selectContentTranslationSchema.pick({
		slug: true,
		locale: true,
		title: true,
		summary: true,
	}),
});

export const postListContract = z.object({
	posts: postContract.array(),
	nextCursor: z.string().nullable(),
});
