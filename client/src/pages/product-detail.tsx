import { useState } from "react";
import { ArrowLeft, Home, Share, Globe, Menu, X, ChevronLeft, ChevronRight, Coffee, Droplets, Snowflake, Zap, Flame, Crown, Star, Eye } from "lucide-react";
import { Link, useParams } from "wouter";
import { useLanguage } from '@/contexts/LanguageContext';
import logoImage from "@assets/oakCafeLogo_1752004813012.png";
import Model3DViewer from '../components/Model3DViewer';
import { getModelPath, isGLTFModel } from '../utils/modelMapping';

// All products with unique IDs - UPDATED TO MATCH BEVERAGES MENU
const allProducts = [
  // Hot Drinks - Complete menu from beverages.tsx
  { id: 101, name: 'Red Eye', nameKey: 'red-eye', descriptionKey: 'red-eye-desc', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Strong coffee with espresso shot' },
  { id: 102, name: 'V60 / CHEMEX', nameKey: 'v60-chemex', descriptionKey: 'v60-desc', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Pour-over specialty coffee' },
  { id: 103, name: 'Flat White', nameKey: 'flat-white', descriptionKey: 'flat-white-desc', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Smooth espresso with steamed milk and minimal foam' },
  { id: 104, name: 'Espresso Macchiato', nameKey: 'espresso-macchiato', descriptionKey: 'espresso-macchiato-desc', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Espresso with steamed milk foam' },
  { id: 105, name: 'Marshmallow Chocolate', nameKey: 'marshmallow-chocolate', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Rich hot chocolate with marshmallows' },
  { id: 111, name: 'Double Espresso', nameKey: 'double-espresso', price: '2.75 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Double shot of rich espresso for the ultimate coffee experience' },
  { id: 112, name: 'Cappuccino', nameKey: 'cappuccino', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Classic Italian coffee with steamed milk and foam' },
  { id: 113, name: 'Cortado', nameKey: 'cortado', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Spanish coffee with equal parts espresso and steamed milk' },
  { id: 114, name: 'Latte', nameKey: 'latte', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Creamy coffee with espresso and steamed milk' },
  { id: 115, name: 'Americano', nameKey: 'americano', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Classic black coffee made with espresso and hot water' },
  { id: 106, name: 'Turkish Coffee Single', nameKey: 'turkish-coffee-single', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Traditional Turkish coffee prepared in authentic copper pot' },
  { id: 601, name: 'Caramel Macchiato', nameKey: 'caramel-macchiato', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Sweet coffee with vanilla syrup, steamed milk and caramel drizzle' },
  { id: 602, name: 'Lungo', nameKey: 'lungo', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Long shot espresso with more water for a milder taste' },
  { id: 603, name: 'White Coffee', nameKey: 'white-coffee', price: '1.45 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Traditional Lebanese white coffee with orange blossom water' },
  { id: 604, name: 'Sandy Chocolate', nameKey: 'sandy-chocolate', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Rich chocolate drink with a unique sandy texture' },
  { id: 605, name: 'Filter Coffee', nameKey: 'filter-coffee', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Smooth drip coffee brewed through a paper filter' },
  { id: 606, name: 'White Mocha', nameKey: 'white-mocha', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Coffee with white chocolate and steamed milk' },
  { id: 607, name: 'Chili Chocolate', nameKey: 'chili-chocolate', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Spicy hot chocolate with a hint of chili pepper' },
  { id: 608, name: 'Spanish Latte', nameKey: 'spanish-latte', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Sweet latte with condensed milk Spanish style' },
  { id: 609, name: 'Dark Mocha', nameKey: 'dark-mocha', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Rich coffee with dark chocolate and steamed milk' },
  { id: 116, name: 'Turkish Coffee Double', nameKey: 'turkish-coffee-double', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'hot-drinks', description: 'Double serving of traditional Turkish coffee' },
  
  // Cold Coffee
  { id: 107, name: 'Iced Caramel Macchiato', nameKey: 'iced-caramel-macchiato', price: '3.95 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'cold-coffee', description: 'Chilled espresso with vanilla syrup, steamed milk and caramel drizzle' },
  { id: 117, name: 'Iced Dark Mocha', nameKey: 'iced-dark-mocha', price: '3.85 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'cold-coffee', description: 'Cold coffee with dark chocolate and ice' },
  { id: 610, name: 'Iced Flat White', nameKey: 'iced-flat-white', price: '3.40 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'cold-coffee', description: 'Chilled flat white with smooth espresso and cold milk' },
  { id: 611, name: 'Iced White Mocha', nameKey: 'iced-white-mocha', price: '3.85 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'cold-coffee', description: 'Cold coffee with white chocolate and ice' },
  { id: 108, name: 'Cold Brew', nameKey: 'cold-brew', price: '5.25 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'cold-coffee', description: 'Smooth, slow-steeped coffee served over ice for maximum flavor' },
  { id: 118, name: 'Iced Americano', nameKey: 'iced-americano', price: '3.15 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'cold-coffee', description: 'Cold black coffee made with espresso and cold water' },
  { id: 612, name: 'Iced Latte', nameKey: 'iced-latte', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'cold-coffee', description: 'Chilled latte with espresso and cold milk' },
  { id: 613, name: 'Iced Spanish Latte', nameKey: 'iced-spanish-latte', price: '3.85 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'cold-coffee', description: 'Cold Spanish style latte with condensed milk' },

  // Fresh Juice
  { id: 109, name: 'The Oak Seasonal Fresh Juice', nameKey: 'oak-seasonal-juice', price: '4.90 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'fresh-juice', description: 'Our signature seasonal blend of the freshest fruits available' },
  { id: 119, name: 'Mango Mint Juice', nameKey: 'mango-mint-juice', price: '4.90 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'fresh-juice', description: 'Fresh mango juice with mint leaves' },
  { id: 635, name: 'Basil Lemonade Juice', nameKey: 'basil-lemonade-juice', price: '4.75 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'fresh-juice', description: 'Refreshing lemonade with fresh basil' },
  { id: 636, name: 'Carrot Juice', nameKey: 'carrot-juice', price: '4.70 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'fresh-juice', description: 'Fresh carrot juice packed with vitamins' },
  { id: 637, name: 'Lemon with Mint Juice', nameKey: 'lemon-mint-juice', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'fresh-juice', description: 'Fresh lemon juice with mint' },
  { id: 638, name: 'Lemonade Juice', nameKey: 'lemonade-juice', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'fresh-juice', description: 'Classic fresh lemonade' },
  { id: 120, name: 'Orange Juice', nameKey: 'orange-juice', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'fresh-juice', description: 'Fresh squeezed orange juice' },
  { id: 110, name: 'Pomegranate Juice', nameKey: 'pomegranate-juice', price: '4.90 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'fresh-juice', description: 'Fresh pomegranate juice packed with antioxidants' },
  { id: 639, name: 'Mango Basil Juice', nameKey: 'mango-basil-juice', price: '4.90 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'fresh-juice', description: 'Fresh mango juice with basil leaves' },
  
  // Frappe
  { id: 614, name: 'Hazelnut Frappe', nameKey: 'hazelnut-frappe', price: '3.80 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'frappe', description: 'Creamy hazelnut frappe with ice and whipped cream' },
  { id: 615, name: 'White Fruit Frappe', nameKey: 'white-fruit-frappe', price: '3.80 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'frappe', description: 'Refreshing white fruit frappe with mixed fruits' },
  { id: 616, name: 'White Chocolate Frappe', nameKey: 'white-chocolate-frappe', price: '3.80 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'frappe', description: 'Rich white chocolate frappe blended with ice' },
  { id: 617, name: 'Chocolate Frappe', nameKey: 'chocolate-frappe', price: '3.80 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'frappe', description: 'Classic chocolate frappe with cocoa and whipped cream' },
  { id: 618, name: 'Caramel Frappe', nameKey: 'caramel-frappe', price: '3.80 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'frappe', description: 'Sweet caramel frappe with caramel drizzle' },
  { id: 619, name: 'Vanilla Frappe', nameKey: 'vanilla-frappe', price: '3.80 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'frappe', description: 'Creamy vanilla frappe with vanilla syrup' },
  { id: 620, name: 'Coffee Frappe', nameKey: 'coffee-frappe', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'frappe', description: 'Classic coffee frappe with strong coffee flavor' },

  // Milkshake  
  { id: 621, name: 'Arabia Milkshake', nameKey: 'arabia-milkshake', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'milkshake', description: 'Special Arabia flavored milkshake' },
  { id: 622, name: 'Vanilla Milkshake', nameKey: 'vanilla-milkshake', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'milkshake', description: 'Classic vanilla milkshake with premium ice cream' },
  { id: 623, name: 'Chocolate Milkshake', nameKey: 'chocolate-milkshake', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'milkshake', description: 'Rich chocolate milkshake with chocolate ice cream' },
  { id: 624, name: 'Strawberry Milkshake', nameKey: 'strawberry-milkshake', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'milkshake', description: 'Fresh strawberry milkshake with real fruit' },
  { id: 625, name: 'Lemon Milkshake', nameKey: 'lemon-milkshake', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'milkshake', description: 'Refreshing lemon milkshake with citrus zing' },
  { id: 626, name: 'Caramel Milkshake', nameKey: 'caramel-milkshake', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'milkshake', description: 'Sweet caramel milkshake with caramel sauce' },
  { id: 627, name: 'Mango Milkshake', nameKey: 'mango-milkshake', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'milkshake', description: 'Tropical mango milkshake with fresh mango' },

  // Smoothies
  { id: 628, name: 'Mango Smoothie', nameKey: 'mango-smoothie', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'smoothies', description: 'Fresh mango smoothie with tropical flavor' },
  { id: 629, name: 'Mix Berries Smoothie', nameKey: 'mix-berries-smoothie', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'smoothies', description: 'Mixed berries smoothie packed with antioxidants' },
  { id: 630, name: 'Lemonade Smoothie', nameKey: 'lemonade-smoothie', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'smoothies', description: 'Refreshing lemonade smoothie with citrus kick' },
  { id: 631, name: 'Mango and Passionfruit Smoothie', nameKey: 'mango-passionfruit-smoothie', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'smoothies', description: 'Tropical blend of mango and passionfruit' },
  { id: 632, name: 'Lemon with Mint Smoothie', nameKey: 'lemon-mint-smoothie', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'smoothies', description: 'Refreshing lemon and mint smoothie' },
  { id: 633, name: 'Basil Lemonade Smoothie', nameKey: 'basil-lemonade-smoothie', price: '4.75 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'smoothies', description: 'Unique basil lemonade smoothie with herbal notes' },
  { id: 634, name: 'Orange Smoothie', nameKey: 'orange-smoothie', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'smoothies', description: 'Fresh orange smoothie with vitamin C' },

  // Mojito
  { id: 640, name: 'Forest Mojito', nameKey: 'forest-mojito', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'mojito', description: 'Refreshing forest-themed mojito with herbs' },
  { id: 641, name: 'Mango Mojito', nameKey: 'mango-mojito', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'mojito', description: 'Tropical mango mojito with fresh fruit' },
  { id: 642, name: 'Classic Mojito', nameKey: 'classic-mojito', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'mojito', description: 'Traditional mojito with mint and lime' },
  { id: 643, name: 'Strawberry Mojito', nameKey: 'strawberry-mojito', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'mojito', description: 'Sweet strawberry mojito with fresh berries' },
  { id: 644, name: 'Pink Lemonade', nameKey: 'pink-lemonade', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'mojito', description: 'Refreshing pink lemonade with citrus flavor' },
  { id: 645, name: 'Red Sea Red Bull', nameKey: 'red-sea-redbull', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'mojito', description: 'Energizing Red Sea Red Bull mix' },
  { id: 646, name: 'Maldives Red Bull', nameKey: 'maldives-redbull', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'mojito', description: 'Tropical Maldives Red Bull blend' },
  { id: 647, name: 'Passion Fruit Mojito', nameKey: 'passion-fruit-mojito', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'mojito', description: 'Exotic passion fruit mojito' },

  // Iced Tea
  { id: 648, name: 'Ice Tea Peach', nameKey: 'ice-tea-peach', price: '3.45 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'iced-tea', description: 'Refreshing peach iced tea' },
  { id: 649, name: 'Iced Tea Mango', nameKey: 'iced-tea-mango', price: '3.45 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'iced-tea', description: 'Tropical mango iced tea' },
  { id: 650, name: 'Iced Tea Sugar Free', nameKey: 'iced-tea-sugar-free', price: '3.45 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'iced-tea', description: 'Sugar-free iced tea option' },
  { id: 651, name: 'Iced Tea Strawberry', nameKey: 'iced-tea-strawberry', price: '3.45 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'iced-tea', description: 'Sweet strawberry iced tea' },
  { id: 652, name: 'Iced Tea Grenadine', nameKey: 'iced-tea-grenadine', price: '3.45 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'iced-tea', description: 'Iced tea with grenadine syrup' },
  { id: 653, name: 'Ice Tea Forest', nameKey: 'ice-tea-forest', price: '3.45 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'iced-tea', description: 'Forest-themed herbal iced tea' },
  { id: 654, name: 'Ice Tea Passion Fruit', nameKey: 'ice-tea-passion-fruit', price: '3.45 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'iced-tea', description: 'Exotic passion fruit iced tea' },

  // Non-Coffee
  { id: 655, name: 'Black Tea', nameKey: 'black-tea', price: '1.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'non-coffee', description: 'Classic black tea' },
  { id: 656, name: 'Matcha', nameKey: 'matcha', price: '3.95 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'non-coffee', description: 'Premium Japanese matcha tea' },
  { id: 657, name: 'Special Tea', nameKey: 'special-tea', price: '2.25 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'non-coffee', description: 'House special tea blend' },
  { id: 658, name: 'Green Tea', nameKey: 'green-tea', price: '1.95 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'non-coffee', description: 'Fresh green tea' },
  { id: 659, name: 'Chai Latte Vanilla', nameKey: 'chai-latte-vanilla', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'non-coffee', description: 'Spiced chai latte with vanilla' },
  { id: 660, name: 'Chai Latte Spiced', nameKey: 'chai-latte-spiced', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'non-coffee', description: 'Traditional spiced chai latte' },
  { id: 661, name: 'Hot Chocolate', nameKey: 'hot-chocolate', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'non-coffee', description: 'Rich hot chocolate' },

  // Soft Drinks
  { id: 662, name: 'Coca Cola', nameKey: 'coca-cola', price: '1.50 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'soft-drinks', description: 'Classic Coca Cola' },
  { id: 663, name: 'Coca Cola Zero', nameKey: 'coca-cola-zero', price: '1.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'soft-drinks', description: 'Zero calorie Coca Cola' },
  { id: 664, name: 'Sprite', nameKey: 'sprite', price: '1.50 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'soft-drinks', description: 'Refreshing lemon-lime soda' },
  { id: 665, name: 'Red Bull', nameKey: 'red-bull', price: '3.95 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'soft-drinks', description: 'Energy drink' },
  { id: 666, name: 'Red Bull Sugar Free', nameKey: 'redbull-sugar-free', price: '3.95 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'soft-drinks', description: 'Sugar-free energy drink' },
  { id: 667, name: 'Sprite Zero', nameKey: 'sprite-zero', price: '1.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'soft-drinks', description: 'Zero calorie lemon-lime soda' },
  { id: 668, name: 'Perrier', nameKey: 'perrier', price: '2.25 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'soft-drinks', description: 'Premium sparkling water' },
  { id: 669, name: 'Mineral Water', nameKey: 'mineral-water', price: '1.00 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'beverage', category: 'soft-drinks', description: 'Natural mineral water' },
  
  // Food (IDs 200-299)
  // Breakfast - COMPLETE MENU
  { id: 201, name: 'Eggs of Your Choice', nameKey: 'eggs-of-your-choice', descriptionKey: 'eggs-of-your-choice-desc', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Fresh eggs prepared exactly how you like them' },
  { id: 211, name: 'Manageesh Labaneh and Rocca', nameKey: 'manakish-labneh-rocca', descriptionKey: 'manakish-labneh-rocca-desc', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Traditional Middle Eastern flatbread with labneh and rocket leaves' },
  { id: 204, name: 'Halloumi Croissant', nameKey: 'halloumi-croissant', descriptionKey: 'halloumi-croissant-desc', price: '5.50 JD', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Buttery croissant filled with grilled halloumi cheese' },
  { id: 401, name: 'Manageesh Zaatar and Vegetables', nameKey: 'manakish-zaatar-vegetables', descriptionKey: 'manakish-zaatar-vegetables-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1628692188846-b0d366ade8b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Traditional zaatar flatbread with fresh vegetables' },
  { id: 213, name: 'Zaatar and Pomegranate', nameKey: 'zaatar-pomegranate', descriptionKey: 'zaatar-pomegranate-desc', price: '2.50 JD', image: 'https://images.unsplash.com/photo-1628692188846-b0d366ade8b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Traditional zaatar bread topped with fresh pomegranate seeds' },
  { id: 212, name: 'Turkey Omelette Croissant', nameKey: 'turkey-omelette-croissant', descriptionKey: 'turkey-omelette-croissant-desc', price: '6.00 JD', image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Fluffy croissant with turkey omelette filling' },
  { id: 402, name: 'Manageesh Nabulsi Cheese', nameKey: 'manakish-nabulsi-cheese', descriptionKey: 'manakish-nabulsi-cheese-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Traditional Middle Eastern flatbread with Nabulsi cheese' },
  { id: 205, name: 'Tuna Sandwich', nameKey: 'tuna-sandwich', descriptionKey: 'tuna-sandwich-desc', price: '8.00 JD', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Fresh tuna salad sandwich with crisp vegetables' },
  { id: 403, name: 'Avocado Omelette', nameKey: 'avocado-omelette', descriptionKey: 'avocado-omelette-desc', price: '5.50 JD', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Creamy avocado omelette with fresh herbs' },
  { id: 404, name: 'Manageesh Falafel', nameKey: 'manakish-falafel', descriptionKey: 'manakish-falafel-desc', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Traditional Middle Eastern flatbread with crispy falafel' },
  { id: 405, name: 'Turkey Croissant', nameKey: 'turkey-croissant', descriptionKey: 'turkey-croissant-desc', price: '5.50 JD', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Buttery croissant filled with sliced turkey' },
  { id: 406, name: 'Manageesh Mix Cheese', nameKey: 'manakish-mix-cheese', descriptionKey: 'manakish-mix-cheese-desc', price: '5.00 JD', image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Traditional Middle Eastern flatbread with mixed cheeses' },
  { id: 407, name: 'Manageesh Molasses and Tahini', nameKey: 'manakish-molasses-tahini', descriptionKey: 'manakish-molasses-tahini-desc', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1628692188846-b0d366ade8b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Traditional Middle Eastern flatbread with molasses and tahini' },
  
  // Pizza
  { id: 220, name: 'Pizza Margherita', nameKey: 'pizza-margherita', descriptionKey: 'pizza-margherita-desc', price: '5.50 JD', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'pizza', description: 'Classic Italian pizza with fresh mozzarella, tomato, and basil' },
  { id: 221, name: 'Chicken BBQ Pizza', nameKey: 'chicken-bbq-pizza', descriptionKey: 'chicken-bbq-pizza-desc', price: '7.50 JD', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'pizza', description: 'BBQ chicken pizza with tender chicken and barbecue sauce' },
  { id: 214, name: 'Mix Formaggio', nameKey: 'mix-formaggio', descriptionKey: 'mix-formaggio-desc', price: '7.50 JD', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'pizza', description: 'Mixed cheese pizza with four different types of cheese' },
  { id: 215, name: 'Pizza Chicken Alfredo', nameKey: 'pizza-chicken-alfredo', descriptionKey: 'pizza-chicken-alfredo-desc', price: '7.50 JD', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'pizza', description: 'Creamy alfredo pizza topped with grilled chicken' },
  { id: 216, name: 'Calzone Pizza', nameKey: 'calzone-pizza', descriptionKey: 'calzone-pizza-desc', price: '7.00 JD', image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'pizza', description: 'Traditional Italian folded pizza with cheese and toppings' },
  { id: 217, name: 'Pepperoni', nameKey: 'pepperoni', descriptionKey: 'pepperoni-desc', price: '7.00 JD', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'pizza', description: 'Classic pepperoni pizza with spicy pepperoni slices' },
  
  // Sandwiches
  { id: 225, name: 'OAK Beef Burger', nameKey: 'oak-beef-burger', descriptionKey: 'oak-beef-burger-desc', price: '8.00 JD', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'sandwiches', description: 'Premium beef burger with fresh vegetables and our signature sauce' },
  { id: 226, name: 'The Oak Sandwich', nameKey: 'oak-sandwich', descriptionKey: 'oak-sandwich-desc', price: '9.00 JD', image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'sandwiches', description: 'Our signature sandwich with premium ingredients' },
  { id: 227, name: 'Shawarma Meat', nameKey: 'shawarma-meat', descriptionKey: 'shawarma-meat-desc', price: '7.50 JD', image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'sandwiches', description: 'Traditional Middle Eastern shawarma with seasoned meat' },
  { id: 228, name: 'Crispy Chicken Burger', nameKey: 'crispy-chicken-burger', descriptionKey: 'crispy-chicken-burger-desc', price: '6.50 JD', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'sandwiches', description: 'Crispy fried chicken burger with fresh toppings' },
  { id: 251, name: 'Club Sandwich', nameKey: 'club-sandwich', descriptionKey: 'club-sandwich-desc', price: '8.50 JD', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'sandwiches', description: 'Classic club sandwich with turkey, bacon, lettuce, and tomato on toasted bread' },
  { id: 252, name: 'Chicken Sandwich', nameKey: 'chicken-sandwich', descriptionKey: 'chicken-sandwich-desc', price: '7.50 JD', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'sandwiches', description: 'Grilled chicken breast sandwich with fresh vegetables and special sauce' },
  { id: 253, name: 'Grilled Cheese', nameKey: 'grilled-cheese', descriptionKey: 'grilled-cheese-desc', price: '6.00 JD', image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'sandwiches', description: 'Golden grilled cheese sandwich with melted cheese and crispy bread' },
  
  // Italian
  { id: 29, name: 'Seafood Pasta', nameKey: 'seafood-pasta', descriptionKey: 'seafood-pasta-desc', price: '9.00 JD', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'italian', description: 'Fresh seafood pasta with mixed ocean delights' },
  { id: 30, name: 'Spaghetti Bolognese', nameKey: 'spaghetti-bolognese', descriptionKey: 'spaghetti-bolognese-desc', price: '7.50 JD', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'italian', description: 'Traditional Italian spaghetti with rich meat sauce' },
  { id: 31, name: 'Fettuccine Alfredo', nameKey: 'fettuccine-alfredo', descriptionKey: 'fettuccine-alfredo-desc', price: '7.00 JD', image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'italian', description: 'Creamy fettuccine alfredo with parmesan cheese and butter sauce' },
  { id: 32, name: 'Lasagna', nameKey: 'lasagna', descriptionKey: 'lasagna-desc', price: '9.00 JD', image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'italian', description: 'Traditional layered lasagna with meat, cheese, and tomato sauce' },
  { id: 254, name: 'Spaghetti Carbonara', nameKey: 'spaghetti-carbonara', descriptionKey: 'spaghetti-carbonara-desc', price: '9.50 JD', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'italian', description: 'Traditional Italian carbonara with eggs, cheese, pancetta, and black pepper' },
  { id: 256, name: 'Risotto Mushroom', nameKey: 'risotto-mushroom', descriptionKey: 'risotto-mushroom-desc', price: '10.25 JD', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'italian', description: 'Creamy mushroom risotto with arborio rice and mixed wild mushrooms' },
  
  // Salads
  { id: 33, name: 'Chef Salad', nameKey: 'chef-salad', descriptionKey: 'chef-salad-desc', price: '4.75 JD', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'salads', description: 'Fresh chef salad with mixed greens and chef selection' },
  { id: 34, name: 'Greek Salad', nameKey: 'greek-salad', descriptionKey: 'greek-salad-desc', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1544726135-e4b4a4b0a2b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'salads', description: 'Traditional Greek salad with feta cheese, olives, and Mediterranean vegetables' },
  { id: 35, name: 'Caesar Salad', nameKey: 'caesar-salad', descriptionKey: 'caesar-salad-desc', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'salads', description: 'Classic Caesar salad with romaine lettuce, croutons, and parmesan cheese' },
  { id: 36, name: 'Smoked Salmon Salad', nameKey: 'smoked-salmon-salad', descriptionKey: 'smoked-salmon-salad-desc', price: '7.50 JD', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'salads', description: 'Premium smoked salmon salad with fresh greens' },
  
  // Soup
  { id: 37, name: 'Mushroom Soup', nameKey: 'mushroom-soup', descriptionKey: 'mushroom-soup-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'soup', description: 'Creamy mushroom soup with fresh herbs and a touch of cream' },
  { id: 38, name: 'Seafood Soup', nameKey: 'seafood-soup', descriptionKey: 'seafood-soup-desc', price: '4.75 JD', image: 'https://images.unsplash.com/photo-1519707456040-8be4aa1d7b80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'soup', description: 'Rich seafood soup with fresh ocean ingredients' },
  { id: 262, name: 'Chicken Noodle Soup', price: '6.25 JD', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'soup', description: 'Comforting chicken noodle soup with tender chicken and fresh vegetables' },
  { id: 201, name: 'Eggs of Your Choice', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Fresh eggs prepared exactly how you like them - scrambled, fried, or boiled' },

  { id: 203, name: 'Tuna Sandwich', price: '8.00 JD', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Fresh tuna salad sandwich with crisp vegetables' },
  { id: 206, name: 'The Oak Steak', price: '13.75 JD', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'main-course', description: 'Our signature premium steak grilled to perfection with special seasoning' },
  { id: 207, name: 'Salmon Grill', nameKey: 'salmon-grill', descriptionKey: 'salmon-grill-desc', price: '14.75 JD', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'main-course', description: 'Fresh Atlantic salmon fillet grilled with herbs and lemon' },
  { id: 218, name: 'Beef Steak', nameKey: 'beef-steak', descriptionKey: 'beef-steak-desc', price: '12.00 JD', image: 'https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'main-course', description: 'Tender beef steak cooked to your preference' },
  { id: 219, name: 'Chicken Mushroom', nameKey: 'chicken-mushroom', descriptionKey: 'chicken-mushroom-desc', price: '11.50 JD', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'main-course', description: 'Grilled chicken breast with mushroom sauce' },
  
  // Appetizers
  { id: 17, name: 'Mix Platter', nameKey: 'mix-platter', descriptionKey: 'mix-platter-desc', price: '18.00 JD', image: 'https://images.unsplash.com/photo-1541833590746-8b9858c50b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'appetizers', description: 'Assorted appetizer platter with variety of Middle Eastern favorites' },
  { id: 18, name: 'Mexican Nachos', nameKey: 'mexican-nachos', descriptionKey: 'mexican-nachos-desc', price: '8.00 JD', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'appetizers', description: 'Crispy nachos with cheese, jalapeños, and Mexican spices' },
  { id: 19, name: 'Dynamite Shrimp', nameKey: 'dynamite-shrimp', descriptionKey: 'dynamite-shrimp-desc', price: '8.50 JD', image: 'https://images.unsplash.com/photo-1565299585323-38174c9d1bb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'appetizers', description: 'Spicy fried shrimp with dynamite sauce' },
  { id: 20, name: 'Chicken Dynamite', nameKey: 'chicken-dynamite', descriptionKey: 'chicken-dynamite-desc', price: '6.00 JD', image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'appetizers', description: 'Crispy chicken pieces with spicy dynamite sauce' },
  { id: 203, name: 'Mac and Cheese', nameKey: 'mac-and-cheese', descriptionKey: 'mac-and-cheese-desc', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1543826173-7ad31f7659f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'appetizers', description: 'Creamy macaroni and cheese with rich cheddar sauce' },
  
  // Desserts & Ice Cream
  { id: 21, name: 'San Sebastian Cake', nameKey: 'san-sebastian-cake', descriptionKey: 'san-sebastian-cake-desc', price: '4.25 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'desserts', description: 'Basque-style burnt cheesecake with rich creamy texture' },
  { id: 22, name: 'Chocolate Cake', nameKey: 'chocolate-cake', descriptionKey: 'chocolate-cake-desc', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'desserts', description: 'Rich chocolate layer cake with chocolate frosting' },
  { id: 23, name: 'Tiramisu', nameKey: 'tiramisu', descriptionKey: 'tiramisu-desc', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'desserts', description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone' },
  { id: 24, name: 'Cheesecake', nameKey: 'cheesecake', descriptionKey: 'cheesecake-desc', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'desserts', description: 'Creamy classic cheesecake with graham cracker crust' },
  { id: 25, name: 'Kenafa Naama', nameKey: 'kenafa-naama', descriptionKey: 'kenafa-naama-desc', price: '4.75 JD', image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'desserts', description: 'Traditional Middle Eastern dessert with cheese and syrup' },
  { id: 300, name: 'Vanilla Ice Cream', nameKey: 'ice-cream-vanilla', descriptionKey: 'ice-cream-vanilla-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'desserts', description: 'Premium vanilla ice cream with real vanilla beans' },
  { id: 301, name: 'Chocolate Ice Cream', nameKey: 'ice-cream-chocolate', descriptionKey: 'ice-cream-chocolate-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1547584370-2cc98b8b8dc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'desserts', description: 'Rich chocolate ice cream made with premium cocoa' },
  { id: 302, name: 'Strawberry Ice Cream', nameKey: 'ice-cream-strawberry', descriptionKey: 'ice-cream-strawberry-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'desserts', description: 'Fresh strawberry ice cream with real fruit pieces' },
  
  // Shisha (IDs 400-499) - Updated to avoid conflicts with ice cream IDs
  { id: 401, name: 'Sahem Gum Shisha', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'regular', description: 'Premium tobacco blend with sweet gum flavor' },
  { id: 402, name: 'Lemon with Mint', price: '6.15 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'regular', description: 'Refreshing citrus and mint combination for a cool smoking experience' },
  { id: 403, name: 'Two Apple Fakher', price: '7.15 JD', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'premium', description: 'Premium Fakher brand double apple flavor with rich tobacco taste' },
  { id: 404, name: 'Special Shisha', price: '17.15 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'shisha', category: 'special', description: 'Our exclusive premium blend with the finest tobacco and exotic flavors' },
];

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
          <span className="text-gray-800 font-bold text-lg">
            {t(`category-${product.category}`) || product.category.toUpperCase().replace('-', ' ')}
          </span>
          <span>/</span>
          <span className="text-gray-800 font-medium">{t(product.nameKey) || product.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8">
        {/* Product Image/3D Viewer */}
        <div className="relative bg-black rounded-lg overflow-hidden mb-8 max-w-4xl mx-auto">
          <div className="aspect-video relative">
            {!show3D ? (
              <>
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
                
                {/* 3D View Button */}
                {modelPath && (
                  <button 
                    onClick={() => setShow3D(true)}
                    className="absolute top-4 right-4 bg-warm-brown text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-opacity-80 transition-colors shadow-lg"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">3D View</span>
                  </button>
                )}
              </>
            ) : (
              <>
                {/* 3D Model Viewer in same frame */}
                <div className="w-full h-full">
                  <Model3DViewer
                    modelPath={modelPath!}
                    productName={t(product.nameKey) || product.name}
                    isOpen={show3D}
                    onClose={() => setShow3D(false)}
                    inline={true}
                  />
                </div>
                
                {/* Back to Photo Button */}
                <button 
                  onClick={() => setShow3D(false)}
                  className="absolute top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-opacity-90 transition-colors shadow-lg"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">Back to Photo</span>
                </button>
              </>
            )}
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
          <div className="mt-8 px-4">
            <h2 className="text-xl font-bold text-center text-gray-800 mb-6 luxury-font">{t('related-products')}</h2>
            
            {/* Related Products Compact Horizontal Scroll */}
            <div className="relative">
              <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {relatedProducts.map((relatedProduct) => (
                  <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                    <div className="flex-shrink-0 w-48 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105">
                      <div className="aspect-[4/3] bg-black relative">
                        <img 
                          src={relatedProduct.image} 
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 text-center bg-warm-brown text-white">
                        <h3 className="font-bold text-sm mb-1 luxury-font truncate">
                          {t(relatedProduct.nameKey) || relatedProduct.name}
                        </h3>
                        <p className="text-yellow-300 font-bold text-sm">{relatedProduct.price}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Navigation dots - smaller */}
              <div className="flex justify-center mt-3 gap-1">
                <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* 3D Model Viewer */}
      {modelPath && (
        <Model3DViewer
          modelPath={modelPath}
          productName={t(product.nameKey) || product.name}
          isOpen={modelViewerOpen}
          onClose={() => setModelViewerOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-72 bg-warm-brown text-white transform transition-transform duration-300 z-20 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-opacity-20 border-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold luxury-font">
              {product.type === 'beverage' && t('drinks-menu')}
              {product.type === 'food' && t('food-menu')}
              {product.type === 'shisha' && t('shisha-menu')}
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
                  <span className="text-sm font-medium">{t('hot-drinks')}</span>
                </button>
              </Link>
              <Link href="/beverages?category=cold-coffee">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Snowflake className="w-5 h-5" />
                  <span className="text-sm font-medium">{t('cold-coffee')}</span>
                </button>
              </Link>
              <Link href="/beverages?category=fresh-juice">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Droplets className="w-5 h-5" />
                  <span className="text-sm font-medium">{t('fresh-juice')}</span>
                </button>
              </Link>
              <Link href="/beverages?category=soft-drinks">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-medium">{t('soft-drinks')}</span>
                </button>
              </Link>
              <Link href="/beverages?category=frappe">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Snowflake className="w-5 h-5" />
                  <span className="text-sm font-medium">{t('frappe')}</span>
                </button>
              </Link>
              <Link href="/beverages?category=milkshake">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Snowflake className="w-5 h-5" />
                  <span className="text-sm font-medium">{t('milkshake')}</span>
                </button>
              </Link>
              <Link href="/beverages?category=smoothies">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Droplets className="w-5 h-5" />
                  <span className="text-sm font-medium">{t('smoothies')}</span>
                </button>
              </Link>
              <Link href="/beverages?category=mojito">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-medium">{t('mojito')}</span>
                </button>
              </Link>
              <Link href="/beverages?category=iced-tea">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Droplets className="w-5 h-5" />
                  <span className="text-sm font-medium">{t('iced-tea')}</span>
                </button>
              </Link>
            </>
          )}
          
          {product.type === 'food' && (
            <>
              <Link href="/food?category=breakfast">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Coffee className="w-5 h-5" />
                  <span className="text-sm font-medium">{t('breakfast')}</span>
                </button>
              </Link>
              <Link href="/food?category=pizza">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Droplets className="w-5 h-5" />
                  <span className="text-sm font-medium">{t('pizza')}</span>
                </button>
              </Link>
              <Link href="/food?category=sandwiches">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-medium">{t('sandwiches')}</span>
                </button>
              </Link>
              <Link href="/food?category=italian">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Coffee className="w-5 h-5" />
                  <span className="text-sm font-medium">{t('italian')}</span>
                </button>
              </Link>
              <Link href="/food?category=main-course">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-medium">{t('main-course')}</span>
                </button>
              </Link>
              <Link href="/food?category=appetizers">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Droplets className="w-5 h-5" />
                  <span className="text-sm font-medium">{t('appetizers')}</span>
                </button>
              </Link>
              <Link href="/food?category=salads">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Coffee className="w-5 h-5" />
                  <span className="text-sm font-medium">{t('salads')}</span>
                </button>
              </Link>
              <Link href="/food?category=soup">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Droplets className="w-5 h-5" />
                  <span className="text-sm font-medium">{t('soup')}</span>
                </button>
              </Link>
              <Link href="/food?category=desserts">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Snowflake className="w-5 h-5" />
                  <span className="text-sm font-medium">{t('desserts')}</span>
                </button>
              </Link>
            </>
          )}
          
          {product.type === 'shisha' && (
            <>
              <Link href="/shisha?category=regular">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Flame className="w-5 h-5" />
                  <span className="text-sm font-medium">{t('regular-shisha')}</span>
                </button>
              </Link>
              <Link href="/shisha?category=premium">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Crown className="w-5 h-5" />
                  <span className="text-sm font-medium">{t('premium-shisha')}</span>
                </button>
              </Link>
              <Link href="/shisha?category=special">
                <button className="w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors hover:bg-white hover:bg-opacity-10">
                  <Star className="w-5 h-5" />
                  <span className="text-sm font-medium">{t('special-shisha')}</span>
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