// 3D Model mapping - All available 3D models
export const modelMapping: Record<string, string> = {
  // Pizza - with unique models
  'calzone-pizza': '/models/Calezone_1752057967755.glb',
  'pepperoni': '/models/Pepperoni Pizza_1752072187117.glb',
  'pizza-margherita': '/models/Margherita Pizza_1752072161908.glb',
  'pizza-chicken-alfredo': '/models/pestoChickenPizza_1752072026030.glb',
  'chicken-bbq-pizza': '/models/pestoChickenPizza_1752072026030.glb',
  
  // Pasta - with unique models
  'fettuccine-alfredo': '/models/Fettuccine Alfredo_1752072150333.glb',
  'pesto-pasta': '/models/Pesto Pasta_1752072201259.glb',
  'rose-pasta': '/models/Rose Pasta_1752072212952.glb',
  'seafood-pasta': '/models/Sea Food Pasta_1752072136017.glb',
  'penna-arabita': '/models/pennaArabita_1752072019113.glb',
  
  // Burgers - with dedicated models
  'oak-beef-burger': '/models/beefBurger_1752057967754.glb',
  'crispy-chicken-burger': '/models/crispyChickenBurger_1752057967758.glb',
  
  // Main Dishes & Steaks
  'grilled-chicken': '/models/grilledChicken_1752057967760.glb',
  'the-oak-steak': '/models/Steak_1752072087985.glb',
  'beef-steak': '/models/Steak_1752072087985.glb',
  'beef-fahita': '/models/beefFahita_1752057967754.glb',
  
  // Chicken Dishes
  'chicken-fajita': '/models/chickenFajita_1752057967757.glb',
  'chicken-quesadilla': '/models/chickenQuesadilla_1752057967757.glb',
  'chicken-tender': '/models/chickenTender_1752057967758.glb',
  'chicken-zinger-sandwich': '/models/chickenZingerSandwich_1752057967758.glb',
  'shawarma-meat': '/models/chickenShawerma_1752057967757.glb',
  'chicken-dynamite': '/models/chickenDynamiteSalad_1752057967756.glb',
  
  // Sandwiches
  'cheese-steak-sandwich': '/models/cheeseSteakSandwich_1752057967756.glb',
  'halloumi-sandwich': '/models/halloumiSandwich_1752057967753.glb',
  
  // Breakfast Items
  'hash-brown': '/models/hashBrown_1752057967753.glb',
  'mac-and-cheese': '/models/macAndCheese_1752071917275.glb',
  
  // Salads
  'halloumi-salad': '/models/hallomiSalad_1752057967761.glb',
  'smoked-salmon-salad': '/models/smokedSalmonSalad_1752072081412.glb',
  'taco-salad': '/models/tacoSalad_1752072096811.glb',
  'waffle-salad': '/models/waffleSalad_1752072103683.glb',
  
  // Appetizers
  'dynamite-shrimp': '/models/dynamiteShrimp_1752057967759.glb',
  'mix-platter': '/models/foodPlatter_1752057967759.glb',
  'mozzarella-sticks': '/models/mozzerellaSticks_1752072003869.glb',
  'onion-rings': '/models/onionRings_1752072011416.glb',
  'hallomi': '/models/hallomi_1752057967760.glb',
  
  // Seafood
  'sea-food-bowl': '/models/seaFoodBowl_1752072070465.glb',
  'salmon-grill': '/models/smokedSalmonSalad_1752072081412.glb',
  
  // Manageesh (Middle Eastern) - with unique models
  'manageesh-falafel': '/models/manageeshFalafel_1752071924239.glb',
  'manakish-labneh-rocca': '/models/manageeshLabnehandRocca_1752071939019.glb',
  'manageesh-labaneh-and-rocca': '/models/manageeshLabnehandRocca_1752071939019.glb',
  'mix-formaggio': '/models/manageeshMixCheese_1752071957248.glb',
  'manageesh-molasses-tahini': '/models/manageeshMolassesAndTahini_1752071973508.glb',
  'manageesh-nabelsi-cheese': '/models/ManageeshNabelsiCheese_1752071988625.glb',
  'zaatar-pomegranate': '/models/zaatarPomegranate_1752072117741.glb',
  
  // Traditional
  'yalanji': '/models/yalanji_1752072109513.glb',
};

// Get model path for a product
export function getModelPath(productId: string): string | null {
  return modelMapping[productId] || null;
}

// Check if model is GLTF format
export function isGLTFModel(modelPath: string): boolean {
  return modelPath.endsWith('.glb') || modelPath.endsWith('.gltf');
}