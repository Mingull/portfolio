import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-orm/zod";
import { contentTypes } from "../schemas";

export const insertContentTypeSchema = createInsertSchema(contentTypes, {
	label: (schema) => schema.trim().min(1, "Label is required").max(255, "Label must be at most 255 characters long"),
});
export const selectContentTranslationSchema = createSelectSchema(contentTypes);
export const updateContentTranslationSchema = createUpdateSchema(contentTypes, {
	label: (schema) => schema.trim().min(1, "Label is required").max(255, "Label must be at most 255 characters long"),
});
