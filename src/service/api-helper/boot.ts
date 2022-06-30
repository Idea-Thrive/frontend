import request from '../request';

export function getConfig(): Promise<any> {
  return request.get('users/info');
}
