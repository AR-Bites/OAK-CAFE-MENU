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
    'oak-cafe': 'Oak Cafe',
    
    // Product Names - Beverages
    'red-eye': 'Red Eye',
    'v60': 'V60',
    'chemex': 'Chemex',
    'flat-white': 'Flat White',
    'espresso-macchiato': 'Espresso Macchiato',
    'oak-seasonal-juice': 'The Oak Seasonal Fresh Juice',
    'turkish-coffee-single': 'Turkish Coffee Single',
    'double-espresso': 'Double Espresso',
    'cappuccino': 'Cappuccino',
    'cortado': 'Cortado',
    'latte': 'Latte',
    'americano': 'Americano',
    'turkish-coffee-double': 'Turkish Coffee Double',
    'iced-caramel-macchiato': 'Iced Caramel Macchiato',
    'cold-brew': 'Cold Brew',
    'iced-dark-mocha': 'Iced Dark Mocha',
    'iced-americano': 'Iced Americano',
    'pomegranate': 'Pomegranate',
    'mango-mint': 'Mango Mint',
    'orange-juice': 'Orange Juice',
    'coca-cola': 'Coca Cola',
    'sprite': 'Sprite',
    'red-bull': 'Red Bull',
    'affogato': 'Affogato',
    'apple-juice': 'Apple Juice',
    'carrot-juice': 'Carrot Juice',
    
    // Food Names
    'eggs-of-your-choice': 'Eggs of Your Choice',
    'halloumi-croissant': 'Halloumi Croissant',
    'tuna-sandwich': 'Tuna Sandwich',
    'manakish-labneh-rocca': 'Manakish Labneh and Rocca',
    'turkey-omelette-croissant': 'Turkey Omelette Croissant',
    'zaatar-pomegranate': 'Zaatar and Pomegranate',
    'marshmallow-hot-chocolate': 'Marshmallow Hot Chocolate',
    
    // Product Descriptions
    'red-eye-desc': 'Strong coffee with espresso shot',
    'v60-desc': 'Pour-over specialty coffee',
    'flat-white-desc': 'Smooth espresso with steamed milk and minimal foam',
    'espresso-macchiato-desc': 'Espresso with steamed milk foam',
    'marshmallow-hot-chocolate-desc': 'Rich hot chocolate with marshmallows',
    'related-products': 'RELATED PRODUCTS',
    'oak-beef-burger': 'OAK Beef Burger',
    'oak-beef-burger-desc': 'Premium beef burger with fresh vegetables and our signature sauce',
    'club-sandwich': 'Club Sandwich',
    'club-sandwich-desc': 'Classic club sandwich with turkey, bacon, lettuce, and tomato on toasted bread',
    'chicken-sandwich': 'Chicken Sandwich',
    'chicken-sandwich-desc': 'Grilled chicken breast sandwich with fresh vegetables and special sauce',
    'eggs-of-your-choice-desc': 'Fresh eggs prepared exactly how you like them',
    'halloumi-croissant': 'Halloumi Croissant',
    'halloumi-croissant-desc': 'Buttery croissant filled with grilled halloumi cheese',
    'tuna-sandwich': 'Tuna Sandwich', 
    'tuna-sandwich-desc': 'Fresh tuna salad sandwich with crisp vegetables',
    'oak-sandwich': 'The Oak Sandwich',
    'oak-sandwich-desc': 'Our signature sandwich with premium ingredients',
    'shawarma-meat': 'Shawarma Meat',
    'shawarma-meat-desc': 'Traditional Middle Eastern shawarma with seasoned meat',
    'crispy-chicken-burger': 'Crispy Chicken Burger',
    'crispy-chicken-burger-desc': 'Crispy fried chicken burger with fresh toppings',
    'manakish-labneh-rocca-desc': 'Traditional Middle Eastern flatbread with labneh and rocket leaves',
    'turkey-omelette-croissant-desc': 'Fluffy croissant with turkey omelette filling',
    'zaatar-pomegranate-desc': 'Traditional zaatar bread topped with fresh pomegranate seeds',
    'pizza-margherita': 'Pizza Margherita',
    'pizza-margherita-desc': 'Classic Italian pizza with fresh mozzarella, tomato, and basil',
    'chicken-bbq-pizza': 'Chicken BBQ Pizza',
    'chicken-bbq-pizza-desc': 'BBQ chicken pizza with tender chicken and barbecue sauce',
    'turkish-coffee-single': 'Turkish Coffee Single',
    'turkish-coffee-single-desc': 'Traditional Turkish coffee prepared in authentic copper pot',
    'double-espresso': 'Double Espresso',
    'double-espresso-desc': 'Double shot of rich espresso for the ultimate coffee experience',
    'grilled-cheese': 'Grilled Cheese',
    'grilled-cheese-desc': 'Golden grilled cheese sandwich with melted cheese and crispy bread',
    'seafood-pasta': 'Seafood Pasta',
    'seafood-pasta-desc': 'Fresh seafood pasta with mixed ocean delights',
    'spaghetti-bolognese': 'Spaghetti Bolognese',
    'spaghetti-bolognese-desc': 'Traditional Italian spaghetti with rich meat sauce',
    'fettuccine-alfredo': 'Fettuccine Alfredo',
    'fettuccine-alfredo-desc': 'Creamy fettuccine alfredo with parmesan cheese and butter sauce',
    'lasagna': 'Lasagna',
    'lasagna-desc': 'Traditional layered lasagna with meat, cheese, and tomato sauce',
    'spaghetti-carbonara': 'Spaghetti Carbonara',
    'spaghetti-carbonara-desc': 'Traditional Italian carbonara with eggs, cheese, pancetta, and black pepper',
    'risotto-mushroom': 'Risotto Mushroom',
    'risotto-mushroom-desc': 'Creamy mushroom risotto with arborio rice and mixed wild mushrooms',
    'chef-salad': 'Chef Salad',
    'chef-salad-desc': 'Fresh chef salad with mixed greens and chef selection',
    'greek-salad': 'Greek Salad',
    'greek-salad-desc': 'Traditional Greek salad with feta cheese, olives, and Mediterranean vegetables',
    'caesar-salad': 'Caesar Salad',
    'caesar-salad-desc': 'Classic Caesar salad with romaine lettuce, croutons, and parmesan cheese',
    'smoked-salmon-salad': 'Smoked Salmon Salad',
    'smoked-salmon-salad-desc': 'Premium smoked salmon salad with fresh greens',
    'mushroom-soup': 'Mushroom Soup',
    'mushroom-soup-desc': 'Creamy mushroom soup with fresh herbs and a touch of cream',
    'seafood-soup': 'Seafood Soup',
    'seafood-soup-desc': 'Rich seafood soup with fresh ocean ingredients',
    'fanta': 'Fanta',
    'caramel-frappe': 'Caramel Frappe',
    'vanilla-frappe': 'Vanilla Frappe',
    'chocolate-frappe': 'Chocolate Frappe',
    'strawberry-milkshake': 'Strawberry Milkshake',
    'vanilla-milkshake': 'Vanilla Milkshake',
    'chocolate-milkshake': 'Chocolate Milkshake',
    'mango-smoothie': 'Mango Smoothie',
    'berry-smoothie': 'Berry Smoothie',
    'green-smoothie': 'Green Smoothie',
    'classic-mojito': 'Classic Mojito',
    'strawberry-mojito': 'Strawberry Mojito',
    'berry-mojito': 'Berry Mojito',
    'passion-fruit-mojito': 'Passion Fruit Mojito',
    'classic-iced-tea': 'Classic Iced Tea',
    'lemon-iced-tea': 'Lemon Iced Tea',
    'peach-iced-tea': 'Peach Iced Tea',
    
    // Product Names - Food
    'eggs-of-your-choice': 'Eggs of Your Choice',
    'french-toast': 'French Toast',
    'pancakes': 'Pancakes',
    'margherita-pizza': 'Margherita Pizza',
    'pepperoni-pizza': 'Pepperoni Pizza',
    'quattro-stagioni': 'Quattro Stagioni',
    'chicken-wings': 'Chicken Wings',
    'mozzarella-sticks': 'Mozzarella Sticks',
    'mexican-nachos': 'Mexican Nachos',
    'dynamite-shrimp': 'Dynamite Shrimp',
    'chicken-dynamite': 'Chicken Dynamite',
    'san-sebastian-cake': 'San Sebastian Cake',
    'tiramisu-cake': 'Tiramisu Cake',
    'cheesecake': 'Cheesecake',
    'kenafa-naama': 'Kenafa Naama',
    'club-sandwich': 'Club Sandwich',
    'chicken-sandwich': 'Chicken Sandwich',
    'grilled-cheese': 'Grilled Cheese',
    'spaghetti-carbonara': 'Spaghetti Carbonara',
    'fettuccine-alfredo': 'Fettuccine Alfredo',
    'risotto-mushroom': 'Risotto Mushroom',
    'caesar-salad': 'Caesar Salad',
    'greek-salad': 'Greek Salad',
    'quinoa-salad': 'Quinoa Salad',
    'mushroom-soup': 'Mushroom Soup',
    'tomato-soup': 'Tomato Soup',
    'chicken-noodle-soup': 'Chicken Noodle Soup',
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
    'oak-cafe': 'مقهى أوك',
    
    // Product Names - Beverages (Cultural Adaptations)
    'red-eye': 'قهوة ريد آي',
    'v60': 'قهوة مختصة في ٦٠',
    'chemex': 'قهوة كيمكس',
    'flat-white': 'قهوة فلات وايت',
    'espresso-macchiato': 'إسبريسو ماكياتو',
    'oak-seasonal-juice': 'عصير أوك الموسمي الطازج',
    'turkish-coffee-single': 'قهوة تركية مفردة',
    'double-espresso': 'إسبريسو مزدوج',
    'cappuccino': 'كابتشينو',
    'cortado': 'كورتادو',
    'latte': 'لاتيه',
    'americano': 'أمريكانو',
    'turkish-coffee-double': 'قهوة تركية مزدوجة',
    'iced-caramel-macchiato': 'ماكياتو كراميل مثلج',
    'cold-brew': 'قهوة باردة مختمرة',
    'iced-dark-mocha': 'موكا داكن مثلج',
    'iced-americano': 'أمريكانو مثلج',
    'pomegranate': 'رمان',
    'mango-mint': 'مانجو بالنعناع',
    'orange-juice': 'عصير برتقال',
    'coca-cola': 'كوكا كولا',
    'sprite': 'سبرايت',
    'red-bull': 'ريد بول',
    'affogato': 'أفوجاتو',
    'apple-juice': 'عصير تفاح',
    'carrot-juice': 'عصير جزر',
    
    // Food Names
    'eggs-of-your-choice': 'بيض حسب الطلب',
    'halloumi-croissant': 'كرواسان حلوم',
    'tuna-sandwich': 'ساندويش تونة',
    'manakish-labneh-rocca': 'مناقيش لبنة وجرجير',
    'turkey-omelette-croissant': 'كرواسان أومليت ديك رومي',
    'zaatar-pomegranate': 'زعتر ودبس رمان',
    'marshmallow-hot-chocolate': 'شوكولاتة ساخنة بالمارشملو',
    
    // Product Descriptions
    'red-eye-desc': 'قهوة قوية مع جرعة إسبريسو',
    'v60-desc': 'قهوة مختصة بالتقطير',
    'flat-white-desc': 'إسبريسو ناعم بحليب مبخر ورغوة قليلة',
    'espresso-macchiato-desc': 'إسبريسو برغوة حليب مبخرة',
    'marshmallow-hot-chocolate-desc': 'شوكولاتة ساخنة غنية بالمارشملو',
    'related-products': 'منتجات ذات صلة',
    'oak-beef-burger': 'برغر أوك اللحم البقري',
    'oak-beef-burger-desc': 'برغر لحم بقري فاخر مع خضار طازجة وصلصتنا المميزة',
    'club-sandwich': 'ساندويش كلوب',
    'club-sandwich-desc': 'ساندويش كلوب كلاسيكي مع الديك الرومي والبيكون والخس والطماطم',
    'chicken-sandwich': 'ساندويش دجاج',
    'chicken-sandwich-desc': 'ساندويش دجاج مشوي مع خضار طازجة وصلصة خاصة',
    'eggs-of-your-choice-desc': 'بيض طازج محضر كما تشاء تماماً',
    'halloumi-croissant': 'كرواسان حلومي',
    'halloumi-croissant-desc': 'كرواسان بالزبدة محشو بجبنة الحلومي المشوية',
    'tuna-sandwich': 'ساندويش تونة',
    'tuna-sandwich-desc': 'ساندويش سلطة تونة طازجة مع خضار مقرمشة',
    'oak-sandwich': 'ساندويش أوك',
    'oak-sandwich-desc': 'ساندويشنا المميز بمكونات فاخرة',
    'shawarma-meat': 'شاورما لحمة',
    'shawarma-meat-desc': 'شاورما شرق أوسطية تقليدية بلحم متبل',
    'crispy-chicken-burger': 'برغر دجاج مقرمش',
    'crispy-chicken-burger-desc': 'برغر دجاج مقلي مقرمش مع إضافات طازجة',
    'manakish-labneh-rocca-desc': 'خبز شرق أوسطي تقليدي باللبنة وأوراق الجرجير',
    'turkey-omelette-croissant-desc': 'كرواسان هش مع حشوة أومليت الديك الرومي',
    'zaatar-pomegranate-desc': 'خبز زعتر تقليدي مع حبوب الرمان الطازجة',
    'pizza-margherita': 'بيتزا مارغريتا',
    'pizza-margherita-desc': 'بيتزا إيطالية كلاسيكية بالموزاريلا الطازجة والطماطم والريحان',
    'chicken-bbq-pizza': 'بيتزا دجاج باربكيو',
    'chicken-bbq-pizza-desc': 'بيتزا دجاج بالباربكيو مع قطع الدجاج الطرية وصلصة الباربكيو',
    'turkish-coffee-single': 'قهوة تركية مفردة',
    'turkish-coffee-single-desc': 'قهوة تركية تقليدية محضرة في إبريق نحاسي أصيل',
    'double-espresso': 'إسبريسو مضاعف',
    'double-espresso-desc': 'جرعة مضاعفة من الإسبريسو الغني لتجربة القهوة المثلى',
    'grilled-cheese': 'جبن مشوي',
    'grilled-cheese-desc': 'ساندويش جبن مشوي ذهبي مع جبن مذاب وخبز مقرمش',
    'seafood-pasta': 'باستا مأكولات بحرية',
    'seafood-pasta-desc': 'باستا مأكولات بحرية طازجة مع مزيج من الثمار البحرية',
    'spaghetti-bolognese': 'سباغيتي بولونيز',
    'spaghetti-bolognese-desc': 'سباغيتي إيطالية تقليدية بصلصة اللحم الغنية',
    'fettuccine-alfredo': 'فيتوتشيني ألفريدو',
    'fettuccine-alfredo-desc': 'فيتوتشيني كريمية بجبن البارميزان وصلصة الزبدة',
    'lasagna': 'لازانيا',
    'lasagna-desc': 'لازانيا مطبقة تقليدية باللحم والجبن وصلصة الطماطم',
    'spaghetti-carbonara': 'سباغيتي كاربونارا',
    'spaghetti-carbonara-desc': 'كاربونارا إيطالية تقليدية بالبيض والجبن والبانشيتا والفلفل الأسود',
    'risotto-mushroom': 'ريزوتو فطر',
    'risotto-mushroom-desc': 'ريزوتو فطر كريمي مع أرز الأربوريو والفطر البري المتنوع',
    'chef-salad': 'سلطة الشيف',
    'chef-salad-desc': 'سلطة الشيف الطازجة مع الخضار المشكلة واختيار الشيف',
    'greek-salad': 'سلطة يونانية',
    'greek-salad-desc': 'سلطة يونانية تقليدية مع جبن الفيتا والزيتون والخضار المتوسطية',
    'caesar-salad': 'سلطة قيصر',
    'caesar-salad-desc': 'سلطة قيصر كلاسيكية مع خس الرومين والخبز المحمص وجبن البارميزان',
    'smoked-salmon-salad': 'سلطة سلمون مدخن',
    'smoked-salmon-salad-desc': 'سلطة سلمون مدخن فاخرة مع الخضار الطازجة',
    'mushroom-soup': 'شوربة فطر',
    'mushroom-soup-desc': 'شوربة فطر كريمية بالأعشاب الطازجة ولمسة من الكريمة',
    'seafood-soup': 'شوربة مأكولات بحرية',
    'seafood-soup-desc': 'شوربة مأكولات بحرية غنية بالمكونات البحرية الطازجة',
    'fanta': 'فانتا',
    'caramel-frappe': 'فرابيه كراميل',
    'vanilla-frappe': 'فرابيه فانيلا',
    'chocolate-frappe': 'فرابيه شوكولاتة',
    'strawberry-milkshake': 'ميلك شيك فراولة',
    'vanilla-milkshake': 'ميلك شيك فانيلا',
    'chocolate-milkshake': 'ميلك شيك شوكولاتة',
    'mango-smoothie': 'سموذي مانجو',
    'berry-smoothie': 'سموذي توت',
    'green-smoothie': 'سموذي أخضر',
    'classic-mojito': 'موهيتو كلاسيكي',
    'strawberry-mojito': 'موهيتو فراولة',
    'berry-mojito': 'موهيتو توت',
    'passion-fruit-mojito': 'موهيتو فاكهة العاطفة',
    'classic-iced-tea': 'شاي مثلج كلاسيكي',
    'lemon-iced-tea': 'شاي مثلج بالليمون',
    'peach-iced-tea': 'شاي مثلج بالخوخ',
    
    // Product Names - Food
    'eggs-of-your-choice': 'بيض على اختيارك',
    'french-toast': 'توست فرنسي',
    'pancakes': 'بان كيك',
    'margherita-pizza': 'بيتزا مارغريتا',
    'pepperoni-pizza': 'بيتزا ببروني',
    'quattro-stagioni': 'كواترو ستاجيوني',
    'chicken-wings': 'أجنحة دجاج',
    'mozzarella-sticks': 'أصابع موزاريلا',
    'mexican-nachos': 'ناتشوز مكسيكي',
    'dynamite-shrimp': 'روبيان ديناميت',
    'chicken-dynamite': 'دجاج ديناميت',
    'san-sebastian-cake': 'كيك سان سيباستيان',
    'tiramisu-cake': 'كيك تيراميسو',
    'cheesecake': 'تشيز كيك',
    'kenafa-naama': 'كنافة ناعمة',
    'club-sandwich': 'ساندويتش كلوب',
    'chicken-sandwich': 'ساندويتش دجاج',
    'grilled-cheese': 'جبن مشوي',
    'spaghetti-carbonara': 'سباغيتي كاربونارا',
    'fettuccine-alfredo': 'فيتوتشيني ألفريدو',
    'risotto-mushroom': 'ريزوتو فطر',
    'caesar-salad': 'سلطة قيصر',
    'greek-salad': 'سلطة يونانية',
    'quinoa-salad': 'سلطة كينوا',
    'mushroom-soup': 'شوربة فطر',
    'tomato-soup': 'شوربة طماطم',
    'chicken-noodle-soup': 'شوربة دجاج بالشعيرية',
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