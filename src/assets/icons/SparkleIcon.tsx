import svgPaths from "@/assets/svg/svg";

export function SparkleIcon() {
    return (
        <div className="w-4 h-4">
            <svg
                className="block w-full h-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 16 16"
            >
                <g>
                    <path
                        d={svgPaths.p18804580}
                        stroke="#1D4ED8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    />
                </g>
            </svg>
        </div>
    );
}

export function LargeSparkleIcon() {
    return (
        <div className="w-8 h-8">
            <svg
                className="block w-full h-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 32 32"
            >
                <g>
                    <path
                        d={svgPaths.p2511de00}
                        stroke="#2563EB"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    />
                </g>
            </svg>
        </div>
    );
};