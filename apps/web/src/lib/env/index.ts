import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	client: {},
	server: {
		DATABASE_URL: z.url(),
		BETTER_AUTH_SECRET: z.string(),
		DISCORD_CLIENT_ID: z.string(),
		DISCORD_CLIENT_SECRET: z.string(),
		GITHUB_CLIENT_ID: z.string(),
		GITHUB_CLIENT_SECRET: z.string(),
		GOOGLE_CLIENT_ID: z.string(),
		GOOGLE_CLIENT_SECRET: z.string(),
	},
	shared: {
		BETTER_AUTH_URL: z.url(),
		API_URL: z.url(),
	},
	experimental__runtimeEnv: {
		BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
		API_URL: process.env.NEXT_PUBLIC_API_URL,
	},
	emptyStringAsUndefined: true,
});
