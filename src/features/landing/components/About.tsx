'use client';

import { useLocale } from '@/shared/context/LocaleContext';

export const About = () => {
  const { t } = useLocale();

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t.about.title}
        </h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            {t.about.intro}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 font-semibold">
            {t.about.focus}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.values(t.about.points).map((point, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <span className="text-gray-800 dark:text-gray-200">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
