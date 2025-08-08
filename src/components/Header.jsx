import { motion } from "framer-motion";
import { useState } from "react";
import { useI18n } from '@/hooks/useI18n';
import { SettingsPanel, CompactSettings } from './common/SettingsPanel';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useI18n();

  const navItems = [
    { href: "#accueil", label: t('nav.home') },
    { href: "#services", label: t('nav.services') },
    { href: "#about", label: t('nav.about') },
    { href: "#testimonials", label: t('nav.testimonials', 'Témoignages') },
    { href: "#booking", label: t('nav.booking', 'Réservations') },
    { href: "#contact", label: t('nav.contact') },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-azure-900/90 backdrop-blur-md shadow-lg border-b border-azure-200/50 dark:border-azure-700/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="container-max flex items-center justify-between py-6 px-6">
        <motion.div
          className="text-2xl font-bold text-primary-600 dark:text-primary-400"
          whileHover={{ scale: 1.05 }}
        >
          GML FITNESS
        </motion.div>

        {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8 px-2">
          {navItems.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
              whileHover={{ y: -2 }}
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4 px-2">
          <motion.a
            href="#contact"
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('nav.book')}
          </motion.a>
          
          <SettingsPanel />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 h-6 flex flex-col justify-around">
            <span className={`h-0.5 bg-gray-700 dark:bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`h-0.5 bg-gray-700 dark:bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`h-0.5 bg-gray-700 dark:bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex flex-col space-y-4 p-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
                <a 
                  href="#contact" 
                  className="btn-primary text-center block" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.book')}
                </a>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t('common.settings', 'Paramètres')}
                  </span>
                  <CompactSettings />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;