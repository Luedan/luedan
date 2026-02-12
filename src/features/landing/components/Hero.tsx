'use client';

import { useLocale } from '@/shared/context/LocaleContext';
import Image from 'next/image';
import profilePhoto from '@/shared/assets/photo.png';

export const Hero = () => {
  const { t } = useLocale();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Imagen */}
            <div className="flex justify-center md:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                  <Image
                    src={profilePhoto}
                    alt="Luis - Senior Full Stack Engineer"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 256px, 320px"
                  />
                </div>
              </div>
            </div>

            {/* Contenido */}
            <div className="text-center md:text-left md:order-1">
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                {t.hero.greeting}
              </p>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t.hero.name}
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {t.hero.role}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                {t.hero.subtitle}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                {t.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  onClick={() => scrollToSection('skills')}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                  {t.hero.cta}
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-800 transition-all"
                >
                  {t.hero.contact}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
