import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";

import * as schema from "@/lib/db/schema";

export function getDb() {
  const { env } = getCloudflareContext();

  if (!env?.DB) {
    throw new Error("Cloudflare D1 바인딩(DB)을 찾지 못했습니다.");
  }

  return drizzle(env.DB, { schema });
}
