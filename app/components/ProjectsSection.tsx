// サーバーコンポーネント（動きがないので "use client" 不要）

// プロジェクトの型定義
// githubUrl / siteUrl は任意（?）。リンクがある時だけ表示する
//   githubUrl … 公開リポジトリ（採用側がコードを確認できる）
//   siteUrl  … 実際に動く公開アプリ（デモを触れる。自己参照の循環リンクは付けない）
type Project = {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  siteUrl?: string;
};

// プロジェクトデータを配列で定義
// → 将来 Supabase DB に差し替えても、この型さえ合えば表示側は変えなくてよい
//   （「データの出どころを変えても表示側のコードを変えない」設計 = 将来のSaaS化への布石）
const projects: Project[] = [
  {
    title: "ポートフォリオサイト",
    description:
      "Next.js / TypeScript / Tailwind CSS / Supabase を使って構築した1画面のポートフォリオサイト。サマーインターン課題として制作。SSG・next/image・メタデータAPIなど Next.js の主要機能を実践的に学ぶ目的も兼ねる。",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"],
    githubUrl: "https://github.com/etoshihide08-create/portfolio-site-project",
  },
  {
    title: "Reha Evidence（リハビリ論文 日本語検索アプリ）",
    description:
      "AIエージェント（Claude Code・Codex）を活用して開発中のWebアプリ。PubMed API で英語の医学・リハビリ論文を検索し、OpenAI API で日本語に要約・翻訳して保存できる。FastAPI＋SQLite を基盤に、Google OAuth 認証・Stripe による決済（サブスク）・Resend でのメール送信まで実装。理学療法士の経験を活かし、現場で使えるエビデンス収集の効率化を目指している。",
    tags: ["Python", "FastAPI", "SQLite", "PubMed API", "OpenAI API", "Stripe", "Railway"],
    siteUrl: "https://app.reha-evidence.com/",
  },
  {
    title: "Sales List Builder",
    description:
      "Python で構築した営業リスト自動化ツール。Webスクレイピングにより対象企業データを自動収集し、1,068件のリストを生成。手作業と比べて24倍の効率化を実現。インターン先の実業務課題として開発。",
    tags: ["Python", "スクレイピング", "業務自動化"],
  },
];

// 実習で取り組んだ業務の一覧。
// 上の「制作物」が詳細紹介、こちらは実務の幅を一覧で見せる役割。
const internshipTasks: string[] = [
  "GEO・SEO記事作成",
  "お知らせ記事作成",
  "チラシ制作",
  "LP作成",
  "ホームページ作成（WordPress・CSS）",
  "サムネイル作成",
  "営業リスト自動化ツール作成（Python・AIエージェント）",
  "営業資料作成",
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-4 bg-gray-50">
      {/* リスト表示なので幅は狭め（max-w-3xl）の方が読みやすい */}
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
          Projects
        </h2>

        {/* 今の段階ではカードではなく、シンプルなHTML箇条書き（list-disc）で表現 */}
        <ul className="space-y-8 list-disc pl-5 marker:text-gray-400">
          {projects.map((project) => (
            <li key={project.title}>
              <h3 className="text-lg font-semibold text-gray-900">
                {project.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mt-1">
                {project.description}
              </p>
              {/* タグはスラッシュ区切りのテキストで軽く添える */}
              <p className="text-sm text-gray-500 mt-1">
                {project.tags.join(" / ")}
              </p>
              {/* リンク：実際に存在するものだけ表示する。
                  GitHub … コードを確認できる ／ サイトを見る … 動くデモを触れる
                  （ポートフォリオサイト自身への循環リンクは付けない） */}
              {(project.githubUrl || project.siteUrl) && (
                <div className="flex gap-4 mt-1">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm text-gray-600 hover:text-gray-900 underline underline-offset-2"
                    >
                      GitHub →
                    </a>
                  )}
                  {project.siteUrl && (
                    <a
                      href={project.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm text-gray-600 hover:text-gray-900 underline underline-offset-2"
                    >
                      サイトを見る →
                    </a>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* 実習で取り組んだ業務の一覧。実務の幅を一目で伝える */}
        <div className="mt-16">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            実習で取り組んだこと
          </h3>
          {/* 8項目あるので PC では2列（sm:grid-cols-2）に並べてコンパクトに見せる */}
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 list-disc pl-5 marker:text-gray-400 text-gray-600">
            {internshipTasks.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
