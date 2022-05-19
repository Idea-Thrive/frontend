import { ChakraProvider, Container } from '@chakra-ui/react';
import theme from '@chakra-ui/theme';
import Router from './router/router';
import { getCurrentLanguage } from 'i18n/i18n';
import style from './style/app.module.css';

export const App = () => {
  const { direction } = getCurrentLanguage();

  return (
    <ChakraProvider theme={theme}>
      <Container
        className={direction === 'ltr' ? style.ltr : style.rtl}
        h="100vh"
        maxW="container.xl"
        p={0}
        centerContent
      >
        <Router></Router>
      </Container>
    </ChakraProvider>
  );
};
