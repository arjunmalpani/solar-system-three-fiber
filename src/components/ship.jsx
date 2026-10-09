import { useMemo, useRef, useState } from "react";
import { useCursor, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function SpaceShip({ distance = 16, speed = 0.4, size = 1.5, onSelect }) {
    const orbit = useRef();
    const body = useRef();
    const [hovered, setHovered] = useState(false);
    useCursor(hovered);

    const { scene } = useGLTF("/models/spaceship.glb");
    const { fit, center } = useMemo(() => {
        const box = new THREE.Box3().setFromObject(scene);
        const dims = box.getSize(new THREE.Vector3());
        return {
            fit: size / Math.max(dims.x, dims.y, dims.z), // scale to `size` units
            center: box.getCenter(new THREE.Vector3()),
        };
    }, [scene, size]);

    useFrame((state, delta) => {
        orbit.current.rotation.y += delta * speed;

        body.current.position.y =
            1.5 + Math.sin(state.clock.elapsedTime * 2) * 1.15;
        body.current.position.z = Math.sin(state.clock.elapsedTime) * 0.1;
    });
    return (
        <group ref={orbit}>
            <group
                ref={body}
                position={[distance, 1.5, 0]}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect?.({ ref: body, radius: size / 2 });
                }}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                }}
                onPointerOut={() => setHovered(false)}
            >
                <group scale={fit} rotation={[0, Math.PI, 0]}>
                    <primitive
                        object={scene}
                        position={[-center.x, -center.y, -center.z]}
                    />
                </group>
            </group>
        </group>
    );
}

export default SpaceShip;

// useGLTF.preload("/models/spaceship.glb");
