import * as schemas from "./schemas/index";
import { defineRelations } from "drizzle-orm";

export const relations = defineRelations({ ...schemas }, (r) => ({
	tags: {
		contentTags: r.many.contentTypes({
			from: r.tags.id,
			to: r.contentTags.tagId,
		}),
	},
	content: {
		status: r.one.contentStatuses({
			from: r.content.statusId,
			to: r.contentStatuses.id,
		}),
		type: r.one.contentTypes({
			from: r.content.typeId,
			to: r.contentTypes.id,
		}),
		tags: r.many.contentTypes({
			from: r.content.id,
			to: r.contentTags.contentId,
		}),
	},
}));
