import { skillListContract } from "@mingull/contracts/skills";
import { z } from "zod";

export type SkillListResponse = z.infer<typeof skillListContract>;
