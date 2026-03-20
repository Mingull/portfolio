import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-orm/zod";
import { skillTranslations } from "../schemas";
import { z } from "zod";

export const insertSkillTranslationSchema = createInsertSchema(skillTranslations, {
	locale: (schema) =>
		schema
			.trim()
			.min(2, "Locale must be at least 2 characters long")
			.max(5, "Locale must be at most 5 characters long")
			.regex(/^[a-z]{2}(-[A-Z]{2})?$/, "Locale must be in the format 'en' or 'en-US'"),
	content: (schema) => schema.trim().min(1, "Content is required"),
	// ctaLink is a URL so we need to map the current z.string to z.url but keep the current settings
	ctaLink: (schema) => schema.pipe(z.url("CTA link must be a valid URL").trim().max(255, "CTA link must be at most 255 characters long")),
	ctaText: (schema) => schema.trim().min(1, "CTA text is required").max(255, "CTA text must be at most 255 characters long"),
	name: (schema) => schema.trim().min(1, "Name is required").max(100, "Name must be at most 100 characters long"),
	summary: (schema) => schema.trim().min(1, "Summary is required"),
});
export const selectSkillTranslationSchema = createSelectSchema(skillTranslations);
export const updateSkillTranslationSchema = createUpdateSchema(skillTranslations, {
	locale: (schema) =>
		schema
			.trim()
			.min(2, "Locale must be at least 2 characters long")
			.max(5, "Locale must be at most 5 characters long")
			.regex(/^[a-z]{2}(-[A-Z]{2})?$/, "Locale must be in the format 'en' or 'en-US'"),
	content: (schema) => schema.trim().min(1, "Content is required"),
	ctaLink: (schema) => schema.pipe(z.url("CTA link must be a valid URL").trim().max(255, "CTA link must be at most 255 characters long")),
	ctaText: (schema) => schema.trim().min(1, "CTA text is required").max(255, "CTA text must be at most 255 characters long"),
	name: (schema) => schema.trim().min(1, "Name is required").max(100, "Name must be at most 100 characters long"),
	summary: (schema) => schema.trim().min(1, "Summary is required"),
});
