import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { revalidatePath } from "next/cache";

export default async function ServicesPage() {
  // Hizmetleri 'order' (sıra) numarasına göre dizerek çekiyoruz
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" }
  });

  // SİLME İŞLEMİ
  async function deleteService(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.service.delete({ where: { id } });
    revalidatePath("/admin/services");
    revalidatePath("/"); // Ana sayfayı da yenile
  }

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-1">Hizmetler</h1>
          <p className="text-slate-500 font-medium">Ana sayfadaki kaydırmalı kartları ve açılır menüyü yönetin.</p>
        </div>
        <Link href="/admin/services/new" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20">
          <Plus className="w-5 h-5" /> Yeni Hizmet Ekle
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 font-bold text-slate-600 w-16">Sıra</th>
              <th className="p-4 font-bold text-slate-600">Hizmet Adı</th>
              <th className="p-4 font-bold text-slate-600">URL (Slug)</th>
              <th className="p-4 font-bold text-slate-600">İkon Adı</th>
              <th className="p-4 font-bold text-slate-600 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-slate-500 font-medium">Henüz hiçbir hizmet eklenmemiş.</td></tr>
            ) : (
              services.map((service) => (
                <tr key={service.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{service.order}</td>
                  <td className="p-4 font-bold text-slate-900">{service.title}</td>
                  <td className="p-4 text-slate-500 text-sm">{service.slug}</td>
                  <td className="p-4 text-blue-600 text-sm font-semibold">{service.icon}</td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <Link href={`/admin/services/${service.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Düzenle">
                      <Pencil className="w-4 h-4" />
                    </Link>

                    <form action={deleteService}>
                      <input type="hidden" name="id" value={service.id} />
                      <button type="submit" className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors" title="Sil">
                        <Trash2 className="w-4 h-4" />
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