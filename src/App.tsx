import React, { Suspense, useRef } from 'react'
import { Canvas, ThreeElements, useFrame, useLoader } from '@react-three/fiber'
import { AccumulativeShadows, Environment, OrbitControls, RandomizedLight, useGLTF } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function App() {
  return (
    <Canvas shadows camera={{ position: [400, 0, 400  ], fov: 25}}>
      <GenJi rotation={[-0.63, 0, 0]} scale={2} position={[0, -1.175, 0]} />
      <OrbitControls autoRotate={false} />
      <Environment preset="city" />
      <axesHelper args={[100]}/>
    </Canvas>
  )
}

function GenJi(props:ThreeElements["mesh"]){
  const { scene } = useGLTF('/scene.gltf') as {scene: THREE.Group}
  console.log(scene);
  
  scene.rotation.x = Math.PI / 2
  scene.rotation.z =- Math.PI / 4

  const ref = useRef<THREE.Mesh>(null!)
  useFrame((state, delta) => {
    ref.current.rotation.z += 0.03;
  })
  
  return <primitive ref={ref} object={scene} />
}