import { mysqlTable, varchar, text, boolean, timestamp, int, uniqueIndex } from "drizzle-orm/mysql-core";
import { contentTypes } from "./content-types";
import { contentStatuses } from "./content-statuses";

export const content = mysqlTable(
	"content",
	{
		id: varchar("id", { length: 36 }).primaryKey(),

		typeId: varchar("type_id", { length: 36 })
			.notNull()
			.references(() => contentTypes.id),
		statusId: varchar("status_id", { length: 36 })
			.notNull()
			.references(() => contentStatuses.id),

		slug: varchar("slug", { length: 191 }).notNull(),
		locale: varchar("locale", { length: 5 }).notNull(),

		title: varchar("title", { length: 255 }).notNull(),
		summary: text("summary").notNull(),
		body: text("body").notNull(),

		image: varchar("image", { length: 255 }),

		publishedAt: timestamp("published_at"),
		updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),

		createdAt: timestamp("created_at").notNull().defaultNow(),

		readingTime: int("reading_time"),
		featured: boolean("featured").notNull().default(false),

		seoTitle: varchar("seo_title", { length: 255 }),
		seoDescription: text("seo_description"),

		repoUrl: varchar("repo_url", { length: 255 }),
		liveUrl: varchar("live_url", { length: 255 }),
		year: int("year"),
	},
	(table) => [uniqueIndex("slug_locale_type_idx").on(table.slug, table.locale, table.typeId)],
);
