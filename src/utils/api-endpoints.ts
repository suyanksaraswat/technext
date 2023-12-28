const SERVER_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_ENDPOINT || 'http://localhost:3000';

export type ErrorResponse = {
  status: string;
  message: string;
};
export type FeedbackListResponse = {
  status: string;
  results: number;
  feedbacks: any[];
};

export type FeedbackResponse = {
  status: string;
  data: any;
  count: number;
};

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('Content-Type') || '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = isJson ? data.message || response.statusText : response.statusText;
    throw new Error(message);
  }

  return data as T;
}

export async function apiFetchPatents(
  query: string,
  itemsPerPage: number,
  currentPage: number
): Promise<{ data: Patent[]; count: number }> {
  const response = await fetch(
    `${SERVER_ENDPOINT}/api/patent?query=${query}&limit=${itemsPerPage}&offset=${(currentPage - 1) * itemsPerPage}`,
    { cache: 'no-store' }
  );

  return handleResponse<any>(response).then((data) => data);
}

export async function apiFetchAnalytics(query: string): Promise<{ data: Patent[]; count: number }> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/analytics?query=${query}`, { cache: 'no-store' });

  return handleResponse<any>(response).then((data) => data);
}

export async function apiFetchDownloadPatents(): Promise<{ data: DownloadData[]; count: number }> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/download`, { cache: 'no-store' });

  return handleResponse<any>(response).then((data) => data);
}
