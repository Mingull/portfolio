"use client";

import { Link } from "@/i18n/navigation";
import { useFormatDate } from "@/lib/utils";
import { projectListItemContract } from "@mingull/contracts/projects";
import { AspectRatio } from "@mingull/ui/c/aspect-ratio";
import { Badge } from "@mingull/ui/c/badge";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@mingull/ui/c/card";
import Image from "next/image";
import { z } from "zod";

export function ProjectItem({ project }: { project: z.infer<typeof projectListItemContract> }) {
	const formatDate = useFormatDate();

	return (
		<Link key={project.slug} href={{ pathname: "/projects/[slug]", params: { slug: project.slug } }} className="group" aria-label={`View project: ${project.title}`}>
			<Card className="relative data-[size=sm]:pt-0" size="sm">
				{project.image ?
					<AspectRatio ratio={16 / 9} className="relative overflow-hidden rounded-t-xl">
						<Image
							src={project.image}
							alt={project.title}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
							loading="lazy"
						/>
					</AspectRatio>
				:	null}
				<CardHeader>
					<CardTitle>{project.title}</CardTitle>
					<CardDescription>{formatDate(project.publishedAt ?? "")}</CardDescription>
					<CardAction className="flex flex-wrap gap-1">
						{project.tags?.map((tag) => (
							<Badge key={tag.slug} variant="outline" className="text-xs">
								{tag.name}
							</Badge>
						))}
					</CardAction>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground line-clamp-2 text-sm">{project.summary}</p>
				</CardContent>
			</Card>
		</Link>
	);
}
