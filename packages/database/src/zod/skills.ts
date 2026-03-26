import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-orm/zod";
import { skills } from "../schemas";

export const insertSkillSchema = createInsertSchema(skills, {
	defaultLocale: (schema) =>
		schema
			.trim()
			.min(2, "Default locale must be at least 2 characters long")
			.max(5, "Default locale must be at most 5 characters long")
			.regex(/^[a-z]{2}(-[A-Z]{2})?$/, "Default locale must be in the format 'en' or 'en-US'"),
	version: (schema) =>
		schema
			.trim()
			.min(1, "Version is required")
			.max(20, "Version must be at most 20 characters long")
			.regex(/^[0-9]+\.[0-9]+\.[0-9]+$/, "Version must be in the Semantic format '1.0.0'"),
	icon: (schema) => schema.trim().min(1, "Icon is required").max(100, "Icon must be at most 100 characters long"),
	experienceValue: (schema) => schema.min(0),
	experienceYears: (schema) =>
		schema.refine((val) => {
			const n = Number(val);
			return !isNaN(n) && n >= 0;
		}, "Experience years must be a non-negative number"),
});
export const selectSkillSchema = createSelectSchema(skills, {
	// We need to ensure that experienceYears is returned as a number, even though it's stored as a decimal/string in the database. The $type<number>() in the schema definition ensures that the TypeScript type is number, but we also need to transform the value when selecting from the database.
	experienceYears: (schema) => schema.transform((val) => typeof val === "string" ? Number(val) : val),
});
export const updateSkillSchema = createUpdateSchema(skills, {
	defaultLocale: (schema) =>
		schema
			.trim()
			.min(2, "Default locale must be at least 2 characters long")
			.max(5, "Default locale must be at most 5 characters long")
			.regex(/^[a-z]{2}(-[A-Z]{2})?$/, "Default locale must be in the format 'en' or 'en-US'"),
	version: (schema) =>
		schema
			.trim()
			.min(1, "Version is required")
			.max(20, "Version must be at most 20 characters long")
			.regex(/^[0-9]+\.[0-9]+\.[0-9]+$/, "Version must be in the Semantic format '1.0.0'"),
	icon: (schema) => schema.trim().min(1, "Icon is required").max(100, "Icon must be at most 100 characters long"),
	experienceValue: (schema) => schema.min(0),
	experienceYears: (schema) =>
		schema.refine((val) => {
			const n = Number(val);
			return !isNaN(n) && n >= 0;
		}, "Experience years must be a non-negative number"),
});
