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
  {
    slug: "festival-cue-sheet-channel-plan",
    question: "8개 팀이 순서대로 나오는 경연 행사, 채널을 어떻게 짜야 하나요? (실제 큐시트 기준)",
    summary: "16채널 스테이지박스 기준 — 씬 2개(비밴드/밴드)로 나눈 최종 확정안",
    confirmed: true,
    source: "M32R User Manual Section 2.8 Scenes",
    answer: `실제 큐시트(구름바람작은도서관/크로쓰리/통영시민오케스트라/스트림스/한소리밴드/예띠/가야금병창그룹MEAN/밴드(김대건팀), 총 8팀)를 기준으로 짠 최종 채널 계획입니다. 보유 스테이지박스가 16채널이라, 악기 편성이 비슷한 팀끼리 씬 2개로 묶어 채널을 재사용합니다.

**씬 구분**
- 씬1 (비밴드): 구름바람작은도서관, 통영시민오케스트라, 스트림스, 예띠, 가야금병창그룹MEAN
- 씬2 (밴드): 크로쓰리, 한소리밴드, 밴드(김대건팀)

MR 재생 채널은 두 씬 모두 CH15-16으로 고정해서 팀 전환 중 배경음악을 틀 때 헷갈리지 않게 합니다.

**씬1 채널 배정**
- CH1-3: 보컬 무선
- CH4-7: 합창 무선 ×4
- CH8-9: 바이올린 DPA ×2
- CH10: 가야금 핀마이크
- CH11: 피아노 무선
- CH12: 어쿠스틱기타 DI
- CH15-16: MR 재생

**씬2 채널 배정 (페이더 1-8뱅크에 보컬+드럼 꽉 채움)**
- CH1-3: 보컬 무선
- CH4: 일렉기타 앰프 Sm57
- CH5-8: 드럼(킥/스네어/OH-L/OH-R, Sennheiser e600)
- CH9: 베이스 DI
- CH10-11: 키보드 DI L/R
- CH15-16: MR 재생

**팀별 큐시트**

| 순서 | 팀명 | 씬 | 사용 채널 |
|---|---|---|---|
| 1 | 구름바람작은도서관 | 씬1 | CH4-7 합창, CH15-16 MR |
| 2 | 크로쓰리 | 씬2 | CH1-3 보컬, CH4 기타, CH5-8 드럼, CH9 베이스, CH10-11 키보드, CH15-16 MR |
| 3 | 통영시민오케스트라 | 씬1 | CH8-9 바이올린, CH11 피아노, CH15-16 MR |
| 4 | 스트림스 | 씬1 | CH12 어쿠스틱기타, CH15-16 MR |
| 5 | 한소리밴드 | 씬2 | CH1-2 보컬, CH4 기타, CH5-8 드럼, CH9 베이스, CH10-11 키보드, CH15-16 MR |
| 6 | 예띠 | 씬1 | CH1-3 보컬, CH15-16 MR |
| 7 | 가야금병창그룹MEAN | 씬1 | CH10 가야금, CH15-16 MR |
| 8 | 밴드(김대건팀) | 씬2 | CH1-3 보컬, CH4 기타, CH5-8 드럼, CH9 베이스, CH10-11 키보드, CH15-16 MR |

원문 기준 절차(Section 2.8 Scenes):
1. SCENES 화면 → scenes 탭에서 씬1/씬2 두 상태를 각각 SAVE
2. 팀 전환 시 home 탭에서 1번 엔코더로 해당 씬을 고르고 **GO**, 그 안에서는 팀별로 필요한 채널만 수동 언뮤트
3. **CHAN SAFE / PARAM SAFE** 탭에서 MR 채널(CH15-16)과 메인 출력 레벨처럼 씬 전환에도 절대 안 바뀌어야 하는 항목을 미리 지정

CH13-14는 예비 채널로 비워둡니다.`,
  },
];
