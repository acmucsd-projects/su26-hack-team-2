import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

type DB = SupabaseClient<Database>;

type Opts = { clubId?: string };

export async function getUpcomingEvents(db: DB, { clubId, limit }: Opts & { limit?: number } = {}) {
  let q = db
    .from("events")
    .select("*, club:clubs(name)")
    .gt("start_time", new Date().toISOString())
    .order("start_time", { ascending: true });
  if (clubId) q = q.eq("club_id", clubId);
  if (limit) q = q.limit(limit);
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

export async function getUpcomingEventsCount(db: DB, { clubId }: Opts = {}) {
  let q = db
    .from("events")
    .select("id", { count: "exact", head: true })
    .gt("start_time", new Date().toISOString());
  if (clubId) q = q.eq("club_id", clubId);
  const { count, error } = await q;
  if (error) throw error;
  return count ?? 0;
}

export async function getEventsInRange(db: DB, from: Date, to: Date, { clubId }: Opts = {}) {
  let q = db
    .from("events")
    .select("*, club:clubs(name)")
    .lt("start_time", to.toISOString())
    .gte("end_time", from.toISOString())
    .order("start_time", { ascending: true });
  if (clubId) q = q.eq("club_id", clubId);
  const { data, error } = await q;
  if (error) throw error;
  return data;
}
