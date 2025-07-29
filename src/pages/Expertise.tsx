import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, LineChart, Target, Rocket, FileText } from 'lucide-react';
import { LoadingLogo } from '@/components/LoadingLogo';
import expertiseNewHeader from '@/assets/expertise-new-header.jpg';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

// Import client logos
import bluepointHolding from '@/assets/clients/bluepoint-holding.webp';
import fourSeason from '@/assets/clients/four_season.png';
import intelligentBrain from '@/assets/clients/intelligent_brain.png';
import levantis from '@/assets/clients/levantis.webp';
import electromontaj from '@/assets/clients/Logo-Electromontaj.svg';
import lotus from '@/assets/clients/lotus.png';
import matrina from '@/assets/clients/matrina.webp';
import menamax from '@/assets/clients/menamax.webp';
import powerHouse from '@/assets/clients/power_house.webp';
import qbb from '@/assets/clients/qbb.png';
import sapient from '@/assets/clients/sapient.webp';
import sustido from '@/assets/clients/sustido.webp';

export const Expertise = () => {
  const { fontClass, isRTL } = useLanguage();
  const { content, loading } = useContent('expertise');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  const clients = [
    { src: bluepointHolding, alt: 'Bluepoint Holding' },
    { src: fourSeason, alt: 'Four Season' },
    { src: intelligentBrain, alt: 'Intelligent Brain' },
    { src: levantis, alt: 'Levantis' },
    { src: electromontaj, alt: 'Electromontaj' },
    { src: lotus, alt: 'Lotus' },
    { src: matrina, alt: 'Matrina' },
    { src: menamax, alt: 'Menamax' },
    { src: powerHouse, alt: 'Power House' },
    { src: qbb, alt: 'QBB' },
    { src: sapient, alt: 'Sapient' },
    { src: sustido, alt: 'Sustido' },
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
          if (isRTL) {
            console.log('rtl');
            api.scrollPrev(); // ⬅️ RTL: scroll to the left
          } else {
            console.log('ltr');
            api.scrollPrev(); // ⬅️ RTL: scroll to the left
            // api.scrollNext(); // ➡️ LTR: scroll to the right
          }
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

      {/* Partners Carousel */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 fade-in-scroll">
            {content.clients?.title || "Our Clients"}
          </h2>
          <div className="fade-in-scroll" >
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
                className={`-ml-2 md:-ml-4  ${isRTL ? 'rtl-carousel' : ''}`}
>
                {clients.map((client, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
                  >
                    <div className="h-24 md:h-32 p-4 flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
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