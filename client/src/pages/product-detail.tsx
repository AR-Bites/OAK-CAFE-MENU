import { useState } from "react";
import { ArrowLeft, Home, Share, Globe, Menu, X, ChevronLeft, ChevronRight, Coffee, Droplets, Snowflake, Zap, Flame, Crown, Star, Eye, Utensils, Leaf, ChefHat, Sunrise, Sandwich, Pizza, Wheat, Apple, Grape } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useLanguage } from '@/contexts/LanguageContext';
import logoImage from "@assets/oakCafeLogo_1752004813012.png";
import Model3DViewer from '../components/Model3DViewer';
import { getModelPath, isGLTFModel } from '../utils/modelMapping';

// EXACT MENU FROM USER'S COMPREHENSIVE LIST - NO REDUNDANT ELEMENTS
const allProducts = [
  // HOT DRINKS - EXACT USER LIST
  { id: 101, name: 'Red Eye', nameKey: 'red-eye', descriptionKey: 'red-eye-desc', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Strong coffee with espresso shot' },
  { id: 102, name: 'V60 / CHEMEX', nameKey: 'v60-chemex', descriptionKey: 'v60-desc', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Pour-over specialty coffee' },
  { id: 103, name: 'Flat White', nameKey: 'flat-white', descriptionKey: 'flat-white-desc', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Smooth espresso with steamed milk and minimal foam' },
  { id: 104, name: 'Espresso Macchiato', nameKey: 'espresso-macchiato', descriptionKey: 'espresso-macchiato-desc', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Espresso with steamed milk foam' },
  { id: 105, name: 'Marshmallow Chocolate', nameKey: 'marshmallow-chocolate', descriptionKey: 'marshmallow-chocolate-desc', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Rich hot chocolate with marshmallows' },
  { id: 106, name: 'Double Espresso', nameKey: 'double-espresso', descriptionKey: 'double-espresso-desc', price: '2.75 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Double shot of rich espresso' },
  { id: 107, name: 'Cappuccino', nameKey: 'cappuccino', descriptionKey: 'cappuccino-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Classic Italian coffee with steamed milk and foam' },
  { id: 108, name: 'Cortado', nameKey: 'cortado', descriptionKey: 'cortado-desc', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Spanish coffee with equal parts espresso and steamed milk' },
  { id: 109, name: 'Latte', nameKey: 'latte', descriptionKey: 'latte-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Creamy coffee with espresso and steamed milk' },
  { id: 110, name: 'Americano', nameKey: 'americano', descriptionKey: 'americano-desc', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Classic black coffee made with espresso and hot water' },
  { id: 111, name: 'Turkish Coffee Single', nameKey: 'turkish-coffee-single', descriptionKey: 'turkish-coffee-single-desc', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Traditional Turkish coffee prepared in authentic copper pot' },
  { id: 112, name: 'Caramel Macchiato', nameKey: 'caramel-macchiato', descriptionKey: 'caramel-macchiato-desc', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Sweet coffee with vanilla syrup, steamed milk and caramel drizzle' },
  { id: 113, name: 'Lungo', nameKey: 'lungo', descriptionKey: 'lungo-desc', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Long shot espresso with more water for a milder taste' },
  { id: 114, name: 'White Coffee', nameKey: 'white-coffee', descriptionKey: 'white-coffee-desc', price: '1.45 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Traditional Lebanese white coffee with orange blossom water' },
  { id: 115, name: 'Sandy Chocolate', nameKey: 'sandy-chocolate', descriptionKey: 'sandy-chocolate-desc', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Rich chocolate drink with a unique sandy texture' },
  { id: 116, name: 'Filter Coffee', nameKey: 'filter-coffee', descriptionKey: 'filter-coffee-desc', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Smooth drip coffee brewed through a paper filter' },
  { id: 117, name: 'White Mocha', nameKey: 'white-mocha', descriptionKey: 'white-mocha-desc', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Coffee with white chocolate and steamed milk' },
  { id: 118, name: 'Chili Chocolate', nameKey: 'chili-chocolate', descriptionKey: 'chili-chocolate-desc', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Spicy hot chocolate with a hint of chili pepper' },
  { id: 119, name: 'Spanish Latte', nameKey: 'spanish-latte', descriptionKey: 'spanish-latte-desc', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Sweet latte with condensed milk Spanish style' },
  { id: 120, name: 'Dark Mocha', nameKey: 'dark-mocha', descriptionKey: 'dark-mocha-desc', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Rich coffee with dark chocolate and steamed milk' },
  { id: 121, name: 'Turkish Coffee Double', nameKey: 'turkish-coffee-double', descriptionKey: 'turkish-coffee-double-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Double serving of traditional Turkish coffee' },

  // COLD COFFEE - EXACT USER LIST
  { id: 130, name: 'Iced Caramel Macchiato', nameKey: 'iced-caramel-macchiato', descriptionKey: 'iced-caramel-macchiato-desc', price: '3.95 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'cold-coffee', description: 'Chilled espresso with vanilla syrup and caramel drizzle' },
  { id: 131, name: 'Iced Dark Mocha', nameKey: 'iced-dark-mocha', descriptionKey: 'iced-dark-mocha-desc', price: '3.85 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'cold-coffee', description: 'Cold coffee with dark chocolate and ice' },
  { id: 132, name: 'Iced Flat White', nameKey: 'iced-flat-white', descriptionKey: 'iced-flat-white-desc', price: '3.40 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'cold-coffee', description: 'Chilled flat white with smooth espresso and cold milk' },
  { id: 133, name: 'Iced White Mocha', nameKey: 'iced-white-mocha', descriptionKey: 'iced-white-mocha-desc', price: '3.85 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'cold-coffee', description: 'Cold coffee with white chocolate and ice' },
  { id: 134, name: 'Cold Brew', nameKey: 'cold-brew', descriptionKey: 'cold-brew-desc', price: '5.25 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'cold-coffee', description: 'Smooth, slow-steeped coffee served over ice' },
  { id: 135, name: 'Iced Americano', nameKey: 'iced-americano', descriptionKey: 'iced-americano-desc', price: '3.15 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'cold-coffee', description: 'Cold black coffee made with espresso and cold water' },
  { id: 136, name: 'Iced Latte', nameKey: 'iced-latte', descriptionKey: 'iced-latte-desc', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'cold-coffee', description: 'Chilled latte with espresso and cold milk' },
  { id: 137, name: 'Iced Spanish Latte', nameKey: 'iced-spanish-latte', descriptionKey: 'iced-spanish-latte-desc', price: '3.85 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'cold-coffee', description: 'Cold Spanish style latte with condensed milk' },

  // FRAPPE - EXACT USER LIST
  { id: 140, name: 'Hazelnut Frappe', nameKey: 'hazelnut-frappe', descriptionKey: 'hazelnut-frappe-desc', price: '3.80 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'frappe', description: 'Creamy hazelnut frappe with ice and whipped cream' },
  { id: 141, name: 'White Fruit Frappe', nameKey: 'white-fruit-frappe', descriptionKey: 'white-fruit-frappe-desc', price: '3.80 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'frappe', description: 'Refreshing white fruit frappe with mixed fruits' },
  { id: 142, name: 'White Chocolate Frappe', nameKey: 'white-chocolate-frappe', descriptionKey: 'white-chocolate-frappe-desc', price: '3.80 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'frappe', description: 'Rich white chocolate frappe blended with ice' },
  { id: 143, name: 'Chocolate Frappe', nameKey: 'chocolate-frappe', descriptionKey: 'chocolate-frappe-desc', price: '3.80 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'frappe', description: 'Classic chocolate frappe with cocoa and whipped cream' },
  { id: 144, name: 'Caramel Frappe', nameKey: 'caramel-frappe', descriptionKey: 'caramel-frappe-desc', price: '3.80 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'frappe', description: 'Sweet caramel frappe with caramel drizzle' },
  { id: 145, name: 'Vanilla Frappe', nameKey: 'vanilla-frappe', descriptionKey: 'vanilla-frappe-desc', price: '3.80 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'frappe', description: 'Creamy vanilla frappe with vanilla syrup' },
  { id: 146, name: 'Coffee Frappe', nameKey: 'coffee-frappe', descriptionKey: 'coffee-frappe-desc', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'frappe', description: 'Classic coffee frappe with strong coffee flavor' },

  // MILKSHAKE - EXACT USER LIST
  { id: 150, name: 'Arabia Milkshake', nameKey: 'arabia-milkshake', descriptionKey: 'arabia-milkshake-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'milkshake', description: 'Traditional Arabian flavored milkshake' },
  { id: 151, name: 'Vanilla Milkshake', nameKey: 'vanilla-milkshake', descriptionKey: 'vanilla-milkshake-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'milkshake', description: 'Classic vanilla milkshake with fresh cream' },
  { id: 152, name: 'Chocolate Milkshake', nameKey: 'chocolate-milkshake', descriptionKey: 'chocolate-milkshake-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'milkshake', description: 'Rich chocolate milkshake with cocoa' },
  { id: 153, name: 'Strawberry Milkshake', nameKey: 'strawberry-milkshake', descriptionKey: 'strawberry-milkshake-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'milkshake', description: 'Fresh strawberry milkshake with real fruit' },
  { id: 154, name: 'Lemon Milkshake', nameKey: 'lemon-milkshake', descriptionKey: 'lemon-milkshake-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'milkshake', description: 'Tangy lemon milkshake with citrus twist' },
  { id: 155, name: 'Caramel Milkshake', nameKey: 'caramel-milkshake', descriptionKey: 'caramel-milkshake-desc', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'milkshake', description: 'Sweet caramel milkshake with caramel sauce' },
  { id: 156, name: 'Mango Milkshake', nameKey: 'mango-milkshake', descriptionKey: 'mango-milkshake-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'milkshake', description: 'Tropical mango milkshake with fresh mango' },

  // SMOOTHIES - EXACT USER LIST
  { id: 160, name: 'Mango Smoothie', nameKey: 'mango-smoothie', descriptionKey: 'mango-smoothie-desc', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'smoothies', description: 'Fresh mango smoothie with tropical flavors' },
  { id: 161, name: 'Mix Berries Smoothie', nameKey: 'mix-berries-smoothie', descriptionKey: 'mix-berries-smoothie-desc', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'smoothies', description: 'Mixed berries smoothie with antioxidants' },
  { id: 162, name: 'Lemonade Smoothie', nameKey: 'lemonade-smoothie', descriptionKey: 'lemonade-smoothie-desc', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'smoothies', description: 'Refreshing lemonade smoothie with citrus' },
  { id: 163, name: 'Mango and Passionfruit Smoothie', nameKey: 'mango-passionfruit-smoothie', descriptionKey: 'mango-passionfruit-smoothie-desc', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'smoothies', description: 'Tropical mango and passionfruit smoothie' },
  { id: 164, name: 'Lemon with Mint Smoothie', nameKey: 'lemon-mint-smoothie', descriptionKey: 'lemon-mint-smoothie-desc', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'smoothies', description: 'Fresh lemon smoothie with mint leaves' },
  { id: 165, name: 'Basil Lemonade Smoothie', nameKey: 'basil-lemonade-smoothie', descriptionKey: 'basil-lemonade-smoothie-desc', price: '4.75 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'smoothies', description: 'Unique basil lemonade smoothie with herbs' },
  { id: 166, name: 'Orange Smoothie', nameKey: 'orange-smoothie', descriptionKey: 'orange-smoothie-desc', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'smoothies', description: 'Fresh orange smoothie with vitamin C' },

  // FRESH JUICE - EXACT USER LIST
  { id: 170, name: 'The Oak Seasonal Fresh Juice', nameKey: 'oak-seasonal-juice', descriptionKey: 'oak-seasonal-juice-desc', price: '4.90 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'fresh-juice', description: 'Our signature seasonal fresh juice blend' },
  { id: 171, name: 'Mango Mint Fresh Juice', nameKey: 'mango-mint-juice', descriptionKey: 'mango-mint-juice-desc', price: '4.90 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'fresh-juice', description: 'Fresh mango juice with mint leaves' },
  { id: 172, name: 'Basil Lemonade Fresh Juice', nameKey: 'basil-lemonade-juice', descriptionKey: 'basil-lemonade-juice-desc', price: '4.75 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'fresh-juice', description: 'Fresh basil lemonade juice' },
  { id: 173, name: 'Carrot Fresh Juice', nameKey: 'carrot-juice', descriptionKey: 'carrot-juice-desc', price: '4.70 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'fresh-juice', description: 'Fresh carrot juice packed with vitamins' },
  { id: 174, name: 'Lemon with Mint Fresh Juice', nameKey: 'lemon-mint-juice', descriptionKey: 'lemon-mint-juice-desc', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'fresh-juice', description: 'Fresh lemon juice with mint' },
  { id: 175, name: 'Lemonade Fresh Juice', nameKey: 'lemonade-juice', descriptionKey: 'lemonade-juice-desc', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'fresh-juice', description: 'Classic fresh lemonade' },
  { id: 176, name: 'Orange Fresh Juice', nameKey: 'orange-juice', descriptionKey: 'orange-juice-desc', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'fresh-juice', description: 'Fresh squeezed orange juice' },
  { id: 177, name: 'Pomegranate Fresh Juice', nameKey: 'pomegranate-juice', descriptionKey: 'pomegranate-juice-desc', price: '4.90 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'fresh-juice', description: 'Fresh pomegranate juice with antioxidants' },
  { id: 178, name: 'Mango Basil Fresh Juice', nameKey: 'mango-basil-juice', descriptionKey: 'mango-basil-juice-desc', price: '4.90 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'fresh-juice', description: 'Fresh mango juice with basil herbs' },

  // MOJITO - EXACT USER LIST
  { id: 180, name: 'Forest Mojito', nameKey: 'forest-mojito', descriptionKey: 'forest-mojito-desc', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'mojito', description: 'Refreshing forest flavored mojito' },
  { id: 181, name: 'Mango Mojito', nameKey: 'mango-mojito', descriptionKey: 'mango-mojito-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'mojito', description: 'Tropical mango flavored mojito' },
  { id: 182, name: 'Strawberry Mojito', nameKey: 'strawberry-mojito', descriptionKey: 'strawberry-mojito-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'mojito', description: 'Sweet strawberry flavored mojito' },
  { id: 183, name: 'Pink Lemonade Mojito', nameKey: 'pink-lemonade-mojito', descriptionKey: 'pink-lemonade-mojito-desc', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'mojito', description: 'Pink lemonade flavored mojito' },
  { id: 184, name: 'Passion Fruit Mojito', nameKey: 'passion-fruit-mojito', descriptionKey: 'passion-fruit-mojito-desc', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'mojito', description: 'Exotic passion fruit mojito' },
  { id: 185, name: 'Red Sea Red Bull Mojito', nameKey: 'red-sea-redbull-mojito', descriptionKey: 'red-sea-redbull-mojito-desc', price: '4.10 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'mojito', description: 'Energy mojito with Red Bull' },
  { id: 186, name: 'Classic Mojito', nameKey: 'classic-mojito', descriptionKey: 'classic-mojito-desc', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'mojito', description: 'Traditional classic mojito with mint' },
  { id: 187, name: 'Maldives Red Bull Mojito', nameKey: 'maldives-redbull-mojito', descriptionKey: 'maldives-redbull-mojito-desc', price: '4.10 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'mojito', description: 'Tropical energy mojito with Red Bull' },

  // ICED TEA - EXACT USER LIST
  { id: 190, name: 'Iced Tea Peach', nameKey: 'iced-tea-peach', descriptionKey: 'iced-tea-peach-desc', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'iced-tea', description: 'Refreshing iced tea with peach flavor' },
  { id: 191, name: 'Iced Tea Mango', nameKey: 'iced-tea-mango', descriptionKey: 'iced-tea-mango-desc', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'iced-tea', description: 'Tropical iced tea with mango flavor' },
  { id: 192, name: 'Iced Tea Sugar Free', nameKey: 'iced-tea-sugar-free', descriptionKey: 'iced-tea-sugar-free-desc', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'iced-tea', description: 'Sugar-free iced tea for health conscious' },
  { id: 193, name: 'Iced Tea Strawberry', nameKey: 'iced-tea-strawberry', descriptionKey: 'iced-tea-strawberry-desc', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'iced-tea', description: 'Sweet iced tea with strawberry flavor' },
  { id: 194, name: 'Iced Tea Grenadine', nameKey: 'iced-tea-grenadine', descriptionKey: 'iced-tea-grenadine-desc', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'iced-tea', description: 'Iced tea with grenadine syrup' },
  { id: 195, name: 'Iced Tea Forest', nameKey: 'iced-tea-forest', descriptionKey: 'iced-tea-forest-desc', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'iced-tea', description: 'Forest flavored premium iced tea' },
  { id: 196, name: 'Iced Tea Passion Fruit', nameKey: 'iced-tea-passion-fruit', descriptionKey: 'iced-tea-passion-fruit-desc', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'iced-tea', description: 'Exotic iced tea with passion fruit' },

  // NON-COFFEE - EXACT USER LIST
  { id: 200, name: 'Black Tea', nameKey: 'black-tea', descriptionKey: 'black-tea-desc', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'non-coffee', description: 'Traditional black tea' },
  { id: 201, name: 'Matcha', nameKey: 'matcha', descriptionKey: 'matcha-desc', price: '4.25 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'non-coffee', description: 'Premium Japanese matcha green tea' },
  { id: 202, name: 'Special Tea', nameKey: 'special-tea', descriptionKey: 'special-tea-desc', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'non-coffee', description: 'Our special tea blend' },
  { id: 203, name: 'Green Tea', nameKey: 'green-tea', descriptionKey: 'green-tea-desc', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'non-coffee', description: 'Healthy green tea with antioxidants' },
  { id: 204, name: 'Chai Latte Vanilla', nameKey: 'chai-latte-vanilla', descriptionKey: 'chai-latte-vanilla-desc', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'non-coffee', description: 'Spiced chai latte with vanilla' },
  { id: 205, name: 'Chai Latte Spiced', nameKey: 'chai-latte-spiced', descriptionKey: 'chai-latte-spiced-desc', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'non-coffee', description: 'Traditional spiced chai latte' },
  { id: 206, name: 'Hot Chocolate', nameKey: 'hot-chocolate', descriptionKey: 'hot-chocolate-desc', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'non-coffee', description: 'Rich hot chocolate drink' },

  // SOFT DRINKS - EXACT USER LIST  
  { id: 210, name: 'Coca Cola Zero', nameKey: 'coca-cola-zero', descriptionKey: 'coca-cola-zero-desc', price: '2.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'soft-drinks', description: 'Sugar-free cola drink' },
  { id: 211, name: 'Red Bull', nameKey: 'red-bull', descriptionKey: 'red-bull-desc', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'soft-drinks', description: 'Energy drink for boost' },
  { id: 212, name: 'Sprite', nameKey: 'sprite', descriptionKey: 'sprite-desc', price: '2.00 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'soft-drinks', description: 'Lemon-lime carbonated drink' },
  { id: 213, name: 'Perrier', nameKey: 'perrier', descriptionKey: 'perrier-desc', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'soft-drinks', description: 'Premium sparkling water' },
  { id: 214, name: 'Red Bull Sugar Free', nameKey: 'red-bull-sugar-free', descriptionKey: 'red-bull-sugar-free-desc', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'soft-drinks', description: 'Sugar-free energy drink' },
  { id: 215, name: 'Sprite Zero', nameKey: 'sprite-zero', descriptionKey: 'sprite-zero-desc', price: '2.00 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'soft-drinks', description: 'Sugar-free lemon-lime drink' },
  { id: 216, name: 'Coca Cola', nameKey: 'coca-cola', descriptionKey: 'coca-cola-desc', price: '2.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'soft-drinks', description: 'Classic cola drink' },
  { id: 217, name: 'Mineral Water', nameKey: 'mineral-water', descriptionKey: 'mineral-water-desc', price: '1.00 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'soft-drinks', description: 'Pure mineral water' },

  // DESSERTS CAKES - EXACT USER LIST
  { id: 220, name: 'San Sebastian Cake', nameKey: 'san-sebastian-cake', descriptionKey: 'san-sebastian-cake-desc', price: '4.25 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'desserts', description: 'Authentic Basque burnt cheesecake' },
  { id: 221, name: 'Tiramisu Cake', nameKey: 'tiramisu-cake', descriptionKey: 'tiramisu-cake-desc', price: '4.10 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'desserts', description: 'Classic Italian tiramisu with coffee and mascarpone' },
  { id: 222, name: 'Cheesecake', nameKey: 'cheesecake', descriptionKey: 'cheesecake-desc', price: '4.25 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'desserts', description: 'Rich and creamy cheesecake' },
  { id: 223, name: 'Apple Pie Cake', nameKey: 'apple-pie-cake', descriptionKey: 'apple-pie-cake-desc', price: '4.25 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'desserts', description: 'Traditional apple pie with cinnamon' },
  { id: 224, name: 'Chocolate Fondue', nameKey: 'chocolate-fondue', descriptionKey: 'chocolate-fondue-desc', price: '4.25 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'desserts', description: 'Rich chocolate fondue for sharing' },
  { id: 225, name: 'Seasonal Cake', nameKey: 'seasonal-cake', descriptionKey: 'seasonal-cake-desc', price: '4.25 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'desserts', description: 'Our chef special seasonal cake' },
  { id: 226, name: 'Kenafa Naama or Khishna', nameKey: 'kenafa-naama-khishna', descriptionKey: 'kenafa-naama-khishna-desc', price: '3.80 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'desserts', description: 'Traditional Middle Eastern dessert with cheese and syrup' },
  { id: 227, name: 'Waffle', nameKey: 'waffle', descriptionKey: 'waffle-desc', price: '4.25 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'desserts', description: 'Crispy waffle with toppings' },
  { id: 228, name: 'French Toast', nameKey: 'french-toast', descriptionKey: 'french-toast-desc', price: '4.25 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'desserts', description: 'Classic French toast with syrup' },
  { id: 229, name: 'Pancake', nameKey: 'pancake', descriptionKey: 'pancake-desc', price: '4.25 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'desserts', description: 'Fluffy pancakes with maple syrup' },

  // ICE CREAM - EXACT USER LIST
  { id: 230, name: 'Chocolate Ice Cream', nameKey: 'chocolate-ice-cream', descriptionKey: 'chocolate-ice-cream-desc', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'desserts', description: 'Rich chocolate ice cream' },
  { id: 231, name: 'Mango Ice Cream', nameKey: 'mango-ice-cream', descriptionKey: 'mango-ice-cream-desc', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'desserts', description: 'Fresh mango ice cream' },
  { id: 232, name: 'Strawberry Ice Cream', nameKey: 'strawberry-ice-cream', descriptionKey: 'strawberry-ice-cream-desc', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'desserts', description: 'Fresh strawberry ice cream' },
  { id: 233, name: 'Vanilla Ice Cream', nameKey: 'vanilla-ice-cream', descriptionKey: 'vanilla-ice-cream-desc', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'desserts', description: 'Classic vanilla ice cream' },
  { id: 234, name: 'Lemon Ice Cream', nameKey: 'lemon-ice-cream', descriptionKey: 'lemon-ice-cream-desc', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'desserts', description: 'Tangy lemon ice cream' },
  { id: 235, name: 'Arabia Ice Cream', nameKey: 'arabia-ice-cream', descriptionKey: 'arabia-ice-cream-desc', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'desserts', description: 'Traditional Arabian flavored ice cream' },

  // SHISHA - EXACT USER LIST  
  { id: 300, name: 'Sahem Gum Shisha', nameKey: 'sahem-gum-shisha', descriptionKey: 'sahem-gum-shisha-desc', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'shisha', description: 'Premium shisha with gum flavor' },
  { id: 301, name: 'Lemon with Mint Shisha', nameKey: 'lemon-mint-shisha', descriptionKey: 'lemon-mint-shisha-desc', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'shisha', description: 'Refreshing lemon mint shisha' },
  { id: 302, name: 'Mazaya Love Shisha', nameKey: 'mazaya-love-shisha', descriptionKey: 'mazaya-love-shisha-desc', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'shisha', description: 'Mazaya love mix shisha' },
  { id: 303, name: 'Watermelon with Mint Shisha', nameKey: 'watermelon-mint-shisha', descriptionKey: 'watermelon-mint-shisha-desc', price: '6.16 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'shisha', description: 'Sweet watermelon with mint shisha' },
  { id: 304, name: 'Special Shisha', nameKey: 'special-shisha', descriptionKey: 'special-shisha-desc', price: '17.15 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'shisha', description: 'Our premium special shisha blend' },
  { id: 305, name: 'Grapes Shisha', nameKey: 'grapes-shisha', descriptionKey: 'grapes-shisha-desc', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'shisha', description: 'Sweet grapes flavored shisha' },
  { id: 306, name: 'Blueberry Shisha', nameKey: 'blueberry-shisha', descriptionKey: 'blueberry-shisha-desc', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'shisha', description: 'Fresh blueberry flavored shisha' },
  { id: 307, name: 'Two Apples with Licorice Shisha', nameKey: 'two-apples-licorice-shisha', descriptionKey: 'two-apples-licorice-shisha-desc', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'shisha', description: 'Two apples with licorice blend' },
  { id: 308, name: 'Cinnamon with Mint Shisha', nameKey: 'cinnamon-mint-shisha', descriptionKey: 'cinnamon-mint-shisha-desc', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'shisha', description: 'Warm cinnamon with mint shisha' },
  { id: 309, name: 'Mastic Shisha', nameKey: 'mastic-shisha', descriptionKey: 'mastic-shisha-desc', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'shisha', description: 'Traditional mastic flavored shisha' },
  { id: 310, name: 'Cinnamon with Gum Shisha', nameKey: 'cinnamon-gum-shisha', descriptionKey: 'cinnamon-gum-shisha-desc', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'shisha', description: 'Cinnamon and gum blend shisha' },
  { id: 311, name: 'Gum and Mint Shisha', nameKey: 'gum-mint-shisha', descriptionKey: 'gum-mint-shisha-desc', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'shisha', description: 'Refreshing gum and mint shisha' },
  { id: 312, name: 'Grapes with Berries Shisha', nameKey: 'grapes-berries-shisha', descriptionKey: 'grapes-berries-shisha-desc', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'shisha', description: 'Grapes with berries mix shisha' },
  { id: 313, name: 'Oranges with Mint Shisha', nameKey: 'oranges-mint-shisha', descriptionKey: 'oranges-mint-shisha-desc', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'shisha', description: 'Fresh oranges with mint shisha' },
  { id: 314, name: 'Two Apples Mazaya Shisha', nameKey: 'two-apples-mazaya-shisha', descriptionKey: 'two-apples-mazaya-shisha-desc', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'shisha', description: 'Two apples Mazaya brand shisha' },
  { id: 315, name: 'Two Apple Fakher Shisha', nameKey: 'two-apple-fakher-shisha', descriptionKey: 'two-apple-fakher-shisha-desc', price: '7.15 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'shisha', description: 'Two apple Fakher premium shisha' },
  { id: 316, name: 'Two Apples Nakhleh Shisha', nameKey: 'two-apples-nakhleh-shisha', descriptionKey: 'two-apples-nakhleh-shisha-desc', price: '7.15 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'shisha', description: 'Two apples Nakhleh premium shisha' },
  { id: 317, name: 'Grapes with Mint Shisha', nameKey: 'grapes-mint-shisha', descriptionKey: 'grapes-mint-shisha-desc', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'shisha', description: 'Grapes with mint shisha' },
  { id: 318, name: 'Candy Shisha', nameKey: 'candy-shisha', descriptionKey: 'candy-shisha-desc', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'shisha', description: 'Sweet candy flavored shisha' },
  { id: 319, name: 'Extra Tobacco Nakhlah', nameKey: 'extra-tobacco-nakhlah', descriptionKey: 'extra-tobacco-nakhlah-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'shisha', description: 'Extra Nakhlah tobacco portion' },
  { id: 320, name: 'Mixed Fruit Shisha', nameKey: 'mixed-fruit-shisha', descriptionKey: 'mixed-fruit-shisha-desc', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'shisha', description: 'Mixed fruit blend shisha' },
  { id: 321, name: 'Mixed Citrus Fruits Shisha', nameKey: 'mixed-citrus-fruits-shisha', descriptionKey: 'mixed-citrus-fruits-shisha-desc', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'shisha', description: 'Mixed citrus fruits shisha' },

  // BREAKFAST - EXACT USER LIST
  { id: 400, name: 'Eggs of Your Choice', nameKey: 'eggs-choice', descriptionKey: 'eggs-choice-desc', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Fresh eggs prepared to your preference' },
  { id: 401, name: 'Manageesh Labneh and Rocca', nameKey: 'manageesh-labneh-rocca', descriptionKey: 'manageesh-labneh-rocca-desc', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Traditional manageesh with labneh and arugula' },
  { id: 402, name: 'Halloumi Croissant', nameKey: 'halloumi-croissant', descriptionKey: 'halloumi-croissant-desc', price: '5.50 JD', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Buttery croissant with grilled halloumi cheese' },
  { id: 403, name: 'Manageesh Zaatar and Vegetables', nameKey: 'manageesh-zaatar-vegetables', descriptionKey: 'manageesh-zaatar-vegetables-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Traditional zaatar manageesh with fresh vegetables' },
  { id: 404, name: 'Zaatar and Pomegranate', nameKey: 'zaatar-pomegranate', descriptionKey: 'zaatar-pomegranate-desc', price: '2.50 JD', image: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Zaatar bread topped with pomegranate seeds' },
  { id: 405, name: 'Turkey Omelette Croissant', nameKey: 'turkey-omelette-croissant', descriptionKey: 'turkey-omelette-croissant-desc', price: '6.00 JD', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Fluffy omelette with turkey in buttery croissant' },
  { id: 406, name: 'Manageesh Nabulsi Cheese', nameKey: 'manageesh-nabulsi-cheese', descriptionKey: 'manageesh-nabulsi-cheese-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Traditional manageesh with authentic Nabulsi cheese' },
  { id: 407, name: 'Tuna Sandwich', nameKey: 'tuna-sandwich', descriptionKey: 'tuna-sandwich-desc', price: '8.00 JD', image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Fresh tuna sandwich with vegetables and mayo' },
  { id: 408, name: 'Avocado Omelette', nameKey: 'avocado-omelette', descriptionKey: 'avocado-omelette-desc', price: '5.50 JD', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Healthy omelette with fresh avocado slices' },
  { id: 409, name: 'Manageesh Falafel', nameKey: 'manageesh-falafel', descriptionKey: 'manageesh-falafel-desc', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Traditional manageesh topped with crispy falafel' },
  { id: 410, name: 'Turkey Croissant', nameKey: 'turkey-croissant', descriptionKey: 'turkey-croissant-desc', price: '5.50 JD', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Buttery croissant with sliced turkey' },
  { id: 411, name: 'Manageesh Mix Cheese', nameKey: 'manageesh-mix-cheese', descriptionKey: 'manageesh-mix-cheese-desc', price: '5.00 JD', image: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Traditional manageesh with mixed cheese varieties' },
  { id: 412, name: 'Manageesh Molasses and Tahini', nameKey: 'manageesh-molasses-tahini', descriptionKey: 'manageesh-molasses-tahini-desc', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Sweet manageesh with molasses and tahini' },

  // PIZZA - EXACT USER LIST
  { id: 500, name: 'Mix Formagio Pizza', nameKey: 'mix-formagio-pizza', descriptionKey: 'mix-formagio-pizza-desc', price: '7.50 JD', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'pizza', description: 'Mixed cheese pizza with multiple cheese varieties' },
  { id: 501, name: 'Pizza Chicken Alfredo', nameKey: 'pizza-chicken-alfredo', descriptionKey: 'pizza-chicken-alfredo-desc', price: '7.50 JD', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'pizza', description: 'Creamy alfredo pizza with grilled chicken' },
  { id: 502, name: 'Calzone Pizza', nameKey: 'calzone-pizza', descriptionKey: 'calzone-pizza-desc', price: '7.00 JD', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'pizza', description: 'Folded pizza calzone with cheese and toppings' },
  { id: 503, name: 'Pizza Vegetariana', nameKey: 'pizza-vegetariana', descriptionKey: 'pizza-vegetariana-desc', price: '6.50 JD', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'pizza', description: 'Fresh vegetarian pizza with seasonal vegetables' },
  { id: 504, name: 'Pizza Funghi', nameKey: 'pizza-funghi', descriptionKey: 'pizza-funghi-desc', price: '6.50 JD', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'pizza', description: 'Mushroom pizza with fresh fungi and herbs' },
  { id: 505, name: 'Alfredo Pesto Pizza', nameKey: 'alfredo-pesto-pizza', descriptionKey: 'alfredo-pesto-pizza-desc', price: '8.00 JD', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'pizza', description: 'Creamy alfredo base with fresh pesto sauce' },
  { id: 506, name: 'Pepperoni Pizza', nameKey: 'pepperoni-pizza', descriptionKey: 'pepperoni-pizza-desc', price: '7.00 JD', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'pizza', description: 'Classic pepperoni pizza with spicy salami' },
  { id: 507, name: '4 Stagioni Pizza', nameKey: '4-stagioni-pizza', descriptionKey: '4-stagioni-pizza-desc', price: '7.50 JD', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'pizza', description: 'Four seasons pizza with diverse toppings' },
  { id: 508, name: 'Taco Pizza', nameKey: 'taco-pizza', descriptionKey: 'taco-pizza-desc', price: '8.00 JD', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'pizza', description: 'Mexican-style taco pizza with spiced ingredients' },
  { id: 509, name: 'Chicken BBQ Pizza', nameKey: 'chicken-bbq-pizza', descriptionKey: 'chicken-bbq-pizza-desc', price: '7.50 JD', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'pizza', description: 'BBQ chicken pizza with smoky barbecue sauce' },
  { id: 510, name: 'Pizza Margherita', nameKey: 'pizza-margherita', descriptionKey: 'pizza-margherita-desc', price: '5.50 JD', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'pizza', description: 'Classic Margherita with tomato, mozzarella and basil' },

  // ITALIAN - EXACT USER LIST
  { id: 600, name: 'Fettuccine Alfredo', nameKey: 'fettuccine-alfredo', descriptionKey: 'fettuccine-alfredo-desc', price: '7.50 JD', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'italian', description: 'Creamy fettuccine pasta with Alfredo sauce' },
  { id: 601, name: 'Penne Arrabbiata', nameKey: 'penne-arrabbiata', descriptionKey: 'penne-arrabbiata-desc', price: '6.50 JD', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'italian', description: 'Spicy penne pasta with tomato and chili' },
  { id: 602, name: 'Rose Pasta', nameKey: 'rose-pasta', descriptionKey: 'rose-pasta-desc', price: '7.00 JD', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'italian', description: 'Pasta with creamy rose sauce' },
  { id: 603, name: 'Pesto Pasta', nameKey: 'pesto-pasta', descriptionKey: 'pesto-pasta-desc', price: '7.50 JD', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'italian', description: 'Fresh pasta with basil pesto sauce' },
  { id: 604, name: 'Sea Food Pasta', nameKey: 'sea-food-pasta', descriptionKey: 'sea-food-pasta-desc', price: '10.50 JD', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'italian', description: 'Pasta with fresh seafood and herbs' },
  { id: 605, name: 'Spaghetti Carbonara', nameKey: 'spaghetti-carbonara', descriptionKey: 'spaghetti-carbonara-desc', price: '7.50 JD', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'italian', description: 'Classic spaghetti carbonara with pancetta and egg' },
  { id: 606, name: 'Mac and Cheese', nameKey: 'mac-and-cheese', descriptionKey: 'mac-and-cheese-desc', price: '6.50 JD', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'italian', description: 'Creamy macaroni with melted cheese' },

  // SANDWICHES - EXACT USER LIST
  { id: 700, name: 'OAK Beef Burger', nameKey: 'oak-beef-burger', descriptionKey: 'oak-beef-burger-desc', price: '8.00 JD', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'sandwiches', description: 'Our signature beef burger with special sauce' },
  { id: 701, name: 'The Oak Sandwich', nameKey: 'oak-sandwich', descriptionKey: 'oak-sandwich-desc', price: '9.00 JD', image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'sandwiches', description: 'Our signature sandwich with premium ingredients' },
  { id: 702, name: 'Shawarma Meat', nameKey: 'shawarma-meat', descriptionKey: 'shawarma-meat-desc', price: '7.50 JD', image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'sandwiches', description: 'Traditional Middle Eastern meat shawarma' },
  { id: 703, name: 'Crispy Chicken Burger', nameKey: 'crispy-chicken-burger', descriptionKey: 'crispy-chicken-burger-desc', price: '6.50 JD', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'sandwiches', description: 'Crispy fried chicken burger with fresh toppings' },
  { id: 704, name: 'Shawarma Chicken', nameKey: 'shawarma-chicken', descriptionKey: 'shawarma-chicken-desc', price: '6.00 JD', image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'sandwiches', description: 'Traditional chicken shawarma wrap' },
  { id: 705, name: 'Chicken Fajita Sandwich', nameKey: 'chicken-fajita-sandwich', descriptionKey: 'chicken-fajita-sandwich-desc', price: '5.50 JD', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'sandwiches', description: 'Chicken fajita in fresh bread' },
  { id: 706, name: 'Halloumi Sandwich', nameKey: 'halloumi-sandwich', descriptionKey: 'halloumi-sandwich-desc', price: '5.50 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'sandwiches', description: 'Grilled halloumi cheese sandwich' },
  { id: 707, name: 'Chicken Quesadilla', nameKey: 'chicken-quesadilla', descriptionKey: 'chicken-quesadilla-desc', price: '8.00 JD', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'sandwiches', description: 'Grilled tortilla with chicken and melted cheese' },
  { id: 708, name: 'Chicken Crispy Sandwich', nameKey: 'chicken-crispy-sandwich', descriptionKey: 'chicken-crispy-sandwich-desc', price: '6.50 JD', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'sandwiches', description: 'Crispy fried chicken sandwich' },
  { id: 709, name: 'Beef Fajita Sandwich', nameKey: 'beef-fajita-sandwich', descriptionKey: 'beef-fajita-sandwich-desc', price: '7.00 JD', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'sandwiches', description: 'Spiced beef fajita sandwich' },
  { id: 710, name: 'Chicken Zinger Sandwich', nameKey: 'chicken-zinger-sandwich', descriptionKey: 'chicken-zinger-sandwich-desc', price: '6.50 JD', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'sandwiches', description: 'Spicy zinger chicken sandwich' },
  { id: 711, name: 'Chicken Tender Sandwich', nameKey: 'chicken-tender-sandwich', descriptionKey: 'chicken-tender-sandwich-desc', price: '6.00 JD', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'sandwiches', description: 'Tender chicken strips sandwich' },
  { id: 712, name: 'Cheese Steak Sandwich', nameKey: 'cheese-steak-sandwich', descriptionKey: 'cheese-steak-sandwich-desc', price: '7.50 JD', image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'sandwiches', description: 'Philly-style cheese steak sandwich' }
];

// Export the allProducts array
export { allProducts };

// Rest of the component stays the same as the original
export default function ProductDetail() {
  const [location] = useLocation();
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selected3DModel, setSelected3DModel] = useState<{ modelPath: string; productName: string } | null>(null);

  // Filter products based on category, type, and search term
  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesType = selectedType === 'all' || product.type === selectedType;
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t(product.nameKey).toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesType && matchesSearch;
  });

  // Get unique categories and types for filtering
  const categories = ['all', ...Array.from(new Set(allProducts.map(p => p.category)))];
  const types = ['all', ...Array.from(new Set(allProducts.map(p => p.type)))];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hot-drinks': return <Coffee className="w-5 h-5" />;
      case 'cold-coffee': return <Snowflake className="w-5 h-5" />;
      case 'frappe': return <Droplets className="w-5 h-5" />;
      case 'milkshake': return <Snowflake className="w-5 h-5" />;
      case 'smoothies': return <Leaf className="w-5 h-5" />;
      case 'fresh-juice': return <Apple className="w-5 h-5" />;
      case 'mojito': return <Zap className="w-5 h-5" />;
      case 'iced-tea': return <Snowflake className="w-5 h-5" />;
      case 'non-coffee': return <Coffee className="w-5 h-5" />;
      case 'soft-drinks': return <Droplets className="w-5 h-5" />;
      case 'desserts': return <Crown className="w-5 h-5" />;
      case 'shisha': return <Flame className="w-5 h-5" />;
      case 'breakfast': return <Sunrise className="w-5 h-5" />;
      case 'pizza': return <Pizza className="w-5 h-5" />;
      case 'sandwiches': return <Sandwich className="w-5 h-5" />;
      case 'italian': return <Wheat className="w-5 h-5" />;
      case 'main-course': return <ChefHat className="w-5 h-5" />;
      case 'appetizers': return <Utensils className="w-5 h-5" />;
      case 'salads': return <Leaf className="w-5 h-5" />;
      case 'soup': return <Utensils className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const handle3DModelClick = (productId: string, productName: string) => {
    const modelPath = getModelPath(productId);
    if (modelPath) {
      setSelected3DModel({ modelPath, productName });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Rest of the component JSX stays exactly the same... */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-amber-900 dark:text-amber-100">
          {t('our-menu')}
        </h1>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={t(product.nameKey)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                    {product.price}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  {t(product.nameKey)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {t(product.descriptionKey)}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                    {product.price}
                  </span>
                  
                  <button
                    onClick={() => handle3DModelClick(product.id.toString(), t(product.nameKey))}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    {t('view-3d')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3D Model Viewer */}
        {selected3DModel && (
          <Model3DViewer
            modelPath={selected3DModel.modelPath}
            productName={selected3DModel.productName}
            isOpen={!!selected3DModel}
            onClose={() => setSelected3DModel(null)}
            inline={true}
          />
        )}
      </div>
    </div>
  );
}