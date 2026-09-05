export type ScenarioStep = {
  n: number;
  title: string;
  action: string;
  where: string; // physical button or screen involved
  note?: string;
};

export type Scenario = {
  slug: string;
  title: string;
  summary: string;
  confirmed: boolean;
  source?: string;
  setup: string[]; // channel list description
  goal: string[];
  steps: ScenarioStep[];
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
    steps: [
      {
        n: 1,
        title: "입력 연결",
        action: "8개 마이크/DI 케이블을 콘솔 뒷면 Local In 1-8 XLR 커넥터에 연결",
        where: "뒷면 Local In 1-8 (하드웨어)",
      },
      {
        n: 2,
        title: "Source를 채널에 패칭",
        action: "Local In 1-8을 Input Channel 1-8에 연결 (기본값이 1:1이면 확인만)",
        where: "ROUTING → CHANNELS 화면",
        note: "채널을 클릭 → Source(Local In 1-8) 클릭 순서. +1 AUTO 켜두면 연속 패칭이 빠름.",
      },
      {
        n: 3,
        title: "팬텀파워 켜기 (Vocal 1, 2, Overhead L/R)",
        action: "콘덴서 마이크가 물린 채널(1, 2, 7, 8)에 +48V 팬텀파워 ON",
        where: "4-Channel Section의 GAIN/48V 버튼(홀드), 또는 ROUTING → SOURCES 화면",
        note: "팬텀파워는 채널이 아니라 Source 속성이라는 점 주의 — HOME 화면에는 없음.",
      },
      {
        n: 4,
        title: "게인 세팅",
        action: "각 채널에 실제 신호를 넣으며 GAIN 노브로 레벨 조정 (클리핑 없이 적정 레벨까지)",
        where: "4-Channel Section의 GAIN/48V 노브, 확인은 METERS 화면",
        note: "METERS는 읽기 전용 — 값을 보고 실제 조정은 GAIN 노브나 SOURCES 화면에서.",
      },
      {
        n: 5,
        title: "채널을 Main 1(PA)로 보내기",
        action: "각 채널의 MAIN 1 send를 켜고 레벨/팬 조정",
        where: "채널 HOME 화면의 MAIN 탭, 또는 4-Channel Section의 PAN/MAIN 버튼",
      },
      {
        n: 6,
        title: "보컬 모니터용 Bus 1 설정 (TAP 모드)",
        action: "Vocal 1, 2 채널의 Bus 1 send를 TAP 모드로 켬 — 개별 모니터 레벨 조정 가능하게",
        where: "채널 HOME 화면의 Bus Feed Configuration, 또는 SOF FLIP 모드",
        note: "SOF FLIP 사용법: ① 센터 페이더 섹션에서 Bus 1 선택 ② SOF FLIP 버튼 누름 ③ 각 채널 페이더로 Bus 1 센드 레벨 조정. 끝나면 SOF FLIP 다시 눌러 종료.",
      },
      {
        n: 7,
        title: "Bus 1을 실제 모니터 웨지로 출력",
        action: "Bus 1을 Aux Out 1/2 물리 출력에 연결 (웨지 스피커가 꽂힌 잭)",
        where: "ROUTING → OUTPUTS 화면",
        note: "Bus를 만들었어도 여기서 연결 안 하면 웨지에서 소리 안 남 — Main과 동일한 원칙.",
      },
      {
        n: 8,
        title: "보컬 리버브용 Bus 2 설정 (POST 모드) + 이펙트 로드",
        action: "Vocal 1, 2 채널의 Bus 2 send를 POST 모드로 켬. Bus 2의 인서트 포인트에 리버브 이펙트 로드",
        where: "채널 HOME 화면 Bus Feed(POST) + EFFECTS 화면",
      },
      {
        n: 9,
        title: "Bus 2(리버브)를 Main 1에 섞기",
        action: "Bus 2의 Main 1 send를 켜고 원하는 만큼(리버브 양) 레벨 조정",
        where: "Bus 2 HOME 화면의 MAIN 탭",
      },
      {
        n: 10,
        title: "스냅샷 저장",
        action: "지금까지의 설정 전체를 스냅샷으로 저장해두기",
        where: "LIBRARY 화면",
        note: "다음 리허설/공연에 그대로 불러올 수 있음.",
      },
    ],
  },
];
