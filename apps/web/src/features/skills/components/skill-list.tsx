"use client";

import { skillContract } from "@mingull/contracts/skills";
import { buttonVariants } from "@mingull/ui/components/button";
import { useClickOutside } from "@mingull/ui/hooks/use-click-outside";
import { AnimatePresence, m } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import { z } from "zod";
import { calculateYearsOfExperience, containerVariants } from "../utils";
import { useAsyncIcon } from "../hooks/use-async-icon";
import { CloseIcon } from "./close-icon";
import { Skill } from "./skill";
import "./skill.css";

export function SkillList({ skills }: { skills: z.infer<typeof skillContract>[] }) {
	const [active, setActive] = useState<z.infer<typeof skillContract> | boolean | null>(null);
	const id = useId();
	const ref = useRef<HTMLDivElement>(null);
	const t = useTranslations("nav.skills");
	const isActiveSkill = active && typeof active === "object";
	const { IconComponent: ActiveIcon } = useAsyncIcon(isActiveSkill ? active.skill.icon : undefined);

	useClickOutside(ref, () => setActive(null));

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setActive(false);
		window.addEventListener("keydown", onKeyDown);

		const previousOverflow = document.body.style.overflow;

		if (isActiveSkill) {
			document.body.style.overflow = "hidden";
		}

		return () => {
			window.removeEventListener("keydown", onKeyDown);
			document.body.style.overflow = previousOverflow;
		};
	}, [isActiveSkill]);

	return (
		<section className="pb-24" id="skills">
			<h2 className="title mb-12">{t("title")}</h2>

			{/* Overlay */}
			<AnimatePresence>
				{isActiveSkill && <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />}
			</AnimatePresence>
			<AnimatePresence>
				{isActiveSkill ?
					<div className="fixed inset-0 z-100 grid place-items-center">
						<m.button
							key={`button-${active.translation.name}-${id}`}
							layout
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0, transition: { duration: 0.05 } }}
							className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white lg:hidden"
							onClick={() => setActive(null)}
						>
							<CloseIcon />
						</m.button>

						<m.div
							layoutId={`card-${active.translation.name}-${id}`}
							ref={ref}
							className="bg-card flex h-full w-full max-w-125 flex-col overflow-hidden pt-6 sm:rounded-3xl md:h-fit md:max-h-[90%]"
						>
							<m.div layoutId={`image-${active.translation.name}-${id}`}>
								<ActiveIcon className="h-80 w-full object-cover object-top sm:rounded-tl-lg sm:rounded-tr-lg lg:h-96" />
							</m.div>
							<div>
								<div className="flex items-start justify-between p-4">
									<div>
										<m.h3 layoutId={`title-${active.translation.name}-${id}`} className="dark:text-foreground text-base font-medium text-neutral-700">
											{active.translation.name}
										</m.h3>
										<m.p layoutId={`description-${active.translation.summary}-${id}`} className="dark:text-muted-foreground text-base text-neutral-600">
											{active.translation.summary}
										</m.p>
										<m.p layout className="dark:text-muted-foreground text-sm text-neutral-600">
											{t.rich("version", { version: active.skill.version, strong: (chunks) => <strong>{chunks}</strong> })}
										</m.p>
										<m.p layout className="dark:text-muted-foreground text-sm text-neutral-600">
											{t.rich("experience", { ...calculateYearsOfExperience(active.skill.experienceYears), strong: (chunks) => <strong>{chunks}</strong> })}
										</m.p>
									</div>
									<m.a
										layoutId={`cta-${active.translation.ctaText}-${id}`}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										href={active.translation.ctaLink}
										target="_blank"
										className={buttonVariants({ size: "sm" })}
									>
										{active.translation.ctaText}
									</m.a>
								</div>
								<div className="relative px-4 pt-4">
									<m.div
										layout
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className="flex h-40 flex-col items-start gap-4 overflow-auto pb-10 text-xs text-neutral-600 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] md:h-fit md:text-sm lg:text-base dark:text-neutral-400"
									>
										{active.translation.content}
									</m.div>
								</div>
							</div>
						</m.div>
					</div>
				:	null}
			</AnimatePresence>

			{/* Skills List */}
			{skills ?
				<m.ul variants={containerVariants} initial="hidden" animate="show" className="containerize">
					{skills.map((skill) => (
						<Skill key={skill.translation.name} {...skill} setActive={setActive} id={id} />
					))}
				</m.ul>
			:	<p className="text-muted-foreground text-center">Loading skills...</p>}
		</section>
	);
}
