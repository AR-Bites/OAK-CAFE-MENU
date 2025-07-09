import { useState, useEffect } from "react";
import { ArrowLeft, Home, Share, Globe, Menu, X, Coffee, Droplets, Snowflake, Zap, IceCream, Leaf, Citrus } from "lucide-react";
import { Link, useLocation, useRoute } from "wouter";
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import logoImage from "@assets/oakCafeLogo_1752004813012.png";

const getBeverageCategories = (t: (key: string) => string) => [
  { id: 'hot-drinks', label: t('hot-drinks'), icon: Coffee },
  { id: 'cold-coffee', label: t('cold-coffee'), icon: IceCream },
  { id: 'frappe', label: t('frappe'), icon: Snowflake },
  { id: 'milkshake', label: t('milkshake'), icon: IceCream },
  { id: 'smoothies', label: t('smoothies'), icon: Leaf },
  { id: 'fresh-juice', label: t('fresh-juice'), icon: Citrus },
  { id: 'mojito', label: t('mojito'), icon: Zap },
  { id: 'iced-tea', label: t('iced-tea'), icon: Leaf },
  { id: 'non-coffee', label: t('non-coffee'), icon: Coffee },
  { id: 'soft-drinks', label: t('soft-drinks'), icon: Droplets },
];

const beverageProducts = {
  'hot-drinks': [
    { id: 101, name: 'Red Eye', nameKey: 'red-eye', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 102, name: 'V60 / CHEMEX', nameKey: 'v60-chemex', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 103, name: 'Flat White', nameKey: 'flat-white', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 104, name: 'Espresso Macchiato', nameKey: 'espresso-macchiato', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 105, name: 'Marshmallow Chocolate', nameKey: 'marshmallow-chocolate', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 111, name: 'Double Espresso', nameKey: 'double-espresso', price: '2.75 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 112, name: 'Cappuccino', nameKey: 'cappuccino', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 113, name: 'Cortado', nameKey: 'cortado', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 114, name: 'Latte', nameKey: 'latte', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 115, name: 'Americano', nameKey: 'americano', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 106, name: 'Turkish Coffee Single', nameKey: 'turkish-coffee-single', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 601, name: 'Caramel Macchiato', nameKey: 'caramel-macchiato', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 602, name: 'Lungo', nameKey: 'lungo', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 603, name: 'White Coffee', nameKey: 'white-coffee', price: '1.45 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 604, name: 'Sandy Chocolate', nameKey: 'sandy-chocolate', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 605, name: 'Filter Coffee', nameKey: 'filter-coffee', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 606, name: 'White Mocha', nameKey: 'white-mocha', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 607, name: 'Chili Chocolate', nameKey: 'chili-chocolate', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 608, name: 'Spanish Latte', nameKey: 'spanish-latte', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 609, name: 'Dark Mocha', nameKey: 'dark-mocha', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
    { id: 116, name: 'Turkish Coffee Double', nameKey: 'turkish-coffee-double', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'hot-drinks' },
  ],
  'cold-coffee': [
    { id: 107, name: 'Iced Caramel Macchiato', nameKey: 'iced-caramel-macchiato', price: '3.95 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'cold-coffee' },
    { id: 117, name: 'Iced Dark Mocha', nameKey: 'iced-dark-mocha', price: '3.85 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'cold-coffee' },
    { id: 610, name: 'Iced Flat White', nameKey: 'iced-flat-white', price: '3.40 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'cold-coffee' },
    { id: 611, name: 'Iced White Mocha', nameKey: 'iced-white-mocha', price: '3.85 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'cold-coffee' },
    { id: 108, name: 'Cold Brew', nameKey: 'cold-brew', price: '5.25 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'cold-coffee' },
    { id: 118, name: 'Iced Americano', nameKey: 'iced-americano', price: '3.15 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'cold-coffee' },
    { id: 612, name: 'Iced Latte', nameKey: 'iced-latte', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'cold-coffee' },
    { id: 613, name: 'Iced Spanish Latte', nameKey: 'iced-spanish-latte', price: '3.85 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'cold-coffee' },
  ],
  'frappe': [
    { id: 614, name: 'Hazelnut Frappe', nameKey: 'hazelnut-frappe', price: '3.80 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'frappe' },
    { id: 615, name: 'White Fruit Frappe', nameKey: 'white-fruit-frappe', price: '3.80 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'frappe' },
    { id: 616, name: 'White Chocolate Frappe', nameKey: 'white-chocolate-frappe', price: '3.80 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'frappe' },
    { id: 617, name: 'Chocolate Frappe', nameKey: 'chocolate-frappe', price: '3.80 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'frappe' },
    { id: 618, name: 'Caramel Frappe', nameKey: 'caramel-frappe', price: '3.80 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'frappe' },
    { id: 619, name: 'Vanilla Frappe', nameKey: 'vanilla-frappe', price: '3.80 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'frappe' },
    { id: 620, name: 'Coffee Frappe', nameKey: 'coffee-frappe', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'frappe' },
  ],
  'milkshake': [
    { id: 621, name: 'Arabia Milkshake', nameKey: 'arabia-milkshake', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'milkshake' },
    { id: 622, name: 'Vanilla Milkshake', nameKey: 'vanilla-milkshake', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'milkshake' },
    { id: 623, name: 'Chocolate Milkshake', nameKey: 'chocolate-milkshake', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'milkshake' },
    { id: 624, name: 'Strawberry Milkshake', nameKey: 'strawberry-milkshake', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'milkshake' },
    { id: 625, name: 'Lemon Milkshake', nameKey: 'lemon-milkshake', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'milkshake' },
    { id: 626, name: 'Caramel Milkshake', nameKey: 'caramel-milkshake', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'milkshake' },
    { id: 627, name: 'Mango Milkshake', nameKey: 'mango-milkshake', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'milkshake' },
  ],
  'smoothies': [
    { id: 628, name: 'Mango Smoothie', nameKey: 'mango-smoothie', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'smoothies' },
    { id: 629, name: 'Mix Berries Smoothie', nameKey: 'mix-berries-smoothie', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'smoothies' },
    { id: 630, name: 'Lemonade Smoothie', nameKey: 'lemonade-smoothie', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'smoothies' },
    { id: 631, name: 'Mango and Passionfruit Smoothie', nameKey: 'mango-passionfruit-smoothie', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'smoothies' },
    { id: 632, name: 'Lemon with Mint Smoothie', nameKey: 'lemon-mint-smoothie', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'smoothies' },
    { id: 633, name: 'Basil Lemonade Smoothie', nameKey: 'basil-lemonade-smoothie', price: '4.75 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'smoothies' },
    { id: 634, name: 'Orange Smoothie', nameKey: 'orange-smoothie', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'smoothies' },
  ],
  'fresh-juice': [
    { id: 109, name: 'The Oak Seasonal Fresh Juice', nameKey: 'oak-seasonal-juice', price: '4.90 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'fresh-juice' },
    { id: 119, name: 'Mango Mint Juice', nameKey: 'mango-mint-juice', price: '4.90 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'fresh-juice' },
    { id: 635, name: 'Basil Lemonade Juice', nameKey: 'basil-lemonade-juice', price: '4.75 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'fresh-juice' },
    { id: 636, name: 'Carrot Juice', nameKey: 'carrot-juice', price: '4.70 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'fresh-juice' },
    { id: 637, name: 'Lemon with Mint Juice', nameKey: 'lemon-mint-juice', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'fresh-juice' },
    { id: 638, name: 'Lemonade Juice', nameKey: 'lemonade-juice', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'fresh-juice' },
    { id: 120, name: 'Orange Juice', nameKey: 'orange-juice', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'fresh-juice' },
    { id: 110, name: 'Pomegranate Juice', nameKey: 'pomegranate-juice', price: '4.90 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'fresh-juice' },
    { id: 639, name: 'Mango Basil Juice', nameKey: 'mango-basil-juice', price: '4.90 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'fresh-juice' },
  ],
  'mojito': [
    { id: 640, name: 'Forest Mojito', nameKey: 'forest-mojito', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'mojito' },
    { id: 641, name: 'Mango Mojito', nameKey: 'mango-mojito', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'mojito' },
    { id: 642, name: 'Strawberry Mojito', nameKey: 'strawberry-mojito', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'mojito' },
    { id: 643, name: 'Pink Lemonade', nameKey: 'pink-lemonade', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'mojito' },
    { id: 132, name: 'Passion Fruit Mojito', nameKey: 'passion-fruit-mojito', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'mojito' },
    { id: 644, name: 'Red Sea Red Bull', nameKey: 'red-sea-redbull', price: '4.10 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'mojito' },
    { id: 130, name: 'Classic Mojito', nameKey: 'classic-mojito', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'mojito' },
    { id: 645, name: 'Maldives Red Bull', nameKey: 'maldives-redbull', price: '4.10 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'mojito' },
  ],
  'iced-tea': [
    { id: 646, name: 'Ice Tea Peach', nameKey: 'ice-tea-peach', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'iced-tea' },
    { id: 647, name: 'Iced Tea Mango', nameKey: 'iced-tea-mango', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'iced-tea' },
    { id: 648, name: 'Iced Tea Sugar Free', nameKey: 'iced-tea-sugar-free', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'iced-tea' },
    { id: 649, name: 'Iced Tea Strawberry', nameKey: 'iced-tea-strawberry', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'iced-tea' },
    { id: 650, name: 'Iced Tea Grenadine', nameKey: 'iced-tea-grenadine', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'iced-tea' },
    { id: 651, name: 'Ice Tea Forest', nameKey: 'ice-tea-forest', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'iced-tea' },
    { id: 652, name: 'Ice Tea Passion Fruit', nameKey: 'ice-tea-passion-fruit', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'iced-tea' },
  ],
  'non-coffee': [
    { id: 653, name: 'Black Tea', nameKey: 'black-tea', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'non-coffee' },
    { id: 654, name: 'Matcha', nameKey: 'matcha', price: '4.25 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'non-coffee' },
    { id: 655, name: 'Special Tea', nameKey: 'special-tea', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'non-coffee' },
    { id: 656, name: 'Green Tea', nameKey: 'green-tea', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'non-coffee' },
    { id: 657, name: 'Chai Latte Vanilla', nameKey: 'chai-latte-vanilla', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'non-coffee' },
    { id: 658, name: 'Chai Latte Spiced', nameKey: 'chai-latte-spiced', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'non-coffee' },
    { id: 659, name: 'Hot Chocolate', nameKey: 'hot-chocolate', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'non-coffee' },
  ],
  'soft-drinks': [
    { id: 21, name: 'Coca Cola Zero', nameKey: 'coca-cola-zero', price: '2.00 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'soft-drinks' },
    { id: 23, name: 'Red Bull', nameKey: 'red-bull', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'soft-drinks' },
    { id: 22, name: 'Sprite', nameKey: 'sprite', price: '2.00 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'soft-drinks' },
    { id: 24, name: 'Perrier', nameKey: 'perrier', price: '3.60 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'soft-drinks' },
    { id: 660, name: 'Red Bull Sugar Free', nameKey: 'redbull-sugar-free', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'soft-drinks' },
    { id: 661, name: 'Sprite Zero', nameKey: 'sprite-zero', price: '2.00 JD', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'soft-drinks' },
    { id: 662, name: 'Coca Cola', nameKey: 'coca-cola', price: '2.00 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'soft-drinks' },
    { id: 663, name: 'Mineral Water', nameKey: 'mineral-water', price: '1.00 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'beverage', category: 'soft-drinks' },
  ]
};

export default function Beverages() {
  const [selectedCategory, setSelectedCategory] = useState('hot-drinks');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { t, language, setLanguage } = useLanguage();

  const beverageCategories = getBeverageCategories(t);

  useEffect(() => {
    // Use window location search for URL parameters
    const searchParams = window.location.search;
    const urlParams = new URLSearchParams(searchParams);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam && beverageCategories.find(cat => cat.id === categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [location]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setLocation(`/beverages?category=${categoryId}`);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-200 relative overflow-auto">

      
      {/* Top Navigation */}
      <div className="bg-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <button className="w-12 h-12 sm:w-14 sm:h-14 bg-warm-brown rounded-full flex items-center justify-center text-white hover:bg-opacity-80 active:scale-95 transition-all shadow-md touch-manipulation">
              <Home className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </Link>

        </div>
        
        <div className="bg-white px-3 py-1 rounded-full shadow-lg">
          <img src={logoImage} alt="HyaQqabaz" className="h-16 w-auto object-contain filter brightness-100 contrast-125" />
        </div>
        
        <button 
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          className="text-gold-primary hover:text-gold-secondary transition-colors duration-300 flex items-center gap-2"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">{language === 'en' ? 'AR' : 'EN'}</span>
        </button>
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
        
        <Link href="/">
          <button className="w-14 h-14 sm:w-16 sm:h-16 bg-warm-brown rounded-full flex items-center justify-center text-white hover:bg-opacity-80 active:scale-95 transition-all shadow-md touch-manipulation">
            <ArrowLeft className="w-7 h-7 sm:w-8 sm:h-8" />
          </button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed left-0 top-0 h-full w-72 bg-warm-brown text-white transform transition-transform duration-300 z-20 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 border-b border-opacity-20 border-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold luxury-font">{t('drinks-menu')}</h2>
              <button onClick={() => setSidebarOpen(false)} className="text-white hover:text-gray-300">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <nav className="p-6">
            {beverageCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`w-full text-left px-4 py-4 rounded-lg mb-3 flex items-center gap-4 transition-colors ${
                    selectedCategory === category.id 
                      ? 'bg-white bg-opacity-20' 
                      : 'hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-sm font-medium">{t(category.id)}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Content Area */}
        <div className="flex-1 p-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6 bg-white px-4 py-2 rounded-lg shadow-sm w-fit">
            <Home className="w-4 h-4" />
            <span>/</span>
            <span className="text-gray-800 font-bold text-lg">
              {selectedCategory ? t(`category-${selectedCategory}`) : t('beverages-menu')}
            </span>
          </div>

          {/* Page Title */}
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-12 luxury-font">{beverageCategories.find(cat => cat.id === selectedCategory)?.label || 'HOT DRINKS'}</h1>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
            {(beverageProducts[selectedCategory as keyof typeof beverageProducts] || beverageProducts['hot-drinks']).map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="product-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-black relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 text-center bg-warm-brown text-white">
                    <h3 className="font-bold text-sm mb-1 luxury-font truncate">{t(product.nameKey) || product.name}</h3>
                    <p className="text-yellow-300 font-bold text-sm">{product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}