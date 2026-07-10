import { NextResponse } from 'next/server';

const MOCK_PROVIDERS = [
  {
    id: 'mock',
    name: 'BarndAI Mock Provider',
    type: 'mock',
    enabled: true,
    capabilities: ['text-to-image', 'image-to-image', 'text-to-video'],
  },
];

export async function GET() {
  return NextResponse.json({
    ok: true,
    providers: MOCK_PROVIDERS,
  });
}
