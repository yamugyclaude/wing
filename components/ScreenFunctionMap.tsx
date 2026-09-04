type Node = {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  lines: string[];
  readOnly?: boolean;
};

function NodeBox({ node, fill }: { node: Node; fill: string }) {
  const cx = node.x + node.w / 2;
  const titleY = node.y + 20;
  return (
    <g>
      <rect
        x={node.x}
        y={node.y}
        width={node.w}
        height={node.h}
        rx={8}
        className={fill}
        stroke="currentColor"
        strokeOpacity={0.25}
      />
      <text x={cx} y={titleY} textAnchor="middle" className="fill-current text-[13px] font-semibold">
        {node.title}
        {node.readOnly ? " (읽기 전용)" : ""}
      </text>
      {node.lines.map((line, i) => (
        <text
          key={line}
          x={node.x + 10}
          y={titleY + 16 + i * 13}
          textAnchor="start"
          className="fill-current text-[10px] opacity-70"
        >
          {line}
        </text>
      ))}
    </g>
  );
}

function Arrow({
  from,
  to,
  label,
  dashed,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  label?: string;
  dashed?: boolean;
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
        strokeDasharray={dashed ? "4 3" : undefined}
        markerEnd="url(#arrowhead2)"
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

export default function ScreenFunctionMap() {
  const hardware: Node = {
    x: 10,
    y: 230,
    w: 190,
    h: 90,
    title: "4-Channel Section (하드웨어)",
    lines: ["GAIN/48V: 게인, 팬텀파워 ON/OFF", "PAN/MAIN: 패닝, Main1 on/off"],
  };
  const sources: Node = {
    x: 250,
    y: 40,
    w: 190,
    h: 90,
    title: "ROUTING → SOURCES",
    lines: ["게인·팬텀·극성", "mono/stereo/mid-side"],
  };
  const channels: Node = {
    x: 250,
    y: 160,
    w: 190,
    h: 90,
    title: "ROUTING → CHANNELS",
    lines: ["Source를 채널에 패칭"],
  };
  const outputs: Node = {
    x: 250,
    y: 280,
    w: 190,
    h: 90,
    title: "ROUTING → OUTPUTS",
    lines: ["채널/버스를 실제 출력에 연결"],
  };
  const home: Node = {
    x: 500,
    y: 40,
    w: 190,
    h: 100,
    title: "HOME (Channel Home)",
    lines: ["EQ / Gate / Comp / Insert", "Bus Feed(TAP/POST/GROUP)", "DCA·Mute Group 배정"],
  };
  const effects: Node = {
    x: 500,
    y: 165,
    w: 190,
    h: 70,
    title: "EFFECTS",
    lines: ["리버브 등 이펙트 로드"],
  };
  const meters: Node = {
    x: 500,
    y: 260,
    w: 190,
    h: 70,
    title: "METERS",
    lines: ["레벨 확인만 가능"],
    readOnly: true,
  };
  const faders: Node = {
    x: 760,
    y: 260,
    w: 170,
    h: 70,
    title: "FADERS",
    lines: ["실제 레벨 조정"],
  };

  return (
    <svg
      viewBox="0 0 960 380"
      className="w-full h-auto text-neutral-700 dark:text-neutral-300"
      role="img"
      aria-label="WING 기능 위치 지도: 어떤 기능이 어떤 화면/버튼에서 이루어지는지 표시"
    >
      <defs>
        <marker id="arrowhead2" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="currentColor" fillOpacity={0.45} />
        </marker>
      </defs>

      <Arrow
        from={{ x: meters.x + meters.w, y: meters.y + meters.h / 2 }}
        to={{ x: faders.x, y: faders.y + faders.h / 2 }}
        label="터치 시 이동"
        dashed
      />

      <NodeBox node={hardware} fill="fill-neutral-100 dark:fill-neutral-900" />
      <NodeBox node={sources} fill="fill-blue-50 dark:fill-blue-950" />
      <NodeBox node={channels} fill="fill-blue-50 dark:fill-blue-950" />
      <NodeBox node={outputs} fill="fill-blue-50 dark:fill-blue-950" />
      <NodeBox node={home} fill="fill-green-50 dark:fill-green-950" />
      <NodeBox node={effects} fill="fill-green-50 dark:fill-green-950" />
      <NodeBox node={meters} fill="fill-amber-50 dark:fill-amber-950" />
      <NodeBox node={faders} fill="fill-amber-50 dark:fill-amber-950" />

      <text x={10} y={355} className="fill-current text-[11px] opacity-60">
        파란색 = Source/패칭 관련 · 초록색 = 채널 프로세싱 · 노란색 = 레벨 확인/조정
      </text>
    </svg>
  );
}
