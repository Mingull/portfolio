import {
	insertSkillSchema,
	insertSkillTranslationSchema,
	selectSkillSchema,
	selectSkillTranslationSchema,
	updateSkillSchema,
	updateSkillTranslationSchema,
} from "@mingull/database";
import { z } from "zod";

// ----------------
// Create Skill Contract
// ----------------
export const createSkillContract = z.object({
	skill: insertSkillSchema.omit({
		id: true,
		createdAt: true,
		updatedAt: true,
	}),
	translation: insertSkillTranslationSchema.omit({
		id: true,
		skillId: true,
	}),
});

// ----------------
// Update Skill Contract
// ----------------
export const updateSkillContract = z.object({
	skill: updateSkillSchema
		.omit({
			createdAt: true,
			updatedAt: true,
		})
		.partial(),
	translation: updateSkillTranslationSchema.partial(),
});

// ----------------
// Response Contract
// ----------------
export const skillResponseContract = z.object({
	skill: selectSkillSchema,
	translation: selectSkillTranslationSchema,
});

// ----------------
// Public Response
// ----------------
export const publicSkillContract = skillResponseContract.extend({
	skill: selectSkillSchema.omit({
		createdAt: true,
		updatedAt: true,
	}),
});

// ----------------
// Skill List Item
// ----------------
export const skillContract = z.object({
	skill: selectSkillSchema.pick({
		id: true,
		icon: true,
		version: true,
		experienceValue: true,
		experienceYears: true,
	}),
	translation: selectSkillTranslationSchema.omit({
		id: true,
		skillId: true,
	}),
});

// ----------------
// Skill List Contract
// ----------------
export const skillListContract = z.object({
	skills: skillContract.array(),
});
