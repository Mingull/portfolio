import { Skeleton } from "@mingull/ui/components/skeleton";

export default function LoadingProjects() {
	return (
		<ul className="grid grid-cols-1 gap-8 sm:grid-cols-2">
			{Array.from({ length: 4 }).map((_, i) => (
				<li key={i} className="group relative">
					<div className="bg-muted h-72 w-full overflow-hidden sm:h-60">
						<Skeleton className="rounded-lg object-cover object-center transition-transform duration-500 group-hover:scale-105" />
					</div>

					<div className="bg-background/70 absolute inset-px rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
					<div className="absolute inset-x-0 bottom-0 translate-y-2 px-6 py-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
						<Skeleton className="title line-clamp-1 text-xl no-underline" />
						<Skeleton className="to-muted-foreground line-clamp-1 text-sm" />
						<Skeleton className="text-muted-foreground text-xs font-light" />
					</div>
				</li>
			))}
		</ul>
	);
}
