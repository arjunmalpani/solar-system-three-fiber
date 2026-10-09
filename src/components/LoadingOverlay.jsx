import { useProgress } from "@react-three/drei";

export default function LoadingOverlay() {
    const { active, progress, errors } = useProgress();

    if (!active && errors.length === 0) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
            <p className="mb-4 text-sm tracking-widest">
                {errors.length > 0
                    ? "FAILED TO LOAD ASSETS"
                    : "INITIALIZING SOLAR SYSTEM"}
            </p>

            <div className="h-1 w-64 overflow-hidden rounded bg-white/20">
                <div
                    className="h-full bg-white transition-all duration-200"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <p className="mt-3 text-xs text-white/60">
                {errors.length > 0
                    ? `${errors.length} asset(s) failed`
                    : `${Math.round(progress)}%`}
            </p>
        </div>
    );
}
