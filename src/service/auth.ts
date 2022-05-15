import storageKeys from '../service/storage';
import { hasItem, removeItem } from '../utils/storage';

function hasToken(): boolean {
  return hasItem(storageKeys.token);
}

function removeToken(key: string): void {
  removeItem(key);
}

export { hasToken, removeToken };
