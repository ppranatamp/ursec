import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function buatKoneksiAdmin() {
  const cookieStore = await cookies();
  const supabaseUrl = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !publishableKey) {
    throw new Error(
      "SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY belum disetel di environment variable."
    );
  }

  const urlBersih = supabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");

  return createServerClient(urlBersih, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // setAll dipanggil saat render Server Component
        }
      },
    },
  });
}

export const createAdminClient = buatKoneksiAdmin;

