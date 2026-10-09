import { Canvas } from "@react-three/fiber";
import "./App.css";
import SolarSystem from "./components/SolarSystem";
import { useState } from "react";
// import FirstScene from "./components/FirstScene";

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
            {/* <FirstScene />*/}
        </div>
    );
}

export default App;
