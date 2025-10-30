"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, Loader2, Bot, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function StudyChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "مرحباً! أنا مساعدك الذكي للدراسة. يمكنني مساعدتك في فهم المواد الدراسية، الإجابة على أسئلتك، وتقديم شروحات مبسطة. كيف يمكنني مساعدتك اليوم؟",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // In production, call your AI API here
      // Example with Vercel AI SDK:
      // const response = await fetch('/api/chat', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ messages: [...messages, userMessage] })
      // })
      // const data = await response.json()

      // Simulate AI response for demo
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateMockResponse(userMessage.content),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("[v0] Chat error:", error)
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إرسال الرسالة. الرجاء المحاولة مرة أخرى",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-balance">المساعد الذكي للدراسة</h2>
          <p className="text-xl text-muted-foreground text-balance">
            اسأل أي سؤال عن دراستك واحصل على إجابات فورية ومبسطة
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-primary" />
              شات بوت الدراسة
            </CardTitle>
            <CardDescription>مساعد ذكي يدعم اللهجات العربية المختلفة ويقدم شروحات مبسطة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Chat Messages */}
            <ScrollArea ref={scrollAreaRef} className="h-[500px] w-full rounded-lg border bg-muted/30 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <Bot className="h-5 w-5 text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-background border border-border"
                      }`}
                    >
                      <p className="text-sm leading-relaxed" dir="rtl">
                        {message.content}
                      </p>
                      <p
                        className={`text-xs mt-2 ${
                          message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString("ar-SA", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {message.role === "user" && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <User className="h-5 w-5 text-secondary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Bot className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="bg-background border border-border rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground">جاري الكتابة...</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="اكتب سؤالك هنا..."
                className="flex-1 text-lg"
                dir="rtl"
                disabled={isLoading}
                aria-label="رسالة الشات"
              />
              <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()} size="lg" className="px-6">
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" aria-label="إرسال" />
                )}
              </Button>
            </div>

            {/* Quick Questions */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground">أسئلة سريعة:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "اشرح لي مفهوم الجاذبية",
                  "ما هي قواعد النحو الأساسية؟",
                  "كيف أحل معادلة من الدرجة الثانية؟",
                  "ما هي الثورة الصناعية؟",
                ].map((question) => (
                  <Button
                    key={question}
                    variant="outline"
                    size="sm"
                    onClick={() => setInput(question)}
                    disabled={isLoading}
                    className="text-sm"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>

            {/* Features Info */}
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <p className="text-sm font-semibold mb-3">مميزات المساعد الذكي:</p>
                <ul className="text-sm space-y-2 mr-4" dir="rtl">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>يدعم اللهجات العربية المختلفة (فصحى، مصري، خليجي، شامي، مغربي)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>يقدم شروحات مبسطة ومفصلة حسب مستوى الطالب</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>يساعد في جميع المواد الدراسية (رياضيات، علوم، لغات، تاريخ، وغيرها)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>يوفر أمثلة عملية وتمارين لتعزيز الفهم</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>متاح 24/7 للإجابة على أسئلتك في أي وقت</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

// Mock response generator for demo purposes
function generateMockResponse(userInput: string): string {
  const lowerInput = userInput.toLowerCase()

  if (lowerInput.includes("جاذبية") || lowerInput.includes("الجاذبية")) {
    return "الجاذبية هي قوة طبيعية تجذب الأجسام نحو بعضها البعض. على الأرض، الجاذبية تجذب كل شيء نحو مركز الأرض، وهذا ما يجعلنا نبقى على سطح الأرض ولا نطير في الفضاء. قانون الجاذبية الذي اكتشفه نيوتن ينص على أن قوة الجاذبية تتناسب طردياً مع كتلة الجسمين وعكسياً مع مربع المسافة بينهما. هل تريد مثالاً عملياً؟"
  }

  if (lowerInput.includes("نحو") || lowerInput.includes("قواعد")) {
    return "قواعد النحو الأساسية في اللغة العربية تشمل: 1) الجملة الاسمية (تبدأ باسم): المبتدأ والخبر، مثل 'الطالبُ مجتهدٌ'. 2) الجملة الفعلية (تبدأ بفعل): الفعل والفاعل والمفعول به، مثل 'كتبَ الطالبُ الدرسَ'. 3) الإعراب: الرفع (ضمة)، النصب (فتحة)، الجر (كسرة)، الجزم (سكون). هل تريد شرحاً أكثر تفصيلاً لأي منها؟"
  }

  if (lowerInput.includes("معادلة") || lowerInput.includes("الدرجة الثانية")) {
    return "لحل معادلة من الدرجة الثانية (ax² + bx + c = 0)، نستخدم القانون العام: x = (-b ± √(b² - 4ac)) / 2a. الخطوات: 1) حدد قيم a و b و c من المعادلة. 2) احسب المميز (b² - 4ac). 3) إذا كان المميز موجباً، هناك حلان حقيقيان. 4) عوض في القانون لإيجاد قيمتي x. مثال: x² - 5x + 6 = 0، هنا a=1, b=-5, c=6. هل تريد حل هذا المثال معاً؟"
  }

  if (lowerInput.includes("ثورة") || lowerInput.includes("صناعية")) {
    return "الثورة الصناعية هي فترة تحول كبير في التاريخ بدأت في بريطانيا في القرن الثامن عشر. تميزت بالانتقال من الإنتاج اليدوي إلى الإنتاج الآلي باستخدام الآلات والمصانع. أهم التطورات: 1) اختراع المحرك البخاري. 2) ظهور المصانع الكبيرة. 3) نمو المدن والهجرة من الريف. 4) تحسن وسائل النقل (القطارات والسفن البخارية). أثرت الثورة الصناعية على كل جوانب الحياة الاقتصادية والاجتماعية. هل تريد معرفة المزيد عن تأثيراتها؟"
  }

  // Default response
  return "شكراً على سؤالك! أنا هنا لمساعدتك في فهم المواد الدراسية. يمكنك أن تسألني عن أي موضوع دراسي وسأقدم لك شرحاً مبسطاً ومفصلاً. في النسخة الكاملة، سيتم استخدام نماذج الذكاء الاصطناعي المتقدمة (مثل GPT-4) لتقديم إجابات دقيقة وشاملة لجميع أسئلتك. هل يمكنك إعادة صياغة سؤالك أو طرح سؤال محدد عن موضوع دراسي معين؟"
}
