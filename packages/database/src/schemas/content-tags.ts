import { mysqlTable, varchar, primaryKey, char } from "drizzle-orm/mysql-core";
import { content } from "./content";
import { tags } from "./tags";

export const contentTags = mysqlTable(
	"content_tags",
	{
		contentId: char("content_id", { length: 36 })
			.notNull()
			.references(() => content.id),
		tagId: varchar("tag_id", { length: 36 })
			.notNull()
			.references(() => tags.id),
	},
	(table) => [primaryKey({ columns: [table.contentId, table.tagId] })],
);
