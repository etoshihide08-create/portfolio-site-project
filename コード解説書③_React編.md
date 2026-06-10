# コード解説書③ ― React編

> **このドキュメントのゴール**
> React 完全初心者が、このサイトのコードを**読めるようになり**、最終的に**自分でReactの部品(コンポーネント)を書ける**ようになること。
>
> **進め方**：上から順に。各章は「①概念 → ②書き方の型(かた) → ③このサイトの実例 → ④やってみよう」。
> ④を手を動かして試すと定着が段違い。
>
> 姉妹編：『コード解説書.md』(全体)、『②_TypeScript編』(型)、『④_Next.js編』(フレームワーク)。
> こちらは **React の考え方と文法**に特化。型(TypeScript)が分からない箇所は②を参照。

---

# 目次

- 第0章：Reactとは何か（なぜ使うのか）
- 第1章：コンポーネント（画面を「部品」で作る）
- 第2章：JSX（JavaScriptの中にHTMLを書く）
- 第3章：`{ }` で値やJavaScriptを埋め込む
- 第4章：props（親から子へデータを渡す）
- 第5章：リスト表示（map と key）
- 第6章：条件分岐の表示（&& と 三項演算子）
- 第7章：state（コンポーネントが覚える値）useState
- 第8章：イベント（クリック・入力・送信）
- 第9章：制御コンポーネント（フォーム入力の仕組み）
- 第10章：再レンダリングの仕組み（Reactの心臓部）
- 第11章：Fragment（`<> </>`）
- 第12章：Hooksのルールと "use client"
- 第13章：実コードを読む（Header / ContactSection 総復習）
- 第14章：自分で書いてみる（カウンター & 新部品）
- 第15章：チートシート
- 付録：用語集

---

# 第0章：Reactとは何か

## 一言でいうと
**React ＝ 画面を「部品(コンポーネント)」の組み合わせで作るための道具**（ライブラリ）。

ボタン、ヘッダー、セクション…を**小さな部品に分けて作り、組み合わせて**1ページにします。
このサイトも `HeroSection`, `AboutSection`, `Header`… という部品の集まりです。

## Reactの2大特徴

### 1. 宣言的（declarative）
「**どういう状態なら画面はこう見える**」を書くと、Reactが描画を担当する。
DOMを手で書き換えない（`document.getElementById(...)` 等を自分でやらない）。

```
（昔のやり方）開いたら手動でメニューを表示する処理を書く
（React）   「isOpen が true ならメニューを表示」と書くだけ → あとはReactが反映
```

### 2. コンポーネント指向
部品ごとに分けるので、**再利用・修正・理解がしやすい**。

> **覚え方**：Reactは「**状態(state)が変わると、画面を自動で描き直す**」エンジン。

---

# 第1章：コンポーネント

## コンポーネントとは
**JSX（画面）を返す関数**のこと。これがReactの最小単位。

```tsx
export default function HeroSection() {
  return (
    <section>...</section>   // ← JSX を返す
  );
}
```

## ルール3つ
1. **名前は大文字始まり**（`HeroSection`、`Header`）。小文字だとHTMLタグと区別できない。
2. **JSXを1つ返す**（`return` する）。
3. 使うときは **タグのように** 書く：`<HeroSection />`

## このサイトの実例（`page.tsx`）
```tsx
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      {/* ... */}
    </>
  );
}
```
- `Home` というコンポーネントが、他のコンポーネントを**並べて**いる。
- 各部品は `components/` フォルダに別ファイルで定義 → `import` で読み込む。

### やってみよう①
「`Hello` という名前で、`<p>こんにちは</p>` を返すコンポーネント」を書いてみよう。
<details><summary>答え</summary>

```tsx
function Hello() {
  return <p>こんにちは</p>;
}
```
</details>

---

# 第2章：JSX

## JSXとは
**JavaScriptの中にHTMLのような書き方ができる**記法。`.tsx` ファイルで使える。

```tsx
return <h1 className="text-4xl">戎居 繁秀</h1>;
```

## HTMLとの違い（重要）
| HTML | JSX | 理由 |
|------|-----|------|
| `class="..."` | **`className="..."`** | `class` はJSの予約語のため |
| `<img>` | `<img />`（閉じる） | JSXは閉じタグ必須 |
| `onclick` | `onClick`（キャメルケース） | JSの命名規則に合わせる |
| `for="..."`（label） | `htmlFor="..."` | 同上 |

このサイトの実例（`HeroSection.tsx`）：
```tsx
<h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
  戎居 繁秀
</h1>
```
`className` に書いているのはTailwindのクラス（デザイン）。詳細は解説書①の第6部。

## JSXのルール：返せる要素は「1つ」だけ
```tsx
// ❌ 2つ並べて返せない
return <h1>A</h1><p>B</p>;

// ✅ 1つで囲む（divか、次章のFragment）
return <div><h1>A</h1><p>B</p></div>;
```

### やってみよう②
HTMLの `<button class="btn" onclick="...">` をJSXに直すと？
<details><summary>答え</summary>`<button className="btn" onClick={...}>`</details>

---

# 第3章：`{ }` で値やJavaScriptを埋め込む

JSXの中で **`{ }`** を使うと、JavaScriptの値・式を埋め込めます。

```tsx
const name = "戎居";
return <h1>{name}</h1>;          // → 戎居

return <p>{1 + 2}</p>;           // → 3

return <Image width={200} />;    // 数値を渡す（"200"ではなく 200）
```

## このサイトの実例（`AboutSection.tsx`）
```tsx
<p className="font-semibold">{career.period}</p>
<p className="text-gray-600">{career.description}</p>
```
- `{career.period}` で、オブジェクトの値を画面に表示している。

> **使い分け**：
> 文字そのまま → `width="200"`（文字列属性）
> JSの値 → `width={200}`（中括弧）

### やってみよう③
`const year = 2026;` のとき、「<p>2026年</p>」を表示するJSXは？
<details><summary>答え</summary>

```tsx
<p>{year}年</p>
```
</details>

---

# 第4章：props（親から子へデータを渡す）

## propsとは
**親コンポーネントから子コンポーネントへ渡すデータ**。タグの属性のように書く。

```tsx
// 子：props を受け取る
function Greeting({ name }: { name: string }) {
  return <p>こんにちは、{name}さん</p>;
}

// 親：props を渡す
<Greeting name="戎居" />   // → こんにちは、戎居さん
```
- `{ name }` は「propsの中から name を取り出す」書き方（分割代入）。
- `: { name: string }` は型（TypeScript）。詳細は②の第3章。

## このサイトの実例：`children`（特別なprops）
`layout.tsx`：
```tsx
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>{children}</main>   {/* ← ここにページ内容が入る */}
        <Footer />
      </body>
    </html>
  );
}
```
- `children` は「**タグで囲んだ中身**」が自動で入る特別なprops。
- ここでは `page.tsx` の内容が `{children}` の位置に差し込まれる。

> このサイトの各セクションは独立性を重視し props をあまり使っていませんが、
> **部品を再利用するとき**は props が主役になります（第14章で実践）。

### やってみよう④
`title` という props を受け取り `<h2>{title}</h2>` を返す `SectionTitle` を書こう。
<details><summary>答え</summary>

```tsx
function SectionTitle({ title }: { title: string }) {
  return <h2>{title}</h2>;
}
// 使う：<SectionTitle title="About" />
```
</details>

---

# 第5章：リスト表示（map と key）

配列のデータを**繰り返し表示**するときは `.map()` を使います。このサイトの最頻出パターン。

## 基本形
```tsx
const items = ["A", "B", "C"];
return (
  <ul>
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);
```

## このサイトの実例（`AboutSection.tsx`）
```tsx
{careers.map((career) => (
  <li key={career.period}>
    <p>{career.period}</p>
    <p>{career.description}</p>
  </li>
))}
```
- 配列 `careers` を1件ずつ `<li>` に変換して並べる。
- データが増えても、この `map` のコードは**変えなくていい**（解説書①の「データと表示の分離」）。

## `key` がなぜ必要か
```tsx
<li key={career.period}>
```
- Reactはリストの各要素を**区別するための目印**として `key` を要求する。
- `key` が無いと「どの要素が変わったか」を判断できず、更新が非効率＆警告が出る。
- **一意な値**（重複しない値）を選ぶ。ここでは `period`。

### やってみよう⑤
`const fruits = ["りんご", "みかん"];` をリスト表示するJSXを書こう（key付き）。
<details><summary>答え</summary>

```tsx
<ul>
  {fruits.map((f) => (
    <li key={f}>{f}</li>
  ))}
</ul>
```
</details>

---

# 第6章：条件分岐の表示（&& と 三項演算子）

「**条件によって表示を変える**」テクニック。

## ① `&&`（〜のときだけ表示）
```tsx
{条件 && <表示するもの>}
```
左がtrueなら右を表示、falseなら何も出さない。

実例（`ProjectsSection.tsx`）：
```tsx
{project.githubUrl && (
  <a href={project.githubUrl}>GitHub →</a>
)}
```
→ `githubUrl` があるときだけリンクを表示。

## ② 三項演算子（A or B の出し分け）
```tsx
{条件 ? <Aのとき> : <Bのとき>}
```

実例（`ContactSection.tsx`）：
```tsx
{status === "success" ? (
  <div>送信しました。ありがとうございます！</div>   // 成功なら感謝メッセージ
) : (
  <form onSubmit={handleSubmit}>...</form>          // それ以外はフォーム
)}
```
→ 送信成功なら御礼、まだなら入力フォーム、と画面を切り替えている。

### やってみよう⑥
`isLoggedIn` が true なら「ようこそ」、false なら「ログインしてください」を表示するJSXは？
<details><summary>答え</summary>

```tsx
{isLoggedIn ? <p>ようこそ</p> : <p>ログインしてください</p>}
```
</details>

---

# 第7章：state（コンポーネントが覚える値）useState

## stateとは
**コンポーネントが覚えておく値**。これが変わると画面が自動で描き直される（再レンダリング）。

## useState の書き方
```tsx
const [値, 値を更新する関数] = useState(初期値);
```

実例（`Header.tsx`）：
```tsx
const [isOpen, setIsOpen] = useState(false);
```
- `isOpen` … 現在の値（メニューが開いているか）。初期値は `false`。
- `setIsOpen` … 値を更新する関数。
- **更新は必ず `setIsOpen(...)` 経由**で行う（`isOpen = true` と直接書いてはダメ）。

## 値を変える
```tsx
onClick={() => setIsOpen(!isOpen)}   // 押すたび true ↔ false
```
- `setIsOpen` を呼ぶと、Reactが**自動で画面を更新**してくれる。

## 複数のstate（`ContactSection.tsx`）
```tsx
const [form, setForm] = useState({ name: "", email: "", message: "" });
const [status, setStatus] = useState("idle");
const [errorMessage, setErrorMessage] = useState("");
```
- 入力値・送信状態・エラー文を、それぞれstateで管理。

> **重要な考え方**：「画面 ＝ state を映したもの」。
> 画面を変えたい → **stateを変える**。直接DOMをいじらない。これがReact流。

### やってみよう⑦
`count` という数値のstateを初期値0で作る1行は？
<details><summary>答え</summary>

```tsx
const [count, setCount] = useState(0);
```
</details>

---

# 第8章：イベント（クリック・入力・送信）

ユーザー操作に反応する仕組み。JSXの属性に**関数**を渡します。

| イベント | いつ起きる | 例 |
|---------|----------|----|
| `onClick` | クリック時 | ボタン |
| `onChange` | 入力が変わった時 | input/textarea |
| `onSubmit` | フォーム送信時 | form |

## このサイトの実例

クリック（`Header.tsx`）：
```tsx
<button onClick={() => setIsOpen(!isOpen)}>...</button>
```

入力（`ContactSection.tsx`）：
```tsx
<input name="name" value={form.name} onChange={handleChange} />
```

送信（`ContactSection.tsx`）：
```tsx
<form onSubmit={handleSubmit}> ... </form>
```

## ハンドラ関数
イベント時に動く関数を「ハンドラ」と呼ぶ慣習：
```tsx
function handleSubmit(e) {
  e.preventDefault();   // フォーム標準のリロードを止める（重要）
  // 送信処理...
}
```
- `e` はイベント情報。`e.preventDefault()` でブラウザの既定動作（ページ再読込）を止める。

### やってみよう⑧
ボタンを押すと `count` を1増やす onClick は？（第7章のcount使用）
<details><summary>答え</summary>

```tsx
<button onClick={() => setCount(count + 1)}>+1</button>
```
</details>

---

# 第9章：制御コンポーネント（フォーム入力の仕組み）

Reactでは、入力欄の値も **state で管理**します。これを「制御コンポーネント」と呼びます。

## 仕組み（value と onChange のセット）
```tsx
<input
  name="name"
  value={form.name}        // ① 表示する値は state から
  onChange={handleChange}  // ② 入力されたら state を更新
/>
```
- ①「画面に出す値」はstateを見る。
- ②「入力された」らstateを更新 → 再レンダリングで①が最新になる。
- **「stateが唯一の正解(信頼できる値)」**という一方向の流れになる。

## 1つの関数で複数入力を扱う（`ContactSection.tsx`）
```tsx
function handleChange(e) {
  setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
}
```
- `e.target.name` … 変化したinputの `name`（"name"/"email"/"message"）。
- `[e.target.name]: e.target.value` … そのキーだけ更新（計算プロパティ名）。
- `...prev` … 他の値はそのままコピー（スプレッド構文）。
- → name/email/message の3欄に**同じ関数を使い回せる**。

> なぜ `setForm((prev) => ...)` と関数で渡す？
> 「**最新のstateを元に更新**」するため。直前の値を確実に引き継げる安全な書き方。

### やってみよう⑨
1つのテキスト入力 `text`（state）を制御コンポーネントにするJSXの骨組みは？
<details><summary>答え</summary>

```tsx
const [text, setText] = useState("");
<input value={text} onChange={(e) => setText(e.target.value)} />
```
</details>

---

# 第10章：再レンダリングの仕組み（Reactの心臓部）

## 流れ
```
① ユーザー操作（クリック/入力）
② ハンドラが setXxx(...) を呼ぶ
③ state が変わる
④ React がそのコンポーネントを再実行（再レンダリング）
⑤ 画面が新しい state を反映
```

## 例：ハンバーガーメニュー（Header.tsx）
```
ボタンを押す
 → setIsOpen(!isOpen)
 → isOpen が false→true
 → Header が再レンダリング
 → {isOpen && <nav>...</nav>} が表示される
```

## 大事なルール
- **stateは直接書き換えない**：`isOpen = true` ❌ → `setIsOpen(true)` ✅
- 直接書き換えるとReactが「変わった」と気づけず、画面が更新されない。

> 一言：**「データ(state)を変える → 画面がついてくる」**。
> 命令的にDOMを操作するのではなく、状態を宣言する。これがReactの本質。

---

# 第11章：Fragment（`<> </>`）

JSXは「1つの要素」しか返せない（第2章）。でも `<div>` で囲むと無駄なタグが増える。
そこで **Fragment（`<>...</>`）** を使うと、**余計なタグなしで複数要素を返せる**。

実例（`page.tsx`）：
```tsx
return (
  <>
    <HeroSection />
    <AboutSection />
    <SkillsSection />
  </>
);
```
- `<>` と `</>` で囲むだけ。HTMLには何も追加されない。

---

# 第12章：Hooksのルールと "use client"

## Hookとは
`useState` のように **`use` で始まるReactの機能**を「Hook(フック)」と呼ぶ。

## ルール（守らないとエラー）
1. **コンポーネントの一番上の階層で呼ぶ**（if文やループの中で呼ばない）。
2. **コンポーネント（または別のHook）の中で呼ぶ**（普通の関数の外ではダメ）。

## "use client" との関係（Next.js特有・重要）
- `useState` などのHookや、`onClick` などのイベントは **クライアントコンポーネントでしか使えない**。
- だからファイルの先頭に **`"use client"`** が必要。

実例（`Header.tsx` / `ContactSection.tsx`）：
```tsx
"use client";
import { useState } from "react";
```
- この2つだけが `"use client"`。理由は「動き(state/イベント)があるから」。
- 詳しいサーバー/クライアントの話は『④_Next.js編』へ。

---

# 第13章：実コードを読む（総復習）

## Header.tsx（state + イベント + map + 条件表示の全部入り）
```tsx
"use client";                                   // ① Hookを使うので必要
import { useState } from "react";

const navLinks = [                              // ② リンクを配列で
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  // ...
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);  // ③ 開閉state

  return (
    <header>
      <nav className="hidden md:flex">
        {navLinks.map((link) => (               // ④ mapでリンク表示
          <a key={link.name} href={link.href}>{link.name}</a>
        ))}
      </nav>

      <button onClick={() => setIsOpen(!isOpen)}>☰</button>  {/* ⑤ クリックでstate反転 */}

      {isOpen && (                              // ⑥ 開いている時だけメニュー表示
        <nav className="md:hidden">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)}>
              {link.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
```
①〜⑥に、ここまで学んだReactの要素が**全部**入っています。読めれば合格。

## ContactSection の送信（state遷移）
```tsx
async function handleSubmit(e) {
  e.preventDefault();          // 既定のリロードを止める
  setStatus("loading");        // 画面：送信中（ボタンdisabled）
  const result = await submitContact(form);   // サーバーへ（詳細は④）
  if (result.ok) {
    setStatus("success");      // 画面：御礼メッセージへ
    setForm({ name: "", email: "", message: "" });
  } else {
    setErrorMessage(result.error);
    setStatus("error");        // 画面：エラー表示
  }
}
```
- `status` というstateを変えるだけで、第6章の三項演算子と連動して**画面が切り替わる**。

---

# 第14章：自分で書いてみる

## 課題A：カウンター（state + イベントの基本）
```tsx
"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>カウント：{count}</p>
      <button onClick={() => setCount(count + 1)}>＋1</button>
      <button onClick={() => setCount(0)}>リセット</button>
    </div>
  );
}
```
→ ＋1で `count` が増え、画面が自動更新。「state→画面」を体感できる。

## 課題B：このサイト流の新セクション（props + map）
「お知らせ(News)」セクションを部品として作る：
```tsx
// 型（②TypeScript編 参照）
type News = { date: string; title: string };

const newsList: News[] = [
  { date: "2026-06-09", title: "ポートフォリオを公開しました" },
  { date: "2026-06-01", title: "Reha Evidence を更新" },
];

export default function NewsSection() {
  return (
    <section id="news">
      <h2>News</h2>
      <ul>
        {newsList.map((news) => (        // map + key
          <li key={news.date}>
            {news.date}：{news.title}
          </li>
        ))}
      </ul>
    </section>
  );
}
```
→ 既存の `AboutSection` / `SkillsSection` と全く同じ構造。
これが書ければ「Reactの部品を自分で作れる」レベルに到達です。

### 力試し（解答なし）
課題Bに「重要フラグ `important?: boolean`」を任意で足し、
`important` が true のニュースだけ「⭐」を付けて表示してみよう（第6章の `&&` を使う）。

---

# 第15章：チートシート

```tsx
// コンポーネント（大文字始まり・JSXを返す）
function MyComp() { return <div>...</div>; }

// JSX：class→className、閉じタグ必須、{}でJS埋め込み
<img src="/a.png" className="rounded" width={200} />
<p>{name}さん</p>

// props（親→子）
function Child({ title }: { title: string }) { return <h2>{title}</h2>; }
<Child title="About" />

// リスト
{items.map((x) => <li key={x.id}>{x.name}</li>)}

// 条件表示
{cond && <A />}                 // 〜のときだけ
{cond ? <A /> : <B />}          // AかB

// state
const [v, setV] = useState(初期値);
setV(新しい値);                 // 直接 v = ... はダメ

// イベント
<button onClick={() => setV(v + 1)}>+</button>
<input value={v} onChange={(e) => setV(e.target.value)} />

// Fragment
<> <A /> <B /> </>

// Hook/イベントを使うファイルは先頭に
"use client";
```

---

# 付録：用語集（React）

| 用語 | 意味 |
|------|------|
| **コンポーネント** | JSXを返す関数。画面の部品 |
| **JSX** | JS内にHTML風に書く記法（.tsx） |
| **props** | 親から子へ渡すデータ |
| **children** | タグで囲んだ中身が入る特別なprops |
| **state** | コンポーネントが覚える値。変わると再描画 |
| **useState** | stateを作るHook |
| **Hook** | `use`で始まるReactの機能 |
| **イベント** | クリック・入力などの操作 |
| **ハンドラ** | イベント時に動く関数（handleXxx） |
| **制御コンポーネント** | value+onChangeでstate管理する入力欄 |
| **再レンダリング** | stateが変わり画面を描き直すこと |
| **Fragment** | `<>...</>`。余計なタグなしで複数返す |
| **map** | 配列→要素リストへの変換 |
| **key** | リスト各要素の識別子 |
| **宣言的** | 「状態→見た目」を書き、描画はReactに任せる考え方 |

---

# 次のステップ
1. このサイトの `Header.tsx` と `ContactSection.tsx` を開き、本書の章と照らし合わせて読む。
2. 第14章のカウンターとNewsSectionをCopilot無しで写経 → 自力で再現。
3. わざとstateを直接書き換え（`count = 1`）て、画面が更新されないことを確認＝なぜ`setCount`が要るか体感。
4. 続けて『④_Next.js編』へ（サーバー/クライアント、ページの仕組み）。

**ゴール再確認**：Reactは「**部品に分けて、stateで画面を動かす**」。
このサイトはその基本に忠実です。

---

*作成：2026年6月9日 ― React完全初心者向け／このサイトの実コードを教材として*
