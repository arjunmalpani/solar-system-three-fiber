import { useGLTF, useTexture } from "@react-three/drei";

export const MODEL_PATHS = ["/models/spaceship.glb"];

export const TEXTURE_PATHS = [
    "/textures/mercury.jpg",
    "/textures/venus.jpg",
    "/textures/earth.jpg",
    "/textures/earth_clouds.jpg",
    "/textures/moon.jpg",
    "/textures/mars.jpg",
    "/textures/jupiter.jpg",
    "/textures/saturn.jpg",
    "/textures/saturn_ring.png",
    "/textures/uranus.jpg",
    "/textures/neptune.jpg",
];

// Start loading these assets before the scene needs them.
export function preloadAssets() {
    MODEL_PATHS.forEach((path) => useGLTF.preload(path));
    TEXTURE_PATHS.forEach((path) => useTexture.preload(path));
}
