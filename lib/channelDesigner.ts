export type DesignerInput = {
  vocal: number;
  guitar: number;
  bass: number;
  keys: number;
  drum: number;
  otherDi: number;
  monitorMixes: number;
  fxBuses: number;
  addStreamMain: boolean;
};

export type ChannelAssignment = {
  category: string;
  from: number;
  to: number;
};

export type DesignerResult = {
  channels: ChannelAssignment[];
  totalChannels: number;
  monitorBuses: number[];
  fxBusesList: number[];
  mains: string[];
  warnings: string[];
};

// Fixed assignment order — vocals first, then instruments in this order, drums as one block, other DI last.
const CATEGORY_ORDER: { key: keyof DesignerInput; label: string }[] = [
  { key: "vocal", label: "보컬" },
  { key: "guitar", label: "기타" },
  { key: "bass", label: "베이스" },
  { key: "keys", label: "신디/키보드" },
  { key: "drum", label: "드럼" },
  { key: "otherDi", label: "기타 DI" },
];

const MAX_INPUT_CHANNELS = 40; // WING: 40 input channels
const MAX_BUSES = 16; // WING: 16 buses

export function designChannels(input: DesignerInput): DesignerResult {
  const channels: ChannelAssignment[] = [];
  let cursor = 1;

  for (const { key, label } of CATEGORY_ORDER) {
    const count = input[key] as number;
    if (count > 0) {
      channels.push({ category: label, from: cursor, to: cursor + count - 1 });
      cursor += count;
    }
  }

  const totalChannels = cursor - 1;

  const monitorBuses: number[] = [];
  let busCursor = 1;
  for (let i = 0; i < input.monitorMixes; i++) {
    monitorBuses.push(busCursor);
    busCursor++;
  }

  const fxBusesList: number[] = [];
  for (let i = 0; i < input.fxBuses; i++) {
    fxBusesList.push(busCursor);
    busCursor++;
  }

  const mains = ["Main 1 (PA)"];
  if (input.addStreamMain) mains.push("Main 2 (스트리밍/녹음용)");

  const warnings: string[] = [];
  if (totalChannels > MAX_INPUT_CHANNELS) {
    warnings.push(
      `총 입력 채널이 ${totalChannels}개로 WING의 Input Channel 40개를 초과합니다. Aux 채널(A1-A8) 활용을 검토하세요.`
    );
  }
  if (busCursor - 1 > MAX_BUSES) {
    warnings.push(
      `모니터+FX 버스 합계가 ${busCursor - 1}개로 WING의 Bus 16개를 초과합니다.`
    );
  }

  return { channels, totalChannels, monitorBuses, fxBusesList, mains, warnings };
}
