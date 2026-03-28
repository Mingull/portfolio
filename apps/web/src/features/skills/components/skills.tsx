import { getSkills } from "@/features/skills/actions/get-skills";
import { getLocale } from "next-intl/server";
import { SkillList } from "./skill-list";

export async function Skills() {
	const locale = await getLocale();
	const { skills } = await getSkills(locale);

	return <SkillList skills={skills} />;
}
