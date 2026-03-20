import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-orm/zod";
import { contentTranslations } from "../schemas";

export const insertContentTranslationSchema = createInsertSchema(contentTranslations, {
	locale: (schema) => schema.trim().min(2, "Locale must be at least 2 characters long").max(5, "Locale must be at most 5 characters long"),
	slug: (schema) => schema.trim().min(1, "Slug is required").max(191, "Slug must be at most 191 characters long"),
	title: (schema) => schema.trim().min(1, "Title is required").max(255, "Title must be at most 255 characters long"),
	summary: (schema) => schema.trim().min(1, "Summary is required"),
	body: (schema) => schema.trim().min(1, "Body is required"),
	seoTitle: (schema) => schema.trim().max(255, "SEO title must be at most 255 characters long"),
	seoDescription: (schema) => schema.trim().max(1000, "SEO description must be at most 1000 characters long"),
});
export const selectContentTranslationSchema = createSelectSchema(contentTranslations);
export const updateContentTranslationSchema = createUpdateSchema(contentTranslations, {
	locale: (schema) => schema.trim().min(2, "Locale must be at least 2 characters long").max(5, "Locale must be at most 5 characters long"),
	slug: (schema) => schema.trim().min(1, "Slug is required").max(191, "Slug must be at most 191 characters long"),
	title: (schema) => schema.trim().min(1, "Title is required").max(255, "Title must be at most 255 characters long"),
	summary: (schema) => schema.trim().min(1, "Summary is required"),
	body: (schema) => schema.trim().min(1, "Body is required"),
	seoTitle: (schema) => schema.trim().max(255, "SEO title must be at most 255 characters long"),
	seoDescription: (schema) => schema.trim().max(1000, "SEO description must be at most 1000 characters long"),
});
