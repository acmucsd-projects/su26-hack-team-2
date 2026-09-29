import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

type DB = SupabaseClient<Database>;

export async function getBoardMembers(db: DB, clubId: string) {
  const { data, error } = await db
    .from("club_members")
    .select("role, created_at, user:users(id, first_name, last_name)")
    .eq("club_id", clubId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data;
}
