import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import Router from './router/router';

export const App = () => (
  <Router>
    <ChakraProvider theme={theme}>App</ChakraProvider>
  </Router>
);
