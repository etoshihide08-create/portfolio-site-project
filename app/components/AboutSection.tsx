// サーバーコンポーネント（動きがないので "use client" 不要）

// 経歴データを型付きの配列で定義
type Career = {
  period: string;
  description: string;
};

const careers: Career[] = [
  {
    period: "2026年1月〜現在",
    description:
      "三宮のIT企業でインターンとして実務に従事。GEO/SEO記事の制作、WordPress・CSSでのサイト構築、チラシ・サムネイル制作、LP制作、Pythonによる営業リスト自動化ツールの開発、AIエージェントの活用まで、Web・IT・AIの幅広い業務を経験しながら、専門エンジニアを目指して学習を続けている。",
  },
  {
    period: "2025年10月〜2026年6月",
    description:
      "就労移行支援事業所 JOTサポート神戸 三宮駅前にてIT転身を本格化。プログラミング・Webスキルを体系的に習得し、エンジニアへのキャリアを準備。",
  },
  {
    period: "2025年6月〜2025年8月",
    description:
      "株式会社グッドケア リハビリテーション課に勤務し、訪問看護ステーションで訪問リハビリを担当。現場で自分の適性ややりたいことを見つめ直し、IT転身を決意。",
  },
  {
    period: "2022年4月〜2025年5月",
    description:
      "神戸総合医療専門学校 理学療法士科を卒業後、社会医療法人 正峰会 神戸大山病院 リハビリテーション課に入職。約3年間、患者さん一人ひとりと向き合う中で対人理解力・観察力を培う。",
  },
];

// 強みデータも配列で定義
type Strength = {
  title: string;
  description: string;
};

const strengths: Strength[] = [
  {
    title: "ヒアリングと観察を起点にした提案",
    description:
      "理学療法士として、患者一人ひとりの状態と意向を時間をかけてヒアリングし、目標を共有してリハビリを進めてきた。医師・看護師・介護職と連携する中で、立場の異なる相手の話を聞いて要点を整理する力を養った。この経験を、IT領域での要件把握や、現場に寄り添った提案・仕組み作りに応用したいと考えている。",
  },
  {
    title: "幅広い領域への自発的な学習とアウトプット",
    description:
      "実習業務に加えて、独学でランディングページ制作・Google広告運用・ステップLINE構築・英語論文検索アプリの作成などに取り組んできた。Web・IT・マーケティングを横断的に学び、手を動かして形にすることを継続している。",
  },
  {
    title: "戦略を立て、仮説検証で実行する思考の型",
    description:
      "状況を整理して全体像を俯瞰し、仮説を立てて優先順位を決めたうえで、実行・検証・改善を繰り返しながら成果物を形にすることを意識してきた。理学療法士として患者ごとの評価と介入計画を立て、結果を見て修正してきた経験を、IT領域での課題解決にも応用している。",
  },
];

export default function AboutSection() {
  return (
    // bg-gray-50 で前後のセクションと交互に背景色を変え、メリハリを付ける
    <section id="about" className="py-24 px-4 bg-gray-50">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          About
        </h2>

        {/* 自己紹介文：PT→ITのストーリーを短くまとめ、人物像を伝える */}
        <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto text-center mb-12">
          理学療法士として3年間、医療現場で患者一人ひとりと向き合ってきました。在職中からIT・Web分野に関心を持ち、個人でLP制作・広告運用・LINEステップ構築などに取り組む中でものづくりの面白さを実感。就労移行支援での学びを経て、現在は三宮のIT企業でインターンとして実務に取り組みながら、エンジニアへの転身を進めています。
        </p>

        {/* grid md:grid-cols-2 でPC以上は2列レイアウト、スマホは1列 */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* 経歴 */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-800">経歴</h3>
            <ul className="space-y-6">
              {careers.map((career) => (
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
