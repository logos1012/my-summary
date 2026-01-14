# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-01-14

### Fixed
- 콜아웃 형식 파싱 완전 재작성
- 정규식 패턴 개선으로 안정적인 요약 섹션 감지
- '> ' 접두사 제거 로직 수정
- 디버그 로깅 추가로 문제 진단 가능

### Changed
- loadExistingSummary 메서드 완전 개편
- 라인별 처리 방식으로 변경하여 정확도 향상

## [1.1.3] - 2025-01-14

### Fixed
- 기존 요약 내용 불러오기 기능 수정
- 콜아웃 형식으로 저장된 요약을 팝업창에서 정상적으로 표시
- 기존 요약 내용을 수정할 수 있도록 파싱 로직 개선

## [1.1.2] - 2025-01-14

### Fixed
- 모달 가로 너비를 500px로 축소하여 화면 적합성 개선
- 텍스트 영역 너비를 100%로 설정 (box-sizing 활용)
- 전체 모달 크기를 500px × 500px로 최적화

## [1.1.1] - 2025-01-14

### Fixed
- 텍스트 영역이 화면 밖으로 넘어가는 문제 완전 해결
- 모달 창 크기를 650px × 550px로 재조정
- 텍스트 영역의 너비 계산 방식 개선 (box-sizing 적용)
- 버튼 영역과 텍스트 영역 간 명확한 구분선 추가

## [1.1.0] - 2025-01-14

### Added
- 콜아웃 형식으로 요약 내용 저장 (가독성 향상)
- 요약 섹션 후 구분선(---) 자동 추가
- 스크롤 가능한 팝업창으로 긴 내용 편집 지원

### Fixed
- 팝업창 크기 문제 해결 (저장 버튼이 잘리는 문제 수정)
- 모달 레이아웃 개선으로 안정적인 UI 제공

### Changed
- 팝업창 크기를 700px × 600px로 조정 (최대 90vw × 80vh)
- 텍스트 영역이 자동으로 스크롤되도록 개선
- 요약 내용이 콜아웃 박스 안에 표시되도록 변경

## [1.0.0] - 2025-01-14

### Added

- 초기 릴리즈
- 요약 입력을 위한 팝업 모달 기능
- '## 0. My Summary' 섹션 자동 추가 및 수정 기능
- 프론트매터가 있는 노트 지원
- 기존 요약 내용 편집 기능
- 커스터마이징 가능한 단축키 설정
- Obsidian 테마와 어울리는 스타일링

### Features

- **빠른 접근**: 단축키를 통해 즉시 요약 작성 시작
- **스마트 배치**: 프론트매터 다음, 다른 콘텐츠 이전에 자동 배치
- **지속성**: 기존 요약을 보존하면서 편집 가능
- **BRAT 호환**: BRAT 플러그인을 통한 쉬운 설치 지원

### Technical Details

- TypeScript로 작성
- esbuild를 사용한 효율적인 빌드 시스템
- Obsidian API 최적 활용
- 최소 Obsidian 버전: 0.15.0