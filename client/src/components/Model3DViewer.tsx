import React, { useRef, useEffect, useState } from 'react';
import { X, RotateCcw, Play, Pause, Eye } from 'lucide-react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface Model3DViewerProps {
  modelPath: string;
  productName: string;
  isOpen: boolean;
  onClose: () => void;
  inline?: boolean;
}

export default function Model3DViewer({ modelPath, productName, isOpen, onClose, inline = false }: Model3DViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [zoom, setZoom] = useState(1);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;

    // Setup Three.js scene
    const scene = new THREE.Scene();
    // Elegant neutral background
    scene.background = new THREE.Color(0xf5f5f5);
    sceneRef.current = scene;

    // Setup camera with better perspective - closer and more zoomed in
    const width = inline ? canvasRef.current.clientWidth : 600;
    const height = inline ? canvasRef.current.clientHeight : 500;
    const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000);
    camera.position.set(2, 4, 3); // Closer position with better top-down angle
    cameraRef.current = camera;

    // Setup renderer with premium settings
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    // Premium studio lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Key light (main)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(8, 10, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 500;
    scene.add(keyLight);

    // Fill light (softer, from opposite side)
    const fillLight = new THREE.DirectionalLight(0xfff5e6, 0.8);
    fillLight.position.set(-5, 5, -3);
    scene.add(fillLight);

    // Rim light (back light for edge definition)
    const rimLight = new THREE.DirectionalLight(0xe6f3ff, 0.6);
    rimLight.position.set(0, 0, -10);
    scene.add(rimLight);

    // Warm accent lights
    const spotLight1 = new THREE.SpotLight(0xffa500, 0.8, 30, Math.PI / 6, 0.3);
    spotLight1.position.set(5, 8, 3);
    scene.add(spotLight1);

    const spotLight2 = new THREE.SpotLight(0xff6b35, 0.6, 25, Math.PI / 8, 0.4);
    spotLight2.position.set(-3, 6, 4);
    scene.add(spotLight2);

    // Add subtle environment lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.3);
    scene.add(hemiLight);

    // Setup orbit controls for better user interaction - closer zoom and better rotation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1.5; // Allow closer zoom
    controls.maxDistance = 8;   // Reduce max distance for tighter view
    controls.minPolarAngle = 0; // Allow full rotation from top
    controls.maxPolarAngle = Math.PI; // Allow rotation to bottom too
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.5;
    controlsRef.current = controls;

    // Helper function to enhance materials
    function enhanceMaterial(material: THREE.Material) {
      if (material instanceof THREE.MeshStandardMaterial) {
        material.metalness = 0.0;     // No metallic look for food
        material.roughness = 0.7;     // More matte surface, less glossy
        material.envMapIntensity = 0.8;  // Reduce environment reflection
        
        // Enhance food colors to look more appetizing but not too bright
        if (material.color) {
          material.color.multiplyScalar(1.2); // Moderate saturation boost
          material.color.convertSRGBToLinear();
        }
        
        // Subtle emissive glow for warmth
        material.emissive = new THREE.Color(0x0a0a0a);
        material.emissiveIntensity = 0.02;
      }
    }

    // Load GLTF model with enhanced processing
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        
        // Enhanced material processing for better visuals
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            // Enable shadows
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Enhance materials
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach(mat => enhanceMaterial(mat));
              } else {
                enhanceMaterial(child.material);
              }
            }
          }
        });
        
        // Center and scale model optimally - bigger and more zoomed in
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        model.position.sub(center);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4.5 / maxDim; // Much larger scale for better visibility
        model.scale.setScalar(scale);
        
        // Rotate model slightly for better initial view from above
        model.rotation.x = -0.2; // Slight tilt to show depth
        model.rotation.y = 0.3;  // Rotate to show interesting angle
        
        // Position slightly above ground for better presentation
        model.position.y += 0.5;
        
        scene.add(model);
        modelRef.current = model;
        setLoading(false);
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total) * 100 + '%');
      },
      (error) => {
        console.error('Error loading model:', error);
        setLoading(false);
      }
    );

    // Enhanced animation loop
    const animate = () => {
      if (controlsRef.current) {
        controlsRef.current.autoRotate = autoRotate;
        controlsRef.current.update();
      }
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [isOpen, modelPath, autoRotate]);

  const handleViewInAR = async () => {
    console.log('=== STARTING LIVE AR CAMERA ===');
    console.log('Product:', productName);
    console.log('Model path:', modelPath);
    
    try {
      // Enhanced mobile device detection
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
      const isAndroid = /android/i.test(userAgent);
      const isMobile = /Mobi|Android/i.test(userAgent) || 
                      ('ontouchstart' in window) || 
                      (navigator.maxTouchPoints > 0) ||
                      (navigator.msMaxTouchPoints > 0);
      
      console.log('Device detection:', { isIOS, isAndroid, isMobile, userAgent });
      
      // Create a dynamic HTML page with model-viewer that triggers AR immediately
      const arPageContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>AR Viewer - ${productName}</title>
  <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
  <style>
    body { margin: 0; background: #000; }
    model-viewer { 
      width: 100vw; 
      height: 100vh; 
      --poster-color: transparent;
    }
    #arButton {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px 40px;
      background: #8B4513;
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      z-index: 1000;
    }
    #closeButton {
      position: absolute;
      top: 20px;
      right: 20px;
      padding: 10px 20px;
      background: rgba(255,255,255,0.9);
      border: none;
      border-radius: 5px;
      cursor: pointer;
      z-index: 1001;
    }
  </style>
</head>
<body>
  <model-viewer
    id="arModel"
    src="${window.location.origin}${modelPath}"
    ar
    ar-modes="webxr scene-viewer quick-look"
    camera-controls
    auto-rotate
    loading="eager">
    
    <button slot="ar-button" id="arButton">
      📱 Open LIVE AR Camera
    </button>
    
  </model-viewer>
  
  <button id="closeButton" onclick="window.close()">✕ Close</button>
  
  <script>
    console.log('AR page loaded');
    const modelViewer = document.querySelector('#arModel');
    const arButton = document.querySelector('#arButton');
    
    // Auto-trigger AR when page loads
    modelViewer.addEventListener('load', () => {
      console.log('Model loaded, auto-triggering AR');
      setTimeout(() => {
        if (arButton) {
          arButton.click();
          console.log('AR CAMERA TRIGGERED AUTOMATICALLY');
        }
      }, 1000);
    });
    
    // Manual trigger as backup
    arButton.addEventListener('click', () => {
      console.log('MANUAL AR CAMERA TRIGGER');
      if (modelViewer.activateAR) {
        modelViewer.activateAR();
      }
    });
  </script>
</body>
</html>`;

      // Create a blob URL for the AR page
      const blob = new Blob([arPageContent], { type: 'text/html' });
      const arPageUrl = URL.createObjectURL(blob);
      
      console.log('Opening dedicated AR page...');
      
      // Open the AR page in a new window/tab
      const arWindow = window.open(arPageUrl, '_blank', 'width=100vw,height=100vh,fullscreen=yes');
      
      if (arWindow) {
        console.log('LIVE AR page opened successfully');
        // Clean up blob URL after a delay
        setTimeout(() => {
          URL.revokeObjectURL(arPageUrl);
        }, 10000);
      } else {
        console.error('Failed to open AR page');
        alert('Please allow popups for this site to use AR camera');
      }
      
    } catch (error) {
      console.error('AR Error:', error);
      alert('Unable to start LIVE AR camera. Please ensure you are on a mobile device with camera access and try again.');
    }
  };

  const handleReset = () => {
    if (controlsRef.current && cameraRef.current) {
      cameraRef.current.position.set(4, 3, 6);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
      setZoom(1);
    }
  };

  if (!isOpen) return null;

  if (inline) {
    return (
      <div className="relative w-full h-full">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full block"
          style={{ background: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)' }}
        />
        
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-warm-brown border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-700 font-medium">Loading 3D Model...</p>
            </div>
          </div>
        )}

        {/* AR Controls for inline */}
        <div className="absolute top-4 left-4 flex gap-2">
          <button
            onClick={handleViewInAR}
            className="p-3 bg-warm-brown text-white rounded-lg hover:bg-opacity-90 transition-all shadow-lg flex items-center gap-2"
            title="View in AR"
          >
            <Eye className="w-5 h-5" />
            <span className="text-sm font-medium">View in AR</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
      <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl max-w-2xl w-full mx-4">
        {/* Simple Header */}
        <div className="bg-warm-brown px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{productName}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-amber-200 transition-colors p-2 rounded-full hover:bg-black hover:bg-opacity-20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3D Viewer */}
        <div className="relative">
          <canvas 
            ref={canvasRef} 
            className="w-full h-[500px] block"
            style={{ background: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)' }}
          />
          
          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-warm-brown border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-700 font-medium">Loading...</p>
              </div>
            </div>
          )}

          {/* AR Controls */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className="p-3 bg-white bg-opacity-90 text-gray-700 rounded-lg hover:bg-opacity-100 transition-all shadow-lg"
              title={autoRotate ? "Stop Rotation" : "Start Rotation"}
            >
              {autoRotate ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button
              onClick={handleReset}
              className="p-3 bg-white bg-opacity-90 text-gray-700 rounded-lg hover:bg-opacity-100 transition-all shadow-lg"
              title="Reset View"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={handleViewInAR}
              className="p-3 bg-warm-brown text-white rounded-lg hover:bg-opacity-90 transition-all shadow-lg flex items-center gap-2"
              title="View in AR"
            >
              <Eye className="w-5 h-5" />
              <span className="text-sm font-medium">View in AR</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
