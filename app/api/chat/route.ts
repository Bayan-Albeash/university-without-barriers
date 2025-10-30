import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Use Vercel AI SDK with AI Gateway (no API key needed)
    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      messages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      system: `أنت مساعد تعليمي ذكي متخصص في مساعدة الطلاب ذوي الإعاقات المختلفة. 
      تتحدث العربية بطلاقة وتدعم جميع اللهجات العربية.
      مهمتك:
      1. تقديم شروحات مبسطة وواضحة للمواد الدراسية
      2. الإجابة على أسئلة الطلاب بطريقة صبورة ومشجعة
      3. تقديم أمثلة عملية لتعزيز الفهم
      4. مراعاة احتياجات الطلاب ذوي الإعاقات المختلفة
      5. استخدام لغة بسيطة ومباشرة
      
      كن داعماً ومشجعاً دائماً، واستخدم أسلوباً تعليمياً تفاعلياً.`,
    })

    return Response.json({ content: text })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return Response.json({ error: "حدث خطأ أثناء معالجة الطلب" }, { status: 500 })
  }
}
