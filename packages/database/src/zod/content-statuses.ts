import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-orm/zod";
import { contentStatuses } from "../schemas";

export const insertContentStatusesSchema = createInsertSchema(contentStatuses, {
	label: (schema) => schema.trim().min(1, "Label is required").max(100, "Label must be at most 100 characters long"),
});
export const selectContentStatusesSchema = createSelectSchema(contentStatuses);
export const updateContentStatusesSchema = createUpdateSchema(contentStatuses, {
	label: (schema) => schema.trim().min(1, "Label is required").max(100, "Label must be at most 100 characters long"),
});
