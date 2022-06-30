import storageKeys from '../service/storage';
import { hasItem, removeItem, setItem, getItem } from '../utils/storage';

function hasToken(): boolean {
  return hasItem(storageKeys.token);
}

function removeToken(): void {
  removeItem(storageKeys.token);
}

function setToken(token: string): void {
  setItem(storageKeys.token, token);
}

function getToken(): string | undefined {
  return getItem(storageKeys.token);
}

function logout(): void {
  removeToken();
}

export { hasToken, removeToken, setToken, getToken, logout };
