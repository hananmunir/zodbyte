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
    positionX: { value: 45, min: -500, max: 500 },
    positionY: { value: 75, min: -100, max: 100 },
    positionZ: { value: 0, min: -100, max: 100 },
  };
  // decrease the size of the model
  model.scale.set(0.1, 0.1, 0.1);
  // model.position.set(5, 75, 0);
  model.rotateY(5);
  // use the useRef hook to access the model mesh
  const meshRef = useRef();

  // use useFrame to perform updates on each frame
  // useFrame(() => {
  //   // rotate mesh every frame, this is outside of React without overhead
  //   meshRef.current.rotation.y += 0.01;
  // });

   // use useControls to create a control panel with the properties defined in the controls object
   const { positionX, positionY, positionZ } = useControls(controls);

   // set the position of the model based on the values of the controls
   model.position.set(positionX, positionY, positionZ);
  
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
    intensity: { value: 200, min: 10, max: 200, step: 10 },
    distance: { value: 224, min: 150, max: 500, step: 10 },
    //to add a texture to the light, we need to use the texture object
    map: { value: 'disturb.jpg', options: ['none', 'disturb.jpg', 'colors.png', 'uv_grid_opengl.jpg'] },
    angle: { value: 0.09, min: .05, max: Math.PI / 2 , step: .01},
    penumbra: { value: 1, min: 0, max: 1, step: .01 },
    decay: { value: 1, min: 1, max: 2, step: .01 },
    
  });

  //to make group controls
  const groupControls = useControls({
    X: { value: 0, min: -3000, max: 3000 },
    Y: { value: 1500, min: -3000, max: 3000 },
    Z: { value: 0, min: -3000, max: 3000 },
    // to rotate te group
    rotateX: { value: 0, min: -Math.PI, max: Math.PI, step: .01 },
    rotateY: { value: 0, min: -Math.PI, max: Math.PI, step: .01 },
    rotateZ: { value: 0, min: -Math.PI, max: Math.PI, step: .01 },
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
          <group position={[groupControls.X, groupControls.Y, groupControls.Z ]}
          rotation={[groupControls.rotateX, groupControls.rotateY, groupControls.rotateZ]}
           >
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
