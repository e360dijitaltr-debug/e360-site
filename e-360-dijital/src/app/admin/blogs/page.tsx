import Link from "next/link";
import { Plus, Trash2, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function deleteBlog(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await prisma.blog.delete({ where: { id } });
  revalidatePath("/admin/blogs");
}

export default async function AdminBlogsPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-1">Blog Yazıları</h1>
          <p className="text-slate-500 font-medium">Sitedeki tüm blog yazılarını buradan yönetebilirsiniz.</p>
        </div>
        <Link href="/admin/blogs/new" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20">
          <Plus className="w-5 h-5" /> Yeni Blog Ekle
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold text-sm">
              <th className="p-4">Başlık</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Tarih</th>
              <th className="p-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {blogs.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500 font-medium">Henüz hiç blog yazısı eklenmemiş.</td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900 max-w-md truncate">{blog.title}</td>
                  <td className="p-4 text-slate-600">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">{blog.category}</span>
                  </td>
                  <td className="p-4 text-slate-500 text-sm font-medium">{blog.date}</td>
                  <td className="p-4 text-right flex items-center justify-end gap-2">
                    {/* YENİ: Düzenleme Sayfasına Giden Buton */}
                    <Link href={`/admin/blogs/${blog.id}/edit`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Düzenle">
                      <Pencil className="w-5 h-5" />
                    </Link>

                    <form action={deleteBlog}>
                      <input type="hidden" name="id" value={blog.id} />
                      <button type="submit" className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Sil">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}