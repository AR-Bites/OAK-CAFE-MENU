import { useState } from "react";
import { Globe, Coffee, Utensils, Star, Play } from "lucide-react";
import { FaSmoking } from "react-icons/fa";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // Future: Implement category filtering logic
    console.log('Category selected:', category);
  };

  const categories = [
    { id: 'beverage', label: 'BEVERAGE', icon: Coffee },
    { id: 'food', label: 'FOOD', icon: Utensils },
    { id: 'shisha', label: 'SHISHA', icon: FaSmoking },
    { id: 'unique', label: 'UNIQUE OFFERINGS', icon: Star },
  ];

  const hexagonContent = [
    {
      id: 'desserts',
      position: 'left-16 top-1/2 transform -translate-y-1/2',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
      title: 'Premium Desserts',
      delay: '0s'
    },
    {
      id: 'sweets',
      position: 'right-16 top-1/2 transform -translate-y-1/2',
      image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
      title: 'Traditional Sweets',
      delay: '2s'
    },
    {
      id: 'beverages',
      position: 'top-16 left-1/2 transform -translate-x-1/2',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
      title: 'Premium Beverages',
      delay: '1s'
    },
    {
      id: 'shisha',
      position: 'bottom-32 left-1/2 transform -translate-x-1/2',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
      title: 'Shisha Lounge',
      delay: '3s'
    }
  ];

  return (
    <div className="luxury-bg ornate-pattern w-full h-screen overflow-hidden">
      {/* Geometric Accent Elements */}
      <div className="geometric-accent" style={{ top: '10%', left: '10%', animationDelay: '0s' }}></div>
      <div className="geometric-accent" style={{ top: '15%', right: '15%', animationDelay: '10s' }}></div>
      <div className="geometric-accent" style={{ bottom: '20%', left: '20%', animationDelay: '20s' }}></div>
      <div className="geometric-accent" style={{ bottom: '10%', right: '10%', animationDelay: '15s' }}></div>
      
      {/* Language Toggle */}
      <div className="absolute top-4 left-4 z-20">
        <button className="text-gold-primary hover:text-gold-secondary transition-colors duration-300 flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">EN</span>
        </button>
      </div>
      
      {/* Main Container */}
      <div className="relative w-full h-screen flex items-center justify-center">
        
        {/* Hexagon Containers */}
        {hexagonContent.map((content) => (
          <div 
            key={content.id}
            className={`absolute floating-element ${content.position}`}
            style={{ animationDelay: content.delay }}
          >
            <div className="hexagon">
              <div className="hexagon-inner">
                <div 
                  className="hexagon-content"
                  style={{ backgroundImage: `url(${content.image})` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center mx-auto mb-2">
                        <Play className="w-4 h-4 fill-white" />
                      </div>
                      <p className="text-xs font-medium">{content.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Central Logo */}
        <div className="central-logo w-48 h-48 rounded-full flex items-center justify-center">
          <h1 className="text-2xl luxury-font font-bold text-gray-800 tracking-wide">HyaQqabaz</h1>
        </div>
        
        {/* Category Icons Bottom */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-12">
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
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold-primary rounded-full animate-pulse" style={{ background: 'var(--gold-primary)' }}></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-gold-secondary rounded-full animate-pulse" style={{ background: 'var(--gold-secondary)', animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-gold-primary rounded-full animate-pulse" style={{ background: 'var(--gold-primary)', animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-gold-secondary rounded-full animate-pulse" style={{ background: 'var(--gold-secondary)', animationDelay: '3s' }}></div>
      </div>
    </div>
  );
}
