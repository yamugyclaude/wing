export type ScenarioStep = {
  n: number;
  title: string;
  command: string; // imperative instruction: do this
  where: string; // physical button or screen involved
  note?: string;
  troubleshooting?: string[]; // problems found while actually following the steps, and the fix
};

export type TargetSetting = {
  item: string; // channel/bus/main name
  param: string; // what's being set
  target: string; // concrete numeric/state target
};

export type Scenario = {
  slug: string;
  title: string;
  summary: string;
  confirmed: boolean;
  source?: string;
  setup: string[]; // channel list description
  goal: string[];
  targetSettings: TargetSetting[]; // concrete numeric targets — practice guidance, not from manual
  steps: ScenarioStep[];
  finalResult: string[];
};

export const scenarioList: Scenario[] = [
  {
    slug: "small-band-vocal-monitor",
    title: "소규모 밴드 — PA + 보컬 모니터 + 리버브",
    summary: "보컬2/기타/베이스/드럼 8채널로 PA 출력, 보컬 웨지 모니터, 보컬 리버브까지 구성하는 절차",
    confirmed: true,
    source: "User Manual Chapter 4 (Control Surface), Chapter 5 (Main Screens)",
    setup: [
      "CH1: Vocal 1 (Lead, 콘덴서/다이나믹 마이크, 팬텀 필요할 수 있음)",
      "CH2: Vocal 2 (Harmony)",
      "CH3: Guitar DI",
      "CH4: Bass DI",
      "CH5: Kick",
      "CH6: Snare",
      "CH7-8: Overhead L/R (콘덴서 마이크, 팬텀 필요)",
    ],
    goal: [
      "모든 채널을 Main 1(PA)으로 출력",
      "Bus 1을 보컬 전용 모니터 믹스로 써서 Aux Out(웨지)로 내보내기",
      "Bus 2를 보컬 리버브 센드로 써서 Main 1에 섞기",
    ],
    targetSettings: [
      { item: "Vocal 1, 2", param: "게인", target: "약 30-40dB (다이나믹 마이크 기준, 평균 토크 레벨에서 -18dB 근처)" },
      { item: "Vocal 1, 2", param: "팬텀파워", target: "ON (콘덴서 마이크인 경우만)" },
      { item: "Vocal 1, 2", param: "저역 필터(하이패스)", target: "약 100Hz 이상 컷 — 팝노이즈/근접효과 제거용" },
      { item: "Guitar/Bass DI", param: "게인", target: "약 0-10dB (라인 레벨, 이미 신호가 큰 편)" },
      { item: "Kick", param: "게인 + 게이트", target: "약 20-30dB, 게이트 threshold는 다른 드럼 소리에 안 열릴 정도로" },
      { item: "Snare", param: "게인 + 게이트", target: "약 25-35dB, 게이트로 킥/하이햇 블리드 억제" },
      { item: "Overhead L/R", param: "게인 + 팬텀", target: "약 25-35dB, 팬텀 ON, 팬은 L/R 풀로 벌려서 스테레오감" },
      { item: "Main 1", param: "마스터 페이더", target: "0dB(유니티) 부근에서 시작 — 여기서 더 올리기보다 채널 게인으로 헤드룸 확보" },
      { item: "Bus 1 (모니터)", param: "Send Mode", target: "TAP/PRE — 메인 페이더를 움직여도 모니터 밸런스가 안 변하게" },
      { item: "Bus 1 (모니터)", param: "Vocal 1, 2 센드 레벨", target: "본인 목소리는 크게, 상대 보컬은 살짝 — 서로 다르게 시작해서 리허설 중 조정" },
      { item: "Bus 2 (리버브)", param: "Send Mode", target: "POST — 페이더 움직임에 비례해서 리버브 양도 같이 변하게" },
      { item: "Bus 2 (리버브)", param: "리버브 Decay/Mix", target: "Decay 1.2-1.8초, Mix는 보컬이 약간 촉촉해지는 정도(과하지 않게)" },
      { item: "Bus 2 → Main 1", param: "센드 레벨", target: "드라이 신호보다 15-20dB 낮게 — 리버브가 티나지 않게 자연스럽게" },
    ],
    steps: [
      {
        n: 1,
        title: "입력 연결",
        command: "8개 마이크/DI 케이블을 콘솔 뒷면 Local In 1-8 XLR 커넥터에 꽂아라.",
        where: "뒷면 Local In 1-8 (하드웨어)",
        note: "완료되면 다음 단계(Source 패칭)로 넘어간다.",
      },
      {
        n: 2,
        title: "Source를 채널에 패칭",
        command:
          "ROUTING 화면을 열고 CHANNELS 탭을 눌러라. 채널 1을 클릭한 뒤 오른쪽에서 Local In 1을 클릭해라. 같은 방식으로 채널 2~8까지 Local In 2~8을 순서대로 연결해라.",
        where: "ROUTING → CHANNELS 화면",
        note: "+1 AUTO 버튼을 켜두면 채널을 클릭할 때마다 자동으로 다음 채널로 넘어가 더 빠르다. 완료되면 8개 채널 모두에 초록 표시(연결됨)가 뜬 것을 확인하고 다음 단계로.",
      },
      {
        n: 3,
        title: "팬텀파워 켜기 (Vocal 1, 2, Overhead L/R)",
        command:
          "채널 1을 선택한 상태에서 4-Channel Section의 GAIN/48V 버튼을 길게 눌러 +48V를 켜라. 채널 2, 7, 8도 같은 방식으로 반복해라.",
        where: "4-Channel Section의 GAIN/48V 버튼(홀드)",
        note: "팬텀파워는 채널이 아니라 Source 속성이다 — HOME 화면에서 찾으려 하지 마라. 완료되면 게인 세팅으로 넘어간다.",
      },
      {
        n: 4,
        title: "게인 세팅",
        command:
          "각 연주자에게 실제로 소리를 내달라고 요청해라. 그 상태에서 GAIN/48V 노브를 돌려 METERS 화면의 레벨이 클리핑(빨간불) 없이 중간~중상 정도에 오도록 맞춰라. 1번부터 8번까지 순서대로 반복해라.",
        where: "4-Channel Section의 GAIN/48V 노브, 확인은 METERS 화면",
        note: "METERS는 보기만 가능하다 — 실제 조정은 반드시 GAIN 노브에서. 8채널 전부 적정 레벨이 확인되면 다음 단계로.",
      },
      {
        n: 5,
        title: "채널을 Main 1(PA)로 보내기",
        command: "각 채널의 HOME 화면에서 MAIN 탭을 열고 MAIN 1 send를 켜라. 채널 1부터 8까지 반복해라.",
        where: "채널 HOME 화면의 MAIN 탭, 또는 4-Channel Section의 PAN/MAIN 버튼",
        note: "이 단계가 끝나면 8채널 모두가 일단 PA로는 소리가 나가는 상태가 된다. 다음은 보컬 모니터 구성이다.",
      },
      {
        n: 6,
        title: "보컬 모니터용 Bus 1 설정 (TAP 모드)",
        command:
          "Bus 1의 HOME 화면을 열고 중앙 채널 그리드를 눌러 Bus Feed Configuration 화면으로 들어가라. Vocal 1, 2를 선택하고 Send Mode를 TAP/PRE로 바꿔라(KEEP 상태로 두면 적용 안 됨). 같은 화면에서 Ignore Channel Mute를 Set On으로 바꿔라. Send Panning은 Center로 둬라. 화면을 나온 뒤, 센터 페이더 섹션에서 Bus 1을 선택하고 SOF FLIP 버튼을 눌러라. Vocal 1, 2 채널의 물리 페이더를 움직여 모니터 볼륨 밸런스를 잡아라. 끝나면 SOF FLIP을 다시 눌러 꺼라.",
        where: "Bus 1 HOME 화면 → Bus Feed Configuration, 레벨 조정은 SOF FLIP 버튼",
        note: "Send Mode(TAP 지정)와 Send Level(볼륨 크기)은 서로 다른 조작이다 — 순서를 바꾸면 안 된다. 모니터 밸런스가 잡히면 다음 단계로.",
      },
      {
        n: 7,
        title: "Bus 1을 실제 모니터 웨지로 출력",
        command: "ROUTING 화면에서 OUTPUTS 탭을 열어라. Aux Out 1(또는 웨지가 실제로 꽂힌 잭)을 클릭하고, Source로 Bus 1을 선택해라.",
        where: "ROUTING → OUTPUTS 화면",
        note: "이 연결을 안 하면 6번에서 만든 모니터 믹스가 있어도 웨지에서 아무 소리도 안 난다. 웨지에서 보컬이 들리는 걸 확인하면 다음 단계로.",
      },
      {
        n: 8,
        title: "보컬 리버브용 Bus 2 설정 (POST 모드) + 이펙트 로드",
        command:
          "Vocal 1, 2 채널의 HOME 화면에서 Bus 2 send를 POST 모드로 켜라. EFFECTS 화면을 열고 빈 슬롯에 리버브를 로드한 뒤, Bus 2의 인서트 포인트에 그 리버브를 걸어라.",
        where: "채널 HOME 화면 Bus Feed(POST) + EFFECTS 화면",
        note: "완료되면 Bus 2에서 리버브가 걸린 보컬 신호가 만들어진 상태다.",
      },
      {
        n: 9,
        title: "Bus 2(리버브)를 Main 1에 섞기",
        command: "Bus 2의 HOME 화면에서 MAIN 탭을 열고 MAIN 1 send를 켜라. 리버브가 너무 크거나 작지 않을 만큼 레벨을 조정해라.",
        where: "Bus 2 HOME 화면의 MAIN 탭",
        note: "PA에서 보컬에 자연스러운 리버브가 섞여 들리면 완료.",
      },
      {
        n: 10,
        title: "스냅샷 저장",
        command: "LIBRARY 화면을 열고 지금 상태를 새 스냅샷으로 저장해라. 이름을 알아보기 쉽게 지어라(예: '소규모밴드_기본').",
        where: "LIBRARY 화면",
        note: "저장이 끝나면 이 시나리오는 완료다. 다음 리허설/공연에 이 스냅샷을 그대로 불러오면 된다.",
      },
    ],
    finalResult: [
      "8채널(보컬2/기타/베이스/드럼) 전체가 Main 1을 통해 PA로 나간다",
      "보컬 1, 2만의 독립적인 모니터 믹스가 Bus 1 → Aux Out 1을 통해 무대 웨지로 나간다",
      "보컬에 리버브가 Bus 2를 거쳐 Main 1에 자연스럽게 섞여 있다",
      "전체 상태가 스냅샷으로 저장되어 있어 다음에 바로 불러올 수 있다",
    ],
  },
];
