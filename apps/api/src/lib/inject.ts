import { createPostRepository } from "@/features/content/posts/repository";
import { createPostService } from "@/features/content/posts/service";
import { createProjectRepository } from "@/features/projects/repository";
import { createProjectService } from "@/features/projects/service";
import { createSkillRepository } from "@/features/skills/repository";
import { createSkillService } from "@/features/skills/service";
import { db } from "@mingull/database/client";
import { createInjector } from "@mingull/injector";

export const di = createInjector()
	.register("db", () => db)
	.register("postRepository", ({ db }) => createPostRepository(db))
	.register("projectRepository", ({ db }) => createProjectRepository(db))
	.register("skillRepository", ({ db }) => createSkillRepository(db))
	.register("postService", ({ postRepository }) => createPostService(postRepository))
	.register("projectService", ({ projectRepository }) => createProjectService(projectRepository))
	.register("skillService", ({ skillRepository }) => createSkillService(skillRepository));
