'use client';

import { useLocale } from '@/shared/context/LocaleContext';

export const Skills = () => {
  const { t } = useLocale();

  const skillCategories = [
    { key: 'backend', icon: '🔧', color: 'from-blue-600 to-blue-400' },
    { key: 'frontend', icon: '💻', color: 'from-purple-600 to-purple-400' },
    { key: 'cloud', icon: '☁️', color: 'from-green-600 to-green-400' },
    { key: 'databases', icon: '🗄️', color: 'from-orange-600 to-orange-400' },
  ] as const;

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t.skills.title}
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {skillCategories.map(({ key, icon, color }) => {
            const category = t.skills[key];
            return (
              <div
                key={key}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">{icon}</span>
                  <h3
                    className={`text-2xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
                  >
                    {category.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {category.items.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                    >
                      <span className="text-blue-600 mt-1">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
