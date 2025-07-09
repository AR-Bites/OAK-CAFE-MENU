// 3D Model mapping for all dishes - using public directory paths
export const modelMapping: Record<string, string> = {
  // Beef dishes
  'oak-beef-burger': '/models/grilledChicken_1752057967760.glb',
  'beef-fahita': '/models/grilledChicken_1752057967760.glb',
  'beef-steak': '/models/grilledChicken_1752057967760.glb',
  'the-oak-steak': '/models/grilledChicken_1752057967760.glb',
  
  // Chicken dishes  
  'chicken-dynamite': '/models/grilledChicken_1752057967760.glb',
  'chicken-fajita': '/models/grilledChicken_1752057967760.glb',
  'chicken-quesadilla': '/models/grilledChicken_1752057967760.glb',
  'shawarma-meat': '/models/grilledChicken_1752057967760.glb',
  'chicken-tender': '/models/grilledChicken_1752057967760.glb',
  'chicken-zinger-sandwich': '/models/grilledChicken_1752057967760.glb',
  'crispy-chicken-burger': '/models/grilledChicken_1752057967760.glb',
  'grilled-chicken': '/models/grilledChicken_1752057967760.glb',
  'chicken-mushroom': '/models/grilledChicken_1752057967760.glb',
  
  // Pizza
  'calzone-pizza': '/models/Calezone_1752057967755.glb',
  'pepperoni': '/models/Pepperoni Pizza_1752072187117.glb',
  'pizza-margherita': '/models/Margherita Pizza_1752072161908.glb',
  'pizza-chicken-alfredo': '/models/pestoChickenPizza_1752072026030.glb',
  'chicken-bbq-pizza': '/models/pestoChickenPizza_1752072026030.glb',
  
  // Pasta
  'fettuccine-alfredo': '/models/Fettuccine Alfredo_1752072150333.glb',
  'pesto-pasta': '/models/Pesto Pasta_1752072201259.glb',
  'rose-pasta': '/models/Rose Pasta_1752072212952.glb',
  'seafood-pasta': '/models/Sea Food Pasta_1752072136017.glb',
  'penna-arabita': '/models/Pesto Pasta_1752072201259.glb',
  
  // Sandwiches
  'cheese-steak-sandwich': '/models/grilledChicken_1752057967760.glb',
  'halloumi-sandwich': '/models/grilledChicken_1752057967760.glb',
  'halloumi-croissant': '/models/grilledChicken_1752057967760.glb',
  'the-oak-sandwich': '/models/grilledChicken_1752057967760.glb',
  'club-sandwich': '/models/grilledChicken_1752057967760.glb',
  
  // Salads
  'halloumi-salad': '/models/grilledChicken_1752057967760.glb',
  'smoked-salmon-salad': '/models/Sea Food Pasta_1752072136017.glb',
  'taco-salad': '/models/grilledChicken_1752057967760.glb',
  'waffle-salad': '/models/grilledChicken_1752057967760.glb',
  'chef-salad': '/models/grilledChicken_1752057967760.glb',
  'greek-salad': '/models/grilledChicken_1752057967760.glb',
  'caesar-salad': '/models/grilledChicken_1752057967760.glb',
  
  // Appetizers
  'dynamite-shrimp': '/models/Sea Food Pasta_1752072136017.glb',
  'mix-platter': '/models/grilledChicken_1752057967760.glb',
  'mozzarella-sticks': '/models/Margherita Pizza_1752072161908.glb',
  'onion-rings': '/models/Margherita Pizza_1752072161908.glb',
  'hallomi': '/models/Margherita Pizza_1752072161908.glb',
  'mexican-nachos': '/models/Margherita Pizza_1752072161908.glb',
  
  // Breakfast
  'hash-brown': '/models/grilledChicken_1752057967760.glb',
  'mac-and-cheese': '/models/Fettuccine Alfredo_1752072150333.glb',
  'eggs-of-your-choice': '/models/grilledChicken_1752057967760.glb',
  'tuna-sandwich': '/models/grilledChicken_1752057967760.glb',
  'turkey-omelette-croissant': '/models/grilledChicken_1752057967760.glb',
  
  // Manageesh (Middle Eastern)
  'manageesh-falafel': '/models/manageeshFalafel_1752071924239.glb',
  'manakish-labneh-rocca': '/models/manageeshLabnehandRocca_1752071939019.glb',
  'manageesh-labaneh-and-rocca': '/models/manageeshLabnehandRocca_1752071939019.glb',
  'mix-formaggio': '/models/manageeshMixCheese_1752071957248.glb',
  'manageesh-molasses-tahini': '/models/manageeshMolassesAndTahini_1752071973508.glb',
  'manageesh-nabelsi-cheese': '/models/ManageeshNabelsiCheese_1752071988625.glb',
  'zaatar-pomegranate': '/models/zaatarPomegranate_1752072117741.glb',
  
  // Seafood
  'sea-food-bowl': '/models/Sea Food Pasta_1752072136017.glb',
  'salmon-grill': '/models/Sea Food Pasta_1752072136017.glb',
  
  // Traditional
  'yalanji': '/models/zaatarPomegranate_1752072117741.glb',
};

// Get model path for a product
export function getModelPath(productId: string): string | null {
  return modelMapping[productId] || null;
}

// Check if model is GLTF format
export function isGLTFModel(modelPath: string): boolean {
  return modelPath.endsWith('.glb') || modelPath.endsWith('.gltf');
}