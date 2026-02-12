# AGENTS.md

## 📋 Descripción del Proyecto

CVApp es una aplicación web desarrollada en Next.js para la generación de currículums profesionales basados en plantillas predefinidas. Los usuarios pueden seleccionar plantillas, ingresar su información y generar PDFs de alta calidad.

## 🏗️ Arquitectura del Proyecto

### Stack Tecnológico

- **Framework**: Next.js 16.1 (App Router)
- **Lenguaje**: TypeScript 5
- **Estilos**: Tailwind CSS 4
- **Generación PDF**: @react-pdf/renderer 4.3
- **Runtime**: React 19

### Estructura de Carpetas

```
cvapp/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx            # Página principal
│   │   └── globals.css         # Estilos globales
│   ├── shared/                 # Código compartido
│   │   ├── components/         # Componentes reutilizables
│   │   ├── hooks/              # Custom hooks
│   │   ├── utils/              # Funciones utilitarias
│   │   ├── types/              # Definiciones de TypeScript
│   │   └── constants/          # Constantes de la aplicación
│   ├── features/               # Módulos por funcionalidad
│   │   ├── templates/          # Sistema de plantillas de CV
│   │   │   ├── components/     # Componentes de plantillas
│   │   │   ├── templates/      # Definiciones de plantillas
│   │   │   └── types.ts        # Tipos de plantillas
│   │   ├── editor/             # Editor de CV
│   │   │   ├── components/     # Componentes del editor
│   │   │   ├── hooks/          # Hooks del editor
│   │   │   └── validation/     # Validación de datos
│   │   ├── pdf/                # Generación de PDF
│   │   │   ├── components/     # Componentes PDF
│   │   │   ├── templates/      # Plantillas PDF
│   │   │   └── utils/          # Utilidades PDF
│   │   └── preview/            # Vista previa del CV
│   └── lib/                    # Librerías y configuraciones
├── public/                     # Archivos estáticos
│   ├── fonts/                  # Fuentes personalizadas
│   ├── icons/                  # Íconos
│   └── templates/              # Assets de plantillas
└── tests/                      # Tests
    ├── unit/
    ├── integration/
    └── e2e/
```

## 🎯 Principios de Desarrollo

### 1. Arquitectura Modular por Features

**Organiza el código por funcionalidad, no por tipo de archivo:**

```typescript
// ✅ CORRECTO - Feature-based
features/
  templates/
    components/
    hooks/
    types.ts
    utils.ts

// ❌ INCORRECTO - Type-based
components/
  TemplateCard.tsx
  TemplateList.tsx
hooks/
  useTemplate.ts
```

### 2. Principios SOLID

- **Single Responsibility**: Cada componente/función tiene una sola razón para cambiar
- **Open/Closed**: Abierto para extensión, cerrado para modificación (usa composición)
- **Dependency Inversion**: Depende de abstracciones, no de implementaciones concretas

### 3. Composición sobre Herencia

```typescript
// ✅ CORRECTO - Composición
const CVTemplate = ({ header, content, footer }: CVTemplateProps) => (
  <div>
    {header}
    {content}
    {footer}
  </div>
);

// ❌ EVITAR - Herencia compleja
class BaseTemplate extends React.Component { ... }
class ModernTemplate extends BaseTemplate { ... }
```

## 📝 Convenciones de Código

### Nomenclatura

```typescript
// Componentes: PascalCase
export const TemplateCard = () => { ... }

// Hooks: camelCase con prefijo 'use'
export const useTemplateForm = () => { ... }

// Utilidades: camelCase
export const formatDate = () => { ... }

// Tipos/Interfaces: PascalCase
export interface CVData { ... }
export type TemplateId = string;

// Constantes: UPPER_SNAKE_CASE
export const MAX_FILE_SIZE = 5_000_000;
export const DEFAULT_TEMPLATE_ID = 'modern-professional';

// Archivos de componentes: PascalCase.tsx
TemplateCard.tsx

// Archivos de utilidades: camelCase.ts
formatCV.ts
```

### Tipos y TypeScript

```typescript
// ✅ Define tipos explícitos para props
interface TemplateCardProps {
  id: string;
  name: string;
  preview: string;
  onSelect: (id: string) => void;
}

// ✅ Usa tipos de retorno explícitos en funciones complejas
function generatePDF(data: CVData): Promise<Blob> { ... }

// ✅ Evita 'any', usa 'unknown' si es necesario
const parseUserInput = (input: unknown): CVData => { ... }

// ✅ Usa enums o union types para valores finitos
type TemplateCategory = 'professional' | 'creative' | 'minimalist' | 'modern';

// ✅ Usa satisfies para validación de tipos
const config = {
  maxSections: 10,
  minSections: 3,
} satisfies ConfigSchema;
```

### Componentes React

```typescript
// ✅ Componentes funcionales con TypeScript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
}

export const Button = ({ variant = 'primary', loading, children, ...props }: ButtonProps) => {
  return (
    <button
      className={cn('btn', `btn-${variant}`, { loading })}
      disabled={loading}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

// ✅ Usa React.memo para componentes costosos
export const TemplatePreview = React.memo(({ data }: TemplatePreviewProps) => {
  // ...renderizado pesado
});

// ✅ Separa lógica de presentación
const useTemplateLogic = (templateId: string) => {
  const [template, setTemplate] = useState<Template | null>(null);
  // ... lógica
  return { template, updateTemplate };
};

export const TemplateEditor = ({ id }: Props) => {
  const { template, updateTemplate } = useTemplateLogic(id);
  return <div>{/* UI */}</div>;
};
```

### Custom Hooks

```typescript
// ✅ Nombre descriptivo con prefijo 'use'
export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving to localStorage:`, error);
    }
  };

  return [storedValue, setValue] as const;
};

// Uso
const [cvData, setCVData] = useLocalStorage<CVData>('cv-draft', initialCVData);
```

## 🎨 Gestión de Plantillas

### Estructura de una Plantilla

```typescript
// src/features/templates/types.ts
export interface CVTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  thumbnail: string;
  isPremium: boolean;
  config: TemplateConfig;
}

export interface TemplateConfig {
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  layout: 'single-column' | 'two-column' | 'three-column';
  sections: SectionConfig[];
}

// src/features/templates/templates/modern-professional.ts
export const modernProfessionalTemplate: CVTemplate = {
  id: 'modern-professional',
  name: 'Modern Professional',
  category: 'professional',
  description: 'Plantilla limpia y profesional para sectores corporativos',
  thumbnail: '/templates/modern-professional/thumbnail.png',
  isPremium: false,
  config: {
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      text: '#1e293b',
      background: '#ffffff',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    layout: 'two-column',
    sections: [
      { id: 'header', required: true, order: 0 },
      { id: 'summary', required: false, order: 1 },
      { id: 'experience', required: true, order: 2 },
      // ...
    ],
  },
};
```

### Registry de Plantillas

```typescript
// src/features/templates/registry.ts
import { modernProfessionalTemplate } from './templates/modern-professional';
import { creativeDesignerTemplate } from './templates/creative-designer';
// ... más plantillas

export const templateRegistry = {
  'modern-professional': modernProfessionalTemplate,
  'creative-designer': creativeDesignerTemplate,
  // ...
} as const;

export type TemplateId = keyof typeof templateRegistry;

export const getTemplate = (id: TemplateId): CVTemplate => {
  return templateRegistry[id];
};

export const getAllTemplates = (): CVTemplate[] => {
  return Object.values(templateRegistry);
};
```

## 📊 Modelo de Datos de CV

```typescript
// src/shared/types/cv.ts
export interface CVData {
  id: string;
  templateId: TemplateId;
  personalInfo: PersonalInfo;
  summary?: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  certifications?: Certification[];
  projects?: Project[];
  customSections?: CustomSection[];
  metadata: Metadata;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  photo?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  location?: string;
  description: string;
  achievements?: string[];
}

// ... más interfaces
```

## 🔧 Utilidades y Helpers

### Validación

```typescript
// src/shared/utils/validation.ts
import { z } from 'zod'; // Considera usar Zod para validación

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'El nombre es requerido'),
  lastName: z.string().min(1, 'El apellido es requerido'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
});

export const validateCVData = (data: unknown): CVData => {
  return cvDataSchema.parse(data);
};
```

### Formateo

```typescript
// src/shared/utils/format.ts
export const formatDate = (date: Date, locale = 'es-ES'): string => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
  }).format(date);
};

export const formatDateRange = (
  start: Date,
  end?: Date,
  locale = 'es-ES'
): string => {
  const startStr = formatDate(start, locale);
  const endStr = end ? formatDate(end, locale) : 'Presente';
  return `${startStr} - ${endStr}`;
};
```

## 📄 Generación de PDF

### Estructura de Componentes PDF

```typescript
// src/features/pdf/templates/ModernProfessionalPDF.tsx
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: 'Inter',
  },
  // ... más estilos
});

export const ModernProfessionalPDF = ({ data }: { data: CVData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text>{data.personalInfo.firstName}</Text>
          {/* ... contenido */}
        </View>
      </Page>
    </Document>
  );
};
```

### Generación de PDF

```typescript
// src/features/pdf/utils/generatePDF.ts
import { pdf } from '@react-pdf/renderer';

export const generatePDF = async (
  template: TemplateId,
  data: CVData
): Promise<Blob> => {
  const PDFComponent = getPDFTemplate(template);
  const blob = await pdf(<PDFComponent data={data} />).toBlob();
  return blob;
};

export const downloadPDF = async (
  template: TemplateId,
  data: CVData,
  filename: string
): Promise<void> => {
  const blob = await generatePDF(template, data);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
```

## 🎨 Estilos con Tailwind CSS

```typescript
// src/shared/utils/cn.ts - Class name utility
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// Uso
<div className={cn(
  'rounded-lg p-4',
  isSelected && 'border-2 border-blue-500',
  disabled && 'opacity-50 cursor-not-allowed'
)} />
```

## 🚀 Performance

### Optimización de Imágenes

```typescript
// ✅ Usa Next.js Image
import Image from 'next/image';

<Image
  src="/templates/preview.png"
  alt="Template preview"
  width={400}
  height={600}
  priority={isAboveFold}
  loading={isAboveFold ? 'eager' : 'lazy'}
/>
```

### Code Splitting

```typescript
// ✅ Lazy load de componentes pesados
import dynamic from 'next/dynamic';

const PDFPreview = dynamic(
  () => import('@/features/pdf/components/PDFPreview'),
  { 
    loading: () => <Spinner />,
    ssr: false // Si no necesita SSR
  }
);
```

### Memoización

```typescript
// ✅ useMemo para cálculos costosos
const templateSorted = useMemo(
  () => templates.sort((a, b) => a.name.localeCompare(b.name)),
  [templates]
);

// ✅ useCallback para callbacks en props
const handleTemplateSelect = useCallback(
  (id: string) => {
    setSelectedTemplate(id);
    onSelect?.(id);
  },
  [onSelect]
);
```

## 📱 Responsive Design

```typescript
// ✅ Mobile-first approach
<div className="
  grid grid-cols-1          // Mobile
  md:grid-cols-2            // Tablet
  lg:grid-cols-3            // Desktop
  gap-4
">
  {templates.map(...)}
</div>

// ✅ Hook para responsive
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

// Uso
const isMobile = useMediaQuery('(max-width: 768px)');
```

## 🔒 Seguridad y Validación

```typescript
// ✅ Sanitiza inputs del usuario
import DOMPurify from 'isomorphic-dompurify';

const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
};

// ✅ Valida archivos subidos
const validateImage = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    throw new Error('Tipo de archivo no permitido');
  }

  if (file.size > maxSize) {
    throw new Error('Archivo demasiado grande');
  }

  return true;
};
```

## 🧪 Testing

```typescript
// tests/unit/utils/format.test.ts
import { describe, it, expect } from 'vitest';
import { formatDateRange } from '@/shared/utils/format';

describe('formatDateRange', () => {
  it('formatea un rango de fechas correctamente', () => {
    const start = new Date('2023-01-01');
    const end = new Date('2024-01-01');
    expect(formatDateRange(start, end)).toBe('enero de 2023 - enero de 2024');
  });

  it('muestra "Presente" para fechas sin fin', () => {
    const start = new Date('2023-01-01');
    expect(formatDateRange(start)).toBe('enero de 2023 - Presente');
  });
});
```

## 🗂️ Gestión de Estado

```typescript
// ✅ Context para estado global
// src/shared/context/CVContext.tsx
interface CVContextValue {
  cvData: CVData;
  updateCVData: (data: Partial<CVData>) => void;
  resetCVData: () => void;
}

export const CVContext = createContext<CVContextValue | null>(null);

export const CVProvider = ({ children }: { children: React.ReactNode }) => {
  const [cvData, setCVData] = useState<CVData>(initialCVData);

  const updateCVData = useCallback((data: Partial<CVData>) => {
    setCVData(prev => ({ ...prev, ...data }));
  }, []);

  const resetCVData = useCallback(() => {
    setCVData(initialCVData);
  }, []);

  return (
    <CVContext.Provider value={{ cvData, updateCVData, resetCVData }}>
      {children}
    </CVContext.Provider>
  );
};

export const useCVData = () => {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error('useCVData must be used within CVProvider');
  }
  return context;
};
```

## 🌐 Internacionalización (i18n)

### Estructura del Sistema i18n

```typescript
// src/shared/i18n/translations/es.ts
export const es = {
  header: {
    features: 'Características',
    howItWorks: 'Cómo funciona',
  },
  // ... más traducciones
} as const;

// src/shared/i18n/translations/en.ts
export const en = {
  header: {
    features: 'Features',
    howItWorks: 'How it Works',
  },
  // ... more translations
} as const;

// src/shared/i18n/index.ts
export type Locale = 'es' | 'en';
export const translations: Record<Locale, TranslationKeys> = { es, en };
export const DEFAULT_LOCALE: Locale = 'es';
```

### Context de Idioma

```typescript
// src/shared/context/LocaleContext.tsx
'use client';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationKeys;  // Traducciones del idioma actual
}

export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Guarda la preferencia en localStorage
  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('cvapp-locale', newLocale);
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
};
```

### Uso en Componentes

```typescript
'use client';

import { useLocale } from '@/shared/context/LocaleContext';

export const MyComponent = () => {
  const { t, locale, setLocale } = useLocale();

  return (
    <div>
      <h1>{t.hero.title}</h1>
      <p>{t.hero.description}</p>
      <button onClick={() => setLocale('en')}>Switch to English</button>
    </div>
  );
};
```

### Selector de Idioma

```typescript
// src/shared/components/LanguageSwitcher.tsx
'use client';

export const LanguageSwitcher = () => {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
      {(['es', 'en'] as Locale[]).map((lang) => (
        <button
          key={lang}
          onClick={() => setLocale(lang)}
          className={cn(
            'px-3 py-1.5 text-sm font-medium rounded-md transition-all',
            locale === lang && 'bg-white text-gray-900 shadow-sm'
          )}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
```

### Agregar un Nuevo Idioma

1. **Crear archivo de traducción:**

```typescript
// src/shared/i18n/translations/fr.ts
export const fr = {
  header: {
    features: 'Fonctionnalités',
    howItWorks: 'Comment ça marche',
  },
  // ... todas las traducciones
} as const;
```

2. **Actualizar la configuración:**

```typescript
// src/shared/i18n/index.ts
import { fr } from './translations/fr';

export type Locale = 'es' | 'en' | 'fr';

export const translations: Record<Locale, TranslationKeys> = {
  es,
  en,
  fr,
};

export const LOCALE_NAMES: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
};
```

3. **El LanguageSwitcher se actualiza automáticamente**

### Mejores Prácticas i18n

✅ **Agrupa traducciones por sección**

```typescript
export const es = {
  header: { /* traducciones del header */ },
  footer: { /* traducciones del footer */ },
  features: { /* traducciones de características */ },
};
```

✅ **Usa claves descriptivas**

```typescript
// ✅ Bueno
t.privacy.cards.noServers.title

// ❌ Evitar
t.p1.c1.t
```

✅ **Mantén consistencia entre idiomas**

```typescript
// Todas las traducciones deben tener la misma estructura
es.hero.title === en.hero.title (en estructura)
```

✅ **Usa TypeScript para type-safety**

```typescript
// TranslationKeys se infiere del español (idioma base)
export type TranslationKeys = typeof es;

// Esto garantiza que todos los idiomas tengan las mismas claves
export const translations: Record<Locale, TranslationKeys> = {
  es,
  en,  // TypeScript validará que tenga todas las claves
};
```

## 📋 Checklist de Pull Request

Antes de crear un PR, verifica:

- [ ]  El código sigue las convenciones de nomenclatura
- [ ]  Tipos TypeScript definidos para todas las funciones/componentes públicos
- [ ]  Componentes son responsive (mobile, tablet, desktop)
- [ ]  No hay console.log() o código de depuración
- [ ]  Manejo de estados de carga y error
- [ ]  Validación de inputs del usuario
- [ ]  Tests unitarios para lógica compleja
- [ ]  Optimización de imágenes (usando Next.js Image)
- [ ]  Accesibilidad (ARIA labels, keyboard navigation)
- [ ]  Performance (React.memo, useMemo, useCallback donde corresponda)

## 🐛 Manejo de Errores

```typescript
// ✅ Error boundaries para componentes
// src/shared/components/ErrorBoundary.tsx
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback />;
    }
    return this.props.children;
  }
}

// ✅ Try-catch en funciones async
const handleDownload = async () => {
  try {
    setLoading(true);
    await downloadPDF(templateId, cvData, 'my-cv.pdf');
    toast.success('CV descargado exitosamente');
  } catch (error) {
    console.error('Error downloading PDF:', error);
    toast.error('Error al descargar el CV');
  } finally {
    setLoading(false);
  }
};
```

## 📚 Recursos y Referencias

- [Next.js Documentation](https://nextjs.org/docs)
- [React PDF Documentation](https://react-pdf.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🔄 Versionado

Usa [Semantic Versioning](https://semver.org/):

- MAJOR: Cambios incompatibles de API
- MINOR: Nueva funcionalidad compatible
- PATCH: Correcciones de bugs

---

**Última actualización**: 11 de febrero de 2026
**Versión**: 1.0.0
