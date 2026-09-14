import { prisma } from "@/lib/prisma";
import { blogs, getBlogImage } from "@/config/data";
import { redirect } from "next/navigation";
import { Download } from "lucide-react";

export default function ImportPage() {
  
  async function importAllBlogs() {
    "use server";
    
    for (const post of blogs) {
      const existing = await prisma.blog.findUnique({
        where: { slug: post.slug }
      });

      if (!existing) {
        await prisma.blog.create({
          data: {
            title: post.title,
            slug: post.slug,
            category: post.category,
            excerpt: post.excerpt,
            // YENİ: Eğer data.ts içinde content yoksa, yedek bir metin ekliyoruz!
            content: (post as any).content || "<p>Bu yazının detaylı içeriği en kısa sürede eklenecektir.</p>",
            image: getBlogImage(post.category, post.id),
            date: post.date,
            readTime: post.readTime || "3 dk", // readTime da eksikse yedek değer atıyoruz
          }
        });
      }
    }
    
    redirect("/admin/blogs");
  }

  return (
    <div className="max-w-2xl mx-auto text-center py-20">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Eski Blogları Panele Aktar</h1>
      <p className="text-slate-600 mb-8">Bu buton, data.ts dosyasındaki 50 blogunuzu otomatik olarak yeni veritabanına kopyalayacak. Böylece hepsini panelden düzenleyebileceksiniz.</p>
      
      <form action={importAllBlogs}>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all inline-flex items-center gap-3 shadow-lg shadow-blue-600/20 text-lg">
          <Download className="w-6 h-6" /> 50 Blogu Veritabanına Taşı
        </button>
      </form>
    </div>
  );
}