import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "mysql",
	schema: "src/schemas/index.ts",
	out: "./migrations",
	dbCredentials: {
		url: "mysql://root@localhost:3306/portfolio",
	},
	verbose: true,
});
