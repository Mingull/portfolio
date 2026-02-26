// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "mysql",
	schema: ["src/features/auth/schemas/*.ts", "src/features/*/table.ts"],
	out: "./drizzle",
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
});
