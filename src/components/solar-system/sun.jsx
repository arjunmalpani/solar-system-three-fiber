import { useRef } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo } from "react";

export default function Sun() {
    const sunMap = useTexture("/textures/sun.jpg");
    const sun = useRef();
    const glow = useGlowTexture()
    useFrame((_state, delta) => {
        sun.current.rotation.y += delta * 0.06;
    });
    return (
        <mesh ref={sun} position={[0, 0, 0]}>
            <sphereGeometry args={[4.0, 32, 32]} />
            <meshBasicMaterial
                color={[3, 2.5, 2]}
                toneMapped={false}
                opacity={1}
                map={sunMap}
            />
            <pointLight intensity={1000} color="#fff2cc" />
            <sprite scale={[9, 9, 1]}>
                <spriteMaterial
                    map={glow}
                    blending={THREE.AdditiveBlending}
                    transparent
                    depthWrite={false}
                    toneMapped={false}
                />
            </sprite>
        </mesh>
    );
}

function useGlowTexture() {
    return useMemo(() => {
        const size = 256;
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = size;

        const ctx = canvas.getContext("2d");
        const g = ctx.createRadialGradient(
            size / 2,
            size / 2,
            0,
            size / 2,
            size / 2,
            size / 2,
        );
        g.addColorStop(0.0, "rgba(255, 210, 120, 1)");
        g.addColorStop(0.3, "rgba(255, 150, 50, 0.5)");
        g.addColorStop(1.0, "rgba(255, 90, 0, 0)");

        ctx.fillStyle = g;
        ctx.fillRect(0, 0, size, size);
        return new THREE.CanvasTexture(canvas);
    }, []);
}
