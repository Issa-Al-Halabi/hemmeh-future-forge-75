import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { MobileSidebar } from './MobileSidebar';
import logo from '@/assets/logo.png';

export const Navigation = () => {
  const { language, fontClass, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [navData, setNavData] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const loadNavData = async () => {
      try {
        const module = await import(`@/data/navigation.${language}.json`);
        setNavData(module.default);
      } catch (error) {
        console.error('Failed to load navigation data', error);
      }
    };
    loadNavData();
  }, [language]);

  if (!navData) return null;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b ${fontClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt={navData.brand} className="h-24 w-24 hover:scale-105 transition-transform duration-300" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className={`flex ${isRTL ? 'space-x-reverse space-x-8' : 'space-x-8'} items-center`}>
              {navData.menu.map((item: any) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-foreground hover:text-primary transition-colors font-medium ${
                    location.pathname === item.path ? 'text-primary' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="ml-8">
                <LanguageToggle />
              </div>
            </div>
          </div>

          {/* Mobile Sidebar */}
          <div className="md:hidden">
            <MobileSidebar isOpen={isOpen} onOpenChange={setIsOpen} />
          </div>
        </div>
      </div>
    </nav>
  );
};