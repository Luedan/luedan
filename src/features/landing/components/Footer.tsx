"use client";

import { useLocale } from "@/shared/context/LocaleContext";

export const Footer = () => {
  const { t } = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-400 mb-2">
            © {currentYear} Luedan. {t.footer.rights}.
          </p>
        </div>
      </div>
    </footer>
  );
};
