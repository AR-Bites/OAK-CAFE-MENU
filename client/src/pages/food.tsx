import { useState, useEffect } from "react";
import { ArrowLeft, Home, Share, Globe, Menu, X, Coffee, Utensils, Salad, Sandwich, Apple, PizzaIcon as Pizza, Star, Droplets, IceCream, Leaf } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import logoImage from "@assets/oakCafeLogo_1752004813012.png";

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

// Import the complete authentic menu from product-detail.tsx
import { allProducts } from './product-detail';

// Filter the complete menu to get only food items by category
const getFoodProductsByCategory = (category: string) => {
  return allProducts.filter(product => product.type === 'food' && product.category === category);
};

const foodProducts = {
  'breakfast': getFoodProductsByCategory('breakfast'),
  'pizza': getFoodProductsByCategory('pizza'),
  'main-course': getFoodProductsByCategory('main-course'),
  'appetizers': getFoodProductsByCategory('appetizers'),
  'desserts': getFoodProductsByCategory('desserts'),
  'sandwiches': getFoodProductsByCategory('sandwiches'),
  'pasta': getFoodProductsByCategory('pasta'),
  'salads': getFoodProductsByCategory('salads'),
  'soup': getFoodProductsByCategory('soup'),
};

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

  const currentProducts = foodProducts[selectedCategory as keyof typeof foodProducts] || foodProducts['breakfast'];

  return (
    <div className="min-h-screen bg-gray-200 relative overflow-auto">

      
      {/* Top Navigation */}
      <div className="bg-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <button className="w-10 h-10 bg-warm-brown rounded-full flex items-center justify-center text-white hover:bg-opacity-80 transition-colors shadow-md">
              <Home className="w-5 h-5" />
            </button>
          </Link>

        </div>
        
        <div className="bg-white px-3 py-1 rounded-full shadow-lg">
          <img src={logoImage} alt="HyaQqabaz" className="h-16 w-auto object-contain filter brightness-100 contrast-125" />
        </div>
        
        <button 
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          className="text-gold-primary hover:text-gold-secondary transition-colors duration-300 flex items-center gap-2"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">{language === 'en' ? 'AR' : 'EN'}</span>
        </button>
      </div>

      {/* Secondary Navigation */}
      <div className="bg-gray-200 px-6 pb-4 flex items-center justify-between">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-warm-brown text-white px-6 py-3 rounded-full flex items-center gap-3 hover:bg-opacity-80 transition-colors shadow-md"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          <span className="text-base font-medium">{t('menu')}</span>
        </button>
        
        <Link href="/">
          <button className="w-12 h-12 bg-warm-brown rounded-full flex items-center justify-center text-white hover:bg-opacity-80 transition-colors shadow-md">
            <ArrowLeft className="w-6 h-6" />
          </button>
        </Link>
      </div>

      {/* Breadcrumb */}
      <div className="px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-300 px-4 py-2 rounded-lg w-fit">
          <Home className="w-4 h-4" />
          <span>/</span>
          <span className="text-gray-800 font-bold text-lg">
            {selectedCategory ? t(`category-${selectedCategory}`) : t('food-menu')}
          </span>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed left-0 top-0 h-full bg-warm-brown text-white z-50 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64`}>
          <div className="p-6 pt-20">
            <h2 className="text-xl font-bold mb-6 luxury-font">{t('food-menu')}</h2>
            <nav className="space-y-4">
              {foodCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-yellow-600 text-white'
                        : 'hover:bg-yellow-600 hover:bg-opacity-20'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-sm font-medium">{t(category.id)}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 px-8 py-8">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-12 luxury-font">{foodCategories.find(cat => cat.id === selectedCategory)?.label || 'BREAKFAST'}</h1>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
            {currentProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="product-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-black relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 text-center bg-warm-brown text-white">
                    <h3 className="font-bold text-sm mb-1 luxury-font truncate">{t(product.nameKey) || product.name}</h3>
                    <p className="text-yellow-300 font-bold text-sm">{product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}