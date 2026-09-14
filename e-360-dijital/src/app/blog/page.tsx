import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock, BookOpen } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Dijital Pazarlama Blogu | e-360 Dijital",
  description: "Dijital pazarlama stratejileri, SEO taktikleri, Çanakkale reklam trendleri ve Google/Meta Ads rehberleri ile işletmenizi büyütün.",
};

export default async function BlogPage() {
  const dbBlogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24 overflow-x-hidden">
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl mb-16 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 text-blue-700 font-bold text-xs mb-6 uppercase tracking-widest border border-blue-200">
            <BookOpen className="w-4 h-4" /> BİLGİ MERKEZİ
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Dijital dünyada <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              güncel kalın.
            </span>
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed font-semibold">
            Veri odaklı büyüme taktikleri, reklam algoritmalarındaki son güncellemeler ve e-360 Dijital uzmanlarının sektörel öngörüleri.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dbBlogs.map((post) => (
            <div
              key={post.id}
              className="group bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden flex flex-col hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2"
            >
              <Link href={`/blog/${post.slug}`} className="flex flex-col h-full relative">
                
                <div className="w-full h-48 sm:h-56 overflow-hidden relative border-b border-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    // YENİ: Resim yoksa boşluk atmak yerine varsayılan bir ajans görseli ekliyoruz. (Hata burada çözüldü)
                    src={post.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 bg-slate-200" 
                  />
                  <div className="absolute top-4 left-4">
                     <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-blue-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                        {post.category}
                     </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors pr-6">
                    {post.title}
                  </h3>
                  <p className="text-slate-800 font-medium text-sm leading-relaxed mb-8 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mt-auto pt-6 border-t border-slate-100">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> {post.readTime}</span>
                  </div>

                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-slate-900 group-hover:bg-blue-600 group-hover:text-white group-hover:border-transparent transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 shadow-lg">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}