import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import * as db from "./db";
import { z } from "zod";
import { isAuthorizedWorkspaceUser } from "./_core/access";

const pageButtonSchema = z.object({
  id: z.string().min(1).max(80),
  title: z.string().max(255),
  description: z.string().max(500),
  url: z.string().max(2000),
  event: z.string().max(64),
  tone: z.string().max(32),
});

const pageInputSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().trim().min(1).max(255),
  slug: z.string().trim().regex(/^[a-z0-9-]+$/).max(160),
  note: z.string().max(2000),
  description: z.string().max(2000),
  status: z.enum(["published", "draft"]),
  theme: z.string().max(32),
  accent: z.string().max(16),
  hero: z.string().url().max(2000),
  cta: z.string().max(255),
  ctaUrl: z.string().max(2000),
  buttons: z.array(pageButtonSchema).max(20),
  visits: z.number().int().nonnegative().default(0),
  clicks: z.number().int().nonnegative().default(0),
});

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => isAuthorizedWorkspaceUser(opts.ctx.user) ? opts.ctx.user : null),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  salePages: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const rows = await db.getSalePagesForOwner(ctx.user!.openId);
      return rows.map(row => ({ ...row, buttons: JSON.parse(row.buttons) }));
    }),
    bySlug: publicProcedure.input(z.object({ slug: z.string().trim().min(1).max(160) })).query(async ({ input }) => {
      const row = await db.getPublishedSalePageBySlug(input.slug);
      if (!row) return null;
      return { ...row, buttons: JSON.parse(row.buttons) };
    }),
    save: protectedProcedure.input(pageInputSchema).mutation(async ({ ctx, input }) => {
      const { id, buttons, ...rest } = input;
      const row = await db.saveSalePage(ctx.user!.openId, { ...rest, id, buttons: JSON.stringify(buttons) });
      if (!row) throw new Error("Unable to save sale page");
      return { ...row, buttons: JSON.parse(row.buttons) };
    }),
    remove: protectedProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ ctx, input }) => db.deleteSalePage(ctx.user!.openId, input.id)),
  }),
  orders: router({
    create: publicProcedure.input(z.object({
      pageId: z.number().int().positive().nullable().optional(),
      pageSlug: z.string().trim().min(1).max(160),
      customerName: z.string().trim().min(1).max(255),
      customerPhone: z.string().trim().min(6).max(40),
      shippingAddress: z.string().trim().min(8).max(2000),
      quantity: z.number().int().min(1).max(99),
      payment: z.enum(["cod", "transfer"]),
    })).mutation(({ input }) => {
      const orderId = `LNW-${Date.now().toString().slice(-8)}`;
      return db.createSalePageOrder({ ...input, pageId: input.pageId ?? null, orderId });
    }),
  }),
});

export type AppRouter = typeof appRouter;
