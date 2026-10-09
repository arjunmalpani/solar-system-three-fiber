import { Html, useCursor, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import { useRef } from "react";

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
}) {
    const [hovered, setHovered] = useState(false);
    const orbit = useRef();
    const body = useRef();
    const map = texture ? useTexture(texture) : null;
    const atmospheremap = atmosphere ? useTexture(atmosphere) : null;
    useCursor(hovered);
    useFrame((_state, delta) => {
        orbit.current.rotation.y += delta * speed; // around the parent
        body.current.rotation.y += delta * 0.5; // own axis
    });
    const handleOnClick = (e) => {
        e.stopPropagation();
        onSelect?.({ ref: body, radius });
    };
    const handleOnPointerOver = (e) => {
        e.stopPropagation();
        setHovered(true);
    };
    const handleOnPointerOut = () => setHovered(false)
    return (
        <group ref={orbit}>
            <group
                position={[distance, 0, 0]}
                onClick={handleOnClick}
                onPointerOver={handleOnPointerOver}
                onPointerOut={handleOnPointerOut}
            >
                <mesh ref={body}>
                    <sphereGeometry args={[radius, 32, 32]} />
                    <meshStandardMaterial map={map} color={map ? "white" : color}/>
                </mesh>

                {atmosphere && (
                    <mesh>
                        <sphereGeometry args={[radius * 1.05, 32, 32]} />
                        <meshStandardMaterial map={atmospheremap} transparent opacity={0.15}/>
                    </mesh>
                )}
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
    );
}

export default Planet;
