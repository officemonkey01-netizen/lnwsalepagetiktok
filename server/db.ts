import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertSalePage, InsertSalePageOrder, InsertUser, SalePage, salePageOrders, salePages, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    throw new Error("Database is not available");
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getSalePagesForOwner(ownerOpenId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  return db.select().from(salePages).where(eq(salePages.ownerOpenId, ownerOpenId)).orderBy(desc(salePages.updatedAt));
}

export async function getPublishedSalePageBySlug(slug: string) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const result = await db.select().from(salePages).where(and(eq(salePages.slug, slug), eq(salePages.status, "published"))).limit(1);
  return result[0];
}

export async function saveSalePage(ownerOpenId: string, input: Omit<InsertSalePage, "ownerOpenId"> & { id?: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const values: InsertSalePage = { ...input, ownerOpenId, id: undefined };
  delete (values as Partial<InsertSalePage>).id;
  if (input.id) {
    const existing = await db.select({ id: salePages.id }).from(salePages).where(and(eq(salePages.id, input.id), eq(salePages.ownerOpenId, ownerOpenId))).limit(1);
    if (existing[0]) {
      await db.update(salePages).set(values).where(and(eq(salePages.id, input.id), eq(salePages.ownerOpenId, ownerOpenId)));
      const updated = await db.select().from(salePages).where(eq(salePages.id, input.id)).limit(1);
      return updated[0];
    }
  }
  const inserted = await db.insert(salePages).values(values);
  const id = Number(inserted[0].insertId);
  const created = await db.select().from(salePages).where(eq(salePages.id, id)).limit(1);
  return created[0];
}

export async function deleteSalePage(ownerOpenId: string, id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.delete(salePages).where(and(eq(salePages.id, id), eq(salePages.ownerOpenId, ownerOpenId)));
  return { success: true } as const;
}

export async function createSalePageOrder(order: InsertSalePageOrder) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(salePageOrders).values(order);
  return { orderId: order.orderId } as const;
}
