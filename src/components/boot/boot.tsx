import { FC } from 'react';
import { ChakraProvider, Container } from '@chakra-ui/react';
import theme from 'theme';
import Router from 'router/router';
import { getCurrentLanguage } from 'i18n/i18n';
import style from 'style/app.module.css';
import { Provider as ReduxProvider } from 'react-redux';
import store from 'store';
import Fonts from 'components/fonts';
import useDidMount from 'hooks/use-did-mount';
import { getConfig as requestConfig } from 'service/api-helper/boot';
import { ERROR_UNAUTHORIZED } from 'service/error-codes';

const Boot: FC = () => {
  const { direction } = getCurrentLanguage();

  const getConfig = async () => {
    try {
      const response = await requestConfig();
    //   console.log({ response });
    } catch (err) {
      console.error(err);
    }
  };

  useDidMount(() => {
    getConfig();
  });

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
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

export default Boot;
