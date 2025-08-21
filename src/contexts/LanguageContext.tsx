import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'tr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'wedding.album': 'Wedding Album',
    'upload.title': 'Please upload your wedding photos',
    'upload.dragdrop': 'Drag and drop a file here',
    'upload.or': 'or',
    'upload.choose': 'Choose File',
    'upload.uploading': 'Uploading...',
    'upload.success': 'Photos uploaded successfully!',
    'upload.error': 'Failed to upload photos. Please try again.',
    'upload.preview': 'Preview',
    'upload.remove': 'Remove',
    'upload.submit': 'Upload Photos',
    'language.switch': 'Switch Language'
  },
  tr: {
    'wedding.album': 'Düğün Albümü',
    'upload.title': 'Lütfen düğün fotoğraflarınızı yükleyin',
    'upload.dragdrop': 'Dosyayı buraya sürükleyip bırakın',
    'upload.or': 'veya',
    'upload.choose': 'Dosya Seç',
    'upload.uploading': 'Yükleniyor...',
    'upload.success': 'Fotoğraflar başarıyla yüklendi!',
    'upload.error': 'Fotoğraflar yüklenemedi. Lütfen tekrar deneyin.',
    'upload.preview': 'Önizleme',
    'upload.remove': 'Kaldır',
    'upload.submit': 'Fotoğrafları Yükle',
    'language.switch': 'Dil Değiştir'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};