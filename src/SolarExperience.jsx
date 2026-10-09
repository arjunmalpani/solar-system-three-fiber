import { Canvas, useThree } from "@react-three/fiber";
import SolarSystem from "./components/SolarSystem";
import { useState } from "react";
import { Suspense } from "react";

function SolarExperience() {
    const [target, setTarget] = useState(null);

    return (
        <Canvas
            camera={{ position: [10, 10, 14], fov: 50 }}
            onPointerMissed={() => setTarget(null)}
        >
            <ambientLight intensity={0.04} />
            <Suspense fallback={null}>
                <SolarSystem target={target} setTarget={setTarget} />
            </Suspense>
        </Canvas>
    );
}

export default SolarExperience;
