import { useState } from "react";
import { ArrowLeft, Home, Share, Globe, Menu, X, ChevronLeft, ChevronRight, Coffee, Droplets, Snowflake, Zap, Flame, Crown, Star, Eye } from "lucide-react";
import { Link, useParams } from "wouter";
import { useLanguage } from '@/contexts/LanguageContext';
import logoImage from "@assets/oakCafeLogo_1752004813012.png";
import Model3DViewer from '../components/Model3DViewer';
import { getModelPath, isGLTFModel } from '../utils/modelMapping';

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
  // Breakfast - EXPANDED WITH 3D MODELS
  { id: 201, name: 'Eggs of Your Choice', nameKey: 'eggs-of-your-choice', descriptionKey: 'eggs-of-your-choice-desc', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Fresh eggs prepared exactly how you like them' },
  { id: 202, name: 'Hash Brown', nameKey: 'hash-brown', descriptionKey: 'hash-brown-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1605098893544-fb6e9fd71b56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Crispy golden hash browns made from fresh potatoes' },
  { id: 203, name: 'Mac and Cheese', nameKey: 'mac-and-cheese', descriptionKey: 'mac-and-cheese-desc', price: '6.00 JD', image: 'https://images.unsplash.com/photo-1543826173-7ad31f7659f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Creamy macaroni and cheese with rich cheddar sauce' },
  { id: 204, name: 'Halloumi Croissant', nameKey: 'halloumi-croissant', descriptionKey: 'halloumi-croissant-desc', price: '5.50 JD', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Buttery croissant filled with grilled halloumi cheese' },
  { id: 205, name: 'Tuna Sandwich', nameKey: 'tuna-sandwich', descriptionKey: 'tuna-sandwich-desc', price: '8.00 JD', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Fresh tuna salad sandwich with crisp vegetables' },
  { id: 211, name: 'Manageesh Labaneh and Rocca', nameKey: 'manakish-labneh-rocca', descriptionKey: 'manakish-labneh-rocca-desc', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Traditional Middle Eastern flatbread with labneh and rocket leaves' },
  { id: 212, name: 'Turkey Omelette Croissant', nameKey: 'turkey-omelette-croissant', descriptionKey: 'turkey-omelette-croissant-desc', price: '6.00 JD', image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Fluffy croissant with turkey omelette filling' },
  { id: 213, name: 'Zaatar and Pomegranate', nameKey: 'zaatar-pomegranate', descriptionKey: 'zaatar-pomegranate-desc', price: '2.50 JD', image: 'https://images.unsplash.com/photo-1628692188846-b0d366ade8b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', type: 'food', category: 'breakfast', description: 'Traditional zaatar bread topped with fresh pomegranate seeds' },
  
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
            
            {/* 3D Model Button */}
            {modelPath && (
              <button 
                onClick={() => setModelViewerOpen(true)}
                className="absolute top-4 right-4 bg-warm-brown text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-opacity-80 transition-colors shadow-lg"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">3D View</span>
              </button>
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