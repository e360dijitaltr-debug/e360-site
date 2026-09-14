import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, UploadCloud } from "lucide-react";
import { writeFile } from "fs/promises";
import path from "path";

export default function NewServicePage() {
  
  async function createService(formData: FormData) {
    "use server";
    // Temel Bilgiler
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const icon = formData.get("icon") as string;
    const order = parseInt(formData.get("order") as string) || 0;
    
    // YENİ: Sayfa İçi İçerikler ve SEO
    const pageTitle = formData.get("pageTitle") as string;
    const pageSubtitle = formData.get("pageSubtitle") as string;
    const seoTitle = formData.get("seoTitle") as string;
    const seoDesc = formData.get("seoDesc") as string;
    const imageAlt = formData.get("imageAlt") as string;
    const content = formData.get("content") as string;

    // YENİ: Resim Yükleme (Lacivert Kutu İçin)
    let finalImage = null;
    const file = formData.get("imageFile") as File;
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueName = `service-${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const uploadDir = path.join(process.cwd(), "public/uploads");
      await writeFile(path.join(uploadDir, uniqueName), buffer);
      finalImage = `/uploads/${uniqueName}`;
    }

    await prisma.service.create({
      data: { title, slug, description, icon, order, pageTitle, pageSubtitle, seoTitle, seoDesc, imageAlt, image: finalImage, content }
    });
    
    redirect("/admin/services");
  }

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <Link href="/admin/services" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors mb-6 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Geri Dön
      </Link>
      
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Yeni Hizmet Oluştur</h1>

      <form action={createService} className="space-y-8">
        
        {/* TEMEL BİLGİLER (Menü ve Kartlar İçin) */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-4">Temel Bilgiler (Menü Görünümü)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Hizmet Adı</label><input type="text" name="title" required className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50" /></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">URL (Slug)</label><input type="text" name="slug" required placeholder="seo-danismanligi" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50" /></div>
          </div>
          <div><label className="block text-sm font-bold text-slate-700 mb-2">Menü Kısa Açıklaması</label><textarea name="description" required rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50"></textarea></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-bold text-slate-700 mb-2">İkon Adı (Lucide)</label><input type="text" name="icon" defaultValue="Target" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50" /></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Sıralama</label><input type="number" name="order" defaultValue="1" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50" /></div>
          </div>
        </div>

        {/* HİZMET DETAY SAYFASI İÇERİĞİ */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-4">Sayfa İçeriği & Görsel (Lacivert Kutu)</h2>
          
          <div><label className="block text-sm font-bold text-slate-700 mb-2">Sayfa Ana Başlığı</label><input type="text" name="pageTitle" placeholder="Örn: Veri Odaklı SEO ile Trafiğinizi Katlayın" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50" /></div>
          <div><label className="block text-sm font-bold text-slate-700 mb-2">Başlık Altı Açıklama (Alt Metin)</label><textarea name="pageSubtitle" rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50"></textarea></div>
          
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <label className="block text-sm font-bold text-slate-700 mb-2">Lacivert Kutudaki Görsel (JPG/PNG)</label>
            <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-4 hover:bg-white transition-colors cursor-pointer flex flex-col items-center justify-center text-center h-32 bg-white mb-4">
              <UploadCloud className="w-8 h-8 text-blue-500 mb-2" />
              <span className="text-sm font-semibold text-slate-600">Görsel Yüklemek İçin Tıklayın</span>
              <input type="file" name="imageFile" accept="image/png, image/jpeg, image/webp" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            </div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Görsel SEO (Alt Etiketi)</label>
            <input type="text" name="imageAlt" placeholder="Örn: SEO Analiz Tablosu" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white" />
          </div>

          <div><label className="block text-sm font-bold text-slate-700 mb-2">Hizmet Detay Yazısı (HTML Desktekler)</label><textarea name="content" rows={8} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50"></textarea></div>
        </div>

        {/* GOOGLE SEO */}
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-4">Google SEO Ayarları</h2>
          <div><label className="block text-sm font-bold text-slate-300 mb-2">Meta Title (Arama Başlığı)</label><input type="text" name="seoTitle" className="w-full px-4 py-3 rounded-xl border border-slate-700 focus:ring-2 focus:ring-blue-500 bg-slate-800 text-white" /></div>
          <div><label className="block text-sm font-bold text-slate-300 mb-2">Meta Description (Arama Açıklaması)</label><textarea name="seoDesc" rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-700 focus:ring-2 focus:ring-blue-500 bg-slate-800 text-white"></textarea></div>
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-xl font-extrabold transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 text-lg">
          <Save className="w-6 h-6" /> Yeni Hizmeti Yayınla
        </button>

      </form>
    </div>
  );
}