import { useState } from "react";
import { ArrowLeft, Home, Share, Globe, Menu, X, ChevronLeft, ChevronRight, Coffee, Droplets, Snowflake, Zap, Flame, Crown, Star, Eye } from "lucide-react";
import { Link, useParams } from "wouter";
import { useLanguage } from '@/contexts/LanguageContext';
import logoImage from "@assets/oakCafeLogo_1752004813012.png";
import Model3DViewer from '../components/Model3DViewer';
import { getModelPath, isGLTFModel } from '../utils/modelMapping';
import { allProducts } from '../data/fullMenu';

export default function ProductDetail() {
  const params = useParams();
  const productId = parseInt(params.id || '1');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modelViewerOpen, setModelViewerOpen] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  const product = allProducts.find(p => p.id === productId) || allProducts[0];
  
  // Get related products from the same category, excluding current product
  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id && p.type === product.type)
    .slice(0, 6); // Limit to 6 related products

  const productImages = [product.image]; // In real app, would have multiple images
  
  // Get 3D model path
  const modelKey = product.nameKey || product.name.toLowerCase().replace(/\s+/g, '-');
  const modelPath = getModelPath(modelKey);
  
  // Debug logging for model mapping
  console.log('Product:', product.name, 'ID:', product.id, 'Key:', modelKey, 'ModelPath:', modelPath);

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
          <Menu className="w-5 h-5" />
          <span className="text-sm font-medium">{t('menu')}</span>
        </button>
        
        <div className="flex items-center gap-4">
          <button className="bg-warm-brown text-white px-6 py-3 rounded-full flex items-center gap-3 hover:bg-opacity-80 transition-colors shadow-md">
            <Share className="w-5 h-5" />
            <span className="text-sm font-medium">{t('share')}</span>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="bg-warm-brown w-80 h-full shadow-xl flex flex-col">
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between text-white">
                <h2 className="text-xl font-bold">{t('categories')}</h2>
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 p-6 space-y-3 overflow-y-auto">
              <Link href="/beverages" className="block">
                <div className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-colors">
                  <div className="flex items-center gap-3 text-white">
                    <Coffee className="w-6 h-6" />
                    <span className="font-medium">{t('beverages')}</span>
                  </div>
                </div>
              </Link>
              
              <Link href="/food" className="block">
                <div className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-colors">
                  <div className="flex items-center gap-3 text-white">
                    <Star className="w-6 h-6" />
                    <span className="font-medium">{t('food')}</span>
                  </div>
                </div>
              </Link>
              
              <Link href="/shisha" className="block">
                <div className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-colors">
                  <div className="flex items-center gap-3 text-white">
                    <Flame className="w-6 h-6" />
                    <span className="font-medium">{t('shisha')}</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          
          <div 
            className="flex-1 bg-black/20"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="px-6 pb-8">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images & 3D Viewer */}
            <div className="p-8">
              <div className="relative">
                {/* Image Container */}
                <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-6 group">
                  {!show3D ? (
                    <img 
                      src={productImages[currentImageIndex]} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full">
                      <Model3DViewer
                        modelPath={modelPath || ''}
                        productName={product.name}
                        isOpen={true}
                        onClose={() => setShow3D(false)}
                        inline={true}
                      />
                    </div>
                  )}
                  
                  {/* Image Navigation */}
                  {productImages.length > 1 && !show3D && (
                    <>
                      <button 
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                      </button>
                      
                      <button 
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                      </button>
                    </>
                  )}

                  {/* 3D View Toggle */}
                  {modelPath && (
                    <button 
                      onClick={() => setShow3D(!show3D)}
                      className="absolute top-4 right-4 bg-warm-brown text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {show3D ? t('view-photo') : t('view-3d')}
                      </span>
                    </button>
                  )}
                </div>

                {/* Image Dots Indicator */}
                {productImages.length > 1 && (
                  <div className="flex justify-center gap-2">
                    {productImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-warm-brown' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="p-8 flex flex-col">
              <div className="flex-1">
                {/* Product Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                  {product.nameKey ? t(product.nameKey) : product.name}
                </h1>

                {/* Price */}
                <div className="text-3xl font-bold text-warm-brown mb-6">
                  {product.price}
                </div>

                {/* Description */}
                <div className="prose prose-gray max-w-none mb-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                  <p className="text-gray-600 leading-relaxed">
                    {product.descriptionKey ? t(product.descriptionKey) : product.description}
                  </p>
                </div>

                {/* Product Info */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-warm-brown rounded-full"></div>
                    <span className="text-gray-600 capitalize">{t(product.category)}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-warm-brown rounded-full"></div>
                    <span className="text-gray-600 capitalize">{t(product.type)}</span>
                  </div>

                  {/* 3D Model Available Indicator */}
                  {modelPath && (
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">{t('3d-model-available')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button className="w-full bg-warm-brown text-white py-4 rounded-xl font-semibold hover:bg-opacity-90 transition-colors shadow-lg">
                  {t('order-now')}
                </button>
                
                <div className="flex gap-4">
                  <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                    {t('add-to-favorites')}
                  </button>
                  
                  <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                    {t('share')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="max-w-6xl mx-auto mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {t('related-products')}
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                        {relatedProduct.nameKey ? t(relatedProduct.nameKey) : relatedProduct.name}
                      </h3>
                      
                      <div className="text-warm-brown font-bold text-sm">
                        {relatedProduct.price}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}