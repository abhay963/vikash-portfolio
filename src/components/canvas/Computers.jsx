import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const EnergyModel = ({ isMobile, mouse }) => {
  const model = useGLTF("/energy_scene/scene.glb");
  const modelRef = useRef();

  // Rotate the model as the mouse moves
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = mouse.current.x * 0.5;
      modelRef.current.rotation.x = mouse.current.y * 0.1;
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
        scale={isMobile ? 1.2 : 1.8}
        position={isMobile ? [0, -1, 0] : [0, -1.5, 0]}
        rotation={[0, 0.5, 0]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  // Update mouse ref as user moves cursor
  const handlePointerMove = (event) => {
    mouse.current = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    };
  };

  return (
    <div className="w-full h-full" onPointerMove={handlePointerMove}>
      <Canvas
        frameloop='always'
        shadows
        dpr={[1, 2]}
        camera={{ position: [10, 5, 10], fov: 30 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <EnergyModel isMobile={isMobile} mouse={mouse} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default ComputersCanvas;
