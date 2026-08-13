import React, { useState, useEffect } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export function ImageWithFallback(props: ImageWithFallbackProps) {
  const { src, alt, style, className, fallbackSrc, ...rest } = props;
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const [didError, setDidError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentSrc(src);
    setDidError(false);
    setIsLoading(true);
  }, [src]);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setDidError(false);
      setIsLoading(true);
    } else {
      setDidError(true);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (!currentSrc || didError) {
    return (
      <div
        className={`relative overflow-hidden w-full h-full bg-[#121212] rounded-lg flex items-center justify-center min-h-[220px] ${className ?? ''}`}
        style={style}
      >
        {fallbackSrc ? (
          <img
            src={fallbackSrc}
            alt={alt || 'Black Lens Photography'}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-slate-500 text-xs text-center p-4">
            <svg className="w-8 h-8 mx-auto mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
              <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1.5" />
              <path d="M21 15l-5-5L5 21" strokeWidth="1.5" />
            </svg>
            <span>Black Lens Studio</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden w-full h-full bg-[#121212] rounded-lg">
      {isLoading && (
        <div className="absolute inset-0 bg-[#1a1a1a] animate-pulse flex items-center justify-center z-10 min-h-[200px]">
          <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt || 'Black Lens Photography'}
        className={`${className ?? ''} transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={style}
        {...rest}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}
