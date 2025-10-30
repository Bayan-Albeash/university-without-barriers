"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, CheckCircle2, XCircle, Trophy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  type: "multiple-choice" | "true-false"
}

export function QuizGenerator() {
  const [inputText, setInputText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const { toast } = useToast()

  const generateQuiz = async () => {
    if (!inputText.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال نص أولاً",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setQuestions([])
    setAnswers({})
    setShowResults(false)

    try {
      // Simulate quiz generation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Extract keywords from text (simple implementation)
      const words = inputText
        .split(/\s+/)
        .filter((word) => word.length > 4)
        .slice(0, 20)

      // Generate questions based on content
      const generatedQuestions: Question[] = []

      // Generate 5-7 questions
      const numQuestions = Math.min(7, Math.max(5, Math.floor(words.length / 3)))

      for (let i = 0; i < numQuestions; i++) {
        const keyword = words[i % words.length]
        const questionType = i % 2 === 0 ? "multiple-choice" : "true-false"

        if (questionType === "multiple-choice") {
          generatedQuestions.push({
            id: i + 1,
            question: `ما هو المفهوم الأساسي المتعلق بـ "${keyword}"؟`,
            options: [
              `${keyword} هو مفهوم أساسي في المادة`,
              `${keyword} ليس له علاقة بالموضوع`,
              `${keyword} هو مصطلح ثانوي`,
              `${keyword} غير مذكور في النص`,
            ],
            correctAnswer: 0,
            type: "multiple-choice",
          })
        } else {
          generatedQuestions.push({
            id: i + 1,
            question: `هل "${keyword}" مذكور في النص؟`,
            options: ["صحيح", "خطأ"],
            correctAnswer: 0,
            type: "true-false",
          })
        }
      }

      setQuestions(generatedQuestions)
      setIsGenerating(false)
      toast({
        title: "تم إنشاء الامتحان",
        description: `تم إنشاء ${generatedQuestions.length} أسئلة بناءً على المحتوى`,
      })
    } catch (error) {
      console.error("[v0] Quiz generation error:", error)
      setIsGenerating(false)
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إنشاء الامتحان",
        variant: "destructive",
      })
    }
  }

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const submitQuiz = () => {
    let correctCount = 0
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++
      }
    })
    setScore(correctCount)
    setShowResults(true)
    toast({
      title: "تم تقديم الامتحان",
      description: `حصلت على ${correctCount} من ${questions.length} إجابة صحيحة`,
    })
  }

  const resetQuiz = () => {
    setAnswers({})
    setShowResults(false)
    setScore(0)
  }

  return (
    <div className="space-y-6">
      {questions.length === 0 && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">أدخل المحتوى التعليمي</CardTitle>
            <CardDescription>أدخل النص الذي تريد إنشاء امتحان بناءً عليه</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="quiz-input">النص التعليمي</Label>
              <Textarea
                id="quiz-input"
                placeholder="أدخل المحتوى التعليمي هنا... (مثال: الإحصاء الاستنتاجي هو فرع من الإحصاء يهتم بتحليل البيانات...)"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={8}
                className="resize-none text-lg"
                dir="rtl"
              />
            </div>
            <Button
              onClick={generateQuiz}
              disabled={isGenerating || !inputText.trim()}
              size="lg"
              className="w-full text-lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                  جاري إنشاء الامتحان...
                </>
              ) : (
                "ولد امتحان"
              )}
            </Button>
            <p className="text-sm text-muted-foreground text-center">سيتم إنشاء 5-10 أسئلة بناءً على المحتوى المدخل</p>
          </CardContent>
        </Card>
      )}

      {questions.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">الامتحان التفاعلي</CardTitle>
            <CardDescription>أجب على جميع الأسئلة ثم اضغط على تقديم الامتحان</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {showResults && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Trophy className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">
                        النتيجة: {score} / {questions.length}
                      </p>
                      <p className="text-muted-foreground">
                        النسبة المئوية: {Math.round((score / questions.length) * 100)}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {questions.map((question, index) => (
              <Card key={question.id} className={showResults ? "border-2" : ""}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="flex-1">{question.question}</span>
                    {showResults && (
                      <span className="flex-shrink-0">
                        {answers[question.id] === question.correctAnswer ? (
                          <CheckCircle2 className="h-6 w-6 text-green-500" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-500" />
                        )}
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={answers[question.id]?.toString()}
                    onValueChange={(value) => handleAnswerChange(question.id, Number.parseInt(value))}
                    disabled={showResults}
                  >
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`flex items-center space-x-2 space-x-reverse p-3 rounded-lg border ${
                          showResults
                            ? optionIndex === question.correctAnswer
                              ? "bg-green-500/10 border-green-500/50"
                              : answers[question.id] === optionIndex
                                ? "bg-red-500/10 border-red-500/50"
                                : ""
                            : "hover:bg-muted"
                        }`}
                      >
                        <RadioGroupItem value={optionIndex.toString()} id={`q${question.id}-opt${optionIndex}`} />
                        <Label
                          htmlFor={`q${question.id}-opt${optionIndex}`}
                          className="flex-1 cursor-pointer text-base"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {showResults && answers[question.id] !== question.correctAnswer && (
                    <p className="mt-3 text-sm text-green-600 dark:text-green-400">
                      الإجابة الصحيحة: {question.options[question.correctAnswer]}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}

            <div className="flex gap-4">
              {!showResults ? (
                <Button
                  onClick={submitQuiz}
                  disabled={Object.keys(answers).length !== questions.length}
                  className="flex-1"
                  size="lg"
                >
                  تقديم الامتحان
                </Button>
              ) : (
                <>
                  <Button onClick={resetQuiz} variant="outline" className="flex-1 bg-transparent" size="lg">
                    إعادة المحاولة
                  </Button>
                  <Button
                    onClick={() => {
                      setQuestions([])
                      setAnswers({})
                      setShowResults(false)
                      setInputText("")
                    }}
                    className="flex-1"
                    size="lg"
                  >
                    إنشاء امتحان جديد
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
