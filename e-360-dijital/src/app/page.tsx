import Hero from "@/components/sections/Hero";
import ProblemSection from "@/components/sections/ProblemSection";
import ServicesCarousel from "@/components/sections/ServicesCarousel";
import GrowthSection from "@/components/sections/GrowthSection";
import BlogPreview from "@/components/sections/BlogPreview";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  
  // 1. Veritabanından en yeni 6 blogu çekiyoruz (Mevcut kodun, aynen duruyor)
  const recentBlogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
    select: {
      id: true, 
      slug: true, 
      title: true, 
      category: true, 
      excerpt: true, 
      date: true, 
      readTime: true, 
      image: true
    }
  });

  // 2. YENİ: Admin panelinden güncellediğimiz site ayarlarını (manşetleri) çekiyoruz
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "global" }
  });

  return (
    <>
      {/* YENİ: Çektiğimiz "settings" verisini ilgili bileşenlere "prop" olarak yolluyoruz */}
      <Hero settings={settings} />
      <ProblemSection settings={settings} />
      
      {/* ServicesCarousel şimdilik sabit, onu da yakında bağlayacağız */}
      <ServicesCarousel />
      
      <GrowthSection settings={settings} />
      
      {/* Blog bileşeni zaten çalışıyordu, dokunmadık */}
      <BlogPreview blogs={recentBlogs} />
    </>
  );
}