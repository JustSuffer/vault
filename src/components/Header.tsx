import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Camera } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="w-full p-4 md:p-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <Camera className="w-6 h-6 text-primary" />
          </div>
          <h1 className={`text-xl md:text-2xl font-bold ${
            theme === 'light' ? 'gradient-text-light' : 'gradient-text-dark'
          }`}>
            {t('wedding.album')}
          </h1>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
              className="px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 border-2"
            >
              <span className="font-medium">
                {language === 'en' ? 'TR' : 'EN'}
              </span>
            </Button>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="p-3 rounded-full transition-all duration-300 hover:scale-105 border-2"
            aria-label={t('theme.toggle')}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;