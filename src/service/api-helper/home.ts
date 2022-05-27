import request from '../request';

export function getIdeas(): Promise<any> {
  return request.get('api/ideas');
}
