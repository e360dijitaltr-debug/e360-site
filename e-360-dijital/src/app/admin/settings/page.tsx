import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Save, Image as ImageIcon, UploadCloud, Code2 } from "lucide-react";
import { writeFile } from "fs/promises";
import path from "path";

export default async function SettingsPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "global" }
  });

  async function updateSettings(formData: FormData) {
    "use server";
    const heroTitle = formData.get("heroTitle") as string;
    const heroSubtitle = formData.get("heroSubtitle") as string;
    const problemTitle = formData.get("problemTitle") as string;
    const problemDesc = formData.get("problemDesc") as string;
    const growthTitle = formData.get("growthTitle") as string;
    const growthDesc = formData.get("growthDesc") as string;
    
    // SVG Kodları
    const logoSvg = formData.get("logoSvg") as string;
    const logoDarkSvg = formData.get("logoDarkSvg") as string;

    // 1. Dosya: BEYAZ LOGO (Koyu zeminler için)
    let finalLogoUrl = settings?.logoUrl || ""; 
    const file = formData.get("logoFile") as File;
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueName = `logo-${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const uploadDir = path.join(process.cwd(), "public/uploads");
      await writeFile(path.join(uploadDir, uniqueName), buffer);
      finalLogoUrl = `/uploads/${uniqueName}`;
    }

    // 2. Dosya: SİYAH/RENKLİ LOGO (Açık zeminler için)
    let finalLogoDarkUrl = settings?.logoDarkUrl || ""; 
    const darkFile = formData.get("logoDarkFile") as File;
    if (darkFile && darkFile.size > 0) {
      const bytes = await darkFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uniqueName = `logo-dark-${Date.now()}-${darkFile.name.replace(/\s+/g, '-')}`;
      const uploadDir = path.join(process.cwd(), "public/uploads");
      await writeFile(path.join(uploadDir, uniqueName), buffer);
      finalLogoDarkUrl = `/uploads/${uniqueName}`;
    }

    await prisma.siteSettings.upsert({
      where: { id: "global" },
      update: { 
        heroTitle, heroSubtitle, problemTitle, problemDesc, growthTitle, growthDesc, 
        logoUrl: finalLogoUrl, logoSvg, logoDarkUrl: finalLogoDarkUrl, logoDarkSvg 
      },
      create: { 
        id: "global", heroTitle, heroSubtitle, problemTitle, problemDesc, growthTitle, growthDesc, 
        logoUrl: finalLogoUrl, logoSvg, logoDarkUrl: finalLogoDarkUrl, logoDarkSvg 
      }
    });

    revalidatePath("/", "layout");
  }

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-1">Genel Ayarlar</h1>
        <p className="text-slate-500 font-medium">Sitenizin logolarını ve ana sayfa manşetlerini buradan yönetin.</p>
      </div>

      <form action={updateSettings} className="space-y-8">
        
        {/* LOGO 1: BEYAZ (KOYU ZEMİNLER İÇİN) */}
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-2">Açık Renkli Logo (Beyaz)</h2>
          <p className="text-slate-400 text-sm mb-6 border-b border-slate-800 pb-4">Footer'da ve sayfa en üstteyken koyu arka plan üzerinde görünür.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4 bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
              <div className="flex items-center gap-2 mb-2 text-blue-400 font-bold"><ImageIcon className="w-5 h-5" /> <span>PNG/JPG Yükle</span></div>
              {settings?.logoUrl && <div className="bg-slate-950 p-4 rounded-xl flex items-center justify-center"><img src={settings.logoUrl} alt="Logo" className="max-h-12 object-contain" /></div>}
              <div className="relative border-2 border-dashed border-slate-600 rounded-xl p-4 hover:bg-slate-800 transition-colors cursor-pointer flex flex-col items-center justify-center text-center h-28 bg-slate-900/50 text-slate-300">
                <UploadCloud className="w-6 h-6 mb-2" />
                <span className="text-xs font-medium px-2">Bilgisayarından Seç</span>
                <input type="file" name="logoFile" accept="image/png, image/jpeg, image/webp" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </div>
            </div>
            <div className="space-y-4 bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
              <div className="flex items-center gap-2 mb-2 text-blue-400 font-bold"><Code2 className="w-5 h-5" /> <span>SVG Kodu (Önerilen)</span></div>
              {settings?.logoSvg && <div dangerouslySetInnerHTML={{ __html: settings.logoSvg }} className="max-h-12 flex justify-center items-center [&>svg]:h-10 [&>svg]:w-auto text-white" />}
              <textarea name="logoSvg" defaultValue={settings?.logoSvg || ""} rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none text-white bg-slate-900 font-mono text-xs" placeholder="<svg>...</svg>"></textarea>
            </div>
          </div>
        </div>

        {/* LOGO 2: SİYAH/RENKLİ (AÇIK ZEMİNLER İÇİN) */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Koyu Renkli Logo (Siyah/Renkli)</h2>
          <p className="text-slate-500 text-sm mb-6 border-b border-slate-200 pb-4">Menü aşağı kaydırıldığında beyaz arka plan üzerinde görünür.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 mb-2 text-blue-600 font-bold"><ImageIcon className="w-5 h-5" /> <span>PNG/JPG Yükle</span></div>
              {settings?.logoDarkUrl && <div className="bg-white p-4 rounded-xl flex items-center justify-center border shadow-sm"><img src={settings.logoDarkUrl} alt="Logo Dark" className="max-h-12 object-contain" /></div>}
              <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-4 hover:bg-white transition-colors cursor-pointer flex flex-col items-center justify-center text-center h-28 bg-white">
                <UploadCloud className="w-6 h-6 text-slate-400 mb-2" />
                <span className="text-xs text-slate-500 font-medium px-2">Bilgisayarından Seç</span>
                <input type="file" name="logoDarkFile" accept="image/png, image/jpeg, image/webp" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </div>
            </div>
            <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 mb-2 text-blue-600 font-bold"><Code2 className="w-5 h-5" /> <span>SVG Kodu (Önerilen)</span></div>
              {settings?.logoDarkSvg && <div dangerouslySetInnerHTML={{ __html: settings.logoDarkSvg }} className="max-h-12 flex justify-center items-center [&>svg]:h-10 [&>svg]:w-auto text-slate-900" />}
              <textarea name="logoDarkSvg" defaultValue={settings?.logoDarkSvg || ""} rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 bg-white font-mono text-xs" placeholder="<svg>...</svg>"></textarea>
            </div>
          </div>
        </div>

        {/* ANA SAYFA AYARLARI */}
        <div className="space-y-6">
          
          {/* HERO */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b pb-4">Ana Sayfa - Karşılama Alanı (Hero)</h2>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Ana Manşet (Başlık)</label><input type="text" name="heroTitle" defaultValue={settings?.heroTitle || ""} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900" /></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Alt Açıklama</label><textarea name="heroSubtitle" defaultValue={settings?.heroSubtitle || ""} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"></textarea></div>
          </div>

          {/* PROBLEM */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b pb-4">Ana Sayfa - Problem Alanı</h2>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Başlık</label><input type="text" name="problemTitle" defaultValue={settings?.problemTitle || ""} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900" /></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Açıklama</label><textarea name="problemDesc" defaultValue={settings?.problemDesc || ""} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"></textarea></div>
          </div>

          {/* GROWTH */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b pb-4">Ana Sayfa - Büyüme Alanı</h2>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Başlık</label><input type="text" name="growthTitle" defaultValue={settings?.growthTitle || ""} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900" /></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-2">Açıklama</label><textarea name="growthDesc" defaultValue={settings?.growthDesc || ""} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-900"></textarea></div>
          </div>

        </div>

        {/* KAYDET BUTONU */}
        <div className="flex justify-end sticky bottom-6 z-10 mt-8">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold transition-all flex items-center gap-2 shadow-xl shadow-blue-600/30 text-lg">
            <Save className="w-6 h-6" /> Ayarları Kaydet ve Siteyi Güncelle
          </button>
        </div>
      </form>
    </div>
  );
}