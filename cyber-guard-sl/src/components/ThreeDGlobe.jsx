import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, MeshDistortMaterial } from '@react-three/drei';

const SpinningSphere = () => {
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.5;
            meshRef.current.rotation.x += delta * 0.2;
        }
    });

    return (
        <mesh ref={meshRef} scale={2}>
            <sphereGeometry args={[1, 32, 32]} />
            <MeshDistortMaterial
                color="#00ff41"
                wireframe
                distort={0.4}
                speed={2}
                roughness={0.5}
            />
        </mesh>
    );
};

const ThreeDGlobe = () => {
    return (
        <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <SpinningSphere />
        </Canvas>
    );
};

export default ThreeDGlobe;
