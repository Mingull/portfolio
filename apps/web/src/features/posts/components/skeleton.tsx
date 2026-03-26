import { Skeleton } from "@mingull/ui/components/skeleton";

export function PostsSkeleton() {
	return (
		<ul className="grid grid-cols-1 gap-10 sm:grid-cols-2">
			{Array.from({ length: 2 }).map((_, i) => (
				<li key={i} className="group relative">
					<div className="bg-muted relative h-64 w-full overflow-hidden rounded-lg sm:h-60">
						<Skeleton className="h-full w-full object-cover object-center" />
					</div>

					<div className="absolute inset-x-0 bottom-0 translate-y-2 px-6 py-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
						<Skeleton className="mb-2 h-6 w-2/3" />
						<Skeleton className="mb-1 h-4 w-full" />
						<Skeleton className="h-3 w-1/4" />
					</div>
				</li>
			))}
		</ul>
	);
}
