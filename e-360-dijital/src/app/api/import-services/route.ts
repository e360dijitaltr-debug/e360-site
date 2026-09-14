import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { services as oldServices } from "@/config/data"; // Eski sabit verilerimiz

export async function GET() {
  try {
    let count = 0;
    
    for (const old of oldServices) {
      // Hizmet daha önce veritabanına eklenmiş mi diye kontrol et
      const existing = await prisma.service.findUnique({ 
        where: { slug: old.slug } 
      });
      
      // Eğer yoksa, veritabanına (panele) kaydet
      if (!existing) {
        await prisma.service.create({
          data: {
            title: old.title,
            slug: old.slug,
            description: old.description || "Açıklama girilecek...",
            icon: "Sparkles", // Eski dosyadaki ikon formatı farklı olduğu için şimdilik varsayılan ikon veriyoruz
            order: count + 1,
          }
        });
        count++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Tebrikler! ${count} adet eski hizmet başarıyla veritabanına kopyalandı. Artık Admin Panelinden hepsini yönetebilirsiniz.` 
    });
    
  } catch (error) {
    return NextResponse.json({ error: "Bir hata oluştu", details: error });
  }
}