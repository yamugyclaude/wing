export type Qna = {
  slug: string;
  question: string;
  summary: string;
  answer: string;
  confirmed: boolean;
  source?: string;
};

export const qnaList: Qna[] = [
  {
    slug: "bus-aux-mtx-main",
    question: "BUS, AUX, MTX, MAIN은 서로 어떻게 다른가요?",
    summary: "WING의 4가지 버스/채널 타입 구조 정리",
    confirmed: true,
    source: "User Manual Chapter 2, p.6-9",
    answer: `WING은 X32와 달리 GRP/AUX가 분리된 고정 타입이 아니라, 통합된 버스 구조를 사용합니다.

- **AUX 8개 (A1-A8)**: 센드 버스가 아니라 추가 입력 채널입니다. mono/stereo를 지원합니다.
- **BUS 16개 (B1-B16)**: 통합 버스로, 채널마다 3가지 모드 중 하나로 보낼 수 있습니다.
  - TAP: 채널의 TAP 지점(보통 pre-fader)에서 신호를 가져옴 — 모니터 믹스에 주로 사용
  - POST: post-fader 신호를 가져옴 — 리버브/딜레이 등 이펙트 센드에 주로 사용
  - GROUP: 센드 레벨이 비활성화되고 페이더로만 제어 — 드럼 그룹 등 서브그룹 처리에 사용
  같은 버스라도 채널마다 다른 모드로 보낼 수 있습니다.
- **MAIN 4개 (M1-M4)**: 최종 스테레오 출력. 채널마다 4개의 독립적인 Main send가 있고 각각 Pre/Post 설정이 가능합니다. 예: 하나는 PA용, 하나는 라이브 스트림용으로 동시 운용 가능.
- **MTX(Matrix) 8개 (MX1-MX8)**: BUS와 같은 프로세싱/라우팅 옵션을 제공하지만, 다른 Bus나 Matrix로는 보낼 수 없고 오직 디지털/아날로그 출력으로만 나갈 수 있습니다. 로비, 방송 등 서브/존 믹스에 주로 사용.
- Bus/Main/Matrix는 전부 다시 어떤 Input/Aux 채널의 Source로도 재사용할 수 있습니다.`,
  },
  {
    slug: "aux-vs-bus-other-consoles",
    question: "AUX와 BUS가 역할이 비슷한 것 같은데, 왜 헷갈릴까요?",
    summary: "X32 등 다른 콘솔의 AUX/GRP 개념과 WING 용어가 겹치는 지점 정리",
    confirmed: true,
    source: "User Manual Chapter 2, p.6-9",
    answer: `X32 등 다른 콘솔에서 흔히 쓰는 개념:
- AUX = 센드 버스 (리버브 등으로 신호를 보내는 용도)
- GRP = 그룹 버스 (악기 묶음을 하나의 페이더로 묶어 제어)

WING은 이 둘을 완전히 다르게 재편했습니다.

- AUX (A1-A8): WING에서는 센드 버스가 아니라 추가 입력 채널입니다. 입력 채널 40개에 8개가 더 붙는 개념이라, 이름은 같아도 역할은 전혀 다릅니다.
- BUS (B1-B16): X32의 AUX 센드 + GRP를 합친 자리입니다. 하나의 통합 버스가 채널마다 TAP(센드용)/POST(이펙트 센드)/GROUP(그룹 페이더) 3가지 모드 중 골라서 쓰이는 구조라, 예전 콘솔의 AUX 센드도 GRP도 전부 이 BUS 안에서 모드로 처리됩니다.

정리: 이름이 겹치는 것(AUX)일수록 오히려 역할이 완전히 다르고, 이름이 다른 것(BUS)이 오히려 옛 AUX 센드 + GRP 역할을 흡수했다는 점이 WING 용어 체계의 핵심 변경점입니다.`,
  },
  {
    slug: "wing-term-glossary",
    question: "WING에서 쓰는 라우팅 용어들, 역할만 추려서 정리하면?",
    summary: "Source / Channel / Aux / Bus / Main / Matrix / User Signal / User Patch 용어집",
    confirmed: true,
    source: "User Manual Chapter 2, p.6-9",
    answer: `WING 신호 흐름에 등장하는 용어를 역할 중심으로 정리했습니다.

- Source: 오디오가 콘솔에 들어오는 실제 입구. XLR, StageConnect, USB, AES50 등 물리/디지털 입력 자체를 가리키며, 이름·색·아이콘·게인·팬텀파워 등을 가지고 있습니다. 여러 채널이 같은 Source를 가져다 쓸 수 있습니다.

- Input Channel (40개): Source를 받아 EQ/다이내믹스 등 프로세싱을 적용하는 채널. mono/stereo/mid-side를 채널 링크 없이 자체 처리합니다.

- Aux 채널 (A1-A8): 입력 채널과 같은 성격의 추가 입력 채널. 센드 버스가 아닙니다.

- Bus (B1-B16): 채널 신호를 모으는 통합 버스. 채널마다 TAP(모니터용, 보통 pre-fader)/POST(이펙트 센드용)/GROUP(그룹 페이더 제어용) 중 하나의 모드로 보낼 수 있습니다.

- Main (M1-M4): 최종 스테레오 출력 버스. 채널마다 4개의 독립 Main send가 있어 PA용/스트림용처럼 동시에 다른 믹스를 만들 수 있습니다.

- Matrix / MTX (MX1-MX8): Bus·Main의 신호를 다시 섞는 상위 버스. 다른 Bus나 Matrix로는 못 보내고 디지털/아날로그 출력으로만 나갑니다. 로비·중계 등 서브/존 믹스용.

- User Signal (24개): 입력 채널/Aux/Bus/Matrix/Main 중 하나를 복사한 모노 신호. pre-fader(TAP) 또는 post-fader로 딸 수 있고, 인접한 2개를 묶어 스테레오/mid-side로도 쓸 수 있습니다.

- User Patch (32개): 외부 Source(Local In, AES50, USB Audio 등)를 복사한 모노 신호. 서로 다른 그룹/비인접 채널을 스테레오로 묶거나, 한쪽에만 게인/위상/팬텀을 다르게 걸고 싶을 때 사용합니다.

- Oscillator (2개): 사인파/핑크노이즈/화이트노이즈를 내보내는 테스트톤 발생기. 어떤 채널이나 출력의 Source로 쓸 수 있습니다.

핵심 구도: Source → (Input Channel 또는 Aux) → Bus → (Main 또는 Matrix) → Output. Bus/Main/Matrix는 전부 다시 채널의 Source로 재사용할 수 있어 순환 라우팅도 가능합니다.`,
  },
  {
    slug: "where-to-do-what",
    question: "이 기능은 어느 화면/버튼에서 하는 건가요? (기능별 위치 지도)",
    summary: "팬텀파워, 게인, 패칭, 레벨 확인 등 — 무엇을 어디서 할 수 있는지 정리",
    confirmed: true,
    source: "User Manual Chapter 4-5 (Control Surface, Main Screens)",
    answer: `화면/버튼을 먼저 누르고 뭘 할 수 있는지 알아내려 하면 헷갈립니다. 반대로, "하고 싶은 것" 기준으로 어디로 가야 하는지 먼저 알아두면 화면이 눈에 들어옵니다.

**중요 원칙**: 팬텀파워, 게인, 극성 같은 값은 채널이 아니라 Source에 속합니다. 그래서 채널 화면이 아니라 Source 관련 화면/버튼에서 다룹니다.

- 팬텀파워 ON/OFF: 하드웨어 4-Channel Section의 GAIN/48V 버튼 누르기(홀드), 또는 ROUTING → SOURCES 화면에서 해당 Source 선택 후 설정. 채널 HOME 화면이 아님.
- 게인(프리앰프) 조정: 4-Channel Section의 GAIN/48V 노브, 또는 ROUTING → SOURCES 화면.
- 극성(위상) 반전, mono/stereo/mid-side 설정: ROUTING → SOURCES 화면.
- Source를 채널에 연결(패칭): ROUTING → CHANNELS 화면. 여러 채널을 빠르게 패칭할 때 최적.
- 채널/버스 신호를 실제 출력(스피커, 레코딩 등)으로 내보내기: ROUTING → OUTPUTS 화면.
- 레벨을 한눈에 확인만 하기(조정 불가, 읽기 전용): METERS 화면. 여기서 그룹(예: 16 Buses)을 터치하면 실제로 조정 가능한 FADERS 화면으로 이동합니다 — METERS 자체는 보기 전용이라는 게 핵심.
- 페이더로 레벨 직접 조정: FADERS 화면 또는 물리 페이더.
- EQ / Gate / Compressor / Insert 조정: 채널 선택 후 HOME 화면(Channel Home) — 채널 종류(Input/Aux/Bus/Matrix/Main)에 따라 표시되는 processing slot이 다름.
- 채널을 어떤 Bus로, 어떤 모드(TAP/POST/GROUP)로 보낼지 설정: Bus/Matrix/Main의 HOME 화면에서 채널 그리드 클릭 → Bus Feed Configuration 화면. 또는 SENDS 화면.
- 이펙트(리버브 등) 걸기: EFFECTS 화면. Bus의 인서트에 걸면 센드 방식, 채널의 인서트에 걸면 인서트 방식.
- DCA/Mute Group에 채널 배정: HOME 화면의 Tags 탭.
- 스냅샷 저장/불러오기: LIBRARY 화면.
- 네트워크, 펌웨어, 전역 설정: SETUP 화면.

정리하면, 콘솔 화면은 크게 "값을 보기만 하는 화면"(METERS)과 "실제로 조정하는 화면"(FADERS, HOME, SOURCES 등)으로 나뉘고, ROUTING 안에서도 SOURCES(입력 속성)·CHANNELS(입력↔채널 연결)·OUTPUTS(신호↔출력 연결) 세 가지 역할이 명확히 구분됩니다.`,
  },
  {
    slug: "main-vs-output",
    question: "Main이 Output으로 나간다는 의미에서, Main이라는 용어는 정확히 무엇을 뜻하나요?",
    summary: "Main(최종 믹스 버스)과 Output(실제 물리 출구)은 다른 레이어라는 점 정리",
    confirmed: true,
    source: "User Manual Chapter 2 (Main), Chapter 5.4 ROUTING → OUTPUTS",
    answer: `**Main과 Output은 같은 것이 아닙니다.**

- Main: 신호 처리 관점에서 "최종 믹스"를 만드는 버스입니다. 이름의 뜻은 "출력"이 아니라 "주(主) 믹스" — 여러 채널을 하나로 합친 대표 믹스라는 의미입니다. WING엔 M1-M4 4개가 있어서, 동시에 여러 개의 "대표 믹스"(예: PA용, 라이브 스트림용)를 만들 수 있습니다.

- Output: 그 믹스가 실제로 빠져나가는 물리적/디지털 출구(XLR, AES50 등)입니다. ROUTING → OUTPUTS 화면에서 "무엇을(Source Group) 어디로(출력 커넥터) 보낼지" 별도로 연결해야 실제 소리가 나갑니다.

즉 Main은 "출력으로 나갈 준비가 된 최종 신호"이고, Output은 "그 신호가 실제로 빠져나가는 문"입니다. Main을 만들었어도 OUTPUTS에서 연결해주지 않으면 소리는 안 나갑니다 — "Main"이라는 이름 자체에 "밖으로 나간다"는 뜻이 들어있는 게 아니라, 관례적으로 Main이 대부분 바로 Output에 연결되는 경우가 많아서 그렇게 느껴지는 것뿐입니다.

Bus나 Matrix도 마찬가지로 OUTPUTS 화면에서 연결해야 실제 출력으로 나갑니다 — Main만 특별한 게 아니라, 모든 버스 타입이 "처리 단계"와 "실제 출구 연결 단계"가 분리되어 있다는 게 WING 라우팅의 공통 원칙입니다.`,
  },
];
