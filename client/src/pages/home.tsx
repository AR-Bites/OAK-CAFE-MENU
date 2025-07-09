import { useState, useEffect } from "react";
import { Globe, Coffee, Utensils, Star } from "lucide-react";
import { FaSmoking } from "react-icons/fa";
import { useLocation } from "wouter";
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import logoImage from "@assets/oakCafeLogo_1752004813012.png";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [, setLocation] = useLocation();
  const { t, language, setLanguage } = useLanguage();
  
  useEffect(() => {
    // Prevent scrolling on home page
    document.body.classList.add('no-scroll');
    
    return () => {
      // Remove no-scroll when leaving home page
      document.body.classList.remove('no-scroll');
    };
  }, []);
  
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category === 'beverage') {
      setLocation('/beverages');
    } else if (category === 'food') {
      setLocation('/food');
    } else if (category === 'shisha') {
      setLocation('/shisha');
    } else {
      // Future: Implement other category pages
      console.log('Category selected:', category);
    }
  };

  const categories = [
    { id: 'beverage', label: t('beverages'), icon: Coffee },
    { id: 'food', label: t('food'), icon: Utensils },
    { id: 'shisha', label: t('shisha'), icon: FaSmoking },
  ];

  return (
    <div className="luxury-bg ornate-pattern w-full h-screen overflow-hidden relative" style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Language Toggle */}
      <div className="absolute top-4 left-4 z-20">
        <button 
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          className="text-gold-primary hover:text-gold-secondary transition-colors duration-300 flex items-center gap-2"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">{language === 'en' ? 'AR' : 'EN'}</span>
        </button>
      </div>
      
      {/* Main Container */}
      <div className="relative w-full h-screen flex items-center justify-center -mt-20">
        
        {/* Left Hexagon Container */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -ml-40 mt-16 z-10">
          <div className="hexagon-container">
            <div className="hexagon-shape">
              <video 
                className="hexagon-video"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              >
                <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
                {/* Fallback image if video fails */}
                <img 
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                  alt="Dessert"
                  className="hexagon-video"
                />
              </video>
              <div className="hexagon-overlay"></div>
            </div>
          </div>
        </div>
        
        {/* Right Hexagon Container */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ml-40 -mt-16 z-10">
          <div className="hexagon-container">
            <div className="hexagon-shape">
              <video 
                className="hexagon-video"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              >
                <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4" type="video/mp4" />
                {/* Fallback image if video fails */}
                <img 
                  src="https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                  alt="Sweets"
                  className="hexagon-video"
                />
              </video>
              <div className="hexagon-overlay"></div>
            </div>
          </div>
        </div>
        
        {/* Central Logo */}
        <div className="central-logo w-32 h-32 rounded-full flex items-center justify-center z-20">
          <img 
            src={logoImage} 
            alt="The Oak Cafe" 
            className="w-28 h-28 object-contain"
          />
        </div>
        
        {/* Category Icons Bottom - Much Bigger for Mobile */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 sm:gap-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={category.id}
                className="category-icon cursor-pointer touch-manipulation"
                onClick={() => handleCategorySelect(category.id)}
              >
                <div className="icon-bg w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-warm-brown flex items-center justify-center mb-3 transition-transform duration-150 hover:scale-110 active:scale-95 shadow-2xl will-change-transform" style={{ transform: 'translateZ(0)' }}>
                  <IconComponent className="text-white w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                </div>
                <span className="text-white text-base sm:text-lg md:text-xl font-bold block text-center bg-black bg-opacity-60 px-4 py-2 rounded-full shadow-lg">{category.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
