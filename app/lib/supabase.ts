import { createClient } from "@supabase/supabase-js";

// サーバー専用の Supabase クライアントを作る関数。
// 環境変数に NEXT_PUBLIC_ を付けていないので、これらの値はブラウザには一切渡らず
// サーバー（Server Action）の中だけで読める＝鍵を外部に晒さない。
export function createSupabaseServerClient() {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  // 環境変数の設定漏れを早期に検知する
  if (!url || !anonKey) {
    throw new Error(
      "Supabase の環境変数が未設定です（SUPABASE_URL / SUPABASE_ANON_KEY）"
    );
  }

  return createClient(url, anonKey);
}
