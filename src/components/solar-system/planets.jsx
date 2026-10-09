import { useTexture } from "@react-three/drei";
import Planet from "./planet";

const planets = [
    {
        name: "mercury",
        radius: 0.35,
        distance: 6,
        speed: 1.2,
        texture: "/textures/mercury.jpg",
        child: null,
    },
    {
        name: "venus",
        radius: 0.65,
        distance: 8.5,
        speed: 0.9,
        glow: "#e8c37a",
        texture: "/textures/venus.jpg",
        child: null,
    },
    {
        name: "earth",
        radius: 0.7,
        distance: 11.5,
        speed: 0.7,
        glow: "#4f9dff",
        texture: "/textures/earth.jpg",
        atmosphere: "/textures/earth_clouds.jpg",
        child: {
            name: "moon",
            component: (
                <Planet
                    name="moon"
                    radius={0.18}
                    texture="/textures/moon.jpg"
                    distance={1.4}
                    speed={2.5}
                />
            ),
        },
    },
    {
        name: "mars",
        radius: 0.45,
        distance: 14.5,
        speed: 0.5,
        glow: "#d9623b",
        texture: "/textures/mars.jpg",
        child: null,
    },
    {
        name: "jupiter",
        radius: 2.2,
        distance: 20,
        speed: 0.3,
        glow: "#d9b38c",
        texture: "/textures/jupiter.jpg",
        child: null,
    },
    {
        name: "saturn",
        radius: 1.8,
        distance: 26,
        speed: 0.2,
        glow: "#e3c98a",
        texture: "/textures/saturn.jpg",
        child: {
            name: "rings",
            component: <SaturnRings radius={1.8} />,
        },
    },
    {
        name: "uranus",
        radius: 1.2,
        distance: 31,
        speed: 0.15,
        glow: "#7fe3e3",
        texture: "/textures/uranus.jpg",
        child: null,
    },
    {
        name: "neptune",
        radius: 1.15,
        distance: 36,
        speed: 0.1,
        glow: "#3f6bff",
        texture: "/textures/neptune.jpg",
        child: null,
    },
    {
        name: "pluto",
        radius: 0.15,
        distance: 40,
        speed: 0.01,
        texture: "/textures/pluto.webp",
        child: null,
    },
];
function SaturnRings({ radius }) {
    const map = useTexture("/textures/saturn_ring.png");
    return (
        <mesh rotation={[Math.PI / 2.2, 0, 0]}>
            <ringGeometry args={[radius * 2, radius * 1.5, 64]} />
            <meshBasicMaterial
                map={map}
                color="#7c6936"
                side={2}
                transparent
                opacity={1}
                depthWrite={false}
            />
        </mesh>
    );
}
function Planets({ onSelect }) {
    return (
        <>
            {planets.map((planet) => (
                <Planet
                    key={planet.name}
                    name={planet.name}
                    radius={planet.radius}
                    distance={planet.distance}
                    speed={planet.speed}
                    texture={planet.texture}
                    atmosphere={planet.atmosphere}
                    onSelect={onSelect}
                    glow={planet.glow}
                >
                    {planet.child && planet.child.component}
                </Planet>
            ))}
        </>
    );
}

export default Planets;
