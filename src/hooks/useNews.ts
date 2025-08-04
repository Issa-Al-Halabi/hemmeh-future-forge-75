import { useState, useEffect } from 'react';
import { newsApi } from '@/services/api';
import { NewsItem, NewsError } from '@/types/news';
import { useLanguage } from '@/contexts/LanguageContext';

interface UseNewsReturn {
  news: NewsItem[];
  loading: boolean;
  error: NewsError | null;
  refetch: () => Promise<void>;
}

export function useNews(): UseNewsReturn {
  const { language } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<NewsError | null>(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await newsApi.getAll(language);
      setNews(response.data);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : 'Failed to fetch news',
        statusCode: err instanceof Error ? (err as any).statusCode || 500 : 500
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [language]); // Refetch when language changes

  return {
    news,
    loading,
    error,
    refetch: fetchNews
  };
}