import request from '../request';

type LoginParams = {
  email: string;
  password: string;
};

export function login({ email, password }: LoginParams): Promise<any> {
  return request.post('auth/login', {
    email,
    password,
  });
}
