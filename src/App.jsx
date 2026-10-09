import { Suspense, lazy } from "react";
import "./App.css";
import { Loader } from "@react-three/drei";

const SolarExperience = lazy(() => import("./SolarExperience"));

function App() {
    return (
        <div className="w-screen h-screen">
            <SolarExperience />
            <Loader />
        </div>
    );
}

export default App;
