import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">آفاق الوصول</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              منصة ذكاء اصطناعي رائدة لتمكين الطلاب ذوي الإعاقة من الوصول إلى التعليم الجامعي بسهولة وفعالية.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  الرئيسية
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  الميزات
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  عن المشروع
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  اتصل بنا
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">قانوني</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  سياسة الخصوصية
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  شروط الاستخدام
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  سياسة الوصول
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  اتفاقية المستخدم
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">تابعنا</h3>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="فيسبوك"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="تويتر"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="إنستغرام"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="لينكد إن"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="يوتيوب"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-4">انضم إلى مجتمعنا على وسائل التواصل الاجتماعي</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-right">
              © 2025 آفاق الوصول. جميع الحقوق محفوظة.
            </p>
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              بالشراكة مع UNESCO والجامعات العربية
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
