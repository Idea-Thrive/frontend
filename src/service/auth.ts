import storageKeys from '../service/storage';
import { hasItem, removeItem, setItem } from '../utils/storage';

function hasToken(): boolean {
  return hasItem(storageKeys.token);
}

function removeToken(): void {
  removeItem(storageKeys.token);
}

function setToken(token: string): void {
  setItem(storageKeys.token, token);
}

export { hasToken, removeToken, setToken };
