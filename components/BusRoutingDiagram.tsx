type Box = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
};

function BoxNode({ box, fill }: { box: Box; fill: string }) {
  return (
    <g>
      <rect
        x={box.x}
        y={box.y}
        width={box.w}
        height={box.h}
        rx={8}
        className={fill}
        stroke="currentColor"
        strokeOpacity={0.25}
      />
      <text
        x={box.x + box.w / 2}
        y={box.y + box.h / 2 + (box.sub ? -4 : 5)}
        textAnchor="middle"
        className="fill-current text-[13px] font-medium"
      >
        {box.label}
      </text>
      {box.sub && (
        <text
          x={box.x + box.w / 2}
          y={box.y + box.h / 2 + 13}
          textAnchor="middle"
          className="fill-current text-[10px] opacity-60"
        >
          {box.sub}
        </text>
      )}
    </g>
  );
}

function Arrow({
  from,
  to,
  label,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  label?: string;
}) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  return (
    <g>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke="currentColor"
        strokeOpacity={0.45}
        strokeWidth={1.5}
        markerEnd="url(#arrowhead)"
      />
      {label && (
        <text
          x={mx}
          y={my - 6}
          textAnchor="middle"
          className="fill-current text-[10px] opacity-70"
        >
          {label}
        </text>
      )}
    </g>
  );
}

export default function BusRoutingDiagram() {
  // Layout columns: Source -> Channel/Aux -> Bus -> Main/Matrix -> Output
  const source: Box = { x: 10, y: 150, w: 90, h: 44, label: "Source" };
  const channel: Box = {
    x: 140,
    y: 90,
    w: 100,
    h: 44,
    label: "Input Channel",
    sub: "40개",
  };
  const aux: Box = {
    x: 140,
    y: 210,
    w: 100,
    h: 44,
    label: "Aux 채널",
    sub: "A1-A8",
  };
  const bus: Box = {
    x: 290,
    y: 130,
    w: 110,
    h: 70,
    label: "BUS",
    sub: "B1-B16 · TAP/POST/GROUP",
  };
  const main: Box = { x: 450, y: 60, w: 100, h: 44, label: "MAIN", sub: "M1-M4" };
  const matrix: Box = {
    x: 450,
    y: 190,
    w: 100,
    h: 44,
    label: "MTX",
    sub: "MX1-MX8",
  };
  const output: Box = { x: 600, y: 125, w: 90, h: 44, label: "Output" };

  return (
    <svg
      viewBox="0 0 720 300"
      className="w-full h-auto text-neutral-700 dark:text-neutral-300"
      role="img"
      aria-label="WING 라우팅 구조: Source가 Channel 또는 Aux로 들어가고, Bus를 거쳐 Main과 Matrix로, 최종 Output으로 나간다"
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth={8}
          markerHeight={8}
          refX={7}
          refY={4}
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill="currentColor" fillOpacity={0.45} />
        </marker>
      </defs>

      <Arrow
        from={{ x: source.x + source.w, y: source.y + source.h / 2 }}
        to={{ x: channel.x, y: channel.y + channel.h / 2 }}
      />
      <Arrow
        from={{ x: source.x + source.w, y: source.y + source.h / 2 }}
        to={{ x: aux.x, y: aux.y + aux.h / 2 }}
      />
      <Arrow
        from={{ x: channel.x + channel.w, y: channel.y + channel.h / 2 }}
        to={{ x: bus.x, y: bus.y + bus.h / 2 - 10 }}
      />
      <Arrow
        from={{ x: aux.x + aux.w, y: aux.y + aux.h / 2 }}
        to={{ x: bus.x, y: bus.y + bus.h / 2 + 10 }}
      />
      <Arrow
        from={{ x: bus.x + bus.w, y: bus.y + bus.h / 2 - 10 }}
        to={{ x: main.x, y: main.y + main.h / 2 }}
      />
      <Arrow
        from={{ x: bus.x + bus.w, y: bus.y + bus.h / 2 + 10 }}
        to={{ x: matrix.x, y: matrix.y + matrix.h / 2 }}
        label="Bus→Matrix"
      />
      <Arrow
        from={{ x: main.x + main.w, y: main.y + main.h / 2 }}
        to={{ x: matrix.x, y: matrix.y + matrix.h / 2 - 6 }}
        label="Main→Matrix"
      />
      <Arrow
        from={{ x: main.x + main.w, y: main.y + main.h / 2 }}
        to={{ x: output.x, y: output.y + output.h / 2 - 10 }}
      />
      <Arrow
        from={{ x: matrix.x + matrix.w, y: matrix.y + matrix.h / 2 }}
        to={{ x: output.x, y: output.y + output.h / 2 + 10 }}
      />

      <BoxNode box={source} fill="fill-neutral-100 dark:fill-neutral-900" />
      <BoxNode box={channel} fill="fill-blue-50 dark:fill-blue-950" />
      <BoxNode box={aux} fill="fill-blue-50 dark:fill-blue-950" />
      <BoxNode box={bus} fill="fill-amber-50 dark:fill-amber-950" />
      <BoxNode box={main} fill="fill-green-50 dark:fill-green-950" />
      <BoxNode box={matrix} fill="fill-purple-50 dark:fill-purple-950" />
      <BoxNode box={output} fill="fill-neutral-100 dark:fill-neutral-900" />
    </svg>
  );
}
