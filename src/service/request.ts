import axios from 'axios';

const { REACT_APP_BASE_URL: baseUrl } = process.env;

const defaultHeaders: Record<string, string> = {
  'Content-Type': '',
};

export function post(
  path: string,
  body: any = {},
  headers: any = {},
): Promise<any> {
  const url = `${baseUrl}/${path}`;

  return axios.post(url, { ...body, headers: { ...defaultHeaders, headers } });
}

export function get(
  path: string,
  params: any = {},
  headers: any = {},
): Promise<any> {
  const url = `${baseUrl}/${path}`;
  return axios.get(url, {
    params,
    headers: { ...defaultHeaders, headers },
  });
}
