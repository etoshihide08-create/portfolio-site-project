// サーバーコンポーネント（動きがないので "use client" 不要）

// 経歴データを型付きの配列で定義
// → 将来データを増やすときは配列に1行足すだけでよい
type Career = {
  period: string;
  description: string;
};

const careers: Career[] = [
  {
    period: "2025〜現在",
    description:
      "ITエンジニアへ転身中。Next.js / TypeScript を学習しながら、神戸のIT企業でインターンとして実務経験を積む。",
  },
  {
    period: "〜2025",
    description:
      "理学療法士として病院・クリニックに勤務。患者の回復支援を通じてデータやテクノロジーへの関心が高まり、IT転身を決意。",
  },
];

// 強みデータも同様に配列で定義
type Strength = {
  title: string;
  description: string;
};

const strengths: Strength[] = [
  {
    title: "課題発見力",
    description:
      "患者の状態を観察して問題を特定する理学療法士の思考を、ITの課題解決に応用できる。",
  },
  {
    title: "継続的な学習姿勢",
    description:
      "独学でプログラミングを習得し、実際のプロダクト開発に参加するまで成長。",
  },
  {
    title: "コミュニケーション能力",
    description:
      "患者・家族・他職種との連携で培った、相手に伝わる説明力と傾聴力。",
  },
];

export default function AboutSection() {
  return (
    // bg-gray-50 で前後のセクションと交互に背景色を変え、メリハリを付ける
    <section id="about" className="py-24 px-4 bg-gray-50">
      <div className="mx-auto max-w-5xl">
        {/* h2 はセクションの見出し。1ページに複数使ってOK */}
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
          About
        </h2>

        {/* grid md:grid-cols-2 でPC以上は2列レイアウト、スマホは1列 */}
        <div className="grid md:grid-cols-2 gap-12">

          {/* 経歴 */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-800">経歴</h3>
            {/* space-y-6 でリスト項目間に縦の余白を付ける */}
            <ul className="space-y-6">
              {careers.map((career) => (
                // key に一意な値（ここでは period）を使うことでReactが差分を追える
                <li key={career.period}>
                  <p className="font-semibold text-gray-900 mb-1">
                    {career.period}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {career.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* 強み */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-800">強み</h3>
            <ul className="space-y-6">
              {strengths.map((strength) => (
                <li key={strength.title} className="flex items-start gap-3">
                  {/* 装飾的な記号。aria-hidden でスクリーンリーダーに無視させる */}
                  <span
                    className="text-gray-400 mt-1 flex-shrink-0"
                    aria-hidden="true"
                  >
                    ▷
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      {strength.title}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {strength.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
