import { NextResponse } from 'next/server';

const MOCK_MODELS = [
  {
    id: 'barnd-mock-image',
    name: 'BarndAI Mock Image',
    capability: 'text-to-image',
    provider: 'mock',
    provider_model: 'mock-image',
    enabled: true,
    tier: 'free',
  },
];

export async function GET() {
  return NextResponse.json({
    ok: true,
    models: MOCK_MODELS,
  });
}
