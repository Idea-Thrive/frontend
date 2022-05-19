import { post, get } from '../request';

type LoginParams = {
  username: string;
  password: string;
};

export function login({ username, password }: LoginParams): Promise<any> {
  return get('api/login', { username, password });
}
