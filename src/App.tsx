import { ChakraProvider, Container } from '@chakra-ui/react';
import theme from '@chakra-ui/theme';
import Router from './router/router';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Container h="100vh" maxW="container.xl" p={0} centerContent>
      <Router></Router>
    </Container>
  </ChakraProvider>
);
