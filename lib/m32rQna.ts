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
    summary: "22채널 고정 안 + 단일 씬(안 A) vs 8개 씬 전환(안 B) — 두 가지 운용 방식 비교",
    confirmed: true,
    source: "M32R User Manual Section 2.8 Scenes",
    answer: `실제 큐시트(어린이합창단/밴드/클래식 앙상블/어쿠스틱/밴드/보컬솔로/국악/밴드, 총 8팀)를 기준으로 짠 채널 계획입니다. 팀마다 악기가 완전히 달라서, 겹치는 슬롯(보컬/기타/드럼 등)은 공유하는 방식으로 통합했습니다.

**공통 채널 리스트 (총 22채널, 두 안 모두 동일)**

- CH1-3: 보컬 무선 핸드헬드 ×3
- CH4-7: 합창 무선 마이크 ×4
- CH8-9: 바이올린 DPA 마이크 ×2
- CH10: 가야금 핀마이크
- CH11: 피아노 무선 마이크
- CH12: 일렉기타 앰프 Sm57
- CH13-16: 드럼(킥/스네어/OH-L/OH-R, Sennheiser e600)
- CH17: 어쿠스틱 기타 DI
- CH18: 베이스 DI
- CH19-20: 키보드 DI L/R
- CH21-22: MR 재생 (DCA 1로 볼륨 조정)

무선 채널 총 8개(보컬3+합창4+피아노1) — 보유 무선 수신기가 8채널 이상인지 확인 필요.

---

**안 A — 채널 고정 + 단일 Scene**

채널 배치는 위 표 그대로 상시 유지하고, Scene을 따로 안 쓰거나 1개만 써서 전체 행사를 관통합니다. 팀이 바뀔 때마다 엔지니어가 그 팀에 필요한 채널만 수동으로 언뮤트/페이더 조정합니다.

- 장점: 설정이 단순하고, Scene 전환 실수(엉뚱한 Scene 로드) 자체가 없음
- 단점: 팀마다 뮤트/페이더를 매번 손으로 조정해야 해서 체인지오버 속도가 느리고 실수 위험(안 쓰는 채널 안 뮤트 등)이 있음
- 적합한 경우: 팀 수가 적거나, 팀 전환 사이 시간 여유가 충분한 경우

**안 B — 팀별 Scene 8개**

채널 번호(1-22)는 그대로 고정, 대신 Scene 1~8을 팀별로 미리 만들어둬서 GO 버튼 하나로 전환합니다.

- Scene 1: 구름바람작은도서관 (합창 CH4-7 + MR CH21-22 언뮤트, 나머지 뮤트)
- Scene 2: 크로쓰리 (보컬1-3, 기타12, 드럼13-16, 키보드19-20 언뮤트)
- Scene 3: 통영시민오케스트라 (바이올린8-9, 피아노11 언뮤트)
- Scene 4: 스트림스 (어쿠스틱기타17 언뮤트)
- Scene 5: 한소리밴드 (보컬1-2, 기타12, 드럼13-16, 키보드19-20, 베이스18 언뮤트)
- Scene 6: 예띠 (보컬3 또는 어쿠스틱기타17, MR21-22)
- Scene 7: 가야금병창그룹MEAN (가야금10, MR21-22)
- Scene 8: 밴드(김대건팀) (보컬, 기타12, 드럼13-16, 베이스18, 키보드19-20 언뮤트)

원문 기준 절차(Section 2.8 Scenes):
1. SCENES 화면 → scenes 탭에서 현재 상태를 Scene으로 SAVE (팀별로 하나씩, 총 8개)
2. 실제 공연 중에는 home 탭에서 1번 엔코더로 다음 팀 Scene을 고르고, 탭해서 **GO**
3. **CHAN SAFE / PARAM SAFE** 탭에서 Scene이 바뀌어도 절대 안 바뀌었으면 하는 채널/파라미터(예: 메인 출력 레벨, MR 채널의 DCA 배정)를 미리 지정해두면 실수로 전체 밸런스가 틀어지는 걸 방지

- 장점: 버튼 하나로 팀 전환, 체인지오버 빠르고 실수 적음
- 단점: 행사 전에 8개 Scene을 미리 준비(리허설 필요)해야 하고, Scene Safe 설정을 안 해두면 의도치 않은 파라미터까지 같이 바뀔 수 있음
- 적합한 경우: 오늘 같은 8팀 경연/축제처럼 팀이 많고 전환이 빈번한 경우 — **추천**

**결론**: 팀 수(8개)와 빠른 전환 필요성을 고려하면 **안 B(Scene 8개)**가 실전에 더 적합합니다. 다만 안 A로 시작해서 리허설 중 안정화되면 안 B로 전환하는 것도 방법입니다.`,
  },
];
