import { projectContract, projectListContract } from "@mingull/contracts/projects";
import { z } from "zod";

export type ProjectsResponse = z.infer<typeof projectListContract>;
export type ProjectResponse = z.infer<typeof projectContract>;
