import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { config as loadEnv } from "dotenv";
import { defineConfig } from "drizzle-kit";

const filePath = fileURLToPath(import.meta.url);
const fileDir = dirname(filePath);

// Load env from workspace/app locations to avoid package-level config drift.
loadEnv({ path: resolve(fileDir, "../../apps/api/.env.local") });
loadEnv({ path: resolve(fileDir, "../../apps/api/.env") });
loadEnv({ path: resolve(fileDir, "../../.env.local") });
loadEnv({ path: resolve(fileDir, "../../.env") });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error("DATABASE_URL is required for drizzle-kit");
}

export default defineConfig({
	dialect: "mysql",
	schema: "src/schemas/index.ts",
	out: "./migrations",
	dbCredentials: {
		url: databaseUrl,
	},
	verbose: true,
});
