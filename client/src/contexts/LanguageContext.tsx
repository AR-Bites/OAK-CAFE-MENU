import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
    // Header & Navigation
    'menu': 'MENU',
    'home': 'HOME',
    'back': 'BACK',
    'beverages': 'BEVERAGES',
    'food': 'FOOD',
    'shisha': 'SHISHA',
    'signatures': 'SIGNATURES',
    
    // Common UI
    'description': 'DESCRIPTION',
    'price': 'PRICE',
    'category': 'CATEGORY',
    'related-products': 'RELATED PRODUCTS',
    'drinks-menu': 'DRINKS MENU',
    'food-menu': 'FOOD MENU',
    'shisha-menu': 'SHISHA MENU',
    'welcome': 'Welcome to The Oak Cafe',
    'premium-experience': 'Premium Middle Eastern Experience',
    'oak-cafe': 'The Oak Cafe',
    
    // Categories
    'hot-drinks': 'HOT DRINKS',
    'cold-coffee': 'COLD COFFEE', 
    'fresh-juice': 'FRESH JUICE',
    'soft-drinks': 'SOFT DRINKS',
    'frappe': 'FRAPPE',
    'milkshake': 'MILKSHAKE',
    'smoothies': 'SMOOTHIES',
    'mojito': 'MOJITO',
    'iced-tea': 'ICED TEA',
    'breakfast': 'BREAKFAST',
    'pizza': 'PIZZA',
    'sandwiches': 'SANDWICHES',
    'italian': 'ITALIAN',
    'main-course': 'MAIN COURSE',
    'appetizers': 'APPETIZERS',
    'salads': 'SALADS',
    'soup': 'SOUP',
    'desserts': 'DESSERTS',
    'regular': 'REGULAR SHISHA',
    'premium': 'PREMIUM SHISHA',
    'special': 'SPECIAL SHISHA',
    
    // Product Names
    'red-eye': 'Red Eye',
    'v60': 'V60',
    'chemex': 'Chemex',
    'flat-white': 'Flat White',
    'espresso-macchiato': 'Espresso Macchiato',
    'marshmallow-hot-chocolate': 'Marshmallow Hot Chocolate',
    'turkish-coffee-single': 'Turkish Coffee Single',
    'double-espresso': 'Double Espresso',
    'cappuccino': 'Cappuccino',
    'cortado': 'Cortado',
    'latte': 'Latte',
    'americano': 'Americano',
    'turkish-coffee-double': 'Turkish Coffee Double',
    'oak-seasonal-juice': 'Oak Seasonal Juice',
    'pomegranate': 'Pomegranate',
    'mango-mint': 'Mango Mint',
    'orange-juice': 'Orange Juice',
    'coca-cola': 'Coca Cola',
    'sprite': 'Sprite',
    'red-bull': 'Red Bull',
    'eggs-of-your-choice': 'Eggs of Your Choice',
    'halloumi-croissant': 'Halloumi Croissant',
    'tuna-sandwich': 'Tuna Sandwich',
    'manakish-labneh-rocca': 'Manakish Labneh Rocca',
    'turkey-omelette-croissant': 'Turkey Omelette Croissant',
    'zaatar-pomegranate': 'Zaatar Pomegranate',
    'avocado-omelette': 'Avocado Omelette',
    'manakish-falafel': 'Manakish Falafel',
    'manakish-nabulsi-cheese': 'Manakish Nabulsi Cheese',
    'manakish-zaatar-vegetables': 'Manakish Zaatar Vegetables',
    'marshmallow-chocolate': 'Marshmallow Chocolate',
    'turkey-croissant': 'Turkey Croissant',
    'manakish-mix-cheese': 'Manakish Mix Cheese',
    'manakish-molasses-tahini': 'Manakish Molasses Tahini',
    
    // Product Descriptions
    'red-eye-desc': 'Strong coffee with espresso shot',
    'v60-desc': 'Specialty pour-over coffee',
    'flat-white-desc': 'Smooth espresso with steamed milk and light foam',
    'espresso-macchiato-desc': 'Espresso with steamed milk foam',
    'marshmallow-hot-chocolate-desc': 'Rich hot chocolate with marshmallows',
    'turkish-coffee-single-desc': 'Traditional Turkish coffee prepared in authentic copper pot',
    'double-espresso-desc': 'Double shot of rich espresso for the ultimate coffee experience',
    'eggs-of-your-choice-desc': 'Fresh eggs prepared exactly as you like them',
    'halloumi-croissant-desc': 'Buttery croissant filled with grilled halloumi cheese',
    'tuna-sandwich-desc': 'Fresh tuna salad sandwich with crisp vegetables',
    'manakish-labneh-rocca-desc': 'Traditional Middle Eastern bread with labneh and rocca leaves',
    'turkey-omelette-croissant-desc': 'Fluffy turkey omelette served in a flaky croissant',
    'zaatar-pomegranate-desc': 'Traditional zaatar bread with pomegranate molasses',
    'avocado-omelette-desc': 'Fresh avocado omelette with scrambled eggs',
    'manakish-falafel-desc': 'Traditional falafel manakish',
    'manakish-nabulsi-cheese-desc': 'Authentic Nabulsi cheese manakish',
    'manakish-zaatar-vegetables-desc': 'Zaatar manakish with fresh vegetables',
    'marshmallow-chocolate-desc': 'Rich hot chocolate with marshmallows',
    'turkey-croissant-desc': 'Delicious turkey croissant with special filling',
    'manakish-mix-cheese-desc': 'Delicious mixed cheese manakish',
    'manakish-molasses-tahini-desc': 'Traditional molasses and tahini manakish',
    'oak-seasonal-juice-desc': 'Our signature seasonal blend of the finest available fruits',
  },
  ar: {
    // Header & Navigation
    'menu': 'القائمة',
    'home': 'الرئيسية',
    'back': 'رجوع',
    'beverages': 'المشروبات',
    'food': 'الطعام',
    'shisha': 'الشيشة',
    'signatures': 'التوقيعات',
    
    // Common UI
    'description': 'الوصف',
    'price': 'السعر',
    'category': 'الفئة',
    'related-products': 'منتجات ذات صلة',
    'drinks-menu': 'قائمة المشروبات',
    'food-menu': 'قائمة الطعام',
    'shisha-menu': 'قائمة الشيشة',
    'welcome': 'مرحباً بكم في مقهى أوك',
    'premium-experience': 'تجربة شرق أوسطية مميزة',
    'oak-cafe': 'مقهى أوك',
    
    // Categories
    'hot-drinks': 'المشروبات الساخنة',
    'cold-coffee': 'القهوة الباردة',
    'fresh-juice': 'العصائر الطازجة',
    'soft-drinks': 'المشروبات الغازية',
    'frappe': 'فرابيه',
    'milkshake': 'ميلك شيك',
    'smoothies': 'سموذي',
    'mojito': 'موهيتو',
    'iced-tea': 'الشاي المثلج',
    'breakfast': 'الإفطار',
    'pizza': 'البيتزا',
    'sandwiches': 'الساندويتشات',
    'italian': 'الإيطالي',
    'main-course': 'الأطباق الرئيسية',
    'appetizers': 'المقبلات',
    'salads': 'السلطات',
    'soup': 'الشوربة',
    'desserts': 'الحلويات',
    'regular': 'الشيشة العادية',
    'premium': 'الشيشة المميزة',
    'special': 'الشيشة الخاصة',
    
    // Product Names
    'red-eye': 'قهوة ريد آي',
    'v60': 'قهوة مختصة في ٦٠',
    'chemex': 'قهوة كيمكس',
    'flat-white': 'قهوة فلات وايت',
    'espresso-macchiato': 'إسبريسو ماكياتو',
    'marshmallow-hot-chocolate': 'شوكولاتة ساخنة بالمارشملو',
    'turkish-coffee-single': 'قهوة تركية مفردة',
    'double-espresso': 'إسبريسو مزدوج',
    'cappuccino': 'كابتشينو',
    'cortado': 'كورتادو',
    'latte': 'لاتيه',
    'americano': 'أمريكانو',
    'turkish-coffee-double': 'قهوة تركية مزدوجة',
    'oak-seasonal-juice': 'عصير أوك الموسمي الطازج',
    'pomegranate': 'رمان',
    'mango-mint': 'مانجو بالنعناع',
    'orange-juice': 'عصير برتقال',
    'coca-cola': 'كوكا كولا',
    'sprite': 'سبرايت',
    'red-bull': 'ريد بول',
    'eggs-of-your-choice': 'بيض حسب الطلب',
    'halloumi-croissant': 'كرواسان حلوم',
    'tuna-sandwich': 'ساندويش تونة',
    'manakish-labneh-rocca': 'مناقيش لبنة وجرجير',
    'turkey-omelette-croissant': 'كرواسان أومليت ديك رومي',
    'zaatar-pomegranate': 'زعتر ودبس رمان',
    'avocado-omelette': 'أومليت أفوكادو',
    'manakish-falafel': 'مناقيش فلافل',
    'manakish-nabulsi-cheese': 'مناقيش جبن نابلسي',
    'manakish-zaatar-vegetables': 'مناقيش زعتر وخضار',
    'marshmallow-chocolate': 'شوكولاتة مارشمالو',
    'turkey-croissant': 'كرواسان تركي',
    'manakish-mix-cheese': 'مناقيش جبن مشكل',
    'manakish-molasses-tahini': 'مناقيش دبس وطحينة',
    
    // Product Descriptions
    'red-eye-desc': 'قهوة قوية مع جرعة إسبريسو',
    'v60-desc': 'قهوة مختصة بالتقطير',
    'flat-white-desc': 'إسبريسو ناعم بحليب مبخر ورغوة قليلة',
    'espresso-macchiato-desc': 'إسبريسو برغوة حليب مبخرة',
    'marshmallow-hot-chocolate-desc': 'شوكولاتة ساخنة غنية بالمارشملو',
    'turkish-coffee-single-desc': 'قهوة تركية تقليدية محضرة في إبريق نحاسي أصيل',
    'double-espresso-desc': 'جرعة مضاعفة من الإسبريسو الغني لتجربة القهوة المثلى',
    'eggs-of-your-choice-desc': 'بيض طازج محضر كما تشاء تماماً',
    'halloumi-croissant-desc': 'كرواسان بالزبدة محشو بجبنة الحلومي المشوية',
    'tuna-sandwich-desc': 'ساندويش سلطة تونة طازجة مع خضار مقرمشة',
    'manakish-labneh-rocca-desc': 'خبز شرق أوسطي تقليدي باللبنة وأوراق الجرجير',
    'turkey-omelette-croissant-desc': 'أومليت ديك رومي طري في كرواسان هش',
    'zaatar-pomegranate-desc': 'خبز زعتر تقليدي مع دبس الرمان',
    'avocado-omelette-desc': 'أومليت أفوكادو طازج مع البيض المخفوق',
    'manakish-falafel-desc': 'مناقيش فلافل تقليدية',
    'manakish-nabulsi-cheese-desc': 'مناقيش جبن نابلسي أصيل',
    'manakish-zaatar-vegetables-desc': 'مناقيش زعتر مع الخضار الطازجة',
    'marshmallow-chocolate-desc': 'شوكولاتة ساخنة غنية مع المارشمالو',
    'turkey-croissant-desc': 'كرواسان تركي لذيذ بالحشوة المميزة',
    'manakish-mix-cheese-desc': 'مناقيش جبن مشكل لذيذة',
    'manakish-molasses-tahini-desc': 'مناقيش دبس وطحينة تقليدية',
    'oak-seasonal-juice-desc': 'مزيجنا الموسمي المميز من أطيب الفواكه المتوفرة',
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
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};