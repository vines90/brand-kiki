import React, { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { Sun, Moon, Globe, Menu, X } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [isDark, setIsDark] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const darkMode = localStorage.getItem('darkMode') === 'true'
      setIsDark(darkMode)
      document.documentElement.classList.toggle('dark', darkMode)
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    document.documentElement.classList.toggle('dark', newDarkMode)
  }

  const toggleLanguage = () => {
    const newLocale = router.locale === 'zh' ? 'en' : 'zh'
    router.push(router.asPath, router.asPath, { locale: newLocale })
  }

  const navItems = [
    { key: 'home', href: '#hero' },
    { key: 'about', href: '#about' },
    { key: 'business', href: '#business' },
    { key: 'insights', href: '#insights' },
    { key: 'contact', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-bg-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold gradient-text">KIKI</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => scrollToSection(item.href)}
                    className="text-text-100 dark:text-white hover:text-primary-100 dark:hover:text-primary-200 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    {t(`nav.${item.key}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label={isDark ? t('common.lightMode') : t('common.darkMode')}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-1"
                aria-label={t('common.language')}
              >
                <Globe size={20} />
                <span className="text-sm font-medium">
                  {router.locale === 'zh' ? 'EN' : '中'}
                </span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-text-100 dark:text-white hover:text-primary-100 dark:hover:text-primary-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                >
                  {t(`nav.${item.key}`)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-text-100 dark:bg-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">{t('contact.title')}</h3>
              <p className="text-gray-300 mb-4">{t('contact.subtitle')}</p>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">{t('footer.company')}</p>
                <p className="text-sm text-gray-400">{t('footer.slogan')}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('contact.email')}</h4>
              <p className="text-gray-300">contact@shunjiaxing.com</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('contact.phone')}</h4>
              <p className="text-gray-300">+86 757 8888 8888</p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 {t('footer.company')}. {t('footer.rights')}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 