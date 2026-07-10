/**
 * In-memory mock job store for BarndAI API routes.
 * Uses globalThis so jobs persist across Next.js route module instances in dev.
 * Resets on server restart — acceptable for Batch 1 MVP.
 */

const globalStore = globalThis;

if (!globalStore.__barndJobStore) {
  globalStore.__barndJobStore = new Map();
}

const jobs = globalStore.__barndJobStore;

const MOCK_IMAGE_URL =
  'https://placehold.co/1024x1024/png?text=BarndAI+Mock';

/** Jobs complete after this many ms (simulates provider latency). */
const MOCK_PROCESSING_MS = 1500;

export function createJob({ capability, model_id, prompt, payload = {} }) {
  const job_id = `barnd_mock_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const createdAt = Date.now();

  const job = {
    job_id,
    capability,
    model_id: model_id || 'barnd-mock-image',
    prompt,
    payload,
    status: 'processing',
    provider: 'mock',
    model: model_id || 'barnd-mock-image',
    createdAt,
    completesAt: createdAt + MOCK_PROCESSING_MS,
    outputs: null,
    error: null,
  };

  jobs.set(job_id, job);
  return job;
}

export function getJob(job_id) {
  return jobs.get(job_id) || null;
}

export function resolveJobStatus(job) {
  if (!job) return null;
  if (job.status === 'failed') return job;

  if (Date.now() >= job.completesAt) {
    job.status = 'completed';
    job.outputs = [
      {
        type: job.capability?.includes('video') ? 'video' : 'image',
        url: MOCK_IMAGE_URL,
      },
    ];
  }

  return job;
}

export function failJob(job_id, message) {
  const job = jobs.get(job_id);
  if (!job) return null;
  job.status = 'failed';
  job.error = message;
  return job;
}

/** @internal test helper */
export function clearJobs() {
  jobs.clear();
}
