import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-orm/zod";
import { skillTranslations } from "../schemas";

export const insertSkillTranslationSchema = createInsertSchema(skillTranslations);
export const selectSkillTranslationSchema = createSelectSchema(skillTranslations);
export const updateSkillTranslationSchema = createUpdateSchema(skillTranslations);
