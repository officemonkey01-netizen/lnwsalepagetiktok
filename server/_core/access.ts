import type { User } from "../../drizzle/schema";
import { ENV } from "./env";

const authorizedEmails = new Set(
  (process.env.AUTHORIZED_EMAILS ?? "gersaktaemao456@gmail.com")
    .split(",")
    .map(email => email.trim().toLowerCase())
    .filter(Boolean),
);

export function isAuthorizedWorkspaceUser(user: User | null | undefined) {
  if (!user) return false;
  if (user.role === "admin") return true;
  if (ENV.ownerOpenId && user.openId === ENV.ownerOpenId) return true;
  return Boolean(user.email && authorizedEmails.has(user.email.trim().toLowerCase()));
}

export function getAuthorizedWorkspaceEmails() {
  return [...authorizedEmails];
}
