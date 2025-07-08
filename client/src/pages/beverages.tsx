import { useState } from "react";
import { ArrowLeft, Home, Share, Globe, Menu, X } from "lucide-react";
import { Link } from "wouter";
import logoImage from "@assets/oakCafeLogo_1752004813012.png";

const beverageCategories = [
  { id: 'signatures', label: 'SIGNATURES', icon: '🏆' },
  { id: 'non-alcoholic', label: 'NON ALCOHOLIC', icon: '🥤' },
  { id: 'soft-drinks', label: 'SOFT DRINKS', icon: '🥛' },
  { id: 'special-coffees', label: 'SPECIAL COFFEES', icon: '☕' },
  { id: 'ice-chocolate', label: 'ICE CHOCOLATE & COFFEES', icon: '🧊' },
  { id: 'classic-coffee', label: 'CLASSIC COFFEE', icon: '☕' },
  { id: 'teas', label: 'TEAS', icon: '🫖' },
  { id: 'frozen', label: 'FROZEN', icon: '🧊' },
  { id: 'lemonades', label: 'LEMONADES', icon: '🍋' },
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
    <div className="min-h-screen bg-gray-100 relative">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <button className="w-8 h-8 bg-warm-brown rounded-full flex items-center justify-center text-white hover:bg-opacity-80 transition-colors">
              <Home className="w-4 h-4" />
            </button>
          </Link>
          <button className="w-8 h-8 bg-warm-brown rounded-full flex items-center justify-center text-white hover:bg-opacity-80 transition-colors">
            <Share className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 bg-warm-brown rounded-full flex items-center justify-center text-white hover:bg-opacity-80 transition-colors">
            <Globe className="w-4 h-4" />
            <span className="ml-1 text-xs">EN</span>
          </button>
        </div>
        
        <div className="flex items-center">
          <img src={logoImage} alt="HyaQqabaz" className="h-8" />
        </div>
        
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-8 h-8 bg-warm-brown rounded-full flex items-center justify-center text-white hover:bg-opacity-80 transition-colors"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed left-0 top-0 h-full w-64 bg-warm-brown text-white transform transition-transform duration-300 z-20 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-4 border-b border-opacity-20 border-white">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">SIGNATURES</h2>
              <button onClick={() => setSidebarOpen(false)} className="text-white hover:text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <nav className="p-4">
            {beverageCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setSidebarOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center gap-3 transition-colors ${
                  selectedCategory === category.id 
                    ? 'bg-white bg-opacity-20' 
                    : 'hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm font-medium">{category.label}</span>
              </button>
            ))}
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
        <div className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Home className="w-4 h-4" />
            <span>/</span>
            <span className="text-gray-800 font-medium">SIGNATURES</span>
          </div>

          {/* Page Title */}
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">SIGNATURES</h1>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {signatureProducts.map((product) => (
              <div key={product.id} className="product-card bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-square bg-black relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-center bg-warm-brown text-white">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-yellow-300 font-bold">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}