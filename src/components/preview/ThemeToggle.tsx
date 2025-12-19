'use client';

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '@/lib/stores/theme-store';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Get initial theme from localStorage or system preference
    const storedTheme = localStorage.getItem('theme') || 'system';
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let shouldBeDark = false;
    if (storedTheme === 'dark') {
      shouldBeDark = true;
    } else if (storedTheme === 'light') {
      shouldBeDark = false;
    } else {
      shouldBeDark = systemPrefersDark;
    }
    
    setIsDark(shouldBeDark);
    
    // Apply theme to document
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Sync with store
    if (storedTheme !== theme) {
      setTheme(storedTheme as 'light' | 'dark' | 'system');
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = theme === 'dark' || (theme === 'system' && systemPrefersDark);
    
    setIsDark(shouldBeDark);
    localStorage.setItem('theme', theme);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);
    
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <div className="w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600" />
      </div>
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        key={isDark ? 'dark' : 'light'}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        ) : (
          <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        )}
      </motion.div>
    </motion.button>
  );
}
