"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ContactSection() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    disabilityType: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Form validation
    if (!formData.name || !formData.email || !formData.disabilityType || !formData.message) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول المطلوبة",
        variant: "destructive",
      })
      return
    }

    // Success message
    toast({
      title: "تم الإرسال بنجاح!",
      description: "شكراً لتواصلك معنا. سنرد عليك في أقرب وقت ممكن.",
    })

    // Reset form
    setFormData({
      name: "",
      email: "",
      disabilityType: "",
      message: "",
    })
  }

  return (
    <section id="contact" className="py-20 sm:py-28 bg-muted/30" aria-labelledby="contact-title">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16 space-y-4">
          <h2 id="contact-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            اتصل بنا
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            نحن هنا لمساعدتك. تواصل معنا وسنكون سعداء بالرد على استفساراتك
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">نموذج التسجيل</CardTitle>
              <CardDescription className="text-base">املأ النموذج أدناه وسنتواصل معك قريباً</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base">
                    الاسم الكامل <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="أدخل اسمك الكامل"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="text-base"
                    aria-required="true"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">
                    البريد الإلكتروني <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="text-base"
                    aria-required="true"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="disability-type" className="text-base">
                    نوع الإعاقة <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.disabilityType}
                    onValueChange={(value) => setFormData({ ...formData, disabilityType: value })}
                    required
                  >
                    <SelectTrigger id="disability-type" className="text-base" aria-required="true">
                      <SelectValue placeholder="اختر نوع الإعاقة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visual">إعاقة بصرية</SelectItem>
                      <SelectItem value="hearing">إعاقة سمعية</SelectItem>
                      <SelectItem value="mobility">إعاقة حركية</SelectItem>
                      <SelectItem value="cognitive">إعاقة معرفية</SelectItem>
                      <SelectItem value="multiple">إعاقات متعددة</SelectItem>
                      <SelectItem value="other">أخرى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-base">
                    رسالتك <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="اكتب رسالتك هنا..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="text-base resize-none"
                    aria-required="true"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-base bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  إرسال الرسالة
                  <Send className="mr-2 h-5 w-5" aria-hidden="true" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-2">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">البريد الإلكتروني</h3>
                    <a
                      href="mailto:info@university-without-barriers.edu"
                      className="text-base text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                    >
                      info@university-without-barriers.edu
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-secondary" aria-hidden="true" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">الهاتف</h3>
                    <a
                      href="tel:+966123456789"
                      className="text-base text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                      dir="ltr"
                    >
                      +966 12 345 6789
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
