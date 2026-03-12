import { index, mysqlTable, text, uniqueIndex, varchar } from "drizzle-orm/mysql-core";
import { content } from "./content";

export const contentTranslations = mysqlTable(
	"content_translations",
	{
		id: varchar("id", { length: 36 }).primaryKey(),
		contentId: varchar("content_id", { length: 36 })
			.notNull()
			.references(() => content.id, { onDelete: "cascade" }),

		locale: varchar("locale", { length: 5 }).notNull(),

		slug: varchar("slug", { length: 191 }).notNull(),

		title: varchar("title", { length: 255 }).notNull(),
		summary: text("summary").notNull(),
		body: text("body").notNull(),

		seoTitle: varchar("seo_title", { length: 255 }),
		seoDescription: text("seo_description"),
	},
	(table) => [
		uniqueIndex("content_locale_unique").on(table.contentId, table.locale),
		uniqueIndex("slug_locale_unique").on(table.slug, table.locale),
		index("content_translation_content_idx").on(table.contentId),
	],
);
