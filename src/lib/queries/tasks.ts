import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

type DB = SupabaseClient<Database>;
type Opts = { clubId?: string };

export type TaskStatus = "todo" | "in_progress" | "done";

function localDate(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// Pass the current user's id as assignedTo for the board's "Mine" toggle.
export async function getTasks(db: DB, { clubId, assignedTo }: Opts & { assignedTo?: string } = {}) {
  let q = db
    .from("tasks")
    .select("*")
    .order("due_date", { ascending: true, nullsFirst: false });
  if (clubId) q = q.eq("club_id", clubId);
  if (assignedTo) q = q.eq("assigned_to", assignedTo);
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

// PostgREST has no GROUP BY; fetch just the status column and count here.
export async function getTaskCounts(db: DB, { clubId }: Opts = {}) {
  let q = db.from("tasks").select("status");
  if (clubId) q = q.eq("club_id", clubId);
  const { data, error } = await q;
  if (error) throw error;
  const counts: Record<TaskStatus, number> = { todo: 0, in_progress: 0, done: 0 };
  for (const { status } of data) counts[status as TaskStatus]++;
  return counts;
}

// Open tasks due today through today + 6.
export async function getTasksDueThisWeek(db: DB, { clubId }: Opts = {}) {
  const today = new Date();
  const weekEnd = new Date(today);
  weekEnd.setDate(today.getDate() + 6);
  let q = db
    .from("tasks")
    .select("id", { count: "exact", head: true })
    .gte("due_date", localDate(today))
    .lte("due_date", localDate(weekEnd))
    .neq("status", "done");
  if (clubId) q = q.eq("club_id", clubId);
  const { count, error } = await q;
  if (error) throw error;
  return count ?? 0;
}
