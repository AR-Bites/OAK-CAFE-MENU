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

    // Setup renderer optimized for performance
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: false, // Disable for better performance
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Reduced for better performance
    renderer.shadowMap.enabled = false; // Disable shadows for performance
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    // Simplified lighting for better performance
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Single key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    // Single fill light
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-3, 3, -3);
    scene.add(fillLight);

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
    controls.autoRotateSpeed = 1.0; // Slower for better performance
    // Optimize mobile touch controls
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.0;
    controls.panSpeed = 1.0;
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
        
        // Simplified material processing for performance
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            // Skip shadows for performance
            child.castShadow = false;
            child.receiveShadow = false;
            
            // Basic material optimization
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach(mat => {
                  if (mat instanceof THREE.MeshStandardMaterial) {
                    mat.metalness = 0.0;
                    mat.roughness = 0.7;
                  }
                });
              } else {
                if (child.material instanceof THREE.MeshStandardMaterial) {
                  child.material.metalness = 0.0;
                  child.material.roughness = 0.7;
                }
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

    // Performance-optimized animation loop with throttling
    let lastTime = 0;
    const targetFPS = 30; // Lower FPS for better performance
    const frameTime = 1000 / targetFPS;
    
    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameTime) {
        if (controlsRef.current) {
          controlsRef.current.autoRotate = autoRotate;
          controlsRef.current.update();
        }
        renderer.render(scene, camera);
        lastTime = currentTime;
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animate(0);

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
    if (cameraRef.current) {
      const direction = new THREE.Vector3();
      cameraRef.current.getWorldDirection(direction);
      cameraRef.current.position.addScaledVector(direction, 0.5);
      setZoom(Math.min(zoom * 1.2, 3));
    }
  };

  const handleZoomOut = () => {
    if (cameraRef.current) {
      const direction = new THREE.Vector3();
      cameraRef.current.getWorldDirection(direction);
      cameraRef.current.position.addScaledVector(direction, -0.5);
      setZoom(Math.max(zoom / 1.2, 0.5));
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

        {/* Mobile-Optimized Controls for inline */}
        <div className="absolute top-2 left-2 flex gap-1 sm:gap-2">
          <button
            onClick={handleZoomIn}
            className="p-2 sm:p-3 bg-white bg-opacity-90 text-gray-700 rounded-lg hover:bg-opacity-100 active:scale-95 transition-all shadow-lg touch-manipulation"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 sm:p-3 bg-white bg-opacity-90 text-gray-700 rounded-lg hover:bg-opacity-100 active:scale-95 transition-all shadow-lg touch-manipulation"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
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

          {/* Mobile-Optimized Controls */}
          <div className="absolute top-2 right-2 flex gap-1 sm:gap-2">
            <button
              onClick={handleZoomIn}
              className="p-2 sm:p-3 bg-white bg-opacity-90 text-gray-700 rounded-lg hover:bg-opacity-100 active:scale-95 transition-all shadow-lg touch-manipulation"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 sm:p-3 bg-white bg-opacity-90 text-gray-700 rounded-lg hover:bg-opacity-100 active:scale-95 transition-all shadow-lg touch-manipulation"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}