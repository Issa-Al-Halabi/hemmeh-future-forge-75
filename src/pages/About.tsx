import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { LoadingLogo } from '@/components/LoadingLogo';
import aboutHeaderBg from '@/assets/about-us-bg.jpg';
import missionBg from '@/assets/mission-bg.jpg';
import visionBg from '@/assets/vision-bg.jpg';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

// Import client logos
import cambridgeLogo from '@/assets/partners/cambridge.png';

export const About = () => {
  const { fontClass, isRTL } = useLanguage();
  const { content, loading } = useContent('about');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  const clients = [
    { src: cambridgeLogo, alt: 'Cambridge Logo' },
  ];

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

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    const startAutoplay = () => {
      intervalRef.current = setInterval(() => {
        if (api) {
          api.scrollPrev(); // Scroll direction is the same for both RTL and LTR
        }
      }, 3000); // Slide every 3 seconds
    };

    const stopAutoplay = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    if (api) {
      startAutoplay();

      // Stop autoplay on user interaction
      api.on("pointerDown", stopAutoplay);
      api.on("pointerUp", startAutoplay);
    }

    return () => {
      stopAutoplay();
      api?.off("pointerDown", stopAutoplay);
      api?.off("pointerUp", startAutoplay);
    };
  }, [api]);

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
          <p className="text-center text-lg text-muted-foreground leading-relaxed">
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
                    <div className="flex flex-col grow 1">
                      <CardTitle className="text-center text-xl font-bold text-primary mb-3">
                        {point.title}
                      </CardTitle>
                      <p className="text-center text-muted-foreground leading-relaxed">
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

      {/* Partners Carousel */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 fade-in-scroll">
            {content.our_partners?.title}
          </h2>
          {/* <p className="text-center text-lg text-muted-foreground leading-relaxed">
            {content.our_partners?.description }
          </p> */}
          <div className="fade-in-scroll">
            <Carousel
              opts={{
                align: "start",
                loop: true,
                direction: isRTL ? 'rtl' : 'ltr',
              }}
              className="w-full"
              setApi={setApi}
            >
              <CarouselContent 
                className={`-ml-2 md:-ml-4 ${isRTL ? 'rtl-carousel' : ''}`}
              >
                {clients.map((client, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-2 md:pl-4 basis-1/1 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
                  >
                    <div className="h-16 md:h-32 flex items-center justify-center bg-white rounded-lg ">
                      <img
                        src={client.src}
                        alt={client.alt}
                        className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                        loading="lazy"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>
    </div>
  );
};