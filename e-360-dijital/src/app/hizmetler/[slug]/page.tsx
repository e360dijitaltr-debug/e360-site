import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import * as LucideIcons from "lucide-react"; // YENİ: İkonları veritabanından dinamik çekeceğiz
import { siteConfig } from "@/config/site";
import ServiceVisualizer from "@/components/sections/ServiceVisualizer";
import { prisma } from "@/lib/prisma"; // YENİ: Veritabanı bağlantısı

// 1. STATİK YOLLAR OLUŞTURUCU
export async function generateStaticParams() {
  const services = await prisma.service.findMany({ select: { slug: true } });
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// 2. DİNAMİK SEO
export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const service = await prisma.service.findUnique({ where: { slug: params.slug } });
  
  if (!service) return { title: "Hizmet Bulunamadı" };

  return {
    title: service.seoTitle || `${service.title} | e-360 Dijital`,
    description: service.seoDesc || service.description,
  };
}

// 3. SAYFA TASARIMI VE İÇERİK
export default async function ServicePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  
  // Hizmeti veritabanından bul
  const service = await prisma.service.findUnique({ where: { slug: params.slug } });

  // Eğer URL yanlışsa 404'e at
  if (!service) {
    notFound();
  }

  // YENİ: İkonu veritabanındaki ismine göre bul
  const Icon = (LucideIcons as any)[service.icon || "Circle"] || LucideIcons.Circle;
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(`Merhaba, ${service.title} hizmetiniz hakkında bilgi almak istiyorum.`)}`;

  return (
    // ZIRHLANMIŞ ANA KAPSAYICI (Tasarımın aynen korundu)
    <div className="bg-slate-50 min-h-screen pt-28 pb-20 overflow-x-hidden w-full max-w-[100vw]">
      
      {/* Hero Header for Service (Üst Siyah Alan) */}
      <div className="bg-slate-950 text-white py-16 sm:py-24 relative overflow-hidden border-b border-slate-800 shadow-xl mb-16 w-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-blue-600/10 blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.2)]">
              <Icon className="w-7 h-7" />
            </div>
            <span className="text-sm font-semibold tracking-wider text-blue-400 uppercase">Hizmet Detayı</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {service.pageTitle || service.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
            {service.pageSubtitle || service.description}
          </p>
        </div>
      </div>

      {/* Content Layout */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 items-start w-full">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 w-full min-w-0">
            
            {/* YENİ: İSTEDİĞİN GÖRSEL (PREMIUM LACİVERT KUTU) */}
            {service.image && (
              <div className="bg-slate-900 rounded-[2rem] p-4 sm:p-6 shadow-2xl mb-10 relative overflow-hidden border border-slate-800">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[80px] pointer-events-none" />
                <div className="relative z-10 w-full h-[300px] sm:h-[400px] rounded-xl overflow-hidden border border-slate-700/50 bg-slate-950/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={service.image} 
                    alt={service.imageAlt || service.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            )}

            {/* Makale & İçerik Alanı */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm border border-slate-100 mb-10 w-full overflow-hidden">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Bu hizmet size ne katar?</h2>
              
              {/* YENİ: Admin panelinden girilen dinamik HTML içerik burada görünür */}
              {service.content ? (
                <div 
                  className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed mb-12 prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-blue-600"
                  dangerouslySetInnerHTML={{ __html: service.content }}
                />
              ) : (
                <p className="text-slate-600 leading-relaxed mb-12">
                  Sektörünüz ne olursa olsun, doğru planlanmış bir {service.title} stratejisi, dijitaldeki varlığınızı güçlü bir satış kanalına dönüştürür. Hedef kitlenizin davranışlarını analiz ediyor ve bütçenizi en verimli şekilde kullanıyoruz.
                </p>
              )}

              {/* Senin Orijinal Dinamik Grafik Bileşenin */}
              <ServiceVisualizer slug={service.slug} />

            </div>
          </div>

          {/* Sidebar CTA (Right) - (Tasarımın aynen korundu) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32 w-full">
            <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden w-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-[40px]" />
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Projeye Başlayalım</h3>
              <p className="text-slate-400 text-sm mb-8 relative z-10">
                {service.title} konusunda uzman ekibimizle markanızı analiz edelim ve size özel bir yol haritası çıkaralım.
              </p>
              
              <ul className="space-y-4 mb-8 relative z-10">
                <li className="flex items-center gap-3 text-slate-300 text-sm min-w-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> <span className="truncate">Ücretsiz Ön Analiz</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300 text-sm min-w-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> <span className="truncate">Şeffaf Fiyatlandırma</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300 text-sm min-w-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> <span className="truncate">Sonuç Odaklı Strateji</span>
                </li>
              </ul>

              <Link href={whatsappUrl} target="_blank" className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-500 transition-colors relative z-10">
                Hemen İletişime Geç <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100 flex items-center gap-4 w-full">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl shrink-0">?</div>
              <div className="min-w-0">
                <div className="font-bold text-slate-900 text-sm">Sorularınız mı var?</div>
                <div className="text-slate-600 text-xs mt-1 truncate">
                  Bizi arayın: <a href={`tel:${siteConfig.contact.phone.replace(/\s/g,'')}`} className="text-blue-600 font-bold">{siteConfig.contact.phone}</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}