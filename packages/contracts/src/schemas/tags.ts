import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-orm/zod";
import { tags } from ".";

export const insertTagsSchema = createInsertSchema(tags);
export const selectTagsSchema = createSelectSchema(tags);
export const updateTagsSchema = createUpdateSchema(tags);
