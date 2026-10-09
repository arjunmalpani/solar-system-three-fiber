export default function PlanetInfo({ target, info, onClose }) {
    if (!target) return null;

    return (
        <div
            className="
                absolute bottom-6 left-6 z-10
                w-64 max-w-[calc(100vw-3rem)]
                rounded-2xl border border-white/10
                bg-[#100e0c]/75 p-4 text-white
                shadow-2xl shadow-black/20
                backdrop-blur-xl
                animate-in fade-in slide-in-from-bottom-2
                duration-200
            "
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                        Planet details
                    </p>

                    <h2 className="mt-1 truncate text-xl font-medium capitalize tracking-tight">
                        {target.name}
                    </h2>
                </div>

                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.6)]" />
            </div>

            {/* Description */}
            {info?.note && (
                <p className="mt-3 text-xs leading-relaxed text-white/60">
                    {info.note}
                </p>
            )}

            {/* Stats */}
            {info && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.04] p-3">
                        <p className="text-[10px] uppercase tracking-wider text-white/40">
                            Day length
                        </p>
                        <p className="mt-1 text-sm font-medium">
                            {info.day ?? "Unknown"}
                        </p>
                    </div>

                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.04] p-3">
                        <p className="text-[10px] uppercase tracking-wider text-white/40">
                            Moons
                        </p>
                        <p className="mt-1 text-sm font-medium">
                            {info.moons ?? "Unknown"}
                        </p>
                    </div>
                </div>
            )}

            {/* Footer */}
            <button
                onClick={onClose}
                className="
                    mt-4 flex w-full items-center justify-between
                    rounded-lg border border-white/10
                    px-3 py-2 text-xs text-white/65
                    transition-colors duration-150
                    hover:border-white/20 hover:bg-white/[0.06]
                    hover:text-white
                    focus-visible:outline-none
                    focus-visible:ring-2 focus-visible:ring-white/40
                "
            >
                <span>Back to solar system</span>
                <span aria-hidden="true">↗</span>
            </button>
        </div>
    );
}
