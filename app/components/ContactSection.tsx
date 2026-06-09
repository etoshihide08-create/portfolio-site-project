"use client";
// フォームは入力・送信というユーザー操作（イベント）を扱うため "use client" が必要

import { useState } from "react";
import { submitContact } from "../actions";

// フォームの入力値を管理する型
type FormState = {
  name: string;
  email: string;
  message: string;
};

// 送信状態の型
type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  // フォームの各入力値をまとめてオブジェクトで管理
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });

  // 送信状態を管理（idle=未送信, loading=送信中, success=成功, error=失敗）
  const [status, setStatus] = useState<SubmitStatus>("idle");

  // サーバーから返ってきたエラーメッセージを表示するための状態
  const [errorMessage, setErrorMessage] = useState("");

  // 入力フィールドが変わるたびに呼ばれる汎用ハンドラ
  // e.target.name でどのフィールドかを識別し、スプレッド構文で更新する
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // フォーム送信ハンドラ
  async function handleSubmit(e: React.FormEvent) {
    // ブラウザのデフォルトのページリロードを止める
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Server Action を呼び出す（裏側でサーバーに送られ、Supabaseへ保存される）
    const result = await submitContact(form);

    if (result.ok) {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } else {
      // サーバーが返した理由を表示する
      setErrorMessage(result.error);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-24 px-4">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">
          Contact
        </h2>
        <p className="text-center text-gray-500 mb-12">
          お気軽にご連絡ください
        </p>

        {/* grid md:grid-cols-2 でPC以上はフォームとリンクを横並びに */}
        <div className="grid md:grid-cols-2 gap-12">

          {/* お問い合わせフォーム */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              フォームから送る
            </h3>

            {/* status が success のときは感謝メッセージを表示 */}
            {status === "success" ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <p className="text-green-700 font-medium">
                  送信しました。ありがとうございます！
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    お名前
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                    placeholder="山田 太郎"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    メールアドレス
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    メッセージ
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900 resize-none"
                    placeholder="メッセージを入力してください"
                  />
                </div>

                {/* error のときはサーバーから返ったエラー理由を表示 */}
                {status === "error" && (
                  <p className="text-red-600 text-sm">
                    {errorMessage || "送信に失敗しました。もう一度お試しください。"}
                  </p>
                )}

                {/* disabled で二重送信を防ぐ */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "送信中..." : "送信する"}
                </button>
              </form>
            )}
          </div>

          {/* 連絡先リンク */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              その他の連絡先
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://github.com/etoshihide08-create"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors group"
                >
                  {/* GitHub の SVG アイコン（外部ライブラリなしでインライン埋め込み） */}
                  <svg
                    className="w-6 h-6 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="group-hover:underline underline-offset-2">
                    github.com/etoshihide08-create
                  </span>
                </a>
              </li>
              <li className="text-gray-500 text-sm pl-9">
                ※ メールアドレスはフォームよりご連絡ください
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
