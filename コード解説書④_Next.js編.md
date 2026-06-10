# コード解説書④ ― Next.js編

> **このドキュメントのゴール**
> Next.js 完全初心者が、このサイトのコードを**読めるようになり**、最終的に**自分でNext.jsのページ/機能を書ける**ようになること。
>
> **進め方**：上から順に。各章は「①概念 → ②書き方 → ③このサイトの実例 → ④やってみよう」。
>
> **前提**：Reactの基礎（コンポーネント・JSX・state）が分かっていると理解が速い。
> 不安なら先に『③_React編』を読んでください。型は『②_TypeScript編』。
>
> ※「Nest.js」は別物（バックエンド専用フレームワーク）。本書は **Next.js** の解説です。

---

# 目次

- 第0章：Next.jsとは何か（Reactとの違い）
- 第1章：App Router とファイル規約（フォルダがそのままページ）
- 第2章：layout と page（額縁と中身）
- 第3章：サーバーコンポーネント vs クライアントコンポーネント（最重要）
- 第4章：レンダリング（SSG/SSR）とこのサイトの方式
- 第5章：next/image（画像の自動最適化）
- 第6章：メタデータAPI（SEO・SNSシェア）
- 第7章：next/font（フォント最適化）
- 第8章：Server Actions（サーバーで動く関数）
- 第9章：環境変数（NEXT_PUBLIC_ の有無）
- 第10章：CSS と Tailwind の読み込み
- 第11章：next.config.ts（全体設定）
- 第12章：Vercelへのデプロイ
- 第13章：実コードを読む（リクエスト→表示→保存の全体像）
- 第14章：自分で書いてみる（新ページ追加）
- 第15章：チートシート
- 付録：用語集

---

# 第0章：Next.jsとは何か

## 一言でいうと
**Next.js ＝ React に「実戦で必要な機能」を盛り込んだフレームワーク**。

Reactだけだと「画面の部品作り」はできても、次が自前になります：
- ページの切り替え（ルーティング）
- 表示の高速化（事前HTML生成）
- 画像最適化、SEO、サーバー処理…

Next.jsはこれらを**最初から用意**しています。だからインターン課題にも選ばれます。

## React と Next.js の関係
```
React        … UIを部品で作るライブラリ（土台）
  └ Next.js  … Reactを使い、ルーティング/最適化/サーバー機能を足したフレームワーク
```

> **覚え方**：React=「部品」、Next.js=「部品を本物のWebサイトに仕上げる仕組み一式」。

---

# 第1章：App Router とファイル規約

## App Routerとは
Next.js 13以降の仕組み。**`app/` フォルダのファイル配置が、そのままサイトの構造になる**。

## 特別なファイル名（規約）
| ファイル | 役割 |
|---------|------|
| `app/page.tsx` | そのフォルダの**ページ本体**（`/` に対応） |
| `app/layout.tsx` | 共通の**枠（額縁）**。ヘッダー等を配置 |
| `app/globals.css` | 全体CSS |
| `app/actions.ts` | （任意の名前）サーバー処理をまとめる場所 |

## フォルダ ＝ URL
```
app/page.tsx          → https://サイト/          （トップ）
app/about/page.tsx    → https://サイト/about      （もし作れば）
```
- フォルダを作って中に `page.tsx` を置くだけで、新しいURLのページになる。
- **ルーティング設定を書かなくていい**のがApp Routerの利点。

このサイトは**1ページ完結**なので `app/page.tsx` だけ（`/about` などは作らず、`#about` のページ内ジャンプで対応）。

### やってみよう①
`/contact` というURLのページを作るには、どこに何のファイルを置く？
<details><summary>答え</summary>`app/contact/page.tsx` を作る。</details>

---

# 第2章：layout と page（額縁と中身）

## 役割分担
- **`layout.tsx`** … 全ページ共通の「額縁」。`<html>`/`<body>`、Header/Footerを置く。
- **`page.tsx`** … その中に入る「絵」（ページごとの中身）。

## どうつながるか（`layout.tsx`）
```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>{children}</main>   {/* ← ここに page.tsx が入る */}
        <Footer />
      </body>
    </html>
  );
}
```
- `{children}` の位置に `page.tsx` の内容が**自動で差し込まれる**。
- だからどのページに行ってもHeader/Footerが共通表示される。

## このサイトの page.tsx
```tsx
export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
```
→ セクションを並べるだけ。`layout`(額縁)＋`page`(絵) の組み合わせで1ページが完成。

### やってみよう②
全ページのフッターに著作権表示を出したい。どのファイルを編集する？
<details><summary>答え</summary>`layout.tsx`（共通の額縁だから）。</details>

---

# 第3章：サーバーコンポーネント vs クライアントコンポーネント（最重要）

Next.jsで一番大事な概念。**部品が「どこで動くか」**の話です。

## 2種類の違い
| 種類 | どこで動く | `"use client"` | できること |
|------|-----------|---------------|-----------|
| **サーバーコンポーネント**（デフォルト） | サーバー(Vercel) | 不要 | 表示・データ取得 |
| **クライアントコンポーネント** | ブラウザ | **必要** | state・イベント(クリック/入力) |

## 判断基準（超シンプル）
> **`useState` や `onClick` などの「動き」を使う？**
> → **使う → クライアント（`"use client"` を付ける）**
> → 使わない（表示だけ）→ サーバー（何も付けない）

## このサイトの使い分け
| 部品 | 種類 | 理由 |
|------|------|------|
| `Header.tsx` | クライアント | メニュー開閉（useState） |
| `ContactSection.tsx` | クライアント | フォーム入力・送信（useState/イベント） |
| Hero / About / Skills / Projects / Footer | サーバー | 表示するだけ |

## なぜ分けるのか（メリット）
- クライアントにすると、その部品の**JavaScriptがブラウザにダウンロードされる**＝重くなる。
- **動きが要る部品だけ**クライアントにすれば、残りはサーバーで完結し**サイトが軽く・速く**なる。
- これがNext.jsの設計思想（必要な所だけクライアント化）。

## 書き方
```tsx
"use client";          // ← ファイルの一番上に書くだけ
import { useState } from "react";
```

### やってみよう③
「いいねボタン（押すと数が増える）」はどっち？理由も。
<details><summary>答え</summary>クライアント。useStateとonClick（動き）を使うから。`"use client"`が必要。</details>

---

# 第4章：レンダリング（SSG/SSR）とこのサイトの方式

「レンダリング」＝**HTMLをいつ・どこで作るか**の話。代表的な2つ：

| 方式 | 略 | いつHTMLを作る | 速さ | 向き |
|------|----|--------------|------|-----|
| 静的サイト生成 | **SSG** | **公開前(ビルド時)に作っておく** | 最速 | 内容が固定のページ |
| サーバーサイドレンダリング | SSR | アクセスのたびにサーバーで作る | 都度処理 | 毎回内容が変わるページ |

## このサイトはほぼ「SSG」
- 内容（経歴・スキル等）は固定なので、**公開前に完成HTMLを作っておける**＝速くて安定。
- `npm run build` の結果に `○ (Static)` と出ていたのがSSGの証拠。

## ビルドって何？
- `npm run build` =公開用に**最適化したファイル一式を生成**する作業。
- このときサーバーコンポーネントがHTMLに変換される（SSG）。
- Vercelはpushを受けると自動でこのビルドを実行して公開する（第12章）。

> **流れの全体像**：
> ビルド時にHTML作成(SSG) → ブラウザに即表示 → 動きのある部品だけ後からJSが起動(ハイドレーション)。

### やってみよう④
「毎分変わる株価ページ」はSSGとSSRどちらが向く？
<details><summary>答え</summary>SSR（毎回最新を作る必要があるため）。固定内容のポートフォリオはSSGが最適。</details>

---

# 第5章：next/image（画像の自動最適化）

## 普通の `<img>` との違い
`next/image` の `<Image>` は、置くだけで自動的に：
- **WebP変換**（軽い形式へ）
- **サイズに合わせてリサイズ**
- **遅延読み込み**（見えない画像は後回し）

## このサイトの実例（`HeroSection.tsx`）
```tsx
import Image from "next/image";

<Image
  src="/profile.jpg"      // public/ 内のファイルは "/ファイル名" で参照
  alt="戎居 繁秀のプロフィール画像"
  width={200}
  height={200}
  priority                // 最初に見える画像 → 先読みしてLCP改善
/>
```
- `src="/profile.jpg"` … `public/` フォルダのファイルはURL先頭 `/` で参照できる。
- `width`/`height` … レイアウトのガタつき防止のため必須。
- `priority` … 「最重要画像。先に読んで」。表示速度指標(LCP)が改善。
- `alt` … 画像の説明（読み上げ・SEO・画像表示失敗時に使う）。

### やってみよう⑤
`public/logo.png` を幅100で表示する `<Image>` は？
<details><summary>答え</summary>

```tsx
<Image src="/logo.png" alt="ロゴ" width={100} height={100} />
```
</details>

---

# 第6章：メタデータAPI（SEO・SNSシェア）

## メタデータとは
検索結果やSNSシェアで使う「ページの情報」（タイトル・説明・画像）。

## 書き方：`metadata` をexportするだけ
`layout.tsx`：
```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-site-project-puce.vercel.app"),
  title: "戎居 繁秀 | ポートフォリオ",
  description: "理学療法士からITエンジニアへ…",
  openGraph: {
    title: "戎居 繁秀 | ポートフォリオ",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    // ...
  },
};
```
- `metadata` という名前で export すると、**Next.jsが `<head>` タグを自動生成**。
  → 自分で `<head>` を書かないので、書き忘れ・ミスが減る。
- `title` … ブラウザタブ＆検索結果のタイトル。
- `description` … 検索結果の説明文。
- `openGraph` … LINE/X/Slackでシェアした時の**カード表示**。
- `metadataBase` … 画像の相対パス(`/og-image.png`)を**本番の絶対URLに変換**する基準。
  無いと本番でも `localhost` 基準になりSNS画像が出ない。

### やってみよう⑥
ブラウザタブのタイトルを変えたい。どのキーを編集する？
<details><summary>答え</summary>`metadata` の `title`。</details>

---

# 第7章：next/font（フォント最適化）

`layout.tsx`：
```tsx
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
```
- `next/font` を使うと、Googleフォントを**ビルド時に取り込み最適化**してくれる。
- 外部リクエストが減り、表示時のフォントのちらつき(レイアウトずれ)を防げる。
- `variable` でCSS変数として登録し、`<html className={geistSans.variable}>` で全体に適用。

→ 「フォントもNext.jsが最適化してくれる」とだけ覚えればOK。

---

# 第8章：Server Actions（サーバーで動く関数）

## これは何？
**ブラウザ(クライアント)から、サーバーで動く関数を直接呼べる**Next.jsの仕組み。
フォーム送信やDB保存など「サーバーでやるべき処理」に使う。

## 書き方：`"use server"`
`actions.ts`：
```tsx
"use server";   // ← このファイルの関数はサーバーで動く

import { createSupabaseServerClient } from "./lib/supabase";

export async function submitContact(input): Promise<...> {
  // サーバー側で検証 → Supabaseに保存
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("contacts").insert({ ... });
  if (error) return { ok: false, error: "..." };
  return { ok: true };
}
```

## クライアントから呼ぶ（`ContactSection.tsx`）
```tsx
import { submitContact } from "../actions";

const result = await submitContact(form);   // 普通の関数呼び出しに見えるが…
```
- 実際は裏側で **ブラウザ→サーバーのPOST通信**が自動で行われる。
- 通信コード(fetch等)を自分で書かなくていいのが利点。

## なぜサーバーでやるのか
- **鍵を隠せる**（DBの接続情報をブラウザに出さない）。
- **検証できる**（不正なデータをサーバー側で弾く）。
- 詳しい流れは解説書①の第5部、セキュリティの考え方は同①の5-3/5-4。

### やってみよう⑦
Server Actionを作るとき、ファイルの先頭に書く1行は？
<details><summary>答え</summary>`"use server";`</details>

---

# 第9章：環境変数（NEXT_PUBLIC_ の有無）

## 環境変数とは
鍵などの秘密情報を**コードに直書きせず**、外から渡す仕組み。`process.env.XXX` で読む。

## Next.js の超重要ルール：`NEXT_PUBLIC_`
| 変数名 | 読める場所 | 用途 |
|--------|-----------|------|
| `NEXT_PUBLIC_XXX` | **ブラウザ＋サーバー**（公開される） | 公開してよい値だけ |
| `XXX`（接頭辞なし） | **サーバーのみ**（隠れる） | 秘密の値 |

## このサイトの実例（`lib/supabase.ts`）
```tsx
const url = process.env.SUPABASE_URL;        // 接頭辞なし＝サーバー専用
const anonKey = process.env.SUPABASE_ANON_KEY;
```
- あえて `NEXT_PUBLIC_` を**付けず**、Server Action内でだけ使う＝より安全。

## 設定場所（2か所）
- ローカル：`.env.local`（Gitに上げない）
- 本番：Vercelの Environment Variables

### やってみよう⑧
「ブラウザのJSからも読みたい公開設定値」の変数名はどう付ける？
<details><summary>答え</summary>`NEXT_PUBLIC_` を先頭に付ける（例：`NEXT_PUBLIC_SITE_NAME`）。</details>

---

# 第10章：CSS と Tailwind の読み込み

- `app/globals.css` に Tailwind を読み込み、`layout.tsx` で `import "./globals.css";` して全体に適用。
- 各部品では `className="..."` にTailwindクラスを書くだけでデザインできる。
- Tailwindの使い方は解説書①の第6部に早見表あり。

```tsx
// layout.tsx
import "./globals.css";   // これで全ページにスタイルが効く
```

---

# 第11章：next.config.ts（全体設定）

```tsx
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ここに全体設定を書く（今は特になし） */
};

export default nextConfig;
```
- Next.js全体の挙動を設定するファイル。画像の許可ドメイン、実験機能のON/OFFなどを書く。
- このサイトは特別な設定不要なので**ほぼ空**。「設定の置き場所」とだけ覚えればOK。

---

# 第12章：Vercelへのデプロイ

## デプロイの流れ（このサイト）
```bash
git push origin main
```
これだけ。あとはVercelが自動で：
```
push を検知 → npm run build（SSGでHTML生成）→ 公開URLを更新
```

## 必要な準備
- VercelとGitHubリポジトリを連携（初回のみ）。
- **環境変数をVercelにも登録**（ローカルの`.env.local`とは別。第9章）。

> **要点**：「pushすれば本番が自動更新される」。これがNext.js×Vercelの強み。

### やってみよう⑨
コードを直して本番に反映したい。何をすればいい？
<details><summary>答え</summary>`git push origin main`。Vercelが自動でビルド＆デプロイする。</details>

---

# 第13章：実コードを読む（リクエスト→表示→保存の全体像）

このサイトで起きていることを通しで追います。

## ① 表示まで（SSG + サーバー/クライアント）
```
ユーザーがURLを開く
 → Vercelがビルド済みHTML(SSG)を即返す（Hero/About/Skills/Projects＝サーバー部品）
 → ブラウザ表示
 → Header・ContactSection（クライアント部品）のJSが起動（ハイドレーション）
   → メニュー開閉やフォーム入力が動くようになる
```

## ② フォーム送信まで（Server Action + 環境変数 + DB）
```
[ブラウザ] ContactSection(クライアント)
   submitContact(form) を呼ぶ
        ↓（Next.jsが自動でPOST通信）
[サーバー] actions.ts ("use server")
   process.env の鍵で Supabaseクライアント生成（鍵はブラウザに出ない）
   入力を検証 → contacts に insert
        ↓
[Supabase] RLSで「anonはINSERTのみ」を確認して保存
        ↓
   { ok: true } が返る → 画面が「送信しました」に切替（Reactのstate）
```

→ **Next.jsの主要機能（ファイル規約・サーバー/クライアント・SSG・Server Action・環境変数）が全部つながって**1つのサイトとして動いています。

---

# 第14章：自分で書いてみる（新ページ追加）

## 課題：`/thanks`（送信完了ページ）を作る
App Routerでは**フォルダ＋page.tsx**を足すだけ。

### ステップ1：ファイルを作る
```
app/thanks/page.tsx
```

### ステップ2：中身（サーバーコンポーネントでOK・表示だけ）
```tsx
export default function ThanksPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">送信ありがとうございました</h1>
    </main>
  );
}
```
→ これで `https://サイト/thanks` が表示できる。
- `"use client"` は不要（動きがない＝サーバーコンポーネント）。
- Header/Footerは `layout.tsx` のおかげで自動でつく。

### 力試し（解答なし）
このページに各セクションへ戻るリンク `<a href="/">トップへ戻る</a>` を足してみよう。
さらに「メタデータ」で `title: "送信完了"` を設定してみよう（第6章）。
ヒント：page.tsx でも `export const metadata = {...}` が書ける。

---

# 第15章：チートシート

```
■ ファイル規約（App Router）
app/page.tsx        … トップページ(/)
app/about/page.tsx  … /about
app/layout.tsx      … 共通の額縁（Header/Footer/metadata）
app/globals.css     … 全体CSS
app/actions.ts      … サーバー処理（"use server"）

■ サーバー or クライアント
動き(useState/onClick)あり → "use client" を先頭に（クライアント）
表示だけ → 何も付けない（サーバー＝デフォルト）

■ 画像
import Image from "next/image";
<Image src="/x.png" alt="" width={200} height={200} priority />

■ メタデータ（layout.tsx か page.tsx）
export const metadata = { title: "...", description: "...", openGraph: {...} };

■ Server Action
// actions.ts
"use server";
export async function doX(input) { /* サーバー処理 */ }
// 呼ぶ側： const r = await doX(data);

■ 環境変数
process.env.SECRET            … サーバー専用
process.env.NEXT_PUBLIC_XXX   … ブラウザにも公開

■ デプロイ
git push origin main          … Vercelが自動ビルド＆公開
```

---

# 付録：用語集（Next.js）

| 用語 | 意味 |
|------|------|
| **フレームワーク** | アプリ開発の土台・機能一式（Next.js） |
| **App Router** | `app/`配置がそのまま構造になる仕組み |
| **ルーティング** | URLとページの対応付け |
| **layout.tsx** | 全ページ共通の枠（額縁） |
| **page.tsx** | そのURLのページ本体 |
| **サーバーコンポーネント** | サーバーで動く部品（デフォルト） |
| **クライアントコンポーネント** | ブラウザで動く部品（"use client"） |
| **SSG** | ビルド時にHTMLを作る方式（高速） |
| **SSR** | アクセス毎にサーバーでHTML生成 |
| **ハイドレーション** | 表示後にJSが起動し操作可能になる工程 |
| **ビルド** | 公開用ファイルを生成する処理（npm run build） |
| **next/image** | 画像最適化コンポーネント |
| **メタデータAPI** | metadataをexportしてSEO情報を設定 |
| **OGP** | SNSシェア時のカード表示の仕組み |
| **Server Action** | クライアントから呼べるサーバー関数（"use server"） |
| **環境変数** | 秘密情報を外から渡す仕組み(process.env) |
| **NEXT_PUBLIC_** | ブラウザにも公開される環境変数の接頭辞 |
| **デプロイ** | 公開すること（Vercel） |

---

# 次のステップ
1. このサイトの `layout.tsx` / `page.tsx` / `actions.ts` を、本書の章と対応させて読む。
2. 第14章で `/thanks` ページを実際に作り、`npm run dev` で表示確認。
3. どの部品が「サーバー/クライアント」か、`"use client"` の有無で全ファイルを分類してみる。
4. 余裕があれば `node_modules/next/dist/docs/` の公式ドキュメント（このプロジェクト同梱）を覗く。

**ゴール再確認**：Next.jsは「**Reactに、ページ・最適化・サーバー機能を足したもの**」。
ファイル規約とサーバー/クライアントの使い分けが理解の core です。

---

*作成：2026年6月9日 ― Next.js完全初心者向け／このサイトの実コードを教材として*
