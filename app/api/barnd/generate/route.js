import { NextResponse } from 'next/server';
import { createJob } from '@/src/server/barnd/jobStore';

const VALID_CAPABILITIES = new Set([
  'text-to-image',
  'image-to-image',
  'text-to-video',
  'image-to-video',
  'video-to-video',
  'lip-sync',
]);

const PROMPT_REQUIRED = new Set([
  'text-to-image',
  'text-to-video',
]);

export async function POST(request) {
  try {
    const body = await request.json();
    const capability = body.capability || 'text-to-image';
    const model_id = body.model_id || body.model || 'barnd-mock-image';
    const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';

    if (!VALID_CAPABILITIES.has(capability)) {
      return NextResponse.json(
        {
          ok: false,
          error: { code: 'INVALID_INPUT', message: `Unsupported capability: ${capability}` },
        },
        { status: 400 }
      );
    }

    if (PROMPT_REQUIRED.has(capability) && !prompt) {
      return NextResponse.json(
        {
          ok: false,
          error: { code: 'MISSING_PROMPT', message: 'Prompt is required for this capability.' },
        },
        { status: 400 }
      );
    }

    const job = createJob({
      capability,
      model_id,
      prompt,
      payload: {
        aspect_ratio: body.aspect_ratio,
        resolution: body.resolution,
        quality: body.quality,
        image_url: body.image_url,
        images_list: body.images_list,
        seed: body.seed,
      },
    });

    return NextResponse.json({
      ok: true,
      job_id: job.job_id,
      status: job.status,
      provider: job.provider,
      model: job.model,
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
