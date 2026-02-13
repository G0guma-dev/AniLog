// lib/supabase/server.ts
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/lib/database.types";

export async function createSupabaseServer() {
  // ✅ Next 최신: cookies()는 Promise
  const cookieStore = await cookies();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createServerClient<Database>(url, anon, {
    cookies: {
      // ✅ @supabase/ssr 최신 타입: getAll / setAll
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            // options는 그대로 전달하면 됨
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Component 등에서 set이 막힐 수 있어서 안전하게 무시
        }
      },
    },
  });
}
