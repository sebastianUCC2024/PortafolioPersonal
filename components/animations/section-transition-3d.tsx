"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";

function TransitionPlane() {
    const meshRef = useRef<THREE.Mesh>(null);
    const scroll = useScroll();

    useFrame(() => {
        if (meshRef.current) {
            // Rotar el plano basado en el scroll
            meshRef.current.rotation.x = scroll.offset * Math.PI * 2;
            meshRef.current.rotation.y = scroll.offset * Math.PI;
            
            // Cambiar opacidad basado en el scroll
            const material = meshRef.current.material as THREE.MeshBasicMaterial;
            material.opacity = Math.sin(scroll.offset * Math.PI * 4) * 0.3 + 0.1;
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[10, 10, 32, 32]} />
            <meshBasicMaterial 
                color="#00e599" 
                wireframe 
                transparent 
                opacity={0.1}
            />
        </mesh>
    );
}

export function SectionTransition3D() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <TransitionPlane />
            </Canvas>
        </div>
    );
}
