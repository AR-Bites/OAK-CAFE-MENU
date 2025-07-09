import { useState, useEffect } from "react";
import { ArrowLeft, Home, Share, Globe, Menu, X, Coffee, Utensils, Salad, Sandwich, Apple, PizzaIcon as Pizza, Star, Droplets, IceCream, Leaf } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import logoImage from "@assets/oakCafeLogo_1752004813012.png";
import { allProducts } from '../data/fullMenu';

const getFoodCategories = (t: (key: string) => string) => [
  { id: 'breakfast', label: t('breakfast'), icon: Coffee },
  { id: 'pizza', label: t('pizza'), icon: Pizza },
  { id: 'sandwiches', label: t('sandwiches'), icon: Sandwich },
  { id: 'italian', label: t('italian'), icon: Star },
  { id: 'main-course', label: t('main-course'), icon: Utensils },
  { id: 'appetizers', label: t('appetizers'), icon: Apple },
  { id: 'salads', label: t('salads'), icon: Salad },
  { id: 'soup', label: t('soup'), icon: Droplets },
  { id: 'desserts', label: t('desserts'), icon: IceCream },
];

// Group food products by category
const getFoodProductsByCategory = () => {
  const foodItems = allProducts.filter(product => product.type === 'food');
  const categories: { [key: string]: any[] } = {};
  
  foodItems.forEach(item => {
    if (!categories[item.category]) {
      categories[item.category] = [];
    }
    categories[item.category].push(item);
  });
  
  return categories;
};

const foodProducts = getFoodProductsByCategory();

export default function Food() {
  const [selectedCategory, setSelectedCategory] = useState('breakfast');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { t, language, setLanguage } = useLanguage();

  const foodCategories = getFoodCategories(t);

  useEffect(() => {
    // Use window location search for URL parameters  
    const searchParams = window.location.search;
    const urlParams = new URLSearchParams(searchParams);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam && foodCategories.find(cat => cat.id === categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [location]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setLocation(`/food?category=${categoryId}`);
    setSidebarOpen(false);
  };

  const currentProducts = foodProducts[selectedCategory] || [];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-auto">
      {/* Top Navigation */}
      <div className="bg-black px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <button className="w-10 h-10 bg-warm-brown rounded-full flex items-center justify-center text-white hover:bg-opacity-80 transition-colors shadow-md">
              <Home className="w-5 h-5" />
            </button>
          </Link>
          <LanguageToggle />
        </div>
        
        <div className="bg-white px-3 py-1 rounded-full shadow-lg">
          <img src={logoImage} alt="The Oak Cafe" className="h-16 w-auto object-contain filter brightness-100 contrast-125" />
        </div>
        
        <div className="w-20"></div>
      </div>

      {/* Secondary Navigation */}
      <div className="bg-black px-6 pb-4 flex items-center justify-between">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-warm-brown text-white px-6 py-3 rounded-full flex items-center gap-3 hover:bg-opacity-80 transition-colors shadow-md"
        >
          <Menu className="w-5 h-5" />
          <span className="text-sm font-medium">{t('menu')}</span>
        </button>
        
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {t('food-menu')}
          </h1>
          
          <button className="bg-warm-brown text-white px-6 py-3 rounded-full flex items-center gap-3 hover:bg-opacity-80 transition-colors shadow-md">
            <Share className="w-5 h-5" />
            <span className="text-sm font-medium">{t('share')}</span>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="bg-warm-brown w-80 h-full shadow-xl flex flex-col">
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between text-white">
                <h2 className="text-xl font-bold">{t('categories')}</h2>
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 p-6 space-y-3 overflow-y-auto">
              <Link href="/beverages" className="block">
                <div className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-colors">
                  <div className="flex items-center gap-3 text-white">
                    <Coffee className="w-6 h-6" />
                    <span className="font-medium">{t('beverages')}</span>
                  </div>
                </div>
              </Link>
              
              <Link href="/food" className="block">
                <div className="bg-white/20 p-4 rounded-lg border-2 border-white/30">
                  <div className="flex items-center gap-3 text-white">
                    <Star className="w-6 h-6" />
                    <span className="font-medium">{t('food')}</span>
                  </div>
                </div>
              </Link>
              
              <Link href="/shisha" className="block">
                <div className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-colors">
                  <div className="flex items-center gap-3 text-white">
                    <Droplets className="w-6 h-6" />
                    <span className="font-medium">{t('shisha')}</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          
          <div 
            className="flex-1 bg-black/20"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Category Navigation */}
      <div className="px-6 py-4">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {foodCategories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-warm-brown text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 hover:scale-102 shadow-md'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-6 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group hover:scale-105">
                <div className="aspect-square bg-gray-800 overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-white text-lg mb-3 line-clamp-2 group-hover:text-golden transition-colors" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {product.nameKey ? t(product.nameKey) : product.name}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {product.descriptionKey ? t(product.descriptionKey) : product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-golden font-bold text-xl">
                      {product.price}
                    </div>
                    
                    <div className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
                      {t(product.category)}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {currentProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">{t('no-products-found')}</div>
            <div className="text-gray-500 text-sm">{t('try-different-category')}</div>
          </div>
        )}
      </div>
    </div>
  );
}