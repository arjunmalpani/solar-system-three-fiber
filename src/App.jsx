import { Suspense, useState, lazy, useEffect } from "react";
import "./App.css";
import LoadingOverlay from "./components/LoadingOverlay";
import { preloadAssets } from "./utils/preload";
import { Loader } from "@react-three/drei";
import SolarExperience from "./SolarExperience";

// const SolarExperience = lazy(() => import("./SolarExperience"));

function App() {
    // const [assetsStarted, setAssetsStarted] = useState(false);
    // useEffect(() => {
    //     preloadAssets();
    //     setAssetsStarted(true);
    // }, []);

    return (
        <div className="w-screen h-screen">
            {/* <Suspense fallback={<p>Loading...</p>}>*/}
            {/* {assetsStarted &&*/}

            <SolarExperience />

            {/* }*/}
            {/* </Suspense>*/}
            {/* <LoadingOverlay />*/}
            <Loader />
        </div>
    );
}

export default App;
