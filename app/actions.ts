"use server";
// このファイルの関数はすべて「サーバー」で実行される（ブラウザには送られない）。
// クライアント（ContactSection）から呼び出すと、裏側でPOSTリクエストが飛んでサーバーで動く。

import { createSupabaseServerClient } from "./lib/supabase";

// フォームから受け取る入力の型
export type ContactInput = {
  name: string;
  email: string;
  message: string;
};

// 呼び出し側に返す結果の型（成功 or 失敗＋理由）
export type SubmitResult = { ok: true } | { ok: false; error: string };

export async function submitContact(
  input: ContactInput
): Promise<SubmitResult> {
  // ── サーバー側でも必ず入力を検証する ──
  // クライアント側の required 検証はブラウザの開発者ツール等で回避できるため、
  // 「最後の砦」としてサーバーでもチェックする（セキュリティの基本）。
  const name = input.name?.trim();
  const email = input.email?.trim();
  const message = input.message?.trim();

  if (!name || !email || !message) {
    return { ok: false, error: "すべての項目を入力してください。" };
  }
  // 簡易的なメール形式チェック（@ と . を含むか）
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { ok: false, error: "メールアドレスの形式が正しくありません。" };
  }
  if (message.length > 2000) {
    return { ok: false, error: "メッセージが長すぎます（2000文字以内）。" };
  }

  try {
    const supabase = createSupabaseServerClient();
    // contacts テーブルに1件追加する
    const { error } = await supabase
      .from("contacts")
      .insert({ name, email, message });

    if (error) {
      // 詳細はサーバーログにだけ出し、利用者には汎用メッセージを返す
      console.error("Supabase insert error:", error.message);
      return {
        ok: false,
        error: "送信に失敗しました。時間をおいて再度お試しください。",
      };
    }

    return { ok: true };
  } catch (e) {
    console.error("submitContact error:", e);
    return {
      ok: false,
      error: "送信に失敗しました。時間をおいて再度お試しください。",
    };
  }
}
