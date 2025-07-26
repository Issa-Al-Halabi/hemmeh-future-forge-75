import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { LoadingLogo } from '@/components/LoadingLogo';
import futureNowHeader from '@/assets/future-now-header.jpg';
import futureNowBg from '@/assets/future-now-bg.jpg';
import scaleFutureBg from '@/assets/scale-future-bg.jpg';
import knowledgeBg from '@/assets/knowledge-bg.jpg';

export const FutureNow = () => {
  const { fontClass, isRTL } = useLanguage();
  const { content, loading } = useContent('future-now');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-in-scroll');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [content]);

  if (loading || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingLogo size="lg" />
      </div>
    );
  }

  return (
    <div className={`${fontClass} ${isRTL ? 'text-right' : 'text-left'} pt-16`}>
      {/* Header Section */}
      <section 
        className="min-h-screen bg-fixed-overlay flex items-center justify-center"
        style={{ backgroundImage: `url(${futureNowHeader})` }}
      >
        <div className="text-center max-w-4xl mx-auto px-4 fade-in-scroll">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-overlay mb-6">
            {content.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-text-overlay/90 mb-8 max-w-3xl mx-auto">
            {content.hero.subtitle}
          </p>
          <p className="text-lg md:text-xl text-text-overlay/80 max-w-3xl mx-auto">
            {content.mainDescription}
          </p>
        </div>
      </section>

      {/* Scale the Future */}
      <section 
        className="py-16 md:py-20 bg-fixed-overlay"
        style={{ backgroundImage: `url(${scaleFutureBg})` }}
      >
        <div className="max-w-4xl mx-auto text-center fade-in-scroll">
          <h2 className="text-3xl md:text-4xl font-bold text-text-overlay mb-8">
            {content.scaleSection.title}
          </h2>
          <p className="text-lg md:text-xl text-text-overlay/90">
            {content.scaleSection.description}
          </p>
        </div>
      </section>

      {/* Economic Advantage */}
      <section 
        className="py-16 md:py-20 bg-fixed-overlay"
        style={{ backgroundImage: `url(${futureNowBg})` }}
      >
        <div className="max-w-4xl mx-auto text-center fade-in-scroll">
          <h2 className="text-3xl md:text-4xl font-bold text-text-overlay mb-6">
            {content.economicAdvantage.title}
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold text-text-overlay mb-8">
            {content.economicAdvantage.subtitle}
          </h3>
          <p className="text-lg text-text-overlay/90">
            {content.economicAdvantage.description}
          </p>
        </div>
      </section>

      {/* Growth Through Knowledge */}
      <section 
        className="py-16 md:py-20 bg-fixed-overlay"
        style={{ backgroundImage: `url(${knowledgeBg})` }}
      >
        <div className="max-w-4xl mx-auto text-center fade-in-scroll">
          <h2 className="text-3xl md:text-4xl font-bold text-text-overlay mb-6">
            {content.knowledge.title}
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold text-text-overlay mb-8">
            {content.knowledge.subtitle}
          </h3>
          <p className="text-lg md:text-xl text-text-overlay/90">
            {content.knowledge.description}
          </p>
        </div>
      </section>
    </div>
  );
};