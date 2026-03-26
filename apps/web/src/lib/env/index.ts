import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	shared: {
		BASE_URL: z.url(),
	},
	server: {
		API_URL: z.url(),
	},
	experimental__runtimeEnv: {
		BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
	},
	emptyStringAsUndefined: true,
});
