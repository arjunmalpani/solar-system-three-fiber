function OrbitLine({ distance }) {
    return (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[distance - 0.01, distance + 0.01, 128]} />
            <meshBasicMaterial
                color="#8a8a8a"
                transparent
                side={2}
                depthWrite={false}
            />
        </mesh>
    );
}

export default OrbitLine;
