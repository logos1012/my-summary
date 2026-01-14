# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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