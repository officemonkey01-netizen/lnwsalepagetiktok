CREATE TABLE `salePageOrders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderId` varchar(40) NOT NULL,
	`pageId` int,
	`pageSlug` varchar(160) NOT NULL,
	`customerName` varchar(255) NOT NULL,
	`customerPhone` varchar(40) NOT NULL,
	`shippingAddress` text NOT NULL,
	`quantity` int NOT NULL DEFAULT 1,
	`payment` enum('cod','transfer') NOT NULL DEFAULT 'cod',
	`status` enum('pending_confirmation','confirmed','cancelled') NOT NULL DEFAULT 'pending_confirmation',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `salePageOrders_id` PRIMARY KEY(`id`),
	CONSTRAINT `salePageOrders_orderId_unique` UNIQUE(`orderId`)
);
--> statement-breakpoint
CREATE TABLE `salePages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerOpenId` varchar(128) NOT NULL,
	`name` varchar(255) NOT NULL,
	`slug` varchar(160) NOT NULL,
	`note` text NOT NULL,
	`description` text NOT NULL,
	`status` enum('published','draft') NOT NULL DEFAULT 'draft',
	`theme` varchar(32) NOT NULL,
	`accent` varchar(16) NOT NULL,
	`hero` text NOT NULL,
	`cta` varchar(255) NOT NULL,
	`ctaUrl` text NOT NULL,
	`buttons` text NOT NULL,
	`visits` int NOT NULL DEFAULT 0,
	`clicks` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `salePages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `salePageOrders_page_idx` ON `salePageOrders` (`pageSlug`);--> statement-breakpoint
CREATE INDEX `salePageOrders_status_idx` ON `salePageOrders` (`status`);--> statement-breakpoint
CREATE INDEX `salePages_owner_idx` ON `salePages` (`ownerOpenId`);--> statement-breakpoint
CREATE INDEX `salePages_slug_idx` ON `salePages` (`slug`);