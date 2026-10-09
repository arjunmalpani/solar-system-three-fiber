import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useState } from "react";

function SpinningBox() {
    const ref = useRef();
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);

    useFrame((state, delta) => {
        ref.current.rotation.y += delta
    })
    return (
        <mesh
            ref={ref}
            scale={clicked? 1.5 : 1}
            onClick={() => {
                setClicked(!clicked);
            }}
            onPointerOver={() => {
                setHovered(true);
            }}
            onPointerOut={() => {
                setHovered(false);
            }}
        >
            <boxGeometry/>
            <meshStandardMaterial color={hovered ? "red" : "yellow"} />
        </mesh>
    );
}

export default SpinningBox;
