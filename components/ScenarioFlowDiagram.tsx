type Box = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string[];
};

function BoxNode({ box, fill }: { box: Box; fill: string }) {
  const cx = box.x + box.w / 2;
  const labelY = box.sub ? box.y + box.h / 2 - 4 : box.y + box.h / 2 + 5;
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
      <text x={cx} y={labelY} textAnchor="middle" className="fill-current text-[12px] font-medium">
        {box.label}
      </text>
      {box.sub?.map((line, i) => (
        <text
          key={line}
          x={cx}
          y={labelY + 13 + i * 11}
          textAnchor="middle"
          className="fill-current text-[9px] opacity-60"
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
        markerEnd="url(#arrowhead3)"
      />
      {label && (
        <text x={mx} y={my - 5} textAnchor="middle" className="fill-current text-[9px] opacity-70">
          {label}
        </text>
      )}
    </g>
  );
}

export default function ScenarioFlowDiagram() {
  const vocals: Box = {
    x: 10,
    y: 10,
    w: 130,
    h: 60,
    label: "Vocal 1, 2",
    sub: ["CH1-2"],
  };
  const others: Box = {
    x: 10,
    y: 90,
    w: 130,
    h: 90,
    label: "Guitar/Bass/Drum",
    sub: ["CH3-8"],
  };
  const bus1: Box = {
    x: 200,
    y: 10,
    w: 150,
    h: 60,
    label: "BUS 1 (모니터)",
    sub: ["TAP 모드"],
  };
  const bus2: Box = {
    x: 200,
    y: 90,
    w: 150,
    h: 60,
    label: "BUS 2 (리버브)",
    sub: ["POST 모드 + FX"],
  };
  const main1: Box = {
    x: 410,
    y: 90,
    w: 130,
    h: 60,
    label: "MAIN 1",
    sub: ["PA 믹스"],
  };
  const auxOut: Box = {
    x: 590,
    y: 10,
    w: 130,
    h: 60,
    label: "Aux Out 1/2",
    sub: ["보컬 웨지"],
  };
  const paOut: Box = {
    x: 590,
    y: 90,
    w: 130,
    h: 60,
    label: "XLR Out",
    sub: ["PA 스피커"],
  };

  return (
    <svg
      viewBox="0 0 760 170"
      className="w-full h-auto text-neutral-700 dark:text-neutral-300"
      role="img"
      aria-label="시나리오 신호 흐름: 보컬과 다른 악기가 Bus/Main을 거쳐 웨지와 PA로 나가는 경로"
    >
      <defs>
        <marker id="arrowhead3" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="currentColor" fillOpacity={0.45} />
        </marker>
      </defs>

      <Arrow
        from={{ x: vocals.x + vocals.w, y: vocals.y + vocals.h / 2 }}
        to={{ x: bus1.x, y: bus1.y + bus1.h / 2 }}
      />
      <Arrow
        from={{ x: vocals.x + vocals.w, y: vocals.y + vocals.h / 2 + 10 }}
        to={{ x: bus2.x, y: bus2.y + bus2.h / 2 - 10 }}
        dashed
      />
      <Arrow
        from={{ x: vocals.x + vocals.w, y: vocals.y + vocals.h - 5 }}
        to={{ x: main1.x, y: main1.y + main1.h / 2 - 15 }}
        label="Main send"
      />
      <Arrow
        from={{ x: others.x + others.w, y: others.y + others.h / 2 }}
        to={{ x: main1.x, y: main1.y + main1.h / 2 + 10 }}
        label="Main send"
      />
      <Arrow
        from={{ x: bus1.x + bus1.w, y: bus1.y + bus1.h / 2 }}
        to={{ x: auxOut.x, y: auxOut.y + auxOut.h / 2 }}
      />
      <Arrow
        from={{ x: bus2.x + bus2.w, y: bus2.y + bus2.h / 2 }}
        to={{ x: main1.x, y: main1.y + main1.h / 2 }}
      />
      <Arrow
        from={{ x: main1.x + main1.w, y: main1.y + main1.h / 2 }}
        to={{ x: paOut.x, y: paOut.y + paOut.h / 2 }}
      />

      <BoxNode box={vocals} fill="fill-blue-50 dark:fill-blue-950" />
      <BoxNode box={others} fill="fill-blue-50 dark:fill-blue-950" />
      <BoxNode box={bus1} fill="fill-amber-50 dark:fill-amber-950" />
      <BoxNode box={bus2} fill="fill-amber-50 dark:fill-amber-950" />
      <BoxNode box={main1} fill="fill-green-50 dark:fill-green-950" />
      <BoxNode box={auxOut} fill="fill-neutral-100 dark:fill-neutral-900" />
      <BoxNode box={paOut} fill="fill-neutral-100 dark:fill-neutral-900" />
    </svg>
  );
}
