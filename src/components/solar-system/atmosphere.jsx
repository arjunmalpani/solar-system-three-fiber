import { useMemo } from "react";
import * as THREE from "three";
const vertexShader = /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vViewPos;

    void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vViewPos = mv.xyz;
        gl_Position = projectionMatrix * mv;
    }
`;

const fragmentShader = /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vViewPos;
    uniform vec3 uColor;
    uniform float uStrength;

    void main() {
        vec3 viewDir = normalize(-vViewPos);
        float rim = -dot(normalize(vNormal), viewDir);
        float intensity = pow(clamp(rim * 2.0, 0.0, 1.0), 4.0);
        gl_FragColor = vec4(uColor, intensity * uStrength);
    }
`;
export default function Atmosphere({
    radius,
    color = "#4f9dff",
    strength = 1,
    size = 1.25,
}) {
    const uniforms = useMemo(
        () => ({
            uColor: { value: new THREE.Color(color) },
            uStrength: { value: strength },
        }),
        [color, strength],
    );
    return (
        <mesh>
            {/* geometry*/}
            <sphereGeometry args={[radius * size, 64, 64]} />
            {/* material*/}
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                side={THREE.BackSide}
                transparent
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </mesh>
    );
}
