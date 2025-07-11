import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const EnergyModel = ({ mouse }) => {
  const model = useGLTF("/energy_scene/scene.glb");
  const modelRef = useRef();

  // Animate model with mouse
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += (mouse.current.x * 0.5 - modelRef.current.rotation.y) * 0.05;
      modelRef.current.rotation.x += (mouse.current.y * 0.1 - modelRef.current.rotation.x) * 0.05;
      // Optional: Limit x rotation for natural tilt
      modelRef.current.rotation.x = Math.max(Math.min(modelRef.current.rotation.x, 0.3), -0.3);
    }
  });

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[10, 30, 15]}
        angle={0.25}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />

      <primitive
        ref={modelRef}
        object={model.scene}
        scale={1.8}
        position={[0, -1.5, 0]}
        rotation={[0, 0.5, 0]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });

  // Screen size check
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  // Update mouse coordinates
  const handlePointerMove = (event) => {
    mouse.current = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    };
  };

  // ❌ Don’t render anything on mobile
  if (isMobile) return null;

  return (
    <div className='w-full h-full' onPointerMove={handlePointerMove}>
      <Canvas
        frameloop='always'
        shadows
        dpr={[1, 2]}
        camera={{ position: [10, 5, 10], fov: 30 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <EnergyModel mouse={mouse} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default ComputersCanvas;
