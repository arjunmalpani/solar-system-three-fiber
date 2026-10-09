import { Suspense } from "react";
import { Environment, OrbitControls, Stars, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Chick from "./models/chick";

function FirstScene() {
    return (
        <Canvas camera={{ position: [3, 5, 5], fov: 50 }}>
            <OrbitControls />
            <Environment preset="city" />
            <Stars />
            <Text position={[0, 2, 0]} fontSize={0.5}>
                Hello 3d!
            </Text>
            {/* <SpinningBox />*/}
            <Suspense fallback={null}>
                <Chick />
            </Suspense>
        </Canvas>
    );
}

export default FirstScene;
