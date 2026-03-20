import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-orm/zod";
import { tags } from "../schemas";

export const insertTagsSchema = createInsertSchema(tags, {
	name: (schema) => schema.trim().min(1, "Name is required").max(100, "Name must be at most 100 characters long"),
	slug: (schema) => schema.trim().min(1, "Slug is required").max(100, "Slug must be at most 100 characters long"),
});
export const selectTagsSchema = createSelectSchema(tags);
export const updateTagsSchema = createUpdateSchema(tags, {
	name: (schema) => schema.trim().min(1, "Name is required").max(100, "Name must be at most 100 characters long"),
	slug: (schema) => schema.trim().min(1, "Slug is required").max(100, "Slug must be at most 100 characters long"),
});
