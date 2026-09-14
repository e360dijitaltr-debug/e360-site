import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Trash2, Image as ImageIcon, UploadCloud } from "lucide-react";
import { writeFile } from "fs/promises";
import path from "path";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) notFound();

  const blog = await prisma.blog.findUnique({ where: { id } });

  if (!blog) notFound();

  const safeBlog = blog;

  const blogData = safeBlog as typeof safeBlog & {
    imageAlt?: string | null;
    seoTitle?: string | null;
    seoDesc?: string | null;
  };

  async function updateBlog(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const imageAlt = formData.get("imageAlt") as string;
    const seoTitle = formData.get("seoTitle") as string;
    const seoDesc = formData.get("seoDesc") as string;

    let finalImage = safeBlog.image;
    const imageUrl = formData.get("imageUrl") as string;
    
    // YENİ: 1. Yeni bir DOSYA (JPG/PNG) yüklenmişse
    const file = formData.get("imageFile") as File;
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const uploadDir = path.join(process.cwd(), "public/uploads");
      const filePath = path.join(uploadDir, uniqueName);
      
      await writeFile(filePath, buffer);
      finalImage = `/uploads/${uniqueName}`;
    } 
    // YENİ: 2. Dosya yüklenmemiş ama kutuya yeni bir URL girilmişse
    else if (imageUrl && imageUrl.trim() !== "") {
      finalImage = imageUrl;
    }

    await prisma.blog.update({
      where: { id },
      data: { title, slug, category, excerpt, content, image: finalImage, imageAlt, seoTitle, seoDesc },
    });
    redirect("/admin/blogs");
  }

  // Görseli Silme İşlemi
  async function removeImage() {
    "use server";
    await prisma.blog.update({ where: { id }, data: { image: null, imageAlt: null } });
    redirect(`/admin/blogs/${id}/edit`);
  }

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <Link href="/admin/blogs" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors mb-6 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Geri Dön
      </Link>
      
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Blog Yazısını Düzenle</h1>

      <form action={updateBlog} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SOL TARAF: ANA İÇERİK */}
        <div className="lg:col-span-2 space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Başlık</label>
              <input type="text" name="title" defaultValue={blog.title || ""} required className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 bg-slate-50" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">URL (Slug)</label>
              <input type="text" name="slug" defaultValue={blog.slug || ""} required className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 bg-slate-50" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Kısa Özet</label>
            <textarea name="excerpt" defaultValue={blog.excerpt || ""} required rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 bg-slate-50"></textarea>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">İçerik (HTML destekler)</label>
            <textarea name="content" defaultValue={blog.content || ""} required rows={12} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 bg-slate-50"></textarea>
          </div>
        </div>

        {/* SAĞ TARAF: SEO VE GÖRSEL */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">Görsel Yönetimi</h3>
            {blog.image ? (
              <div className="mb-4 bg-slate-50 p-2 rounded-xl border border-slate-200">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={blog.image} alt={blogData.imageAlt || "Kapak"} className="w-full h-32 object-cover rounded-lg mb-2 border border-slate-200 shadow-sm" />
                <button formAction={removeImage} className="w-full flex items-center justify-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-200 transition-colors">
                  <Trash2 className="w-4 h-4" /> Görseli Kaldır
                </button>
              </div>
            ) : (
              <div className="w-full h-32 bg-slate-50 rounded-xl mb-4 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-300">
                <ImageIcon className="w-8 h-8 mb-2" />
                <span className="text-xs font-semibold">Henüz Görsel Yok</span>
              </div>
            )}
            
            {/* YENİ GÖRSEL YÜKLEME ALANI */}
            <label className="block text-sm font-bold text-slate-700 mb-2 mt-4">Yeni Görsel Yükle</label>
            <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-4 hover:bg-slate-50 transition-colors cursor-pointer mb-4 flex flex-col items-center justify-center text-center h-24">
              <UploadCloud className="w-6 h-6 text-slate-400 mb-2" />
              <span className="text-xs text-slate-500 font-medium">Tıkla veya sürükle bırak</span>
              <input type="file" name="imageFile" accept="image/png, image/jpeg, image/webp" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            </div>

            <div className="text-center text-[10px] font-bold text-slate-400 mb-4 uppercase tracking-wider">VEYA URL KULLAN</div>

            <input type="text" name="imageUrl" placeholder="https://..." className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 bg-slate-50 text-sm mb-4" />
            
            <label className="block text-sm font-bold text-slate-700 mb-2">Görsel Alt Metni (SEO)</label>
            <input type="text" name="imageAlt" defaultValue={blogData.imageAlt || ""} placeholder="Örn: Çanakkale SEO Ajansı" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 bg-slate-50 text-sm" />
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <h3 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">Google SEO Ayarları</h3>
             <label className="block text-sm font-bold text-slate-700 mb-2">Meta Başlık (Title)</label>
             <input type="text" name="seoTitle" defaultValue={blogData.seoTitle || ""} placeholder="Google'da görünecek başlık..." className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 bg-slate-50 text-sm mb-4" />
            
             <label className="block text-sm font-bold text-slate-700 mb-2">Meta Açıklama (Desc)</label>
             <textarea name="seoDesc" defaultValue={blogData.seoDesc || ""} rows={3} placeholder="Google arama sonuçlarındaki gri açıklama metni..." className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 bg-slate-50 text-sm mb-4"></textarea>

             <label className="block text-sm font-bold text-slate-700 mb-2">Kategori</label>
             <input type="text" name="category" defaultValue={blog.category || ""} required className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 bg-slate-50 text-sm" />
          </div>
          
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 text-lg">
            <Save className="w-5 h-5" /> Değişiklikleri Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}