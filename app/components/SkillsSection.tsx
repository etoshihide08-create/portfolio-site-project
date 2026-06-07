// サーバーコンポーネント（動きがないので "use client" 不要）

// スキルグループの型定義
type SkillGroup = {
  title: string;
  skills: string[];
};

// スキルデータをグループごとに配列で定義
// → グループや項目を増やしても表示コンポーネントは変えなくてよい（データと表示の分離）
const skillGroups: SkillGroup[] = [
  {
    title: "実務で使用",
    skills: ["WordPress / CSS", "HTML / CSS", "Python", "AIエージェント活用"],
  },
  {
    title: "このポートフォリオで実装",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "Git / GitHub", "Vercel", "Supabase"],
  },
  {
    // 個人開発（Reha Evidence など）でAIエージェントを活用しながら触れた技術
    title: "AIエージェント活用で開発",
    skills: [
      "FastAPI",
      "SQLite",
      "JavaScript",
      "OpenAI API",
      "PubMed API",
      "Google OAuth",
      "Stripe",
      "Resend",
    ],
  },
  {
    title: "Web・マーケ経験",
    skills: ["LP制作・広告運用", "LINEステップ構築", "SEO / GEO記事", "デザイン制作"],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-4">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
          Skills
        </h2>

        {/* grid md:grid-cols-3 でPC以上は3列、スマホは1列 */}
        <div className="grid md:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="bg-gray-50 rounded-xl p-6 border border-gray-100"
            >
              <h3 className="font-semibold text-gray-700 mb-4 text-sm uppercase tracking-wide">
                {group.title}
              </h3>

              {/* バッジ形式でスキルを並べる */}
              {/* flex-wrap で画面幅に合わせて自動的に折り返す */}
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 shadow-sm"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
