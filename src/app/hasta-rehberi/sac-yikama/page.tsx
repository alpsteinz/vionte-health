import type { Metadata } from "next";
import { ArticlePage } from "@/components/sections/article-page";
import { getGuide, parentTrail } from "@/content/guides";

const guide = getGuide("/hasta-rehberi/sac-yikama")!;

export const metadata: Metadata = {
  title: guide.metaTitle,
  description: guide.metaDescription,
  alternates: { canonical: guide.slug },
  openGraph: { title: guide.metaTitle, description: guide.metaDescription, url: guide.slug },
};

export default function Page() {
  return (
    <ArticlePage
      guide={guide}
      trail={[
        { name: "Ana sayfa", href: "/" },
        parentTrail,
        { name: guide.name, href: guide.slug },
      ]}
    />
  );
}
