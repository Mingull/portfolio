// db/schema/content-statuses.ts
import { mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const contentStatuses = mysqlTable("content_statuses", {
	key: varchar("key", { length: 50 }).notNull().primaryKey(), // draft, published, scheduled
	label: varchar("label", { length: 100 }).notNull(), // Draft, Published, Scheduled (for dashboard UI)
});
