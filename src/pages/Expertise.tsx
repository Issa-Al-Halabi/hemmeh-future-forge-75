import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, LineChart, Target, Rocket, FileText } from 'lucide-react';
import { LoadingLogo } from '@/components/LoadingLogo';
import expertiseNewHeader from '@/assets/expertise-new-header.jpg';

export const Expertise = () => {
  const { fontClass, isRTL } = useLanguage();
  const { content, loading } = useContent('expertise');
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

  const iconMap = [
    BarChart3, TrendingUp, LineChart, Target, Rocket, FileText
  ];

  return (
    <div className={`${fontClass} ${isRTL ? 'text-right' : 'text-left'} pt-16`}>
      {/* Header Section */}
      <section 
        className="min-h-screen bg-fixed-overlay flex items-center justify-center"
        style={{ backgroundImage: `url(${expertiseNewHeader})` }}
      >
        <div className="text-center max-w-4xl mx-auto px-4 fade-in-scroll">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-overlay mb-6">
            {content.title}
          </h1>
          <p className="text-xl md:text-2xl text-text-overlay/90">
            {content.subtitle}
          </p>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="section-padding bg-gradient-to-br from-primary/5 to-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.areas.map((area: any, index: number) => {
              const IconComponent = iconMap[index % iconMap.length];
              return (
                <Card key={index} className="fade-in-scroll hover:shadow-xl transition-all duration-300 group border-l-4 border-l-primary hover:border-l-primary/60 bg-background/80 backdrop-blur-sm hover:bg-background">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <CardTitle className="text-xl font-bold text-primary group-hover:text-primary/80 transition-colors leading-tight">
                      {area.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {area.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};