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
];
