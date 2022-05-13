function getItem(key: string): any {
  return localStorage.getItem(key);
}

function setItem(key: string, value: any): void {
  localStorage.setItem(key, value);
}

function hasItem(key: string): boolean {
  return Boolean(localStorage.getItem(key));
}

function remoteItem(key: string): void {
  localStorage.removeItem(key);
}

export { getItem, setItem, hasItem, remoteItem };
