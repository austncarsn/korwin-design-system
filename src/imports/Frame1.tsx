import svgPaths from "./svg-i4azlhnkys";

export default function Frame() {
  return (
    <div className="relative size-full">
      <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 750 750">
        <g id="Frame 2">
          <g id="Vector">
            <path d={svgPaths.p1} fill="white" />
            <path d={svgPaths.p2} fill="black" />
            <path d={svgPaths.p3} fill="black" />
          </g>
        </g>
      </svg>
    </div>
  );
}