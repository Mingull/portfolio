import { Projects } from "@/features/projects/components/projects";
import { getProjects } from "@/features/projects/actions/get-projects";
import { getLocale } from "next-intl/server";

export default async function ProjectsPage() {
	const locale = await getLocale();
	const { projects } = await getProjects(locale);

	const isEmpty = projects.length === 0;

	return (
		<section className="py-24">
			<div className="container max-w-3xl xl:max-w-5xl">
				<h1 className="title mb-12">Projects</h1>

				{
					isEmpty ?
						<p className="text-muted-foreground">No projects found.</p>
					:	<Projects projects={projects} />
				}
			</div>
		</section>
	);
}
