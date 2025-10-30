import { Card, CardContent } from "@/components/ui/card"
import { Target, TrendingUp, Globe } from "lucide-react"

const goals = [
  {
    icon: Target,
    title: "5,000 طالب",
    description: "في السنة الأولى",
    color: "text-primary",
  },
  {
    icon: TrendingUp,
    title: "زيادة 50%",
    description: "في معدل التخرج",
    color: "text-secondary",
  },
  {
    icon: Globe,
    title: "شراكات دولية",
    description: "مع UNESCO والجامعات",
    color: "text-accent",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28" aria-labelledby="about-title">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16 space-y-4">
          <h2 id="about-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            عن المشروع
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            نسعى لتحقيق رؤية طموحة لجعل التعليم الجامعي متاحًا للجميع دون استثناء
          </p>
        </div>

        {/* Goals */}
        <div className="grid sm:grid-cols-3 gap-6">
          {goals.map((goal, index) => {
            const Icon = goal.icon
            return (
              <Card
                key={index}
                className="text-center border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                role="article"
                aria-label={`${goal.title} - ${goal.description}`}
              >
                <CardContent className="pt-8 pb-8 space-y-4">
                  <div
                    className={`w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto ${goal.color}`}
                    aria-hidden="true"
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{goal.title}</h3>
                    <p className="text-base text-muted-foreground">{goal.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
