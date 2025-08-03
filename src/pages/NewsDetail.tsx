import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useContent } from '@/hooks/useContent';
import { useLanguage } from '@/contexts/LanguageContext';
import { LoadingLogo } from '@/components/LoadingLogo';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export const NewsDetail = () => {
  const { id } = useParams();
  const { content, loading } = useContent('news');
  const { fontClass, isRTL } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (loading) {
    return <LoadingLogo />;
  }

  if (!content) {
    return <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Failed to load news content</p>
    </div>;
  }

  const article = content.news.find((item: any) => item.id === id);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link to="/news">
            <Button>Back to News</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const lightboxSlides = article?.gallery?.map((image: string) => ({
    src: image
  })) || [];

  return (
    <div className={`min-h-screen bg-background ${fontClass}`}>
      {/* Header */}
      <div className="bg-muted/30 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/news" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6">
            <BackIcon size={20} />
            <span>{isRTL ? 'العودة للأخبار' : 'Back to News'}</span>
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Image */}
        <div className="aspect-video mb-8 rounded-lg overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <Calendar size={18} />
            <span>{formatDate(article.date)}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            {article.subtitle}
          </p>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          {article.content.split('\n\n').map((paragraph: string, index: number) => (
            <p key={index} className="mb-6 leading-relaxed text-foreground">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Gallery */}
        {article.gallery && article.gallery.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6">
              {isRTL ? 'معرض الصور' : 'Photo Gallery'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {article.gallery.map((image: string, index: number) => (
                <div 
                  key={index} 
                  className="aspect-video rounded-lg overflow-hidden group cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back to News */}
        <div className="text-center">
          <Link to="/news">
            <Button size="lg" className="inline-flex items-center gap-2">
              <BackIcon size={20} />
              <span>{isRTL ? 'العودة للأخبار' : 'Back to News'}</span>
            </Button>
          </Link>
        </div>
      </article>

      {/* Lightbox */}
      {lightboxSlides.length > 0 && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={lightboxSlides}
        />
      )}
    </div>
  );
};