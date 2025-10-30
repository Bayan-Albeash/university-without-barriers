"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, UserPlus, MessageCircle, BookOpen, CheckCircle, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PeerMatch {
  name: string
  subject: string
  level: string
  disability: string
  interests: string
}

export function PeerLearning() {
  const [studentName, setStudentName] = useState("")
  const [subject, setSubject] = useState("")
  const [level, setLevel] = useState("")
  const [disability, setDisability] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [match, setMatch] = useState<PeerMatch | null>(null)
  const { toast } = useToast()

  const findPeer = async () => {
    if (!studentName.trim() || !subject || !level || !disability) {
      toast({
        title: "خطأ",
        description: "الرجاء إكمال جميع الحقول",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)

    try {
      const response = await fetch("/api/find-peer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentName, subject, level, disability }),
      })

      const data = await response.json()
      setMatch(data.match)

      toast({
        title: "تم العثور على زميل دراسة!",
        description: "تم إيجاد زميل مناسب للتعلم معاً",
      })
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء البحث عن زميل",
        variant: "destructive",
      })
    } finally {
      setIsSearching(false)
    }
  }

  const startChat = () => {
    toast({
      title: "قريباً",
      description: "سيتم إطلاق ميزة المحادثة المباشرة قريباً",
    })
  }

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card className="p-6 bg-muted/30">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-lg font-semibold mb-2 block">
              اسم الطالب
            </Label>
            <Input
              id="name"
              placeholder="أدخل اسمك"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="text-lg"
              dir="rtl"
            />
          </div>

          <div>
            <Label htmlFor="subject-select" className="text-lg font-semibold mb-2 block">
              المادة الدراسية
            </Label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger id="subject-select" className="text-lg" dir="rtl">
                <SelectValue placeholder="اختر المادة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="math">الرياضيات</SelectItem>
                <SelectItem value="science">العلوم</SelectItem>
                <SelectItem value="arabic">اللغة العربية</SelectItem>
                <SelectItem value="english">اللغة الإنجليزية</SelectItem>
                <SelectItem value="history">التاريخ</SelectItem>
                <SelectItem value="programming">البرمجة</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="level-select" className="text-lg font-semibold mb-2 block">
              المستوى الدراسي
            </Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger id="level-select" className="text-lg" dir="rtl">
                <SelectValue placeholder="اختر المستوى" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">مبتدئ</SelectItem>
                <SelectItem value="intermediate">متوسط</SelectItem>
                <SelectItem value="advanced">متقدم</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="disability-select" className="text-lg font-semibold mb-2 block">
              نوع الإعاقة
            </Label>
            <Select value={disability} onValueChange={setDisability}>
              <SelectTrigger id="disability-select" className="text-lg" dir="rtl">
                <SelectValue placeholder="اختر نوع الإعاقة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visual">إعاقة بصرية</SelectItem>
                <SelectItem value="hearing">إعاقة سمعية</SelectItem>
                <SelectItem value="mobility">إعاقة حركية</SelectItem>
                <SelectItem value="cognitive">إعاقة ذهنية</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={findPeer} disabled={isSearching} size="lg" className="w-full text-lg">
            {isSearching ? (
              <>
                <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                جاري البحث...
              </>
            ) : (
              <>
                <UserPlus className="ml-2 h-5 w-5" />
                ابحث عن زميل دراسة
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Match Result */}
      {match && (
        <Card className="p-6 border-2 border-primary/20 bg-primary/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">تم العثور على زميل مناسب!</h3>
              <p className="text-muted-foreground">يمكنكما البدء بالتعلم معاً الآن</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 text-right">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold">الاسم</p>
                <p className="text-muted-foreground">{match.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-right">
              <BookOpen className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold">المادة والمستوى</p>
                <p className="text-muted-foreground">
                  {match.subject} - {match.level}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-right">
              <MessageCircle className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold">الاهتمامات المشتركة</p>
                <p className="text-muted-foreground">{match.interests}</p>
              </div>
            </div>
          </div>

          <Button onClick={startChat} size="lg" className="w-full text-lg">
            <MessageCircle className="ml-2 h-5 w-5" />
            ابدأ المحادثة
          </Button>
        </Card>
      )}

      {/* Info Card */}
      <Card className="p-6 bg-accent/5 border-accent/20">
        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <Users className="w-5 h-5 text-accent" />
          مميزات التعلم مع زميل
        </h4>
        <ul className="space-y-2 text-muted-foreground text-right">
          <li className="flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            <span>نظام ذكي يربطك بزميل مناسب لمستواك واهتماماتك</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            <span>بيئة آمنة ومراقبة للتفاعل بين الطلاب</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            <span>مناسب لجميع أنواع الإعاقات مع أدوات تواصل متخصصة</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            <span>تبادل المعرفة والخبرات بطريقة تفاعلية ومحفزة</span>
          </li>
        </ul>
      </Card>
    </div>
  )
}
