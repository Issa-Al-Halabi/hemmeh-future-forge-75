import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { Instagram, Linkedin, Facebook } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import logo from '@/assets/logo.png';

export const Footer = () => {
  const { fontClass, isRTL, language } = useLanguage();

  return (
    <footer className={`bg-primary text-primary-foreground py-12 ${fontClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Logo */}
          <div className={`${isRTL ? 'text-right' : 'text-left'} flex items-center justify-center md:justify-start`}>
            <div className="bg-white p-2 rounded-full">
              <img src={logo} alt="HmmH Logo" className="h-20 w-20 rounded-full" />
            </div>
          </div>

          {/* Copyright & Social */}
          <div className="text-center space-y-4">
            <p className="text-primary-foreground/80">
              {language === 'ar'
                ? '© 2025 همّه. جميع الحقوق محفوظة'
                : '© 2025 HmmH. All rights reserved'}
            </p>

            {/* Social Media Links */}
            <div className="flex justify-center gap-4">
              <a
                href="https://www.instagram.com/hmmh.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/hmmh-consulting/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.facebook.com/hmmh.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://x.com/HmmH_co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <FaXTwitter size={20} />
              </a>
            </div>
          </div>


          {/* Contact Info */}
          <div className={`${isRTL ? 'text-left md:text-right' : 'text-left md:text-left'} space-y-2 text-center`}>
            <a href={`mailto:office@hmmh.consulting`} className="text-primary-foreground/80">
              office@hmmh.consulting
            </a>
            <br />
            <a href={`tel:+963113310226`} className="text-primary-foreground/80" dir='ltr'>
              +963 11 331 02 26
            </a>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              {language === 'ar'
                ? 'أبو رمانة، ساحة النجمة، خلف السفارة اليابانية'
                : 'Abu Roumaneh, Alnajmeh Square, Behind The Japanese Embassy'
              }
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};