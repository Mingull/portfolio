import { createSkillRepository } from "@/features/skills/repository";
import { createSkillService } from "@/features/skills/service";
import { db } from "@mingull/database/client";
import { createInjector } from "@mingull/injector";

export const di = createInjector()
	.register("db", () => db)
	.register("skillRepository", ({ db }) => createSkillRepository(db))
	.register("skillService", ({ skillRepository }) => createSkillService(skillRepository));
