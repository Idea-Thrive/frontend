import { parse } from 'query-string';

function getQueryParam(key: string): string | (string | null)[] | null {
  const parsed = parse(window.location.search);
  return parsed[key];
}

export { getQueryParam };
