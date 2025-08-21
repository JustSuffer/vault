import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Camera } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="w-full p-4 md:p-6 relative">
      {/* Smooth background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/98 to-background/95 backdrop-blur-md border-b border-border/40 shadow-sm" />
      
      <div className="relative z-10 flex items-center justify-between max-w-7xl mx-auto flex-wrap gap-3">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
            <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <h1 className={`text-xl md:text-2xl font-bold transition-all duration-300 ${
            theme === 'light' ? 'gradient-text-light' : 'gradient-text-dark'
          }`}>
            {t('wedding.album')}
          </h1>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Language Switcher */}
          <div className="flex rounded-xl border border-border/30 overflow-hidden lang-switch-container shadow-sm transition-all duration-300 hover:shadow-md">
            <Button
              variant={language === 'en' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setLanguage('en')}
              className={`rounded-none border-0 lang-btn-base text-black dark:text-black ${
                language === 'en'
                  ? 'lang-btn-active-light dark:lang-btn-active-dark'
                  : 'lang-btn-inactive-light dark:lang-btn-inactive-dark'
              }`}
            >
              EN
            </Button>
            <Button
              variant={language === 'tr' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setLanguage('tr')}
              className={`rounded-none border-0 lang-btn-base text-black dark:text-black ${
                language === 'tr'
                  ? 'lang-btn-active-light dark:lang-btn-active-dark'
                  : 'lang-btn-inactive-light dark:lang-btn-inactive-dark'
              }`}
            >
              TR
            </Button>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="p-2.5 rounded-xl gradient-button-light dark:gradient-button-dark text-black dark:text-black border border-border/30 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
            aria-label={t('theme.toggle')}
          >
            {theme === 'light' ? (
              <Sun className="w-[22px] h-[22px]" />
            ) : (
              <Moon className="w-[22px] h-[22px]" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;