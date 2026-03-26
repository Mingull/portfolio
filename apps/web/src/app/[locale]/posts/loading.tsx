import { Skeleton } from "@mingull/ui/components/skeleton";

export default function Loading() {
	return (
		<ul className="flex flex-col gap-8">
			{Array(4).map((_, i) => (
				<li key={i} className="border-border flex flex-col justify-between gap-x-4 gap-y-1 rounded border p-4 sm:flex-row">
					<div className="flex w-full max-w-lg gap-x-4">
						<div className="bg-muted relative h-18 min-w-28 overflow-hidden rounded">
							<Skeleton className="absolute inset-0" />
						</div>
						<div className="flex flex-1 flex-col">
							<Skeleton className="h-5 w-3/4" />
							<Skeleton className="mt-2 h-4 w-full" />
							<Skeleton className="mt-1 h-4 w-5/6" />
						</div>
					</div>
					<div className="mt-2 shrink-0 sm:mt-0 sm:ml-4">
						<Skeleton className="h-3.5 w-20" />
					</div>
				</li>
			))}
		</ul>
	);
}
