import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { SpotLight } from "@react-three/drei";
import { useControls } from "leva";

//initial state of spot light controls
const intensityValue = 200;
const distanceValue = 224;
const angleValue = 0.09;
const penumbraValue = 0.05;
const decayValue = 1;
const focus = 1;
const x = 97,
  y = 60,
  z = 34;

const LucyModel = () => {
  const gltf = useLoader(GLTFLoader, "/models/Lucy100k.gltf");
  const model = gltf.scene;
  const { camera } = useThree();
  // const controls = useControls({
  //   x: { value: x, min: -100, max: 100, step: 1 },
  //   y: { value: y, min: -100, max: 100, step: 1 },
  //   z: { value: z, min: -100, max: 100, step: 1 },
  // });

  useFrame(() => {
    camera.position.x = x;
    camera.position.y = y;
    camera.position.z = z;
  });

  // decrease the size of the model
  model.scale.set(0.12, 0.12, 0.12);
  // model.position.set(5, 75, 0);
  model.rotateY(THREE.MathUtils.degToRad(230));
  // use the useRef hook to access the model mesh
  const meshRef = useRef();
  // set the position of the model based on the values of the controls
  model.position.set(25, 85, 10);

  return <primitive object={model} ref={meshRef} receiveShadow />;
};

export default function Main() {
  const spotLightRef = React.useRef();
  const lightHelperRef = React.useRef();
  const planeRef = React.useRef();
  const [textures, setTextures] = React.useState(null);

  React.useEffect(() => {
    const loader = new THREE.TextureLoader().setPath("/textures/");
    const filenames = ["disturb.jpg", "colors.png", "uv_grid_opengl.jpg"];
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
    color: "#11a3c4",
    intensity: { value: intensityValue, min: 10, max: 200, step: 10 },
    distance: { value: distanceValue, min: 150, max: 500, step: 10 },
    //to add a texture to the light, we need to use the texture object
    map: {
      value: "disturb.jpg",
      options: ["none", "disturb.jpg", "colors.png", "uv_grid_opengl.jpg"],
    },
    angle: { value: angleValue, min: 0.05, max: Math.PI / 2, step: 0.01 },
    penumbra: { value: penumbraValue, min: 0, max: 1, step: 0.01 },
    decay: { value: decayValue, min: 1, max: 2, step: 0.01 },
    focus: { value: focus, min: -3, max: 3, step: 0.05 },
  });

  //to rotate spot light continuously
  const RotateLight = () => {
    useFrame(() => {
      spotLightRef.current.position.x = Math.sin(Date.now() * 0.0003) * 800;
      spotLightRef.current.position.z = Math.cos(Date.now() * 0.0003) * 800;
    });
    return (
      <spotLight
        ref={spotLightRef}
        scale={[10, 10, 10]}
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
        shadow-focus={spotlightControls.focus}
      />
    );
  };

  return (
    <div
      style={{
        height: "100vh",

        position: "relative",
      }}
    >
      <div
        style={{
          height: "100vh",
        }}
      >
        {" "}
        <Canvas
          camera={{
            position: [100, 60, 25],
            fov: 15,
            near: 1,
            far: 1000,
          }}
        >
          <pointLight position={[600, 35, 300]} castShadow />
          {/* <OrbitControls
          minDistance={20}
          maxDistance={2000}
          maxPolarAngle={Math.PI / 2}
        /> */}
          <group scale={[0.09, 0.09, 0.09]} position={[0, -2, 0]}>
            <mesh rotation-x={-Math.PI / 2} position={[0, -1, -10]}>
              <planeBufferGeometry args={[2000, 2000]} />
              <meshLambertMaterial color={0x808080} />
            </mesh>

            <LucyModel />

            <group position={[0, 1200, 0]}>
              <RotateLight />
            </group>
            {spotLightRef.current && (
              <spotLightHelper
                args={[spotLightRef.current]}
                ref={lightHelperRef}
              />
            )}
          </group>
        </Canvas>
      </div>

      <div
        style={{
          position: "absolute",
          top: "15%",

          zIndex: 5,
          left: "5%",
        }}
        className='flex flex-col h-3/4 text-white'
      >
        <span
          style={{
            fontSize: "80px",
            lineHeight: "100px",
            marginBottom: "1rem",
          }}
        >
          Your Vision,
          <br /> brought to life
        </span>
        <span
          style={{
            font: "32px",
            lineHeight: "20px",
          }}
        >
          Digitally Crafted solutions <br /> to bring your business to the next
          level
        </span>
      </div>
    </div>
  );
}
