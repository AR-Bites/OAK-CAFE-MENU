import { useState } from "react";
import { ArrowLeft, Home, Share, Globe, Menu, X, Coffee, Droplets, Snowflake, Zap, IceCream, Leaf, Citrus } from "lucide-react";
import { Link } from "wouter";
import logoImage from "@assets/oakCafeLogo_1752004813012.png";

const beverageCategories = [
  { id: 'signatures', label: 'SIGNATURES', icon: Zap },
  { id: 'non-alcoholic', label: 'NON ALCOHOLIC', icon: Droplets },
  { id: 'soft-drinks', label: 'SOFT DRINKS', icon: Droplets },
  { id: 'special-coffees', label: 'SPECIAL COFFEES', icon: Coffee },
  { id: 'ice-chocolate', label: 'ICE CHOCOLATE & COFFEES', icon: IceCream },
  { id: 'classic-coffee', label: 'CLASSIC COFFEE', icon: Coffee },
  { id: 'teas', label: 'TEAS', icon: Leaf },
  { id: 'frozen', label: 'FROZEN', icon: Snowflake },
  { id: 'lemonades', label: 'LEMONADES', icon: Citrus },
];

const signatureProducts = [
  { id: 1, name: 'Slap', price: '7.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300' },
  { id: 2, name: 'Rocket', price: '16.00 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300' },
  { id: 3, name: 'Jaws', price: '7.00 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300' },
  { id: 4, name: 'Madame Q', price: '8.00 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300' },
  { id: 5, name: 'Maqaw', price: '9.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300' },
  { id: 6, name: 'Nocturne', price: '8.00 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300' },
  { id: 7, name: 'Stiletto', price: '8.00 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300' },
  { id: 8, name: 'X', price: '9.00 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300' },
];

export default function Beverages() {
  const [selectedCategory, setSelectedCategory] = useState('signatures');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-200 relative overflow-auto">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/">
            <button className="w-8 h-8 bg-warm-brown rounded-full flex items-center justify-center text-white hover:bg-opacity-80 transition-colors">
              <Home className="w-4 h-4" />
            </button>
          </Link>
          <button className="w-8 h-8 bg-warm-brown rounded-full flex items-center justify-center text-white hover:bg-opacity-80 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 bg-warm-brown rounded-full flex items-center justify-center text-white hover:bg-opacity-80 transition-colors">
            <Globe className="w-4 h-4" />
            <span className="ml-1 text-xs">EN</span>
          </button>
        </div>
        
        <div className="flex items-center bg-white px-4 py-1 rounded-full shadow-sm">
          <img src={logoImage} alt="HyaQqabaz" className="h-8 w-auto object-contain" />
        </div>
        
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-warm-brown text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-opacity-80 transition-colors"
        >
          {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span className="text-sm font-medium">Menu</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed left-0 top-0 h-full w-72 bg-warm-brown text-white transform transition-transform duration-300 z-20 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 border-b border-opacity-20 border-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold luxury-font">SIGNATURES</h2>
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
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSidebarOpen(false);
                  }}
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
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-12 luxury-font">SIGNATURES</h1>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {signatureProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="product-card bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer">
                  <div className="aspect-square bg-black relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 text-center bg-warm-brown text-white">
                    <h3 className="font-bold text-lg mb-2 luxury-font">{product.name}</h3>
                    <p className="text-yellow-300 font-bold text-lg">{product.price}</p>
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