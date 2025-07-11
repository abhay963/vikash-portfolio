import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const EnergyModel = ({ isMobile, mouse }) => {
  const model = useGLTF("/energy_scene/scene.glb");
  const modelRef = useRef();

  useFrame(() => {
    if (!isMobile && modelRef.current) {
      modelRef.current.rotation.y = mouse.current.x * 0.3;
      modelRef.current.rotation.x = mouse.current.y * 0.05;
    }
  });

  return (
    <mesh>
      <hemisphereLight intensity={0.1} groundColor='black' />
      <spotLight
        position={[10, 20, 10]}
        angle={0.2}
        penumbra={1}
        intensity={0.7}
        castShadow
        shadow-mapSize={512}
      />
      <pointLight intensity={0.6} />

      <primitive
        ref={modelRef}
        object={model.scene}
        scale={isMobile ? 0.8 : 1.2}
        position={isMobile ? [0, -1, 0] : [0, -1.2, 0]}
        rotation={[0, 0.5, 0]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  const handlePointerMove = (event) => {
    mouse.current = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    };
  };

  return (
    <div className="w-full h-full" onPointerMove={handlePointerMove}>
      <Canvas
        frameloop='demand'
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [8, 3, 10], fov: 30 }}
        gl={{ antialias: true, preserveDrawingBuffer: true }}
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