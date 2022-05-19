import { Direction, Locale } from './i18n';

export type Language = {
  locale: Locale;
  language: string;
  direction: Direction;
};

type Languages = Record<string, Language>;

const languages: Languages = {
  default: {
    locale: 'fa-IR',
    direction: 'rtl',
    language: 'fa',
  },
  'en-GB': {
    locale: 'en-GB',
    direction: 'ltr',
    language: 'en',
  },
};

export default languages;
