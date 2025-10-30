"use client"

import { Navbar } from "@/components/navbar"
import { ConversionTool } from "@/components/conversion-tool"
import { StudyChatbot } from "@/components/study-chatbot"
import { ConsultationBooking } from "@/components/consultation-booking"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { MessageSquare, FileText, Sparkles, HeartHandshake } from "lucide-react"

export default function ServicesPage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">أدوات ذكية لتعليم أفضل</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance bg-gradient-to-l from-primary to-accent bg-clip-text text-transparent">
            خدمات المنصة التعليمية
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-balance leading-relaxed">
            مجموعة متكاملة من الأدوات الذكية المصممة خصيصاً لتسهيل التعلم وتحويل المحتوى التعليمي إلى صيغ متعددة تناسب
            جميع الاحتياجات
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <button
            onClick={() => scrollToSection("conversion-tool")}
            className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-right"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <FileText className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">تحويل المحتوى</h3>
            <p className="text-muted-foreground leading-relaxed">
              حول النصوص إلى صوت، طريقة برايل، أو لغة إشارة بسهولة تامة
            </p>
          </button>

          <button
            onClick={() => scrollToSection("chatbot")}
            className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-right"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <MessageSquare className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">المساعد الذكي</h3>
            <p className="text-muted-foreground leading-relaxed">
              احصل على إجابات فورية لأسئلتك الدراسية بلغة عربية مبسطة
            </p>
          </button>

          <button
            onClick={() => scrollToSection("consultation")}
            className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-right"
          >
            <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
              <HeartHandshake className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">الدعم النفسي</h3>
            <p className="text-muted-foreground leading-relaxed">
              احجز جلسة استشارية مع مختصين للدعم النفسي والإرشاد الأكاديمي
            </p>
          </button>
        </div>

        {/* Main Services */}
        <div className="space-y-12">
          {/* Conversion Tool Section */}
          <div
            id="conversion-tool"
            className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl scroll-mt-20"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">أداة تحويل المحتوى</h2>
                <p className="text-muted-foreground">حول المحتوى التعليمي إلى الصيغة المناسبة لك</p>
              </div>
            </div>
            <ConversionTool />
          </div>

          {/* Chatbot Section */}
          <div id="chatbot" className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl scroll-mt-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">المساعد الدراسي الذكي</h2>
                <p className="text-muted-foreground">اسأل أي سؤال واحصل على إجابات مفصلة ومبسطة</p>
              </div>
            </div>
            <StudyChatbot />
          </div>

          {/* Consultation Section */}
          <div
            id="consultation"
            className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl scroll-mt-20"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <HeartHandshake className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">الدعم النفسي والإرشادي</h2>
                <p className="text-muted-foreground">
                  نوفر خدمات دعم نفسي وإرشاد أكاديمي متخصص لمساعدة الطلاب على التغلب على التحديات وتحقيق النجاح
                </p>
              </div>
            </div>
            <ConsultationBooking />
          </div>
        </div>
      </section>

      <Footer />
      <Toaster />
    </main>
  )
}
