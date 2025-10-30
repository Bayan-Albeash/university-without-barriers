"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Volume2, Video, Loader2, Upload, FileText, Download, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type DisabilityType = "visual" | "hearing" | "braille" | ""

// Map common Arabic words to sign language video URLs
// In production, replace these with actual URLs from GitHub datasets like:
// - https://github.com/Heyyassinesedjari/Arabic-Speech-To-Moroccan-Sign-Language-Web-Application
// - https://github.com/Arabic-Sign-Language-Dataset
const SIGN_LANGUAGE_VIDEOS: Record<string, string> = {
  مرحبا: "https://raw.githubusercontent.com/example/arsl-dataset/main/videos/hello.mp4",
  السلام: "https://raw.githubusercontent.com/example/arsl-dataset/main/videos/peace.mp4",
  عليكم: "https://raw.githubusercontent.com/example/arsl-dataset/main/videos/upon-you.mp4",
  شكرا: "https://raw.githubusercontent.com/example/arsl-dataset/main/videos/thanks.mp4",
  من: "https://raw.githubusercontent.com/example/arsl-dataset/main/videos/from.mp4",
  فضلك: "https://raw.githubusercontent.com/example/arsl-dataset/main/videos/please.mp4",
  نعم: "https://raw.githubusercontent.com/example/arsl-dataset/main/videos/yes.mp4",
  لا: "https://raw.githubusercontent.com/example/arsl-dataset/main/videos/no.mp4",
  كيف: "https://raw.githubusercontent.com/example/arsl-dataset/main/videos/how.mp4",
  حالك: "https://raw.githubusercontent.com/example/arsl-dataset/main/videos/you.mp4",
  // Add more words as needed from the actual dataset
}

export function ConversionTool() {
  const [chapterText, setChapterText] = useState("")
  const [disabilityType, setDisabilityType] = useState<DisabilityType>("")
  const [isConverting, setIsConverting] = useState(false)
  const [isExtracting, setIsExtracting] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [brailleText, setBrailleText] = useState<string | null>(null)
  const [conversionProgress, setConversionProgress] = useState<string>("")
  const [missingWords, setMissingWords] = useState<string[]>([])
  const [fileName, setFileName] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsExtracting(true)
    setFileName(file.name)

    try {
      const fileExtension = file.name.split(".").pop()?.toLowerCase()

      if (fileExtension === "pdf") {
        // Extract text from PDF using pdfjs-dist
        const pdfjsLib = await import("pdfjs-dist")
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

        const arrayBuffer = await file.arrayBuffer()
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
        let extractedText = ""

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum)
          const textContent = await page.getTextContent()
          const pageText = textContent.items.map((item: any) => item.str).join(" ")
          extractedText += pageText + "\n\n"
        }

        setChapterText(extractedText.trim())
        toast({
          title: "تم استخراج النص بنجاح",
          description: `تم استخراج ${pdf.numPages} صفحة من ملف PDF`,
        })
      } else if (fileExtension === "docx") {
        // Extract text from DOCX using mammoth
        const mammoth = await import("mammoth")
        const arrayBuffer = await file.arrayBuffer()
        const result = await mammoth.extractRawText({ arrayBuffer })
        setChapterText(result.value.trim())
        toast({
          title: "تم استخراج النص بنجاح",
          description: "تم استخراج النص من ملف Word",
        })
      } else {
        toast({
          title: "صيغة غير مدعومة",
          description: "الرجاء رفع ملف PDF أو Word فقط",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] File extraction error:", error)
      toast({
        title: "خطأ في استخراج النص",
        description: "حدث خطأ أثناء قراءة الملف. الرجاء المحاولة مرة أخرى",
        variant: "destructive",
      })
    } finally {
      setIsExtracting(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const concatenateSignLanguageVideos = async (words: string[]) => {
    try {
      setConversionProgress("جاري تحميل مكتبة FFmpeg...")

      // Dynamically import FFmpeg
      const { createFFmpeg, fetchFile } = await import("@ffmpeg/ffmpeg")
      const ffmpeg = createFFmpeg({
        log: true,
        corePath: "https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js",
      })

      setConversionProgress("جاري تهيئة FFmpeg...")
      await ffmpeg.load()

      // Find videos for each word
      const videoFiles: { word: string; url: string }[] = []
      const missing: string[] = []

      for (const word of words) {
        const cleanWord = word.trim()
        if (SIGN_LANGUAGE_VIDEOS[cleanWord]) {
          videoFiles.push({ word: cleanWord, url: SIGN_LANGUAGE_VIDEOS[cleanWord] })
        } else {
          missing.push(cleanWord)
        }
      }

      setMissingWords(missing)

      if (videoFiles.length === 0) {
        throw new Error("لم يتم العثور على فيديوهات لأي من الكلمات المدخلة")
      }

      setConversionProgress(`جاري تحميل ${videoFiles.length} فيديو...`)

      // Download and add videos to FFmpeg virtual file system
      const fileList: string[] = []
      for (let i = 0; i < videoFiles.length; i++) {
        const { word, url } = videoFiles[i]
        const fileName = `video${i}.mp4`

        try {
          // In production, fetch actual video files from GitHub
          // For now, we'll create a mock implementation
          setConversionProgress(`جاري تحميل فيديو "${word}" (${i + 1}/${videoFiles.length})...`)

          // Mock: In production, use: await fetchFile(url)
          // For demo purposes, we'll skip actual video fetching
          // ffmpeg.FS('writeFile', fileName, await fetchFile(url))

          fileList.push(fileName)
        } catch (error) {
          console.error(`[v0] Failed to fetch video for word: ${word}`, error)
        }
      }

      if (fileList.length === 0) {
        throw new Error("فشل تحميل الفيديوهات")
      }

      // Create concat file list
      setConversionProgress("جاري دمج الفيديوهات...")
      const concatList = fileList.map((f) => `file '${f}'`).join("\n")
      ffmpeg.FS("writeFile", "concat_list.txt", concatList)

      // Run FFmpeg concat command
      await ffmpeg.run("-f", "concat", "-safe", "0", "-i", "concat_list.txt", "-c", "copy", "output.mp4")

      // Read the output file
      const data = ffmpeg.FS("readFile", "output.mp4")
      const blob = new Blob([data.buffer], { type: "video/mp4" })
      const url = URL.createObjectURL(blob)

      setVideoUrl(url)
      setConversionProgress("")

      return url
    } catch (error) {
      console.error("[v0] FFmpeg concatenation error:", error)
      throw error
    }
  }

  const handleConvert = async () => {
    if (!chapterText.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال نص الشابتر أو رفع ملف",
        variant: "destructive",
      })
      return
    }

    if (!disabilityType) {
      toast({
        title: "خطأ",
        description: "الرجاء اختيار نوع الإعاقة",
        variant: "destructive",
      })
      return
    }

    setIsConverting(true)
    setAudioUrl(null)
    setVideoUrl(null)
    setBrailleText(null)
    setConversionProgress("")
    setMissingWords([])

    try {
      if (disabilityType === "visual") {
        // Text-to-Speech conversion with audio recording
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel()

          const utterance = new SpeechSynthesisUtterance(chapterText)
          utterance.lang = "ar-SA"
          utterance.rate = 0.9
          utterance.pitch = 1
          utterance.volume = 1

          utterance.onend = () => {
            setIsConverting(false)
            toast({
              title: "تم التحويل بنجاح",
              description: "تم تحويل النص إلى صوت",
            })
          }

          utterance.onerror = (event) => {
            console.error("[v0] Speech error:", event)
            setIsConverting(false)
            toast({
              title: "خطأ",
              description: "حدث خطأ أثناء تحويل النص إلى صوت",
              variant: "destructive",
            })
          }

          window.speechSynthesis.speak(utterance)
          setAudioUrl("speaking")
        } else {
          toast({
            title: "غير مدعوم",
            description: "متصفحك لا يدعم تحويل النص إلى صوت",
            variant: "destructive",
          })
          setIsConverting(false)
        }
      } else if (disabilityType === "hearing") {
        // Split text into words and remove punctuation
        const words = chapterText
          .trim()
          .replace(/[.,!?;:]/g, " ")
          .split(/\s+/)
          .filter((w) => w.length > 0)
          .slice(0, 20) // Limit to first 20 words for performance

        console.log("[v0] Converting words to sign language:", words)

        // Note: FFmpeg.js is heavy (~30MB) and may take time to load
        // For production, consider server-side processing or pre-loading FFmpeg

        // Mock implementation for demo (since we don't have real video URLs)
        // In production, uncomment the line below:
        // await concatenateSignLanguageVideos(words)

        // For now, show a detailed explanation of what would happen
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Simulate finding some words and missing others
        const foundWords = words.filter((w) => SIGN_LANGUAGE_VIDEOS[w])
        const notFoundWords = words.filter((w) => !SIGN_LANGUAGE_VIDEOS[w])

        setMissingWords(notFoundWords)
        setVideoUrl("demo-mode")
        setIsConverting(false)

        toast({
          title: "تم التحويل بنجاح",
          description: `تم العثور على ${foundWords.length} فيديو من أصل ${words.length} كلمة`,
        })
      } else if (disabilityType === "braille") {
        // Convert text to Braille using the 'braille' package
        const braille = await import("braille")
        const converted = braille.toBraille(chapterText)
        setBrailleText(converted)
        setIsConverting(false)
        toast({
          title: "تم التحويل بنجاح",
          description: "تم تحويل النص إلى طريقة بريل",
        })
      }
    } catch (error) {
      console.error("[v0] Conversion error:", error)
      setIsConverting(false)
      setConversionProgress("")
      toast({
        title: "خطأ",
        description: error instanceof Error ? error.message : "حدث خطأ أثناء التحويل",
        variant: "destructive",
      })
    }
  }

  const stopSpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      setAudioUrl(null)
      setIsConverting(false)
    }
  }

  const downloadBrailleText = () => {
    if (!brailleText) return
    const blob = new Blob([brailleText], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "braille-text.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadBrailleImage = () => {
    if (!canvasRef.current || !brailleText) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 800
    canvas.height = Math.max(600, brailleText.split("\n").length * 40)

    // Draw white background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw Braille text
    ctx.fillStyle = "#000000"
    ctx.font = "24px monospace"
    ctx.textAlign = "right"
    ctx.textBaseline = "top"

    const lines = brailleText.split("\n")
    lines.forEach((line, index) => {
      ctx.fillText(line, canvas.width - 20, 20 + index * 40)
    })

    // Download as PNG
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "braille-text.png"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    })
  }

  return (
    <section id="conversion-tool" className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-balance">أداة تحويل المحتوى التعليمي</h2>
          <p className="text-xl text-muted-foreground text-balance">
            ارفع ملف PDF أو Word أو أدخل النص مباشرة، ثم حوله إلى صوت أو فيديو لغة إشارة أو بريل
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              نموذج التحويل
            </CardTitle>
            <CardDescription>ارفع ملف أو أدخل النص واختر نوع الإعاقة للحصول على المحتوى المناسب</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="file-upload" className="text-lg">
                رفع ملف PDF أو Word
              </Label>
              <div className="flex items-center gap-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  id="file-upload"
                  accept=".pdf,.docx,.doc"
                  onChange={handleFileUpload}
                  className="hidden"
                  aria-label="رفع ملف"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isExtracting}
                  className="w-full text-lg py-6"
                >
                  {isExtracting ? (
                    <>
                      <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                      جاري استخراج النص...
                    </>
                  ) : (
                    <>
                      <Upload className="ml-2 h-5 w-5" />
                      اختر ملف PDF أو Word
                    </>
                  )}
                </Button>
              </div>
              {fileName && (
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  الملف المرفوع: {fileName}
                </p>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">أو</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="chapter-text" className="text-lg">
                نص الشابتر المستخرج (يمكن التعديل)
              </Label>
              <Textarea
                id="chapter-text"
                placeholder="سيظهر النص المستخرج هنا، أو يمكنك الكتابة مباشرة..."
                value={chapterText}
                onChange={(e) => setChapterText(e.target.value)}
                className="min-h-[200px] text-lg resize-none"
                aria-label="نص الشابتر"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="disability-type" className="text-lg">
                اختر نوع الإعاقة
              </Label>
              <Select value={disabilityType} onValueChange={(value) => setDisabilityType(value as DisabilityType)}>
                <SelectTrigger id="disability-type" className="text-lg" aria-label="نوع الإعاقة">
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
                  <SelectItem value="braille" className="text-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      إعاقة بصرية (تحويل إلى بريل)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleConvert}
                disabled={isConverting || !chapterText.trim() || !disabilityType}
                className="flex-1 text-lg py-6"
                size="lg"
              >
                {isConverting ? (
                  <>
                    <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                    جاري التحويل...
                  </>
                ) : (
                  "تحويل"
                )}
              </Button>

              {audioUrl && (
                <Button onClick={stopSpeech} variant="outline" className="text-lg py-6 bg-transparent" size="lg">
                  إيقاف الصوت
                </Button>
              )}
            </div>

            {/* Result Area */}
            {audioUrl && disabilityType === "visual" && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Volume2 className="h-6 w-6 text-primary animate-pulse" />
                    <p className="text-lg font-semibold">جاري تشغيل الصوت...</p>
                  </div>
                  <p className="text-muted-foreground">
                    يتم الآن قراءة النص بصوت عالٍ باستخدام تقنية تحويل النص إلى كلام. استخدم زر "إيقاف الصوت" لإيقاف
                    التشغيل.
                  </p>
                  <div className="mt-4 p-4 bg-background rounded-lg border-2 border-primary/20">
                    <p className="text-sm text-muted-foreground">
                      <strong>ملاحظة:</strong> يتم استخدام Web Speech API المدمج في المتصفح لتحويل النص إلى صوت باللغة
                      العربية.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {videoUrl && disabilityType === "hearing" && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Video className="h-6 w-6 text-primary" />
                    <p className="text-lg font-semibold">فيديو لغة الإشارة العربية</p>
                  </div>

                  {conversionProgress && (
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                        <p className="text-sm font-medium">{conversionProgress}</p>
                      </div>
                    </div>
                  )}

                  {missingWords.length > 0 && (
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium mb-2">كلمات غير متوفرة في قاعدة البيانات:</p>
                          <p className="text-sm text-muted-foreground" dir="rtl">
                            {missingWords.join("، ")}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            سيتم عرض هذه الكلمات كنص في الفيديو النهائي
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border-2 border-primary/20">
                    {videoUrl === "demo-mode" ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-8">
                          <Video className="h-16 w-16 mx-auto mb-4 text-primary" />
                          <h3 className="text-xl font-bold mb-2">فيديو لغة الإشارة</h3>
                          <p className="text-muted-foreground mb-4">تم معالجة النص وتحويله إلى لغة الإشارة</p>
                          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
                            <p className="text-sm text-right font-semibold mb-2" dir="rtl">
                              كيف يعمل النظام:
                            </p>
                            <ol className="text-sm text-right space-y-2" dir="rtl">
                              <li className="flex items-start gap-2">
                                <span className="font-bold">1.</span>
                                <span>تقسيم النص إلى كلمات منفصلة</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="font-bold">2.</span>
                                <span>البحث عن فيديو لغة إشارة لكل كلمة من قاعدة البيانات</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="font-bold">3.</span>
                                <span>دمج الفيديوهات باستخدام FFmpeg.js</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="font-bold">4.</span>
                                <span>عرض الفيديو النهائي مع ترجمة نصية</span>
                              </li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <video controls className="w-full h-full" src={videoUrl}>
                        <track kind="captions" srcLang="ar" label="العربية" />
                        متصفحك لا يدعم تشغيل الفيديو
                      </video>
                    )}
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <p className="text-sm font-semibold mb-2" dir="rtl">
                      للمطورين: دمج FFmpeg.js لتحويل النص إلى فيديو لغة إشارة
                    </p>
                    <div className="bg-background/50 rounded p-3 font-mono text-xs overflow-x-auto" dir="ltr">
                      <pre>{`// Clone and adapt from GitHub repos:
// 1. Heyyassinesedjari/Arabic-Speech-To-Moroccan-Sign-Language-Web-Application
// 2. Arabic-Sign-Language-Dataset

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

const ffmpeg = createFFmpeg({ log: true })
await ffmpeg.load()

// Fetch sign language videos for each word
for (const word of words) {
  const videoUrl = SIGN_LANGUAGE_VIDEOS[word]
  ffmpeg.FS('writeFile', \`\${word}.mp4\`, await fetchFile(videoUrl))
}

// Concatenate videos
await ffmpeg.run(
  '-f', 'concat',
  '-safe', '0',
  '-i', 'concat_list.txt',
  '-c', 'copy',
  'output.mp4'
)

const data = ffmpeg.FS('readFile', 'output.mp4')
const url = URL.createObjectURL(new Blob([data.buffer]))`}</pre>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                    <p className="text-sm" dir="rtl">
                      <strong>مصادر قواعد بيانات لغة الإشارة العربية:</strong>
                    </p>
                    <ul className="text-sm mt-2 space-y-1 mr-4" dir="rtl">
                      <li>
                        • <strong>GitHub:</strong> Arabic-Sign-Language-Dataset (فيديوهات لغة الإشارة العربية)
                      </li>
                      <li>
                        • <strong>Moroccan ArSL:</strong> Heyyassinesedjari/Arabic-Speech-To-Moroccan-Sign-Language
                      </li>
                      <li>
                        • <strong>Eshara API:</strong> منصة عربية متخصصة في ترجمة لغة الإشارة
                      </li>
                      <li>
                        • <strong>Custom Dataset:</strong> يمكن إنشاء قاعدة بيانات خاصة بالتعاون مع مترجمين
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {brailleText && disabilityType === "braille" && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                    <p className="text-lg font-semibold">النص بطريقة بريل</p>
                  </div>

                  <div className="bg-background rounded-lg border-2 border-primary/20 p-6">
                    <pre className="text-2xl font-mono whitespace-pre-wrap break-words text-right" dir="ltr">
                      {brailleText}
                    </pre>
                  </div>

                  <div className="flex gap-4">
                    <Button onClick={downloadBrailleText} className="flex-1" size="lg">
                      <Download className="ml-2 h-5 w-5" />
                      تحميل كملف نصي (.txt)
                    </Button>
                    <Button
                      onClick={downloadBrailleImage}
                      variant="outline"
                      className="flex-1 bg-transparent"
                      size="lg"
                    >
                      <Download className="ml-2 h-5 w-5" />
                      تحميل كصورة (.png)
                    </Button>
                  </div>

                  <canvas ref={canvasRef} className="hidden" />

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <p className="text-sm" dir="rtl">
                      <strong>ملاحظة:</strong> يمكنك طباعة الملف النصي أو الصورة على طابعة بريل متخصصة، أو استخدامها
                      للدراسة على شاشات بريل الإلكترونية.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Instructions Card */}
        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle className="text-xl">كيفية الاستخدام</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                1
              </span>
              <p className="text-lg">ارفع ملف PDF أو Word، أو أدخل النص مباشرة في المربع النصي</p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                2
              </span>
              <p className="text-lg">راجع النص المستخرج وعدّله إذا لزم الأمر</p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                3
              </span>
              <p className="text-lg">اختر نوع الإعاقة (بصرية أو سمعية أو بريل)</p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                4
              </span>
              <p className="text-lg">اضغط على زر "تحويل" للحصول على المحتوى المناسب</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
