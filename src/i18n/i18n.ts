import { getItem, setItem } from '../utils/storage';
import storageKeys from 'service/storage';
import languages, { Language } from './languages';

export type Locale = 'en-GB' | 'fa-IR';

export type Direction = 'ltr' | 'rtl';

const currentLocale: Locale =
  getItem(storageKeys.locale) || languages.default.locale;

let translationKeys: Record<string, string> = {};

export function getCurrentLanguage(): Language {
  return languages[currentLocale] || languages.default;
}

export function setLocale(locale: Locale): void {
  setItem(storageKeys.locale, locale);
}

export function toggleLocale(): void {
  if (currentLocale === 'en-GB') {
    setLocale('fa-IR');
  } else {
    setLocale('en-GB');
  }

  window.location.reload();
}

export async function setup(): Promise<void> {
  const { language } = getCurrentLanguage();

  const { default: keys } = await import(`./${language}.ts`);
  translationKeys = keys;
}

function translate(key: string): string {
  return translationKeys[key];
}

export default translate;
