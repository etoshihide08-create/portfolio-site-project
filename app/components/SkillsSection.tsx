// サーバーコンポーネント（動きがないので "use client" 不要）

// スキルグループの型定義
// TypeScriptの型で「何が入るべきか」を明示する
type SkillGroup = {
  title: string;
  skills: string[];
};

// 3グループのスキルデータを配列で定義
// → グループや項目を増やしても表示コンポーネントは変えなくてよい（データと表示の分離）
const skillGroups: SkillGroup[] = [
  {
    title: "実務で使用",
    skills: ["Python", "Git", "GitHub", "Slack", "Notion"],
  },
  {
    title: "このポートフォリオで実装",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"],
  },
  {
    title: "Web・マーケ経験",
    skills: ["HTML/CSS", "WordPress", "Google Analytics", "SEO基礎"],
  },
];

export default function SkillsSection() {
  return (
    // 背景なし（白）でAboutセクションと交互に見せる
    <section id="skills" className="py-24 px-4">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
          Skills
        </h2>

        {/* grid md:grid-cols-3 でPC以上は3列、スマホは1列 */}
        <div className="grid md:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            // 各グループをカードとして表示
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
