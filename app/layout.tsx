import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// メタデータAPIで SEO・SNSシェア用の情報を一元管理する
// Next.js が <head> タグ内に自動挿入してくれるので直接 <head> を書かなくていい
export const metadata: Metadata = {
  // OG画像など相対URLを絶対URLに解決するための基準URL
  // これがないと本番でもlocalhost:3000基準になりSNSカードの画像が表示されない
  metadataBase: new URL("https://portfolio-site-project-puce.vercel.app"),
  // ブラウザのタブに表示されるタイトル
  title: "戎居 繁秀 | ポートフォリオ",
  // Google検索の説明文（160文字以内が推奨）
  description:
    "理学療法士からITエンジニアへ転身中の戎居繁秀のポートフォリオサイト。Next.js / TypeScript / Tailwind CSS で構築。",
  // OGタグ：SNSでシェアされたときのカード表示に使われる
  openGraph: {
    title: "戎居 繁秀 | ポートフォリオ",
    description:
      "理学療法士からITエンジニアへ転身中の戎居繁秀のポートフォリオサイトです。",
    url: "https://portfolio-site-project-puce.vercel.app",
    siteName: "戎居 繁秀 | ポートフォリオ",
    // OG画像はSNSカードのサムネイルになる（public/og-image.png を置いておく）
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "戎居 繁秀 | ポートフォリオ",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
