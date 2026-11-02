import { createClient } from "@supabase/supabase-js";

export function buatKoneksiServer() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error(
      "SUPABASE_URL dan SUPABASE_SECRET_KEY belum disetel di environment variable."
    );
  }

  // Bersihkan format URL jika ada akhiran /rest/v1 atau trailing slash
  const urlBersih = supabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");

  return createClient(urlBersih, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export const createServerClient = buatKoneksiServer;
export const getSupabaseServer = buatKoneksiServer;
