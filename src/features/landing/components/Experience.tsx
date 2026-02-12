'use client';

import { useLocale } from '@/shared/context/LocaleContext';

export const Experience = () => {
  const { t } = useLocale();

  const sections = [
    {
      title: t.profile.title,
      items: t.profile.roles,
      icon: '👨‍💻',
    },
    {
      title: t.security.title,
      items: t.security.items,
      icon: '🔒',
    },
    {
      title: t.architecture.title,
      items: t.architecture.items,
      icon: '🏗️',
    },
  ];

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {sections.map((section, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">{section.icon}</span>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {section.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <span className="text-blue-600 mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">{t.profile.mindset.title}</h3>
            <p className="mb-6 text-blue-100">{t.profile.mindset.description}</p>
            <ul className="grid md:grid-cols-2 gap-3">
              {t.profile.mindset.points.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1">💡</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
