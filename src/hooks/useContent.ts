import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';

export const useContent = (page: string) => {
  const { language } = useLanguage();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const module = await import(`@/data/${page}.${language}.json`);
        setContent(module.default);
      } catch (error) {
        console.error(`Failed to load content for ${page}.${language}`, error);
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [page, language]);

  return { content, loading };
};