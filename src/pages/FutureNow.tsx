import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { LoadingLogo } from '@/components/LoadingLogo';
import futureNowDarkHeader from '@/assets/future-now-dark-header.jpg';
import scaleFutureLightBg from '@/assets/scale-future.jpg';
import economicAdvantageDarkBg from '@/assets/economic-advantage.jpg';
import knowledgeLightBg from '@/assets/knowledge.jpg';

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
        style={{ backgroundImage: `url(${futureNowDarkHeader})` }}
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
        className="px-2 py-16 md:py-20 bg-fixed-overlay"
        style={{ backgroundImage: `url(${scaleFutureLightBg})` }}
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
        className="px-2 py-16 md:py-20 bg-fixed-overlay"
        style={{ backgroundImage: `url(${economicAdvantageDarkBg})` }}
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
        className="px-2 py-16 md:py-20 bg-fixed-overlay"
        style={{ backgroundImage: `url(${knowledgeLightBg})` }}
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