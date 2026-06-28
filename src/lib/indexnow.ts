const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
];

const DEFAULT_OPTIONS = {
  maxRetries: 3,
  baseDelayMs: 750,
  maxDelayMs: 8000,
  batchSize: 100,
  rateLimitMs: 1200,
  timeoutMs: 15000,
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function nowIso() {
  return new Date().toISOString();
}

function isSuccessfulStatusCode(status: number) {
  return status >= 200 && status < 300;
}

function normalizeUrl(url: string, host: string) {
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const cleanPath = `/${trimmed.replace(/^\/+/, '').replace(/\/+$/, '')}`;
  return `${host.replace(/\/+$/, '')}${cleanPath}`;
}

function uniqueUrls(urls: string[], host: string) {
  const seen = new Set<string>();
  const normalized: string[] = [];
  for (const url of urls) {
    const clean = normalizeUrl(url, host);
    if (!clean || seen.has(clean)) continue;
    seen.add(clean);
    normalized.push(clean);
  }
  return normalized;
}

async function fetchWithRetry(url: string, body: Record<string, unknown>, options: Required<typeof DEFAULT_OPTIONS>) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs);
  try {
    return await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function postWithRetry(endpoint: string, body: Record<string, unknown>, options: Required<typeof DEFAULT_OPTIONS>) {
  let lastError: unknown;
  for (let attempt = 0; attempt <= options.maxRetries; attempt += 1) {
    try {
      const response = await fetchWithRetry(endpoint, body, options);
      if (isSuccessfulStatusCode(response.status)) {
        return { ok: true, status: response.status, endpoint };
      }
      lastError = new Error(`IndexNow endpoint ${endpoint} returned ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    if (attempt < options.maxRetries) {
      const delay = Math.min(options.baseDelayMs * 2 ** attempt, options.maxDelayMs);
      await sleep(delay);
    }
  }
  return { ok: false, error: lastError instanceof Error ? lastError.message : String(lastError), endpoint };
}

export type IndexNowResult = {
  submitted: string[];
  failed: Array<{ url: string; error: string }>;
  attempts: Array<{ endpoint: string; ok: boolean; status?: number; error?: string }>;
  startedAt: string;
  finishedAt: string;
};

export async function submitIndexNowUrls(
  urls: string[],
  options: {
    apiKey: string;
    host: string;
    endpoints?: string[];
    maxRetries?: number;
    batchSize?: number;
    rateLimitMs?: number;
    baseDelayMs?: number;
    maxDelayMs?: number;
    timeoutMs?: number;
    onProgress?: (progress: { submitted: number; total: number; batch: number }) => void;
  }
): Promise<IndexNowResult> {
  if (!options.apiKey) throw new Error('IndexNow API key is required');
  const merged = { ...DEFAULT_OPTIONS, ...options };
  const allUrls = uniqueUrls(urls, merged.host);
  const attempts: IndexNowResult['attempts'] = [];
  const failed: IndexNowResult['failed'] = [];
  const submitted: string[] = [];
  const startedAt = nowIso();

  for (let index = 0; index < allUrls.length; index += merged.batchSize) {
    const batch = allUrls.slice(index, index + merged.batchSize);
    const body = {
      host: merged.host.replace(/^https?:\/\//, '').replace(/\/+$/, ''),
      key: options.apiKey,
      keyLocation: `${merged.host.replace(/\/+$/, '')}/indexnow-key.txt`,
      urlList: batch,
      type: 'URL_SUBMISSION',
    };

    const endpoints = options.endpoints && options.endpoints.length ? options.endpoints : INDEXNOW_ENDPOINTS;
    const batchAttempts = await Promise.all(endpoints.map((endpoint) => postWithRetry(endpoint, body, merged)));
    attempts.push(...batchAttempts);
    if (batchAttempts.every((attempt) => attempt.ok)) {
      submitted.push(...batch);
    } else {
      const error = batchAttempts.find((attempt) => !attempt.ok)?.error || 'IndexNow submission failed';
      failed.push(...batch.map((url) => ({ url, error })));
    }
    options.onProgress?.({ submitted: submitted.length + failed.length, total: allUrls.length, batch: Math.ceil((index + batch.length) / merged.batchSize) });
    if (index + batch.length < allUrls.length) await sleep(merged.rateLimitMs);
  }

  return { submitted, failed, attempts, startedAt, finishedAt: nowIso() };
}

export async function submitIndexNowChanges(
  currentUrls: string[],
  options: {
    apiKey: string;
    host: string;
    statePath: string;
    endpoints?: string[];
    batchSize?: number;
    rateLimitMs?: number;
  } & Partial<typeof DEFAULT_OPTIONS>
) {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const stateFile = path.resolve(options.statePath);
  let previous = new Map<string, string>();
  if (fs.existsSync(stateFile)) {
    previous = new Map(Object.entries(JSON.parse(fs.readFileSync(stateFile, 'utf8') || '{}')));
  }

  const current = new Map(currentUrls.map((url) => [normalizeUrl(url, options.host), todayIso()]));
  const added: string[] = [];
  const updated: string[] = [];
  const deleted: string[] = [];
  for (const [url, lastmod] of current) {
    if (!previous.has(url)) added.push(url);
    else if (previous.get(url) !== lastmod) updated.push(url);
  }
  for (const url of previous.keys()) if (!current.has(url)) deleted.push(url);
  const result = await submitIndexNowUrls([...added, ...updated, ...deleted], options);
  fs.mkdirSync(path.dirname(stateFile), { recursive: true });
  fs.writeFileSync(stateFile, `${JSON.stringify(Object.fromEntries(current), null, 2)}\n`);
  return { added, updated, deleted, result };
}

function todayIso() {
  return new Date().toISOString().split('T')[0];
}

export async function submitSitemapUpdates(
  sitemapUrls: string[],
  options: { apiKey: string; host: string; endpoints?: string[]; batchSize?: number; rateLimitMs?: number } & Partial<typeof DEFAULT_OPTIONS>
) {
  return submitIndexNowUrls(sitemapUrls, options);
}

export default {
  submitIndexNowUrls,
  submitIndexNowChanges,
  submitSitemapUpdates,
};
