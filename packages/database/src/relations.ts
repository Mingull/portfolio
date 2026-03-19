import { defineRelations } from "drizzle-orm";
import * as schemas from "./schemas/index";

export const relations = defineRelations({ ...schemas }, (r) => ({
	tags: {
		contentTags: r.many.contentTags({
			from: r.tags.id,
			to: r.contentTags.tagId,
		}),
	},
	content: {
		translations: r.many.contentTranslations({
			from: r.content.id,
			to: r.contentTranslations.contentId,
		}),
		status: r.one.contentStatuses({
			from: r.content.statusKey,
			to: r.contentStatuses.key,
		}),
		type: r.one.contentTypes({
			from: r.content.typeKey,
			to: r.contentTypes.key,
		}),
		tags: r.many.contentTags({
			from: r.content.id,
			to: r.contentTags.contentId,
		}),
	},
	contentTranslations: {
		content: r.one.content({
			from: r.contentTranslations.contentId,
			to: r.content.id,
		}),
	},
	skills: {
		translations: r.many.skillTranslations({
			from: r.skills.id,
			to: r.skillTranslations.skillId,
		}),
	},
	skillTranslations: {
		skill: r.one.skills({
			from: r.skillTranslations.skillId,
			to: r.skills.id,
		}),
	},
}));
