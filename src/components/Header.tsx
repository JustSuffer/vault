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
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            {t('wedding.album')}
          </h1>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className="flex rounded-lg border border-border overflow-hidden">
            <Button
              variant={language === 'en' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setLanguage('en')}
              className="rounded-none border-0"
            >
              EN
            </Button>
            <Button
              variant={language === 'tr' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setLanguage('tr')}
              className="rounded-none border-0"
            >
              TR
            </Button>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="p-2"
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