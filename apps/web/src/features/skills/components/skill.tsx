"use client";

import { SetStateAction } from "react";
import { z } from "zod";
import { m } from "motion/react";
import { itemVariants } from "../utils";
import { skillContract } from "@mingull/contracts/skills";
import { buttonVariants } from "@mingull/ui/components/button";
import { cn } from "@mingull/ui/lib/utils";
import { useAsyncIcon } from "../hooks/use-async-icon";


export const Skill = ({
	setActive,
	id,
	...skill
}: z.infer<typeof skillContract> & {
	id: string;
	setActive: (value: SetStateAction<boolean | z.infer<typeof skillContract> | null>) => void;
}) => {
	const { IconComponent } = useAsyncIcon(skill.skill.icon);

	return (
		<m.li
			variants={itemVariants}
			animate="show"
			layoutId={`card-${skill.translation.name}-${id}`}
			onClick={() => setActive(skill)}
			className="item bg-card text-card-foreground dark:hover:bg-primary/5 dark:hover:text-primary-foreground hover:bg-primary/5 hover:border-primary focus-within:border-primary focus-within:bg-primary/5 flex cursor-pointer flex-col gap-6 rounded-xl border p-4 py-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
			aria-label="Click to view skill details"
			aria-labelledby={`title-${skill.translation.name}-${id}`}
			aria-describedby={`description-${skill.translation.summary}-${id}`}
		>
			<a href={`#${skill.translation.name}`} className="sr-only">
				{skill.translation.name} - {skill.translation.summary}
			</a>
			<div className="flex w-full flex-col gap-4">
				{IconComponent && (
					<m.div layoutId={`image-${skill.translation.name}-${id}`}>
						<IconComponent className="h-36 w-full rounded-lg object-cover object-top" />
					</m.div>
				)}
				<div className="flex flex-col items-center justify-center">
					<m.h3 layoutId={`title-${skill.translation.name}-${id}`} className="text-foreground text-center text-base font-medium">
						{skill.translation.name}
					</m.h3>
					<m.p layoutId={`description-${skill.translation.summary}-${id}`} className="text-muted-foreground text-center text-base">
						{skill.translation.summary}
					</m.p>
					<m.a
						layoutId={`cta-${skill.translation.ctaText}-${id}`}
						href={skill.translation.ctaLink}
						target="_blank"
						className={cn(buttonVariants({ size: "sm", className: "hidden" }))}
					>
						{skill.translation.ctaText}
					</m.a>
				</div>
			</div>
		</m.li>
	);
};
