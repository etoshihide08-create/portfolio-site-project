# コード解説書② ― TypeScript編

> **このドキュメントのゴール**
> TypeScript 完全初心者が、このサイトのコードを**読めるようになり**、最終的に**自分で型付きコードを書ける**ようになること。
>
> **進め方**：上から順に読む。各章は「①概念 → ②書き方の型(かた) → ③このサイトの実例 → ④やってみよう」の流れ。
> ④の「やってみよう」を手を動かして試すと、定着が段違いに速いです。
>
> 姉妹編：実装全体の解説は『コード解説書.md』を参照。こちらは**TypeScriptの文法に特化**。

---

# 目次

- 第0章：TypeScriptとは何か（なぜ使うのか）
- 第1章：基本の型（string / number / boolean）
- 第2章：変数と「型注釈」vs「型推論」
- 第3章：オブジェクトの型と `type`（型に名前を付ける）
- 第4章：配列の型（`型[]`）
- 第5章：ユニオン型（`|`）とリテラル型
- 第6章：任意プロパティ（`?`）
- 第7章：関数の型（引数・戻り値・async/Promise）
- 第8章：ジェネリクス（`<>`）
- 第9章：型の絞り込み（Narrowing）
- 第10章：既製の型を借りる（React/Next.js）
- 第11章：`import type`
- 第12章：実コードをTypeScriptの目で読む（総復習）
- 第13章：自分で書いてみる（新セクション追加の実践）
- 第14章：エラーメッセージの読み方
- 第15章：チートシート（早見表）
- 付録：用語集

---

# 第0章：TypeScriptとは何か

## 一言でいうと

**TypeScript ＝ JavaScript ＋ 「型(かた)」**

JavaScript はそのままでは、こんなミスに気づけません：

```js
// JavaScript（型なし）
const age = "25";       // 文字列のつもり？ 数値のつもり？
const total = age + 1;  // "251" になる（文字列連結）← バグだが気づけない
```

TypeScript なら、**実行する前に**エディタが赤線で警告してくれます：

```ts
// TypeScript（型あり）
const age: number = "25";  // ❌ エラー：文字列を number に入れられない
```

## なぜ嬉しいのか（3つ）

1. **実行前にミスが見つかる** … バグが減る。
2. **コードが自己説明する** … 「このデータは何の形か」がコード自体に書いてある。
3. **エディタの補完が賢くなる** … `form.` と打つと `name / email / message` が候補に出る。

## 大事な前提：型は「実行時には消える」

TypeScript は最終的に**ただのJavaScriptに変換(コンパイル)されて動きます**。
型は「書いている間のチェック」専用で、ブラウザに届く頃には消えています。
→ 型は**開発者を守るための仕組み**であって、動作を重くするものではありません。

ファイル拡張子：JavaScript=`.js`、TypeScript=`.ts`、TypeScript+JSX(React)=`.tsx`。
このサイトの部品が `.tsx` なのは「TypeScript で React を書いている」からです。

---

# 第1章：基本の型

まず3つ覚えれば十分です。

| 型 | 意味 | 例 |
|----|------|----|
| `string` | 文字列 | `"戎居 繁秀"`, `"#about"` |
| `number` | 数値 | `200`, `1068` |
| `boolean` | 真偽（はい/いいえ） | `true`, `false` |

このサイトの実例（`HeroSection.tsx`）：
```tsx
<Image
  src="/profile.jpg"   // string
  width={200}          // number
  height={200}         // number
  priority             // boolean（true の意味）
/>
```

> **ポイント**：`width="200"`（文字列）と `width={200}`（数値）は別物。
> `{ }` で囲むと「JavaScriptの値」を渡せる。`next/image` の `width` は number 型なので `{200}` が正解。

### やってみよう①
次の値の型は何でしょう？
- `"理学療法士"` → ?
- `3` → ?
- `false` → ?

<details><summary>答え</summary>string / number / boolean</details>

---

# 第2章：変数と「型注釈」vs「型推論」

## 型注釈（自分で型を書く）

```ts
const name: string = "戎居";   // : string が「型注釈」
```

## 型推論（TypeScriptが自動で判断）

```ts
const name = "戎居";  // 値が "戎居"（文字列）なので、TSが勝手に string と判断
```

→ 多くの場合、**型注釈は省略できます**（TSが賢く推論する）。
このサイトでも、変数のほとんどは型注釈なし＝推論に任せています。

## どっちを使う？（実務の感覚）

| 場面 | どうする |
|------|---------|
| 値を見れば型が明らか | 省略（推論に任せる）：`const count = 0` |
| 配列やオブジェクトの「設計図」を固定したい | 型注釈を付ける：`const careers: Career[] = [...]` |
| 関数の引数 | **必ず付ける**（推論できないことが多い） |

### やってみよう②
`const tags = ["Python", "FastAPI"];` の型をTSは何と推論する？
<details><summary>答え</summary>`string[]`（文字列の配列）。第4章で詳しく。</details>

---

# 第3章：オブジェクトの型と `type`

## オブジェクトとは
複数の値を「名前付き」でまとめた入れ物：
```ts
const career = { period: "2026年1月〜現在", description: "インターン中" };
```

## その「形」を型にする
```ts
type Career = {
  period: string;
  description: string;
};
```
- `type 名前 = { ... }` で「**自分専用の型に名前を付ける**」（＝型エイリアス）。
- これで「Career型 ＝ period と description（両方string）を持つ」という設計図が完成。

## 使い方
```ts
const career: Career = {
  period: "2026年1月〜現在",
  description: "インターン中",
};

// ❌ description を書き忘れると即エラー
const bad: Career = { period: "2026年" };
//    ~~~ プロパティ 'description' がありません
```

このサイトの実例（`AboutSection.tsx`, `ContactSection.tsx`, `SkillsSection.tsx`, `ProjectsSection.tsx` すべてで使用）：
```ts
type FormState = {
  name: string;
  email: string;
  message: string;
};

type SkillGroup = {
  title: string;
  skills: string[];   // ← 文字列の配列（第4章）
};
```

> **命名のルール**：型名は**大文字始まり**にするのが慣習（`Career`, `Project`, `FormState`）。

### やってみよう③
「本(Book)」の型を作ってみよう。タイトル(string)とページ数(number)を持つ。
<details><summary>答え</summary>

```ts
type Book = {
  title: string;
  pages: number;
};
```
</details>

---

# 第4章：配列の型（`型[]`）

## 書き方
`型[]` で「その型が並んだ配列」：
```ts
const names: string[] = ["A", "B", "C"];   // 文字列の配列
const nums: number[] = [1, 2, 3];          // 数値の配列
const careers: Career[] = [ ... ];         // Career の配列
```

## このサイトの「型 + 配列 + map」パターン（最重要）
このサイトは**全セクションでこの形**を使っています。覚える価値が高い。

```ts
// ① 型を定義
type Career = { period: string; description: string };

// ② その型の配列でデータを用意
const careers: Career[] = [
  { period: "2026年1月〜現在", description: "..." },
  { period: "2025年10月〜2026年6月", description: "..." },
];

// ③ map で1つずつ画面に変換
careers.map((career) => (
  <li key={career.period}>{career.period}</li>
));
```

- **データ（②）と表示（③）が分かれている**ので、項目を増やすときは②に1行足すだけ。
- `Career[]` のおかげで、②で `description` を書き忘れると**その場でエラー**。

実例（`ProjectsSection.tsx`）では `string[]` も登場：
```ts
const internshipTasks: string[] = [
  "GEO・SEO記事作成",
  "お知らせ記事作成",
  // ...
];
```

### やってみよう④
第3章で作った `Book` 型を使って、本2冊の配列 `books` を作ってみよう。
<details><summary>答え</summary>

```ts
const books: Book[] = [
  { title: "TypeScript入門", pages: 320 },
  { title: "React実践", pages: 280 },
];
```
</details>

---

# 第5章：ユニオン型（`|`）とリテラル型

## ユニオン型 ＝「AまたはB」
```ts
type Id = string | number;   // 文字列 または 数値
let x: Id = "abc";  // OK
x = 123;            // OK
x = true;           // ❌ boolean はダメ
```

## リテラル型 ＝「特定の値そのもの」を型にする
```ts
type Answer = "yes" | "no";   // "yes" か "no" 以外は入れられない
```
- `string` は「どんな文字列でもOK」、`"yes" | "no"` は「**この2つだけ**」。
- タイプミスや想定外の値を**型レベルで禁止**できる。

## このサイトの実例（`ContactSection.tsx`）
```ts
type SubmitStatus = "idle" | "loading" | "success" | "error";
```
- 送信状態は必ずこの4つのどれか。
- `setStatus("succes")`（スペルミス）→ **即エラー**で気づける。

### やってみよう⑤
信号機の色だけを許す型 `Signal` を作ろう（赤・黄・青）。
<details><summary>答え</summary>

```ts
type Signal = "red" | "yellow" | "green";
```
</details>

---

# 第6章：任意プロパティ（`?`）

## 「あってもなくてもいい」プロパティ
```ts
type User = {
  name: string;
  nickname?: string;   // ? が付くと省略OK
};

const a: User = { name: "戎居" };                      // OK（nicknameなし）
const b: User = { name: "戎居", nickname: "えび" };    // OKもOK
```

## このサイトの実例（`ProjectsSection.tsx`）
```ts
type Project = {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;   // リポジトリがある制作物だけ
  siteUrl?: string;     // デモがある制作物だけ
};
```
- 「Sales List Builder」はリンクが無いので両方省略 → でも同じ `Project` 型でOK。

## 任意プロパティを使うときの注意
省略可能 ＝ `undefined`（無い）かもしれない。**使う前に存在チェック**：
```tsx
{project.githubUrl && <a href={project.githubUrl}>GitHub →</a>}
//  ↑ githubUrl があるときだけ <a> を表示
```

### やってみよう⑥
`Book` 型に「著者(author)」を**任意で**追加しよう。
<details><summary>答え</summary>

```ts
type Book = {
  title: string;
  pages: number;
  author?: string;
};
```
</details>

---

# 第7章：関数の型（引数・戻り値・async/Promise）

## 引数に型を付ける
```ts
function greet(name: string) {
  return "こんにちは、" + name;
}
greet("戎居");   // OK
greet(123);      // ❌ number はダメ
```
→ **引数の型は省略しないのが基本**（推論できないため）。

## 戻り値の型（省略可。書くと意図が明確）
```ts
function add(a: number, b: number): number {
  return a + b;
}                 // : number が「数値を返す」宣言
```

## 値を返さない関数 ＝ `void`
```ts
function logName(name: string): void {
  console.log(name);   // 何も return しない
}
```

## async関数は必ず `Promise<>` を返す
```ts
async function getData(): Promise<string> {
  return "データ";
}
```
- `async` を付けた関数の戻り値は自動的に「Promise（あとで結果が返る箱）」になる。
- 受け取る側は `await` で中身を取り出す：`const data = await getData();`

## このサイトの実例

`ContactSection.tsx`（引数に型）：
```ts
function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
  setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
}
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  // ...
}
```

`actions.ts`（引数＋戻り値の両方に型）：
```ts
export async function submitContact(input: ContactInput): Promise<SubmitResult> {
  // ...
  return { ok: true };
}
```
- 引数 `input` は `ContactInput` 型、戻り値は「Promiseに包まれた `SubmitResult`」。

### やってみよう⑦
2つの数値の大きい方を返す関数 `max` に型を付けよう。
<details><summary>答え</summary>

```ts
function max(a: number, b: number): number {
  return a > b ? a : b;
}
```
</details>

---

# 第8章：ジェネリクス（`<>`）

## 何のため？
「**入れ物の型は同じだけど、中身の型は使うときに決めたい**」ときに使う仕組み。
`<中身の型>` を渡します。

イメージ（配列も実はジェネリック）：
```ts
Array<string>   // = string[]
Array<number>   // = number[]
```

## このサイトの実例（`useState`）
```ts
const [form, setForm]     = useState<FormState>({ name: "", email: "", message: "" });
const [status, setStatus] = useState<SubmitStatus>("idle");
```
- `useState<FormState>` ＝「この状態の**中身は FormState 型**」と指定。
- これで `form.name`（string）が補完され、`form.age`（無いキー）はエラーになる。

`actions.ts` の `Promise<SubmitResult>` も「中身が SubmitResult のPromise」というジェネリクス。

> **見分け方**：関数や型のうしろに `<...>` が付いていたら、それはジェネリクス（中身の型指定）。

### やってみよう⑧
`useState` で「数値のカウンター」を作るとき、どう型を指定する？
<details><summary>答え</summary>

```ts
const [count, setCount] = useState<number>(0);
// （実は初期値 0 から number と推論されるので useState(0) でもOK）
```
</details>

---

# 第9章：型の絞り込み（Narrowing）

`if` などで条件を絞ると、**TSが自動で型を狭めてくれる**機能。これを理解すると一気に上級者っぽくなります。

## 例1：undefined を除外する（`lib/supabase.ts`）
```ts
const url = process.env.SUPABASE_URL;   // 型：string | undefined（無いかも）

if (!url || !anonKey) {
  throw new Error("...");               // 無ければここで処理終了
}

return createClient(url, anonKey);      // ここでは url は string 確定！
```
- 最初は「string か undefined か分からない」状態。
- `if` で undefined のケースを `throw` で断ち切ると、**それ以降は string だとTSが理解**する。

## 例2：ユニオンを判別する（`ContactSection.tsx` × `actions.ts`）
```ts
type SubmitResult = { ok: true } | { ok: false; error: string };

const result = await submitContact(form);
if (result.ok) {
  // ここでは result は { ok: true } 型（error は無い）
} else {
  setErrorMessage(result.error);   // 失敗側だけ error を持つので安全に使える
}
```
- `result.ok` の true/false を見るだけで、TSが「今どっちの形か」を判別。
- これは「**タグ付きユニオン（判別可能なユニオン）**」という頻出パターン。

### やってみよう⑨
`let v: string | undefined` のあと、`v` を `.toUpperCase()` する前に必要なチェックは？
<details><summary>答え</summary>

```ts
if (v) {              // undefined を除外
  v.toUpperCase();    // ここでは v は string
}
```
</details>

---

# 第10章：既製の型を借りる（React / Next.js）

型は全部自分で作らなくていい。ライブラリが用意した型を**借りられます**。

このサイトの実例：
```tsx
// layout.tsx
import type { Metadata } from "next";
export const metadata: Metadata = { title: "...", description: "..." };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) { ... }
```
- `Metadata` … Next.jsが用意した「ページ情報の形」。これに沿って書けば項目ミスを防げる。
- `React.ReactNode` … 「画面に表示できるもの全部」（文字・要素など）の型。
- `Readonly<{...}>` … 中身を**書き換え禁止**にするユーティリティ型。

```tsx
// ContactSection.tsx
e: React.FormEvent
e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
```
- フォームや入力イベントの型もReactが提供。自分で定義不要。

> **コツ**：`React.` や ライブラリ名 `.` のあとに続く大文字始まりは、たいてい「借りてきた型」。

---

# 第11章：`import type`

```ts
import type { Metadata } from "next";
import type { NextConfig } from "next";
```
- `import type` は「**型情報だけ**を読み込む」専用の書き方。
- 普通の `import` でも動くが、`import type` と書くと「これは型専用＝実行コードは持ち込まない」と明示でき、ビルドが少し効率的になる。
- 値（関数など）と型を区別する習慣がつくのでおすすめ。

---

# 第12章：実コードをTypeScriptの目で読む（総復習）

`actions.ts` を1行ずつ型の視点で読んでみましょう。

```ts
"use server";

import { createSupabaseServerClient } from "./lib/supabase";

// ① 入力の形を型で定義
export type ContactInput = {
  name: string;
  email: string;
  message: string;
};

// ② 戻り値の形（成功 or 失敗）をユニオンで定義
export type SubmitResult = { ok: true } | { ok: false; error: string };

// ③ 引数 ContactInput、戻り値 Promise<SubmitResult> の async 関数
export async function submitContact(
  input: ContactInput
): Promise<SubmitResult> {

  // ④ 任意の文字列メソッド。input.name は string なので .trim() が使える
  const name = input.name?.trim();
  const email = input.email?.trim();
  const message = input.message?.trim();

  // ⑤ 絞り込み：空なら早期return（ここで失敗の形を返す）
  if (!name || !email || !message) {
    return { ok: false, error: "すべての項目を入力してください。" };
  }

  // ⑥ DB保存。error はあるかもしれない → 次行で絞り込み
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("contacts").insert({ name, email, message });

  if (error) {
    return { ok: false, error: "送信に失敗しました…" };
  }
  return { ok: true };   // ⑦ 成功の形を返す
}
```

ここまでの全部（型エイリアス・ユニオン・任意・関数の型・Promise・絞り込み）が**1ファイルに凝縮**されています。読めれば合格点。

---

# 第13章：自分で書いてみる（新セクション追加の実践）

理解の総仕上げ。**「資格(Certifications)」セクションのデータ**を、このサイトの流儀で**自分で型から書いてみましょう**。

## ステップ1：型を定義する
資格は「名前(name)」と「取得年(year)」と、任意で「補足(note)」を持つとします。
```ts
type Certification = {
  name: string;
  year: number;
  note?: string;   // 任意
};
```

## ステップ2：その型の配列でデータを用意
```ts
const certifications: Certification[] = [
  { name: "理学療法士 国家資格", year: 2022 },
  { name: "基本情報技術者", year: 2026, note: "学習中" },
];
```

## ステップ3：map で表示（JSX）
```tsx
<ul>
  {certifications.map((cert) => (
    <li key={cert.name}>
      {cert.name}（{cert.year}年）
      {cert.note && ` ※${cert.note}`}   {/* note があるときだけ表示 */}
    </li>
  ))}
</ul>
```

これで「型 → 配列 → map」という**このサイト共通のパターンを自力で再現**できました。
既存の `AboutSection.tsx` / `SkillsSection.tsx` と全く同じ構造です。

> **TSが守ってくれること**：ステップ2で `year: "2022"`（文字列）と書くと即エラー。
> `name` を書き忘れてもエラー。**書いた瞬間にミスが分かる**のがTypeScriptの価値。

### 力試し（解答なし・自分で考える）
`Project` 型に「制作年(year: number)」を**任意で**追加し、`projects` 配列の1件に `year` を足してみよう。
他の件に足さなくてもエラーにならないことを確認（＝`?` の効果）。

---

# 第14章：エラーメッセージの読み方

TypeScriptのエラーは**怖がらず読めば味方**です。よく出る3つ：

### 1. プロパティの付け忘れ
```
プロパティ 'description' は型 '{ period: string; }' にありませんが、型 'Career' では必須です。
```
→ **必須プロパティを書き忘れている**。足せば直る。

### 2. 型が違う
```
型 'string' を型 'number' に割り当てることはできません。
```
→ 数値の場所に文字列を入れている。`"200"` → `200` に直す等。

### 3. undefinedかもしれない
```
オブジェクトは 'undefined' である可能性があります。
```
→ 任意プロパティ/環境変数を、存在チェックせず使っている。
→ `if (値) { ... }` や `値?.xxx`（オプショナルチェーン）で対処。

> **コツ**：エラーは「**どの型**が」「**どこで**」「**何を期待**して」いるかを言っている。
> その3点を拾えば原因はほぼ分かります。

---

# 第15章：チートシート（早見表）

```ts
// 基本の型
string / number / boolean

// 配列
string[]            // 文字列の配列
number[]            // 数値の配列
Career[]            // Career型の配列

// 型に名前を付ける
type Career = { period: string; description: string };

// 任意プロパティ
type P = { a: string; b?: string };   // b は省略OK

// ユニオン / リテラル
type Id = string | number;
type Status = "idle" | "loading" | "success" | "error";

// 関数
function f(x: number): string { return String(x); }
const g = (x: number): void => { console.log(x); };
async function h(): Promise<string> { return "x"; }

// ジェネリクス（中身の型を指定）
useState<FormState>({ ... });
Promise<SubmitResult>

// 絞り込み
if (value) { /* ここでは undefined ではない */ }
if (result.ok) { /* 成功の形 */ } else { /* 失敗の形 */ }

// 型だけ読み込む
import type { Metadata } from "next";
```

---

# 付録：用語集（TypeScript）

| 用語 | 意味 |
|------|------|
| **型(Type)** | 値の「形」の約束（string, number など） |
| **型注釈** | `名前: 型` と自分で型を書くこと |
| **型推論** | TSが値から自動で型を判断すること |
| **型エイリアス** | `type 名前 = ...` で型に名前を付けること |
| **プロパティ** | オブジェクトの中の項目（`name`, `email` など） |
| **任意プロパティ** | `?` 付き。省略してよい項目 |
| **ユニオン型** | `A | B`「AまたはB」 |
| **リテラル型** | `"yes"` など特定の値そのものの型 |
| **ジェネリクス** | `<型>` で中身の型を指定する仕組み |
| **Promise** | 非同期処理の「あとで返る結果の箱」 |
| **async / await** | 非同期処理を書く/結果を待つ構文 |
| **絞り込み(Narrowing)** | if等で型を狭めること |
| **コンパイル** | TS → JS への変換（型はここで消える） |
| **void** | 「何も返さない」関数の戻り値型 |
| **undefined** | 「値が無い」状態 |

---

# 次のステップ（自学のすすめ）

1. このサイトの各 `.tsx` を開き、**型の部分だけ**を目で追ってみる。
2. 第13章の「資格セクション」を実際に新しい部品として作ってみる（型→配列→map）。
3. わざと `year: "2022"` のように間違えて、**どんなエラーが出るか**を観察する（エラーと友達になる）。
4. 慣れたら公式ドキュメント「TypeScript Handbook」の基礎章へ。

**ゴール再確認**：型でデータの形を先に決め、間違いを実行前に潰す。これがTypeScriptの全て。
このサイトのコードは、その基本に忠実に作られています。

---

*作成：2026年6月9日 ― TypeScript完全初心者向け／このサイトの実コードを教材として*
