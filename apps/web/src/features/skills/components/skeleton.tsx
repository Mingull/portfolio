import { Skeleton } from "@mingull/ui/components/skeleton";

export function SkillsSkeleton() {
	return (
		<section className="pb-24" id="skills">
			<div className="mb-12">
				<Skeleton className="h-10 w-40" />
			</div>

			<ul className="containerize">
				{Array.from({ length: 6 }).map((_, i) => (
					<li key={i} className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border p-4 py-6 shadow-sm">
						<div className="flex w-full flex-col gap-4">
							<div className="bg-muted h-36 w-full rounded-lg">
								<Skeleton className="h-full w-full" />
							</div>
							<div className="flex flex-col items-center justify-center gap-2">
								<Skeleton className="h-5 w-24" />
								<Skeleton className="h-4 w-32" />
							</div>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}
