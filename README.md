# My Summary - Obsidian Plugin

옵시디안에서 개인 요약을 작성하고 관리하는 플러그인입니다. 서울대학교 기록학자 김익한 교수의 기록법을 참고하여 제작되었습니다.

## 기능

- **빠른 요약 작성**: 단축키를 통해 팝업창을 열어 즉시 요약 작성
- **체계적인 정리**: 노트 최상단에 '## 0. My Summary' 섹션으로 자동 저장
- **편집 기능**: 기존 요약이 있을 경우 이어서 작성 가능
- **프론트매터 호환**: 프론트매터가 있는 노트에서도 올바른 위치에 요약 삽입

## 설치 방법

### BRAT을 통한 설치 (권장)

1. BRAT 플러그인 설치
2. BRAT 설정에서 'Add Beta plugin' 클릭
3. Repository URL 입력: `https://github.com/[your-username]/my-summary`
4. 'Add plugin' 클릭

### 수동 설치

1. 최신 릴리즈에서 `main.js`, `manifest.json`, `styles.css` 다운로드
2. Obsidian vault의 `.obsidian/plugins/my-summary/` 폴더에 복사
3. Obsidian 설정 → Community plugins → 'My Summary' 활성화

## 사용 방법

1. 요약을 작성하려는 노트를 엽니다
2. 설정한 단축키를 누르거나 명령 팔레트에서 'My Summary: Open summary editor' 실행
3. 팝업창에 요약 내용 작성
4. 'Save' 버튼 클릭하여 저장

## 설정

### 단축키 설정

1. Obsidian 설정 → Hotkeys
2. 'My Summary' 검색
3. 'Open summary editor' 명령에 원하는 단축키 할당

## 개발

### 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 모드 실행 (watch mode)
npm run dev

# 프로덕션 빌드
npm run build
```

### 기여하기

이슈 제보 및 PR은 언제나 환영합니다!

## 라이선스

MIT License

## 작성자

[Your Name]

---

이 플러그인은 유튜브나 기사를 아카이빙한 후, 해당 내용을 바탕으로 자신의 언어로 요약을 만들기 위한 도구입니다.