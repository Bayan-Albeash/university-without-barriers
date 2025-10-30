import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "آفاق الوصول - تعليم جامعي للجميع",
  description: "منصة ذكاء اصطناعي تساعد الطلاب ذوي الإعاقة في الوصول إلى التعليم الجامعي بسهولة",
  keywords: "تعليم ذوي الإعاقة, منصة AI تعليمية, آفاق الوصول, تعليم شامل, إمكانية الوصول",
  generator: "v0.app",
  openGraph: {
    title: "آفاق الوصول - تعليم جامعي للجميع",
    description: "منصة ذكاء اصطناعي تساعد الطلاب ذوي الإعاقة في الوصول إلى التعليم الجامعي",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${geist.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
