import { useState } from "react";
import { Globe, Coffee, Utensils, Star } from "lucide-react";
import { FaSmoking } from "react-icons/fa";
import { useLocation } from "wouter";
import logoImage from "@assets/oakCafeLogo_1752004813012.png";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [, setLocation] = useLocation();
  
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category === 'beverage') {
      setLocation('/beverages');
    } else {
      // Future: Implement other category pages
      console.log('Category selected:', category);
    }
  };

  const categories = [
    { id: 'beverage', label: 'BEVERAGE', icon: Coffee },
    { id: 'food', label: 'FOOD', icon: Utensils },
    { id: 'shisha', label: 'SHISHA', icon: FaSmoking },
    { id: 'unique', label: 'UNIQUE OFFERINGS', icon: Star },
  ];

  return (
    <div className="luxury-bg ornate-pattern w-full h-screen overflow-hidden relative">
      {/* Language Toggle */}
      <div className="absolute top-4 left-4 z-20">
        <button className="text-gold-primary hover:text-gold-secondary transition-colors duration-300 flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">EN</span>
        </button>
      </div>
      
      {/* Main Container */}
      <div className="relative w-full h-screen flex items-center justify-center">
        
        {/* Left Hexagon Container */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10">
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
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10">
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
        
        {/* Category Icons Bottom */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={category.id}
                className="category-icon cursor-pointer"
                onClick={() => handleCategorySelect(category.id)}
              >
                <div className="icon-bg w-16 h-16 rounded-full bg-warm-brown flex items-center justify-center mb-2 transition-all duration-300">
                  <IconComponent className="text-white text-xl w-6 h-6" />
                </div>
                <p className="gold-primary text-sm font-medium text-center">{category.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
