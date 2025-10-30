"use client"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section id="home" className="relative py-20 sm:py-28 lg:py-36 overflow-hidden" aria-labelledby="hero-title">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6 lg:space-y-8">
            <h1
              id="hero-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance"
            >
              تعليم جامعي بدون حواجز
            </h1>

            <div className="space-y-4 text-lg sm:text-xl text-muted-foreground leading-relaxed">
              <p className="text-pretty">
                <span className="font-semibold text-foreground">المشكلة:</span> يواجه الطلاب ذوو الإعاقة صعوبات كبيرة في
                الوصول إلى المحتوى التعليمي الجامعي، مع نقص في المواد المعدلة ومعدلات تسرب عالية تصل إلى 40%.
              </p>
              <p className="text-pretty">
                <span className="font-semibold text-foreground">الحل:</span> منصة ذكاء اصطناعي متطورة تحول المحتوى
                التعليمي إلى صيغ مخصصة لكل نوع من أنواع الإعاقة، مع دعم شامل للغة العربية واللهجات المحلية.
              </p>
            </div>

            <div className="flex justify-center pt-4">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2 focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-transparent"
                onClick={() => {
                  const element = document.getElementById("features")
                  if (element) element.scrollIntoView({ behavior: "smooth" })
                }}
              >
                اكتشف المزيد
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
