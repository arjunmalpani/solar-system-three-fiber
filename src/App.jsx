import "./App.css";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import SolarSystem from "./components/SolarSystem";

function App() {
    const [target, setTarget] = useState(null);
    return (
        <div className="w-screen h-screen">
            <Canvas
                camera={{ position: [0, 0, 14], fov: 50 }}
                onPointerMissed={() => setTarget(null)}
            >
                <SolarSystem target={target} setTarget={setTarget} />
            </Canvas>
        </div>
    );
}

export default App;
