import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-orm/zod";
import { contentTypes } from "../schemas";

export const insertContentTranslationSchema = createInsertSchema(contentTypes, {
	label: (schema) => schema.trim().min(1, "Label is required").max(100, "Label must be at most 100 characters long"),
});
export const selectContentTranslationSchema = createSelectSchema(contentTypes);
export const updateContentTranslationSchema = createUpdateSchema(contentTypes, {
	label: (schema) => schema.trim().min(1, "Label is required").max(100, "Label must be at most 100 characters long"),
});
