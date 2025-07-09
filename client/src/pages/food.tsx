import { useState, useEffect } from "react";
import { ArrowLeft, Home, Share, Globe, Menu, X, Coffee, Utensils, Salad, Sandwich, Apple, PizzaIcon as Pizza, Star, Droplets, IceCream, Leaf } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import logoImage from "@assets/oakCafeLogo_1752004813012.png";

const getFoodCategories = (t: (key: string) => string) => [
  { id: 'breakfast', label: t('breakfast'), icon: Coffee },
  { id: 'pizza', label: t('pizza'), icon: Pizza },
  { id: 'sandwiches', label: t('sandwiches'), icon: Sandwich },
  { id: 'italian', label: t('italian'), icon: Star },
  { id: 'main-course', label: t('main-course'), icon: Utensils },
  { id: 'appetizers', label: t('appetizers'), icon: Apple },
  { id: 'salads', label: t('salads'), icon: Salad },
  { id: 'soup', label: t('soup'), icon: Droplets },
  { id: 'desserts', label: t('desserts'), icon: IceCream },
];

const foodProducts = {
  'breakfast': [
    { id: 201, name: 'Eggs of Your Choice', nameKey: 'eggs-of-your-choice', descriptionKey: 'eggs-of-your-choice-desc', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'breakfast' },
    { id: 211, name: 'Manageesh Labaneh and Rocca', nameKey: 'manakish-labneh-rocca', descriptionKey: 'manakish-labneh-rocca-desc', price: '3.25 JD', image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'breakfast' },
    { id: 204, name: 'Halloumi Croissant', nameKey: 'halloumi-croissant', descriptionKey: 'halloumi-croissant-desc', price: '5.50 JD', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'breakfast' },
    { id: 401, name: 'Manageesh Zaatar and Vegetables', nameKey: 'manakish-zaatar-vegetables', descriptionKey: 'manakish-zaatar-vegetables-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1628692188846-b0d366ade8b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'breakfast' },
    { id: 213, name: 'Zaatar and Pomegranate', nameKey: 'zaatar-pomegranate', descriptionKey: 'zaatar-pomegranate-desc', price: '2.50 JD', image: 'https://images.unsplash.com/photo-1628692188846-b0d366ade8b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'breakfast' },
    { id: 212, name: 'Turkey Omelette Croissant', nameKey: 'turkey-omelette-croissant', descriptionKey: 'turkey-omelette-croissant-desc', price: '6.00 JD', image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'breakfast' },
    { id: 402, name: 'Manageesh Nabulsi Cheese', nameKey: 'manakish-nabulsi-cheese', descriptionKey: 'manakish-nabulsi-cheese-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'breakfast' },
    { id: 205, name: 'Tuna Sandwich', nameKey: 'tuna-sandwich', descriptionKey: 'tuna-sandwich-desc', price: '8.00 JD', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'breakfast' },
    { id: 403, name: 'Avocado Omelette', nameKey: 'avocado-omelette', descriptionKey: 'avocado-omelette-desc', price: '5.50 JD', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'breakfast' },
    { id: 404, name: 'Manageesh Falafel', nameKey: 'manakish-falafel', descriptionKey: 'manakish-falafel-desc', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'breakfast' },
    { id: 405, name: 'Turkey Croissant', nameKey: 'turkey-croissant', descriptionKey: 'turkey-croissant-desc', price: '5.50 JD', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'breakfast' },
    { id: 406, name: 'Manageesh Mix Cheese', nameKey: 'manakish-mix-cheese', descriptionKey: 'manakish-mix-cheese-desc', price: '5.00 JD', image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'breakfast' },
    { id: 407, name: 'Manageesh Molasses and Tahini', nameKey: 'manakish-molasses-tahini', descriptionKey: 'manakish-molasses-tahini-desc', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1628692188846-b0d366ade8b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'breakfast' },
  ],
  'pizza': [
    { id: 220, name: 'Pizza Margherita', nameKey: 'pizza-margherita', descriptionKey: 'pizza-margherita-desc', price: '5.50 JD', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'pizza' },
    { id: 221, name: 'Chicken BBQ Pizza', nameKey: 'chicken-bbq-pizza', descriptionKey: 'chicken-bbq-pizza-desc', price: '7.50 JD', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'pizza' },
    { id: 214, name: 'Mix Formaggio', nameKey: 'mix-formaggio', descriptionKey: 'mix-formaggio-desc', price: '7.50 JD', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'pizza' },
    { id: 215, name: 'Pizza Chicken Alfredo', nameKey: 'pizza-chicken-alfredo', descriptionKey: 'pizza-chicken-alfredo-desc', price: '7.50 JD', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'pizza' },
    { id: 216, name: 'Calzone Pizza', nameKey: 'calzone-pizza', descriptionKey: 'calzone-pizza-desc', price: '7.00 JD', image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'pizza' },
    { id: 217, name: 'Pepperoni', nameKey: 'pepperoni', descriptionKey: 'pepperoni-desc', price: '7.00 JD', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'pizza' },
  ],
  'main-course': [
    { id: 206, name: 'The Oak Steak', nameKey: 'oak-steak', descriptionKey: 'oak-steak-desc', price: '13.75 JD', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'main-course' },
    { id: 207, name: 'Salmon Grill', nameKey: 'salmon-grill', descriptionKey: 'salmon-grill-desc', price: '14.75 JD', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'main-course' },
    { id: 218, name: 'Beef Steak', nameKey: 'beef-steak', descriptionKey: 'beef-steak-desc', price: '12.00 JD', image: 'https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'main-course' },
    { id: 219, name: 'Chicken Mushroom', nameKey: 'chicken-mushroom', descriptionKey: 'chicken-mushroom-desc', price: '11.50 JD', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'main-course' },
    { id: 301, name: 'Fukhara Freekeh', nameKey: 'fukhara-freekeh', descriptionKey: 'fukhara-freekeh-desc', price: '6.75 JD', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'main-course' },
    { id: 302, name: 'Fukhara Chicken Creamy', nameKey: 'fukhara-chicken-creamy', descriptionKey: 'fukhara-chicken-creamy-desc', price: '8.75 JD', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'main-course' },
    { id: 303, name: 'Meat Slice', nameKey: 'meat-slice', descriptionKey: 'meat-slice-desc', price: '9.75 JD', image: 'https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'main-course' },
    { id: 304, name: 'Meat Sajiye', nameKey: 'meat-sajiye', descriptionKey: 'meat-sajiye-desc', price: '10.00 JD', image: 'https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'main-course' },
    { id: 305, name: 'Fukhara Chicken Lemon', nameKey: 'fukhara-chicken-lemon', descriptionKey: 'fukhara-chicken-lemon-desc', price: '8.50 JD', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'main-course' },
    { id: 306, name: 'Chicken Fajita Sizzling', nameKey: 'chicken-fajita-sizzling', descriptionKey: 'chicken-fajita-sizzling-desc', price: '8.75 JD', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'main-course' },
    { id: 307, name: 'Beef Straganoff', nameKey: 'beef-straganoff', descriptionKey: 'beef-straganoff-desc', price: '9.75 JD', image: 'https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'main-course' },
    { id: 308, name: 'Chicken Grill', nameKey: 'chicken-grill', descriptionKey: 'chicken-grill-desc', price: '9.00 JD', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'main-course' },
  ],
  'appetizers': [
    { id: 17, name: 'Mix Platter', nameKey: 'mix-platter', descriptionKey: 'mix-platter-desc', price: '18.00 JD', image: 'https://images.unsplash.com/photo-1541833590746-8b9858c50b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'appetizers' },
    { id: 18, name: 'Mexican Nachos', nameKey: 'mexican-nachos', descriptionKey: 'mexican-nachos-desc', price: '8.00 JD', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'appetizers' },
    { id: 19, name: 'Dynamite Shrimp', nameKey: 'dynamite-shrimp', descriptionKey: 'dynamite-shrimp-desc', price: '8.50 JD', image: 'https://images.unsplash.com/photo-1565299585323-38174c9d1bb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'appetizers' },
    { id: 20, name: 'Chicken Dynamite', nameKey: 'chicken-dynamite', descriptionKey: 'chicken-dynamite-desc', price: '6.00 JD', image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'appetizers' },
    { id: 202, name: 'Mac and Cheese', nameKey: 'mac-and-cheese', descriptionKey: 'mac-and-cheese-desc', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1543826173-7ad31f7659f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'appetizers' },
    { id: 401, name: 'Chips and Dips', nameKey: 'chips-and-dips', descriptionKey: 'chips-and-dips-desc', price: '5.00 JD', image: 'https://images.unsplash.com/photo-1541833590746-8b9858c50b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'appetizers' },
    { id: 402, name: 'Kibbeh', nameKey: 'kibbeh', descriptionKey: 'kibbeh-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1565299585323-38174c9d1bb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'appetizers' },
    { id: 403, name: 'Popcorn', nameKey: 'popcorn', descriptionKey: 'popcorn-desc', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'appetizers' },
    { id: 404, name: 'Freekeh with Cream', nameKey: 'freekeh-with-cream', descriptionKey: 'freekeh-with-cream-desc', price: '5.00 JD', image: 'https://images.unsplash.com/photo-1565299585323-38174c9d1bb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'appetizers' },
    { id: 405, name: 'French Fries', nameKey: 'french-fries', descriptionKey: 'french-fries-desc', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1541833590746-8b9858c50b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'appetizers' },
    { id: 406, name: 'Mushroom Saute', nameKey: 'mushroom-saute', descriptionKey: 'mushroom-saute-desc', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1565299585323-38174c9d1bb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'appetizers' },
    { id: 407, name: 'Cheese Roll', nameKey: 'cheese-roll', descriptionKey: 'cheese-roll-desc', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1541833590746-8b9858c50b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'appetizers' },
    { id: 408, name: 'Yalanji', nameKey: 'yalanji', descriptionKey: 'yalanji-desc', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1565299585323-38174c9d1bb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'appetizers' },
    { id: 409, name: 'Onion Rings', nameKey: 'onion-rings', descriptionKey: 'onion-rings-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1541833590746-8b9858c50b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'appetizers' },
    { id: 410, name: 'Grilled Halloumi', nameKey: 'grilled-halloumi', descriptionKey: 'grilled-halloumi-desc', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1565299585323-38174c9d1bb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'appetizers' },
    { id: 411, name: 'Nuts', nameKey: 'nuts', descriptionKey: 'nuts-desc', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1541833590746-8b9858c50b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'appetizers' },
    { id: 412, name: 'Jalapeno Paper', nameKey: 'jalapeno-paper', descriptionKey: 'jalapeno-paper-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1565299585323-38174c9d1bb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'appetizers' },
    { id: 413, name: 'Chicken Tender', nameKey: 'chicken-tender', descriptionKey: 'chicken-tender-desc', price: '5.50 JD', image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'appetizers' },
    { id: 414, name: 'Potato Wedges', nameKey: 'potato-wedges', descriptionKey: 'potato-wedges-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1541833590746-8b9858c50b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'appetizers' },
    { id: 415, name: 'Chicken Cheese Balls', nameKey: 'chicken-cheese-balls', descriptionKey: 'chicken-cheese-balls-desc', price: '5.50 JD', image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'appetizers' },
    { id: 416, name: 'Sambusak', nameKey: 'sambusak', descriptionKey: 'sambusak-desc', price: '3.00 JD', image: 'https://images.unsplash.com/photo-1565299585323-38174c9d1bb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'appetizers' },
    { id: 417, name: 'Loaded Waffle Fries', nameKey: 'loaded-waffle-fries', descriptionKey: 'loaded-waffle-fries-desc', price: '5.25 JD', image: 'https://images.unsplash.com/photo-1541833590746-8b9858c50b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'appetizers' },
    { id: 418, name: 'Mozzarella Sticks', nameKey: 'mozzarella-sticks', descriptionKey: 'mozzarella-sticks-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1565299585323-38174c9d1bb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'appetizers' },
  ],
  'desserts': [
    { id: 21, name: 'San Sebastian Cake', nameKey: 'san-sebastian-cake', descriptionKey: 'san-sebastian-cake-desc', price: '4.25 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'desserts' },
    { id: 22, name: 'Chocolate Cake', nameKey: 'chocolate-cake', descriptionKey: 'chocolate-cake-desc', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'desserts' },
    { id: 23, name: 'Tiramisu', nameKey: 'tiramisu', descriptionKey: 'tiramisu-desc', price: '4.50 JD', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'desserts' },
    { id: 24, name: 'Cheesecake', nameKey: 'cheesecake', descriptionKey: 'cheesecake-desc', price: '4.00 JD', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'desserts' },
    { id: 25, name: 'Kenafa Naama', nameKey: 'kenafa-naama', descriptionKey: 'kenafa-naama-desc', price: '4.75 JD', image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'desserts' },
    { id: 140, name: 'Vanilla Ice Cream', nameKey: 'ice-cream-vanilla', descriptionKey: 'ice-cream-vanilla-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'desserts' },
    { id: 141, name: 'Chocolate Ice Cream', nameKey: 'ice-cream-chocolate', descriptionKey: 'ice-cream-chocolate-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1547584370-2cc98b8b8dc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'desserts' },
    { id: 142, name: 'Strawberry Ice Cream', nameKey: 'ice-cream-strawberry', descriptionKey: 'ice-cream-strawberry-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'desserts' },
  ],
  'sandwiches': [
    { id: 225, name: 'OAK Beef Burger', nameKey: 'oak-beef-burger', descriptionKey: 'oak-beef-burger-desc', price: '8.00 JD', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'sandwiches' },
    { id: 226, name: 'The Oak Sandwich', nameKey: 'oak-sandwich', descriptionKey: 'oak-sandwich-desc', price: '9.00 JD', image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'sandwiches' },
    { id: 227, name: 'Shawarma Meat', nameKey: 'shawarma-meat', descriptionKey: 'shawarma-meat-desc', price: '7.50 JD', image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'sandwiches' },
    { id: 228, name: 'Crispy Chicken Burger', nameKey: 'crispy-chicken-burger', descriptionKey: 'crispy-chicken-burger-desc', price: '6.50 JD', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'sandwiches' },
    { id: 229, name: 'Shawarma Chicken', nameKey: 'shawarma-chicken', descriptionKey: 'shawarma-chicken-desc', price: '6.00 JD', image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'sandwiches' },
    { id: 230, name: 'Chicken Fajita Sandwich', nameKey: 'chicken-fajita-sandwich', descriptionKey: 'chicken-fajita-sandwich-desc', price: '5.50 JD', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'sandwiches' },
    { id: 231, name: 'Halloumi Sandwich', nameKey: 'halloumi-sandwich', descriptionKey: 'halloumi-sandwich-desc', price: '5.50 JD', image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'sandwiches' },
    { id: 232, name: 'Chicken Quesadilla', nameKey: 'chicken-quesadilla', descriptionKey: 'chicken-quesadilla-desc', price: '8.00 JD', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'sandwiches' },
    { id: 233, name: 'Beef Fajita Sandwich', nameKey: 'beef-fajita-sandwich', descriptionKey: 'beef-fajita-sandwich-desc', price: '7.00 JD', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'sandwiches' },
  ],
  'italian': [
    { id: 29, name: 'Seafood Pasta', nameKey: 'seafood-pasta', descriptionKey: 'seafood-pasta-desc', price: '9.00 JD', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'italian' },
    { id: 30, name: 'Spaghetti Bolognese', nameKey: 'spaghetti-bolognese', descriptionKey: 'spaghetti-bolognese-desc', price: '7.50 JD', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'italian' },
    { id: 31, name: 'Fettuccine Alfredo', nameKey: 'fettuccine-alfredo', descriptionKey: 'fettuccine-alfredo-desc', price: '7.00 JD', image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'italian' },
    { id: 32, name: 'Lasagna', nameKey: 'lasagna', descriptionKey: 'lasagna-desc', price: '9.00 JD', image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'italian' },
    { id: 33, name: 'Penne Arrabbiata', nameKey: 'penne-arrabbiata', descriptionKey: 'penne-arrabbiata-desc', price: '5.25 JD', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'italian' },
    { id: 34, name: 'Spaghetti Al-Pesto', nameKey: 'spaghetti-al-pesto', descriptionKey: 'spaghetti-al-pesto-desc', price: '6.50 JD', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'italian' },
    { id: 35, name: 'Pina Rose', nameKey: 'pina-rose', descriptionKey: 'pina-rose-desc', price: '6.00 JD', image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'italian' },
    { id: 36, name: 'Spaghetti Aglio Shrimps', nameKey: 'spaghetti-aglio-shrimps', descriptionKey: 'spaghetti-aglio-shrimps-desc', price: '8.75 JD', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'italian' },
    { id: 37, name: 'Kanolone', nameKey: 'kanolone', descriptionKey: 'kanolone-desc', price: '5.00 JD', image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'italian' },
  ],
  'salads': [
    { id: 133, name: 'Chef Salad', nameKey: 'chef-salad', descriptionKey: 'chef-salad-desc', price: '4.75 JD', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'salads' },
    { id: 134, name: 'Greek Salad', nameKey: 'greek-salad', descriptionKey: 'greek-salad-desc', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1544726135-e4b4a4b0a2b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'salads' },
    { id: 135, name: 'Caesar Salad', nameKey: 'caesar-salad', descriptionKey: 'caesar-salad-desc', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'salads' },
    { id: 136, name: 'Smoked Salmon Salad', nameKey: 'smoked-salmon-salad', descriptionKey: 'smoked-salmon-salad-desc', price: '7.50 JD', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'salads' },
  ],
  'soup': [
    { id: 137, name: 'Mushroom Soup', nameKey: 'mushroom-soup', descriptionKey: 'mushroom-soup-desc', price: '3.50 JD', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'soup' },
    { id: 138, name: 'Seafood Soup', nameKey: 'seafood-soup', descriptionKey: 'seafood-soup-desc', price: '4.75 JD', image: 'https://images.unsplash.com/photo-1519707456040-8be4aa1d7b80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'soup' },
    { id: 139, name: 'Corn Soup', nameKey: 'corn-soup', descriptionKey: 'corn-soup-desc', price: '3.75 JD', image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300', type: 'food', category: 'soup' },
  ]
};

export default function Food() {
  const [selectedCategory, setSelectedCategory] = useState('breakfast');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { t, language, setLanguage } = useLanguage();

  const foodCategories = getFoodCategories(t);

  useEffect(() => {
    // Use window location search for URL parameters  
    const searchParams = window.location.search;
    const urlParams = new URLSearchParams(searchParams);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam && foodCategories.find(cat => cat.id === categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [location]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setLocation(`/food?category=${categoryId}`);
    setSidebarOpen(false);
  };

  const currentProducts = foodProducts[selectedCategory as keyof typeof foodProducts] || foodProducts['breakfast'];

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
            {selectedCategory ? t(`category-${selectedCategory}`) : t('food-menu')}
          </span>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed left-0 top-0 h-full bg-warm-brown text-white z-50 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64`}>
          <div className="p-6 pt-20">
            <h2 className="text-xl font-bold mb-6 luxury-font">{t('food-menu')}</h2>
            <nav className="space-y-4">
              {foodCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-yellow-600 text-white'
                        : 'hover:bg-yellow-600 hover:bg-opacity-20'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-sm font-medium">{t(category.id)}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 px-8 py-8">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-12 luxury-font">{foodCategories.find(cat => cat.id === selectedCategory)?.label || 'BREAKFAST'}</h1>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
            {currentProducts.map((product) => (
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