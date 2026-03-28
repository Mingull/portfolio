import { getPosts } from "@/features/posts/actions/get-posts";
import { Posts } from "@/features/posts/components/posts";
import { getLocale } from "next-intl/server";

export default async function PostsPage() {
	const locale = await getLocale();
	const { posts } = await getPosts(locale);

	return (
		<section className="py-24">
			<Posts posts={posts} />
		</section>
	);
}
