const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || 'http://localhost:3000';

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
