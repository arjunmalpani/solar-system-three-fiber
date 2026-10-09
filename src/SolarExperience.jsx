import { Canvas, useThree } from "@react-three/fiber";
import SolarSystem from "./components/SolarSystem";
import { useState } from "react";
import { Suspense } from "react";
import { facts } from "./facts";
import PlanetInfo from "./components/planet-info";

function SolarExperience() {
    const [target, setTarget] = useState(null);
    const info = target && facts[target.name];
    return (
        <div className="relative w-full h-full">
            <Canvas
                camera={{ position: [10, 10, 14], fov: 50 }}
                onPointerMissed={() => setTarget(null)}
            >
                <ambientLight intensity={0.04} />
                <Suspense fallback={null}>
                    <SolarSystem target={target} setTarget={setTarget} />
                </Suspense>
            </Canvas>
            {target && (
                <PlanetInfo
                    target={target}
                    info={info}
                    onClose={() => setTarget(null)}
                />
            )}
        </div>
    );
}

export default SolarExperience;
