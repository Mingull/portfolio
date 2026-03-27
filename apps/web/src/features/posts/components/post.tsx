import { Link } from "@/i18n/navigation";
import { useFormatDate } from "@/lib/utils";
import { postsListItemContract } from "@mingull/contracts/posts";
import { AspectRatio } from "@mingull/ui/c/aspect-ratio";
import { Badge } from "@mingull/ui/c/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@mingull/ui/c/card";
import Image from "next/image";
import { z } from "zod";

export function PostItem({ post }: { post: z.infer<typeof postsListItemContract> }) {
	const formatDate = useFormatDate();
	return (
		<Link key={post.slug} href={{ pathname: "/posts/[slug]", params: { slug: post.slug } }} className="group" aria-label={`View post: ${post.title}`}>
			<Card className="relative overflow-hidden pt-0">
				{post.image ?
					<div className="relative mb-6 h-60">
						<AspectRatio ratio={16 / 9} className="overflow-hidden rounded-t-xl">
							<Image
								src={post.image}
								alt={post.title ?? ""}
								className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
								fill
								loading="lazy"
							/>
						</AspectRatio>
					</div>
				:	null}

				<CardHeader>
					<CardTitle>{post.title}</CardTitle>
					<CardDescription>{post.publishedAt ? formatDate(post.publishedAt) : null}</CardDescription>
				</CardHeader>

				<CardContent>
					<p className="text-muted-foreground line-clamp-2 text-sm">{post.summary}</p>
				</CardContent>

				{/* Optional footer, e.g. tags or read time if you want */}
				<CardFooter className="flex flex-wrap gap-1">
					{post.tags.map((tag) => (
						<Badge key={tag.slug} variant="outline" className="text-xs">
							{tag.name}
						</Badge>
					))}
				</CardFooter>
			</Card>
		</Link>
	);
}
