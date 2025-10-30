import { NextResponse } from "next/server"

// Mock peer matching - في الإنتاج، سيتم استخدام قاعدة بيانات حقيقية
const mockPeers = [
  {
    name: "أحمد محمد",
    subject: "الرياضيات",
    level: "متوسط",
    disability: "إعاقة بصرية",
    interests: "حل المسائل الرياضية، الألعاب التعليمية",
  },
  {
    name: "فاطمة علي",
    subject: "العلوم",
    level: "متقدم",
    disability: "إعاقة سمعية",
    interests: "التجارب العلمية، الفيزياء",
  },
  {
    name: "خالد سعيد",
    subject: "البرمجة",
    level: "مبتدئ",
    disability: "إعاقة حركية",
    interests: "تطوير المواقع، الذكاء الاصطناعي",
  },
]

export async function POST(req: Request) {
  try {
    const { studentName, subject, level, disability } = await req.json()

    // محاكاة البحث عن زميل مناسب
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // في الإنتاج، سيتم استخدام خوارزمية ذكية للمطابقة
    const match = mockPeers[Math.floor(Math.random() * mockPeers.length)]

    return NextResponse.json({ match })
  } catch (error) {
    console.error("[v0] Error finding peer:", error)
    return NextResponse.json({ error: "Failed to find peer" }, { status: 500 })
  }
}
