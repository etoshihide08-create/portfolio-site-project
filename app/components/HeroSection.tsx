// サーバーコンポーネント（動きがないので "use client" 不要）
import Image from "next/image";

export default function HeroSection() {
  return (
    // id="hero" でナビのリンクからジャンプできるようにする
    // pt-16 は固定ヘッダー（h-16 = 64px）の高さ分だけ上の余白を確保
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-16 px-4"
    >
      {/* max-w-5xl で横幅を制限し mx-auto で中央寄せ */}
      {/* md:flex-row でPC幅以上は横並び、デフォルト（スマホ）は縦並び */}
      <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center gap-12">
        {/* プロフィール画像 */}
        {/* public/profile.jpg に 500×500px の画像を置いてください */}
        {/* next/image が自動でWebP変換・リサイズを行い表示を高速化する */}
        {/* priority を付けると最初の画面に使う画像として先読みされ、LCPが改善する */}
        <div className="flex-shrink-0">
          <Image
            src="/profile.jpg"
            alt="戎居 繁秀のプロフィール画像"
            width={200}
            height={200}
            className="rounded-full object-cover shadow-md"
            priority
          />
        </div>

        {/* テキストエリア */}
        {/* text-center はスマホ、md:text-left でPCは左寄せ */}
        <div className="text-center md:text-left">
          <p className="text-base text-gray-500 mb-2 tracking-wide">
            理学療法士 → ITエンジニア
          </p>
          {/* h1 はページ内で1つだけ使うSEO上重要なタグ */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            戎居 繁秀
          </h1>
          <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
            理学療法士として培った「観察力・課題発見力」を武器に、
            Webとテクノロジーで新しい価値を生み出していきます。
          </p>

          {/* CTAボタン */}
          {/* flex-col sm:flex-row でスマホは縦、それ以上は横並び */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#projects"
              className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors text-center"
            >
              制作物を見る
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center"
            >
              連絡する
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
