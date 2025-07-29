import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { LoadingLogo } from '@/components/LoadingLogo';
import aboutHeaderBg from '@/assets/about-us-bg.jpg';
import missionBg from '@/assets/mission-bg.jpg';
import visionBg from '@/assets/vision-bg.jpg';

export const About = () => {
  const { fontClass, isRTL } = useLanguage();
  const { content, loading } = useContent('about');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
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
      {/* Hero Header */}
      <section 
        className="min-h-[60vh] bg-fixed-overlay flex items-center justify-center"
        style={{ backgroundImage: `url(${aboutHeaderBg})` }}
      >
        <div className="text-center max-w-4xl mx-auto px-4 fade-in-scroll">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-overlay mb-6">
            {content.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-text-overlay/90">
            {content.hero.subtitle}
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-background">
        <div className="max-w-4xl mx-auto fade-in-scroll">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            {content.about.title}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {content.about.description}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section 
        className="py-16 md:py-20 bg-fixed-overlay"
        style={{ backgroundImage: `url(${missionBg})` }}
      >
        <div className="max-w-4xl mx-auto text-center fade-in-scroll">
          <h2 className="text-3xl md:text-4xl font-bold text-text-overlay mb-8">
            {content.mission.title}
          </h2>
          <p className="text-lg md:text-xl text-text-overlay/90 leading-relaxed">
            {content.mission.description}
          </p>
        </div>
      </section>

      {/* Vision */}
      <section 
        className="py-16 md:py-20 bg-fixed-overlay"
        style={{ backgroundImage: `url(${visionBg})` }}
      >
        <div className="max-w-4xl mx-auto text-center fade-in-scroll">
          <h2 className="text-3xl md:text-4xl font-bold text-text-overlay mb-8">
            {content.vision.title}
          </h2>
          <p className="text-lg md:text-xl text-text-overlay/90 leading-relaxed">
            {content.vision.description}
          </p>
        </div>
      </section>

      {/* Our Approach */}
      <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/10">
        <div className="max-w-6xl mx-auto fade-in-scroll">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            {content.approach.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {content.approach.points.map((point: any, index: number) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 group border-l-4 border-l-primary">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-primary flex-shrink-0 mt-1" size={24} />
                    <div>
                      <CardTitle className="text-xl font-bold text-primary mb-3">
                        {point.title}
                      </CardTitle>
                      <p className="text-muted-foreground leading-relaxed">
                        {point.subtitle}
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};