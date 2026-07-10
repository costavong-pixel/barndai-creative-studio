import { NextResponse } from 'next/server';

const MAX_BYTES = 20 * 1024 * 1024; // 20 MB MVP limit
const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'video/mp4',
  'video/webm',
  'audio/mpeg',
  'audio/wav',
  'audio/mp4',
]);

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json(
        {
          ok: false,
          error: { code: 'INVALID_INPUT', message: 'Missing file field.' },
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        {
          ok: false,
          error: { code: 'UPLOAD_TOO_LARGE', message: `File exceeds ${MAX_BYTES} bytes.` },
        },
        { status: 413 }
      );
    }

    if (file.type && !ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'UNSUPPORTED_FILE_TYPE',
            message: `Unsupported file type: ${file.type}`,
          },
        },
        { status: 415 }
      );
    }

    // MVP placeholder — real storage (R2) comes in Batch 2+
    const safeName = (file.name || 'upload').replace(/[^a-zA-Z0-9._-]/g, '_');
    const mockUrl = `https://placehold.co/512x512/png?text=BarndAI+Upload+${encodeURIComponent(safeName)}`;

    return NextResponse.json({
      ok: true,
      url: mockUrl,
      filename: safeName,
      size: file.size,
      content_type: file.type || 'application/octet-stream',
      note: 'MVP mock upload — persistent storage not yet configured.',
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: { code: 'INTERNAL_ERROR', message: error.message || 'Internal server error' },
      },
      { status: 500 }
    );
  }
}
