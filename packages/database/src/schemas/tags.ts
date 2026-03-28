import { mysqlTable, varchar, uniqueIndex } from "drizzle-orm/mysql-core";

export const tags = mysqlTable(
	"tags",
	{
		id: varchar("id", { length: 36 }).primaryKey(),
		name: varchar("name", { length: 100 }).notNull(), // for display purposes
		slug: varchar("slug", { length: 100 }).notNull(), // for URL and lookups
	},
	(table) => [uniqueIndex("tag_slug_idx").on(table.slug)],
);
