"use client";

import { m } from "motion/react";

export const CloseIcon = () => (
	<m.svg
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0, transition: { duration: 0.05 } }}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="h-4 w-4 text-black"
	>
		<path d="M18 6L6 18M6 6l12 12" />
	</m.svg>
);
