import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LoadingLogo } from '@/components/LoadingLogo';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useNewsDetail } from '@/hooks/useNewsDetail';

export const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { article, loading, error, refetch } = useNewsDetail(slug || '');
  const { fontClass, isRTL } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

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
        <div className="flex gap-4">
          <Button onClick={refetch}>
            {isRTL ? 'إعادة المحاولة' : 'Try Again'}
          </Button>
          <Link to="/news">
            <Button variant="outline">
              {isRTL ? 'العودة للأخبار' : 'Back to News'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold mb-4">
          {isRTL ? 'لم يتم العثور على المقال' : 'Article Not Found'}
        </h1>
        <Link to="/news">
          <Button>
            {isRTL ? 'العودة للأخبار' : 'Back to News'}
          </Button>
        </Link>
      </div>
    );
  }

  const lightboxSlides = article.images.map((image) => ({
    src: image
  }));

  return (
    <div className={`min-h-screen bg-background ${fontClass}`}>
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
        <div 
          className="prose prose-lg max-w-none mb-12 text-justify"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Gallery */}
        {article.images.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6">
              {isRTL ? 'معرض الصور' : 'Photo Gallery'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {article.images.map((image, index) => (
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
          controller={{ closeOnBackdropClick: true }}
        />
      )}
    </div>
  );
};