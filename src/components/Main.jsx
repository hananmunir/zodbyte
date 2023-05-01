import React,{useRef, useEffect, useState} from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { SpotLight } from '@react-three/drei';
import { useControls } from 'leva';

//initial state of spot light controls
const intensityValue = 200;
const distanceValue = 224;
const angleValue = 0.09;
const penumbraValue = 0.05;
const decayValue = 1;


const LucyModel = () => {
  const gltf = useLoader(GLTFLoader, '/models/Lucy100k.gltf');
  const model = gltf.scene;

  // decrease the size of the model
  model.scale.set(0.1, 0.1, 0.1);
  // model.position.set(5, 75, 0);
  model.rotateY(5);
  // use the useRef hook to access the model mesh
  const meshRef = useRef();
   // set the position of the model based on the values of the controls
   model.position.set(25, 75, 0);
  
  return <primitive object={model} ref={meshRef} />;
};


export default function Main() {
  const spotLightRef = React.useRef();
  const lightHelperRef = React.useRef();
  const planeRef = React.useRef();
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
    color: '#0070ff',
    intensity: { value: intensityValue , min: 10, max: 200, step: 10 },
    distance: { value: distanceValue, min: 150, max: 500, step: 10 },
    //to add a texture to the light, we need to use the texture object
    map: { value: 'disturb.jpg', options: ['none', 'disturb.jpg', 'colors.png', 'uv_grid_opengl.jpg'] },
    angle: { value: angleValue, min: .05, max: Math.PI / 2 , step: .01},
    penumbra: { value: penumbraValue, min: 0, max: 1, step: .01 },
    decay: { value: decayValue, min: 1, max: 2, step: .01 },
    
  });

  //to rotate spot light continuously 
  const RotateLight = () => {
    useFrame(() => {
      spotLightRef.current.position.x = Math.sin(Date.now() * 0.0005) * 1000;
      spotLightRef.current.position.z = Math.cos(Date.now() * 0.0005) * 1000;
    });
    return (
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
    )
  };
  

  return (
    <div style={{ height: '100vh', backgroundColor: "#000" }}>
      <Canvas
        concurrent
        camera={{
          position: [100, 60, 1],
          fov: 15,
          near: 1,
          far: 1000,
        }}
      >
        <ambientLight intensity={0.05} />
        <pointLight position={[600, 35, 300]} />
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
          <group position={[0, 1500, 0]}>
            <RotateLight />
          </group>
          {spotLightRef.current && (
            <spotLightHelper args={[spotLightRef.current]} ref={lightHelperRef} />
          )}
        </group>
      </Canvas>
    </div>
  );
}
