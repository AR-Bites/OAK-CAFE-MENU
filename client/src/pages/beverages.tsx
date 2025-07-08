import { useState, useEffect } from "react";
import { ArrowLeft, Home, Share, Globe, Menu, X, Coffee, Droplets, Snowflake, Zap, IceCream, Leaf, Citrus } from "lucide-react";
import { Link, useLocation, useRoute } from "wouter";
import logoImage from "@assets/oakCafeLogo_1752004813012.png";

const beverageCategories = [
  { id: 'hot-drinks', label: 'HOT DRINKS', icon: Coffee },
  { id: 'cold-coffee', label: 'COLD COFFEE', icon: IceCream },
  { id: 'fresh-juice', label: 'FRESH JUICE', icon: Citrus },
  { id: 'soft-drinks', label: 'SOFT DRINKS', icon: Droplets },
  { id: 'frappe', label: 'FRAPPE', icon: Snowflake },
  { id: 'milkshake', label: 'MILK SHAKE', icon: IceCream },
  { id: 'smoothies', label: 'SMOOTHIES', icon: Leaf },
  { id: 'mojito', label: 'MOJITO', icon: Zap },
  { id: 'iced-tea', label: 'ICED TEA', icon: Leaf },
];

const beverageProducts = {
  'hot-drinks': [
    { id: 101, name: 'Red Eye', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 102, name: 'V60 / CHEMEX', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 103, name: 'Flat White', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 104, name: 'Espresso Macchiato', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 105, name: 'Marshmallow Chocolate', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 106, name: 'Turkish Coffee Single', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 111, name: 'Double Espresso', price: '2.75 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 112, name: 'Cappuccino', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 113, name: 'Cortado', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 114, name: 'Latte', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 115, name: 'Americano', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 116, name: 'Turkish Coffee Double', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
  ],
  'cold-coffee': [
    { id: 107, name: 'Iced Caramel Macchiato', price: '3.95 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'cold-coffee' },
    { id: 108, name: 'Cold Brew', price: '5.25 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'cold-coffee' },
    { id: 117, name: 'Iced Dark Mocha', price: '3.85 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'cold-coffee' },
    { id: 118, name: 'Iced Americano', price: '3.15 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'cold-coffee' },
  ],
  'fresh-juice': [
    { id: 109, name: 'The Oak Seasonal Fresh Juice', price: '4.90 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'fresh-juice' },
    { id: 110, name: 'Pomegranate', price: '4.90 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'fresh-juice' },
    { id: 119, name: 'Mango Mint', price: '4.90 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'fresh-juice' },
    { id: 120, name: 'Orange Juice', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'fresh-juice' },
  ],
  'soft-drinks': [
    { id: 21, name: 'Coca Cola', price: '2.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'soft-drinks' },
    { id: 22, name: 'Sprite', price: '2.00 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'soft-drinks' },
    { id: 23, name: 'Red Bull', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'soft-drinks' },
    { id: 24, name: 'Perrier', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'soft-drinks' },
  ],
  'frappe': [
    { id: 121, name: 'Vanilla Frappe', price: '4.25 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'frappe' },
    { id: 122, name: 'Chocolate Frappe', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'frappe' },
    { id: 123, name: 'Caramel Frappe', price: '4.75 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'frappe' },
  ],
  'milkshake': [
    { id: 124, name: 'Strawberry Milkshake', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'milkshake' },
    { id: 125, name: 'Chocolate Milkshake', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'milkshake' },
    { id: 126, name: 'Vanilla Milkshake', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'milkshake' },
  ],
  'smoothies': [
    { id: 127, name: 'Berry Smoothie', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'smoothies' },
    { id: 128, name: 'Tropical Smoothie', price: '4.75 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'smoothies' },
    { id: 129, name: 'Green Smoothie', price: '5.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'smoothies' },
  ],
  'mojito': [
    { id: 130, name: 'Classic Mojito', price: '5.50 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'mojito' },
    { id: 131, name: 'Berry Mojito', price: '5.75 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'mojito' },
    { id: 132, name: 'Passion Fruit Mojito', price: '6.00 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'mojito' },
  ],
  'iced-tea': [
    { id: 133, name: 'Classic Iced Tea', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'iced-tea' },
    { id: 134, name: 'Lemon Iced Tea', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'iced-tea' },
    { id: 135, name: 'Peach Iced Tea', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'iced-tea' },
  ]
};

export default function Beverages() {
  const [selectedCategory, setSelectedCategory] = useState('hot-drinks');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const categoryParam = urlParams.get('category');
    console.log('URL category param:', categoryParam);
    console.log('Available beverage categories:', beverageCategories.map(cat => cat.id));
    console.log('Available product keys:', Object.keys(beverageProducts));
    if (categoryParam && beverageCategories.find(cat => cat.id === categoryParam)) {
      console.log('Setting category to:', categoryParam);
      setSelectedCategory(categoryParam);
    }
  }, [location]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setLocation(`/beverages?category=${categoryId}`);
    setSidebarOpen(false);
  };

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
              <h2 className="text-xl font-bold luxury-font">DRINKS MENU</h2>
              <button onClick={() => setSidebarOpen(false)} className="text-white hover:text-gray-300">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <nav className="p-6">
            {beverageCategories.map((category) => {
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
        <div className="flex-1 p-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6 bg-white px-4 py-2 rounded-lg shadow-sm w-fit">
            <Home className="w-4 h-4" />
            <span>/</span>
            <span className="text-gray-800 font-medium">SIGNATURES</span>
          </div>

          {/* Page Title */}
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-12 luxury-font">{beverageCategories.find(cat => cat.id === selectedCategory)?.label || 'HOT DRINKS'}</h1>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
            {(beverageProducts[selectedCategory as keyof typeof beverageProducts] || beverageProducts['hot-drinks']).map((product) => (
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