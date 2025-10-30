import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Volume2, Hand, MessageSquare, ClipboardCheck, Users, Sparkles } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Volume2,
    title: "تخصيص المحتوى بالذكاء الاصطناعي",
    description: "تحويل الكتب والمحاضرات إلى صوت واضح (TTS)، ترجمة لغة الإشارة، نصوص مبسطة، وواقع معزز تفاعلي.",
    color: "text-primary",
    link: "/services#conversion-tool",
  },
  {
    icon: MessageSquare,
    title: "مساعد ذكي متعدد اللهجات",
    description:
      "روبوت محادثة يجيب على الأسئلة، يشرح الدروس المعقدة، ويقدم تمارين مخصصة بالعربية الفصحى واللهجات المحلية.",
    color: "text-secondary",
    link: "/services#chatbot",
  },
  {
    icon: ClipboardCheck,
    title: "امتحانات افتراضية آمنة",
    description:
      "اختبارات إلكترونية محمية تدعم جميع الأجهزة المساعدة مثل التحكم الصوتي، قارئات الشاشة، ولوحات المفاتيح المخصصة.",
    color: "text-accent",
    link: "/services",
  },
  {
    icon: Users,
    title: "مجتمع دعم متكامل",
    description: "منتديات نقاش، جلسات افتراضية مع مدربين متخصصين، ومجموعات دعم من الأقران لتبادل الخبرات والتشجيع.",
    color: "text-chart-4",
    link: "/services#consultation",
  },
  {
    icon: Hand,
    title: "دعم لغة الإشارة",
    description: "ترجمة فورية للمحتوى التعليمي إلى لغة الإشارة العربية مع مترجمين افتراضيين ثلاثيي الأبعاد.",
    color: "text-chart-5",
    link: "/services#conversion-tool",
  },
  {
    icon: Sparkles,
    title: "تجربة تعليمية مخصصة",
    description: "نظام ذكي يتعلم من تفضيلاتك واحتياجاتك لتقديم تجربة تعليمية فريدة ومناسبة لك تمامًا.",
    color: "text-primary",
    link: "/services",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-muted/30" aria-labelledby="features-title">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16 space-y-4">
          <h2 id="features-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            ميزات المنصة
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            نوفر مجموعة شاملة من الأدوات والخدمات المدعومة بالذكاء الاصطناعي لضمان تجربة تعليمية متميزة
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Link key={index} href={feature.link}>
                <Card
                  className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-105 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 h-full cursor-pointer"
                  tabIndex={0}
                  role="article"
                  aria-labelledby={`feature-title-${index}`}
                >
                  <CardHeader>
                    <div
                      className={`w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-4 ${feature.color}`}
                      aria-hidden="true"
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <CardTitle id={`feature-title-${index}`} className="text-xl sm:text-2xl text-right">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed text-right">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
