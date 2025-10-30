import { NextResponse } from "next/server"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { studentAnswers, subject } = await req.json()

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt: `أنت مدرس خبير في تحليل أداء الطلاب. قم بتحليل إجابات الطالب التالية في مادة ${subject}:

${studentAnswers}

قدم تحليلاً شاملاً يتضمن:
1. نقاط القوة (3-4 نقاط)
2. نقاط الضعف أو التحسين (3-4 نقاط)
3. توصيات محددة (3-4 توصيات)
4. خطة تعليمية شخصية مفصلة

قدم الإجابة بصيغة JSON بالشكل التالي:
{
  "strengths": ["نقطة قوة 1", "نقطة قوة 2", ...],
  "weaknesses": ["نقطة ضعف 1", "نقطة ضعف 2", ...],
  "recommendations": ["توصية 1", "توصية 2", ...],
  "learningPlan": "خطة تعليمية مفصلة..."
}`,
    })

    const report = JSON.parse(text)

    return NextResponse.json({ report })
  } catch (error) {
    console.error("[v0] Error analyzing performance:", error)
    return NextResponse.json({ error: "Failed to analyze performance" }, { status: 500 })
  }
}
