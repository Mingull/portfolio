import { mysqlTable, varchar, int, decimal, datetime } from "drizzle-orm/mysql-core";

export const skills = mysqlTable("skills", {
	id: varchar("id", { length: 36 }).primaryKey(),

	defaultLocale: varchar("default_locale", { length: 5 }).notNull(),
	version: varchar("version", { length: 20 }).notNull(),
	icon: varchar("icon", { length: 100 }).notNull(),

	experienceValue: int("experience_value").notNull().default(0),
	experienceYears: decimal("experience_years", { precision: 4, scale: 1 }).notNull().default("0.0").$type<number>(), // Using decimal for experienceYears to allow for half years (e.g., 2.5 years). The $type<number>() is used to ensure that the TypeScript type is number, even though it's stored as a decimal/string in the database.

	createdAt: datetime("created_at").notNull(),
	updatedAt: datetime("updated_at").notNull(),
});
