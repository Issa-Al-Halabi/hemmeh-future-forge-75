import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Phone, Mail, MapPin, X } from 'lucide-react';
import logo from '@/assets/logo.png';

interface MobileSidebarProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MobileSidebar = ({ isOpen, onOpenChange }: MobileSidebarProps) => {
  const { language, fontClass, isRTL } = useLanguage();
  const [navData, setNavData] = useState<any>(null);
  const [contactData, setContactData] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [navModule, contactModule] = await Promise.all([
          import(`@/data/navigation.${language}.json`),
          import(`@/data/contact.${language}.json`)
        ]);
        setNavData(navModule.default);
        setContactData(contactModule.default);
      } catch (error) {
        console.error('Failed to load sidebar data', error);
      }
    };
    loadData();
  }, [language]);

  if (!navData || !contactData) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side={isRTL ? "left" : "right"} 
        className={`w-60 overflow-auto p-0 ${fontClass} ${isRTL ? 'text-right' : 'text-left'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header with Logo and Close Button */}
          <div className="flex items-center justify-center p-6 border-b">
            <Link to="/" onClick={() => onOpenChange(false)}>
              <img src={logo} alt={navData.brand} className="h-32 w-32" />
            </Link>
         
          </div>

          {/* Navigation Links */}
          <div className="flex-1 py-6">
            <nav className="space-y-2 px-6">
              {navData.menu.map((item: any) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    location.pathname === item.path 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-foreground hover:bg-muted hover:text-primary'
                  }`}
                  onClick={() => onOpenChange(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Language Toggle */}
            <div className="px-6 mt-8">
              <div className="border-t pt-6">
                <LanguageToggle />
              </div>
            </div>
          </div>

          {/* Footer with Contact Info */}
          <div className="border-t p-6 space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                {contactData.contact.title}
              </h3>
              
              {/* Phone */}
              <a 
                href={`tel:${contactData.contact.phone}`}
                className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors"
              >
                <Phone size={16} />
                <span>{contactData.contact.phone}</span>
              </a>

              {/* Email */}
              <a 
                href={`mailto:${contactData.contact.email}`}
                className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors"
              >
                <Mail size={16} />
                <span>{contactData.contact.email}</span>
              </a>

              {/* Address */}
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin size={16} />
                <span>{contactData.contact.address}</span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};