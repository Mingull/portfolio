import { skillListContract } from "@mingull/contracts/skills";
import { SkillRepository } from "./repository";

export const createSkillService = (skillRepo: SkillRepository) => ({
	getSkills: async ({ locale }: { locale: string }) => {
		const rows = await skillRepo.findMany({ locale });
		const parsedSkills = rows
			.map((row) => {
				const translation = row.translations[0];
				if (!translation) {
					return null;
				}

				return {
					skill: {
						id: row.id,
						icon: row.icon,
						version: row.version,
						experienceValue: row.experienceValue,
						experienceYears: row.experienceYears,
					},
					translation,
				};
			})
			.filter((skill) => skill !== null);

		return skillListContract.parseAsync({ skills: parsedSkills });
	},
});
export type SkillService = ReturnType<typeof createSkillService>;
