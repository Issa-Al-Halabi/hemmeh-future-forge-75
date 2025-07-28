import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, LineChart, Target, Rocket, FileText } from 'lucide-react';
import { LoadingLogo } from '@/components/LoadingLogo';
import heroBackground from '@/assets/hero-background.jpg';
import beyondBordersBg from '@/assets/beyond-borders-desert-bg.jpg';
import accelerateBg from '@/assets/accelerate-bg.jpg';
import chairmanPortrait from '@/assets/chairman.jpg';
import partnerPortrait from '@/assets/partner.jpg';

export const Home = () => {
  const { fontClass, isRTL, language } = useLanguage();
  const { content, loading } = useContent('home');
  const { content: servicesContent, loading: servicesLoading } = useContent('services');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
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

  // Show loading only if both are loading, but allow partial rendering
  if (loading && servicesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingLogo size="lg" />
      </div>
    );
  }

  // If main content failed to load, show error state
  if (!loading && !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Failed to load content</p>
        </div>
      </div>
    );
  }

  const scrollToServices = () => {
    const servicesElement = document.getElementById('services');
    servicesElement?.scrollIntoView({ behavior: 'smooth' });
  };

  const iconMap = {
    BarChart3: BarChart3,
    TrendingUp: TrendingUp,
    LineChart: LineChart,
    Target: Target,
    Rocket: Rocket,
    FileText: FileText
  };

  return (
    <div className={`${fontClass} ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Hero Section */}
      <section
        className="min-h-screen bg-fixed-overlay flex items-center justify-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="text-center max-w-4xl mx-auto px-4 fade-in-scroll">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-overlay mb-6">
            {content?.hero?.title || ''}
          </h1>
          <p className="text-xl md:text-2xl text-text-overlay/90 mb-8 max-w-3xl mx-auto">
            {content?.hero?.subtitle || ''}
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
            onClick={scrollToServices}
          >
            {content?.hero?.button || ''}
          </Button>
        </div>
      </section>

      {/* Accelerate the Future */}
      <section
        className="py-16 md:py-20 bg-fixed-overlay"
        style={{ backgroundImage: `url(${accelerateBg})` }}
      >
        <div className="max-w-4xl mx-auto text-center fade-in-scroll">
          <h2 className="text-4xl md:text-5xl font-bold text-text-overlay mb-6">
            {content?.accelerate?.title || ''}
          </h2>
          <p className="text-xl text-text-overlay/90">
            {content?.accelerate?.subtitle || ''}
          </p>
        </div>
      </section>


      {/* Beyond Borders */}
      <section
        className="py-16 md:py-20 bg-fixed-overlay"
        style={{ backgroundImage: `url(${beyondBordersBg})` }}
      >
        <div className="max-w-4xl mx-auto text-center fade-in-scroll">
          <h2 className="text-4xl md:text-5xl font-bold text-text-overlay mb-6">
            {content?.beyondBorders?.title || ''}
          </h2>
          <p className="text-xl text-text-overlay/90">
            {content?.beyondBorders?.subtitle || ''}
          </p>
        </div>
      </section>


      {/* Services Section */}
      {servicesContent && !servicesLoading && (
        <section id="services" className="section-padding bg-background ">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 fade-in-scroll">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {servicesContent.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {servicesContent.subtitle}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesContent.services.map((service: any, index: number) => {
                const IconComponent = iconMap[service.icon as keyof typeof iconMap];
                return (
                  <Card key={index} className="fade-in-scroll hover:shadow-lg transition-all duration-300 group border-l-4 border-l-primary hover:border-l-primary/80">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                        {IconComponent && <IconComponent className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />}
                      </div>
                      <CardTitle className="text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Chairman Message */}
      {content?.chairman && (
        <section className="section-padding bg-muted">
          <div className="max-w-7xl mx-auto fade-in-scroll">
            <div className="flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-16">
              <div className="w-full md:w-1/3 text-center md:text-left  flex flex-col items-center justify-center">
                <img
                  src={chairmanPortrait}
                  alt="Chairman"
                  className="w-64 h-64 md:w-[400px] md:h-[400px] mx-auto md:mx-0 rounded-lg shadow-lg mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-primary mb-1">
                  {content.chairman.title}
                </h3>
                <p className="text-muted-foreground">
                  {content.chairman.position}
                </p>
              </div>
              <div className="w-full md:w-2/3">
                {/* <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center md:text-left">
                  {content.chairman.title}
                </h2> */}
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {content.chairman.message}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Managing Partner Message */}
      {content?.partner && (
        <section className="section-padding bg-background">
          <div className="max-w-7xl mx-auto fade-in-scroll">
            <div className="flex flex-col md:flex-row-reverse items-center md:items-center gap-8 md:gap-16">
              <div className="w-full md:w-1/3 text-center md:text-right flex flex-col items-center justify-center">
                <img
                  src={partnerPortrait}
                  alt="Managing Partner"
                  className="w-64 h-64 md:w-[400px] md:h-[400px] mx-auto md:mx-0 md:ml-auto rounded-lg mb-4 object-contain"
                />
                <h3 className="text-xl font-bold text-primary mb-1">
                  {content.partner.title}
                </h3>
                <p className="text-muted-foreground">
                  {content.partner.position}
                </p>
              </div>
              <div className="w-full md:w-2/3">
                {/* <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center md:text-left">
                  {content.partner.title}
                </h2> */}
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {content.partner.message}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};