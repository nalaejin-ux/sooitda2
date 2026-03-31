# 숲잇다 (Sooitda) — Vercel 배포 가이드

## 폴더 구조
```
sooitda-vercel/
├── api/
│   └── generate.js     ← 서버리스 함수 (API 키 안전 보관)
├── public/
│   └── index.html      ← 프론트엔드 앱
├── vercel.json         ← Vercel 설정
└── README.md
```

## 배포 방법 (5분)

### 1단계: GitHub에 올리기
1. github.com 에서 새 저장소(repository) 생성
   - 이름: `sooitda` (아무거나 가능)
   - Private 선택 (API 키 안전하게)
2. 이 폴더 전체를 업로드

### 2단계: Vercel 배포
1. vercel.com 접속 → GitHub으로 로그인
2. "New Project" → GitHub 저장소 선택
3. **Environment Variables** 탭에서:
   - Name: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-api03-...` (실제 API 키)
4. Deploy 버튼 클릭

### 3단계: 완료
- `https://sooitda-xxxx.vercel.app` 형태의 URL 생성
- 이 URL이 공모전 제출용 온라인 주소

## API 키 발급
- https://console.anthropic.com → API Keys → Create Key
- 비용: 문제 생성 1회 ≈ $0.003 (약 4원)

## 주의사항
- API 키는 절대 public 저장소에 올리지 마세요
- Vercel 환경변수에만 저장하면 안전합니다
