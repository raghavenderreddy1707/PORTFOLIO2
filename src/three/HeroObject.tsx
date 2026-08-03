import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroObject() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Idle rotation
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    
    // Parallax based on mouse
    const mouseX = (state.pointer.x * Math.PI) / 10;
    const mouseY = (state.pointer.y * Math.PI) / 10;
    
    meshRef.current.rotation.x += (mouseY - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y += (mouseX - meshRef.current.rotation.y) * 0.05;
  });

  useEffect(() => {
    if (!meshRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.to(meshRef.current!.position, {
        y: 3,
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });
      
      gsap.to(meshRef.current!.scale, {
        x: 0.5,
        y: 0.5,
        z: 0.5,
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={[1.8, 1.8, 1.8]}>
      <icosahedronGeometry args={[1, 16]} />
      <MeshDistortMaterial
        color="#7c3aed"
        emissive="#06b6d4"
        emissiveIntensity={0.5}
        roughness={0.2}
        metalness={0.8}
        distort={0.4}
        speed={2}
        wireframe={false}
      />
    </mesh>
  );
}