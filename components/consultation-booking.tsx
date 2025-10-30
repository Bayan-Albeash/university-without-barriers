"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User, Mail, Phone, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ConsultationBooking() {
  const { toast } = useToast()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    consultationType: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Form validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.consultationType ||
      !formData.preferredDate ||
      !formData.preferredTime
    ) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول المطلوبة",
        variant: "destructive",
      })
      return
    }

    setSubmitted(true)

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      consultationType: "",
      preferredDate: "",
      preferredTime: "",
      notes: "",
    })
  }

  if (submitted) {
    return (
      <Card className="border-2 max-w-3xl mx-auto bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="pt-12 pb-12 text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-6">
              <CheckCircle2 className="h-16 w-16 text-primary" />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-3xl font-bold text-primary">تم تأكيد حجزك بنجاح!</h3>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              ستصلك دعوة للمكالمة على رقمك الهاتف وعن طريق الإيميل
            </p>
          </div>

          <div className="pt-4 space-y-3">
            <p className="text-base text-muted-foreground">
              سيتواصل معك أحد المختصين لتأكيد موعد الجلسة الاستشارية قريباً
            </p>
            <Button onClick={() => setSubmitted(false)} size="lg" className="text-base">
              احجز جلسة أخرى
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">احجز جلسة استشارية</CardTitle>
        <CardDescription className="text-base">
          املأ النموذج أدناه لحجز جلسة دعم نفسي أو إرشاد أكاديمي مع أحد المختصين
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base">
                الاسم الكامل <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="أدخل اسمك الكامل"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="text-base pr-10"
                  aria-required="true"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">
                البريد الإلكتروني <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="text-base pr-10"
                  aria-required="true"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base">
              رقم الهاتف
            </Label>
            <div className="relative">
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="+966 XX XXX XXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="text-base pr-10"
                dir="ltr"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="consultation-type" className="text-base">
              نوع الاستشارة <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.consultationType}
              onValueChange={(value) => setFormData({ ...formData, consultationType: value })}
              required
            >
              <SelectTrigger id="consultation-type" className="text-base" aria-required="true">
                <SelectValue placeholder="اختر نوع الاستشارة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="psychological">دعم نفسي</SelectItem>
                <SelectItem value="academic">إرشاد أكاديمي</SelectItem>
                <SelectItem value="career">توجيه مهني</SelectItem>
                <SelectItem value="social">دعم اجتماعي</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="preferred-date" className="text-base">
                التاريخ المفضل <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="preferred-date"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  required
                  className="text-base pr-10"
                  aria-required="true"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferred-time" className="text-base">
                الوقت المفضل <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Select
                  value={formData.preferredTime}
                  onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}
                  required
                >
                  <SelectTrigger id="preferred-time" className="text-base pr-10" aria-required="true">
                    <SelectValue placeholder="اختر الوقت" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">09:00 صباحاً</SelectItem>
                    <SelectItem value="10:00">10:00 صباحاً</SelectItem>
                    <SelectItem value="11:00">11:00 صباحاً</SelectItem>
                    <SelectItem value="12:00">12:00 ظهراً</SelectItem>
                    <SelectItem value="13:00">01:00 مساءً</SelectItem>
                    <SelectItem value="14:00">02:00 مساءً</SelectItem>
                    <SelectItem value="15:00">03:00 مساءً</SelectItem>
                    <SelectItem value="16:00">04:00 مساءً</SelectItem>
                    <SelectItem value="17:00">05:00 مساءً</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-base">
              ملاحظات إضافية
            </Label>
            <Textarea
              id="notes"
              placeholder="أخبرنا عن أي تفاصيل إضافية تود مشاركتها..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="text-base resize-none"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full text-base bg-primary text-primary-foreground hover:bg-primary/90"
          >
            تأكيد الحجز
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
