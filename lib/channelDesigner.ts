export type CategoryRow = {
  id: string;
  label: string;
  count: number;
};

export type BusRow = {
  id: string;
  label: string;
};

export type ChannelAssignment = {
  label: string;
  from: number;
  to: number;
};

export type DesignerResult = {
  channels: ChannelAssignment[];
  totalChannels: number;
  buses: { label: string; number: number }[];
  mains: string[];
  warnings: string[];
};

const MAX_INPUT_CHANNELS = 40; // WING: 40 input channels
const MAX_BUSES = 16; // WING: 16 buses

export function designChannels(
  categories: CategoryRow[],
  buses: BusRow[],
  mainLabels: string[]
): DesignerResult {
  const channels: ChannelAssignment[] = [];
  let cursor = 1;

  for (const cat of categories) {
    if (cat.count > 0) {
      channels.push({ label: cat.label || "(이름 없음)", from: cursor, to: cursor + cat.count - 1 });
      cursor += cat.count;
    }
  }

  const totalChannels = cursor - 1;

  const busResult = buses.map((b, i) => ({ label: b.label || "(이름 없음)", number: i + 1 }));

  const mains = mainLabels.length > 0 ? mainLabels : ["Main 1"];

  const warnings: string[] = [];
  if (totalChannels > MAX_INPUT_CHANNELS) {
    warnings.push(
      `총 입력 채널이 ${totalChannels}개로 WING의 Input Channel 40개를 초과합니다. Aux 채널(A1-A8) 활용을 검토하세요.`
    );
  }
  if (busResult.length > MAX_BUSES) {
    warnings.push(`버스가 ${busResult.length}개로 WING의 Bus 16개를 초과합니다.`);
  }
  if (mains.length > 4) {
    warnings.push(`Main이 ${mains.length}개로 WING의 Main 4개를 초과합니다.`);
  }

  return { channels, totalChannels, buses: busResult, mains, warnings };
}
