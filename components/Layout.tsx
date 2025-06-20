import React, { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { Sun, Moon, Globe, Menu, X, Mail, Phone, MapPin, ExternalLink, Palette } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [isDark, setIsDark] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isPurpleTheme, setIsPurpleTheme] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const darkMode = localStorage.getItem('darkMode') === 'true'
      // 默认使用蒂芙尼蓝主题，除非用户明确设置为紫色
      const purpleTheme = localStorage.getItem('purpleTheme') === 'true'
      setIsDark(darkMode)
      setIsPurpleTheme(purpleTheme)
      
      // 如果是首次访问，默认使用蒂芙尼蓝主题（不添加类）
      if (localStorage.getItem('purpleTheme') === null) {
        localStorage.setItem('purpleTheme', 'false')
      }

      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50)
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
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
    const currentPath = router.asPath.split('#')[0] // Remove any hash fragments
    router.push(currentPath, currentPath, { locale: newLocale }).then(() => {
      // Scroll to top after language change
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  const toggleTheme = () => {
    const newPurpleTheme = !isPurpleTheme
    setIsPurpleTheme(newPurpleTheme)
    localStorage.setItem('purpleTheme', newPurpleTheme.toString())
    document.documentElement.classList.toggle('theme-purple', newPurpleTheme)
  }

  const navItems = [
    { key: 'home', href: '#hero', label: t('nav.home') },
    { key: 'about', href: '#about', label: t('nav.about') },
    { key: 'insights', href: '#insights', label: t('nav.insights') },
    { key: 'business', href: '#business', label: t('nav.business') },
    { key: 'contact', href: '#contact', label: t('nav.contact') },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const footerLinks = [
    {
      title: t('footer.quickLinks'),
      links: [
        { name: t('nav.about'), href: '#about' },
        { name: t('nav.insights'), href: '#insights' },
        { name: t('nav.business'), href: '#business' },
        { name: t('nav.contact'), href: '#contact' }
      ]
    },
    {
      title: t('footer.productSeries'),
      links: [
        { name: t('footer.decorative'), href: '#business' },
        { name: t('footer.mirror'), href: '#business' },
        { name: t('footer.artistic'), href: '#business' },
        { name: t('footer.custom'), href: '#business' }
      ]
    },
    {
      title: t('footer.industryNews'),
      links: [
        { name: t('footer.trends'), href: '#insights' },
        { name: t('footer.innovation'), href: '#insights' },
        { name: t('footer.market'), href: '#insights' },
        { name: t('footer.news'), href: '#insights' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-bg-primary dark:bg-gray-900 transition-colors duration-300">
      {/* Enhanced Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'backdrop-blur-md bg-white/95 dark:bg-gray-900/95 shadow-lg border-b border-gray-200/20 dark:border-gray-700/20' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Enhanced Logo */}
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className={`text-3xl font-black transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-900 dark:text-white' 
                  : 'text-white'
              }`}>KIKI</h1>
              <p className={`text-xs font-medium transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-600 dark:text-gray-400' 
                  : 'text-white/80'
              }`}>
                {t('common.pioneer')}
              </p>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {navItems.map((item) => (
                  <motion.button
                    key={item.key}
                    onClick={() => scrollToSection(item.href)}
                    whileHover={{ y: -2 }}
                    className={`relative px-3 py-2 text-sm font-semibold transition-all duration-300 group ${
                      isScrolled 
                        ? 'text-gray-900 dark:text-white hover:text-primary-100 dark:hover:text-primary-200' 
                        : 'text-white hover:text-primary-200'
                    }`}
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-100 to-primary-200 transition-all duration-300 group-hover:w-full"></span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Enhanced Controls */}
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="p-3 rounded-full hover:bg-primary-100/10 dark:hover:bg-primary-200/10 transition-colors duration-200"
                aria-label={isPurpleTheme ? '切换到蒂芙尼蓝主题' : '切换到紫色主题'}
              >
                <Palette size={20} className={`transition-colors duration-300 ${
                  isScrolled ? 'text-primary-100' : 'text-white'
                }`} />
              </motion.button>
              
              <motion.button
                onClick={toggleDarkMode}
                whileHover={{ scale: 1.1, rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="p-3 rounded-full hover:bg-primary-100/10 dark:hover:bg-primary-200/10 transition-colors duration-200"
                aria-label={isDark ? '切换到亮色模式' : '切换到暗色模式'}
              >
                {isDark ? (
                  <Sun size={20} className={`transition-colors duration-300 ${
                    isScrolled ? 'text-primary-100' : 'text-white'
                  }`} />
                ) : (
                  <Moon size={20} className={`transition-colors duration-300 ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`} />
                )}
              </motion.button>
              
              <motion.button
                onClick={toggleLanguage}
                whileHover={{ scale: 1.1 }}
                className="p-3 rounded-full hover:bg-primary-100/10 dark:hover:bg-primary-200/10 transition-colors duration-200 flex items-center space-x-2"
                aria-label="切换语言"
              >
                <Globe size={20} className={`transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-700 dark:text-primary-200' 
                    : 'text-white'
                }`} />
                <span className={`text-sm font-semibold transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-900 dark:text-white' 
                    : 'text-white'
                }`}>
                  {router.locale === 'zh' ? 'EN' : '中'}
                </span>
              </motion.button>

              {/* Mobile menu button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="md:hidden p-3 rounded-full hover:bg-primary-100/10 dark:hover:bg-primary-200/10 transition-colors duration-200"
                aria-label="菜单"
              >
                {isMenuOpen ? (
                  <X size={20} className={`transition-colors duration-300 ${
                    isScrolled 
                      ? 'text-gray-700 dark:text-primary-200' 
                      : 'text-white'
                  }`} />
                ) : (
                  <Menu size={20} className={`transition-colors duration-300 ${
                    isScrolled 
                      ? 'text-gray-700 dark:text-primary-200' 
                      : 'text-white'
                  }`} />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass bg-white/95 dark:bg-gray-900/95 border-t border-gray-200/20 dark:border-gray-700/20"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-3 text-base font-semibold text-text-primary dark:text-white hover:text-primary-100 dark:hover:text-primary-200 hover:bg-primary-100/5 dark:hover:bg-primary-200/5 rounded-lg transition-all duration-200"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Enhanced Footer */}
      <footer id="contact" className="bento-card-gradient text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 right-16 w-96 h-96 border border-white/30 rounded-full float-animation"></div>
          <div className="absolute bottom-16 left-16 w-48 h-48 border border-white/30 rounded-full float-animation" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-white/40 rounded-full pulse-slow"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white/50 rounded-full pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-4xl font-bold text-white mb-3">KIKI</h3>
                <p className="text-primary-200 text-xl font-medium mb-6">{t('footer.founder')}</p>
                <p className="text-white/80 leading-relaxed text-lg">
                  {t('footer.description')}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary-200" />
                  </div>
                  <span className="text-white/90 font-medium">contact@shunjiaxing.com</span>
                </div>
                <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary-200" />
                  </div>
                  <span className="text-white/90 font-medium">+86 757 8888 8888</span>
                </div>
                <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary-200" />
                  </div>
                  <span className="text-white/90 font-medium">{t('footer.address')}</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {footerLinks.map((section, index) => (
              <div key={index} className="space-y-6">
                <h4 className="text-xl font-bold text-white mb-6 relative">
                  {section.title}
                  <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-purple-300 rounded-full"></div>
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="text-white/70 hover:text-primary-200 transition-all duration-300 text-sm flex items-center space-x-2 group hover:translate-x-1"
                      >
                        <span className="relative">
                          {link.name}
                          <span className="absolute bottom-0 left-0 w-0 h-px bg-purple-200 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Bottom section */}
          <div className="border-t border-white/20 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-white/70 text-sm font-medium">
              © 2024 {t('footer.company')}. {t('footer.rights')}.
            </div>
            
            <div className="flex items-center space-x-8 text-sm text-white/70">
              <span className="hover:text-primary-200 transition-colors cursor-pointer">{t('footer.license')}</span>
              <span className="text-white/30">•</span>
              <span className="hover:text-primary-200 transition-colors cursor-pointer">{t('footer.businessLicense')}</span>
              <span className="text-white/30">•</span>
              <span className="hover:text-primary-200 transition-colors cursor-pointer">{t('footer.qualityCert')}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-white/70">
              <span>{t('footer.madeWith')}</span>
              <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
              <span>{t('footer.slogan')}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Heart component for footer
function Heart({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
  )
} 