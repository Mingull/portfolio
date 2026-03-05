import { seed } from "drizzle-seed";
import { db } from "./client";
import { content } from "./schemas";

async function main() {
  await seed(db, { content });
}

main();