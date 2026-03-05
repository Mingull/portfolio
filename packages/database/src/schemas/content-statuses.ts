// db/schema/content-statuses.ts
import { mysqlTable, varchar, uniqueIndex } from "drizzle-orm/mysql-core";

export const contentStatuses = mysqlTable(
	"content_statuses",
	{
		id: varchar("id", { length: 36 }).primaryKey(),
		key: varchar("key", { length: 50 }).notNull(), // draft, published, scheduled
		label: varchar("label", { length: 100 }).notNull(),
	},
	(table) => [uniqueIndex("content_status_key_idx").on(table.key)],
);
