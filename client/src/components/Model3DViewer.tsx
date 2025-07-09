import React, { useRef, useEffect, useState } from 'react';
import { X, RotateCcw, ZoomIn, ZoomOut, Play, Pause } from 'lucide-react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface Model3DViewerProps {
  modelPath: string;
  productName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Model3DViewer({ modelPath, productName, isOpen, onClose }: Model3DViewerProps) {
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
    // Premium warm lighting environment
    scene.background = new THREE.Color(0x2a2a2a);
    scene.fog = new THREE.Fog(0x2a2a2a, 10, 50);
    sceneRef.current = scene;

    // Setup camera with better perspective
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.set(4, 3, 6);
    cameraRef.current = camera;

    // Setup renderer with premium settings
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(800, 600);
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

    // Setup orbit controls for better user interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 2;
    controls.maxDistance = 15;
    controls.maxPolarAngle = Math.PI / 1.8;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 2.0;
    controlsRef.current = controls;

    // Helper function to enhance materials
    function enhanceMaterial(material: THREE.Material) {
      if (material instanceof THREE.MeshStandardMaterial) {
        material.metalness = 0.1;
        material.roughness = 0.4;
        material.envMapIntensity = 1.2;
        
        // Enhance food colors to look more appetizing
        if (material.color) {
          material.color.multiplyScalar(1.3); // Boost saturation
          material.color.convertSRGBToLinear();
        }
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
        
        // Center and scale model optimally
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        model.position.sub(center);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3.5 / maxDim; // Larger scale for better visibility
        model.scale.setScalar(scale);
        
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

  const handleZoomIn = () => {
    if (controlsRef.current) {
      const newZoom = Math.min(zoom * 1.2, 3);
      setZoom(newZoom);
      controlsRef.current.dollyIn(1.2);
      controlsRef.current.update();
    }
  };

  const handleZoomOut = () => {
    if (controlsRef.current) {
      const newZoom = Math.max(zoom / 1.2, 0.5);
      setZoom(newZoom);
      controlsRef.current.dollyOut(1.2);
      controlsRef.current.update();
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-warm-brown to-amber-600 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">{productName}</h2>
            <p className="text-amber-100 text-sm">Interactive 3D Model</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-amber-200 transition-colors p-2 rounded-full hover:bg-black hover:bg-opacity-20"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 3D Viewer */}
        <div className="relative">
          <canvas 
            ref={canvasRef} 
            className="w-[800px] h-[600px] block"
            style={{ background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)' }}
          />
          
          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white font-medium">Loading 3D Model...</p>
                <p className="text-gray-300 text-sm">Please wait while we prepare your dish</p>
              </div>
            </div>
          )}

          {/* Controls Overlay */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-3 rounded-full transition-all shadow-lg ${
                autoRotate 
                  ? 'bg-amber-500 text-white hover:bg-amber-600' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              title={autoRotate ? 'Stop Rotation' : 'Start Rotation'}
            >
              {autoRotate ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button
              onClick={handleZoomIn}
              className="p-3 bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 transition-all shadow-lg"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-3 bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 transition-all shadow-lg"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button
              onClick={handleReset}
              className="p-3 bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 transition-all shadow-lg"
              title="Reset View"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* Info Panel */}
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 rounded-lg p-3 text-white">
            <p className="text-sm font-medium mb-1">🖱️ Click & drag to rotate</p>
            <p className="text-sm opacity-75">🔍 Scroll to zoom</p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-800 px-6 py-3 flex items-center justify-between">
          <div className="text-gray-300 text-sm">
            Premium 3D visualization powered by Three.js
          </div>
          <div className="flex gap-2">
            <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">HD Quality</span>
            <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Interactive</span>
          </div>
        </div>
      </div>
    </div>
  );
}