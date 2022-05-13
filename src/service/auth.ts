import storageKeys from '../service/storage';
import { hasItem } from '../utils/storage';

function hasToken(): boolean {
  return hasItem(storageKeys.token);
}

export { hasToken };
