'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Icons
const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const ZoomInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    <line x1="11" y1="8" x2="11" y2="14"></line>
    <line x1="8" y1="11" x2="14" y2="11"></line>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  designer: string;
  condition: string;
  isSoldOut?: boolean;
  className?: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
  designer,
  condition,
  isSoldOut = false,
  className,
}) => {
  // Default to placeholder if no images
  const displayImages = images.length > 0 
    ? images 
    : ['/images/product-placeholder.jpg'];
  
  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Refs for DOM elements
  const mainImageRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  // Navigate to prev/next image
  const navigateTo = (index: number) => {
    const newIndex = (index + displayImages.length) % displayImages.length;
    setActiveIndex(newIndex);
    
    // Scroll the thumbnail into view
    if (thumbnailsRef.current) {
      const thumbnail = thumbnailsRef.current.children[newIndex] as HTMLElement;
      if (thumbnail) {
        thumbnail.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };

  const goToNext = () => navigateTo(activeIndex + 1);
  const goToPrevious = () => navigateTo(activeIndex - 1);

  // Handle key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent<HTMLElement> | any) => {
      if (lightboxOpen) {
        if (e.key === 'ArrowLeft') {
          navigateInLightbox(lightboxIndex - 1);
        } else if (e.key === 'ArrowRight') {
          navigateInLightbox(lightboxIndex + 1);
        } else if (e.key === 'Escape') {
          closeLightbox();
        }
      } else {
        if (e.key === 'ArrowLeft') {
          goToPrevious();
        } else if (e.key === 'ArrowRight') {
          goToNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, lightboxOpen, lightboxIndex]);

  // Touch swipe handling
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (lightboxOpen) {
      if (isLeftSwipe) {
        navigateInLightbox(lightboxIndex + 1);
      } else if (isRightSwipe) {
        navigateInLightbox(lightboxIndex - 1);
      }
    } else {
      if (isLeftSwipe) {
        goToNext();
      } else if (isRightSwipe) {
        goToPrevious();
      }
    }
  };

  // Lightbox controls
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = ''; // Restore scrolling
  };

  const navigateInLightbox = (index: number) => {
    const newIndex = (index + displayImages.length) % displayImages.length;
    setLightboxIndex(newIndex);
  };

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Main image container */}
      <div 
        ref={mainImageRef}
        className="relative aspect-square bg-gray-100 overflow-hidden rounded-lg mb-4"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Main image */}
        <div 
          className="relative w-full h-full cursor-zoom-in"
          onClick={() => openLightbox(activeIndex)}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={displayImages[activeIndex]}
                alt={`${designer} - ${productName}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                quality={90}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Navigation buttons */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-black"
              aria-label="Previous image"
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-black"
              aria-label="Next image"
            >
              <ChevronRightIcon />
            </button>
          </>
        )}
        
        {/* Zoom button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            openLightbox(activeIndex);
          }}
          className="absolute right-3 bottom-3 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-black"
          aria-label="Zoom image"
        >
          <ZoomInIcon />
        </button>
        
        {/* Sold out overlay */}
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none">
            <span className="transform rotate-10 bg-black/80 px-6 py-2 text-xl font-semibold uppercase tracking-wider text-white">
              Sold
            </span>
          </div>
        )}
        
        {/* Condition tag */}
        <div className="absolute left-3 top-3 z-10">
          <span className="rounded bg-white/90 px-2 py-1 text-xs font-medium text-gray-900 shadow-sm">
            {condition}
          </span>
        </div>
      </div>
      
      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div ref={thumbnailsRef} className="flex overflow-x-auto space-x-2 pb-2">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => navigateTo(index)}
              className={cn(
                "relative flex-shrink-0 w-20 h-20 border-2 rounded overflow-hidden focus:outline-none",
                activeIndex === index ? "border-black" : "border-transparent hover:border-gray-300"
              )}
              aria-label={`View image ${index + 1} of ${displayImages.length}`}
              aria-current={activeIndex === index ? "true" : "false"}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
      
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
            onClick={closeLightbox}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 text-white hover:text-gray-200 focus:outline-none"
              aria-label="Close lightbox"
            >
              <CloseIcon />
            </button>

            {/* Image container */}
            <div
              className="relative w-full h-full max-w-4xl max-h-screen flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={`lightbox-${lightboxIndex}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full flex items-center justify-center p-4 sm:p-10"
              >
                <div className="relative w-full max-w-full max-h-full">
                  <Image
                    src={displayImages[lightboxIndex]}
                    alt={`${designer} - ${productName} - Image ${lightboxIndex + 1}`}
                    width={1200}
                    height={1200}
                    quality={95}
                    className="object-contain w-auto h-auto max-h-[80vh] mx-auto"
                  />
                </div>
              </motion.div>
              
              {/* Navigation buttons */}
              {displayImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateInLightbox(lightboxIndex - 1);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 focus:outline-none"
                    aria-label="Previous image"
                  >
                    <ChevronLeftIcon />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateInLightbox(lightboxIndex + 1);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 focus:outline-none"
                    aria-label="Next image"
                  >
                    <ChevronRightIcon />
                  </button>
                </>
              )}
              
              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 rounded-full px-4 py-1 text-white text-sm">
                {lightboxIndex + 1} / {displayImages.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};