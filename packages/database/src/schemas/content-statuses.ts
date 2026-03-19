// db/schema/content-statuses.ts
import { mysqlTable, varchar, uniqueIndex, char } from "drizzle-orm/mysql-core";

export const contentStatuses = mysqlTable(
	"content_statuses",
	{
		key: varchar("key", { length: 50 }).notNull().primaryKey(), // draft, published, scheduled
		label: varchar("label", { length: 100 }).notNull(),
	},
	(table) => [uniqueIndex("content_status_key_idx").on(table.key)],
);
