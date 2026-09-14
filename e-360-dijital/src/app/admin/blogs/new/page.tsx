import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, UploadCloud } from "lucide-react";
// YENİ: Kendi bilgisayarımıza dosya kaydetmek için Node.js modüllerini çağırıyoruz
import { writeFile } from "fs/promises";
import path from "path";

export default function NewBlogPage() {
  
  async function createBlog(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const imageAlt = formData.get("imageAlt") as string;
    const seoTitle = formData.get("seoTitle") as string;
    const seoDesc = formData.get("seoDesc") as string;
    
    // 1. URL ile resim eklenmişse onu al
    let imageUrl = formData.get("imageUrl") as string;
    
    // 2. DOSYA OLARAK resim yüklenmişse onu alıp kendi klasörümüze kaydedelim
    const file = formData.get("imageFile") as File;
    if (file && file.size > 0) {
      // Dosyayı bilgisayarın anlayacağı bit formatına (Buffer) çevir
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Dosya ismindeki boşlukları temizle ve benzersiz bir isim yap (örn: 169345-resim.jpg)
      const uniqueName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      
      // public/uploads klasörünün yolunu bul
      const uploadDir = path.join(process.cwd(), "public/uploads");
      const filePath = path.join(uploadDir, uniqueName);

      // Dosyayı klasöre fiziki olarak kaydet!
      await writeFile(filePath, buffer);
      
      // Veritabanına kaydedilecek URL yolunu belirle
      imageUrl = `/uploads/${uniqueName}`;
    }
    
    const date = new Date().toLocaleDateString("tr-TR");
    const readTime = "4 dk";

    await prisma.blog.create({
      data: { 
        title, slug, category, excerpt, content, 
        image: imageUrl || "", // Ya yüklenen dosya ya da yazılan URL
        imageAlt, seoTitle, seoDesc, date, readTime 
      },
    });

    redirect("/admin/blogs");
  }

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <Link href="/admin/blogs" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors mb-6 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Geri Dön
      </Link>
      
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Yeni Blog Yazısı</h1>

      <form action={createBlog} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SOL TARAF: ANA İÇERİK */}
        <div className="lg:col-span-2 space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Başlık</label>
              <input type="text" name="title" required className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 bg-slate-50" placeholder="Örn: SEO'nun Geleceği" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">URL (Slug)</label>
              <input type="text" name="slug" required className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 bg-slate-50" placeholder="orn-seo-nun-gelecegi" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Kısa Özet</label>
            <textarea name="excerpt" required rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 bg-slate-50" placeholder="Ana sayfada görünecek kısa açıklama..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">İçerik (HTML destekler)</label>
            <textarea name="content" required rows={12} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 bg-slate-50" placeholder="<p>Makale içeriğiniz buraya...</p>"></textarea>
          </div>
        </div>

        {/* SAĞ TARAF: SEO VE GÖRSEL */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">Görsel Yönetimi</h3>
            
            {/* KENDİ YÜKLEME BUTONUMUZ */}
            <label className="block text-sm font-bold text-slate-700 mb-2">Bilgisayardan Seç</label>
            <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-4 hover:bg-slate-50 transition-colors cursor-pointer mb-4 flex flex-col items-center justify-center text-center h-32">
              <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
              <span className="text-sm text-slate-500 font-medium">Tıkla veya sürükle bırak</span>
              <input type="file" name="imageFile" accept="image/png, image/jpeg, image/webp" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            </div>
            
            <div className="text-center text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">VEYA URL İLE EKLE</div>

            <input type="text" name="imageUrl" placeholder="https://..." className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 bg-slate-50 text-sm mb-4" />
            
            <label className="block text-sm font-bold text-slate-700 mb-2">Görsel Alt Metni (SEO)</label>
            <input type="text" name="imageAlt" placeholder="Örn: Dijital Pazarlama Stratejileri" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 bg-slate-50 text-sm" />
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <h3 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">Google SEO Ayarları</h3>
             <label className="block text-sm font-bold text-slate-700 mb-2">Meta Başlık (Title)</label>
             <input type="text" name="seoTitle" placeholder="Google'da görünecek başlık..." className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 bg-slate-50 text-sm mb-4" />
            
             <label className="block text-sm font-bold text-slate-700 mb-2">Meta Açıklama (Desc)</label>
             <textarea name="seoDesc" rows={3} placeholder="Google arama sonuçlarındaki gri açıklama metni..." className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 bg-slate-50 text-sm mb-4"></textarea>

             <label className="block text-sm font-bold text-slate-700 mb-2">Kategori</label>
             <select name="category" required className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 bg-slate-50 text-sm">
                <option value="SEO">SEO</option>
                <option value="Google Ads">Google Ads</option>
                <option value="Meta Ads">Meta Ads</option>
                <option value="Sosyal Medya">Sosyal Medya</option>
                <option value="Prodüksiyon">Prodüksiyon</option>
             </select>
          </div>
          
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 text-lg">
            <Save className="w-5 h-5" /> Yayına Al
          </button>
        </div>
      </form>
    </div>
  );
}