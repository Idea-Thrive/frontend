import store from 'store';
import Boot from 'components/boot';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme';

declare global {
  interface Window {
    store: any;
  }
}

export const App = () => {
  if (process.env.NODE_ENV === 'development') {
    window.store = store;
  }
  return (
    <ChakraProvider theme={theme}>
      <Boot />;
    </ChakraProvider>
  );
};
