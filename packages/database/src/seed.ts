import { reset } from "drizzle-seed";
import { db, DBLike } from "./client";
import * as schema from "./schemas";
import { CONTENT_TYPES } from ".";

const TAG_IDS = {
	javascript: crypto.randomUUID(),
	typescript: crypto.randomUUID(),
	react: crypto.randomUUID(),
	nextjs: crypto.randomUUID(),
	nodejs: crypto.randomUUID(),
	drizzle: crypto.randomUUID(),
} as const;

const CONTENT_IDS = {
	postDrizzle: crypto.randomUUID(),
	postServerActions: crypto.randomUUID(),
	projectPortfolio: crypto.randomUUID(),
} as const;

const SKILL_IDS = {
	typescript: crypto.randomUUID(),
	nextjs: crypto.randomUUID(),
} as const;

function logStep(message: string) {
	console.log(`[seed] ${message}`);
}

async function main() {
	logStep("Starting database seeding...");
	const { tags, content, contentTypes, contentTags, contentStatuses, contentTranslations, skills, skillTranslations } = schema;
	logStep("Resetting database...");
	await reset(db, schema);

	logStep("Seeding tags...");
	await seedTags(db, tags);

	logStep("Seeding content types...");
	await seedContentTypes(db, contentTypes);

	logStep("Seeding content statuses...");
	await seedContentStatuses(db, contentStatuses);

	logStep("Seeding content...");
	await seedContent(db, content);

	logStep("Seeding content translations...");
	await seedContentTranslations(db, contentTranslations);

	logStep("Seeding content tags...");
	await seedContentTags(db, contentTags);

	logStep("Seeding skills...");
	await seedSkills(db, skills);

	logStep("Seeding skill translations...");
	await seedSkillTranslations(db, skillTranslations);
}

async function seedTags(db: DBLike, tags: typeof schema.tags) {
	await db.insert(tags).values([
		{ id: TAG_IDS.javascript, name: "JavaScript", slug: "javascript" },
		{ id: TAG_IDS.typescript, name: "TypeScript", slug: "typescript" },
		{ id: TAG_IDS.react, name: "React", slug: "react" },
		{ id: TAG_IDS.nextjs, name: "Next.js", slug: "nextjs" },
		{ id: TAG_IDS.nodejs, name: "Node.js", slug: "nodejs" },
		{ id: TAG_IDS.drizzle, name: "Drizzle ORM", slug: "drizzle" },
	]);
}

async function seedContentTypes(db: DBLike, contentTypes: typeof schema.contentTypes) {
	await db.insert(contentTypes).values([
		{ key: CONTENT_TYPES.POST, label: "Post" },
		{ key: CONTENT_TYPES.PROJECT, label: "Project" },
	]);
}

async function seedContentStatuses(db: DBLike, contentStatuses: typeof schema.contentStatuses) {
	await db.insert(contentStatuses).values([
		{ key: "DRAFT", label: "Draft" },
		{ key: "PUBLISHED", label: "Published" },
		{ key: "ARCHIVED", label: "Archived" },
	]);
}

async function seedContent(db: DBLike, content: typeof schema.content) {
	await db.insert(content).values([
		{
			id: CONTENT_IDS.postDrizzle,
			typeKey: CONTENT_TYPES.POST,
			statusKey: "PUBLISHED",
			defaultLocale: "en",
			image: "/images/posts/drizzle-zod.jpg",
			readingTime: 8,
			featured: true,
			publishedAt: new Date("2025-11-18T09:00:00Z"),
		},
		{
			id: CONTENT_IDS.postServerActions,
			typeKey: CONTENT_TYPES.POST,
			statusKey: "PUBLISHED",
			defaultLocale: "en",
			image: "/images/posts/server-actions.jpg",
			readingTime: 6,
			featured: false,
			publishedAt: new Date("2026-01-12T10:30:00Z"),
		},
		{
			id: CONTENT_IDS.projectPortfolio,
			typeKey: CONTENT_TYPES.PROJECT,
			statusKey: "PUBLISHED",
			defaultLocale: "en",
			image: "/images/projects/mingull-portfolio.jpg",
			featured: true,
			repoUrl: "https://github.com/mingull/mingull-portfolio",
			liveUrl: "https://mingull.dev",
			year: 2026,
			publishedAt: new Date("2026-02-03T14:00:00Z"),
		},
	]);
}

async function seedContentTranslations(db: DBLike, contentTranslations: typeof schema.contentTranslations) {
	await db.insert(contentTranslations).values([
		{
			id: crypto.randomUUID(),
			contentId: CONTENT_IDS.postDrizzle,
			locale: "en",
			slug: "drizzle-zod-date-handling",
			title: "Drizzle + Zod: Handle Date Fields Correctly",
			summary: "How to keep date fields type-safe from database to frontend contracts.",
			body: "In this post we map database timestamps into Date objects before schema validation, so API contracts remain stable and predictable.",
			seoTitle: "Drizzle Zod Date Handling",
			seoDescription: "Practical guide for handling timestamp fields with Drizzle and Zod.",
		},
		{
			id: crypto.randomUUID(),
			contentId: CONTENT_IDS.postDrizzle,
			locale: "nl",
			slug: "drizzle-zod-datumverwerking",
			title: "Drizzle + Zod: Datumvelden Correct Verwerken",
			summary: "Zo houd je datumvelden type-veilig van database tot frontend contracten.",
			body: "In dit artikel zetten we database timestamps om naar Date-objecten voor validatie, zodat API-contracten consistent blijven.",
			seoTitle: "Drizzle Zod Datumverwerking",
			seoDescription: "Praktische gids voor timestampvelden met Drizzle en Zod.",
		},
		{
			id: crypto.randomUUID(),
			contentId: CONTENT_IDS.postServerActions,
			locale: "en",
			slug: "nextjs-server-actions-patterns",
			title: "Practical Next.js Server Actions Patterns",
			summary: "Patterns for validation, error handling, and type-safe responses.",
			body: "Server Actions work best when validation and transport contracts are explicit. This article shares production-ready patterns.",
			seoTitle: "Next.js Server Actions Patterns",
			seoDescription: "Real-world Server Actions patterns for reliable Next.js apps.",
		},
		{
			id: crypto.randomUUID(),
			contentId: CONTENT_IDS.postServerActions,
			locale: "nl",
			slug: "nextjs-server-actions-patronen",
			title: "Praktische Patronen voor Next.js Server Actions",
			summary: "Patronen voor validatie, foutafhandeling en type-veilige responses.",
			body: "Server Actions werken het best met duidelijke validatie en contracten. Dit artikel laat productiepatronen zien.",
			seoTitle: "Next.js Server Actions Patronen",
			seoDescription: "Praktische Server Actions patronen voor betrouwbare Next.js apps.",
		},
		{
			id: crypto.randomUUID(),
			contentId: CONTENT_IDS.projectPortfolio,
			locale: "en",
			slug: "mingull-portfolio-platform",
			title: "Mingull Portfolio Platform",
			summary: "A multilingual portfolio built with a shared contracts-first architecture.",
			body: "This project combines Next.js, Drizzle, and a monorepo contract package to keep API and frontend types synchronized.",
			seoTitle: "Mingull Portfolio Project",
			seoDescription: "Case study of a multilingual portfolio architecture.",
		},
		{
			id: crypto.randomUUID(),
			contentId: CONTENT_IDS.projectPortfolio,
			locale: "nl",
			slug: "mingull-portfolio-platform-nl",
			title: "Mingull Portfolio Platform",
			summary: "Een meertalig portfolio met een gedeelde contracts-first architectuur.",
			body: "Dit project combineert Next.js, Drizzle en een monorepo met contracten om API- en frontend-types synchroon te houden.",
			seoTitle: "Mingull Portfolio Project",
			seoDescription: "Case study van een meertalige portfolio architectuur.",
		},
	]);
}

async function seedContentTags(db: DBLike, contentTags: typeof schema.contentTags) {
	await db.insert(contentTags).values([
		{ contentId: CONTENT_IDS.postDrizzle, tagId: TAG_IDS.typescript },
		{ contentId: CONTENT_IDS.postDrizzle, tagId: TAG_IDS.drizzle },
		{ contentId: CONTENT_IDS.postServerActions, tagId: TAG_IDS.nextjs },
		{ contentId: CONTENT_IDS.postServerActions, tagId: TAG_IDS.react },
		{ contentId: CONTENT_IDS.projectPortfolio, tagId: TAG_IDS.typescript },
		{ contentId: CONTENT_IDS.projectPortfolio, tagId: TAG_IDS.nodejs },
	]);
}

async function seedSkills(db: DBLike, skills: typeof schema.skills) {
	await db.insert(skills).values([
		{
			id: SKILL_IDS.typescript,
			defaultLocale: "en",
			version: "5.x",
			icon: "typescript",
			experienceValue: 9,
			experienceYears: "6.0",
			createdAt: new Date("2020-06-01T00:00:00Z"),
			updatedAt: new Date("2026-02-01T00:00:00Z"),
		},
		{
			id: SKILL_IDS.nextjs,
			defaultLocale: "en",
			version: "15.x",
			icon: "nextjs",
			experienceValue: 8,
			experienceYears: "4.5",
			createdAt: new Date("2021-02-01T00:00:00Z"),
			updatedAt: new Date("2026-02-01T00:00:00Z"),
		},
	]);
}

async function seedSkillTranslations(db: DBLike, skillTranslations: typeof schema.skillTranslations) {
	await db.insert(skillTranslations).values([
		{
			id: crypto.randomUUID(),
			skillId: SKILL_IDS.typescript,
			locale: "en",
			name: "TypeScript",
			summary: "Strong typing for scalable frontend and backend applications.",
			content: "Used daily in monorepo projects to enforce safe contracts across API and UI.",
			ctaText: "View TypeScript Projects",
			ctaLink: "/en/projects?tag=typescript",
		},
		{
			id: crypto.randomUUID(),
			skillId: SKILL_IDS.typescript,
			locale: "nl",
			name: "TypeScript",
			summary: "Sterke typing voor schaalbare frontend- en backendapplicaties.",
			content: "Dagelijks gebruikt in monorepo-projecten om veilige contracten tussen API en UI af te dwingen.",
			ctaText: "Bekijk TypeScript Projecten",
			ctaLink: "/nl/projects?tag=typescript",
		},
		{
			id: crypto.randomUUID(),
			skillId: SKILL_IDS.nextjs,
			locale: "en",
			name: "Next.js",
			summary: "Full-stack React framework for modern production websites.",
			content: "Built multilingual websites with server components, server actions, and SEO-focused rendering.",
			ctaText: "Explore Next.js Work",
			ctaLink: "/en/projects?tag=nextjs",
		},
		{
			id: crypto.randomUUID(),
			skillId: SKILL_IDS.nextjs,
			locale: "nl",
			name: "Next.js",
			summary: "Full-stack React framework voor moderne productiewebsites.",
			content: "Meertalige websites gebouwd met server components, server actions en SEO-gerichte rendering.",
			ctaText: "Bekijk Next.js Werk",
			ctaLink: "/nl/projects?tag=nextjs",
		},
	]);
}

// Run the seeding script
await main()
	.catch((error) => {
		console.error("Error occurred while seeding the database:", error);
	})
	.finally(() => {
		logStep("Database seeding completed.");
		// gracefully stop the process after seeding
		process.exit(0);
	});
