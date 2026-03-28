export const containerVariants = {
	hidden: {},
	show: {
		transition: { staggerChildren: 0.2 },
	},
};

export const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0 },
};

export const calculateYearsOfExperience = (years: number): { years: number; months: number } => {
	const months = Math.round(years * 12);
	const y = Math.floor(months / 12);
	const m = months % 12;
	return { years: y, months: m };
};
