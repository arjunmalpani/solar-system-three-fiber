import { useGLTF } from "@react-three/drei";

function Chick() {
    const { scene } = useGLTF("/models/chick.glb");

    return <primitive object={scene} />;
}

export default Chick;
