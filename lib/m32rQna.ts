// M32R LIVE content — kept fully independent from WING's lib/qna.ts and lib/scenarios.ts.
// Different console, different architecture (X32-family layout, not WING's).

export type M32rQna = {
  slug: string;
  question: string;
  summary: string;
  answer: string;
  confirmed: boolean;
  source?: string;
};

export const m32rQnaList: M32rQna[] = [
  {
    slug: "m32r-channel-bus-structure",
    question: "M32R LIVE는 채널/버스 구조가 어떻게 되나요?",
    summary: "40채널(32 Input + 8 Aux/FX Return), 25개 Mix Bus(16 Bus + 6 Matrix + Main) 구조",
    confirmed: true,
    source: "M32R LIVE Quick Start Guide, p.16-19",
    answer: `M32R LIVE는 WING과 다른 아키텍처(X32 계열)를 씁니다. WING 지식을 그대로 적용하면 안 됩니다.

**입력 (총 40채널)**
- Input 1-32: 물리 입력 채널 32개 (LAYER SELECT로 4개 뱅크: 1-8, 9-16, 17-24, 25-32)
- Aux In/USB: 6채널 + USB
- FX Return: 8채널 (1L-4R, 스테레오 4쌍)

**믹스 버스 (총 25개)**
- BUS 1-16: 믹스 버스 16개 (뱅크 두 개: 1-8, 9-16)
- MTX 1-6: 매트릭스 출력 6개
- MAIN C: 메인 모노/센터 버스 1개
- MAIN (Stereo L/R): 메인 스테레오 버스

**GROUP/BUS CHANNELS 레이어에서 접근 가능한 것들**
- GROUP DCA 1-8: DCA 그룹 8개
- BUS 1-8, BUS 9-16: Bus 마스터
- MTX 1-6 / MAIN C: 매트릭스 출력 + 메인 센터

**하드웨어 특이사항**
- FADER FLIP - SENDS ON FADER 버튼: WING의 SOF FLIP과 같은 역할이지만 이름이 다름
- SEL(선택) 버튼: 항상 채널 하나만 선택되는 것도 WING과 동일한 개념
- LAYER SELECT로 어느 레이어에 있든 물리 페이더 12개(또는 8개 등)가 그 레이어의 채널로 매핑됨

WING처럼 "AUX가 입력 채널"이라는 개념이 여기도 유사하게 있지만(Aux In/USB), 버스 개수와 Matrix 개수, DCA 개수 등 세부 숫자는 전혀 다르므로 WING 페이지 내용과 섞어서 참고하면 안 됩니다.`,
  },
];
