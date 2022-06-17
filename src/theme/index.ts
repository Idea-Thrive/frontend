import { extendTheme } from '@chakra-ui/react';
import { getCurrentLanguage } from 'i18n';

const { locale } = getCurrentLanguage();
const font = locale === 'fa-IR' ? 'iransans' : 'Open Sans, sans-serif';

const theme = extendTheme({
  fonts: {
    heading: font,
    body: font,
  },
});

export default theme;
