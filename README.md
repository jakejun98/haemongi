# 해몽이 (Haemongi)  
> AI가 당신의 꿈을 해석해주는 꿈 일기 앱

---

## 🧐 문제 상황

많은 사람들은 꿈을 자주 꾸지만, 이를 해석하거나 기록하는 경우는 드뭅니다.  
기존 해몽 앱은 대부분 키워드만 매칭해 단편적인 설명을 보여주며, 꿈의 흐름이나 감정은 반영하지 않습니다.

또한 꿈 일기 기능이 있는 앱도 있지만, 단순한 텍스트 저장에 그쳐 꾸준히 사용하기 어렵습니다.

> 그래서 저는, **AI가 맥락과 감정을 분석해 해몽을 제공하고, Firebase로 꿈을 안전하게 저장/관리할 수 있는 앱**을 만들었습니다.

---

## ✨ 주요 기능

### 🔹 현재 구현된 기능
- OpenAI API를 통한 GPT 기반 해몽
- Firebase Auth 기반 구글 로그인
- 사용자별 꿈 일기 저장 (Firestore)
- 꿈 일기 목록 조회 및 삭제
- 반응형 UI 구성

### 🔹 개발 예정 기능
- 감정 분석 기능 (예: 불안, 행복 등 시각화)
- 사용자의 꿈 패턴 기반 GPT 피드백 제안
- 꿈 통계/그래프 시각화
- 꿈 공유 기능
- PWA

---

## 🛠 기술 스택

| 분류 | 기술 |
|------|------|
| 프론트엔드 | React, Vite, TailwindCSS |
| 백엔드 (BaaS) | Firebase (Auth, Firestore, Hosting) |
| AI API | OpenAI GPT-3.5 API |
| 배포 | Firebase Hosting |


---

## 🖼 데모

> 추후 추가 예정: 사용 화면 캡처 이미지

---

## 🚀 실행 방법

```bash
git clone https://github.com/jakejun98/haemongi.git
cd haemongi
npm install
npm run dev
