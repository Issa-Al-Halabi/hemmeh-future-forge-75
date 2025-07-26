import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Services = () => {
  const { fontClass, isRTL } = useLanguage();
  const { content, loading } = useContent('services');
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
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className={`${fontClass} ${isRTL ? 'text-right' : 'text-left'} pt-16`}>
      {/* Header Section */}
      <section className="section-padding bg-gradient-to-br from-primary/10 to-secondary/20">
        <div className="max-w-4xl mx-auto text-center fade-in-scroll">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {content.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            {content.subtitle}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="section-padding bg-gradient-to-br from-primary/5 to-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.services.map((service: any, index: number) => (
              <Card key={index} className="fade-in-scroll hover:shadow-xl transition-all duration-300 group border-l-4 border-l-primary hover:border-l-primary/60 bg-background/80 backdrop-blur-sm hover:bg-background">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{service.icon}</span>
                  </div>
                  <CardTitle className="text-xl font-bold text-primary group-hover:text-primary/80 transition-colors leading-tight">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};