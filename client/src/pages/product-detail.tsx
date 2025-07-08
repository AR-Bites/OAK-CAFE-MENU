import { useState } from "react";
import { ArrowLeft, Home, Share, Globe, Menu, X, ChevronLeft, ChevronRight, Coffee, Droplets, Snowflake, Zap, Flame, Crown, Star } from "lucide-react";
import { Link, useParams } from "wouter";
import logoImage from "@assets/oakCafeLogo_1752004813012.png";

// All products with unique IDs
const allProducts = [
  // Beverages (IDs 100-199)
  { id: 101, name: 'Red Eye', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Premium coffee blend with double shot espresso for the perfect morning boost' },
  { id: 102, name: 'V60 / CHEMEX', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Pour-over coffee brewed with precision using V60 or Chemex methods' },
  { id: 103, name: 'Flat White', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Smooth espresso with steamed milk and minimal foam' },
  { id: 104, name: 'Espresso Macchiato', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Rich espresso with a touch of steamed milk foam' },
  { id: 105, name: 'Marshmallow Chocolate', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Decadent hot chocolate topped with fluffy marshmallows' },
  { id: 106, name: 'Turkish Coffee Single', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Traditional Turkish coffee prepared in authentic copper pot' },
  { id: 107, name: 'Iced Caramel Macchiato', price: '3.95 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'cold-coffee', description: 'Chilled espresso with vanilla syrup, steamed milk and caramel drizzle' },
  { id: 108, name: 'Cold Brew', price: '5.25 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'cold-coffee', description: 'Smooth, slow-steeped coffee served over ice for maximum flavor' },
  { id: 109, name: 'The Oak Seasonal Fresh Juice', price: '4.90 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'fresh-juice', description: 'Our signature seasonal blend of the freshest fruits available' },
  { id: 110, name: 'Pomegranate', price: '4.90 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'fresh-juice', description: 'Fresh pomegranate juice packed with antioxidants' },
  
  // Food (IDs 200-299)
  { id: 201, name: 'Eggs of Your Choice', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Fresh eggs prepared exactly how you like them - scrambled, fried, or boiled' },
  { id: 202, name: 'Hallomi Croissant', price: '5.50 JD', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Buttery croissant filled with grilled hallomi cheese' },
  { id: 203, name: 'Tuna Sandwich', price: '8.00 JD', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Fresh tuna salad sandwich with crisp vegetables' },
  { id: 204, name: 'Pizza Margherita', price: '5.50 JD', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'pizza', description: 'Classic Italian pizza with fresh mozzarella, tomato sauce, and basil' },
  { id: 205, name: 'Chicken BBQ Pizza', price: '7.50 JD', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'pizza', description: 'Tender chicken pieces with BBQ sauce, mozzarella, and red onions' },
  { id: 206, name: 'The Oak Steak', price: '13.75 JD', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'main-course', description: 'Our signature premium steak grilled to perfection with special seasoning' },
  { id: 207, name: 'Salmon Grill', price: '14.75 JD', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'main-course', description: 'Fresh Atlantic salmon fillet grilled with herbs and lemon' },
  
  // Shisha (IDs 300-399)
  { id: 301, name: 'Sahem Gum Shisha', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'regular', description: 'Premium tobacco blend with sweet gum flavor' },
  { id: 302, name: 'Lemon with Mint', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'regular', description: 'Refreshing citrus and mint combination for a cool smoking experience' },
  { id: 303, name: 'Two Apple Fakher', price: '7.15 JD', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'premium', description: 'Premium Fakher brand double apple flavor with rich tobacco taste' },
  { id: 304, name: 'Special Shisha', price: '17.15 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'special', description: 'Our exclusive premium blend with the finest tobacco and exotic flavors' },
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
        
        <Link href={product.type === 'food' ? '/food' : product.type === 'shisha' ? '/shisha' : '/beverages'}>
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
          <span>{product.category.toUpperCase().replace('-', ' ')}</span>
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
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-72 bg-warm-brown text-white transform transition-transform duration-300 z-20 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-opacity-20 border-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold luxury-font">
              {product.type === 'beverage' && 'DRINKS MENU'}
              {product.type === 'food' && 'FOOD MENU'}
              {product.type === 'shisha' && 'SHISHA MENU'}
            </h2>
            <button onClick={() => setSidebarOpen(false)} className="text-white hover:text-gray-300">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <nav className="p-6">
          {product.type === 'beverage' && (
            <>
              <Link href="/beverages">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Coffee className="w-5 h-5" />
                  <span className="text-sm font-medium">HOT DRINKS</span>
                </button>
              </Link>
              <Link href="/beverages">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Snowflake className="w-5 h-5" />
                  <span className="text-sm font-medium">COLD COFFEE</span>
                </button>
              </Link>
              <Link href="/beverages">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Droplets className="w-5 h-5" />
                  <span className="text-sm font-medium">FRESH JUICE</span>
                </button>
              </Link>
              <Link href="/beverages">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-medium">SOFT DRINKS</span>
                </button>
              </Link>
              <Link href="/beverages">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Snowflake className="w-5 h-5" />
                  <span className="text-sm font-medium">FRAPPE</span>
                </button>
              </Link>
              <Link href="/beverages">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Snowflake className="w-5 h-5" />
                  <span className="text-sm font-medium">MILK SHAKE</span>
                </button>
              </Link>
              <Link href="/beverages">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Droplets className="w-5 h-5" />
                  <span className="text-sm font-medium">SMOOTHIES</span>
                </button>
              </Link>
              <Link href="/beverages">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-medium">MOJITO</span>
                </button>
              </Link>
              <Link href="/beverages">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Droplets className="w-5 h-5" />
                  <span className="text-sm font-medium">ICED TEA</span>
                </button>
              </Link>
            </>
          )}
          
          {product.type === 'food' && (
            <>
              <Link href="/food">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Coffee className="w-5 h-5" />
                  <span className="text-sm font-medium">BREAKFAST</span>
                </button>
              </Link>
              <Link href="/food">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Droplets className="w-5 h-5" />
                  <span className="text-sm font-medium">PIZZA</span>
                </button>
              </Link>
              <Link href="/food">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-medium">SANDWICHES</span>
                </button>
              </Link>
              <Link href="/food">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Coffee className="w-5 h-5" />
                  <span className="text-sm font-medium">ITALIAN</span>
                </button>
              </Link>
              <Link href="/food">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-medium">MAIN COURSE</span>
                </button>
              </Link>
              <Link href="/food">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Droplets className="w-5 h-5" />
                  <span className="text-sm font-medium">APPETIZERS</span>
                </button>
              </Link>
              <Link href="/food">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Coffee className="w-5 h-5" />
                  <span className="text-sm font-medium">SALADS</span>
                </button>
              </Link>
              <Link href="/food">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Droplets className="w-5 h-5" />
                  <span className="text-sm font-medium">SOUP</span>
                </button>
              </Link>
              <Link href="/food">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Snowflake className="w-5 h-5" />
                  <span className="text-sm font-medium">DESSERTS</span>
                </button>
              </Link>
            </>
          )}
          
          {product.type === 'shisha' && (
            <>
              <Link href="/shisha">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Flame className="w-5 h-5" />
                  <span className="text-sm font-medium">REGULAR SHISHA</span>
                </button>
              </Link>
              <Link href="/shisha">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Crown className="w-5 h-5" />
                  <span className="text-sm font-medium">PREMIUM SHISHA</span>
                </button>
              </Link>
              <Link href="/shisha">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Star className="w-5 h-5" />
                  <span className="text-sm font-medium">SPECIAL SHISHA</span>
                </button>
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}