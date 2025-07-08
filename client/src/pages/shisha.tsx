import { useState, useEffect } from "react";
import { ArrowLeft, Home, Globe, Menu, X, Zap, Droplets, Snowflake, Flame, Wind, Crown, Star, Coffee } from "lucide-react";
import { Link, useLocation } from "wouter";
import logoImage from "@assets/oakCafeLogo_1752004813012.png";

const shishaCategories = [
  { id: 'regular', label: 'REGULAR SHISHA', icon: Flame },
  { id: 'premium', label: 'PREMIUM SHISHA', icon: Crown },
  { id: 'special', label: 'SPECIAL SHISHA', icon: Star },
];

const shishaProducts = [
  { id: 301, name: 'Sahem Gum Shisha', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'shisha', category: 'regular' },
  { id: 302, name: 'Lemon with Mint', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'shisha', category: 'regular' },
  { id: 303, name: 'Two Apple Fakher', price: '7.15 JD', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'shisha', category: 'premium' },
  { id: 304, name: 'Special Shisha', price: '17.15 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'shisha', category: 'special' },
  { id: 311, name: 'Mazaya Love', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'shisha', category: 'regular' },
  { id: 312, name: 'Watermelon with Mint', price: '6.16 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'shisha', category: 'regular' },
  { id: 313, name: 'Grapes Shisha', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'shisha', category: 'regular' },
  { id: 314, name: 'Blueberry Shisha', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'shisha', category: 'regular' },
  { id: 315, name: 'Two Apples with Licorice', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'shisha', category: 'regular' },
  { id: 316, name: 'Cinnamon with Mint', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'shisha', category: 'regular' },
  { id: 317, name: 'Mastic Shisha', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'shisha', category: 'regular' },
  { id: 318, name: 'Gum and Mint', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'shisha', category: 'regular' },
  { id: 319, name: 'Two Apples Nakhleh', price: '7.15 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'shisha', category: 'premium' },
  { id: 320, name: 'Mixed Fruit', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'shisha', category: 'regular' },
  { id: 321, name: 'Mixed Citrus Fruits', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'shisha', category: 'regular' },
];

export default function Shisha() {
  const [selectedCategory, setSelectedCategory] = useState('regular');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const categoryParam = urlParams.get('category');
    if (categoryParam && shishaCategories.find(cat => cat.id === categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [location]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setLocation(`/shisha?category=${categoryId}`);
    setSidebarOpen(false);
  };

  const filteredProducts = shishaProducts.filter(product => {
    return product.category === selectedCategory;
  });

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
          <button className="bg-warm-brown text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-opacity-80 transition-colors shadow-md">
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">EN</span>
          </button>
        </div>
        
        <div className="bg-white px-3 py-1 rounded-full shadow-lg">
          <img src={logoImage} alt="HyaQqabaz" className="h-16 w-auto object-contain filter brightness-100 contrast-125" />
        </div>
        
        <div className="w-20"></div>
      </div>

      {/* Secondary Navigation */}
      <div className="bg-gray-200 px-6 pb-4 flex items-center justify-between">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-warm-brown text-white px-6 py-3 rounded-full flex items-center gap-3 hover:bg-opacity-80 transition-colors shadow-md"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          <span className="text-base font-medium">Menu</span>
        </button>
        
        <Link href="/">
          <button className="w-12 h-12 bg-warm-brown rounded-full flex items-center justify-center text-white hover:bg-opacity-80 transition-colors shadow-md">
            <ArrowLeft className="w-6 h-6" />
          </button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed left-0 top-0 h-full w-72 bg-warm-brown text-white transform transition-transform duration-300 z-20 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 border-b border-opacity-20 border-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold luxury-font">SHISHA MENU</h2>
              <button onClick={() => setSidebarOpen(false)} className="text-white hover:text-gray-300">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <nav className="p-6">
            {shishaCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors ${
                    selectedCategory === category.id 
                      ? 'bg-white bg-opacity-20' 
                      : 'hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-sm font-medium">{category.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Content Area */}
        <div className="flex-1 px-8 py-8">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-12 luxury-font">{shishaCategories.find(cat => cat.id === selectedCategory)?.label || 'REGULAR SHISHA'}</h1>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/shisha-product/${product.id}`}>
                <div className="product-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-black relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 text-center bg-warm-brown text-white">
                    <h3 className="font-bold text-sm mb-1 luxury-font truncate">{product.name}</h3>
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