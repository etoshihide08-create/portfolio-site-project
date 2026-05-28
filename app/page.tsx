// page.tsx は「絵」の部分。layout.tsx の <main> の中に描画される
// 各セクションをインポートして縦に並べるだけのシンプルな構造
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <>
      {/* Fragment（<>）を使うと余計なdivを増やさずに複数要素を返せる */}
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
