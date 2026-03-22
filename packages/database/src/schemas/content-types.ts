// db/schema/content-types.ts
import { mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const contentTypes = mysqlTable("content_types", {
	key: varchar("key", { length: 50 }).primaryKey(), // "post", "project"
	label: varchar("label", { length: 255 }).notNull(), // for dashboard UI
});
