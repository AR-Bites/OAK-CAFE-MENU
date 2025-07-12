import { Instagram, Phone } from 'lucide-react';
import arBitesLogo from '@assets/image-removebg-preview (1)_1752329807829.png';

export const CompanyFooter = () => {
  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg z-40 px-3 py-2 sm:px-4 sm:py-3 max-w-6xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-3">
        {/* Logo and Company Name */}
        <div className="flex items-center gap-2 sm:gap-3">
          <img 
            src={arBitesLogo} 
            alt="AR Bites" 
            className="h-6 sm:h-8 w-auto object-contain"
          />
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900">AR Bites</h3>
            <p className="text-xs text-gray-600 hidden sm:block">Powered by AR Technology</p>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a 
            href="https://www.instagram.com/ar.bitesjo/?igsh=ajhmd3ZvbjJhamJh#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 sm:gap-2 text-purple-600 hover:text-purple-800 transition-colors"
            title="Follow us on Instagram"
          >
            <Instagram className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-medium hidden md:inline">@ar.bitesjo</span>
          </a>
          
          <a 
            href="tel:+962790753376"
            className="flex items-center gap-1 sm:gap-2 text-green-600 hover:text-green-800 transition-colors"
            title="Call us"
          >
            <Phone className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-medium hidden md:inline">+962 79 075 3376</span>
          </a>
        </div>
      </div>
    </div>
  );
};