import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const WeddingDecorations: React.FC = () => {
  const { theme } = useTheme();

  const ButterflyIcon = ({ className }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {theme === 'light' ? (
        // Light theme butterflies - white, pink, blue wings
        <>
          <path
            d="M30 50c-5-15 5-25 15-20 5-10 15-5 15 5 0-10 10-15 15-5 10-5 20 5 15 20-10 5-15 15-15 25-5-10-15-15-25-10-10-5-15-10-20-15z"
            fill="rgba(255, 192, 203, 0.8)"
          />
          <path
            d="M50 35c0-10 10-15 15-5 15-10 25 0 20 15-5 10-15 15-25 15-5-10-10-15-10-25z"
            fill="rgba(173, 216, 230, 0.8)"
          />
          <line x1="50" y1="20" x2="50" y2="80" stroke="rgba(139, 69, 19, 0.6)" strokeWidth="2" />
        </>
      ) : (
        // Dark theme butterflies - gray, black wings
        <>
          <path
            d="M30 50c-5-15 5-25 15-20 5-10 15-5 15 5 0-10 10-15 15-5 10-5 20 5 15 20-10 5-15 15-15 25-5-10-15-15-25-10-10-5-15-10-20-15z"
            fill="rgba(105, 105, 105, 0.8)"
          />
          <path
            d="M50 35c0-10 10-15 15-5 15-10 25 0 20 15-5 10-15 15-25 15-5-10-10-15-10-25z"
            fill="rgba(64, 64, 64, 0.8)"
          />
          <line x1="50" y1="20" x2="50" y2="80" stroke="rgba(139, 128, 116, 0.6)" strokeWidth="2" />
        </>
      )}
    </svg>
  );

  const FlowerIcon = ({ className }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {theme === 'light' ? (
        // Light theme flowers - pink petals
        <>
          <circle cx="50" cy="50" r="8" fill="rgba(255, 182, 193, 1)" />
          <ellipse cx="50" cy="35" rx="8" ry="15" fill="rgba(255, 192, 203, 0.9)" />
          <ellipse cx="65" cy="50" rx="15" ry="8" fill="rgba(255, 192, 203, 0.9)" />
          <ellipse cx="50" cy="65" rx="8" ry="15" fill="rgba(255, 192, 203, 0.9)" />
          <ellipse cx="35" cy="50" rx="15" ry="8" fill="rgba(255, 192, 203, 0.9)" />
        </>
      ) : (
        // Dark theme flowers - muted colors
        <>
          <circle cx="50" cy="50" r="8" fill="rgba(139, 128, 116, 1)" />
          <ellipse cx="50" cy="35" rx="8" ry="15" fill="rgba(160, 160, 160, 0.9)" />
          <ellipse cx="65" cy="50" rx="15" ry="8" fill="rgba(160, 160, 160, 0.9)" />
          <ellipse cx="50" cy="65" rx="8" ry="15" fill="rgba(160, 160, 160, 0.9)" />
          <ellipse cx="35" cy="50" rx="15" ry="8" fill="rgba(160, 160, 160, 0.9)" />
        </>
      )}
    </svg>
  );

  const HeartIcon = ({ className }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 85C25 65 10 45 10 30c0-15 15-25 25-15 5-10 15-10 15 0 0-10 10-10 15 0 10-10 25 0 25 15 0 15-15 35-40 55z"
        fill={theme === 'light' ? "rgba(255, 105, 180, 0.6)" : "rgba(139, 128, 116, 0.6)"}
      />
    </svg>
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Top decorations */}
      <div className="absolute top-10 left-10 floating-decoration">
        <FlowerIcon className="w-12 h-12" />
      </div>
      <div className="absolute top-20 right-20 floating-decoration">
        <ButterflyIcon className="w-16 h-16" />
      </div>
      <div className="absolute top-32 left-1/4 floating-decoration">
        <HeartIcon className="w-8 h-8" />
      </div>

      {/* Middle decorations */}
      <div className="absolute top-1/2 left-8 floating-decoration">
        <FlowerIcon className="w-14 h-14" />
      </div>
      <div className="absolute top-1/2 right-12 floating-decoration">
        <ButterflyIcon className="w-12 h-12" />
      </div>
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 floating-decoration">
        <ButterflyIcon className="w-8 h-8 md:w-12 md:h-12" />
      </div>

      {/* Bottom decorations */}
      <div className="absolute bottom-20 left-16 floating-decoration">
        <ButterflyIcon className="w-10 h-10" />
      </div>
      <div className="absolute bottom-32 right-1/4 floating-decoration">
        <FlowerIcon className="w-10 h-10" />
      </div>
      <div className="absolute bottom-16 right-8 floating-decoration">
        <HeartIcon className="w-12 h-12" />
      </div>

      {/* Additional floating butterflies for smoother movement */}
      <div className="absolute top-1/4 right-1/3 floating-decoration" style={{ animationDelay: '-1s' }}>
        <ButterflyIcon className="w-6 h-6 md:w-10 md:h-10" />
      </div>
      <div className="absolute bottom-1/3 left-1/3 floating-decoration" style={{ animationDelay: '-3s' }}>
        <ButterflyIcon className="w-8 h-8 md:w-14 md:h-14" />
      </div>
      <div className="absolute top-2/3 right-1/4 floating-decoration" style={{ animationDelay: '-5s' }}>
        <ButterflyIcon className="w-7 h-7 md:w-11 md:h-11" />
      </div>

      {/* Extra floating decorations for more charm */}
      <div className="absolute top-16 left-1/3 floating-decoration" style={{ animationDelay: '-2s', animation: 'float-slow 10s ease-in-out infinite' }}>
        <FlowerIcon className="w-6 h-6 md:w-9 md:h-9" />
      </div>
      <div className="absolute top-3/4 left-1/4 floating-decoration" style={{ animationDelay: '-4s', animation: 'float-fast 6s ease-in-out infinite' }}>
        <HeartIcon className="w-6 h-6 md:w-9 md:h-9" />
      </div>
      <div className="absolute bottom-1/4 right-1/3 floating-decoration" style={{ animationDelay: '-6s', animation: 'float-slow 12s ease-in-out infinite' }}>
        <ButterflyIcon className="w-5 h-5 md:w-8 md:h-8" />
      </div>
      <div className="absolute top-1/2 left-1/6 floating-decoration" style={{ animationDelay: '-7s', animation: 'float-fast 7s ease-in-out infinite' }}>
        <FlowerIcon className="w-7 h-7 md:w-10 md:h-10" />
      </div>
      <div className="absolute bottom-1/3 right-1/6 floating-decoration" style={{ animationDelay: '-8s', animation: 'float-slow 9s ease-in-out infinite' }}>
        <HeartIcon className="w-5 h-5 md:w-8 md:h-8" />
      </div>
      <div className="absolute top-1/3 right-1/6 floating-decoration" style={{ animationDelay: '-9s', animation: 'float-fast 8s ease-in-out infinite' }}>
        <ButterflyIcon className="w-6 h-6 md:w-9 md:h-9" />
      </div>
      <div className="absolute bottom-1/2 left-1/3 floating-decoration" style={{ animationDelay: '-10s', animation: 'float-slow 11s ease-in-out infinite' }}>
        <FlowerIcon className="w-5 h-5 md:w-8 md:h-8" />
      </div>
      <div className="absolute top-5/6 left-1/2 floating-decoration" style={{ animationDelay: '-11s', animation: 'float-fast 5s ease-in-out infinite' }}>
        <HeartIcon className="w-7 h-7 md:w-10 md:h-10" />
      </div>
    </div>
  );
};

export default WeddingDecorations;