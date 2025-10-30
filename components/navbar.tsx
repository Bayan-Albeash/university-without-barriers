"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"

export function Navbar() {
  const [isDark, setIsDark] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="navigation"
      aria-label="التنقل الرئيسي"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl sm:text-2xl font-bold text-primary hover:text-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-2"
              aria-label="الصفحة الرئيسية"
            >
              آفاق الوصول
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            <Link
              href="/"
              className="text-base font-medium text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-3 py-2"
            >
              الرئيسية
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <Link
                href="/services"
                className="text-base font-medium text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-3 py-2 flex items-center gap-1"
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
              >
                خدمات
                <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
              </Link>

              {isServicesOpen && (
                <div className="absolute top-full right-0 mt-1 w-56 bg-background border border-border rounded-lg shadow-lg py-2">
                  <Link
                    href="/services#conversion-tool"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors text-right"
                  >
                    تحويل المحتوى
                  </Link>
                  <Link
                    href="/courses"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors text-right"
                  >
                    الدورات التعليمية
                  </Link>
                  <Link
                    href="/services#chatbot"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors text-right"
                  >
                    المساعد الذكي
                  </Link>
                  <Link
                    href="/services#consultation"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors text-right"
                  >
                    الدعم النفسي
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/#features"
              className="text-base font-medium text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-3 py-2"
            >
              الميزات
            </Link>
            <Link
              href="/#contact"
              className="text-base font-medium text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-3 py-2"
            >
              اتصل بنا
            </Link>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={isDark ? "التبديل إلى الوضع الفاتح" : "التبديل إلى الوضع الداكن"}
              className="focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={isDark ? "التبديل إلى الوضع الفاتح" : "التبديل إلى الوضع الداكن"}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border" role="menu">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-foreground hover:text-primary hover:bg-muted transition-colors px-4 py-3 rounded-md text-right focus:outline-none focus:ring-2 focus:ring-ring"
                role="menuitem"
              >
                الرئيسية
              </Link>

              <div className="px-4 py-2">
                <Link
                  href="/services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-foreground hover:text-primary block mb-2"
                >
                  خدمات
                </Link>
                <div className="flex flex-col gap-1 pr-4">
                  <Link
                    href="/services#conversion-tool"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm text-foreground hover:text-primary hover:bg-muted transition-colors px-3 py-2 rounded-md text-right"
                  >
                    تحويل المحتوى
                  </Link>
                  <Link
                    href="/courses"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm text-foreground hover:text-primary hover:bg-muted transition-colors px-3 py-2 rounded-md text-right"
                  >
                    الدورات التعليمية
                  </Link>
                  <Link
                    href="/services#chatbot"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm text-foreground hover:text-primary hover:bg-muted transition-colors px-3 py-2 rounded-md text-right"
                  >
                    المساعد الذكي
                  </Link>
                  <Link
                    href="/services#consultation"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm text-foreground hover:text-primary hover:bg-muted transition-colors px-3 py-2 rounded-md text-right"
                  >
                    الدعم النفسي
                  </Link>
                </div>
              </div>

              <Link
                href="/#features"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-foreground hover:text-primary hover:bg-muted transition-colors px-4 py-3 rounded-md text-right focus:outline-none focus:ring-2 focus:ring-ring"
                role="menuitem"
              >
                الميزات
              </Link>
              <Link
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-foreground hover:text-primary hover:bg-muted transition-colors px-4 py-3 rounded-md text-right focus:outline-none focus:ring-2 focus:ring-ring"
                role="menuitem"
              >
                اتصل بنا
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
