import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-orm/zod";
import { contentTypes } from "../schemas";

export const insertContentTypeSchema = createInsertSchema(contentTypes, {
	label: (schema) => schema.trim().min(1, "Label is required").max(100, "Label must be at most 100 characters long"),
});
export const selectContentTypeSchema = createSelectSchema(contentTypes);
export const updateContentTypeSchema = createUpdateSchema(contentTypes, {
	label: (schema) => schema.trim().min(1, "Label is required").max(100, "Label must be at most 100 characters long"),
});
