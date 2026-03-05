// db/schema/content-types.ts
import { mysqlTable, varchar, uniqueIndex } from "drizzle-orm/mysql-core";

export const contentTypes = mysqlTable(
	"content_types",
	{
		id: varchar("id", { length: 36 }).primaryKey(),
		key: varchar("key", { length: 50 }).notNull(), // "post", "project"
		label: varchar("label", { length: 100 }).notNull(), // for dashboard UI
	},
	(table) => [uniqueIndex("content_type_key_idx").on(table.key)],
);
