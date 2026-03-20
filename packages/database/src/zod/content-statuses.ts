import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-orm/zod";
import { contentStatuses } from "../schemas";

export const insertContentTranslationSchema = createInsertSchema(contentStatuses, {
	label: (schema) => schema.trim().min(1, "Label is required").max(100, "Label must be at most 100 characters long"),
});
export const selectContentTranslationSchema = createSelectSchema(contentStatuses);
export const updateContentTranslationSchema = createUpdateSchema(contentStatuses, {
	label: (schema) => schema.trim().min(1, "Label is required").max(100, "Label must be at most 100 characters long"),
});
