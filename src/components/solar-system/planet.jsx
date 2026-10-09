import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

import { Html, useCursor, useTexture } from "@react-three/drei";
import OrbitLine from "./OrbitLine";
import Atmosphere from "./atmosphere";

function TexturedPlanetMesh({ texture }) {
    const map = useTexture(texture);

    return <meshStandardMaterial map={map} color={"white"} />;
}
function TexturedAtmosphereMesh({ texture }) {
    const map = useTexture(texture);
    return <meshStandardMaterial map={map} transparent opacity={0.15} />;
}

function Planet({
    radius,
    distance,
    speed,
    color,
    children,
    texture,
    atmosphere,
    onSelect,
    name,
    glow
}) {
    const [hovered, setHovered] = useState(false);
    const orbit = useRef();
    const body = useRef();
    useCursor(hovered);
    useFrame((_state, delta) => {
        orbit.current.rotation.y += delta * speed; // around the parent
        body.current.rotation.y += delta * 0.5; // own axis
    });
    const handleOnClick = (e) => {
        e.stopPropagation();
        onSelect?.({ ref: body, radius, name });
    };
    const handleOnPointerOver = (e) => {
        e.stopPropagation();
        setHovered(true);
    };
    const handleOnPointerOut = () => setHovered(false);
    return (
        <>
            <OrbitLine distance={distance} />
            <group ref={orbit}>
                {/* planet*/}
                <group
                    position={[distance, 0, 0]}
                    onClick={handleOnClick}
                    onPointerOver={handleOnPointerOver}
                    onPointerOut={handleOnPointerOut}
                >
                    <mesh ref={body}>
                        <sphereGeometry args={[radius, 32, 32]} />
                        {texture ? (
                            <TexturedPlanetMesh texture={texture} />
                        ) : (
                            <meshStandardMaterial color={color} />
                        )}
                    </mesh>

                    {atmosphere && (
                        <mesh>
                            <sphereGeometry args={[radius * 1.05, 32, 32]} />
                            <TexturedAtmosphereMesh texture={atmosphere} />
                        </mesh>
                    )}
                    {/* {glow && <Atmosphere radius={radius} color={glow} />}*/}
                    <Html
                        position={[0, radius + 0.3, 0]}
                        center
                        style={{ pointerEvents: "none" }}
                        distanceFactor={15} // so that text shrinks when zoomed out
                        occlude // hides text behind the object
                    >
                        <div className="text-[--text] text-xs capitalize whitespace-nowrap select-none">
                            {name}
                        </div>
                    </Html>
                    {children}
                </group>
            </group>
        </>
    );
}

export default Planet;
