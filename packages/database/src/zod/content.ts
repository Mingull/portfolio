import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-orm/zod";
import { content } from "../schemas";

export const insertContentSchema = createInsertSchema(content);
export const selectContentSchema = createSelectSchema(content);
export const updateContentSchema = createUpdateSchema(content);