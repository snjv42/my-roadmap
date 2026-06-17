import { supabase } from "./supabase.js";

export const STORAGE_KEY = "sanjiv_roadmap";

export async function loadLocalProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export function saveLocalProgress(checked) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  } catch {}
}

export async function fetchRemoteProgress(userId) {
  const { data, error } = await supabase
    .from("roadmap_progress")
    .select("checked")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return data?.checked ?? null;
}

export async function upsertRemoteProgress(userId, checked) {
  const { error } = await supabase.from("roadmap_progress").upsert({
    user_id: userId,
    checked,
    updated_at: new Date().toISOString(),
  });

  if (error) throw error;
}
