import React, { useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

const GLOBE_RADIUS = 1.5;

// Helper to get random point on sphere
const getRandomPointOnSphere = (radius) => {
    const theta = 2 * Math.PI * Math.random();
    const phi = Math.acos(2 * Math.random() - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
};

const AttackLine = () => {
    const points = useMemo(() => {
        const start = getRandomPointOnSphere(GLOBE_RADIUS);
        const end = getRandomPointOnSphere(GLOBE_RADIUS);
        const mid = start.clone().add(end).multiplyScalar(1.5); // Elevate midpoint
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        return curve.getPoints(20);
    }, []);

    return (
        <Line points={points} color="#ff0000" lineWidth={1} transparent opacity={0.6} />
    );
};

const RotatingGlobe = () => {
    const globeRef = useRef();
    const colorMap = useLoader(TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');

    useFrame((state, delta) => {
        if (globeRef.current) {
            globeRef.current.rotation.y += delta * 0.2;
        }
    });

    return (
        <group ref={globeRef}>
            {/* Holographic Earth */}
            <Sphere args={[GLOBE_RADIUS, 64, 64]}>
                <meshStandardMaterial
                    map={colorMap}
                    color="#00ff41"
                    transparent
                    opacity={0.8}
                    roughness={0.5}
                    metalness={1}
                />
            </Sphere>

            {/* Atmosphere Glow */}
            <Sphere args={[GLOBE_RADIUS * 1.1, 64, 64]}>
                <meshBasicMaterial
                    color="#00ff41"
                    transparent
                    opacity={0.1}
                    side={THREE.DoubleSide}
                    depthWrite={false}
                />
            </Sphere>

            {/* Attack Lines */}
            {Array.from({ length: 15 }).map((_, i) => (
                <AttackLine key={i} />
            ))}
        </group>
    );
};

const ThreatMap = () => {
    return (
        <div className="w-full h-full min-h-[300px]">
            <Canvas camera={{ position: [0, 0, 4.5] }}>
                <ambientLight intensity={1} />
                <pointLight position={[10, 10, 10]} intensity={2} />
                <Suspense fallback={null}>
                    <RotatingGlobe />
                </Suspense>
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} enablePan={false} />
            </Canvas>
        </div>
    );
};

export default ThreatMap;
