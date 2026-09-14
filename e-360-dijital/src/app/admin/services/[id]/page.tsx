import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Trash2, Image as ImageIcon, UploadCloud } from "lucide-react";
import { writeFile } from "fs/promises";
import path from "path";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) notFound();

  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();

  const serviceData = service;

  // GÜNCELLEME İŞLEMİ
  async function updateService(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const icon = formData.get("icon") as string;
    const order = parseInt(formData.get("order") as string) || 0;
    
    const pageTitle = formData.get("pageTitle") as string;
    const pageSubtitle = formData.get("pageSubtitle") as string;
    const seoTitle = formData.get("seoTitle") as string;
    const seoDesc = formData.get("seoDesc") as string;
    const imageAlt = formData.get("imageAlt") as string;
    const content = formData.get("content") as string;

    let finalImage: string | null = serviceData.image ?? null; // Eskiyi tut
    const file = formData.get("imageFile") as File;
    
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueName = `service-${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const uploadDir = path.join(process.cwd(), "public/uploads");
      await writeFile(path.join(uploadDir, uniqueName), buffer);
      finalImage = `/uploads/${uniqueName}`;
    }

    await prisma.service.update({
      where: { id },
      data: { title, slug, description, icon, order, pageTitle, pageSubtitle, seoTitle, seoDesc, imageAlt, image: finalImage, content }
    });
    
    redirect("/admin/services");
  }

  // GÖRSELİ SİLME İŞLEMİ
  async function removeImage() {
    "use server";
    await prisma.service.update({ where: { id }, data: { image: null, imageAlt: null } });
    redirect(`/admin/services/${id}`);
  }

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <Link href="/admin/services" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors mb-6 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Geri Dön
      </Link>
      
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Hizmeti Düzenle</h1>

      <form action={updateService} className="space-y-8">
        
        {/* TEMEL BİLGİLER */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-4">Temel Bilgiler (Menü Görünümü)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Hizmet Adı</label><input type="text" name="title" defaultValue={service.title} required className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50" /></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">URL (Slug)</label><input type="text" name="slug" defaultValue={service.slug} required className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50" /></div>
          </div>
          <div><label className="block text-sm font-bold text-slate-700 mb-2">Menü Kısa Açıklaması</label><textarea name="description" defaultValue={service.description} required rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50"></textarea></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-bold text-slate-700 mb-2">İkon Adı (Lucide)</label><input type="text" name="icon" defaultValue={service.icon || ""} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50" /></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Sıralama</label><input type="number" name="order" defaultValue={service.order} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50" /></div>
          </div>
        </div>

        {/* HİZMET DETAY SAYFASI İÇERİĞİ & GÖRSEL */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-4">Sayfa İçeriği & Görsel (Lacivert Kutu)</h2>
          
          <div><label className="block text-sm font-bold text-slate-700 mb-2">Sayfa Ana Başlığı</label><input type="text" name="pageTitle" defaultValue={service.pageTitle || ""} placeholder="Örn: Veri Odaklı SEO ile Trafiğinizi Katlayın" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50" /></div>
          <div><label className="block text-sm font-bold text-slate-700 mb-2">Başlık Altı Açıklama (Alt Metin)</label><textarea name="pageSubtitle" defaultValue={service.pageSubtitle || ""} rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50"></textarea></div>
          
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-700 mb-4">Lacivert Kutudaki Görsel (JPG/PNG)</h3>
            
            {service.image ? (
              <div className="mb-4 bg-white p-2 rounded-xl border border-slate-200">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={service.image} alt="Hizmet" className="w-full h-40 object-cover rounded-lg mb-2" />
                <button type="submit" formAction={removeImage} className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors"><Trash2 className="w-4 h-4" /> Görseli Kaldır</button>
              </div>
            ) : (
              <div className="w-full h-32 bg-white rounded-xl mb-4 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-300">
                <ImageIcon className="w-8 h-8 mb-2" />
                <span className="text-xs font-semibold">Henüz Görsel Yok</span>
              </div>
            )}

            <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-4 hover:bg-white transition-colors cursor-pointer flex flex-col items-center justify-center text-center h-24 bg-white mb-4">
              <UploadCloud className="w-6 h-6 text-blue-500 mb-2" />
              <span className="text-xs font-semibold text-slate-600">Yeni Görsel Yükle (Değiştirmek İçin)</span>
              <input type="file" name="imageFile" accept="image/png, image/jpeg, image/webp" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            </div>
            
            <label className="block text-sm font-bold text-slate-700 mb-2">Görsel SEO (Alt Etiketi)</label>
            <input type="text" name="imageAlt" defaultValue={service.imageAlt || ""} placeholder="Örn: SEO Analiz Tablosu" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white" />
          </div>

          <div><label className="block text-sm font-bold text-slate-700 mb-2">Hizmet Detay Yazısı (HTML Desktekler)</label><textarea name="content" defaultValue={service.content || ""} rows={10} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50"></textarea></div>
        </div>

        {/* GOOGLE SEO */}
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-4">Google SEO Ayarları</h2>
          <div><label className="block text-sm font-bold text-slate-300 mb-2">Meta Title (Arama Başlığı)</label><input type="text" name="seoTitle" defaultValue={service.seoTitle || ""} className="w-full px-4 py-3 rounded-xl border border-slate-700 focus:ring-2 focus:ring-blue-500 bg-slate-800 text-white" /></div>
          <div><label className="block text-sm font-bold text-slate-300 mb-2">Meta Description (Arama Açıklaması)</label><textarea name="seoDesc" defaultValue={service.seoDesc || ""} rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-700 focus:ring-2 focus:ring-blue-500 bg-slate-800 text-white"></textarea></div>
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-xl font-extrabold transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 text-lg">
          <Save className="w-6 h-6" /> Değişiklikleri Kaydet
        </button>

      </form>
    </div>
  );
}