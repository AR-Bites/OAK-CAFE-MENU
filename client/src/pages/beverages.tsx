import { useState, useEffect } from "react";
import { ArrowLeft, Home, Share, Globe, Menu, X, Coffee, Droplets, Snowflake, Zap, IceCream, Leaf, Citrus } from "lucide-react";
import { Link, useLocation, useRoute } from "wouter";
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import logoImage from "@assets/oakCafeLogo_1752004813012.png";
import { allProducts } from './product-detail';

const getBeverageCategories = (t: (key: string) => string) => [
  { id: 'hot-drinks', label: t('hot-drinks'), icon: Coffee },
  { id: 'cold-coffee', label: t('cold-coffee'), icon: IceCream },
  { id: 'frappe', label: t('frappe'), icon: Snowflake },
  { id: 'milkshake', label: t('milkshake'), icon: IceCream },
  { id: 'smoothies', label: t('smoothies'), icon: Leaf },
  { id: 'fresh-juice', label: t('fresh-juice'), icon: Citrus },
  { id: 'mojito', label: t('mojito'), icon: Zap },
  { id: 'iced-tea', label: t('iced-tea'), icon: Leaf },
  { id: 'non-coffee', label: t('non-coffee'), icon: Coffee },
  { id: 'soft-drinks', label: t('soft-drinks'), icon: Droplets },
];

// Filter the complete menu to get only beverage items by category
const getBeverageProductsByCategory = (category: string) => {
  return allProducts.filter(product => product.type === 'beverage' && product.category === category);
};

const beverageProducts = {
  'hot-drinks': getBeverageProductsByCategory('hot-drinks'),
  'cold-coffee': getBeverageProductsByCategory('cold-coffee'),
  'frappe': getBeverageProductsByCategory('frappe'),
  'milkshake': getBeverageProductsByCategory('milkshake'),
  'smoothies': getBeverageProductsByCategory('smoothies'),
  'fresh-juice': getBeverageProductsByCategory('fresh-juice'),
  'mojito': getBeverageProductsByCategory('mojito'),
  'iced-tea': getBeverageProductsByCategory('iced-tea'),
  'non-coffee': getBeverageProductsByCategory('non-coffee'),
  'soft-drinks': getBeverageProductsByCategory('soft-drinks'),
};

export default function Beverages() {
  const [selectedCategory, setSelectedCategory] = useState('hot-drinks');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { t, language, setLanguage } = useLanguage();

  const beverageCategories = getBeverageCategories(t);

  useEffect(() => {
    // Use window location search for URL parameters
    const searchParams = window.location.search;
    const urlParams = new URLSearchParams(searchParams);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam && beverageCategories.find(cat => cat.id === categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [location]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setLocation(`/beverages?category=${categoryId}`);
    setSidebarOpen(false);
  };

  const currentProducts = beverageProducts[selectedCategory as keyof typeof beverageProducts] || beverageProducts['hot-drinks'];

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
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-gold-primary transition-colors">
            {t('home')}
          </Link>
          <span>{'>'}</span>
          <span className="text-gold-primary">{t('beverages')}</span>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">{t('beverage-categories')}</h2>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-4 space-y-2">
          {beverageCategories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                  selectedCategory === category.id 
                    ? 'bg-warm-brown text-white' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{category.label}</span>
              </button>
            );
          })}
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
      <div className="px-8 pb-8">
        {/* Category Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {beverageCategories.find(cat => cat.id === selectedCategory)?.label || t('beverages')}
          </h1>
          <p className="text-gray-600">{t('explore-beverages')}</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <Link 
              key={product.id} 
              href={`/product/${product.id}`}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
            >
              <div className="aspect-[4/3] bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.nameKey ? t(product.nameKey) : product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.nameKey ? t(product.nameKey) : product.name}
                </h3>
                
                {product.descriptionKey && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {t(product.descriptionKey)}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gold-primary">
                    {product.price}
                  </span>
                  
                  <button className="bg-warm-brown text-white px-4 py-2 rounded-full text-sm hover:bg-opacity-80 transition-colors">
                    {t('view-details')}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {currentProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Coffee className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {t('no-beverages-found')}
            </h3>
            <p className="text-gray-500">
              {t('no-beverages-description')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}