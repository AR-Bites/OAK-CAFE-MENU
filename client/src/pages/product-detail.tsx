import { useState } from "react";
import { ArrowLeft, Home, Share, Globe, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useParams } from "wouter";
import logoImage from "@assets/oakCafeLogo_1752004813012.png";

const allProducts = [
  { 
    id: 1, 
    name: 'Step', 
    price: '7.00 JD', 
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    description: 'Fresh Kiwi* Fresh Orange Juice* Fresh Passion Fruit* Fresh Lemon Juice',
    category: 'signatures'
  },
  { 
    id: 2, 
    name: 'Rocket', 
    price: '16.00 JD', 
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    description: 'Premium energy blend with exotic fruits and natural caffeine boost',
    category: 'signatures'
  },
  { 
    id: 3, 
    name: 'Jaws', 
    price: '7.00 JD', 
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    description: 'Bold and refreshing tropical fusion with a bite of citrus',
    category: 'signatures'
  },
  { 
    id: 4, 
    name: 'Madame Q', 
    price: '8.00 JD', 
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    description: 'Elegant blend of premium ingredients with a sophisticated taste',
    category: 'signatures'
  },
  { 
    id: 5, 
    name: 'Oreo Affogato', 
    price: '6.00 JD', 
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    description: 'Classic Italian dessert coffee with crushed Oreo cookies',
    category: 'special-coffees'
  },
  { 
    id: 6, 
    name: 'Frequency®', 
    price: '8.50 JD', 
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    description: 'Signature coffee blend with unique brewing method',
    category: 'special-coffees'
  },
  { 
    id: 7, 
    name: 'Nocturne', 
    price: '8.00 JD', 
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    description: 'Dark roast evening blend with smooth chocolate notes',
    category: 'special-coffees'
  },
];

export default function ProductDetail() {
  const params = useParams();
  const productId = parseInt(params.id || '1');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = allProducts.find(p => p.id === productId) || allProducts[0];
  const relatedProducts = allProducts.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  const productImages = [product.image]; // In real app, would have multiple images

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

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
            <Share className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 bg-warm-brown rounded-full flex items-center justify-center text-white hover:bg-opacity-80 transition-colors">
            <Globe className="w-4 h-4" />
            <span className="ml-1 text-xs">EN</span>
          </button>
        </div>
        
        <div className="flex items-center bg-white px-4 py-1 rounded-full shadow-sm">
          <img src={logoImage} alt="HyaQqabaz" className="h-8 w-auto object-contain" />
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/beverages">
            <button className="w-8 h-8 bg-warm-brown rounded-full flex items-center justify-center text-white hover:bg-opacity-80 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
          </Link>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-warm-brown text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-opacity-80 transition-colors"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span className="text-sm font-medium">Menu</span>
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-300 px-4 py-2 rounded-lg w-fit">
          <Home className="w-4 h-4" />
          <span>/</span>
          <span>SIGNATURES</span>
          <span>/</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8">
        {/* Product Image */}
        <div className="relative bg-black rounded-lg overflow-hidden mb-8 max-w-4xl mx-auto">
          <div className="aspect-video relative">
            <img 
              src={productImages[currentImageIndex]} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Image Navigation */}
            {productImages.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            
            {/* Product Name Tag */}
            <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded">
              <span className="text-sm font-medium text-gray-800">{product.name.toLowerCase()}</span>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          {/* Decorative Line */}
          <div className="flex items-center justify-center mb-4">
            <div className="h-px bg-gray-400 w-16"></div>
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-600 mx-2"></div>
            <div className="h-px bg-gray-400 w-16"></div>
          </div>
          
          <h1 className="text-4xl font-bold luxury-font text-gray-800 mb-4">{product.name}</h1>
          <p className="text-2xl font-bold text-gray-800 mb-6">{product.price}</p>
          
          {/* Decorative Line */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-gray-400 w-16"></div>
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-600 mx-2"></div>
            <div className="h-px bg-gray-400 w-16"></div>
          </div>
          
          <p className="text-lg text-gray-700 leading-relaxed">{product.description}</p>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 luxury-font">RELATED PRODUCTS</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                  <div className="product-card bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer">
                    <div className="aspect-square bg-black relative">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 text-center bg-warm-brown text-white">
                      <h3 className="font-bold text-lg mb-2 luxury-font">{relatedProduct.name}</h3>
                      <p className="text-yellow-300 font-bold text-lg">{relatedProduct.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}