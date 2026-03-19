import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-orm/zod";
import { skills } from "../schemas";

export const insertSkillSchema = createInsertSchema(skills);
export const selectSkillSchema = createSelectSchema(skills);
export const updateSkillSchema = createUpdateSchema(skills);
