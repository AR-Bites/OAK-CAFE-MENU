import { useState } from "react";
import { ArrowLeft, Home, Share, Globe, Menu, X, ChevronLeft, ChevronRight, Coffee, Droplets, Snowflake, Zap, Flame, Crown, Star } from "lucide-react";
import { Link, useParams } from "wouter";
import { useLanguage } from '@/contexts/LanguageContext';
import logoImage from "@assets/oakCafeLogo_1752004813012.png";

// All products with unique IDs
const allProducts = [
  // Beverages (IDs 100-199)
  { id: 101, name: 'Red Eye', nameKey: 'red-eye', descriptionKey: 'red-eye-desc', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Strong coffee with espresso shot' },
  { id: 102, name: 'V60 / CHEMEX', nameKey: 'v60', descriptionKey: 'v60-desc', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Pour-over specialty coffee' },
  { id: 103, name: 'Flat White', nameKey: 'flat-white', descriptionKey: 'flat-white-desc', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Smooth espresso with steamed milk and minimal foam' },
  { id: 104, name: 'Espresso Macchiato', nameKey: 'espresso-macchiato', descriptionKey: 'espresso-macchiato-desc', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Espresso with steamed milk foam' },
  { id: 105, name: 'Marshmallow Hot Chocolate', nameKey: 'marshmallow-hot-chocolate', descriptionKey: 'marshmallow-hot-chocolate-desc', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Rich hot chocolate with marshmallows' },
  { id: 106, name: 'Turkish Coffee Single', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Traditional Turkish coffee prepared in authentic copper pot' },
  { id: 107, name: 'Iced Caramel Macchiato', price: '3.95 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'cold-coffee', description: 'Chilled espresso with vanilla syrup, steamed milk and caramel drizzle' },
  { id: 108, name: 'Cold Brew', price: '5.25 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'cold-coffee', description: 'Smooth, slow-steeped coffee served over ice for maximum flavor' },
  { id: 109, name: 'The Oak Seasonal Fresh Juice', price: '4.90 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'fresh-juice', description: 'Our signature seasonal blend of the freshest fruits available' },
  { id: 110, name: 'Pomegranate', price: '4.90 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'fresh-juice', description: 'Fresh pomegranate juice packed with antioxidants' },
  
  // Additional beverages for missing categories
  { id: 121, name: 'Vanilla Frappe', price: '4.25 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'frappe', description: 'Creamy vanilla frappe blended with ice and topped with whipped cream' },
  { id: 122, name: 'Chocolate Frappe', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'frappe', description: 'Rich chocolate frappe with cocoa powder and chocolate syrup' },
  { id: 123, name: 'Caramel Frappe', price: '4.75 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'frappe', description: 'Sweet caramel frappe with caramel drizzle and whipped cream' },
  { id: 124, name: 'Strawberry Milkshake', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'milkshake', description: 'Classic strawberry milkshake made with fresh strawberries and vanilla ice cream' },
  { id: 125, name: 'Chocolate Milkshake', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'milkshake', description: 'Rich chocolate milkshake with chocolate ice cream and chocolate sauce' },
  { id: 126, name: 'Vanilla Milkshake', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'milkshake', description: 'Creamy vanilla milkshake made with premium vanilla ice cream' },
  { id: 127, name: 'Berry Smoothie', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'smoothies', description: 'Mixed berry smoothie packed with antioxidants and natural fruit flavors' },
  { id: 128, name: 'Tropical Smoothie', price: '4.75 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'smoothies', description: 'Exotic tropical smoothie with mango, pineapple, and coconut' },
  { id: 129, name: 'Green Smoothie', price: '5.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'smoothies', description: 'Healthy green smoothie with spinach, apple, and kiwi for natural energy' },
  { id: 130, name: 'Classic Mojito', price: '5.50 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'mojito', description: 'Traditional mojito with fresh mint, lime, and sparkling water' },
  { id: 131, name: 'Berry Mojito', price: '5.75 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'mojito', description: 'Refreshing berry mojito with mixed berries and fresh mint' },
  { id: 132, name: 'Passion Fruit Mojito', price: '6.00 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'mojito', description: 'Exotic passion fruit mojito with tropical flavors and fresh herbs' },
  { id: 133, name: 'Classic Iced Tea', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'iced-tea', description: 'Refreshing classic iced tea brewed to perfection and served chilled' },
  { id: 134, name: 'Lemon Iced Tea', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'iced-tea', description: 'Classic iced tea infused with fresh lemon juice and mint' },
  { id: 135, name: 'Peach Iced Tea', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'iced-tea', description: 'Sweet peach iced tea with natural peach flavoring and aromatic herbs' },
  
  // Food (IDs 200-299)
  // Additional food products for missing categories
  { id: 225, name: 'OAK Beef Burger', nameKey: 'oak-beef-burger', descriptionKey: 'oak-beef-burger-desc', price: '8.00 JD', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'sandwiches', description: 'Premium beef burger with fresh vegetables and our signature sauce' },
  { id: 251, name: 'Club Sandwich', nameKey: 'club-sandwich', descriptionKey: 'club-sandwich-desc', price: '8.50 JD', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'sandwiches', description: 'Classic club sandwich with turkey, bacon, lettuce, and tomato on toasted bread' },
  { id: 252, name: 'Chicken Sandwich', nameKey: 'chicken-sandwich', descriptionKey: 'chicken-sandwich-desc', price: '7.50 JD', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'sandwiches', description: 'Grilled chicken breast sandwich with fresh vegetables and special sauce' },
  { id: 253, name: 'Grilled Cheese', price: '6.00 JD', image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'sandwiches', description: 'Golden grilled cheese sandwich with melted cheese and crispy bread' },
  { id: 254, name: 'Spaghetti Carbonara', price: '9.50 JD', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'italian', description: 'Traditional Italian carbonara with eggs, cheese, pancetta, and black pepper' },
  { id: 255, name: 'Fettuccine Alfredo', price: '8.75 JD', image: 'https://images.unsplash.com/photo-1572441713132-51c75654db73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'italian', description: 'Creamy fettuccine alfredo with parmesan cheese and butter sauce' },
  { id: 256, name: 'Risotto Mushroom', price: '10.25 JD', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'italian', description: 'Creamy mushroom risotto with arborio rice and mixed wild mushrooms' },
  { id: 257, name: 'Caesar Salad', price: '6.50 JD', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'salads', description: 'Classic Caesar salad with romaine lettuce, croutons, and parmesan cheese' },
  { id: 258, name: 'Greek Salad', price: '7.00 JD', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'salads', description: 'Traditional Greek salad with feta cheese, olives, and Mediterranean vegetables' },
  { id: 259, name: 'Quinoa Salad', price: '7.75 JD', image: 'https://images.unsplash.com/photo-1497888329096-51c27beff665?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'salads', description: 'Healthy quinoa salad with mixed vegetables and lemon vinaigrette' },
  { id: 260, name: 'Mushroom Soup', price: '5.50 JD', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'soup', description: 'Creamy mushroom soup with fresh herbs and a touch of cream' },
  { id: 261, name: 'Tomato Soup', price: '4.75 JD', image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'soup', description: 'Classic tomato soup with fresh basil and a hint of cream' },
  { id: 262, name: 'Chicken Noodle Soup', price: '6.25 JD', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'soup', description: 'Comforting chicken noodle soup with tender chicken and fresh vegetables' },
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
  const { t, language, setLanguage } = useLanguage();

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
          <button 
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="bg-warm-brown text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-opacity-80 transition-colors shadow-md"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">{language === 'en' ? 'AR' : 'EN'}</span>
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
          <span className="text-base font-medium">{t('menu')}</span>
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
          <span>{t(product.category) || product.category.toUpperCase().replace('-', ' ')}</span>
          <span>/</span>
          <span className="text-gray-800 font-medium">{t(product.nameKey) || product.name}</span>
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
              <span className="text-sm font-medium text-gray-800">{(t(product.nameKey) || product.name).toLowerCase()}</span>
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
          
          <h1 className="text-4xl font-bold luxury-font text-gray-800 mb-4">{t(product.nameKey) || product.name}</h1>
          <p className="text-2xl font-bold text-gray-800 mb-6">{product.price}</p>
          
          {/* Decorative Line */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-gray-400 w-16"></div>
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-600 mx-2"></div>
            <div className="h-px bg-gray-400 w-16"></div>
          </div>
          
          <p className="text-lg text-gray-700 leading-relaxed">{product.descriptionKey ? t(product.descriptionKey) : (product.description || t('product-description-fallback'))}</p>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 luxury-font">{t('related-products')}</h2>
            
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
                      <h3 className="font-bold text-lg mb-2 luxury-font">{t(relatedProduct.nameKey) || relatedProduct.name}</h3>
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
              <Link href="/beverages?category=hot-drinks">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Coffee className="w-5 h-5" />
                  <span className="text-sm font-medium">HOT DRINKS</span>
                </button>
              </Link>
              <Link href="/beverages?category=cold-coffee">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Snowflake className="w-5 h-5" />
                  <span className="text-sm font-medium">COLD COFFEE</span>
                </button>
              </Link>
              <Link href="/beverages?category=fresh-juice">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Droplets className="w-5 h-5" />
                  <span className="text-sm font-medium">FRESH JUICE</span>
                </button>
              </Link>
              <Link href="/beverages?category=soft-drinks">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-medium">SOFT DRINKS</span>
                </button>
              </Link>
              <Link href="/beverages?category=frappe">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Snowflake className="w-5 h-5" />
                  <span className="text-sm font-medium">FRAPPE</span>
                </button>
              </Link>
              <Link href="/beverages?category=milkshake">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Snowflake className="w-5 h-5" />
                  <span className="text-sm font-medium">MILK SHAKE</span>
                </button>
              </Link>
              <Link href="/beverages?category=smoothies">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Droplets className="w-5 h-5" />
                  <span className="text-sm font-medium">SMOOTHIES</span>
                </button>
              </Link>
              <Link href="/beverages?category=mojito">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-medium">MOJITO</span>
                </button>
              </Link>
              <Link href="/beverages?category=iced-tea">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Droplets className="w-5 h-5" />
                  <span className="text-sm font-medium">ICED TEA</span>
                </button>
              </Link>
            </>
          )}
          
          {product.type === 'food' && (
            <>
              <Link href="/food?category=breakfast">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Coffee className="w-5 h-5" />
                  <span className="text-sm font-medium">BREAKFAST</span>
                </button>
              </Link>
              <Link href="/food?category=pizza">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Droplets className="w-5 h-5" />
                  <span className="text-sm font-medium">PIZZA</span>
                </button>
              </Link>
              <Link href="/food?category=sandwiches">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-medium">SANDWICHES</span>
                </button>
              </Link>
              <Link href="/food?category=italian">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Coffee className="w-5 h-5" />
                  <span className="text-sm font-medium">ITALIAN</span>
                </button>
              </Link>
              <Link href="/food?category=main-course">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-medium">MAIN COURSE</span>
                </button>
              </Link>
              <Link href="/food?category=appetizers">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Droplets className="w-5 h-5" />
                  <span className="text-sm font-medium">APPETIZERS</span>
                </button>
              </Link>
              <Link href="/food?category=salads">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Coffee className="w-5 h-5" />
                  <span className="text-sm font-medium">SALADS</span>
                </button>
              </Link>
              <Link href="/food?category=soup">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Droplets className="w-5 h-5" />
                  <span className="text-sm font-medium">SOUP</span>
                </button>
              </Link>
              <Link href="/food?category=desserts">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Snowflake className="w-5 h-5" />
                  <span className="text-sm font-medium">DESSERTS</span>
                </button>
              </Link>
            </>
          )}
          
          {product.type === 'shisha' && (
            <>
              <Link href="/shisha?category=regular">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Flame className="w-5 h-5" />
                  <span className="text-sm font-medium">REGULAR SHISHA</span>
                </button>
              </Link>
              <Link href="/shisha?category=premium">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Crown className="w-5 h-5" />
                  <span className="text-sm font-medium">PREMIUM SHISHA</span>
                </button>
              </Link>
              <Link href="/shisha?category=special">
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