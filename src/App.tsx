import { ChakraProvider, Container } from '@chakra-ui/react';
import theme from '@chakra-ui/theme';
import Router from './router/router';
import { getCurrentLanguage } from 'i18n/i18n';
import style from './style/app.module.css';
import { Provider as ReduxProvider } from 'react-redux';
import store from 'store';

declare global {
  interface Window {
    store: any;
  }
}

export const App = () => {
  const { direction } = getCurrentLanguage();

  if (process.env.NODE_ENV === 'development') {
    window.store = store;
  }

  return (
    <ChakraProvider theme={theme}>
      <ReduxProvider store={store}>
        <Container
          className={direction === 'ltr' ? style.ltr : style.rtl}
          h="100vh"
          maxW="container.xl"
          p={0}
          centerContent
        >
          <Router></Router>
        </Container>
      </ReduxProvider>
    </ChakraProvider>
  );
};
