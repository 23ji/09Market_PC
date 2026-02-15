# Technical Design Document: 공구마켓 (09Market) MVP

## How We'll Build It

### Recommended Approach: No-Code (Softr + Airtable)

사용자분의 PRD(공구마켓)와 리서치 결과에 따르면, 가장 빠르고 효율적으로 웹사이트를 만드는 방법은 **Airtable(데이터베이스)**과 **Softr(웹사이트)**를 연동하는 것입니다.

**Primary Recommendation: Softr + Airtable**
- **이유:**
  - 엑셀(Airtable)에 공구 정보만 입력하면 웹사이트(Softr)가 자동으로 업데이트됩니다.
  - 별도의 서버 개발이나 디자인 코딩 없이 '검색', '필터', '상세페이지' 기능을 바로 쓸 수 있습니다.
  - 무료 플랜으로도 충분히 예쁘고 강력한 기능을 구현할 수 있습니다.
- **예산:** 0원 (도메인 구매 시 연 1~2만원 별도)
- **제작 시간:** 약 5~10시간 (데이터 입력 시간 제외)

### Alternative Options Compared

| 옵션 | 장점 | 단점 | 비용 | MVP 제작 |
| :--- | :--- | :--- | :--- | :--- |
| **Softr + Airtable (추천)** | 디자인 예쁨, 검색 강력함, 공개 데이터에 최적 | 커스텀 기능 제한적 (코딩 불가) | 무료 | 3~5일 |
| **Glide** | 앱처럼 보임, 제작 매우 쉬움 | 데이터 업데이트 횟수 제한 (무료 버전 치명적) | 무료 | 2~3일 |
| **Bubble** | 거의 모든 기능 구현 가능 | 배우는 데 오래 걸림 (최소 2주 이상) | 유료 추천 | 3주+ |

---

## Project Setup Checklist

### Step 1: 계정 생성 (Day 1)
- [ ] **Airtable** 계정 생성 ([airtable.com](https://airtable.com))
- [ ] **Softr** 계정 생성 ([softr.io](https://softr.io)) - Airtable 계정으로 가입하며 연동

### Step 2: 프로젝트 초기화 (Day 1)
1. **Airtable**: 'Start from scratch'로 빈 베이스 생성 → 이름: `09Market_DB`
2. **Softr**: 'New Application' → 'Start from scratch' 또는 'Directory Template' 선택 → Airtable 연동

---

## Database Design (Airtable)

가장 중요한 데이터 구조입니다. Airtable의 첫 번째 테이블 이름을 **`Tools`** (또는 `Items`)로 변경하고 아래 컬럼을 만드세요.

### Table: Items (공구 상품 리스트)

| 컬럼명 (Field Name) | 타입 (Type) | 설명 | 예시 데이터 |
| :--- | :--- | :--- | :--- |
| **Item Name** | Single line text | 제품명 (검색 핵심) | 마녀공장 클렌징오일 |
| **Category** | Single select | 카테고리 (필터용) | 뷰티, 패션, 식품, 유아동, 라이프 |
| **Influencer** | Single line text | 인플루언서 이름 | @gonggu_queen |
| **Status** | Formula 💡 | 상태 (진행중/마감) | `IF(AND(TODAY()>=Start, TODAY()<=End), "Open", "Closed")` |
| **Start Date** | Date | 공구 시작일 | 2026-02-20 |
| **End Date** | Date | 공구 종료일 | 2026-02-23 |
| **Price** | Currency | 공구 가격 | ₩19,800 |
| **Purchase Link** | URL | 구매 링크 (아웃링크) | https://bit.ly/... |
| **Image** | Attachment | 썸네일 이미지 | (이미지 파일) |
| **Description** | Long text | 상세 설명 | 본품 2개 + 리필 1개 구성 |

> **💡 꿀팁 (Status 자동화)**
> `Status` 컬럼을 'Formula' 타입으로 만들고 위 수식을 넣으면, 날짜에 따라 자동으로 "Open" / "Closed"가 바뀝니다. 매번 손으로 바꿀 필요가 없습니다!

---

## Building Your Features (Softr)

### Feature 1: 메인 공구 리스트 & 검색
**구현 방법 (Softr Editor):**
1. **Block 추가**: Dynamic Blocks > **List** (또는 List with vertical cards) 선택
2. **Data Source 연결**: Airtable의 `09Market_DB` 베이스 > `Items` 테이블 선택
3. **Content 매핑**:
   - Image = `Image` 컬럼
   - Heading 1 = `Item Name`
   - Text = `Influencer`
   - Tag = `Status` (Open/Closed 표시)
4. **Filter 설정**:
   - 상단 검색바(Search bar) 켜기 → Search by: `Item Name`, `Influencer`
   - 상단 태그(In-line filters) 켜기 → Filter by: `Category`

### Feature 2: 공구 상세 페이지
**구현 방법:**
1. 리스트 블록 설정에서 **On Click action**을 'Open detail page'로 설정
2. **Detail Page** 생성 (자동 생성됨)
3. 상세 페이지 디자인:
   - 큰 이미지 배치
   - `Start Date` ~ `End Date` 크게 표시
   - **Action Button** 추가: "구매하러 가기" → Link to: `Purchase Link` (New tab)

### Feature 3: 마감 임박 순 정렬 (캘린더 대체)
**구현 방법:**
1. 리스트 블록 설정 > **Sort** 탭 이동
2. Default sorting: `End Date` 기준 **Ascending** (오름차순) 설정
   - 이렇게 하면 마감일이 가까운 순서대로 위에서부터 보입니다.

---

## Design Design (스타일링)

PRD의 **"인스타그래머블, 세련된, 심플한"** 느낌을 살리기 위한 설정입니다.

- **Global Style (Theme):**
  - Font: **Inter** 또는 **Open Sans** (깔끔한 산세리프)
  - Primary Color: 인스타 느낌의 **Hot Pink (#E1306C)** 또는 신뢰감을 주는 **Deep Blue** 추천
  - Background: **White** (여백을 많이 두세요)
- **Mobile Responsive:**
  - Softr 편집기 상단에서 'Mobile' 아이콘을 눌러 미리보기 확인
  - 모바일에서 이미지가 너무 작지 않은지, 글자가 잘 보이는지 체크

---

## Deployment Plan

### 배포 방법
1. Softr 편집기 우측 상단 **Publish** 버튼 클릭
2. 무료 도메인(`09market.softr.app` 등) 입력 후 배포
3. 친구들에게 링크 공유해서 테스트

### 커스텀 도메인 (선택 사항)
- 만약 `www.09market.com` 같은 주소를 쓰고 싶다면 도메인을 구매(약 1~2만원)하고 Softr 유료 플랜(월 $59~)을 써야 할 수도 있습니다.
- **But!** 초기 지인 테스트 단계에서는 무료 도메인으로 충분합니다. 굳이 돈 쓰지 마세요.

---

## Success Checklist

### Before Starting Development
- [ ] Airtable과 Softr에 가입이 완료되었는가?
- [ ] 공구 정보 10개 정도를 미리 찾아두었는가? (입력 연습용)

### During Development
- [ ] 이미지가 깨지지 않고 잘 나오는가?
- [ ] '구매하러 가기' 버튼을 누르면 새 창으로 잘 뜨는가?
- [ ] 날짜가 지나면 Status가 'Closed'로 잘 바뀌는가?

### Before Launch
- [ ] 스마트폰(아이폰/갤럭시)으로 접속해서 디자인 이상 없는지 확인
- [ ] 검색창에 검색어가 잘 먹히는지 확인

---
*Technical Design for: 공구마켓 (09Market)*
*Approach: No-Code (Softr + Airtable)*
*Estimated Time to MVP: 3-5 days*
*Estimated Cost: $0*
