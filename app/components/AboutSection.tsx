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
      "三宮のIT企業でインターンとして実務に従事。記事制作・WordPressでのサイト構築・Pythonによる業務自動化ツールの開発・AIエージェント活用など幅広く経験しながら、専門エンジニアを目指して学習を続けている。",
  },
  {
    period: "2025年10月〜2025年12月",
    description:
      "就労移行支援事業所 JOTサポート神戸 三宮駅前にてIT転身を本格化。プログラミング・Webスキルを体系的に習得し、エンジニアへのキャリアを準備。",
  },
  {
    period: "2025年6月〜2025年8月",
    description:
      "株式会社グッドケア リハビリテーション課勤務。訪問リハビリの現場で自分の適性ややりたいことを見つめ直し、IT転身を決意。",
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
    title: "対人理解力 → ユーザー視点のものづくり",
    description:
      "理学療法士として3年間、患者一人ひとりの状態を観察・分析し、目標を共有しながら信頼関係を築いてきた。「相手が何を求めているか」を捉えるこの力を、ユーザー視点の設計・提案に直接活かしている。",
  },
  {
    title: "圧倒的な学習速度と実行力",
    description:
      "実習開始1週間でPythonによる業務自動化ツールを実務投入。夜中まで集中して学習を続け、未経験のIT分野でも短期間で成果物を形にしてきた。インターン先の代表から「素養がある」と評価を受けている。",
  },
  {
    title: "医療現場からの課題発見力",
    description:
      "病院勤務中から「指示書作成・申し送り業務のDX化」など現場の非効率に着目。AIによる自動生成やチャット活用を独自に調査・提案してきた。医療経験を持つITエンジニアとして、現場に寄り添った仕組みづくりができる。",
  },
];

export default function AboutSection() {
  return (
    // bg-gray-50 で前後のセクションと交互に背景色を変え、メリハリを付ける
    <section id="about" className="py-24 px-4 bg-gray-50">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
          About
        </h2>

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
