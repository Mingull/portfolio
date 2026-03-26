import { Link } from "@/i18n/navigation";
import { useFormatDate } from "@/lib/utils";
import { formatDate } from "@/lib/utils.server";
import { postContract } from "@mingull/contracts/posts";
import { AspectRatio } from "@mingull/ui/c/aspect-ratio";
import { Badge } from "@mingull/ui/c/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@mingull/ui/c/card";
import Image from "next/image";
import { z } from "zod";

export function PostItem({ post }: { post: z.infer<typeof postContract> }) {
	const formatDate = useFormatDate();
	return (
		<Link
			key={post.translation.slug}
			href={{ pathname: "/posts/[slug]", params: { slug: post.translation.slug } }}
			className="group"
			aria-label={`View post: ${post.translation.title}`}
		>
			<Card className="relative overflow-hidden pt-0">
				{post.content.image ?
					<div className="relative mb-6 h-60">
						<AspectRatio ratio={16 / 9} className="overflow-hidden rounded-t-xl">
							<Image
								src={post.content.image}
								alt={post.translation.title ?? ""}
								className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
								fill
								loading="lazy"
							/>
						</AspectRatio>
					</div>
				:	null}

				<CardHeader>
					<CardTitle>{post.translation.title}</CardTitle>
					<CardDescription>{post.content.publishedAt ? formatDate(post.content.publishedAt) : null}</CardDescription>
				</CardHeader>

				<CardContent>
					<p className="text-muted-foreground line-clamp-2 text-sm">{post.translation.summary}</p>
				</CardContent>

				{/* Optional footer, e.g. tags or read time if you want */}
				<CardFooter className="flex flex-wrap gap-1">
					{post.content.tags.map((tag) => (
						<Badge key={tag.slug} variant="outline" className="text-xs">
							{tag.name}
						</Badge>
					))}
				</CardFooter>
			</Card>
		</Link>
	);
}
