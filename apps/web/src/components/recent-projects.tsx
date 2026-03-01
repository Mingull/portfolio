import { getProjects } from "@/data/projects/get-projects";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Projects } from "./projects";

export default async function RecentProjects() {
	const locale = await getLocale();
	const t = await getTranslations("nav.projects");
	const projects = await getProjects(locale, 4);

  const isEmpty = projects.length === 0;

	return (
		<section className="pb-24" id="projects">
			<h2 className="title mb-10 text-center text-3xl font-bold sm:text-4xl md:text-start">{t("recent")}</h2>

			{/* {isError ?
				<p className="text-center text-red-500">Error loading projects</p>
			:	<Projects projects={projects} />} */}
			{isEmpty ?
				<p className="text-center text-red-500">Error loading projects</p>
			:	<Projects projects={projects} />}

			<div className="mt-10 text-center">
				<Link
					href="/projects"
					className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium underline decoration-1 underline-offset-4 transition-colors"
				>
					<span>
						{t("view-all")} <span aria-hidden="true">→</span>
					</span>
				</Link>
			</div>
		</section>
	);
}
