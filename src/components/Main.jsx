import React,{useRef, useEffect, useState} from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { SpotLight } from '@react-three/drei';
import { useControls } from 'leva';

const LucyModel = () => {
  const gltf = useLoader(GLTFLoader, '/models/Lucy100k.gltf');
  const model = gltf.scene;
  const controls = {
    positionX: { value: 215, min: -500, max: 500 },
    positionY: { value: 75, min: -100, max: 100 },
    positionZ: { value: 0, min: -100, max: 100 },
  };
  // decrease the size of the model
  model.scale.set(0.1, 0.1, 0.1);
  // model.position.set(5, 75, 0);
  model.rotateY(5)
  // use the useRef hook to access the model mesh
  const meshRef = useRef();

  // use useFrame to perform updates on each frame
  useFrame(() => {
    // rotate mesh every frame, this is outside of React without overhead
    meshRef.current.rotation.y += 0.01;
  });

   // use useControls to create a control panel with the properties defined in the controls object
   const { positionX, positionY, positionZ } = useControls(controls);

   // set the position of the model based on the values of the controls
   model.position.set(positionX, positionY, positionZ);
  
  return <primitive object={model} ref={meshRef} />;
};



export default function Main() {
  const spotLightRef = React.useRef();
  const lightHelperRef = React.useRef();
  const [textures, setTextures] = React.useState(null);


  React.useEffect(() => {
    const loader = new THREE.TextureLoader().setPath('/textures/');
    const filenames = ['disturb.jpg', 'colors.png', 'uv_grid_opengl.jpg'];
    const newTextures = { none: null };
    for (let i = 0; i < filenames.length; i++) {
      const filename = filenames[i];
      const texture = loader.load(filename, () => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.encoding = THREE.sRGBEncoding;
      });
      newTextures[filename] = texture;
    }
    setTextures(newTextures);
  }, []);

  //initial state of spot light controls
  const spotlightControls = useControls({
    color: '#004cff',
    intensity: { value: 200, min: 10, max: 200 },
    distance: { value: 224, min: 150, max: 1000 },
    //to add a texture to the light, we need to use the texture object
    map: { value: 'disturb.jpg', options: ['none', 'disturb.jpg', 'colors.png', 'uv_grid_opengl.jpg'] },
    angle: { value: 0.10, min: .10, max: Math.PI / 2 },
    penumbra: { value: 1, min: 0, max: 1 },
    decay: { value: 1, min: 0, max: 2 },
  });

  

  return (
    <div style={{ height: '100vh', backgroundColor: "#000" }}>
      <Canvas
        concurrent
        camera={{
          position: [100, 20, 1],
          fov: 18,
          near: 1,
          far: 1000,
        }}
      >
        <ambientLight intensity={0.05} />
        <pointLight position={[600, 125, 300]} />
        <OrbitControls minDistance={20} maxDistance={2000} maxPolarAngle={Math.PI / 2} />
        <group scale={[.1,.1,.1]} >
          <mesh
            receiveShadow
            rotation-x={-Math.PI / 2}
            position={[0, -1, 0]}
          >
            <planeBufferGeometry args={[2000, 2000]} />
            <meshLambertMaterial color={0x808080} />
          </mesh>
          <group>
            <LucyModel />
          </group>
          <group position={[ 1695,560,0 ]}  >
            <spotLight
              ref={spotLightRef}
              scale={[10,10,10]}
              color={spotlightControls.color}
              intensity={spotlightControls.intensity}
              distance={spotlightControls.distance}
              map={textures && textures[spotlightControls.map]}
              angle={spotlightControls.angle}
              penumbra={spotlightControls.penumbra}
              decay={spotlightControls.decay}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-near={10}
              shadow-camera-far={200}
              shadow-focus={1}
            />
          </group>
          {spotLightRef.current && (
            <spotLightHelper args={[spotLightRef.current]} ref={lightHelperRef} />
          )}
        </group>
      </Canvas>
    </div>
  );
}
