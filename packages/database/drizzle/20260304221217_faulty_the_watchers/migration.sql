CREATE TABLE `content` (
	`id` varchar(36) PRIMARY KEY,
	`type_id` varchar(36) NOT NULL,
	`status_id` varchar(36) NOT NULL,
	`slug` varchar(191) NOT NULL,
	`locale` varchar(5) NOT NULL,
	`title` varchar(255) NOT NULL,
	`summary` text NOT NULL,
	`body` text NOT NULL,
	`image` varchar(255),
	`published_at` timestamp,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`reading_time` int,
	`featured` boolean NOT NULL DEFAULT false,
	`seo_title` varchar(255),
	`seo_description` text,
	`repo_url` varchar(255),
	`live_url` varchar(255),
	`year` int,
	CONSTRAINT `slug_locale_type_idx` UNIQUE INDEX(`slug`,`locale`,`type_id`)
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` varchar(36) PRIMARY KEY,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	CONSTRAINT `tag_slug_idx` UNIQUE INDEX(`slug`)
);
--> statement-breakpoint
CREATE TABLE `content_tags` (
	`content_id` varchar(36) NOT NULL,
	`tag_id` varchar(36) NOT NULL,
	CONSTRAINT PRIMARY KEY(`content_id`,`tag_id`)
);
--> statement-breakpoint
CREATE TABLE `content_statuses` (
	`id` varchar(36) PRIMARY KEY,
	`key` varchar(50) NOT NULL,
	`label` varchar(100) NOT NULL,
	CONSTRAINT `content_status_key_idx` UNIQUE INDEX(`key`)
);
--> statement-breakpoint
CREATE TABLE `content_types` (
	`id` varchar(36) PRIMARY KEY,
	`key` varchar(50) NOT NULL,
	`label` varchar(100) NOT NULL,
	CONSTRAINT `content_type_key_idx` UNIQUE INDEX(`key`)
);
--> statement-breakpoint
ALTER TABLE `content` ADD CONSTRAINT `content_type_id_content_types_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `content_types`(`id`);--> statement-breakpoint
ALTER TABLE `content` ADD CONSTRAINT `content_status_id_content_statuses_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `content_statuses`(`id`);--> statement-breakpoint
ALTER TABLE `content_tags` ADD CONSTRAINT `content_tags_content_id_content_id_fkey` FOREIGN KEY (`content_id`) REFERENCES `content`(`id`);--> statement-breakpoint
ALTER TABLE `content_tags` ADD CONSTRAINT `content_tags_tag_id_tags_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`);