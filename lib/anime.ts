import { createSupabaseBrowser } from "@/lib/supabase/browser";
import type { AnimeEntry } from "@/lib/types";

function toError(err: unknown, fallback = "알 수 없는 오류가 발생했습니다.") {
  if (err instanceof Error) return err;
  if (typeof err === "string") return new Error(err);
  try {
    return new Error(JSON.stringify(err));
  } catch {
    return new Error(fallback);
  }
}

export async function getMyAnimeEntries(): Promise<AnimeEntry[]> {
  const supabase = createSupabaseBrowser();
  const { data, error } = await supabase
    .from("anime_entries")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as AnimeEntry[];
}

export async function createAnimeEntry(input: {
  title: string;
  rating: number;
  comment: string;
  tags: string[];
  season: number;
  episode: number;
  total_episodes: number;
  image_url?: string | null;
}) {
  const supabase = createSupabaseBrowser();

  const { data: userData, error: authErr } = await supabase.auth.getUser();
  if (authErr) throw new Error(authErr.message);
  const user = userData.user;
  if (!user) throw new Error("로그인이 필요합니다.");

  const { error } = await supabase.from("anime_entries").insert({
    user_id: user.id,
    title: input.title,
    rating: input.rating,
    comment: input.comment,
    tags: input.tags,
    season: input.season,
    episode: input.episode,
    total_episodes: input.total_episodes,
    image_url: input.image_url ?? null,
  });

  if (error) throw new Error(error.message);
}

export async function updateAnimeEntry(
  id: string,
  input: Partial<Omit<AnimeEntry, "id" | "user_id" | "created_at" | "updated_at">>
) {
  const supabase = createSupabaseBrowser();
  const { error } = await supabase.from("anime_entries").update(input).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteAnimeEntry(id: string) {
  const supabase = createSupabaseBrowser();
  const { error } = await supabase.from("anime_entries").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
