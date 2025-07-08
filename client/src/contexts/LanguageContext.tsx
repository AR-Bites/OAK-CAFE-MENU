import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Header
    'menu': 'Menu',
    'home': 'Home',
    'back': 'Back',
    
    // Navigation
    'beverages': 'BEVERAGES',
    'food': 'FOOD', 
    'shisha': 'SHISHA',
    'signatures': 'SIGNATURES',
    
    // Beverage Categories
    'hot-drinks': 'HOT DRINKS',
    'cold-coffee': 'COLD COFFEE',
    'fresh-juice': 'FRESH JUICE',
    'soft-drinks': 'SOFT DRINKS',
    'frappe': 'FRAPPE',
    'milkshake': 'MILK SHAKE',
    'smoothies': 'SMOOTHIES',
    'mojito': 'MOJITO',
    'iced-tea': 'ICED TEA',
    
    // Food Categories
    'breakfast': 'BREAKFAST',
    'pizza': 'PIZZA',
    'sandwiches': 'SANDWICHES',
    'italian': 'ITALIAN',
    'main-course': 'MAIN COURSE',
    'appetizers': 'APPETIZERS',
    'salads': 'SALADS',
    'soup': 'SOUP',
    'desserts': 'DESSERTS',
    
    // Shisha Categories
    'regular': 'REGULAR SHISHA',
    'premium': 'PREMIUM SHISHA',
    'special': 'SPECIAL SHISHA',
    
    // Menu Labels
    'drinks-menu': 'DRINKS MENU',
    'food-menu': 'FOOD MENU',
    'shisha-menu': 'SHISHA MENU',
    
    // Product Details
    'description': 'Description',
    'price': 'Price',
    'category': 'Category',
    
    // Common
    'welcome': 'Welcome to The Oak Cafe',
    'premium-experience': 'Premium Middle Eastern Experience',
  },
  ar: {
    // Header
    'menu': 'القائمة',
    'home': 'الرئيسية',
    'back': 'رجوع',
    
    // Navigation
    'beverages': 'المشروبات',
    'food': 'الطعام',
    'shisha': 'الشيشة',
    'signatures': 'التوقيعات',
    
    // Beverage Categories
    'hot-drinks': 'المشروبات الساخنة',
    'cold-coffee': 'القهوة الباردة',
    'fresh-juice': 'العصائر الطازجة',
    'soft-drinks': 'المشروبات الغازية',
    'frappe': 'فرابيه',
    'milkshake': 'ميلك شيك',
    'smoothies': 'سموذي',
    'mojito': 'موهيتو',
    'iced-tea': 'الشاي المثلج',
    
    // Food Categories
    'breakfast': 'الإفطار',
    'pizza': 'البيتزا',
    'sandwiches': 'الساندويتشات',
    'italian': 'الإيطالي',
    'main-course': 'الأطباق الرئيسية',
    'appetizers': 'المقبلات',
    'salads': 'السلطات',
    'soup': 'الشوربة',
    'desserts': 'الحلويات',
    
    // Shisha Categories
    'regular': 'الشيشة العادية',
    'premium': 'الشيشة المميزة',
    'special': 'الشيشة الخاصة',
    
    // Menu Labels
    'drinks-menu': 'قائمة المشروبات',
    'food-menu': 'قائمة الطعام',
    'shisha-menu': 'قائمة الشيشة',
    
    // Product Details
    'description': 'الوصف',
    'price': 'السعر',
    'category': 'الفئة',
    
    // Common
    'welcome': 'مرحباً بكم في مقهى أوك',
    'premium-experience': 'تجربة شرق أوسطية مميزة',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Save language to localStorage and update document direction
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};