'use client';

import { useLocale } from '@/shared/context/LocaleContext';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher';
import { useState, useEffect } from 'react';
import { cn } from '@/shared/utils/cn';

export const Header = () => {
  const { t } = useLocale();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Luedan
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('about')}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {t.header.about}
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {t.header.skills}
          </button>
          <button
            onClick={() => scrollToSection('experience')}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {t.header.experience}
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {t.header.contact}
          </button>
        </div>

        <LanguageSwitcher />
      </nav>
    </header>
  );
};
