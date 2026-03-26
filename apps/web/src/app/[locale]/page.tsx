import { Hero } from "@/components/hero-section";
import { Skills } from "@/features/skills/components/skills";
import { RecentPosts } from "@/features/posts/components/recent-posts";
import { PostsSkeleton } from "@/features/posts/components/skeleton";
import { Suspense } from "react";
import { SkillsSkeleton } from "@/features/skills/components/skeleton";

export default async function Home() {
	return (
		<section className="py-24">
			{/*py-6">*/}
			<div className="container mx-auto max-w-2xl px-8 md:max-w-5xl">
				{/* <Intro /> */}
				<Hero />

				<Suspense fallback={<SkillsSkeleton />}>
					<Skills />
				</Suspense>
				{/* <Suspense fallback={<ProjectsSkeleton />}>
					<RecentProjects />
				</Suspense> */}
				<Suspense fallback={<PostsSkeleton />}>
					<RecentPosts />
				</Suspense>

				{/* <GlowingEffectDemoSecond /> */}

				{/* <NewsletterForm /> */}
			</div>
		</section>
	);
}
