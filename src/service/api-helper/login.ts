import request from '../request';

type LoginParams = {
  username: string;
  password: string;
};

export function login({ username, password }: LoginParams): Promise<any> {
  return request.get('api/login', { params: { username, password } });
}
