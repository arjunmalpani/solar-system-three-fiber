import { useEffect, useRef } from "react";
import { OrbitControls, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import SpaceShip from "./ship";
import Planets from "./solar-system/planets";
import Sun from "./solar-system/sun";

const planetPos = new THREE.Vector3();
const direction = new THREE.Vector3();
const desired = new THREE.Vector3();

// const origin = new THREE.Vector3(0, 0, 0);

function CameraRig({ target, controlsRef }) {
    useFrame((state, delta) => {
        const controls = controlsRef.current;
        if (!controls || !target) return;
        // ease factor
        // const t = 1 - Math.exp(-4 * delta);
        const t = 1 - Math.exp(-4 * delta);

        target.ref.current.getWorldPosition(planetPos);

        direction.copy(state.camera.position).sub(controls.target).normalize();
        const distance = Math.max(target.radius * 4, 3);

        desired.copy(planetPos).add(direction.multiplyScalar(distance));

        state.camera.position.lerp(desired, t);
        controls.target.lerp(planetPos, t);
        controls.update();
    });
    return null;
}

export default function SolarSystem({ target, setTarget }) {
    const controlsRef = useRef();
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setTarget(null);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [setTarget]);
    return (
        <>
            <ambientLight intensity={0.1} />
            <Stars fade />
            <Sun />
            <Planets onSelect={setTarget} />
            <SpaceShip onSelect={setTarget} />
            <OrbitControls ref={controlsRef} maxDistance={50} minDistance={2} />
            <CameraRig target={target} controlsRef={controlsRef} />

            <EffectComposer>
                <Bloom
                    intensity={0.2}
                    luminanceSmoothing={0.2}
                    luminanceThreshold={0.9}
                    // mipmapBlur
                />
            </EffectComposer>

            <mesh visible={false} onClick={() => setTarget(null)} />
        </>
    );
}
