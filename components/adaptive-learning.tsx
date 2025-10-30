"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Brain, TrendingUp, Target, FileText, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PerformanceReport {
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  learningPlan: string
}

export function AdaptiveLearning() {
  const [studentAnswers, setStudentAnswers] = useState("")
  const [subject, setSubject] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [report, setReport] = useState<PerformanceReport | null>(null)
  const { toast } = useToast()

  const analyzePerformance = async () => {
    if (!studentAnswers.trim() || !subject.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال المادة وإجابات الطالب",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)

    try {
      const response = await fetch("/api/analyze-performance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentAnswers, subject }),
      })

      const data = await response.json()
      setReport(data.report)

      toast({
        title: "تم التحليل بنجاح",
        description: "تم إنشاء تقرير الأداء والخطة التعليمية الشخصية",
      })
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحليل الأداء",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6 bg-muted/30">
          <div className="space-y-4">
            <div>
              <Label htmlFor="subject" className="text-lg font-semibold mb-2 block">
                المادة الدراسية
              </Label>
              <Textarea
                id="subject"
                placeholder="مثال: الرياضيات - الجبر"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="min-h-[60px] text-lg"
                dir="rtl"
              />
            </div>

            <div>
              <Label htmlFor="answers" className="text-lg font-semibold mb-2 block">
                إجابات الطالب أو نتائج التمارين
              </Label>
              <Textarea
                id="answers"
                placeholder="أدخل إجابات الطالب أو نتائج التمارين السابقة لتحليل الأداء..."
                value={studentAnswers}
                onChange={(e) => setStudentAnswers(e.target.value)}
                className="min-h-[200px] text-lg"
                dir="rtl"
              />
            </div>

            <Button onClick={analyzePerformance} disabled={isAnalyzing} size="lg" className="w-full text-lg">
              {isAnalyzing ? (
                <>
                  <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                  جاري التحليل...
                </>
              ) : (
                <>
                  <Brain className="ml-2 h-5 w-5" />
                  تحليل الأداء وإنشاء خطة تعليمية
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Report Section */}
        {report && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Strengths */}
            <Card className="p-6 border-2 border-green-500/20 bg-green-500/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-700 dark:text-green-400">نقاط القوة</h3>
              </div>
              <ul className="space-y-2">
                {report.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2 text-right">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-muted-foreground">{strength}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Weaknesses */}
            <Card className="p-6 border-2 border-orange-500/20 bg-orange-500/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-orange-700 dark:text-orange-400">نقاط التحسين</h3>
              </div>
              <ul className="space-y-2">
                {report.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start gap-2 text-right">
                    <span className="text-orange-600 mt-1">!</span>
                    <span className="text-muted-foreground">{weakness}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Recommendations */}
            <Card className="p-6 border-2 border-blue-500/20 bg-blue-500/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400">التوصيات</h3>
              </div>
              <ul className="space-y-2">
                {report.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2 text-right">
                    <span className="text-blue-600 mt-1">→</span>
                    <span className="text-muted-foreground">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Learning Plan */}
            <Card className="p-6 border-2 border-primary/20 bg-primary/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">الخطة التعليمية الشخصية</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-right whitespace-pre-line">
                {report.learningPlan}
              </p>
            </Card>
          </div>
        )}
      </div>

      {/* Info Card */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          كيف يعمل النظام التكيفي؟
        </h4>
        <ul className="space-y-2 text-muted-foreground text-right">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>يحلل الذكاء الاصطناعي إجابات الطالب ويحدد مستوى الفهم</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>يكتشف نقاط القوة والضعف في المواد المختلفة</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>يقترح تمارين إضافية وتوضيحات بطرق مختلفة للمفاهيم الصعبة</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>ينشئ خطة تعليمية شخصية مناسبة لقدرات كل طالب</span>
          </li>
        </ul>
      </Card>
    </div>
  )
}
