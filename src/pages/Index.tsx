import React from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import PhotoUpload from '@/components/PhotoUpload';
import WeddingDecorations from '@/components/WeddingDecorations';
import { useLanguage } from '@/contexts/LanguageContext';

const WeddingUploadContent: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen soft-gradient relative">
      <WeddingDecorations />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8 md:py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
              {t('upload.title')}
            </h2>
          </div>
          
          <PhotoUpload />
        </main>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <WeddingUploadContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Index;
