import React, { useRef, Suspense, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useLoader, extend } from '@react-three/fiber';
import { TextureLoader, QuadraticBezierCurve3, Vector3, Color, AdditiveBlending, ShaderMaterial, BackSide } from 'three';
import { Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// --- Utility Functions ---
const randomLatLon = () => {
    const lat = (Math.random() - 0.5) * 160;
    const lon = (Math.random() - 0.5) * 360;
    return { lat, lon };
};

const latLonToVector3 = (lat, lon, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));
    return new Vector3(x, y, z);
};

// --- Custom Shader for Energy Beam (unchanged) ---
const BeamShader = {
    uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(0.0, 1.0, 1.0) }, // Cyan default
        uSpeed: { value: 1.0 },
        uTailLength: { value: 0.2 }
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uTailLength;
        varying vec2 vUv;

        void main() {
            float progress = mod(uTime, 1.0 + uTailLength * 2.0) - uTailLength;
            float dist = progress - vUv.x;
            float opacity = 0.0;
            
            if (dist > 0.0 && dist < uTailLength) {
                opacity = 1.0 - (dist / uTailLength);
                opacity = pow(opacity, 0.5); 
            }

            vec3 finalColor = uColor * 2.0; 
            gl_FragColor = vec4(finalColor, opacity);
        }
    `
};

const AttackArc = ({ start, end, color }) => {
    const materialRef = useRef();

    const geometry = useMemo(() => {
        const midPoint = new Vector3().addVectors(start, end).multiplyScalar(0.5).normalize().multiplyScalar(start.length() * 1.5);
        const curve = new QuadraticBezierCurve3(start, midPoint, end);
        return new THREE.TubeGeometry(curve, 20, 0.02, 8, false);
    }, [start, end]);

    // High speed for energy beam feel
    const speed = useMemo(() => 0.6 + Math.random() * 0.5, []); // Reduced another 50%

    useFrame((state, delta) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value += delta * speed;
        }
    });

    return (
        <mesh geometry={geometry}>
            <shaderMaterial
                ref={materialRef}
                args={[BeamShader]}
                transparent={true}
                blending={AdditiveBlending}
                depthWrite={false}
                uniforms-uColor-value={new Color(color)}
                uniforms-uTime-value={Math.random()}
            />
        </mesh>
    );
};

// --- New Component: Holographic Shield Shader ---
const ShieldShader = {
    uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(0.0, 0.8, 1.0) }, // Deep Cyan
        uRimPower: { value: 2.0 }, // Control intensity of edge glow
    },
    vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec2 vUv;

        void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vViewPosition = -mvPosition.xyz;
            gl_Position = projectionMatrix * mvPosition;
        }
    `,
    fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uRimPower;
        
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec2 vUv;

        void main() {
            // Fresnel calculation: dot product of view vector and normal
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(vViewPosition); // Vector from surface to camera
            float viewDotNormal = dot(viewDir, normal);
            
            // Invert dot product so center is 0 (transparent) and edges are 1
            float fresnel = 1.0 - max(0.0, viewDotNormal);
            
            // Sharpen the rim effect using power
            float rimIntensity = pow(fresnel, uRimPower);
            
            // "Breathing" Pulse effect over time
            float pulse = 0.8 + 0.2 * sin(uTime * 1.5);
            
            // Combine
            vec3 glowColor = uColor * rimIntensity * 2.0 * pulse;
            
            // Alpha should be low in center to show earth map
            float alpha = rimIntensity * pulse;

            gl_FragColor = vec4(glowColor, alpha);
        }
    `
};

const HolographicShield = () => {
    const materialRef = useRef();
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value += delta;
        }
        // Counter-rotation
        if (meshRef.current) {
            meshRef.current.rotation.y -= delta * 0.05;
        }
    });

    return (
        <mesh ref={meshRef} scale={2.3}> {/* Slightly larger than earth */}
            <sphereGeometry args={[1, 64, 64]} />
            <shaderMaterial
                ref={materialRef}
                args={[ShieldShader]}
                transparent={true}
                blending={AdditiveBlending}
                depthWrite={false} // Crucial for overlay
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

const NightEarth = () => {
    const earthRef = useRef();
    const cloudsRef = useRef();
    const [arcs, setArcs] = useState([]);

    const [colorMap, normalMap, specularMap, cloudsMap, lightsMap] = useLoader(TextureLoader, [
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_lights_2048.png'
    ]);

    useFrame((state, delta) => {
        if (earthRef.current) {
            earthRef.current.rotation.y += delta * 0.05;
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y += delta * 0.06;
        }
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const startCoords = randomLatLon();
            const endCoords = randomLatLon();
            const radius = 2.2;

            const newArc = {
                id: Date.now() + Math.random(),
                start: latLonToVector3(startCoords.lat, startCoords.lon, radius),
                end: latLonToVector3(endCoords.lat, endCoords.lon, radius),
                color: Math.random() > 0.7 ? '#ef4444' : '#06b6d4',
            };

            setArcs(prev => {
                const active = [...prev, newArc];
                if (active.length > 12) return active.slice(active.length - 12);
                return active;
            });
        }, 400);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Main Earth Sphere */}
            <mesh ref={earthRef} scale={2.2}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshPhongMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    specularMap={specularMap}
                    emissiveMap={lightsMap}
                    emissive={new THREE.Color("#00ffff")}
                    emissiveIntensity={0.8}
                    color="#1a237e"
                    shininess={30}
                    specular={new THREE.Color("#3366ff")}
                />
            </mesh>

            {/* Atmosphere/Clouds Sphere */}
            <mesh ref={cloudsRef} scale={2.23}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    map={cloudsMap}
                    transparent={true}
                    opacity={0.3}
                    blending={THREE.AdditiveBlending}
                    side={THREE.DoubleSide}
                    depthWrite={false}
                    color="#4fc3f7"
                />
            </mesh>

            {/* Holographic Shield Overlay (Replaces Hex Grid) */}
            <HolographicShield />

            {/* Attack Arcs Container */}
            <group rotation-y={earthRef.current ? earthRef.current.rotation.y : 0}>
                {arcs.map(arc => (
                    <AttackArc key={arc.id} start={arc.start} end={arc.end} color={arc.color} />
                ))}
            </group>
        </>
    );
};

const CyberNightGlobe = () => {
    return (
        <div className="w-full h-screen absolute top-0 left-0 -z-10 bg-black">
            <Canvas camera={{ position: [0, 0, 6] }}>
                <color attach="background" args={['#000000']} />

                <ambientLight intensity={0.1} color="#000033" />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#4488ff" />
                <spotLight position={[-10, -10, -5]} intensity={1} color="#ff00ff" angle={0.5} />
                <directionalLight position={[0, 5, 5]} intensity={0.5} color="#00ffff" />

                <Stars radius={300} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />

                <Suspense fallback={null}>
                    <NightEarth />
                </Suspense>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                    enableDamping
                    dampingFactor={0.05}
                />
            </Canvas>
        </div>
    );
};

export default CyberNightGlobe;
