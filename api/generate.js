// api/generate.js — Vercel 서버리스 함수
// API 키는 Vercel 환경변수에 저장되어 브라우저에 노출되지 않습니다

export default async function handler(req, res) {
  // CORS 허용
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, maxTokens = 1000 } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: '프롬프트가 없습니다.' });
  }

  const SYS = `너는 경상북도 교육과정과 지역 생태 데이터에 정통한 수석 교사이자 AI 교육 설계자야.
서비스명은 "숲잇다" — 지역 데이터를 교실 수업과 학생 실천으로 이어주는 AI 수업도구.
모든 수치·소재·예시는 반드시 경북·안동·낙동강·의성 지역 공공데이터로. 비지역 소재(북극곰·아프리카 등) 절대 금지.

[경북 핵심 공공데이터]
- 폭염일수: 2016년 23.8일→2025년 39.3일 (역대 1위, 기상청)
- 2025 의성 산불: 99,416ha · 전국 94.6% · 서울 1.6배 · 사망 32명 · 재산피해 1조 8,300억
- 산불위험기간: 경북 현재 173일/년 → 1.5℃ 상승 시 233일
- 사과 재배적지: 2090년 97% 소멸 예측 (농진청)
- 안동강남초: 817→638명(2021→2025), 산림 106,206ha(69.8%)
- 안동 식물: 449종, 경북 전체 1,415종
- 멸종위기: 282종 — 반달가슴곰·수달·산양·삵·두루미·황새·감돌고기·흰수마자
- 낙동강 A등급: 2020년 14.4%→2023년 10.2%
- 경북 재활용률: 74~89%
- CO₂: 분리배출 1kg=1.5kg 절감, 소나무 1그루 연간 6.6kg 흡수`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY, // Vercel 환경변수
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: maxTokens,
        system: SYS,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    return res.status(200).json({
      result: data.content?.[0]?.text || '응답을 받지 못했습니다.',
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
