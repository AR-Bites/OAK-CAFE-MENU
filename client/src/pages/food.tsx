import { useState } from "react";
import { ArrowLeft, Home, Share, Globe, Menu, X, Coffee, Utensils, Salad, Sandwich, Apple, PizzaIcon as Pizza } from "lucide-react";
import { Link } from "wouter";
import logoImage from "@assets/oakCafeLogo_1752004813012.png";

const foodCategories = [
  { id: 'breakfast', label: 'BREAKFAST', icon: Coffee },
  { id: 'turkish-breakfast', label: 'TURKISH BREAKFAST', icon: Utensils },
  { id: 'signature-breakfast', label: 'SIGNATURE BREAKFAST', icon: Coffee },
  { id: 'designing-breakfast', label: 'DESIGNING YOUR BREAKFAST', icon: Utensils },
  { id: 'appetizers', label: 'APPETIZERS', icon: Apple },
  { id: 'salads', label: 'SALADS', icon: Salad },
  { id: 'q-diet', label: 'Q DIET', icon: Apple },
  { id: 'burgers', label: 'BURGERS', icon: Sandwich },
  { id: 'q-sense', label: 'Q SENSE', icon: Pizza },
];

const turkishBreakfastProducts = [
  { 
    id: 1, 
    name: 'Pan Breakfast', 
    price: '11.00 JD', 
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'turkish-breakfast'
  },
  { 
    id: 2, 
    name: 'Spread Breakfast', 
    price: '25.00 JD', 
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'turkish-breakfast'
  },
  { 
    id: 3, 
    name: 'Fried Egg', 
    price: '4.00 JD', 
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'turkish-breakfast'
  },
  { 
    id: 4, 
    name: 'Fried Egg With Tomato', 
    price: '6.00 JD', 
    image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'turkish-breakfast'
  },
  { 
    id: 5, 
    name: 'Fried Egg With Sujuk', 
    price: '6.00 JD', 
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'turkish-breakfast'
  },
  { 
    id: 6, 
    name: 'Fried Sujuk', 
    price: '5.50 JD', 
    image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'turkish-breakfast'
  },
  { 
    id: 7, 
    name: 'Menemen', 
    price: '6.50 JD', 
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'turkish-breakfast'
  },
  { 
    id: 8, 
    name: 'Mixed Breakfast', 
    price: '12.00 JD', 
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'turkish-breakfast'
  },
  { 
    id: 9, 
    name: 'Turkish Pancake', 
    price: '8.00 JD', 
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    category: 'turkish-breakfast'
  },
];

export default function Food() {
  const [selectedCategory, setSelectedCategory] = useState('turkish-breakfast');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredProducts = turkishBreakfastProducts.filter(product => 
    product.category === selectedCategory
  );

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
        
        <div className="bg-white px-8 py-3 rounded-full shadow-xl border border-gray-100">
          <img src={logoImage} alt="HyaQqabaz" className="h-12 w-auto object-contain filter brightness-100 contrast-125" />
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

      {/* Breadcrumb */}
      <div className="px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-300 px-4 py-2 rounded-lg w-fit">
          <Home className="w-4 h-4" />
          <span>/</span>
          <span className="text-gray-800 font-medium">TURKISH BREAKFAST</span>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed left-0 top-0 h-full bg-warm-brown text-white z-50 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64`}>
          <div className="p-6 pt-20">
            <h2 className="text-xl font-bold mb-6 luxury-font">FOOD MENU</h2>
            <nav className="space-y-4">
              {foodCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-yellow-600 text-white'
                        : 'hover:bg-yellow-600 hover:bg-opacity-20'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-sm font-medium">{category.label}</span>
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
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-12 luxury-font">TURKISH BREAKFAST</h1>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/food-product/${product.id}`}>
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