import { useState, useEffect } from 'react';
import { newsApi } from '@/services/api';
import { NewsItem, NewsError } from '@/types/news';
import { useLanguage } from '@/contexts/LanguageContext';

interface UseNewsDetailReturn {
  article: NewsItem | null;
  loading: boolean;
  error: NewsError | null;
  refetch: () => Promise<void>;
}

export function useNewsDetail(slug: string): UseNewsDetailReturn {
  const { language } = useLanguage();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<NewsError | null>(null);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await newsApi.getBySlug(slug, language);
      setArticle(response.data[0]);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'Failed to fetch article',
        statusCode: err instanceof Error ? (err as any).statusCode || 500 : 500
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [slug, language]); // Refetch when language or slug changes

  return {
    article,
    loading,
    error,
    refetch: fetchArticle
  };
}