import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useTheme, ThemeMode } from '@/hooks/useTheme';

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Composant de sélection de thème avec animations
 * Pattern: Strategy + State Machine + Presentation Component
 */
export const ThemeToggle = memo<ThemeToggleProps>(({ 
  variant = 'button', 
  size = 'md',
  className = '' 
}) => {
  const { theme, setTheme, resolvedTheme, toggleTheme, getThemeIcon } = useTheme();

  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base', 
    lg: 'w-12 h-12 text-lg'
  };

  const themes: Array<{ mode: ThemeMode; label: string; icon: string }> = [
    { mode: 'light', label: 'Clair', icon: '☀️' },
    { mode: 'dark', label: 'Sombre', icon: '🌙' },
    { mode: 'system', label: 'Système', icon: '🖥️' },
  ];

  if (variant === 'button') {
    return (
      <motion.button
        onClick={toggleTheme}
        className={`
          ${sizes[size]} 
          relative flex items-center justify-center
          bg-gray-100 hover:bg-gray-200 
          dark:bg-gray-800 dark:hover:bg-gray-700
          border border-gray-200 dark:border-gray-700
          rounded-lg transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          dark:focus:ring-offset-gray-900
          ${className}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={`Mode actuel: ${theme} (${resolvedTheme})`}
        aria-label="Changer le thème"
      >
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
          className="text-lg"
        >
          {getThemeIcon()}
        </motion.span>
      </motion.button>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <motion.select
        value={theme}
        onChange={(e) => setTheme(e.target.value as ThemeMode)}
        className={`
          ${sizes[size]}
          appearance-none bg-gray-100 hover:bg-gray-200
          dark:bg-gray-800 dark:hover:bg-gray-700
          border border-gray-200 dark:border-gray-700
          rounded-lg px-3 py-2 pr-8
          text-gray-900 dark:text-white
          transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          dark:focus:ring-offset-gray-900
          cursor-pointer
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {themes.map(({ mode, label, icon }) => (
          <option key={mode} value={mode}>
            {icon} {label}
          </option>
        ))}
      </motion.select>
      
      {/* Icône dropdown */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg 
          className="w-4 h-4 text-gray-500 dark:text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
});

ThemeToggle.displayName = 'ThemeToggle';

/**
 * Composant avancé avec menu dropdown
 */
export const ThemeSelector = memo(() => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const themes: Array<{ mode: ThemeMode; label: string; icon: string; description: string }> = [
    { 
      mode: 'light', 
      label: 'Clair', 
      icon: '☀️',
      description: 'Thème clair permanent'
    },
    { 
      mode: 'dark', 
      label: 'Sombre', 
      icon: '🌙',
      description: 'Thème sombre permanent'
    },
    { 
      mode: 'system', 
      label: 'Système', 
      icon: '🖥️',
      description: 'Suit les préférences du système'
    },
  ];

  const currentTheme = themes.find(t => t.mode === theme);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center space-x-2 px-3 py-2
          bg-gray-100 hover:bg-gray-200 
          dark:bg-gray-800 dark:hover:bg-gray-700
          border border-gray-200 dark:border-gray-700
          rounded-lg transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          dark:focus:ring-offset-gray-900
        "
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-lg">{currentTheme?.icon}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {currentTheme?.label}
        </span>
        <motion.svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="
            absolute top-full mt-2 right-0 
            bg-white dark:bg-gray-800 
            border border-gray-200 dark:border-gray-700
            rounded-lg shadow-lg
            min-w-[200px] z-50
          "
        >
          {themes.map(({ mode, label, icon, description }) => (
            <motion.button
              key={mode}
              onClick={() => {
                setTheme(mode);
                setIsOpen(false);
              }}
              className={`
                w-full text-left px-4 py-3 
                hover:bg-gray-50 dark:hover:bg-gray-700
                transition-colors duration-200
                first:rounded-t-lg last:rounded-b-lg
                ${mode === theme ? 'bg-primary-50 dark:bg-primary-900/20' : ''}
              `}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{icon}</span>
                <div className="flex-1">
                  <div className={`font-medium ${mode === theme ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-white'}`}>
                    {label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {description}
                  </div>
                </div>
                {mode === theme && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full"
                  />
                )}
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
});