"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExternalLink, Loader2, Volume2, Video, BookOpen, GraduationCap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type DisabilityType = "visual" | "hearing" | ""

type Course = {
  id: string
  name: string
  url: string
  description: string
  icon: React.ReactNode
  color: string
}

const courses: Course[] = [
  {
    id: "edraak",
    name: "إدراك",
    url: "https://www.edraak.org/",
    description:
      "منصة إدراك هي منصة تعليمية عربية توفر دورات مجانية في مختلف المجالات مثل البرمجة، التصميم، إدارة الأعمال، واللغات. تقدم محتوى عالي الجودة باللغة العربية مع شهادات معتمدة.",
    icon: <BookOpen className="h-6 w-6" />,
    color: "bg-blue-500",
  },
  {
    id: "rwaq",
    name: "رواق",
    url: "https://www.rwaq.org/",
    description:
      "رواق منصة تعليمية عربية تقدم دورات أكاديمية مجانية في مختلف التخصصات. تتميز بمحاضرات فيديو عالية الجودة وتفاعل مباشر مع المحاضرين والطلاب الآخرين.",
    icon: <GraduationCap className="h-6 w-6" />,
    color: "bg-green-500",
  },
  {
    id: "doroob",
    name: "دروب",
    url: "https://www.doroob.sa/",
    description:
      "دروب منصة تدريبية سعودية تقدم برامج تدريبية مجانية لتطوير المهارات المهنية والشخصية. تركز على المهارات المطلوبة في سوق العمل السعودي والخليجي.",
    icon: <BookOpen className="h-6 w-6" />,
    color: "bg-teal-500",
  },
  {
    id: "alison",
    name: "أليسون",
    url: "https://alison.com/courses?query=disability",
    description:
      "أليسون منصة تعليمية عالمية تقدم دورات مجانية في مختلف المجالات. تحتوي على قسم خاص بدورات الوصولية والإعاقة، مع محتوى مترجم للعربية في بعض الدورات.",
    icon: <GraduationCap className="h-6 w-6" />,
    color: "bg-purple-500",
  },
  {
    id: "deque",
    name: "Deque University",
    url: "https://dequeuniversity.com/",
    description:
      "جامعة Deque متخصصة في تعليم الوصولية الرقمية وتصميم المواقع والتطبيقات للأشخاص ذوي الإعاقة. تقدم دورات احترافية معتمدة في WCAG وأفضل ممارسات الوصولية.",
    icon: <BookOpen className="h-6 w-6" />,
    color: "bg-orange-500",
  },
]

export function CoursesSection() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [disabilityType, setDisabilityType] = useState<DisabilityType>("")
  const [isConverting, setIsConverting] = useState(false)
  const [convertedContent, setConvertedContent] = useState<string | null>(null)
  const { toast } = useToast()

  const handleConvertCourse = async (course: Course) => {
    if (!disabilityType) {
      toast({
        title: "خطأ",
        description: "الرجاء اختيار نوع الإعاقة أولاً",
        variant: "destructive",
      })
      return
    }

    setSelectedCourse(course)
    setIsConverting(true)
    setConvertedContent(null)

    try {
      // In production, fetch real course data from API
      // const response = await fetch(`/api/courses/${course.id}`)
      // const data = await response.json()

      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (disabilityType === "visual") {
        // Text-to-Speech conversion
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel()

          const utterance = new SpeechSynthesisUtterance(course.description)
          utterance.lang = "ar-SA"
          utterance.rate = 0.9
          utterance.pitch = 1
          utterance.volume = 1

          utterance.onend = () => {
            setIsConverting(false)
            toast({
              title: "تم التحويل بنجاح",
              description: `تم تحويل وصف دورة ${course.name} إلى صوت`,
            })
          }

          utterance.onerror = () => {
            setIsConverting(false)
            toast({
              title: "خطأ",
              description: "حدث خطأ أثناء تحويل النص إلى صوت",
              variant: "destructive",
            })
          }

          window.speechSynthesis.speak(utterance)
          setConvertedContent("audio")
        }
      } else if (disabilityType === "hearing") {
        // Sign language video conversion
        setConvertedContent("video")
        setIsConverting(false)
        toast({
          title: "تم التحويل بنجاح",
          description: `تم تحويل وصف دورة ${course.name} إلى فيديو لغة إشارة`,
        })
      }
    } catch (error) {
      console.error("[v0] Conversion error:", error)
      setIsConverting(false)
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء التحويل",
        variant: "destructive",
      })
    }
  }

  const stopAudio = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      setConvertedContent(null)
      setSelectedCourse(null)
    }
  }

  return (
    <div className="space-y-12">
      {/* Disability Type Selection */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>اختر نوع الإعاقة</CardTitle>
          <CardDescription>حدد نوع الإعاقة للحصول على المحتوى المناسب لك</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={disabilityType} onValueChange={(value) => setDisabilityType(value as DisabilityType)}>
            <SelectTrigger className="text-lg" aria-label="نوع الإعاقة">
              <SelectValue placeholder="اختر نوع الإعاقة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="visual" className="text-lg">
                <div className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  إعاقة بصرية (تحويل إلى صوت)
                </div>
              </SelectItem>
              <SelectItem value="hearing" className="text-lg">
                <div className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  إعاقة سمعية (تحويل إلى فيديو إشارة)
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className={`${course.color} text-white p-3 rounded-lg`}>{course.icon}</div>
                <CardTitle className="text-xl">{course.name}</CardTitle>
              </div>
              <CardDescription className="text-base leading-relaxed" dir="rtl">
                {course.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild variant="outline" className="w-full text-base bg-transparent" size="lg">
                <a href={course.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  زيارة المنصة
                </a>
              </Button>
              <Button
                onClick={() => handleConvertCourse(course)}
                disabled={isConverting || !disabilityType}
                className="w-full text-base"
                size="lg"
              >
                {isConverting && selectedCourse?.id === course.id ? (
                  <>
                    <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                    جاري التحويل...
                  </>
                ) : (
                  "تحويل الدورة"
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Conversion Result */}
      {convertedContent && selectedCourse && (
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {disabilityType === "visual" ? (
                <Volume2 className="h-6 w-6 text-primary" />
              ) : (
                <Video className="h-6 w-6 text-primary" />
              )}
              نتيجة التحويل - {selectedCourse.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {disabilityType === "visual" && convertedContent === "audio" && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Volume2 className="h-6 w-6 text-primary animate-pulse" />
                  <p className="text-lg font-semibold">جاري تشغيل الصوت...</p>
                </div>
                <p className="text-muted-foreground mb-4" dir="rtl">
                  يتم الآن قراءة وصف دورة {selectedCourse.name} بصوت عالٍ.
                </p>
                <Button onClick={stopAudio} variant="outline" size="lg">
                  إيقاف الصوت
                </Button>
              </div>
            )}

            {disabilityType === "hearing" && convertedContent === "video" && (
              <div>
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border-2 border-primary/20 mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <Video className="h-16 w-16 mx-auto mb-4 text-primary" />
                      <h3 className="text-xl font-bold mb-2">فيديو لغة الإشارة</h3>
                      <p className="text-muted-foreground" dir="rtl">
                        تم تحويل وصف دورة {selectedCourse.name} إلى لغة الإشارة العربية
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                  <p className="text-sm" dir="rtl">
                    <strong>ملاحظة:</strong> في النسخة الكاملة، سيتم عرض فيديو حقيقي بلغة الإشارة العربية باستخدام
                    واجهات برمجية متخصصة أو قاعدة بيانات لغة الإشارة.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
