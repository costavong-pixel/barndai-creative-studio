/**
 * BarndAI browser client adapter.
 * Calls only internal /api/barnd/* routes — never provider APIs directly.
 */

const BASE_URL =
  typeof window !== 'undefined' && window.location?.protocol?.startsWith('http')
    ? ''
    : '';

export class BarndApiClient {
  constructor(options = {}) {
    this.baseUrl = options.baseUrl ?? BASE_URL;
  }

  async submitGeneration(payload) {
    const res = await fetch(`${this.baseUrl}/api/barnd/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`BarndAI generation failed: ${res.status} - ${errText.slice(0, 200)}`);
    }

    return res.json();
  }

  async generateImage(payload) {
    return this.submitGeneration({ capability: 'text-to-image', ...payload });
  }

  async generateVideo(payload) {
    return this.submitGeneration({ capability: 'text-to-video', ...payload });
  }

  async generateI2I(payload) {
    return this.submitGeneration({ capability: 'image-to-image', ...payload });
  }

  async generateI2V(payload) {
    return this.submitGeneration({ capability: 'image-to-video', ...payload });
  }

  async processV2V(payload) {
    return this.submitGeneration({ capability: 'video-to-video', ...payload });
  }

  async processLipSync(payload) {
    return this.submitGeneration({ capability: 'lip-sync', ...payload });
  }

  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${this.baseUrl}/api/barnd/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`BarndAI upload failed: ${res.status} - ${errText.slice(0, 200)}`);
    }

    const data = await res.json();
    return data.url;
  }

  async pollForResult(jobId, options = {}) {
    const intervalMs = options.intervalMs ?? 2000;
    const maxAttempts = options.maxAttempts ?? 60;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const res = await fetch(`${this.baseUrl}/api/barnd/result/${jobId}`);

      if (!res.ok) {
        const errText = await res.text();
        if (res.status >= 500 && attempt < maxAttempts - 1) {
          await sleep(intervalMs);
          continue;
        }
        throw new Error(`BarndAI polling failed: ${res.status} - ${errText.slice(0, 200)}`);
      }

      const data = await res.json();
      const status = data.status?.toLowerCase();

      if (status === 'completed' || status === 'succeeded' || status === 'success') {
        return data;
      }
      if (status === 'failed' || status === 'error') {
        throw new Error(`Generation failed: ${data.error?.message || data.error || 'Unknown error'}`);
      }

      await sleep(intervalMs);
    }

    throw new Error('BarndAI polling timed out');
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildGenerationPayload(params) {
  return {
    model_id: params.model || params.model_id,
    prompt: params.prompt,
    aspect_ratio: params.aspect_ratio,
    resolution: params.resolution,
    quality: params.quality,
    image_url: params.image_url,
    images_list: params.images_list,
    seed: params.seed,
  };
}

/**
 * Drop-in replacement for muapi.generateImage — accepts apiKey for signature
 * compatibility but does not send it to Barnd routes (mock needs no key).
 */
export async function generateImage(_apiKey, params) {
  const client = new BarndApiClient();
  const submitData = await client.submitGeneration({
    capability: 'text-to-image',
    ...buildGenerationPayload(params),
  });

  const jobId = submitData.job_id || submitData.id;
  if (!jobId) {
    const outputUrl =
      submitData.outputs?.[0]?.url || submitData.outputs?.[0] || submitData.url;
    return { ...submitData, url: outputUrl };
  }

  if (params.onRequestId) params.onRequestId(jobId);

  const result = await client.pollForResult(jobId, { maxAttempts: 60, intervalMs: 1000 });
  const outputUrl =
    result.outputs?.[0]?.url || result.outputs?.[0] || result.url;
  return { ...result, url: outputUrl, id: jobId };
}

export default BarndApiClient;
