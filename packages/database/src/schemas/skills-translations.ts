import { mysqlTable, varchar, text } from "drizzle-orm/mysql-core";
import { skills } from "./skills";

export const skillTranslations = mysqlTable("skill_translations", {
	id: varchar("id", { length: 36 }).primaryKey(),

	skillId: varchar("skill_id", { length: 36 })
		.notNull()
		.references(() => skills.id),

	locale: varchar("locale", { length: 5 }).notNull(),

	name: varchar("name", { length: 100 }).notNull(),
	summary: text("summary").notNull(),
	content: text("content").notNull(),

	ctaText: varchar("cta_text", { length: 255 }).notNull(),
	ctaLink: varchar("cta_link", { length: 255 }).notNull(),
});
