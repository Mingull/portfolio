import { boolean, char, int, mysqlTable, timestamp, varchar, index } from "drizzle-orm/mysql-core";
import { contentTypes } from "./content-types";
import { contentStatuses } from "./content-statuses";

export const content = mysqlTable(
	"content",
	{
		id: varchar("id", { length: 36 }).primaryKey(),

		typeKey: char("type_key", { length: 50 })
			.notNull()
			.references(() => contentTypes.key),
		statusId: char("status_id", { length: 36 })
			.notNull()
			.references(() => contentStatuses.id),
		defaultLocale: varchar("default_locale", { length: 5 }).notNull(),
		image: varchar("image", { length: 255 }),
		readingTime: int("reading_time"),
		featured: boolean("featured").notNull().default(false),

		repoUrl: varchar("repo_url", { length: 255 }),
		liveUrl: varchar("live_url", { length: 255 }),
		year: int("year"),

		publishedAt: timestamp("published_at"),
		updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),

		createdAt: timestamp("created_at").notNull().defaultNow(),
	},
	(table) => [index("content_status_idx").on(table.statusId), index("content_type_idx").on(table.typeKey)],
);
