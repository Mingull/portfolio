import { boolean, index, int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { contentStatuses } from "./content-statuses";
import { contentTypes } from "./content-types";

export const content = mysqlTable(
	"content",
	{
		id: varchar("id", { length: 36 }).primaryKey(),

		typeKey: varchar("type_key", { length: 50 })
			.notNull()
			.references(() => contentTypes.key),
		statusKey: varchar("status_key", { length: 50 })
			.notNull()
			.references(() => contentStatuses.key),
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
	(table) => [index("content_status_idx").on(table.statusKey), index("content_type_idx").on(table.typeKey)],
);
