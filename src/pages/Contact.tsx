import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { LoadingLogo } from '@/components/LoadingLogo';
import contactHeaderBg from '@/assets/contact-new-header.jpg';

export const Contact = () => {
  const { fontClass, isRTL } = useLanguage();
  const { content, loading } = useContent('contact');
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

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
        style={{ backgroundImage: `url(${contactHeaderBg})` }}
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

      {/* Contact Form & Info */}
      <section className="section-padding bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="fade-in-scroll">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{content.form.send}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {content.form.name}
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={content.form.namePlaceholder}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {content.form.email}
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={content.form.emailPlaceholder}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {content.form.subject}
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder={content.form.subjectPlaceholder}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {content.form.message}
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={content.form.messagePlaceholder}
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" size="lg">
                    {content.form.send}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="fade-in-scroll">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">{content.contact.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <MapPin className="text-primary flex-shrink-0" size={24} />
                    <span className="text-lg">{content.contact.address}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Mail className="text-primary flex-shrink-0" size={24} />
                    <a href={`mailto:${content.contact.email}`} className="text-lg hover:text-primary transition-colors cursor-pointer">
                      {content.contact.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Phone className="text-primary flex-shrink-0" size={24} />
                    <a href={`tel:${content.contact.phone}`} className="text-lg hover:text-primary transition-colors cursor-pointer">
                      {content.contact.phone}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};