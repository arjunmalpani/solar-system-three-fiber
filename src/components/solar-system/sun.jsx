import { useRef } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function Sun() {
    const sunMap = useTexture("/textures/sun.jpg");
    const sun = useRef();
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
        </mesh>
    );
}

export default Sun;
