CREATE TABLE `content` (
	`id` varchar(36) PRIMARY KEY,
	`type_key` char(50) NOT NULL,
	`status_key` char(50) NOT NULL,
	`default_locale` varchar(5) NOT NULL,
	`image` varchar(255),
	`reading_time` int,
	`featured` boolean NOT NULL DEFAULT false,
	`repo_url` varchar(255),
	`live_url` varchar(255),
	`year` int,
	`published_at` timestamp,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`created_at` timestamp NOT NULL DEFAULT (now())
);
--> statement-breakpoint
CREATE TABLE `content_statuses` (
	`key` varchar(50) PRIMARY KEY,
	`label` varchar(100) NOT NULL,
	CONSTRAINT `content_status_key_idx` UNIQUE INDEX(`key`)
);
--> statement-breakpoint
CREATE TABLE `content_tags` (
	`content_id` char(36) NOT NULL,
	`tag_id` varchar(36) NOT NULL,
	CONSTRAINT PRIMARY KEY(`content_id`,`tag_id`)
);
--> statement-breakpoint
CREATE TABLE `content_translations` (
	`id` varchar(36) PRIMARY KEY,
	`content_id` varchar(36) NOT NULL,
	`locale` varchar(5) NOT NULL,
	`slug` varchar(191) NOT NULL,
	`title` varchar(255) NOT NULL,
	`summary` text NOT NULL,
	`body` text NOT NULL,
	`seo_title` varchar(255),
	`seo_description` text,
	CONSTRAINT `content_locale_unique` UNIQUE INDEX(`content_id`,`locale`),
	CONSTRAINT `slug_locale_unique` UNIQUE INDEX(`slug`,`locale`)
);
--> statement-breakpoint
CREATE TABLE `content_types` (
	`key` varchar(50) PRIMARY KEY,
	`label` varchar(255) NOT NULL,
	CONSTRAINT `content_type_key_idx` UNIQUE INDEX(`key`)
);
--> statement-breakpoint
CREATE TABLE `skills` (
	`id` varchar(36) PRIMARY KEY,
	`default_locale` varchar(5) NOT NULL,
	`version` varchar(20) NOT NULL,
	`icon` varchar(100) NOT NULL,
	`experience_value` int NOT NULL DEFAULT 0,
	`experience_years` decimal(4,1) NOT NULL DEFAULT (0.0),
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `skill_translations` (
	`id` varchar(36) PRIMARY KEY,
	`skill_id` varchar(36) NOT NULL,
	`locale` varchar(5) NOT NULL,
	`name` varchar(100) NOT NULL,
	`summary` text NOT NULL,
	`content` text NOT NULL,
	`cta_text` varchar(255) NOT NULL,
	`cta_link` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` varchar(36) PRIMARY KEY,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	CONSTRAINT `tag_slug_idx` UNIQUE INDEX(`slug`)
);
--> statement-breakpoint
CREATE INDEX `content_status_idx` ON `content` (`status_key`);--> statement-breakpoint
CREATE INDEX `content_type_idx` ON `content` (`type_key`);--> statement-breakpoint
CREATE INDEX `content_translation_content_idx` ON `content_translations` (`content_id`);--> statement-breakpoint
ALTER TABLE `content` ADD CONSTRAINT `content_type_key_content_types_key_fkey` FOREIGN KEY (`type_key`) REFERENCES `content_types`(`key`);--> statement-breakpoint
ALTER TABLE `content` ADD CONSTRAINT `content_status_key_content_statuses_key_fkey` FOREIGN KEY (`status_key`) REFERENCES `content_statuses`(`key`);--> statement-breakpoint
ALTER TABLE `content_tags` ADD CONSTRAINT `content_tags_content_id_content_id_fkey` FOREIGN KEY (`content_id`) REFERENCES `content`(`id`);--> statement-breakpoint
ALTER TABLE `content_tags` ADD CONSTRAINT `content_tags_tag_id_tags_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`);--> statement-breakpoint
ALTER TABLE `content_translations` ADD CONSTRAINT `content_translations_content_id_content_id_fkey` FOREIGN KEY (`content_id`) REFERENCES `content`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `skill_translations` ADD CONSTRAINT `skill_translations_skill_id_skills_id_fkey` FOREIGN KEY (`skill_id`) REFERENCES `skills`(`id`);