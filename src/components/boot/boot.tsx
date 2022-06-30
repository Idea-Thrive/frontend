import { FC, useState } from 'react';
import { ChakraProvider, Container, useToast } from '@chakra-ui/react';
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
import { STATUS_OK } from 'constants/constants';
import { useDispatch } from 'react-redux';
import { updateUser } from 'store/slices/app-slice';
import SplashScreen from 'components/splash-screen';
import t from 'i18n';
import ErrorBoundary from 'components/error-boundary';

const Boot: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const toast = useToast();
  const dispatch = useDispatch();

  const { direction } = getCurrentLanguage();

  const getConfig = async () => {
    setIsLoading(true);
    try {
      const { status, data } = await requestConfig();
      if (status === STATUS_OK) {
        dispatch(updateUser(data));
        setIsLoading(false);
      }
    } catch (err: any) {
      setError(err);
      toast({
        title: t('anErrorHasOccurred'),
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useDidMount(() => {
    getConfig();
  });

  const handleTryAgainClick = () => {
    getConfig();
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  if (Boolean(error)) {
    return <ErrorBoundary onTryAgainClick={handleTryAgainClick} />;
  }

  return (
    <>
      <Fonts />
      <Container
        className={direction === 'ltr' ? style.ltr : style.rtl}
        h="100vh"
        maxW="container.xl"
        p={0}
        centerContent
      >
        <Router />
      </Container>
    </>
  );
};

function BootWithChakra() {
  return (
    <ChakraProvider theme={theme}>
      <BootWithRedux />
    </ChakraProvider>
  );
}

function BootWithRedux() {
  return (
    <ReduxProvider store={store}>
      <Boot />
    </ReduxProvider>
  );
}

export default BootWithChakra;
