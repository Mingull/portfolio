import { getPosts } from "@/features/posts/actions/get-posts";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Posts } from "./posts";

export async function RecentPosts() {
	const locale = await getLocale();
	const t = await getTranslations("nav.posts");
	const { posts } = await getPosts(locale, 4);

	const isEmpty = posts.length === 0;

	return (
		<section className="pb-24" id="posts">
			<h2 className="title mb-10 text-center text-3xl font-bold sm:text-4xl md:text-start">{t("recent")}</h2>

			{isEmpty ?
				<p className="text-muted-foreground text-center">No recent posts to display</p>
			:	<Posts posts={posts ?? []} />}

			<div className="mt-10 text-center">
				<Link
					href="/posts"
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
