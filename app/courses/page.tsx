import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CoursesSection } from "@/components/courses-section"

export const metadata = {
  title: "دورات - آفاق الوصول",
  description: "منصات تعليمية عربية وعالمية للطلاب ذوي الإعاقة مع إمكانية تحويل المحتوى إلى صوت أو فيديو لغة إشارة",
}

export default function CoursesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background" dir="rtl">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">منصات الدورات التعليمية</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance max-w-3xl mx-auto">
              اكتشف أفضل المنصات التعليمية العربية والعالمية المتاحة للطلاب ذوي الإعاقة. يمكنك تحويل محتوى أي دورة إلى
              صوت أو فيديو لغة إشارة حسب احتياجاتك.
            </p>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <CoursesSection />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
