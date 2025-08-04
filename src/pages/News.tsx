import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LoadingLogo } from '@/components/LoadingLogo';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNews } from '@/hooks/useNews';
import newsHeaderBg from '@/assets/news-header-bg.jpg';

export const News = () => {
  const { news, loading, error, refetch } = useNews();
  const { fontClass, isRTL } = useLanguage();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingLogo />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-lg">
          {error.message}
        </p>
        <Button onClick={refetch}>
          {isRTL ? 'إعادة المحاولة' : 'Try Again'}
        </Button>
      </div>
    );
  }

  if (!news.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-lg">
          {isRTL ? 'لا توجد أخبار متاحة' : 'No news available'}
        </p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  return (
    <div className={`min-h-screen bg-background ${fontClass}`}>
      {/* Header Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${newsHeaderBg})`
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {isRTL ? 'آخر الأخبار' : 'Latest News'}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            {isRTL 
              ? 'ابق على اطلاع بآخر إعلاناتنا وتطوراتنا' 
              : 'Stay updated with our latest announcements and developments'
            }
          </p>
        </div>
      </section>

      {/* News Grid Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {news.map((article) => (
              <Link 
                key={article.id} 
                to={`/news/${article.slug}`}
                className="group block"
              >
                <Card className="overflow-hidden h-full transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar size={16} />
                      <span>{formatDate(article.date)}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-muted-foreground line-clamp-3 mb-4">
                      {article.subtitle}
                    </p>

                    <Button 
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      {isRTL ? 'اقرأ المزيد' : 'Read More'}
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};