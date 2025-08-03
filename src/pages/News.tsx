import { Link } from 'react-router-dom';
import { useContent } from '@/hooks/useContent';
import { useLanguage } from '@/contexts/LanguageContext';
import { LoadingLogo } from '@/components/LoadingLogo';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export const News = () => {
  const { content, loading } = useContent('news');
  const { fontClass, isRTL } = useLanguage();

  if (loading) {
    return <LoadingLogo />;
  }

  if (!content) {
    return <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Failed to load news content</p>
    </div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`min-h-screen bg-background ${fontClass}`}>
      {/* Header Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1466442929976-97f336a657be?w=1920&h=1080&fit=crop')`
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {content.header.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            {content.header.subtitle}
          </p>
        </div>
      </section>

      {/* News Grid Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.news.map((article: any) => (
              <Link 
                key={article.id} 
                to={`/news/${article.id}`}
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
                    
                    <p className="text-muted-foreground line-clamp-3">
                      {article.subtitle}
                    </p>
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