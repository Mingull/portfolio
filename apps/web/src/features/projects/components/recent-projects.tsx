import { getProjects } from "@/features/projects/actions/get-projects";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { ProjectItem } from "./project-item";

export default async function RecentProjects() {
	const locale = await getLocale();
	const t = await getTranslations("nav.projects");
	const { projects } = await getProjects(locale, 4);

	const isEmpty = projects.length === 0;

	return (
		<section className="pb-24" id="projects">
			<div className="mb-10 flex items-center justify-between">
				<h2 className="title text-center text-3xl font-bold sm:text-4xl md:text-start">{t("recent")}</h2>
				<div className="text-center">
					<Link
						href="/projects"
						className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium underline decoration-1 underline-offset-4 transition-colors"
					>
						<span>
							{t("view-all")} <span aria-hidden="true">→</span>
						</span>
					</Link>
				</div>
			</div>
			{isEmpty ?
				<p className="text-muted-foreground text-center">{t("no-recent-projects")}</p>
			:	<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					{projects.map((project) => (
						<ProjectItem key={project.slug} project={project} />
					))}
				</div>
			}
		</section>
	);
}
