'use client';

import { useLocale } from '@/shared/context/LocaleContext';
import { getLocalizedContent, portfolioProjects } from '@/features/landing/data/portfolioProjects';

const labels = {
  es: {
    title: 'Portafolio Público',
    subtitle: 'Proyectos destacados construidos con enfoque en arquitectura, escalabilidad y experiencia de usuario.',
    description: 'Descripción',
    mentoring: 'Mentoría técnica',
    technologies: 'Tecnologías',
    features: 'Características principales',
    stack: 'Stack tecnológico',
    architecture: 'Arquitectura y diseño',
    challenges: 'Desafíos técnicos resueltos',
    ux: 'UX/UI',
    demo: 'Ver demo',
    repository: 'Ver repositorio',
  },
  en: {
    title: 'Public Portfolio',
    subtitle: 'Highlighted projects built with a focus on architecture, scalability, and user experience.',
    description: 'Description',
    mentoring: 'Technical mentoring',
    technologies: 'Technologies',
    features: 'Key features',
    stack: 'Technology stack',
    architecture: 'Architecture and design',
    challenges: 'Technical challenges solved',
    ux: 'UX/UI',
    demo: 'Open demo',
    repository: 'Open repository',
  },
} as const;

export const Portfolio = () => {
  const { locale } = useLocale();
  const text = labels[locale];

  return (
    <section id="portfolio" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {text.title}
          </h2>
          <p className="text-center text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            {text.subtitle}
          </p>

          <div className="space-y-8">
            {portfolioProjects.map((project) => (
              <article
                key={project.id}
                className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6 md:p-8 shadow-lg"
              >
                <header className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {getLocalizedContent(project.subtitle, locale)}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg font-semibold text-white bg-linear-to-r from-blue-600 to-purple-600 hover:shadow-md transition-shadow"
                      >
                        {link.label === 'demo' ? text.demo : text.repository}
                      </a>
                    ))}
                  </div>
                </header>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {text.description}
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      {getLocalizedContent(project.description, locale)}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {text.mentoring}
                    </h4>
                    <ul className="space-y-2">
                      {project.mentoring.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                          <span className="text-indigo-600 mt-1">▸</span>
                          <span>{getLocalizedContent(item, locale)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {text.technologies}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="px-3 py-1 rounded-full text-sm font-medium bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {text.features}
                    </h4>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {project.features.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                          <span className="text-blue-600 mt-1">▸</span>
                          <span>{getLocalizedContent(item, locale)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {text.stack}
                    </h4>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {project.techStack.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                          <span className="text-purple-600 mt-1">▸</span>
                          <span>{getLocalizedContent(item, locale)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {text.architecture}
                    </h4>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {project.architecture.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                          <span className="text-green-600 mt-1">▸</span>
                          <span>{getLocalizedContent(item, locale)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {text.challenges}
                    </h4>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {project.technicalChallenges.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                          <span className="text-orange-600 mt-1">▸</span>
                          <span>{getLocalizedContent(item, locale)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {text.ux}
                    </h4>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {project.uxHighlights.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                          <span className="text-pink-600 mt-1">▸</span>
                          <span>{getLocalizedContent(item, locale)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
