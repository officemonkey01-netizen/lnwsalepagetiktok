import { index, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const salePages = mysqlTable(
  "salePages",
  {
    id: int("id").autoincrement().primaryKey(),
    ownerOpenId: varchar("ownerOpenId", { length: 128 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 160 }).notNull(),
    note: text("note").notNull(),
    description: text("description").notNull(),
    status: mysqlEnum("status", ["published", "draft"]).default("draft").notNull(),
    theme: varchar("theme", { length: 32 }).notNull(),
    accent: varchar("accent", { length: 16 }).notNull(),
    hero: text("hero").notNull(),
    cta: varchar("cta", { length: 255 }).notNull(),
    ctaUrl: text("ctaUrl").notNull(),
    buttons: text("buttons").notNull(),
    visits: int("visits").default(0).notNull(),
    clicks: int("clicks").default(0).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => ({ ownerIdx: index("salePages_owner_idx").on(table.ownerOpenId), slugIdx: index("salePages_slug_idx").on(table.slug) }),
);

export type SalePage = typeof salePages.$inferSelect;
export type InsertSalePage = typeof salePages.$inferInsert;

export const salePageOrders = mysqlTable(
  "salePageOrders",
  {
    id: int("id").autoincrement().primaryKey(),
    orderId: varchar("orderId", { length: 40 }).notNull().unique(),
    pageId: int("pageId"),
    pageSlug: varchar("pageSlug", { length: 160 }).notNull(),
    customerName: varchar("customerName", { length: 255 }).notNull(),
    customerPhone: varchar("customerPhone", { length: 40 }).notNull(),
    shippingAddress: text("shippingAddress").notNull(),
    quantity: int("quantity").default(1).notNull(),
    payment: mysqlEnum("payment", ["cod", "transfer"]).default("cod").notNull(),
    status: mysqlEnum("status", ["pending_confirmation", "confirmed", "cancelled"]).default("pending_confirmation").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  table => ({ pageIdx: index("salePageOrders_page_idx").on(table.pageSlug), statusIdx: index("salePageOrders_status_idx").on(table.status) }),
);

export type SalePageOrder = typeof salePageOrders.$inferSelect;
export type InsertSalePageOrder = typeof salePageOrders.$inferInsert;
