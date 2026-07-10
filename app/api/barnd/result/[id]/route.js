import { NextResponse } from 'next/server';
import { getJob, resolveJobStatus } from '@/src/server/barnd/jobStore';

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const job_id = id;

    if (!job_id) {
      return NextResponse.json(
        {
          ok: false,
          error: { code: 'INVALID_INPUT', message: 'Job id is required.' },
        },
        { status: 400 }
      );
    }

    const job = getJob(job_id);
    if (!job) {
      return NextResponse.json(
        {
          ok: false,
          error: { code: 'JOB_NOT_FOUND', message: `Job not found: ${job_id}` },
        },
        { status: 404 }
      );
    }

    const resolved = resolveJobStatus(job);

    if (resolved.status === 'failed') {
      return NextResponse.json({
        ok: false,
        job_id: resolved.job_id,
        status: 'failed',
        error: { code: 'PROVIDER_REQUEST_FAILED', message: resolved.error || 'Generation failed' },
        provider: resolved.provider,
        model: resolved.model,
      });
    }

    return NextResponse.json({
      ok: true,
      job_id: resolved.job_id,
      status: resolved.status,
      outputs: resolved.outputs || [],
      provider: resolved.provider,
      model: resolved.model,
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
