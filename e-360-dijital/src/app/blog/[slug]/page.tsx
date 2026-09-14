import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ArrowRight, Share2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { prisma } from "@/lib/prisma"; // YENİ: Artık data.ts yerine veritabanımızı okuyoruz

// Tüm blog slug'larını veritabanından çekip Next.js'e bildiriyoruz
export async function generateStaticParams() {
  const blogs = await prisma.blog.findMany({ select: { slug: true } });
  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

// SEO Meta Etiketlerini veritabanından dinamik alıyoruz
export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const post = await prisma.blog.findUnique({ where: { slug: params.slug } });
  
  if (!post) return { title: "Blog Bulunamadı" };

  return {
    title: post.seoTitle || `${post.title} | e-360 Dijital Blog`,
    description: post.seoDesc || post.excerpt,
    keywords: [post.category, "Çanakkale", "Dijital Pazarlama", "Ajans", "Rehber"]
  };
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  
  // Tıklanan blogu veritabanından buluyoruz
  const post = await prisma.blog.findUnique({ where: { slug: params.slug } });

  if (!post) {
    notFound();
  }

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(`Merhaba, "${post.title}" yazınızı okudum, hizmetleriniz hakkında görüşmek istiyorum.`)}`;

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24 overflow-x-hidden w-full max-w-[100vw]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl relative z-10">
        
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors mb-10 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Bloglara Dön
        </Link>

        {post.image && (
          <div className="w-full h-[250px] sm:h-[400px] rounded-[2rem] overflow-hidden mb-10 shadow-2xl border border-slate-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={post.image} 
              alt={post.imageAlt || post.title} 
              className="w-full h-full object-cover bg-slate-200"
            />
          </div>
        )}

        <div className="mb-12 border-b border-slate-300 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-3 py-1.5 rounded-full">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
              <Calendar className="w-3.5 h-3.5" /> {post.date}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
              <Clock className="w-3.5 h-3.5" /> {post.readTime}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
            {post.title}
          </h1>
          
          <p className="text-lg md:text-xl text-slate-800 font-semibold leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-lg border border-slate-200 mb-16">
          {/* YENİ: Veritabanındaki HTML içeriği ekrana basıyoruz */}
          <div 
            className="prose prose-slate prose-lg md:prose-xl max-w-none text-slate-800 prose-p:text-slate-800 prose-li:text-slate-800 prose-headings:font-bold prose-headings:text-slate-900 prose-strong:text-slate-900 prose-a:text-blue-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border border-slate-300">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src="https://ui-avatars.com/api/?name=Haktan+Demir&background=2563eb&color=fff&size=64" alt="Haktan Demir" className="w-full h-full rounded-full object-cover" />
               </div>
               <div>
                 <div className="text-base font-bold text-slate-900">Haktan Demir</div>
                 <div className="text-sm font-semibold text-slate-500">e-360 Dijital Kurucusu</div>
               </div>
            </div>
            <button className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors bg-slate-100 px-4 py-2 rounded-lg hover:bg-blue-50">
              <Share2 className="w-4 h-4" /> Paylaş
            </button>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/30 rounded-full blur-[80px] pointer-events-none" />
           <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 relative z-10">Markanız İçin Benzer Stratejiler Kurgulayalım</h3>
           <p className="text-slate-300 font-medium text-sm sm:text-base max-w-lg mx-auto mb-8 relative z-10">
             Okuduğunuz stratejileri teoride bırakmayın. e-360 Dijital uzmanlığıyla işletmenize özel bir büyüme planı çıkaralım.
           </p>
           <Link 
            href={whatsappUrl}
            target="_blank"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 relative z-10"
          >
            Hemen Ücretsiz Analiz İsteyin <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </div>
  );
}