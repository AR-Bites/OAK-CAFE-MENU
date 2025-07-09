// 3D Model mapping - ONLY for dishes with actual unique 3D models
export const modelMapping: Record<string, string> = {
  // Pizza - with unique models
  'calzone-pizza': '/models/Calezone_1752057967755.glb',
  'pepperoni': '/models/Pepperoni Pizza_1752072187117.glb',
  'pizza-margherita': '/models/Margherita Pizza_1752072161908.glb',
  'pizza-chicken-alfredo': '/models/pestoChickenPizza_1752072026030.glb',
  
  // Pasta - with unique models
  'fettuccine-alfredo': '/models/Fettuccine Alfredo_1752072150333.glb',
  'pesto-pasta': '/models/Pesto Pasta_1752072201259.glb',
  'rose-pasta': '/models/Rose Pasta_1752072212952.glb',
  'seafood-pasta': '/models/Sea Food Pasta_1752072136017.glb',
  
  // Chicken - with dedicated model
  'grilled-chicken': '/models/grilledChicken_1752057967760.glb',
  
  // Manageesh (Middle Eastern) - with unique models
  'manageesh-falafel': '/models/manageeshFalafel_1752071924239.glb',
  'manakish-labneh-rocca': '/models/manageeshLabnehandRocca_1752071939019.glb',
  'manageesh-labaneh-and-rocca': '/models/manageeshLabnehandRocca_1752071939019.glb',
  'mix-formaggio': '/models/manageeshMixCheese_1752071957248.glb',
  'manageesh-molasses-tahini': '/models/manageeshMolassesAndTahini_1752071973508.glb',
  'manageesh-nabelsi-cheese': '/models/ManageeshNabelsiCheese_1752071988625.glb',
  'zaatar-pomegranate': '/models/zaatarPomegranate_1752072117741.glb',
};

// Get model path for a product
export function getModelPath(productId: string): string | null {
  return modelMapping[productId] || null;
}

// Check if model is GLTF format
export function isGLTFModel(modelPath: string): boolean {
  return modelPath.endsWith('.glb') || modelPath.endsWith('.gltf');
}