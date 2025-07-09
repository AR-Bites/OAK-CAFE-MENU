import React, { useRef, useEffect, useState } from 'react';
import { X, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

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
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;

    // Setup Three.js scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(800, 600);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Setup lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-5, -5, -5);
    scene.add(directionalLight2);

    // Load GLTF model
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        
        // Center and scale model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        model.position.sub(center);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        model.scale.setScalar(scale);
        
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

    // Animation loop
    const animate = () => {
      if (autoRotate && modelRef.current) {
        modelRef.current.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Handle canvas resize
    const handleResize = () => {
      if (canvasRef.current && cameraRef.current && rendererRef.current) {
        const rect = canvasRef.current.parentElement?.getBoundingClientRect();
        if (rect) {
          const width = rect.width;
          const height = rect.height;
          cameraRef.current.aspect = width / height;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(width, height);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [isOpen, modelPath, autoRotate]);

  const handleZoomIn = () => {
    if (cameraRef.current) {
      cameraRef.current.position.multiplyScalar(0.9);
    }
  };

  const handleZoomOut = () => {
    if (cameraRef.current) {
      cameraRef.current.position.multiplyScalar(1.1);
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!modelRef.current) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    modelRef.current.rotation.y = x * Math.PI;
    modelRef.current.rotation.x = y * Math.PI * 0.5;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative w-full max-w-4xl h-full max-h-[80vh] bg-white rounded-lg overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <h2 className="text-xl font-bold luxury-font">{productName}</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`p-2 rounded-full transition-colors ${
                  autoRotate 
                    ? 'bg-warm-brown text-white' 
                    : 'bg-white bg-opacity-20 hover:bg-opacity-30'
                }`}
                title="Toggle Auto Rotation"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <button
                onClick={handleZoomIn}
                className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3D Canvas */}
        <div className="w-full h-full relative">
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-pointer"
            onMouseMove={handleMouseMove}
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Instructions */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="bg-black bg-opacity-50 text-white text-sm p-3 rounded-lg">
            <p className="text-center">
              Move mouse to rotate • Scroll to zoom • Click controls above
            </p>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-warm-brown mx-auto mb-4"></div>
              <p className="text-gray-600">Loading 3D Model...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}