import type { Locale } from '@/shared/i18n';

interface LocalizedContent {
  es: string;
  en: string;
}

interface PortfolioProjectLink {
  label: 'demo' | 'repository';
  url: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  subtitle: LocalizedContent;
  description: LocalizedContent;
  mentoring: LocalizedContent[];
  technologies: string[];
  features: LocalizedContent[];
  techStack: LocalizedContent[];
  architecture: LocalizedContent[];
  technicalChallenges: LocalizedContent[];
  uxHighlights: LocalizedContent[];
  links: PortfolioProjectLink[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'cvnova',
    title: 'CVNova - Generador de Currículums Profesionales',
    subtitle: {
      es: 'Aplicación web moderna para crear currículums de alta calidad con enfoque en privacidad y simplicidad.',
      en: 'Modern web app to create high-quality resumes with a focus on privacy and simplicity.',
    },
    description: {
      es: 'CVNova permite crear currículums profesionales con plantillas optimizadas por industria. Toda la información permanece en el navegador del usuario, sin registro y sin almacenamiento en servidores.',
      en: 'CVNova allows users to create professional resumes with industry-optimized templates. All information remains in the browser, with no sign-up and no server-side storage.',
    },
    mentoring: [],
    technologies: [
      'Next.js 16',
      'React 19',
      'TypeScript 5',
      '@react-pdf/renderer',
      'Tailwind CSS 4',
    ],
    features: [
      {
        es: 'Editor en tiempo real con vista previa instantánea.',
        en: 'Real-time editor with instant preview.',
      },
      {
        es: '4 plantillas profesionales: Modern Professional, Creative Designer, Minimalist y Tech Modern.',
        en: '4 professional templates: Modern Professional, Creative Designer, Minimalist, and Tech Modern.',
      },
      {
        es: 'Generación de PDF de alta calidad con @react-pdf/renderer.',
        en: 'High-quality PDF generation with @react-pdf/renderer.',
      },
      {
        es: '100% privado: almacenamiento local sin servidores.',
        en: '100% private: local storage with no servers.',
      },
      {
        es: 'Interfaz multiidioma: Español e Inglés.',
        en: 'Multilingual interface: Spanish and English.',
      },
      {
        es: 'Modo oscuro/claro con persistencia de preferencias.',
        en: 'Dark/light mode with persisted preferences.',
      },
      {
        es: 'Diseño responsivo para móvil, tablet y desktop.',
        en: 'Responsive design for mobile, tablet, and desktop.',
      },
      {
        es: 'Personalización de colores por plantilla.',
        en: 'Template-level color customization.',
      },
    ],
    techStack: [
      {
        es: 'Next.js 16 con App Router y React 19.',
        en: 'Next.js 16 with App Router and React 19.',
      },
      {
        es: 'TypeScript 5 para type-safety completo.',
        en: 'TypeScript 5 for full type safety.',
      },
      {
        es: 'Tailwind CSS 4 para estilos utilitarios y diseño responsivo.',
        en: 'Tailwind CSS 4 for utility-first styling and responsive design.',
      },
      {
        es: '@react-pdf/renderer para generación de PDFs profesionales.',
        en: '@react-pdf/renderer for professional PDF generation.',
      },
      {
        es: 'Arquitectura modular basada en features con separación de responsabilidades.',
        en: 'Feature-based modular architecture with clear separation of responsibilities.',
      },
      {
        es: 'Context API para gestión de estado global (CV data, i18n, theme).',
        en: 'Context API for global state management (CV data, i18n, theme).',
      },
    ],
    architecture: [
      {
        es: 'Separación clara entre UI, lógica de negocio y generación de PDF.',
        en: 'Clear separation between UI, business logic, and PDF generation.',
      },
      {
        es: 'Sistema de plantillas extensible mediante registry pattern.',
        en: 'Extensible template system using a registry pattern.',
      },
      {
        es: 'Componentes reutilizables con props tipadas.',
        en: 'Reusable components with typed props.',
      },
      {
        es: 'Custom hooks para lógica compartida (useLocalStorage y useMediaQuery).',
        en: 'Custom hooks for shared logic (useLocalStorage and useMediaQuery).',
      },
      {
        es: 'Sistema i18n personalizado con type-safety.',
        en: 'Custom i18n system with type safety.',
      },
    ],
    technicalChallenges: [
      {
        es: 'Editor multipasos con validación en tiempo real.',
        en: 'Multi-step editor with real-time validation.',
      },
      {
        es: 'Sincronización entre preview web y render PDF.',
        en: 'Synchronization between web preview and PDF rendering.',
      },
      {
        es: 'Persistencia local robusta con localStorage y estado complejo.',
        en: 'Robust local persistence with localStorage and complex state.',
      },
      {
        es: 'Generación dinámica de PDFs con estilos consistentes entre plantillas.',
        en: 'Dynamic PDF generation with consistent styling across templates.',
      },
      {
        es: 'Internacionalización tipada con cambio dinámico de idioma.',
        en: 'Typed internationalization with dynamic language switching.',
      },
    ],
    uxHighlights: [
      {
        es: 'Interfaz minimalista con animaciones sutiles.',
        en: 'Minimalist interface with subtle animations.',
      },
      {
        es: 'Flujo optimizado: plantilla → edición → descarga.',
        en: 'Optimized flow: template → editing → download.',
      },
      {
        es: 'Feedback visual inmediato en las acciones clave.',
        en: 'Immediate visual feedback for key actions.',
      },
      {
        es: 'Accesibilidad: navegación por teclado y ARIA labels.',
        en: 'Accessibility: keyboard navigation and ARIA labels.',
      },
      {
        es: 'Optimización de rendimiento con code splitting y lazy loading.',
        en: 'Performance optimization with code splitting and lazy loading.',
      },
    ],
    links: [
      {
        label: 'demo',
        url: 'https://cvnovapp.vercel.app',
      },
      {
        label: 'repository',
        url: 'https://github.com/luedan/cvnova',
      },
    ],
  },
];

export const getLocalizedContent = (content: LocalizedContent, locale: Locale): string => {
  return content[locale];
};
