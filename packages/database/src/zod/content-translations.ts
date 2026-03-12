import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-orm/zod";
import { contentTranslations } from "../schemas";

export const insertContentTranslationSchema = createInsertSchema(contentTranslations);
export const selectContentTranslationSchema = createSelectSchema(contentTranslations);
export const updateContentTranslationSchema = createUpdateSchema(contentTranslations);
