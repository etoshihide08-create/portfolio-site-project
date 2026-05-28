// サーバーコンポーネント（動きがないので "use client" 不要）

// プロジェクトの型定義
// siteUrl は任意（?）なので存在しない場合もある
type Project = {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  siteUrl?: string;
};

// プロジェクトデータを配列で定義
// → 将来 Supabase DB に差し替えても、この型さえ合えば表示コンポーネントは変えなくてよい
//   （これが「データの出どころを変えても表示側のコードを変えない」設計）
const projects: Project[] = [
  {
    title: "ポートフォリオサイト",
    description:
      "Next.js / TypeScript / Tailwind CSS / Supabase を使って構築した1画面のポートフォリオサイト。サマーインターン課題として制作。SSG・next/image・メタデータAPIなど Next.js の主要機能を実践的に学ぶ目的も兼ねる。",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"],
    githubUrl: "https://github.com/etoshihide08-create/portfolio-site-project",
    siteUrl: "https://portfolio-site-project-puce.vercel.app",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-4 bg-gray-50">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
          Projects
        </h2>

        {/* 将来プロジェクトが増えても grid が自動で対応する */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* projects 配列を map で1つずつカードに変換して表示 */}
          {projects.map((project) => (
            // flex flex-col で縦方向に並べ、カードの高さを揃える
            <article
              key={project.title}
              className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900">
                {project.title}
              </h3>

              {/* flex-1 でこの要素が余った縦スペースを埋め、ボタンを下に固定する */}
              <p className="text-gray-600 leading-relaxed flex-1">
                {project.description}
              </p>

              {/* タグ一覧 */}
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              {/* リンク */}
              <div className="flex gap-4 text-sm pt-2 border-t border-gray-100">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 underline underline-offset-2"
                >
                  GitHub →
                </a>
                {/* siteUrl は任意なので、存在するときだけ表示する */}
                {project.siteUrl && (
                  <a
                    href={project.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 underline underline-offset-2"
                  >
                    サイトを見る →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
